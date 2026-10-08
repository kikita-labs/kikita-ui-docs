import {
  type KuiChartCartesianSeries,
  type KuiChartScatterSeries,
  type KuiChartSlice,
} from '@kikita-labs/ui';

/** Category labels of the sample cartesian data. */
export const CHART_SAMPLE_CATEGORIES: readonly string[] = [
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
  'Sun',
];

const SAMPLE_SERIES: readonly KuiChartCartesianSeries[] = [
  { id: 'sessions', name: 'Sessions', data: [120, 180, 150, 220, 260, 210, 300] },
  { id: 'signups', name: 'Sign-ups', data: [40, 65, 52, 90, 110, 80, 140] },
  { id: 'upgrades', name: 'Upgrades', data: [10, 18, 12, 30, 35, 22, 48] },
];

const SAMPLE_SCATTER: readonly KuiChartScatterSeries[] = [
  {
    id: 'free',
    name: 'Free plan',
    points: [
      { x: 22, y: 32000, r: 6 },
      { x: 29, y: 41000, r: 9 },
      { x: 35, y: 52000, r: 7 },
      { x: 41, y: 61000, r: 12 },
    ],
  },
  {
    id: 'pro',
    name: 'Pro plan',
    points: [
      { x: 26, y: 48000, r: 8 },
      { x: 33, y: 67000, r: 11 },
      { x: 44, y: 82000, r: 14 },
      { x: 52, y: 95000, r: 10 },
    ],
  },
  {
    id: 'team',
    name: 'Team plan',
    points: [
      { x: 31, y: 58000, r: 7 },
      { x: 38, y: 74000, r: 9 },
      { x: 47, y: 90000, r: 13 },
      { x: 55, y: 110000, r: 8 },
    ],
  },
];

const SAMPLE_SLICES: readonly KuiChartSlice[] = [
  { id: 'free', label: 'Free', value: 40 },
  { id: 'pro', label: 'Pro', value: 35 },
  { id: 'business', label: 'Business', value: 25 },
  { id: 'enterprise', label: 'Enterprise', value: 12 },
];

/** The first `count` sample cartesian series; `gaps` turns the fourth value of each into a gap. */
export function chartSampleSeries(count: number, gaps = false): readonly KuiChartCartesianSeries[] {
  return SAMPLE_SERIES.slice(0, Math.max(1, Math.min(count, SAMPLE_SERIES.length))).map(
    (series) => ({
      ...series,
      data: gaps ? series.data.map((value, index) => (index === 3 ? null : value)) : series.data,
    }),
  );
}

/** The first `count` sample scatter series. */
export function chartSampleScatter(count: number): readonly KuiChartScatterSeries[] {
  return SAMPLE_SCATTER.slice(0, Math.max(1, Math.min(count, SAMPLE_SCATTER.length)));
}

/** The first `count` sample donut slices. */
export function chartSampleSlices(count: number): readonly KuiChartSlice[] {
  return SAMPLE_SLICES.slice(0, Math.max(1, Math.min(count, SAMPLE_SLICES.length)));
}
