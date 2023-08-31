export interface StorageInterop {
  get(path: string): Promise<any>;
  put(path: string, content: any): Promise<void>;
  delete(path: string): Promise<void>;
  list(): Promise<string[]>;
}

export interface StorageEngine extends StorageInterop {
  init(): Promise<void>;
  onReady(func: Function): void;
}
