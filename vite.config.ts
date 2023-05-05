import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  base: './',
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name: '@qazi9amaan/formlibrary',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          tailwindcss: 'tailwindcss',
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [
    react(),
    tsconfigPaths(),
    dts({
      insertTypesEntry: true,
      tsConfigFilePath: './tsconfig.json',
    }),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
});
