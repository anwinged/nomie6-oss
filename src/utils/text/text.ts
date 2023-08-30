import escapeRegExp from 'lodash/escapeRegExp';
import camelCase from 'lodash/camelCase';

/**
 * Truncate a String
 */
export function truncateText(str: string, len: number, showEnd: number = 0) {
  if (str.length <= len) {
    return str;
  }
  if (showEnd) {
    let end = str.substr(str.length - showEnd, str.length);
    let start = str.substr(0, len - showEnd);
    return `${start}...${end}`;
  }
  return str.substr(0, len) + '...';
}

/**
 * Convert string to Dash Case
 */
export function textToId(str: string): string {
  return `id-${camelCase(str)}`;
}

/**
 * Is String an Email
 */
export function isEmail(email: string): boolean {
  return !!email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

/**
 * Open Email Client
 */
export function composeEmail(to: string, subject: string, body: string) {
  window.open(
    `mailto:support@happydata.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    '_system'
  );
}

/**
 * Remove a Token Prefix from a string
 */
export function removePrefix(str: string): string {
  return str.replace(/(\#|\@|\+)/gi, '');
}

/**
 * Get Initials from a string
 */
export function initials(str: string): string {
  str = `${str}`;
  const split = str.split(' ');
  if (split.length == 1 && str.length) {
    return str.substr(0, 2).toUpperCase();
  } else if (split.length > 1) {
    return `${split[0].substr(0, 1)}${split[split.length - 1].substr(0, 1)}`.toUpperCase();
  } else {
    return 'NA';
  }
}

/**
 * Replace a chunk of text at a specific location
 */
export function replaceTextAt(text: string, replaceThis: string, withThis: string, pos: number) {
  let base = `${text}`;
  let first = base.substring(0, pos);
  let second = base.substring(pos, base.length);
  let reg = new RegExp(escapeRegExp(replaceThis), 'gi');
  return `${first}${second.replace(reg, withThis)}`;
}

export default {
  truncate: truncateText,
  initials,
};

export const truncate = truncateText;
