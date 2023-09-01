import { writable } from 'svelte/store';
import type { Trackable } from '../trackable/Trackable.class';
import { SideStorage, SideStorageKey } from '../side-storage/side-storage';

type ChartOptions = {
  type: 'bar' | 'line';
  startWithZero: boolean;
  stats:
    | 'none'
    | 'avg'
    | 'sma-7'
    | 'sma-15'
    | 'sma-30'
    | 'ema-7'
    | 'ema-15'
    | 'ema-30'
    | 'split-11'
    | 'split-12'
    | 'split-13'
    | 'cumm';
  include: Trackable;
};

export type ChartOptionsStoreState = {
  [key: string]: ChartOptions;
};

const chartOptionsStorage = new SideStorage(SideStorageKey.ChartOptions);

export const saveChartOptions = (id: string, options: ChartOptions) => {
  const existing = getChartOptions();
  existing[id] = options;
  chartOptionsStorage.put(existing);
};

export const getChartOption = (id: string): ChartOptions | undefined => {
  return getChartOptions()[id];
};

export const getChartOptions = (): ChartOptionsStoreState => {
  try {
    return chartOptionsStorage.get() || {};
  } catch (e) {
    return {};
  }
};

export const ChartOptionsStore = writable<ChartOptionsStoreState>(getChartOptions());
