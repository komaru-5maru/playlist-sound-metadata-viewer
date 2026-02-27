/**
 * Playlist Sound Metadata Viewer - Hooks Handler
 */

import { escapeHtml } from './utils.js';
import { MetadataReader } from './metadata-reader.js';

export class HooksHandler {
    static registerHooks() {
        Hooks.on('renderPlaylistDirectory', this.onRenderPlaylistDirectory.bind(this));
        Hooks.on('renderPlaylistSoundConfig', this.onRenderPlaylistSoundConfig.bind(this));
    }

    static onRenderPlaylistDirectory(app, html, data) {
        if (!game.user.isGM || !MetadataReader.libraryLoaded) {
            return;
        }
        this.addExportButtons(html);
    }

    static addExportButtons(html) {
        const footer = html.querySelector('footer.directory-footer');
        if (!footer) return;

        const exportButton = document.createElement('button');
        exportButton.type = 'button';
        exportButton.className = 'metadata-export-btn';
        exportButton.innerHTML = `<i class="fas fa-file-export"></i> ${game.i18n.localize("PSMV.ExportMetadata")}`;
        exportButton.style.cssText = 'width: 100%; margin-top: 4px;';
        exportButton.addEventListener('click', async (event) => {
            event.preventDefault();
            await this.exportAllMetadata(false);
        });
        footer.appendChild(exportButton);

        const exportCleanButton = document.createElement('button');
        exportCleanButton.type = 'button';
        exportCleanButton.className = 'metadata-export-clean-btn';
        exportCleanButton.innerHTML = `<i class="fas fa-filter"></i> ${game.i18n.localize("PSMV.ExportMetadataClean")}`;
        exportCleanButton.style.cssText = 'width: 100%; margin-top: 4px;';
        exportCleanButton.addEventListener('click', async (event) => {
            event.preventDefault();
            await this.exportAllMetadata(true);
        });
        footer.appendChild(exportCleanButton);
    }

    static async exportAllMetadata(removeUnknown = false) {
        const playlists = game.playlists;
        const unknownPrefix = game.i18n.localize("PSMV.UnknownPrefix");
        let output = game.i18n.localize("PSMV.ExportHeader");

        for (const playlist of playlists) {
            output += `## ${playlist.name}\n\n`;

            for (const sound of playlist.sounds) {
                const soundPath = sound.path || sound.src;

                if (!soundPath || soundPath.startsWith('http')) {
                    output += `- **${sound.name}**: ${game.i18n.localize("PSMV.NoMetadataRemote")}\n`;
                    continue;
                }

                try {
                    const metadata = await MetadataReader.readMetadata(soundPath);

                    if (removeUnknown) {
                        const validFields = [];

                        if (!metadata.title.startsWith(unknownPrefix)) {
                            validFields.push(`${game.i18n.localize("PSMV.LabelTitle")}: ${metadata.title}`);
                        }
                        if (!metadata.artist.startsWith(unknownPrefix)) {
                            validFields.push(`${game.i18n.localize("PSMV.LabelArtist")}: ${metadata.artist}`);
                        }
                        if (!metadata.album.startsWith(unknownPrefix)) {
                            validFields.push(`${game.i18n.localize("PSMV.LabelAlbum")}: ${metadata.album}`);
                        }

                        output += `- **${sound.name}**\n`;
                        if (validFields.length === 0) {
                            output += `  - ${game.i18n.localize("PSMV.NoMetadataGeneric")}\n`;
                        } else {
                            validFields.forEach(field => {
                                output += `  - ${field}\n`;
                            });
                        }
                    } else {
                        output += `- **${sound.name}**\n`;
                        output += `  - ${game.i18n.localize("PSMV.LabelTitle")}: ${metadata.title}\n`;
                        output += `  - ${game.i18n.localize("PSMV.LabelArtist")}: ${metadata.artist}\n`;
                        output += `  - ${game.i18n.localize("PSMV.LabelAlbum")}: ${metadata.album}\n`;
                    }
                } catch (error) {
                    output += `- **${sound.name}**: ${game.i18n.localize("PSMV.NoMetadataID3")}\n`;
                }
            }

            output += '\n';
        }

        try {
            await navigator.clipboard.writeText(output);
            const message = removeUnknown
                ? game.i18n.localize("PSMV.CopySuccessClean")
                : game.i18n.localize("PSMV.CopySuccess");
            ui.notifications?.info(message);
        } catch (error) {
            ui.notifications?.error(game.i18n.localize("PSMV.CopyError"));
            console.log(output);
        }
    }

