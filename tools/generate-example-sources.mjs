import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const PROJECT_ROOT = process.cwd();
const COMPONENTS_ROOT = path.join(PROJECT_ROOT, 'src', 'app', 'pages', 'components');
const OUTPUT_ROOT = path.join(PROJECT_ROOT, 'src', 'app', 'generated', 'example-sources');
const CHECK_MODE = process.argv.includes('--check');
const SOURCE_EXTENSIONS = ['.html', '.ts', '.scss'];

const features = [...readManifestExamples(), readSmokeExamples()];
const outputs = new Map(
  features.map((feature) => [
    path.join(OUTPUT_ROOT, `${feature.slug}.generated.ts`),
    renderGeneratedModule(feature),
  ]),
);
const staleOutputs = findStaleOutputs(outputs);

if (staleOutputs.length === 0) {
  const exampleCount = features.reduce((total, feature) => total + feature.examples.length, 0);

  console.log(`Generated example sources are current (${exampleCount} examples).`);
} else if (CHECK_MODE) {
  console.error(
    'Generated example sources are stale. Run "node tools/generate-example-sources.mjs".',
  );
  process.exitCode = 1;
} else {
  fs.mkdirSync(OUTPUT_ROOT, { recursive: true });

  for (const [outputPath, output] of outputs) {
    fs.writeFileSync(outputPath, output, 'utf8');
  }

  for (const staleOutput of staleOutputs.filter((outputPath) => !outputs.has(outputPath))) {
    fs.rmSync(staleOutput);
  }

  const exampleCount = features.reduce((total, feature) => total + feature.examples.length, 0);

  console.log(
    `Generated ${exampleCount} example source records across ${features.length} features.`,
  );
}

function readManifestExamples() {
  return fs
    .readdirSync(COMPONENTS_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .sort((left, right) => left.name.localeCompare(right.name))
    .map((entry) => readFeatureExamples(entry.name));
}

function readFeatureExamples(featureSlug) {
  const featureRoot = path.join(COMPONENTS_ROOT, featureSlug);
  const manifestPath = path.join(featureRoot, `${featureSlug}.docs-manifest.ts`);

  if (!fs.existsSync(manifestPath)) {
    throw new Error(`Missing docs manifest for component feature "${featureSlug}".`);
  }

  const manifestSource = fs.readFileSync(manifestPath, 'utf8');
  const manifestSlug = matchRequired(manifestSource, /\bslug:\s*'([^']+)'/, manifestPath);
  const exampleListSource = matchRequired(
    manifestSource,
    /\bexampleIds:\s*\[([\s\S]*?)\]/,
    manifestPath,
  );
  const exampleIds = [...exampleListSource.matchAll(/'([^']+)'/g)].map((match) => match[1]);

  if (manifestSlug !== featureSlug) {
    throw new Error(
      `Manifest slug "${manifestSlug}" does not match feature directory "${featureSlug}".`,
    );
  }

  if (new Set(exampleIds).size !== exampleIds.length) {
    throw new Error(`Duplicate example id in ${relativePath(manifestPath)}.`);
  }

  return {
    slug: featureSlug,
    examples: exampleIds.map((exampleId) => readExample(featureRoot, featureSlug, exampleId)),
  };
}

function readSmokeExamples() {
  const featureRoot = path.join(PROJECT_ROOT, 'src', 'app', 'pages', 'smoke');
  const manifestPath = path.join(featureRoot, 'smoke.docs-manifest.ts');
  const manifestSource = fs.readFileSync(manifestPath, 'utf8');
  const exampleListSource = matchRequired(
    manifestSource,
    /\bexampleIds:\s*\[([\s\S]*?)\]/,
    manifestPath,
  );
  const exampleIds = [...exampleListSource.matchAll(/'([^']+)'/g)].map((match) => match[1]);

  if (exampleIds.length !== 1 || exampleIds[0] !== 'package-smoke-consumer') {
    throw new Error('Package Smoke must declare the package-smoke-consumer example id.');
  }

  return {
    slug: 'smoke',
    examples: [
      {
        id: 'smoke/package-smoke-consumer',
        files: [
          readMarkedSource({
            filePath: path.join(featureRoot, 'package-smoke-page.html'),
            startMarker: '<!-- docs-source:package-smoke-consumer-html:start -->',
            endMarker: '<!-- docs-source:package-smoke-consumer-html:end -->',
            label: 'Template',
            filename: 'package-smoke-consumer.html',
            language: 'html',
          }),
          readMarkedSource({
            filePath: path.join(featureRoot, 'package-smoke-page.ts'),
            startMarker: '/* docs-source:package-smoke-consumer-imports:start */',
            endMarker: '/* docs-source:package-smoke-consumer-imports:end */',
            label: 'Imports',
            filename: 'package-smoke-consumer.ts',
            language: 'ts',
          }),
        ],
      },
    ],
  };
}

