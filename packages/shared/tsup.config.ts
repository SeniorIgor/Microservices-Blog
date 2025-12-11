import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: ['cjs'],
  target: 'node18',
  sourcemap: true,
  clean: true,
  minify: true,
  bundle: true,
  dts: true,
  splitting: false,
});
