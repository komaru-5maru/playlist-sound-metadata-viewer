/**
 * Playlist Sound Metadata Viewer - Metadata Reader
 */

export class MetadataReader {
    static libraryLoaded = false;

    static async loadLibrary() {
        if (this.libraryLoaded || window.jsmediatags) {
            this.libraryLoaded = true;
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jsmediatags/3.9.5/jsmediatags.min.js';
            script.async = true;
            script.onload = () => {
                this.libraryLoaded = true;
                resolve();
            };
            script.onerror = () => {
                reject(new Error('Failed to load jsmediatags from CDN'));
            };
            document.head.appendChild(script);
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

            const fullPath = `${window.location.origin}/${soundPath}`;

            window.jsmediatags.read(fullPath, {
                onSuccess: (tag) => {
                    resolve({
                        title: tag.tags.title || game.i18n.localize("PSMV.UnknownTitle"),
                        artist: tag.tags.artist || game.i18n.localize("PSMV.UnknownArtist"),
                        album: tag.tags.album || game.i18n.localize("PSMV.UnknownAlbum")
                    });
                },
                onError: (error) => {
                    reject(error);
                }
            });
        });
    }
}
