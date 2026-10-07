import { isPlainPrimaryClick } from './is-plain-primary-click';

describe('isPlainPrimaryClick', () => {
  it('accepts an unmodified left click', () => {
    expect(isPlainPrimaryClick(new MouseEvent('click', { button: 0 }))).toBe(true);
  });

  it.each([
    ['a middle click', { button: 1 }],
    ['ctrl+click', { ctrlKey: true }],
    ['cmd+click', { metaKey: true }],
    ['shift+click', { shiftKey: true }],
    ['alt+click', { altKey: true }],
  ])('rejects %s', (_name, init) => {
    expect(isPlainPrimaryClick(new MouseEvent('click', init))).toBe(false);
  });
});
