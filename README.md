# Playlist Sound Metadata Viewer

![Foundry v13](https://img.shields.io/badge/Foundry-v13-informational)

[![Support me on Ko-fi](https://img.shields.io/badge/Support%20me%20on%20Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/komarutrpg)
[![OFUSEで応援を送る](https://img.shields.io/badge/OFUSE-応援を送る-00C2FF?style=for-the-badge&logo=target&logoColor=white)](https://ofuse.me/o?uid=99781)

Hi, I'm Komaru, a TRPG enthusiast and developer. 
I create modules to make our sessions more enjoyable!

A Foundry VTT module that displays and exports ID3 metadata tags (Title, Artist, Album) for audio files in your playlists.

## Installation / インストール方法

### Manifest URL
https://github.com/komaru-5maru/playlist-sound-metadata-viewer/releases/latest/download/module.json

#### English
To install the module, go to **Add-on Modules** > **Install Module** in the Foundry VTT Setup, paste the **Manifest URL** above into the "Manifest URL" field, and click **Install**.

#### 日本語
Foundry VTTの設定画面から **「モジュール管理（アドオン・モジュール）」** > **「モジュールのインストール」** を開き、下部の「URLを指定」欄に上記の **Manifest URL** を貼り付けて **「インストール」** をクリックしてください

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

## Changelog
### v2.1.7
- **[Refactor]** Reorganized project structure by moving scripts into the `scripts/` directory.
- **[CI/CD]** Integrated Vitest for automated structure checks. Added GitHub Actions pipeline to validate `module.json` and file integrity upon release.
- **[Fixed]** Updated manifest paths to align with the new directory structure.
- **[Fixed]** Updated version string to `2.1.7` in `module.json`.

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

## 修正履歴
### v2.1.7
- **[リファクタリング]** プロジェクト構成を整理し、スクリプトファイルを `scripts/` フォルダへ移動。
- **[CI/CD]** Vitest による自動構造チェックを導入。リリース時に `module.json` の整合性とファイル構成を GitHub Actions で自動検証する仕組みを構築。
- **[修正]** 新しいディレクトリ構成に合わせて `module.json` 内のパス指定を更新。
- **[修正]** `module.json` のバージョン表記を `2.1.7` に更新。