/**
 * Playlist Sound Metadata Viewer - Utility Functions
 * ユーティリティ関数
 */

/**
 * モジュールIDを取得
 * @returns {string}
 */
export function getModuleId() {
    return 'playlist-sound-metadata-viewer';
}

/**
 * HTMLエスケープ
 * @param {string} text - エスケープするテキスト
 * @returns {string} エスケープされたテキスト
 */
export function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
