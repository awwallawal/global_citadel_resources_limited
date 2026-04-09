import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://global-resources.org',
  output: 'static',
  adapter: vercel(),
  integrations: [
    react(),
    mdx(),
    sitemap({
      filter: (page) =>
        !page.includes('/api/') &&
        !/\/search(\/|$)/.test(page) &&
        !page.includes('/404') &&
        !page.includes('/token-test'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        ignored: ['**/.vercel/**'],
      },
    },
  },
});
