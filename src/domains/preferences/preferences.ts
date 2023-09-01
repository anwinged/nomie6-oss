import type { StorageEngineType } from '../storage/storage';
import { writable } from 'svelte/store';

import { showToast } from '../../components/toast/ToastStore';
import { SideStorage, SideStorageKey } from '../side-storage/side-storage';

export type ThemeTypes = 'dark' | 'light' | 'auto';
export type PrefsWeekStartTypes = 'sunday' | 'monday';

export type PreferencesStateType = {
  use24hour?: boolean;
  useMetric?: boolean;
  usePin?: string;
  storageType?: StorageEngineType;
  betaFeatures?: boolean;
  peopleBoard?: boolean;
  contextBoard?: boolean;
  allBoard?: boolean;
  nowBoard?: boolean;
  theme?: 'dark' | 'light' | 'auto';
  fontSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  language?: string;
  weekStarts?: PrefsWeekStartTypes;
  compactTrackers?: boolean;
  hideBackupMessage?: boolean;
  backupDays: number;
  hideMessages?: boolean;
  allowFileEdit?: boolean;
  lastBackup?: string;
  alwaysLocate?: boolean;
  onboarded?: boolean;
  startPage?: 'track' | 'timeline' | 'history' | 'goals' | 'dashboard';
};

const sideStorage = new SideStorage(SideStorageKey.Preferences);

const preferencesInitialState: PreferencesStateType = sideStorage.get() || {
  use24hour: false,
  useMetric: false,
  usePin: undefined,
  storageType: undefined,
  betaFeatures: false,
  peopleBoard: false,
  contextBoard: false,
  allBoard: false,
  nowBoard: false,
  startPage: 'track',
  theme: 'auto',
  fontSize: 'md',
  language: 'en-us',
  weekStarts: 'sunday',
  compactTrackers: false,
  lastBackup: undefined,
  backupDays: 7,
  hideBackupMessage: false,
  hideMessages: false,
  allowFileEdit: false,
  alwaysLocate: true,
};

export const Prefs = writable(preferencesInitialState);

let localPrefs = preferencesInitialState;

Prefs.subscribe((s: PreferencesStateType) => {
  localPrefs = s;
  sideStorage.put(s);
});

export const getRawPrefs = (): PreferencesStateType => {
  return sideStorage.get();
};

export const enabledBetaFeatures = async (): Promise<void> => {
  Prefs.update((p) => {
    p.betaFeatures = true;
    return p;
  });
  showToast({ message: 'Beta Features Enabled', type: 'success' });
};

/**
 * Sets the Theme of the Browser
 * Does this by applying .mode-dark .mode-light to the Body
 * It will also check for auto
 * @param theme
 */
export const setDocumentTheme = (theme: ThemeTypes) => {
  let themeToSet = theme;
  if (theme === 'auto') {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    themeToSet = isDarkMode ? 'dark' : 'light';
  }
  document.documentElement.className = '';
  document.documentElement.classList.add(`mode-${themeToSet}`);
  document.documentElement.classList.add(`${themeToSet}`);
};

export const getDateFormats = (): {
  time: string;
  date: string;
  dateDay: string;
  shortDate: string;
  tinyDate: string;
  hour: string;
  mmm_d_yyyy: string;
  hourCompact: string;
  tinyNumber: string;
  monthYear: string;
} => {
  let format: {
    time: string;
    date: string;
    dateDay: string;
    shortDate: string;
    tinyDate: string;
    mmm_d_yyyy: string;
    hourCompact: string;
    hour: string;
    tinyNumber: string;
    monthYear: string;
  } = {
    time: 'h:mm A',
    hour: 'h A',
    hourCompact: 'ha',
    date: 'MMM Do YYYY',
    dateDay: 'ddd MMM Do YYYY',
    shortDate: 'M/D/YYYY',
    tinyDate: 'MMM D',
    mmm_d_yyyy: 'MMM D, YYYY',
    tinyNumber: 'M/D',
    monthYear: 'MMM YYYY',
  };
  if (localPrefs.use24hour) {
    format = {
      time: 'HH:mm',
      hour: 'HH00',
      date: 'Do MMM YYYY',
      dateDay: 'ddd Do MMM YYYY',
      hourCompact: 'HH',
      shortDate: 'D MM YYYY',
      tinyDate: 'D MMM',
      mmm_d_yyyy: 'D MMM, YYYY',
      tinyNumber: 'D/M',
      monthYear: 'MMM YYYY',
    };
  }
  return format;
};

export const getStorageEngineType = (): StorageEngineType => {
  return localPrefs.storageType;
};

export const saveStorageEngineType = (type: StorageEngineType) => {
  Prefs.update((s) => {
    s.storageType = type;
    return s;
  });
};
