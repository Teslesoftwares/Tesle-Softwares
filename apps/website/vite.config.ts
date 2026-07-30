import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';
import https from 'node:https';
import type { ServerResponse } from 'node:http';

const MP3_URLS: Record<string, string> = {
  '0': 'https://store.cvaultx.com/uploads/music/2026/03/7LYRICLOOM-Delana-Hope-I-Speak-Blessings-Lyrics-(CeeNaija.com).mp3',
  '1': 'https://store.cvaultx.com/uploads/music/2026/07/Delana-Hope-Something-Big-(CeeNaija.com).mp3',
  '2': 'https://store.cvaultx.com/uploads/music/2026/01/Delana-Hope-Cant-Curse-Whats-Blessed-(CeeNaija.com).mp3',
  '3': 'https://timheven.com/uploads/Delana%20Hope%20%E2%80%93%20Come%20Closer.mp3',
  '4': 'https://timheven.com/uploads/Delana%20Hope%20-%20God%20Fight%20For%20Me.mp3',
  '5': 'https://www.voxmack.com/uploads/music/2026/03/Delana-Hope-I-Break-Free-(VoxMack.com).mp3',
  '6': 'https://timheven.com/uploads/Delana%20Hope%20-%20I%20Feel%20A%20Shift.mp3',
  '7': 'https://timheven.com/uploads/Delana%20Hope%20-%20Heal%20My%20Heart%20Again.mp3',
  '8': 'https://timheven.com/uploads/Delana%20Hope%20-%20Enlarge%20Me.mp3',
  '9': 'https://timheven.com/uploads/Delana%20Hope%20-%20Suddenly.mp3',
  '10': 'https://timheven.com/uploads/Delana%20Hope%20-%20God%20Got%20Me.mp3',
  '11': 'https://timheven.com/uploads/Delana%20Hope%20-%20Teach%20How%20To%20Love.mp3',
  '12': 'https://timheven.com/uploads/Delana%20Hope%20%E2%80%93%20Breaking%20Away.mp3',
};

export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'mp3-proxy',
      configureServer(server) {
        server.middlewares.use('/api/mp3/', (req, res: ServerResponse, next) => {
          const id = req.url?.replace(/^\//, '') || '';
          const targetUrl = MP3_URLS[id];
          if (!targetUrl) { res.statusCode = 404; res.end('Not found'); return; }
          const url = new URL(targetUrl);
          const opts: https.RequestOptions & { headers: Record<string, string> } = { ...url, headers: { 'User-Agent': 'Mozilla/5.0', Accept: '*/*' } };
          https.get(opts, (proxyRes) => {
            if (!proxyRes.statusCode || proxyRes.statusCode >= 400) {
              res.statusCode = 502;
              res.end('Bad gateway');
              proxyRes.resume();
              return;
            }
            res.setHeader('Content-Type', 'audio/mpeg');
            res.setHeader('Accept-Ranges', 'bytes');
            res.statusCode = 200;
            proxyRes.pipe(res);
          }).on('error', () => {
            res.statusCode = 502;
            res.end('Proxy error');
          });
        });
      },
    },
    {
      name: 'defer-css-and-preloads',
      enforce: 'post',
      transformIndexHtml(html: string) {
        const result = html
          .replace(
            /<link rel="stylesheet" crossorigin href="(\/assets\/index-[^"]+\.css)">/,
            (_, href) =>
              `<link rel="preload" href="${href}" as="style" />\n    <link rel="stylesheet" media="print" onload="this.media='all'" crossorigin href="${href}" />`,
          )
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
    watch: {
      ignored: ['**/public/playlist/**', '**/dist/**', '**/dist-electron/**'],
    },
    hmr: {
      host: 'localhost',
      protocol: 'ws',
    },
  },
  preview: {
    headers: {
      'Cache-Control': 'public, max-age=604800, immutable',
    },
  },
});
