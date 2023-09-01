import PouchDB from 'pouchdb';
import Remote from '../../../../modules/remote/remote';
import type { StorageEngine } from '../../storage-engine';
import { SideStorage, SideStorageKey } from '../../../side-storage/side-storage';

/**
 * Svelte is throwing errors when importing pouch
 * instead i've moved those packages into the build_tools/move-resources
 * it will move the needed files into a vendor folder
 * and can be imported with script calls..
 * Not idea, but I can get svelte to compile with them.
 */
// import pouchdb from "pouchdb";

const remoteStorage = new SideStorage(SideStorageKey.PouchDbRemote);

class PouchDBEngineClass implements StorageEngine {
  remote: Remote; // object to store username, password, host

  dbName = 'nomie6-pouch'; // database key
  db: PouchDB.Database;

  syncValid: boolean = false;
  sync: boolean = false; // if we should sync
  syncing: boolean = false; // is syncing
  syncer: PouchDB.Replication.Sync<{}> | null = null; // the sync object

  listeners = [];
  changeListeners = {};

  constructor(remote: Remote) {
    this.remote = remote;
    this.db = new PouchDB(this.dbName, {
      auto_compaction: true,
    });
  }

  onReady(func) {
    func(this);
    // No need to setup just call the function
    // if (listeners.indexOf(func) == -1) {
    //   listeners.push(func);
    // }
  }

  fireReady() {
    this.listeners.forEach((func) => {
      func();
    });
    this.listeners = [];
  }

  // If something has changed
  onChange(change) {
    this.syncing = true;
    if (change.direction == 'pull') {
      // It's an update
      change.change.docs.forEach((doc) => {
        if (this.changeListeners.hasOwnProperty(doc._id)) {
          this.changeListeners[doc._id].forEach((func) => {
            func(doc.data);
          });
        }
      });
    }
  }

  onPaused(change) {
    this.syncing = false;
  }

  onError(error) {
    console.error(error);
    this.syncing = false;
  }

  startSync() {
    let remote = this.getRemote();
    let syncURL = remote.makeConnectionUrl();
    if (!syncURL) {
      return;
    }

    let errorCount = 0;
    let self = this;

    let syncOptions: any = {
      live: true,
      retry: true,
      ajax: { cache: false },
      batch_size: 10,
    };
    if (remote.username || remote.password) {
      syncOptions.auth = {
        username: remote.username,
        password: remote.password,
      };
    }
    this.syncer = PouchDB.sync(this.dbName, syncURL, syncOptions);
    this.syncer
      .catch((e) => {
        console.error(`Catch error in syncer ${e.message}`);
        this.syncing = false;
      })
      .then(() => {
        self.syncing = true;
        self.syncValid = true;
      });
    this.syncer
      .on('complete', this.onChange)
      .on('change', this.onChange)
      .on('paused', this.onPaused)
      .on('error', (e) => {
        this.onError(e);
        errorCount++;
        if (errorCount > 10) {
          alert('Something bad is going on');
        }
      });
  }

  stopSync() {
    if (this.syncer) {
      this.syncer.cancel();
      this.syncing = false;
      let remote = this.getRemote();
      remote.syncEnabled = false;
      this.saveRemote(remote);
    }
  }

  getRemote(): Remote {
    return this.remote;
  }

  saveRemote(remote: Remote) {
    this.remote = remote;
    remoteStorage.put(remote);
  }

  async init() {
    // Determine if we should be syncing
    this.sync = this.remote.syncEnabled;
    if (this.remote.syncEnabled) {
      setTimeout(() => {
        this.startSync();
      }, 500);
    }
    return this.fireReady();
  }

  info() {
    return {
      sync: this.syncer,
    };
  }

  async put(path: string, content): Promise<void> {
    let payload = {
      _id: path,
      data: content,
    };
    // check if it exists
    let exists = await this.getFullDoc(path);
    try {
      if (exists) {
        await this.db.put({ ...exists, ...payload });
      } else {
        await this.db.put(payload);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async getFullDoc(path: string): Promise<any> {
    let doc = null;
    try {
      doc = await this.db.get(path);
    } catch (e) {}
    return doc;
  }

  async get(path: string) {
    let doc = null;
    try {
      let fullDoc = await this.getFullDoc(path);
      doc = fullDoc ? fullDoc.data : null;
    } catch (e) {}
    return doc;
  }

  async list(): Promise<string[]> {
    let docs = await this.db.allDocs();
    let rows = docs ? docs.rows : [];
    return rows.map((doc) => String(doc.id));
  }

  async delete(path: string): Promise<void> {
    let doc = await this.getFullDoc(path);
    if (doc) {
      await this.db.remove(doc);
    }
  }
}

export const PouchDBEngine = new PouchDBEngineClass(new Remote(remoteStorage.get()));
