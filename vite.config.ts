import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Defer main CSS and remove unnecessary modulepreloads
    {
      name: 'defer-css-and-preloads',
      enforce: 'post',
      transformIndexHtml(html: string) {
        const result = html
          // Replace render-blocking CSS with deferred equivalent
          .replace(
            /<link rel="stylesheet" crossorigin href="(\/assets\/index-[^"]+\.css)">/,
            (_, href) =>
              `<link rel="preload" href="${href}" as="style" />\n    <link rel="stylesheet" media="print" onload="this.media='all'" crossorigin href="${href}" />`,
          )
          // Remove modulepreload for non-critical chunks (loaded by lazy MainSite)
          .replace(/<link rel="modulepreload"[^>]*href="[^"]*vendor-(?:forms|motion|icons)[^"]*"[^>]*>\n?\s*/g, '');
        return result;
      },
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2020',
    cssMinify: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-dom')) return 'vendor-react';
          if (id.includes('node_modules/react')) return 'vendor-react';
          if (id.includes('node_modules/framer-motion')) return 'vendor-motion';
          if (id.includes('node_modules/lucide-react')) return 'vendor-icons';
          if (id.includes('node_modules/react-router')) return 'vendor-router';
          if (id.includes('node_modules/react-hook-form') || id.includes('node_modules/zod') || id.includes('node_modules/@hookform')) return 'vendor-forms';
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
  server: {
    headers: {
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  },
  preview: {
    headers: {
      'Cache-Control': 'public, max-age=604800, immutable',
    },
  },
});
