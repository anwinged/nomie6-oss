import NLog from './nomie-log';
import math from '../../utils/math/math';

import { Trackable } from '../trackable/Trackable.class';
import TrackerClass from '../../modules/tracker/TrackerClass';
import { it, describe, expect } from 'vitest';

const testTrackables = {
  '#bad': new Trackable({
    type: 'tracker',
    tracker: new TrackerClass({
      tag: 'bad',
      emoji: '☹️',
      type: 'value',
    }),
  }),
};

describe('modules/nomie-log', function () {
  let stub = {
    note: `I'm a note for #testing and I'm #good(344) and #good and kinda #bad sometimes #bad and @brandon is now here +testing context and +more.
		 I bet @betty would have dug Nomie, she was my grandmother. #cheese(50) +love
		`,
  };

  it('should get trackables', () => {
    const log = new NLog({ note: stub.note });
    const trackables = log.getTrackables(testTrackables);
    expect(trackables.length).toBe(11);
    const bad: Trackable = trackables.find((t) => t.tag === '#bad');
    const cheese: Trackable = trackables.find((t) => t.tag === '#cheese');
    expect(bad.tracker.emoji).toBe('☹️');
    expect(bad.value | bad.defaultValue).toBe(1);
    expect(cheese.value).toBe(50);
  });

  it('should handle the speed', () => {
    // let start = new Date().getTime()
    let items = [];
    for (var i = 0; i < 100000; i++) {
      let log = new NLog({
        lat: 39.764,
        lng: 126.978,
        note: 'Testing Location Soule',
      });
      items.push(log);
    }
  });

  it('log.getMeta', () => {
    const log = new NLog(stub);
    const meta = log.getMeta();

    expect(meta.people[0].id).toEqual('brandon');
    expect(meta.people[1].id).toEqual('betty');
    expect(meta.context[0].id).toEqual('testing');
    expect(meta.context[1].id).toEqual('more');
    expect(meta.context[2].id).toEqual('love');
    expect(meta.trackers[0].id).toEqual('testing');
  });

  it('log initializes', () => {
    const log = new NLog(stub);
    expect(log).toBeInstanceOf(NLog);
    // expect(log.note).toEqual(stub.note);
  });

  it('should scrub the note', () => {
    const log = new NLog({
      note: 'Hello #there @brandon',
    });
    let scrubbed = log.getScrubbedNote();
    expect(scrubbed).toEqual('Hello @brandon');
  });

  it('should scrub the note', () => {
    const log = new NLog({
      note: 'Hello #there #there(40) #there(30) @brandon',
    });
    let value = log.getTrackerValue('there');
    expect(value).toEqual(71);
  });

  it('log.toObject', () => {
    const log = new NLog(stub);
    expect(typeof log.toObject()._id).toEqual('string');
  });

  it('log.expanded', () => {
    const log = new NLog(stub);
    log.getMeta();
    expect(log.trackers.length).toEqual(6);
  });

  it('log.hasTracker', () => {
    const log = new NLog(stub);
    log.getMeta();
    expect(log.hasTracker('testing')).toEqual(true);
    expect(log.hasTracker('nothing')).toEqual(false);
  });

  it('log.addTag', () => {
    const log = new NLog(stub);
    log.expanded();
    log.addTag('cheese', 50);
    expect(log.hasTracker('cheese')).toEqual(true);
    expect(math.sum(log.getTrackerValues('cheese'))).toEqual(100);
  });
});
