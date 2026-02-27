/**
 * Playlist Sound Metadata Viewer - Settings Registration
 */

import { getModuleId } from './utils.js';

export function registerSettings() {
    const moduleId = getModuleId();

    game.settings.register(moduleId, 'moduleDescription', {
        name: game.i18n.localize("PSMV.Settings.ModuleDescName"),
        hint: game.i18n.localize("PSMV.Settings.ModuleDescHint"),
        scope: 'world',
        config: true,
        type: Boolean,
        default: true,
        onChange: () => {}
    });

    game.settings.register(moduleId, 'enableDebug', {
        name: game.i18n.localize("PSMV.Settings.DebugName"),
        hint: game.i18n.localize("PSMV.Settings.DebugHint"),
        scope: 'client',
        config: true,
        type: Boolean,
        default: false
    });
}
