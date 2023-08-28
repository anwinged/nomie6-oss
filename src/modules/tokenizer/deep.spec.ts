import { tokenizeDeep } from './deep';
import { it, describe, expect } from 'vitest';

let note = `Testing #notes #notes(10.1)
    #sleep(04:00:00) #sleep(00:10:00) #note #notes_boat /home
@bob, @Bob! @mom @😡
  https://google.com nomie://nomie.app
    +contexts(90days) +contextsy Sweet movie.`;

let linkNote = `This is a note with linkes!
    https://github.com and https://nomie.app what about http://twitter.com/brandoncorbin and thats it
    `;

describe('deep tokenizer', () => {
  it('should not find a single + as a context', () => {
    let note = `This is a + note`;
    let results = tokenizeDeep(note);
    expect(results.context.length).toBe(0);
  });

  it('should handle handle links', () => {
    let results = tokenizeDeep(linkNote);

    expect(results.links.length).toBe(3);
    expect(results.links[0].raw).toBe('https://github.com');
    expect(results.links[2].raw).toBe('http://twitter.com/brandoncorbin');
  });

  it('should tokenize deep a note', () => {
    let results = tokenizeDeep(note);

    expect(results).toBeTruthy();
    expect(results.context.length).toBe(2);
    expect(results.people.length).toBe(3);
    expect(results.trackers.length).toBe(4);
    expect(results.get('tracker', 'sleep').sum).toBe(15000);

    // Does not exist
    expect(results.get('tracker', 'turkey')).toBeFalsy();
    expect(results.get('turkey', 'turkey')).toBeFalsy();
  });

  it('should handle funky characters', () => {
    expect(tokenizeDeep('#💩(1.6mile)').get('tracker', '💩').sum).toBe(1.6);
    expect(tokenizeDeep('+💩').get('context', '💩')).toBeTruthy();
    expect(tokenizeDeep('@💩').get('person', '💩')).toBeTruthy();
  });

  it('stats should sum and average multiple of the same tag', () => {
    let results = tokenizeDeep(note);
    let noteTracker = results.trackers.find((el) => el.id == 'notes');
    expect(noteTracker.sum).toBe(11.1);
    expect(noteTracker.avg).toBe(5.55);
    expect(noteTracker.values.toString()).toBe([1, 10.1].toString());

    let sleepTracker = results.trackers.find((el) => el.id == 'sleep');
    expect(sleepTracker.values.toString()).toBe([14400, 600].toString());
  });
});
