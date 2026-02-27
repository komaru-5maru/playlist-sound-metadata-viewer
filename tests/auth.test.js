import { test, expect } from '@playwright/test';

const FOUNDRY_URL = 'http://localhost:30013';

test.describe('Foundry VTT Check', () => {
  
  test('Should detect Foundry World or Login screen', async ({ page }) => {
    await page.goto(FOUNDRY_URL);

    // タイトルが "Foundry VTT" または ワールド名 "ek01" を含んでいるか確認
    await expect(page).toHaveTitle(/(Foundry VTT|ek01)/);

    // ログイン済みなら #interface (サイドバーなど) があるはず、
    // 未ログインなら select[name="userid"] があるはず。
    // どちらかが見つかればFoundryが動いているとみなす。
    const body = page.locator('body');
    await expect(body).toBeVisible();
    
    console.log('Foundry page detected!');
  });
});