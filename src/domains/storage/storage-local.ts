class LocalStorageClass {
  get(path: string): any {
    return JSON.parse(localStorage.getItem(`storage/${path}`) || 'null');
  }

  put(path: string, value: any) {
    return localStorage.setItem(`storage/${path}`, JSON.stringify(value));
  }

  remove(path: string): void {
    localStorage.removeItem(`storage/${path}`);
  }
}

const LocalStorage = new LocalStorageClass();

export default LocalStorage;