    static async onRenderPlaylistSoundConfig(app, html, data) {
        if (!game.user.isGM || !MetadataReader.libraryLoaded) {
            return;
        }

        const soundPath = app.document.path || app.document.src;
        if (!soundPath || soundPath.startsWith('http')) {
            return;
        }

        await this.injectMetadataSection(app, html, soundPath);
    }

    static async injectMetadataSection(app, html, soundPath) {
        const metadataSection = document.createElement('div');
        metadataSection.className = 'form-group metadata-lookup-section';
        metadataSection.innerHTML = `
            <label>${game.i18n.localize("PSMV.DialogLabel")}</label>
            <div class="form-fields" style="flex-direction: column; align-items: flex-start; background: rgba(0, 0, 0, 0.15); padding: 8px; border-radius: 4px; border: 1px solid #7a7971;">
                <div id="metadata-display-area">
                    <i class="fas fa-spinner fa-spin"></i> ${game.i18n.localize("PSMV.Analyzing")}
                </div>
            </div>
        `;

        const insertionPoint = this.findDescriptionField(html) || this.findInsertionPoint(html);
        if (insertionPoint) {
            insertionPoint.after(metadataSection);
        }

        try {
            const metadata = await MetadataReader.readMetadata(soundPath);
            this.displayMetadataInDialog(html, metadata);
        } catch (error) {
            this.displayMetadataError(html, error);
        }
    }

    static findDescriptionField(html) {
        const formGroups = html.querySelectorAll('div.form-group');
        for (const group of formGroups) {
            const label = group.querySelector('label');
            if (label && label.textContent.includes('Description')) {
                return group;
            }
        }
        return null;
    }

    static findInsertionPoint(html) {
        const formGroups = html.querySelectorAll('div.form-group');
        for (const group of formGroups) {
            const label = group.querySelector('label');
            if (label && label.textContent.includes('Source')) {
                return group;
            }
        }
        return formGroups[1] || formGroups[0];
    }

    static displayMetadataInDialog(html, metadata) {
        const displayArea = html.querySelector('#metadata-display-area');
        if (!displayArea) return;

        displayArea.innerHTML = `
            <div class="metadata-item" style="margin-bottom: 4px;">
                <strong>${game.i18n.localize("PSMV.LabelTitle")}:</strong> ${escapeHtml(metadata.title)}
            </div>
            <div class="metadata-item" style="margin-bottom: 4px;">
                <strong>${game.i18n.localize("PSMV.LabelArtist")}:</strong> ${escapeHtml(metadata.artist)}
            </div>
            <div class="metadata-item">
                <strong>${game.i18n.localize("PSMV.LabelAlbum")}:</strong> ${escapeHtml(metadata.album)}
            </div>
        `;
    }

    static displayMetadataError(html, error) {
        const displayArea = html.querySelector('#metadata-display-area');
        if (!displayArea) return;

        let errorMessage = game.i18n.localize("PSMV.ErrorLoading");
        if (error.info === 'No suitable tag reader found') {
            errorMessage = game.i18n.localize("PSMV.ErrorNoTag");
        }

        displayArea.innerHTML = `
            <span style="color: #ff6666;">
                <i class="fas fa-exclamation-triangle"></i> ${errorMessage}
            </span>
        `;
    }
}
