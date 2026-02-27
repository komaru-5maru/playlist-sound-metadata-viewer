# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

--------------------------------------------------------------------------------
## [2.1.1] - 2026-02-15

### Added
- Added Debug Mode (configurable in module settings).
- Implemented a logging system consistent with scene-bgm-manager.
- Improved error messages, including specific descriptions for missing ID3 tags.

### Changed
- Fully migrated to ES Modules (using import/export syntax).
- Reorganized file structure into the scripts/ directory for better maintainability.
- Refactored the core logic into a class-based architecture.
- Updated to support the path property for sounds in Foundry VTT v13 (transitioned from src).
- Resolved double-encoding issues in URL processing.
- Renamed internal data attributes to metadataLoaded for JavaScript dataset compatibility.

### Fixed
- Fixed selectors in the Playlist Sidebar to support li.sound elements correctly.
- Fixed metadata display issues within the Sound Configuration dialog.
- Fixed the metadata transcription feature to reliably copy info to the description field.

---

### 追加 (Japanese)
- デバッグモード機能を追加（モジュール設定から有効化可能）。
- scene-bgm-manager と同様のログシステムを実装。
- エラーメッセージの改善（ID3タグが見つからない場合の説明を追加）。

### 変更
- 完全 ES Modules 化（import/export 構文を使用）。
- メンテナンス性向上のため、ファイル構造を scripts/ ディレクトリへ整理。
- コアロジックをクラスベースの設計にリファクタリング。
- Foundry VTT v13 の仕様変更に伴い、サウンドのパス参照を src から path プロパティへ更新。
- URL処理における二重エンコードの問題を解決。
- JSの dataset 互換性のため、内部データ属性名を metadataLoaded に変更。

### 修正
- プレイリストサイドバーのセレクタを修正（li.sound 要素を正確に認識するように変更）。
- サウンド設定ダイアログ内でのメタデータ表示不具合を修正。
- メタデータの説明欄への転記機能が確実に動作するよう修正。

--------------------------------------------------------------------------------
## [2.0.2] - 2026-02-15

### Changed
- BREAKING: Completed migration to Foundry VTT v13 ApplicationV2 architecture.
- Removed jQuery dependencies in favor of standard modern DOM APIs.
- Migrated implementation to the MetadataInspector class.
- Updated Tooltip API usage to comply with v13 specifications.
- Adapted ProseMirror editor interactions to current Foundry VTT API standards.

### Added
- Added HTML escaping for metadata strings to prevent XSS.
- Improved overall error handling for robust performance.
- Added support for the "Year" field in ID3 metadata.
- Implemented more detailed console logging for easier troubleshooting.

### Fixed
- Fixed hook processing for ApplicationV2 dialogs.
- Resolved potential memory leak issues in event listeners.

### Improved
- Enhanced code readability and maintainability through modern JS practices.
- Optimized performance for metadata loading.

---

### 変更 (Japanese)
- 重要: Foundry VTT v13 ApplicationV2 アーキテクチャへ完全に移行。
- jQuery への依存を完全に削除し、標準のモダン DOM API へ移行。
- 実装を MetadataInspector クラスへ移行。
- ツールチップ API の利用方法を v13 の仕様に適合。
- ProseMirror エディタの操作ロジックを最新の API 標準に適合。

### 追加
- XSS 対策のため、メタデータ文字列に HTML エスケープ処理を追加。
- 堅牢な動作のため、エラーハンドリング全体を改善。
- ID3 メタデータの「年（Year）」フィールドの表示をサポート。
- トラブルシューティングを容易にするため、より詳細なコンソールログ出力を実装。

### 修正
- ApplicationV2 ダイアログにおけるフック処理を修正。
- イベントリスナーにおける潜在的なメモリリークの問題を解決。

### 向上
- モダンな JavaScript 慣習を採用し、コードの可読性と保守性を向上。
- メタデータ読み込みのパフォーマンスを最適化。

--------------------------------------------------------------------------------
## [1.0.0] - 2026-02-15

### Added
- Initial release.
- Core functionality: Metadata display in Sound Configuration and automatic transcription to the description field.

---

### 追加 (Japanese)
- 初回リリース。
- 主要機能：サウンド設定ダイアログでのメタデータ表示および説明欄への自動転記機能の実装。
