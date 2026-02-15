/**
 * Playlist Sound Metadata Viewer for Foundry VTT v13
 * メインモジュールファイル
 * 
 * @version 2.1.0
 * @author Your Name
 */

import { registerSettings } from './settings.js';
import { MetadataReader } from './metadata-reader.js';
import { HooksHandler } from './hooks.js';

/**
 * モジュール初期化
 */
Hooks.once('init', () => {
    registerSettings();
});

/**
 * FVTT準備完了後の初期化
 */
Hooks.once('ready', async () => {
    try {
        await MetadataReader.loadLibrary();
        HooksHandler.registerHooks();
    } catch (error) {
        console.error('[Metadata Viewer] Failed to initialize module:', error);
        if (ui.notifications) {
            ui.notifications.error("Playlist Sound Metadata Viewer: 初期化に失敗しました");
        }
    }
});
