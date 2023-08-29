import nid from '../../../modules/nid/nid';
import { md5 } from '../../../utils/hash/hash';
export type AwardConfig = {
  id?: string;
  name: string;
  level?: number;
  reason?: string;
  value?: number;
  hash?: string;
  image?: string;
  phash?: string;
  timestamp?: Date;
  config?: any;
};
export default class Award {
  id?: string;
  name: string;
  reason?: string;
  value: number = 0;
  image?: string;
  hash?: string;
  phash?: string;
  timestamp?: Date;

  constructor(starter: AwardConfig = { name: undefined }) {
    this.id = starter.id || `awd-${nid(6)}`;
    this.name = starter.name;
    this.reason = starter.reason;
    this.image = starter.image;
    this.value = starter.value;
    this.phash = starter.phash;
    this.timestamp = starter.timestamp || new Date();
    if (!this.name) {
      throw new Error('Award name is required');
    }
    this.hash = starter.hash;
  }

  getHash(): string {
    return md5(`${this.id}${this.phash}${this.timestamp.getTime()}${this.name}${this.reason}`);
  }
}
