import { md5 } from '../../utils/hash/hash';

export const objectHash = (obj: unknown = {}): string => {
  return md5(JSON.stringify(obj));
};