function readMarkedSource({ filePath, startMarker, endMarker, label, filename, language }) {
  const source = fs.readFileSync(filePath, 'utf8');
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker, start + startMarker.length);

  if (start < 0 || end < 0 || end <= start) {
    throw new Error(`Missing or invalid docs source markers in ${relativePath(filePath)}.`);
  }

  const markedSource = source.slice(start + startMarker.length, end);

  return {
    label,
    filename,
    language,
    code: removeCommonIndent(markedSource),
  };
}

function removeCommonIndent(source) {
  const lines = source
    .replaceAll('\r\n', '\n')
    .replace(/^\n|\n\s*$/g, '')
    .split('\n');
  const indents = lines
    .filter((line) => line.trim().length > 0)
    .map((line) => line.match(/^\s*/)?.[0].length ?? 0);
  const commonIndent = Math.min(...indents);

  return lines.map((line) => line.slice(commonIndent)).join('\n');
}

function readExample(featureRoot, featureSlug, exampleId) {
  const exampleRoot = path.join(featureRoot, 'examples', exampleId);

  if (!fs.existsSync(exampleRoot) || !fs.statSync(exampleRoot).isDirectory()) {
    throw new Error(`Missing example directory for "${featureSlug}/${exampleId}".`);
  }

  const files = fs
    .readdirSync(exampleRoot, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isFile() &&
        entry.name !== 'index.ts' &&
        SOURCE_EXTENSIONS.includes(path.extname(entry.name)),
    )
    .sort(compareExampleFiles)
    .map((entry) => ({
      filename: entry.name,
      language: languageFor(entry.name),
      code: fs.readFileSync(path.join(exampleRoot, entry.name), 'utf8').trimEnd(),
    }));

  if (files.length === 0) {
    throw new Error(`No source files found for "${featureSlug}/${exampleId}".`);
  }

  return { id: `${featureSlug}/${exampleId}`, files };
}

function renderGeneratedModule(feature) {
  const constantName = `${feature.slug.replaceAll('-', '_').toUpperCase()}_EXAMPLE_SOURCES`;
  const typeName = `${toPascalCase(feature.slug)}ExampleId`;
  const lines = [
    '// This file is generated by tools/generate-example-sources.mjs.',
    '// Do not edit it by hand.',
    '',
    "import type { CodeTab } from '@shared/docs-ui/code-tabs';",
    '',
    `export const ${constantName} = {`,
  ];

  for (const example of feature.examples) {
    const localId = example.id.slice(feature.slug.length + 1);

    lines.push(`  ${JSON.stringify(localId)}: [`);

    for (const file of example.files) {
      lines.push('    {');
      lines.push(`      label: ${JSON.stringify(labelFor(file, example.files.length))},`);
      lines.push(`      filename: ${JSON.stringify(file.filename)},`);
      lines.push(`      language: ${JSON.stringify(file.language)},`);
      lines.push(`      code: ${JSON.stringify(file.code)},`);
      lines.push('    },');
    }

    lines.push('  ],');
  }

  lines.push(
    '} as const satisfies Readonly<Record<string, readonly CodeTab[]>>;',
    '',
    `export type ${typeName} = keyof typeof ${constantName};`,
    '',
  );

  return `${lines.join('\n')}\n`;
}

function findStaleOutputs(outputs) {
  const existingOutputs = fs.existsSync(OUTPUT_ROOT)
    ? fs
        .readdirSync(OUTPUT_ROOT)
        .filter((filename) => filename.endsWith('.generated.ts'))
        .map((filename) => path.join(OUTPUT_ROOT, filename))
    : [];
  const candidates = new Set([...outputs.keys(), ...existingOutputs]);

  return [...candidates].filter((outputPath) => {
    const expected = outputs.get(outputPath);

    return (
      expected === undefined ||
      !fs.existsSync(outputPath) ||
      fs.readFileSync(outputPath, 'utf8') !== expected
    );
  });
}

function compareExampleFiles(left, right) {
  const extensionDifference =
    SOURCE_EXTENSIONS.indexOf(path.extname(left.name)) -
    SOURCE_EXTENSIONS.indexOf(path.extname(right.name));

  return extensionDifference || left.name.localeCompare(right.name);
}

function languageFor(filename) {
  return {
    '.html': 'html',
    '.ts': 'ts',
    '.scss': 'scss',
  }[path.extname(filename)];
}

function labelFor(file, fileCount) {
  if (file.label) {
    return file.label;
  }

  if (fileCount === SOURCE_EXTENSIONS.length) {
    return file.language.toUpperCase();
  }

  return file.filename;
}

function matchRequired(source, pattern, filePath) {
  const match = source.match(pattern);

  if (!match?.[1]) {
    throw new Error(`Unable to read example metadata from ${relativePath(filePath)}.`);
  }

  return match[1];
}

function relativePath(filePath) {
  return path.relative(PROJECT_ROOT, filePath).replaceAll(path.sep, '/');
}

function toPascalCase(value) {
  return value
    .split('-')
    .map((segment) => `${segment[0]?.toUpperCase() ?? ''}${segment.slice(1)}`)
    .join('');
}
