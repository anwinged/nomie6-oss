// This is a stupidly confusing name...
// Consider renaming to something about software-update or something
import { writable } from 'svelte/store';

// Vendors
import whatsNew from '../config/whatsNew';
import { Interact } from './interact';
import { SideStorage, SideStorageKey } from '../domains/side-storage/side-storage';

// Stores

// Nomie API Store

const AppStoreState: any = {
  whatsNew: null,
};

const lastVersionStorage = new SideStorage(SideStorageKey.LastVersion);

const AppStoreInit = () => {
  const { update, subscribe, set } = writable(AppStoreState);

  const checkForUpdate = () => {
    let lastVersion = lastVersionStorage.get();

    if (lastVersion !== whatsNew.version) {
      lastVersionStorage.put(whatsNew.version);
    }
    // If they're not a brand new user - meaning they have a last Version already stored.
    if (lastVersion && lastVersion !== whatsNew.version) {
      Interact.confetti({ timeout: 3200 });
      update((state) => {
        state.whatsNew = whatsNew;
        return state;
      });
    }
  };

  const reveal = () => {
    update((state) => {
      state.whatsNew = whatsNew;
      return state;
    });
  };

  const closeUpdate = () => {
    update((state) => {
      state.whatsNew = null;
      return state;
    });
  };

  return {
    checkForUpdate,
    closeUpdate,
    update,
    subscribe,
    set,
    reveal,
  };
};

export const AppStore = AppStoreInit();
