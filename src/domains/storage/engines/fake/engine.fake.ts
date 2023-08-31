/**
 * Storage DUMB! This is only for testing modules that need to use storage,
 * and the current storage module is to bound to pouchdb and blockstack
 * both of which cause problems with Cypress
 */

import { wait } from '../../../../utils/tick/tick';
import type { StorageEngine } from '../../storage-engine';
import type { Promise } from 'cypress/types/cy-bluebird';

class FakeEngine implements StorageEngine {
  data = {};

  async get(key: string) {
    await wait(100);
    return this.data.hasOwnProperty(key) ? this.data[key] : null;
  }

  async put(key: string, value: any) {
    await wait(100);
    this.data[key] = value;
  }

  async delete(key: string) {
    await wait(100);
    delete this.data[key];
  }

  async list() {
    await wait(100);
    return Object.keys(this.data);
  }

  init(): Promise<void> {
    return null;
  }

  onReady(func: Function): void {}
}

const FakeEngineInstance = new FakeEngine();

export default FakeEngineInstance;
