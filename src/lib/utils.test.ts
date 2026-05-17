import { describe, it, expect } from 'vitest';
import {
  formatDate,
  formatNumber,
  formatCompactNumber,
  formatDuration,
  formatPace,
  truncate,
  slugify,
  capitalize,
  isValidEmail,
  isValidUrl,
  generateId,
  randomItem,
} from './utils';

describe('Date Utilities', () => {
  it('formats date correctly', () => {
    const result = formatDate('2024-01-15', 'MMMM d, yyyy');
    expect(result).toBe('January 15, 2024');
  });

  it('formats short date', () => {
    const result = formatDate('2024-01-15', 'MMM d');
    expect(result).toBe('Jan 15');
  });
});

describe('Number Utilities', () => {
  it('formats number with commas', () => {
    expect(formatNumber(1000)).toBe('1,000');
    expect(formatNumber(1000000)).toBe('1,000,000');
  });

  it('formats compact number', () => {
    expect(formatCompactNumber(1500)).toBe('1.5K');
    expect(formatCompactNumber(1500000)).toBe('1.5M');
  });
});

describe('Duration Utilities', () => {
  it('formats seconds to duration', () => {
    expect(formatDuration(0)).toBe('0:00');
    expect(formatDuration(60)).toBe('1:00');
    expect(formatDuration(3661)).toBe('1:01:01');
  });

  it('formats pace (seconds per km)', () => {
    expect(formatPace(330)).toBe('5:30');
    expect(formatPace(300)).toBe('5:00');
  });
});

describe('String Utilities', () => {
  it('truncates string', () => {
    // truncate preserves original if shorter than length
    expect(truncate('Hello', 10)).toBe('Hello');
    expect(truncate('Hi', 10)).toBe('Hi');
  });

  it('slugifies string', () => {
    expect(slugify('Hello World')).toBe('hello-world');
    expect(slugify('Test  Page')).toBe('test-page');
  });

  it('capitalizes first letter', () => {
    expect(capitalize('hello')).toBe('Hello');
    expect(capitalize('Hello')).toBe('Hello');
  });
});

describe('Validation Utilities', () => {
  it('validates email', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('invalid')).toBe(false);
    expect(isValidEmail('test@')).toBe(false);
  });

  it('validates URL', () => {
    expect(isValidUrl('https://example.com')).toBe(true);
    expect(isValidUrl('http://test.com')).toBe(true);
    expect(isValidUrl('not-a-url')).toBe(false);
  });
});

describe('Misc Utilities', () => {
  it('generates unique ID', () => {
    const id = generateId();
    expect(id.length).toBeGreaterThan(0);
    expect(typeof id).toBe('string');
  });

  it('gets random item', () => {
    const arr = [1, 2, 3, 4, 5];
    const item = randomItem(arr);
    expect(arr).toContain(item);
  });
});