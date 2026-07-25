import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getStoredTheme, getPreferredTheme, setTheme } from '../src/lib/theme';

describe('theme persistence', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('returns null when nothing is stored', () => {
    expect(getStoredTheme()).toBeNull();
  });

  it('returns the stored theme when present', () => {
    localStorage.setItem('theme', 'dark');
    expect(getStoredTheme()).toBe('dark');
  });

  it('ignores garbage values in storage', () => {
    localStorage.setItem('theme', 'blue');
    expect(getStoredTheme()).toBeNull();
  });

  it('falls back to system preference when nothing is stored', () => {
    vi.stubGlobal('matchMedia', (query: string) => ({
      matches: query.includes('dark'),
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    }));
    expect(getPreferredTheme()).toBe('dark');
    vi.unstubAllGlobals();
  });

  it('prefers the stored theme over system preference', () => {
    localStorage.setItem('theme', 'light');
    vi.stubGlobal('matchMedia', (query: string) => ({
      matches: true,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    }));
    expect(getPreferredTheme()).toBe('light');
    vi.unstubAllGlobals();
  });

  it('setTheme persists to localStorage and sets the data-theme attribute', () => {
    setTheme('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});
