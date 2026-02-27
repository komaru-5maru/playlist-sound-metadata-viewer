# Playlist Sound Metadata Viewer
A Foundry VTT module that displays and exports ID3 metadata tags (Title, Artist, Album) for audio files in your playlists.

## Features
- **Metadata Inspection:** Automatically reads and displays ID3 tags directly in the Playlist Sound Configuration dialog.
- **Bulk Export:** Adds buttons to the Playlist Directory footer to export metadata for all sounds to the clipboard in Markdown format.
- **Clean Export Option:** Provides a "Clean" export mode that excludes items with unknown metadata to keep your lists tidy.
- **Localization Support:** Fully compatible with English and Japanese environments.
- **v13 Ready:** Optimized for the latest Foundry VTT v13 API and Node.js environments.

## How to Use
1. **View Metadata:** Open any Sound Configuration in a Playlist. A new "Metadata" section will appear below the source path.
2. **Export All:** Click the "Export Metadata" button at the bottom of the Playlist Directory. The formatted list will be copied to your clipboard.

## Requirements
- Foundry VTT v13+
- Internet connection (for initial loading of the jsmediatags library via CDN).

--------------------------------------------------------------------------------

# プレイリスト・サウンド・メタデータ・ビューア
プレイリスト内のオーディオファイルからID3メタデータ（タイトル、アーティスト、アルバム）を読み取り、表示およびエクスポートするためのFoundry VTTモジュールです。

## 主な機能
- **メタデータの確認:** プレイリストのサウンド設定ダイアログ内に、ID3タグ情報を自動的に読み込んで表示します。
- **一括エクスポート:** プレイリストディレクトリの下部に、全サウンドのメタデータをMarkdown形式でクリップボードに書き出すボタンを追加します。
- **クリーンエクスポート:** メタデータが不明な項目を除外して書き出すオプションにより、整理されたリストを作成できます。
- **多言語対応:** 英語および日本語環境に完全対応しています。
- **v13 対応:** 最新の Foundry VTT v13 API および Node.js 実行環境に最適化されています。

## 使い方
1. **メタデータの確認:** プレイリスト内のサウンド設定を開きます。ソースパスの下に「メタデータ情報」セクションが表示されます。
2. **一括エクスポート:** プレイリストタブの下部にある「メタデータをエクスポート」ボタンをクリックします。整形されたテキストがクリップボードにコピーされます。

## 必要条件
- Foundry VTT v13以上
- インターネット接続（jsmediatags ライブラリをCDN経由でロードするために必要です）。