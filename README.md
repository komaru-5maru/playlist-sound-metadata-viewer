Playlist Sound Metadata Viewer

Hi, I'm Komaru, a TRPG enthusiast and developer.
I create modules to make our sessions more enjoyable!

A Foundry VTT module that displays and exports ID3 metadata tags (Title, Artist, Album) for audio files in your playlists.

Installation / インストール方法

Manifest URL

https://github.com/komaru-5maru/playlist-sound-metadata-viewer/releases/latest/download/module.json

English

To install the module, go to Add-on Modules > Install Module in the Foundry VTT Setup, paste the Manifest URL above into the "Manifest URL" field, and click Install.

日本語

Foundry VTTの設定画面から 「モジュール管理（アドオン・モジュール）」 > 「モジュールのインストール」 を開き、下部の「URLを指定」欄に上記の Manifest URL を貼り付けて 「インストール」 をクリックしてください

Features

Metadata Inspection: Automatically reads and displays ID3 tags directly in the Playlist Sound Configuration dialog.

Bulk Export: Adds buttons to the Playlist Directory footer to export metadata for all sounds to the clipboard in Markdown format.

Clean Export Option: Provides a "Clean" export mode that excludes items with unknown metadata to keep your lists tidy.

Localization Support: Fully compatible with English and Japanese environments.

v13 Ready: Optimized for the latest Foundry VTT v13 API and Node.js environments.

How to Use

View Metadata: Open any Sound Configuration in a Playlist. A new "Metadata" section will appear below the source path.

Export All: Click the "Export Metadata" button at the bottom of the Playlist Directory. The formatted list will be copied to your clipboard.

Requirements

Foundry VTT v13+

Internet connection (for initial loading of the jsmediatags library).

Recent Changes

Full history is available in CHANGELOG.md.

v2.1.9

[Internal] Updated project structure and CI/CD pipeline for Foundry VTT v13.

[Fixed] Optimized library loading and manifest path resolution.

プレイリスト・サウンド・メタデータ・ビューア

プレイリスト内のオーディオファイルからID3メタデータ（タイトル、アーティスト、アルバム）を読み取り、表示およびエクスポートするためのFoundry VTTモジュールです。

主な機能

メタデータの確認: プレイリストのサウンド設定ダイアログ内に、ID3タグ情報を自動的に読み込んで表示します。

一括エクスポート: プレイリストディレクトリの下部に、全サウンドのメタデータをMarkdown形式でクリップボードに書き出すボタンを追加します。

クリーンエクスポート: メタデータが不明な項目を除外して書き出すオプションにより、整理されたリストを作成できます。

多言語対応: 英語および日本語環境に完全対応しています。

v13 対応: 最新の Foundry VTT v13 API および Node.js 実行環境に最適化されています。

使い方

メタデータの確認: プレイリスト内のサウンド設定を開きます。ソースパスの下に「メタデータ情報」セクションが表示されます。

一括エクスポート: プレイリストタブの下部にある「メタデータをエクスポート」ボタンをクリックします。整形されたテキストがクリップボードにコピーされます。

必要条件

Foundry VTT v13以上

インターネット接続（jsmediatags ライブラリの読み込みに必要です）。

最近の更新

詳細な履歴は CHANGELOG.md を参照してください。

v2.1.9

[内部更新] Foundry VTT v13向けのプロジェクト構成とCI/CDパイプラインを最適化。

[修正] ライブラリの読み込み処理とマニフェストパスの解決を修正。