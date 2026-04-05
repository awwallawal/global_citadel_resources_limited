import { formatDate, cn } from '../../src/lib/utils';

describe('formatDate', () => {
  it('formats ISO date string to en-GB long format', () => {
    expect(formatDate('2026-03-27')).toBe('27 March 2026');
  });

  it('formats Date object to en-GB long format', () => {
    // Use UTC noon to avoid timezone issues
    expect(formatDate(new Date('2026-01-15T12:00:00Z'))).toBe('15 January 2026');
  });

  it('handles various date string formats', () => {
    expect(formatDate('2026-12-01')).toBe('1 December 2026');
  });

  it('returns empty string for invalid date string', () => {
    expect(formatDate('not-a-date')).toBe('');
  });

  it('returns empty string for invalid Date object', () => {
    expect(formatDate(new Date('invalid'))).toBe('');
  });
});

describe('cn', () => {
  it('handles single class', () => {
    expect(cn('text-red-500')).toBe('text-red-500');
  });

  it('merges multiple classes', () => {
    expect(cn('text-red-500', 'font-bold')).toBe('text-red-500 font-bold');
  });

  it('handles conditional classes', () => {
    const isActive = true;
    expect(cn('base', isActive && 'active')).toBe('base active');
  });

  it('filters falsy values', () => {
    expect(cn('base', false, null, undefined, 'end')).toBe('base end');
  });

  it('merges conflicting Tailwind classes correctly', () => {
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  it('merges conflicting padding classes', () => {
    expect(cn('p-4', 'p-8')).toBe('p-8');
  });

  it('handles array of classes', () => {
    expect(cn(['text-sm', 'font-bold'])).toBe('text-sm font-bold');
  });
});
