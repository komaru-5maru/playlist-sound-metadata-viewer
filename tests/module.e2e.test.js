import { test, expect } from '@playwright/test';

const FOUNDRY_URL = 'http://localhost:30013';

test.describe('Playlist Metadata Viewer Functionality', () => {

  test('Should find the Export Metadata button in the Playlist sidebar', async ({ page }) => {
    // 1. ワールドにアクセス
    await page.goto(FOUNDRY_URL);

    // 2. ログイン処理
    // ログイン画面のユーザー選択ボックスが表示されるのを待つ
    const loginSelect = page.locator('select[name="userid"]');
    await expect(loginSelect).toBeVisible({ timeout: 10000 });

    // ユーザーを選択（"Gamemaster" の部分は実際のユーザー名に合わせてください）
    await loginSelect.selectOption({ label: 'Gamemaster' });

    // 参加ボタンをクリック
    await page.click('button[name="join"]');

    // 3. サイドバーのプレイリストタブを探す
    // ログイン後、キャンバスやUIがロードされるまで少し時間がかかるため、長めに待機
    const playlistTab = page.locator('#sidebar-tabs [data-tab="playlists"]');
    await expect(playlistTab).toBeVisible({ timeout: 30000 }); // 30秒待機
    await playlistTab.click();

    // 4. モジュールが追加したボタンを確認
    // セレクターをより汎用的なものに変更
    const exportButton = page.locator('button i.fas.fa-file-export').locator('xpath=..'); 
    // または単純にテキストで探す
    // const exportButton = page.getByRole('button', { name: /Export Metadata|メタデータをエクスポート/ });

    await expect(exportButton).toBeVisible();
    
    console.log('Success: Export button is visible in the sidebar.');
  });
});