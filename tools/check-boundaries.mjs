import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

import ts from 'typescript';

const PROJECT_ROOT = process.cwd();
const APP_ROOT = path.join(PROJECT_ROOT, 'src', 'app');
const ALIAS_ROOTS = new Map([
  ['@app', APP_ROOT],
  ['@core', path.join(APP_ROOT, 'core')],
  ['@generated', path.join(APP_ROOT, 'generated')],
  ['@layout', path.join(APP_ROOT, 'layout')],
  ['@pages', path.join(APP_ROOT, 'pages')],
  ['@shared', path.join(APP_ROOT, 'shared')],
]);

const files = walk(APP_ROOT).filter((file) => file.endsWith('.ts'));
const fileSet = new Set(files.map(normalizePath));
const graph = new Map(files.map((file) => [normalizePath(file), []]));
const violations = [];

for (const file of files) {
  const sourceText = fs.readFileSync(file, 'utf8');
  const sourceFile = ts.createSourceFile(file, sourceText, ts.ScriptTarget.Latest, true);

  validatePlaygroundSnippetBuilder(file, sourceFile);

  for (const reference of moduleReferences(sourceFile)) {
    validateReference(file, reference.specifier);
    validateManifestReference(file, reference);

    if (!reference.isDynamic) {
      const target = resolveInternalModule(file, reference.specifier);

      if (target) {
        graph.get(normalizePath(file))?.push(normalizePath(target));
      }
    }
  }
}

function validatePlaygroundSnippetBuilder(file, sourceFile) {
  if (!normalizePath(file).endsWith('playground-page.ts')) {
    return;
  }

  let builder;

  sourceFile.forEachChild((node) => {
    if (!ts.isClassDeclaration(node)) {
      return;
    }

    builder = node.members.find(
      (member) =>
        ts.isPropertyDeclaration(member) &&
        ts.isIdentifier(member.name) &&
        member.name.text === 'buildPlaygroundSnippet',
    );
  });

  if (!builder || !ts.isPropertyDeclaration(builder) || !builder.initializer) {
    violations.push(`${relativePath(file)} must declare a buildPlaygroundSnippet callback.`);
    return;
  }

  const modifiers = new Set(builder.modifiers?.map((modifier) => modifier.kind));

  if (
    !modifiers.has(ts.SyntaxKind.ProtectedKeyword) ||
    !modifiers.has(ts.SyntaxKind.ReadonlyKeyword) ||
    !ts.isArrowFunction(builder.initializer)
  ) {
    violations.push(
      `${relativePath(file)} buildPlaygroundSnippet must be a protected readonly arrow callback.`,
    );
  }

  function inspect(node) {
    if (node.kind === ts.SyntaxKind.ThisKeyword) {
      violations.push(`${relativePath(file)} buildPlaygroundSnippet must not capture this.`);
    }

    if (ts.isAsExpression(node) || ts.isTypeAssertionExpression(node)) {
      violations.push(
        `${relativePath(file)} buildPlaygroundSnippet must not contain recovery assertions.`,
      );
    }

    ts.forEachChild(node, inspect);
  }

  inspect(builder.initializer);
}

function validateManifestReference(sourceFile, reference) {
  const normalizedSource = normalizePath(sourceFile);

  if (
    normalizedSource.endsWith('.docs-manifest.ts') &&
    !reference.isDynamic &&
    (reference.specifier.startsWith('.') || reference.specifier.startsWith('@pages/'))
  ) {
    addViolation(
      sourceFile,
      reference.specifier,
      'Feature manifests must reference page implementations through dynamic imports only.',
    );
  }

  if (
    normalizedSource.endsWith(normalizePath('src/app/generated/docs-registry.ts')) &&
    reference.specifier.startsWith('@pages/') &&
    !reference.specifier.endsWith('.docs-manifest')
  ) {
    addViolation(
      sourceFile,
      reference.specifier,
      'The registry may statically import only concrete .docs-manifest entries.',
    );
  }
}

for (const cycle of findCycles(graph)) {
  violations.push(`Circular dependency: ${cycle.map(relativePath).join(' -> ')}`);
}

if (violations.length > 0) {
  console.error('Architecture boundary check failed:');

  for (const violation of violations) {
    console.error(`- ${violation}`);
  }

  process.exitCode = 1;
} else {
  console.log(`Architecture boundary check passed for ${files.length} TypeScript files.`);
}

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);

    return entry.isDirectory() ? walk(entryPath) : [entryPath];
  });
}

