import config from './config/appConfig';

const NPaths = {
  awardChainDoc(uid: string = 'local') {
    return `awards.json`;
  },
  routes: {
    board(id) {
      return `/board/${id}`;
    },
    analytics() {
      return `/analytics`;
    },
    search() {
      return `/search`;
    },
    history() {
      return `/history`;
    },
    dashboard() {
      return `/dashboard`;
    },
    people() {
      return `/people`;
    },
    settings() {
      return '/settings';
    },
    uoms() {
      return '/uoms';
    },
  },
  storage: {
    trackers() {
      return `trackers.json`;
    },
    backup() {
      return `backup-settings.json`;
    },
    book(id: string) {
      return `${config.data_root}/books/${id}`;
    },
    boards() {
      return `boards.json`;
    },
    uniboards() {
      return `uniboards.json`;
    },
    dashboards() {
      return `dashboards.json`;
    },
    context() {
      return `context.json`;
    },
    csvTemplates() {
      return `csv-templates.json`;
    },
    templates() {
      return `templates.json`;
    },
    people() {
      return `people.json`;
    },
    locations() {
      return `locations.json`;
    },
    writingPrompts() {
      return `writing-prompts.json`;
    },
    plugins() {
      return `plugins.json`;
    },
    goals() {
      return `goals.json`;
    },
    awards() {
      return `awards.json`;
    },
    lastUsage() {
      return `last-usage.json`;
    },
    lastUsed() {
      return 'trackable-usage.json';
    },
    trackableUsage() {
      return 'trackable-usage.json';
    },
    uom() {
      return 'uoms.json';
    },
  },
  local: {
    sideStorage(path: string) {
      return `${config.local_data_root}/${path}`;
    },
  },
};

export default NPaths;
