import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  workers: 1,
  use: {
    baseURL: 'http://localhost:30013',
    // 画面を大きくして、ボタンが隠れるのを防ぐ
    viewport: { width: 1920, height: 1080 },
    screenshot: 'only-failure',
  },
});