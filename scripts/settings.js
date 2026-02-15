/**
 * Playlist Sound Metadata Viewer - Settings Registration
 * 設定の登録
 */

import { getModuleId } from './utils.js';

/**
 * モジュール設定を登録
 */
export function registerSettings() {
    const moduleId = getModuleId();

    // 簡易説明用のテキストを定義
    const configHint = "このモジュールは、プレイリストに登録されている音楽ファイルのメタデータ（タイトル、アーティスト、アルバム）を表示・出力するツールです。\n\n" +
                       "【主な機能】\n" +
                       "1. サウンド設定画面でのメタデータ表示\n" +
                       "   - サウンドの編集画面を開くと、ID3タグ情報が自動的に表示されます。\n\n" +
                       "2. 一括出力機能\n" +
                       "   - プレイリストサイドバー下部のボタンから、全プレイリストのメタデータをMarkdown形式で出力できます。\n" +
                       "   - 「メタデータを出力」: すべての情報を出力\n" +
                       "   - 「メタデータを出力（不明除去）」: メタデータが存在する項目のみ出力";

    // モジュール全体の簡易説明（最初に表示）
    game.settings.register(moduleId, 'moduleDescription', {
        name: "【Playlist Sound Metadata Viewer の使い方】",
        hint: configHint,
        scope: 'world',
        config: true,
        type: Boolean,
        default: true,
        onChange: () => {}
    });

    // デバッグログ設定の登録
    game.settings.register(moduleId, 'enableDebug', {
        name: 'デバッグログを出力する',
        hint: 'コンソールに詳細な動作ログを出力します。トラブル時の調査に利用してください。',
        scope: 'client',
        config: true,
        type: Boolean,
        default: false
    });
}
