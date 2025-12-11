import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: ['cjs'],
  target: 'node18',
  sourcemap: false,
  clean: true,
  bundle: true,
  dts: true,
  splitting: false,
});
