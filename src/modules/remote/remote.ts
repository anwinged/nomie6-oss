class Remote {
  url: URL | null = null;
  syncEnabled: boolean;
  username: any;
  password: any;
  dbPrefix: any;
  database: any;
  _dirty: boolean;

  constructor(starter) {
    starter = starter || {};
    this.url = starter.url ? new URL(starter.url) : null;
    if (starter.host) {
      this.url = new URL(starter.host);
    }
    if (starter.valid) {
      this.syncEnabled = true;
    }
    this.username = starter.username || null;
    this.password = starter.password || null;
    this.dbPrefix = starter.dbPrefix || '';
    this.database = starter.database || 'nomie';
    this.syncEnabled = starter.syncEnabled || false;
  }

  setURL(url: string | URL) {
    try {
      this.url = new URL(url);
      this._dirty = false;
    } catch (e) {
      console.error('Set URL error', e.message);
    }
    return this;
  }

  isValid(): boolean {
    return this.url !== null;
  }

  getURL(): URL {
    return this.url;
  }

  auth() {
    return btoa(`${this.username}:${this.password}`);
  }

  // Convert a remote object to CouchURL
  makeConnectionUrl(): string | null {
    if (!this.isValid()) {
      return null;
    }
    let parsed = this.url;
    // parsed.username = this.username ? this.username || "".length : null;
    // parsed.password = this.password ? this.password || "".length : null;
    parsed.pathname = `/${this.database}`;
    return parsed.toString();
  }
}

export default Remote;
