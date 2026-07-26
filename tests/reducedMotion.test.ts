import { describe, it, expect } from 'vitest';
import { prefersReducedMotion } from '@/lib/reducedMotion';

describe('prefersReducedMotion', () => {
  it('reflects the media query result', () => {
    expect(prefersReducedMotion()).toBe(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  });
});
