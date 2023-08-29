import { Md5 } from 'ts-md5';

export function md5(str: string): string {
  return Md5.hashStr(str).toString();
}

export function fastHash(str: string): number {
  let hash = 0,
    i,
    chr;

  if (str.length === 0) {
    return hash;
  }

  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }

  return hash;
}
