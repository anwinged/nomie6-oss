import { writable } from 'svelte/store';
import type { SideStorageKey } from '../domains/side-storage/side-storage';
import { SideStorage } from '../domains/side-storage/side-storage';

type DocStorePropTypes = {
  label?: string;
  itemInitializer?: Function;
  itemSerializer?: Function;
  default?: any;
};

export type SideStorageStoreState = {
  [key: string]: any;
};

/**
 * Create a Key Value Store
 */
export const createSideStorageStore = (key: SideStorageKey, props: DocStorePropTypes = {}) => {
  const sideStorage = new SideStorage(key);
  const baseState: SideStorageStoreState = sideStorage.get() || props.default || {};
  const { update, subscribe, set } = writable(baseState);

  /**
   * Write to Storage
   */
  const _write = (state: SideStorageStoreState): SideStorageStoreState => {
    // Clone State
    const _state = { ...state };

    // Loop over keys and serialize if serializer
    Object.keys(state).map((key) => {
      _state[key] = props.itemSerializer ? props.itemSerializer(state[key]) : state[key];
    });

    // Save to Storage
    sideStorage.put(_state);

    return _state;
  };

  /**
   * Upsert and Item
   */
  const setItem = (key: string, item: any): SideStorageStoreState => {
    let state;
    update((s) => {
      s[key] = props.itemInitializer ? props.itemInitializer(item) : item;
      state = s;
      return s;
    });
    return _write(state);
  };

  /**
   * Update Sync
   * Updates the state and writes to storage
   */
  const updateSync = (updateFunc: Function): SideStorageStoreState => {
    let state: SideStorageStoreState;
    update((s) => {
      state = updateFunc(s);
      return state;
    });
    return _write(state);
  };

  /**
   * Remove an Item
   */
  const removeItem = (key: string): SideStorageStoreState => {
    let state;
    update((s) => {
      if (s[key]) {
        delete s[key];
      }
      state = s;
      return s;
    });
    return _write(state);
  };

  /**
   * Get Raw State
   */
  const rawState = (): SideStorageStoreState => {
    let state: SideStorageStoreState;
    update((s) => {
      state = s;
      return s;
    });
    return state;
  };

  // Return base methods
  return {
    removeItem,
    setItem,
    update,
    updateSync,
    subscribe,
    set,
    rawState,
  };
};
