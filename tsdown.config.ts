/*
 * @FilePath: /webpack5-remove-use-strict-plugin/tsdown.config.ts
 */
import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/index.ts'],
  target: 'node16',
  clean: true,
  dts: true,
  platform: 'node',
  format: ['esm', 'cjs'],
})
