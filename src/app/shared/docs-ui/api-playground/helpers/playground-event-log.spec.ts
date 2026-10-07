import { createPlaygroundEventLog, formatPlaygroundEventDetail } from './playground-event-log';

describe('playground event log', () => {
  it('keeps the newest entry first and drops entries past the limit', () => {
    const log = createPlaygroundEventLog(2);

    log.log('first');
    log.log('second', 'b');
    log.log('third', { value: 3 });

    expect(log.entries().map((entry) => [entry.name, entry.detail])).toEqual([
      ['third', '{"value":3}'],
      ['second', 'b'],
    ]);
    expect(new Set(log.entries().map((entry) => entry.id)).size).toBe(2);
  });

  it('clears the log', () => {
    const log = createPlaygroundEventLog();

    log.log('event');
    log.clear();

    expect(log.entries()).toEqual([]);
  });

  it('describes payloads as one short line', () => {
    expect(formatPlaygroundEventDetail(undefined)).toBe('');
    expect(formatPlaygroundEventDetail('text')).toBe('text');
    expect(formatPlaygroundEventDetail(new Date(Date.UTC(2026, 9, 7)))).toBe(
      '2026-10-07T00:00:00.000Z',
    );
    expect(formatPlaygroundEventDetail(new Date(Number.NaN))).toBe('Invalid Date');
    expect(formatPlaygroundEventDetail(42)).toBe('42');
  });
});
