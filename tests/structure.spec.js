import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

describe('Module Structure Check', () => {
    it('必須ファイルがすべて存在すること', () => {
        const requiredFiles = [
            'module.json',
            'scripts/module.js',
            'scripts/hooks.js',
            'scripts/metadata-reader.js',
            'scripts/settings.js',
            'scripts/utils.js',
            'languages/en.json',
            'languages/ja.json',
            'lib/jsmediatags.min.js'
        ];

        requiredFiles.forEach(file => {
            const path = resolve(process.cwd(), file);
            expect(existsSync(path), `ファイルが見つかりません: ${file}`).toBe(true);
        });
    });

    it('module.json の manifest path が正しいこと', () => {
        const jsonPath = resolve(process.cwd(), 'module.json');
        const moduleJson = JSON.parse(readFileSync(jsonPath, 'utf8'));

        // module.json の構造に基づいたチェック
        const hasMainScript = moduleJson.esmodules?.some(m => m === 'scripts/module.js') || 
                              moduleJson.esmodules?.some(m => m.path === 'scripts/module.js') || 
                              moduleJson.scripts?.some(s => s === 'scripts/module.js');
        
        expect(hasMainScript, 'module.json 内のスクリプトパスに scripts/module.js が含まれていません').toBe(true);

        // lib ファイルのチェック
        const hasLibScript = moduleJson.scripts?.some(s => s === 'lib/jsmediatags.min.js');
        expect(hasLibScript, 'module.json の scripts に lib/jsmediatags.min.js が含まれていません').toBe(true);
    });

    // ✨ ここに追加：バージョンの書き換え忘れ防止テスト
    it('module.json のバージョンがタグ（GITHUB_REF_NAME）と一致していること', () => {
        const jsonPath = resolve(process.cwd(), 'module.json');
        const moduleJson = JSON.parse(readFileSync(jsonPath, 'utf8'));
        
        // GitHub Actions 実行時、GITHUB_REF_NAME には 'v2.1.7' などのタグ名が入る
        const tag = process.env.GITHUB_REF_NAME;

        if (tag && tag.startsWith('v')) {
            const expectedVersion = tag.replace('v', ''); // 'v2.1.9' -> '2.1.9'
            expect(moduleJson.version, `タグは ${tag} ですが、module.json の version は ${moduleJson.version} のままです！`).toBe(expectedVersion);
        }
    });
});