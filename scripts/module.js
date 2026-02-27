/**
 * Playlist Sound Metadata Viewer for Foundry VTT v13
 *
 * @version 2.1.1
 * @author komaru_5maru
 */

import { registerSettings } from './settings.js';
import { MetadataReader } from './metadata-reader.js';
import { HooksHandler } from './hooks.js';

// 言語ファイル読み込み完了後に設定を登録する
Hooks.once('i18nInit', () => {
    registerSettings();
});

Hooks.once('ready', async () => {
    try {
        await MetadataReader.loadLibrary();
        HooksHandler.registerHooks();
    } catch (error) {
        console.error('[Metadata Viewer] Failed to initialize module:', error);
        if (ui.notifications) {
            ui.notifications.error(game.i18n.localize("PSMV.InitError"));
        }
    }
});
