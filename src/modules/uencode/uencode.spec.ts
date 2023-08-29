import { fromBlob, toBlob } from './uencode';
import { it, describe, expect } from 'vitest';

describe.skip('Chainer', () => {
  it('should chain steps', async () => {
    let test = { payload: 'Hi there' };
    let en = toBlob(test);
    let de = await fromBlob(en);
    console.log({ en, de });
    expect(de.payload).toBe('Hi there');
  });
});
