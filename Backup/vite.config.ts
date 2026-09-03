import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    base: '/Custom-Clicks-Cursors/',
<<<<<<< HEAD
    plugins: [react(), tailwindcss()],
=======

    plugins: [
      react(),
      tailwindcss(),
    ],

>>>>>>> 95a58f9f9fb00018ed416276c174aac917f49e07
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },

    server: {
<<<<<<< HEAD
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
=======
>>>>>>> 95a58f9f9fb00018ed416276c174aac917f49e07
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
