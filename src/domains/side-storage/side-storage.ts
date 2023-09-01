import NPaths from '../../paths';

export enum SideStorageKey {
  ChartOptions = 'chart_options',
  FirstBook = 'first_book',
  FontSize = 'font_size',
  GoalStatue = 'goal_status',
  Language = 'language',
  LastBackupDate = 'last_backup_date',
  LastDashIndex = 'last_dash_index',
  LastKnownBoard = 'last_known_board',
  LastVersion = 'last_version',
  LaunchCount = 'launch_count',
  LocationCache = 'location_cache',
  PouchDbRemote = 'pouch_db_remote',
  Preferences = 'preferences',
  RecentEmojis = 'recent_emojis',
  Search = 'search',
  TimelineSettings = 'timeline_settings',
}

/**
 * SideStorage is a class that allows you to store data in the browser's localStorage,
 * and it's a lot easier to use than localStorage directly.
 */
export class SideStorage {
  private readonly path: string;

  constructor(key: SideStorageKey) {
    this.path = NPaths.local.sideStorage(key);
  }

  get(): any {
    try {
      const item = localStorage.getItem(this.path) || 'null';
      return JSON.parse(item) || null;
    } catch (e) {
      console.error('SideStorage could not parse the JSON data:', this.path);
    }
    return null;
  }

  put(value: any): void {
    localStorage.setItem(this.path, JSON.stringify(value));
  }
}
