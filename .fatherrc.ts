import { defineConfig } from 'father';

export default defineConfig({
  platform: 'node',
  cjs: {
    platform: 'node',
    output: 'lib',
    ignores: ['**/withoutRest.ts', '**/clientIndex.ts'],
  },
});
