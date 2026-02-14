/**
 * Audio Metadata Inspector for Foundry VTT v13
 * 利用ライブラリ: jsmediatags (BSD-3-Clause)
 * 制限: GM権限を持つユーザーのみ動作
 * 
 * @version 2.0.0
 * @author Your Name
 */

class MetadataInspector {
    static ID = "metadata-inspector";
    static FLAGS = {
        LOADED: "metadata-loaded"
    };

    /**
     * モジュール初期化
     */
    static initialize() {
        console.log(`${this.ID} | Initializing Audio Metadata Inspector for FVTT v13`);
        this.registerHooks();
    }

    /**
     * フックの登録
     */
    static registerHooks() {
        Hooks.on('renderPlaylistDirectory', this.onRenderPlaylistDirectory.bind(this));
        Hooks.on('renderPlaylistSoundConfig', this.onRenderPlaylistSoundConfig.bind(this));
    }

    /**
     * プレイリストサイドバーのレンダリング時の処理
     * @param {PlaylistDirectory} app - プレイリストディレクトリアプリケーション
     * @param {HTMLElement} html - レンダリングされたHTML要素
     * @param {Object} data - レンダリングデータ
     */
    static onRenderPlaylistDirectory(app, html, data) {
        if (!game.user.isGM) return;

        const soundItems = html.querySelectorAll('li.sound.playlist-item');
        
        soundItems.forEach(soundElement => {
            this.setupSoundHoverMetadata(soundElement);
        });
    }

    /**
     * サウンドアイテムにホバーメタデータを設定
     * @param {HTMLElement} soundElement - サウンド要素
     */
    static setupSoundHoverMetadata(soundElement) {
        const playlistElement = soundElement.closest('.playlist');
        if (!playlistElement) return;

        const playlistId = playlistElement.dataset.documentId;
        const soundId = soundElement.dataset.documentId;

        const playlist = game.playlists.get(playlistId);
        const sound = playlist?.sounds.get(soundId);
        
        if (!sound?.src) return;

        // マウスホバー時のイベント
        soundElement.addEventListener('mouseenter', async (event) => {
            // すでに読み込み済み、または解析中の場合はスキップ
            if (soundElement.dataset[this.FLAGS.LOADED]) return;
            soundElement.dataset[this.FLAGS.LOADED] = 'loading';

            try {
                const metadata = await this.readMetadata(sound.src);
                this.displayHoverTooltip(soundElement, metadata);
                soundElement.dataset[this.FLAGS.LOADED] = 'true';
            } catch (error) {
                soundElement.dataset[this.FLAGS.LOADED] = 'error';
                console.warn(`${this.ID} | Could not read metadata for ${sound.src}`, error);
            }
        });

        // マウスが離れたらツールチップを非表示
        soundElement.addEventListener('mouseleave', () => {
            game.tooltip?.deactivate();
        });
    }

    /**
     * メタデータを読み取る
     * @param {string} soundPath - サウンドファイルのパス
     * @returns {Promise<Object>} メタデータオブジェクト
     */
    static readMetadata(soundPath) {
        return new Promise((resolve, reject) => {
            if (!window.jsmediatags) {
                reject(new Error('jsmediatags library not loaded'));
                return;
            }

            const fullPath = `${window.location.origin}/${encodeURI(soundPath)}`;

            window.jsmediatags.read(fullPath, {
                onSuccess: (tag) => {
                    resolve({
                        title: tag.tags.title || "不明なタイトル",
                        artist: tag.tags.artist || "不明なアーティスト",
                        album: tag.tags.album || "不明なアルバム",
                        year: tag.tags.year || null,
                        genre: tag.tags.genre || null,
                        comment: tag.tags.comment || null
                    });
                },
                onError: (error) => {
                    reject(error);
                }
            });
        });
    }

    /**
     * ホバー時のツールチップを表示
     * @param {HTMLElement} element - 対象要素
     * @param {Object} metadata - メタデータ
     */
    static displayHoverTooltip(element, metadata) {
        const tooltipContent = `
            <div style="text-align: left; min-width: 200px;">
                <div style="margin-bottom: 4px;">
                    <i class="fas fa-music"></i> <strong>${this.escapeHtml(metadata.title)}</strong>
                </div>
                <div style="margin-bottom: 2px;">
                    <i class="fas fa-user"></i> ${this.escapeHtml(metadata.artist)}
                </div>
                <div>
                    <i class="fas fa-compact-disc"></i> ${this.escapeHtml(metadata.album)}
                </div>
            </div>
        `;

        element.dataset.tooltip = tooltipContent;
        
        // FVTT v13のTooltip API を使用
        if (game.tooltip) {
            game.tooltip.activate(element, {
                text: tooltipContent,
                direction: "UP"
            });
        }
    }

    /**
     * プレイリストサウンド設定ダイアログのレンダリング時の処理
     * @param {PlaylistSoundConfig} app - サウンド設定アプリケーション
     * @param {HTMLElement} html - レンダリングされたHTML要素
     * @param {Object} data - レンダリングデータ
     */
    static async onRenderPlaylistSoundConfig(app, html, data) {
        if (!game.user.isGM) return;

        const soundPath = app.document.src;

        // HTTPパスまたはパスが存在しない場合はスキップ
        if (!soundPath || soundPath.startsWith('http')) {
            return;
        }

        await this.injectMetadataSection(app, html, soundPath);
    }

