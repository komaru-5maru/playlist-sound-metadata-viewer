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
            'languages/ja.json'
        ];

        requiredFiles.forEach(file => {
            const path = resolve(process.cwd(), file);
            expect(existsSync(path), `ファイルが見つかりません: ${file}`).toBe(true);
        });
    });

    it('module.json の manifest path が正しいこと', () => {
        const jsonPath = resolve(process.cwd(), 'module.json');
        const moduleJson = JSON.parse(readFileSync(jsonPath, 'utf8'));

        // manifestの中で scripts/module.js が指定されているかチェック
        // (Foundry VTT v12/13 の esmodules 形式を想定)
        const hasMainScript = moduleJson.esmodules?.some(m => m.path === 'scripts/module.js') || 
                              moduleJson.scripts?.some(s => s === 'scripts/module.js');
        
        // もし module.json でパスを書き換え忘れていたらここで気づけます
        expect(hasMainScript, 'module.json 内のスクリプトパスが scripts/module.js になっていません').toBe(true);
    });
});