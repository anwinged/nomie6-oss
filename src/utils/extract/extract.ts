import snakeCase from '../snake-case/snake-case';

import { tokenizeLite } from '../../modules/tokenizer/lite';
import type { TokenType } from '../../modules/tokenizer/lite';
import type { Token } from '../../modules/tokenizer/lite';

type ParseOptions = {
  includeGeneric?: boolean;
};

/**
 * Parse a string into an array of Trackable Items
 * pass in an optional option.includeGeneric to include all terms
 */
function parse(str: string, options?: ParseOptions): Array<Token> {
  options = options || {};
  return tokenizeLite(str).filter((token: Token) => {
    if (options.includeGeneric) {
      return true;
    } else {
      return token.type !== 'generic' && token.type !== 'line-break';
    }
  });
}

/**
 * Converts a single trackable element like #tag or @people to a TrackableElement
 */
function toElement(str: string): Token | null {
  const parsed: Array<Token> = parse(str);
  if (parsed.length) {
    return parsed[0];
  }
  if (str.length) {
    return { id: snakeCase(str), prefix: '', raw: str, type: 'generic' };
  }
  return null;
}

function generateRaw(str: string, type: TokenType = 'generic') {
  switch (type) {
    case 'tracker':
      return `#${str}`;
    case 'person':
      return `@${str}`;
    case 'context':
      return `+${str}`;
    default:
      return str;
  }
}

function people(str: string): Array<Token> {
  return parse(str).filter((token) => {
    return token.type == 'person';
  });
}

function trackers(str: string): Array<Token> {
  return parse(str).filter((token) => {
    return token.type == 'tracker';
  });
}

function context(str: string): Array<Token> {
  return parse(str).filter((token) => {
    return token.type == 'context';
  });
}

export default {
  parse,
  toElement,
  generateRaw,
  people,
  trackers,
  context,
};