    /**
     * メタデータセクションをダイアログに挿入
     * @param {PlaylistSoundConfig} app - サウンド設定アプリケーション
     * @param {HTMLElement} html - HTML要素
     * @param {string} soundPath - サウンドパス
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
                <button type="button" id="btn-apply-to-desc" style="margin-top: 8px;" disabled>
                    <i class="fas fa-edit"></i> 説明欄にメタ情報を転記
                </button>
            </div>
        `;

        // 挿入位置を探す
        const insertionPoint = this.findInsertionPoint(html);
        if (insertionPoint) {
            insertionPoint.after(metadataSection);
        } else {
            // フォールバック: 最初のform-groupの後に挿入
            const firstFormGroup = html.querySelector('div.form-group');
            if (firstFormGroup) {
                firstFormGroup.after(metadataSection);
            }
        }

        // メタデータの読み込みと表示
        try {
            const metadata = await this.readMetadata(soundPath);
            this.displayMetadataInDialog(html, metadata, app);
        } catch (error) {
            this.displayMetadataError(html);
            console.warn(`${this.ID} | Failed to read metadata:`, error);
        }
    }

    /**
     * 挿入位置を探す
     * @param {HTMLElement} html - HTML要素
     * @returns {HTMLElement|null} 挿入位置
     */
    static findInsertionPoint(html) {
        const formGroups = html.querySelectorAll('div.form-group');
        
        // 「元のサウンドデータ」ラベルを持つform-groupを探す
        for (const group of formGroups) {
            const label = group.querySelector('label');
            if (label && label.textContent.includes('元のサウンドデータ')) {
                return group;
            }
        }

        // 見つからない場合は2番目のform-groupを返す
        return formGroups[1] || formGroups[0];
    }

    /**
     * ダイアログにメタデータを表示
     * @param {HTMLElement} html - HTML要素
     * @param {Object} metadata - メタデータ
     * @param {PlaylistSoundConfig} app - アプリケーションインスタンス
     */
    static displayMetadataInDialog(html, metadata, app) {
        const displayArea = html.querySelector('#metadata-display-area');
        if (!displayArea) return;

        let infoContent = `
            <div class="metadata-item" style="margin-bottom: 4px;">
                <strong>タイトル:</strong> ${this.escapeHtml(metadata.title)}
            </div>
            <div class="metadata-item" style="margin-bottom: 4px;">
                <strong>アーティスト:</strong> ${this.escapeHtml(metadata.artist)}
            </div>
            <div class="metadata-item">
                <strong>アルバム:</strong> ${this.escapeHtml(metadata.album)}
            </div>
        `;

        if (metadata.year) {
            infoContent += `
                <div class="metadata-item" style="margin-top: 4px;">
                    <strong>年:</strong> ${this.escapeHtml(metadata.year)}
                </div>
            `;
        }

        displayArea.innerHTML = infoContent;

        // 転記ボタンの設定
        const applyButton = html.querySelector('#btn-apply-to-desc');
        if (applyButton) {
            applyButton.disabled = false;
            applyButton.addEventListener('click', (event) => {
                event.preventDefault();
                this.applyMetadataToDescription(html, metadata);
            });
        }
    }

    /**
     * メタデータ読み取りエラーを表示
     * @param {HTMLElement} html - HTML要素
     */
    static displayMetadataError(html) {
        const displayArea = html.querySelector('#metadata-display-area');
        if (displayArea) {
            displayArea.innerHTML = `
                <span style="color: #ff6666;">
                    <i class="fas fa-exclamation-triangle"></i> タグを読み取れませんでした。
                </span>
            `;
        }

        const applyButton = html.querySelector('#btn-apply-to-desc');
        if (applyButton) {
            applyButton.disabled = true;
        }
    }

    /**
     * メタデータを説明欄に適用
     * @param {HTMLElement} html - HTML要素
     * @param {Object} metadata - メタデータ
     */
    static applyMetadataToDescription(html, metadata) {
        // ProseMirror エディタを探す
        const editor = html.querySelector('prose-mirror[name="description"]');
        
        if (!editor) {
            ui.notifications?.warn("説明欄のエディタが見つかりませんでした");
            return;
        }

        let descriptionText = `<p><strong>【楽曲情報】</strong><br>`;
        descriptionText += `タイトル: ${this.escapeHtml(metadata.title)}<br>`;
        descriptionText += `アーティスト: ${this.escapeHtml(metadata.artist)}<br>`;
        descriptionText += `アルバム: ${this.escapeHtml(metadata.album)}`;
        
        if (metadata.year) {
            descriptionText += `<br>年: ${this.escapeHtml(metadata.year)}`;
        }
        
        descriptionText += `</p>`;

        // ProseMirror エディタの値を設定
        try {
            editor.value = descriptionText;
            ui.notifications?.info("メタデータを説明欄にセットしました（保存ボタンを押すと確定します）");
        } catch (error) {
            console.error(`${this.ID} | Failed to set editor value:`, error);
            ui.notifications?.error("説明欄への転記に失敗しました");
        }
    }

    /**
     * HTMLエスケープ
     * @param {string} text - エスケープするテキスト
     * @returns {string} エスケープされたテキスト
     */
    static escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// モジュール初期化
Hooks.once('init', () => {
    MetadataInspector.initialize();
});
