import { describe, it, expect, beforeEach } from 'vitest';
import { getStoredTheme, applyTheme, resolveInitialTheme } from '@/lib/theme';

describe('theme', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
  });

  it('falls back to system preference when nothing is stored', () => {
    expect(getStoredTheme()).toBeNull();
    expect(resolveInitialTheme()).toBe('light');
  });

  it('persists and applies the chosen theme', () => {
    applyTheme('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(resolveInitialTheme()).toBe('dark');
  });
});
