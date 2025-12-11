import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: ['cjs'],
  target: 'node18',
  sourcemap: false,
  clean: true,
  bundle: false, // ❗ do NOT bundle the shared lib
  dts: true, // ❗ generate .d.ts types
  splitting: false,
});
