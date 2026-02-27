import { test, expect } from '@playwright/test';

const FOUNDRY_URL = 'http://localhost:30013';

test.describe('Metadata Export Functionality', () => {
  test.use({ permissions: ['clipboard-read', 'clipboard-write'] });

  test('Should copy metadata to clipboard when export button is clicked', async ({ page }) => {
    await page.goto(FOUNDRY_URL);

    // 1. ログイン
    const loginSelect = page.locator('select[name="userid"]');
    await loginSelect.selectOption({ index: 1 });
    await page.click('button[name="join"]');

    // 2. プレイリストタブ表示
    const playlistTab = page.locator('#sidebar-tabs [data-tab="playlists"]');
    await playlistTab.waitFor({ state: 'visible', timeout: 30000 });
    await playlistTab.click();

    // 3. ボタンの特定
    const exportButton = page.getByRole('button').filter({ 
      hasText: /Export Metadata|メタデータをエクスポート/ 
    });

    // --- 画面外対策：要素までスクロールさせる ---
    // もしボタンがリストの下に隠れていても、これで強制的に表示位置まで動かします
    await exportButton.scrollIntoViewIfNeeded();

    // 4. クリック（表示されるまで待機）
    await expect(exportButton).toBeVisible({ timeout: 15000 });
    await exportButton.click();

    // 5. クリップボード検証
    await page.waitForTimeout(1000); 
    const clipboardContent = await page.evaluate(async () => {
      return await navigator.clipboard.readText();
    });

    console.log('Clipboard content length:', clipboardContent.length);
    expect(clipboardContent.length).toBeGreaterThan(0);
  });
});