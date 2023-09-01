import { writable } from 'svelte/store';
import { parseNumber } from '../../utils/parseNumber/parseNumber';
import { SideStorage, SideStorageKey } from '../side-storage/side-storage';

const countStorage = new SideStorage(SideStorageKey.LaunchCount);

const launchCount: number = parseNumber(countStorage.get() || '1');

export const LaunchCount = writable(launchCount);

export const trackLaunch = () => {
  countStorage.put(`${launchCount + 1}`);
};
