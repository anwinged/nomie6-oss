import FakeEngineInstance from './engines/fake/engine.fake';
import { it, describe, expect } from 'vitest';

describe('modules/storage.dumb should mock storage calls', function () {
  it('should get and put variables', () => {
    FakeEngineInstance.onReady(async () => {
      await FakeEngineInstance.put('testers/name.json', 'Tester McTesterson');
      const name = await FakeEngineInstance.get('testers/name.json');
      expect(name).toEqual(name);
    });
  });

  it('should delete variables', async () => {
    await FakeEngineInstance.put('testers/name.json', 'Tester McTesterson');
    await FakeEngineInstance.delete('testers/name.json');
    const name = await FakeEngineInstance.get('testers/name.json');
    expect(name).toEqual(null);
  });

  it('should list documents', async () => {
    await FakeEngineInstance.put('testers/name.json', 'Tester McTesterson');
    await FakeEngineInstance.put('testers/lists.json', [1, 2, 3]);
    const list = await FakeEngineInstance.list();
    expect(list.length).toEqual(2);
  });
});
