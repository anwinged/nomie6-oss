import type { StorageEngineType } from './storage';

export interface StorageEngineDescription {
  id: StorageEngineType;
  name: string;
  shortName: string;
  description: string;
  price?: string;
  accountRequired?: boolean;
  multipleDevices?: boolean;
  advanced?: boolean;
}

export const StorageEngineDescriptions: Array<StorageEngineDescription> = [
  {
    id: 'local',
    name: 'Local Only',
    shortName: 'Local',
    description: 'Data is stored on this device only.',
    price: 'FREE',
    multipleDevices: false,
  },
  {
    id: 'pouchdb',
    name: 'CouchDB',
    shortName: 'CouchDB',
    description: 'Sync to your own CouchDB server',
    price: 'FREE',
    multipleDevices: false,
    advanced: true,
  },
];

export function getStorageEngineDescription(id: StorageEngineType): StorageEngineDescription {
  return StorageEngineDescriptions.find((engine) => engine.id === id);
}
