/**
 * Playlist Sound Metadata Viewer - Hooks Handler
 * フック処理クラス
 */

import { escapeHtml } from './utils.js';
import { MetadataReader } from './metadata-reader.js';

export class HooksHandler {
    /**
     * フックの登録
     */
    static registerHooks() {
        Hooks.on('renderPlaylistDirectory', this.onRenderPlaylistDirectory.bind(this));
        Hooks.on('renderPlaylistSoundConfig', this.onRenderPlaylistSoundConfig.bind(this));
    }

    /**
     * プレイリストサイドバーのレンダリング時の処理
     */
    static onRenderPlaylistDirectory(app, html, data) {
        if (!game.user.isGM || !MetadataReader.libraryLoaded) {
            return;
        }

        this.addExportButtons(html);
    }

    /**
     * 「メタデータを出力」ボタンを追加
     */
    static addExportButtons(html) {
        const footer = html.querySelector('footer.directory-footer');
        if (!footer) return;

        // 通常の出力ボタン
        const exportButton = document.createElement('button');
        exportButton.type = 'button';
        exportButton.className = 'metadata-export-btn';
        exportButton.innerHTML = '<i class="fas fa-file-export"></i> メタデータを出力';
        exportButton.style.cssText = 'width: 100%; margin-top: 4px;';
        
        exportButton.addEventListener('click', async (event) => {
            event.preventDefault();
            await this.exportAllMetadata(false);
        });

        footer.appendChild(exportButton);

        // 不明除去版の出力ボタン
        const exportCleanButton = document.createElement('button');
        exportCleanButton.type = 'button';
        exportCleanButton.className = 'metadata-export-clean-btn';
        exportCleanButton.innerHTML = '<i class="fas fa-filter"></i> メタデータを出力（不明除去）';
        exportCleanButton.style.cssText = 'width: 100%; margin-top: 4px;';
        
        exportCleanButton.addEventListener('click', async (event) => {
            event.preventDefault();
            await this.exportAllMetadata(true);
        });

        footer.appendChild(exportCleanButton);
    }

    /**
     * すべてのプレイリストのメタデータをエクスポート
     * @param {boolean} removeUnknown - 「不明な」で始まる情報を除去するか
     */
    static async exportAllMetadata(removeUnknown = false) {
        const playlists = game.playlists;
        let output = '# プレイリスト メタデータ一覧\n\n';
        
        for (const playlist of playlists) {
            output += `## ${playlist.name}\n\n`;
            
            for (const sound of playlist.sounds) {
                const soundPath = sound.path || sound.src;
                
                if (!soundPath || soundPath.startsWith('http')) {
                    output += `- **${sound.name}**: メタデータなし（リモートファイルまたはパス不明）\n`;
                    continue;
                }
                
                try {
                    const metadata = await MetadataReader.readMetadata(soundPath);
                    
                    if (removeUnknown) {
                        const validFields = [];
                        
                        if (!metadata.title.startsWith('不明な')) {
                            validFields.push(`タイトル: ${metadata.title}`);
                        }
                        if (!metadata.artist.startsWith('不明な')) {
                            validFields.push(`アーティスト: ${metadata.artist}`);
                        }
                        if (!metadata.album.startsWith('不明な')) {
                            validFields.push(`アルバム: ${metadata.album}`);
                        }
                        
                        if (validFields.length === 0) {
                            output += `- **${sound.name}**\n`;
                            output += `  - メタデータなし\n`;
                        } else {
                            output += `- **${sound.name}**\n`;
                            validFields.forEach(field => {
                                output += `  - ${field}\n`;
                            });
                        }
                    } else {
                        output += `- **${sound.name}**\n`;
                        output += `  - タイトル: ${metadata.title}\n`;
                        output += `  - アーティスト: ${metadata.artist}\n`;
                        output += `  - アルバム: ${metadata.album}\n`;
                    }
                } catch (error) {
                    output += `- **${sound.name}**: メタデータなし（ID3タグが見つかりません）\n`;
                }
            }
            
            output += '\n';
        }
        
        try {
            await navigator.clipboard.writeText(output);
            const message = removeUnknown ? 
                'メタデータをクリップボードにコピーしました（不明な情報を除去）' : 
                'メタデータをクリップボードにコピーしました';
            ui.notifications?.info(message);
        } catch (error) {
            ui.notifications?.error('クリップボードへのコピーに失敗しました');
            console.log(output);
        }
    }

    /**
     * プレイリストサウンド設定ダイアログのレンダリング時の処理
     */
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

    /**
     * メタデータセクションをダイアログに挿入
     */
    static async injectMetadataSection(app, html, soundPath) {
        const metadataSection = document.createElement('div');
        metadataSection.className = 'form-group metadata-lookup-section';
        metadataSection.innerHTML = `
            <label>オーディオメタデータ</label>
            <div class="form-fields" style="flex-direction: column; align-items: flex-start; background: rgba(0, 0, 0, 0.15); padding: 8px; border-radius: 4px; border: 1px solid #7a7971;">
                <div id="metadata-display-area">
                    <i class="fas fa-spinner fa-spin"></i> タグを解析中...
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

    /**
     * 「サウンドの説明」フィールドを探す
     */
    static findDescriptionField(html) {
        const formGroups = html.querySelectorAll('div.form-group');
        for (const group of formGroups) {
            const label = group.querySelector('label');
            if (label && label.textContent.includes('サウンドの説明')) {
                return group;
            }
        }
        return null;
    }

    /**
     * 挿入位置を探す（フォールバック用）
     */
    static findInsertionPoint(html) {
        const formGroups = html.querySelectorAll('div.form-group');
        for (const group of formGroups) {
            const label = group.querySelector('label');
            if (label && label.textContent.includes('元のサウンドデータ')) {
                return group;
            }
        }
        return formGroups[1] || formGroups[0];
    }

    /**
     * ダイアログにメタデータを表示
     */
    static displayMetadataInDialog(html, metadata) {
        const displayArea = html.querySelector('#metadata-display-area');
        if (!displayArea) return;

        displayArea.innerHTML = `
            <div class="metadata-item" style="margin-bottom: 4px;">
                <strong>タイトル:</strong> ${escapeHtml(metadata.title)}
            </div>
            <div class="metadata-item" style="margin-bottom: 4px;">
                <strong>アーティスト:</strong> ${escapeHtml(metadata.artist)}
            </div>
            <div class="metadata-item">
                <strong>アルバム:</strong> ${escapeHtml(metadata.album)}
            </div>
        `;
    }

    /**
     * メタデータ読み取りエラーを表示
     */
    static displayMetadataError(html, error) {
        const displayArea = html.querySelector('#metadata-display-area');
        if (!displayArea) return;

        let errorMessage = 'タグを読み取れませんでした。';
        if (error.info === 'No suitable tag reader found') {
            errorMessage = 'ID3タグが見つかりませんでした。このファイルにはメタデータが埋め込まれていない可能性があります。';
        }
        
        displayArea.innerHTML = `
            <span style="color: #ff6666;">
                <i class="fas fa-exclamation-triangle"></i> ${errorMessage}
            </span>
        `;
    }
}
