import { defineConfig } from '@pandacss/dev';
import base from '@pandacss/preset-base';
export default defineConfig({
  presets: [base],
  polyfill: process.env.POLYFILL === '1',
  preflight: false,
  include: ['./src/**/*.ts'],
  outdir: 'styled-system',
});
