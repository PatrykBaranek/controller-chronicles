import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    ViteImageOptimizer()
  ],
  resolve: {
    alias: {
      '#': path.resolve(__dirname, './src'),
    },
  },
});
