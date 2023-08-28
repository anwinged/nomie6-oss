import { describe, bench } from 'vitest';
import { tokenizeLite } from './lite';

let note = `Testing #notes #notes(10.1)
    #sleep(04:00:00) #sleep(00:10:00) #note #notes_boat /home
@bob, @Bob! @mom @😡
  https://google.com nomie://nomie.app
    +contexts(90days) +contextsy Sweet movie.`;

describe('lite tokenizer', () => {
  bench('normal', () => {
    tokenizeLite(note);
  });
});
