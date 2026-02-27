/**
 * Playlist Sound Metadata Viewer for Foundry VTT v13
 * * @version 2.1.7
 * @author komaru_5maru
 */

import { registerSettings } from './settings.js';
import { MetadataReader } from './metadata-reader.js';
import { HooksHandler } from './hooks.js';


Hooks.once('i18nInit', () => {
    registerSettings();
});

/**
 * Foundry VTTが準備完了した際の初期化処理
 */
Hooks.once('ready', async () => {
    try {
        await MetadataReader.loadLibrary();
        HooksHandler.registerHooks();
        
        console.log('[Metadata Viewer] Initialized successfully');
    } catch (error) {
        console.error('[Metadata Viewer] Failed to initialize module:', error);
        
        if (typeof ui !== 'undefined' && ui.notifications) {
            ui.notifications.error(game.i18n.localize("PSMV.InitError"));
        }
    }
});