function moduleReferences(sourceFile) {
  const references = [];

  function visit(node) {
    if (
      (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
      node.moduleSpecifier &&
      ts.isStringLiteral(node.moduleSpecifier)
    ) {
      references.push({
        isDynamic: false,
        specifier: node.moduleSpecifier.text,
      });
    }

    if (
      ts.isCallExpression(node) &&
      node.expression.kind === ts.SyntaxKind.ImportKeyword &&
      node.arguments.length === 1 &&
      ts.isStringLiteral(node.arguments[0])
    ) {
      references.push({
        isDynamic: true,
        specifier: node.arguments[0].text,
      });
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  return references;
}

function validateReference(sourceFile, specifier) {
  if (
    specifier.includes('../kikita-ui') ||
    (specifier.startsWith('@kikita-labs/ui/') && specifier !== '@kikita-labs/ui/package.json')
  ) {
    addViolation(sourceFile, specifier, 'Only the public @kikita-labs/ui entrypoint is allowed.');
    return;
  }

  const source = architectureLocation(sourceFile);
  const alias = aliasTarget(specifier);

  if (alias) {
    validateDirection(sourceFile, specifier, source, architectureLocation(alias));
    return;
  }

  if (!specifier.startsWith('.')) {
    return;
  }

  const target = resolveInternalModule(sourceFile, specifier);

  if (!target) {
    return;
  }

  const targetLocation = architectureLocation(target);

  if (source.layer !== targetLocation.layer) {
    addViolation(
      sourceFile,
      specifier,
      `Cross-layer relative import must use @${targetLocation.layer}.`,
    );
  }

  if (parentTraversalCount(specifier) > 1 && !isSameComponentFeature(source, targetLocation)) {
    addViolation(sourceFile, specifier, 'Deep relative import crosses a feature boundary.');
  }

  validateDirection(sourceFile, specifier, source, targetLocation);
}

function validateDirection(sourceFile, specifier, source, target) {
  const forbiddenTargets = {
    core: new Set(['layout', 'pages', 'shared']),
    layout: new Set(['pages']),
    shared: new Set(['layout', 'pages']),
  };

  if (forbiddenTargets[source.layer]?.has(target.layer)) {
    addViolation(sourceFile, specifier, `${source.layer} cannot depend on ${target.layer}.`);
  }

  if (
    source.layer === 'pages' &&
    target.layer === 'pages' &&
    source.componentFeature &&
    target.componentFeature &&
    source.componentFeature !== target.componentFeature
  ) {
    addViolation(
      sourceFile,
      specifier,
      'Component documentation features cannot import each other.',
    );
  }
}

function architectureLocation(file) {
  const parts = path.relative(APP_ROOT, file).split(path.sep);
  const layer = ['core', 'generated', 'layout', 'pages', 'shared'].includes(parts[0])
    ? parts[0]
    : 'app';
  const componentFeature =
    layer === 'pages' && parts[1] === 'components' && parts.length > 3 ? parts[2] : null;

  return { componentFeature, layer };
}

function isSameComponentFeature(source, target) {
  return (
    source.layer === 'pages' &&
    target.layer === 'pages' &&
    source.componentFeature !== null &&
    source.componentFeature === target.componentFeature
  );
}

function aliasTarget(specifier) {
  for (const [alias, root] of ALIAS_ROOTS) {
    if (specifier === alias || specifier.startsWith(`${alias}/`)) {
      return path.join(root, specifier.slice(alias.length + 1));
    }
  }

  return null;
}

function resolveInternalModule(sourceFile, specifier) {
  const unresolved = specifier.startsWith('.')
    ? path.resolve(path.dirname(sourceFile), specifier)
    : aliasTarget(specifier);

  if (!unresolved) {
    return null;
  }

  const candidates = [unresolved, `${unresolved}.ts`, path.join(unresolved, 'index.ts')].map(
    normalizePath,
  );

  return candidates.find((candidate) => fileSet.has(candidate)) ?? null;
}

function findCycles(dependencyGraph) {
  const cycles = [];
  const completed = new Set();
  const visiting = new Set();
  const stack = [];

  function visit(file) {
    if (completed.has(file)) {
      return;
    }

    if (visiting.has(file)) {
      const cycleStart = stack.indexOf(file);
      cycles.push([...stack.slice(cycleStart), file]);
      return;
    }

    visiting.add(file);
    stack.push(file);

    for (const dependency of dependencyGraph.get(file) ?? []) {
      visit(dependency);
    }

    stack.pop();
    visiting.delete(file);
    completed.add(file);
  }

  for (const file of dependencyGraph.keys()) {
    visit(file);
  }

  return uniqueCycles(cycles);
}

function uniqueCycles(cycles) {
  const seen = new Set();

  return cycles.filter((cycle) => {
    const nodes = cycle.slice(0, -1);
    const rotations = nodes.map((_, index) => [...nodes.slice(index), ...nodes.slice(0, index)]);
    const key = rotations.map((rotation) => rotation.join('|')).sort()[0];

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function parentTraversalCount(specifier) {
  return specifier.split('/').filter((segment) => segment === '..').length;
}

function addViolation(sourceFile, specifier, reason) {
  violations.push(`${relativePath(sourceFile)} imports "${specifier}": ${reason}`);
}

function relativePath(file) {
  return normalizePath(path.relative(PROJECT_ROOT, file));
}

function normalizePath(file) {
  return path.normalize(file);
}
