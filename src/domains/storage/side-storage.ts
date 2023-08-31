import NPaths from '../../paths';

/**
 * SideStorage is a class that allows you to store data in the browser's localStorage,
 * and it's a lot easier to use than localStorage directly.
 */
export class SideStorage {
  fullDbPath: string;
  data: any;

  constructor(path: string) {
    this.fullDbPath = NPaths.local.sideStorage(path);
    try {
      this.data = JSON.parse(localStorage.getItem(this.fullDbPath) || '{}') || {};
    } catch (e) {
      console.error('SideStorage could not parse the JSON data');
    }
  }

  get(key: string): any {
    return this.data.hasOwnProperty(key) ? this.data[key] : null;
  }

  put(key: string, value: any) {
    this.data[key] = value;
    localStorage.setItem(this.fullDbPath, JSON.stringify(this.data));
  }
}
