/**
 * Nomie's someone generic data storage
 * this was used originally to communicate with sqlite
 * then pouchdb, now it's blockstack and localforage.
 */

// Vendors

import { getStorageType, saveStorageType } from '../preferences/Preferences';
import { Interact } from '../../store/interact';
import { switchToLocal } from '../settings/settings-functions';

import type { StorageEngine } from './storage-engine';
import { LocalForageEngine } from './engines/localforage/engine.localforage';
import { PouchDBEngine } from './engines/pouchdb/engine.pouchdb';

export type StorageEngineType = 'local' | 'dumb' | 'pouchdb';

export interface StorageEngineDescription {
  id: StorageEngineType;
  name: string;
  shortName: string;
  description: string;
  price?: string;
  accountRequired?: boolean;
  multipleDevices?: boolean;
  engine: StorageEngine;
  advanced?: boolean;
}

export const StorageEngines: Array<StorageEngineDescription> = [
  {
    id: 'local',
    name: 'Local Only',
    shortName: 'Local',
    description: 'Data is stored on this device only.',
    price: 'FREE',
    multipleDevices: false,
    engine: LocalForageEngine,
  },
  {
    id: 'pouchdb',
    name: 'CouchDB',
    shortName: 'CouchDB',
    description: 'Sync to your own CouchDB server',
    price: 'FREE',
    multipleDevices: false,
    engine: PouchDBEngine,
    advanced: true,
  },
];

export function getStorageEngineDescription(id: StorageEngineType): StorageEngineDescription {
  return StorageEngines.find((engine) => engine.id === id);
}

const engines: { [id in StorageEngineType]?: StorageEngine } = {};
StorageEngines.map((e) => {
  engines[e.id] = e.engine;
});

export class StorageManager implements StorageEngine {
  engines: { [id in StorageEngineType]?: StorageEngine };
  engineType: StorageEngineType;

  constructor() {
    this.engines = engines;
    this.engineType = getStorageType() || 'local';
  }

  // Get user storage type
  storageType(): StorageEngineType {
    return this.engineType;
  }

  setType(type: StorageEngineType) {
    saveStorageType(type);
  }

  getEngine(): StorageEngine {
    try {
      return this.engines[this.storageType()];
    } catch (e) {
      console.error('Error getting Engine');
      console.error('e', e.message);
      return null;
    }
  }

  onReady(func) {
    return this.getEngine().onReady(func);
  }

  async init(): Promise<void> {
    try {
      return await this.getEngine().init();
    } catch (e) {
      const loadLocal = await Interact.confirm(
        'Error loading this storage engine',
        `${e}.\n Restart with Local Storage?`
      );
      if (loadLocal) {
        switchToLocal();
      }
    }
  }

  // Get a file
  async get(path: string) {
    return await this.getEngine().get(path);
  }

  // Put a file
  async put(path: string, content) {
    return await this.getEngine().put(path, content);
  }

  // Delete a file
  async delete(path: string): Promise<void> {
    return await this.getEngine().delete(path);
  }

  async list(): Promise<string[]> {
    return await this.getEngine().list();
  }
}

const Storage = new StorageManager();

export default Storage;
