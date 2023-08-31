import localforage from 'localforage';
import type { StorageEngine } from '../../storage-engine';

class LocalForageEngineClass implements StorageEngine {
  readyListeners: any = [];

  constructor() {}

  async init() {
    /**
     * Request the browser persist the data
     */
    if (navigator.storage && navigator.storage.persist) {
      const isPersisted = await navigator.storage.persisted();
      if (!isPersisted) {
        await navigator.storage.persist();
      }
    }
    this.fireReady();
  }

  onReady(func: Function): void {
    // No need to setup just call the function
    if (this.readyListeners.indexOf(func) == -1) {
      this.readyListeners.push(func);
    }
  }

  private fireReady() {
    this.readyListeners.forEach((func) => {
      func();
    });
    this.readyListeners = [];
  }

  async get(path: string): Promise<any> {
    const content = await localforage.getItem(path);
    return typeof content === 'string' ? JSON.parse(content) : null;
  }

  async put(path: string, content): Promise<void> {
    await localforage.setItem(path, JSON.stringify(content));
  }

  async list(): Promise<string[]> {
    return await localforage.keys();
  }

  async delete(path: string): Promise<void> {
    await localforage.removeItem(path);
  }
}

export const LocalForageEngine = new LocalForageEngineClass();
