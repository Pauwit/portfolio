import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://paulwitkowski.com',
  output: 'static',
  integrations: [react()],
  // The ClientRouter prefetches every same-origin link by default, which was
  // saturating Firefox's 6-connection-per-origin cap and stalling real
  // navigations behind speculative ones. This is a small site; no page needs
  // to be prefetched ahead of a click.
  prefetch: false,
  vite: {
    plugins: [tailwindcss()],
  },
});
