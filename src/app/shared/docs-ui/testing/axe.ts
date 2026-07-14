import axe from 'axe-core';

export async function expectNoAxeViolations(root: HTMLElement): Promise<void> {
  const result = await axe.run(root, {
    rules: {
      'color-contrast': { enabled: false },
    },
  });

  if (result.violations.length > 0) {
    const details = result.violations.map((violation) => ({
      help: violation.help,
      id: violation.id,
      targets: violation.nodes.flatMap((node) => node.target),
    }));

    throw new Error(`Axe violations: ${JSON.stringify(details)}`);
  }
}
