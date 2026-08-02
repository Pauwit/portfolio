export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

export function getStoredTheme(): Theme | null {
  const value = localStorage.getItem(STORAGE_KEY);
  return value === 'light' || value === 'dark' ? value : null;
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(theme);
  localStorage.setItem(STORAGE_KEY, theme);
}

export function resolveInitialTheme(): Theme {
  const stored = getStoredTheme();
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Inlined into BaseLayout's <head> script tag (executed before first paint to
// avoid a flash of the wrong theme); kept here in sync so both copies stay identical.
// Also re-applies the class on every astro:before-swap: Astro's view-transition
// router keeps the same document across client-side navigations, but the
// incoming page's server-rendered <html> has no theme class of its own, so
// without this the theme would flash back to default on every page change.
export const noFlashThemeScript = `(function(){function r(){try{var t=localStorage.getItem('${STORAGE_KEY}');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}return t;}catch(e){return 'light';}}document.documentElement.classList.add(r());document.addEventListener('astro:before-swap',function(e){e.newDocument.documentElement.classList.add(r());});})();`;
