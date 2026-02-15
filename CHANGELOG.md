# Changelog

All notable changes to this project will be documented in this file.

## [2.1.1] - 2026-02-15

### Added
- デバッグモード機能を追加（設定で有効化可能）
- scene-bgm-managerと同様のログシステムを実装
- エラーメッセージの改善（ID3タグがない場合の説明を追加）

### Changed
- ES Modules化（import/export使用）
- ファイル構造をscripts/フォルダに整理
- クラスベースの設計に変更
- FVTT v13の`path`プロパティに対応（`src`から変更）
- URLエンコード処理を修正（二重エンコードの問題を解決）
- データ属性名を`metadata-loaded`から`metadataLoaded`に変更（JavaScript dataset互換性）

### Fixed
- プレイリストサイドバーでのセレクタ修正（`li.sound`に対応）
- サウンド設定ダイアログでのメタデータ表示
- ホバーツールチップの表示
- 説明欄への転記機能

## [2.0.2] - 2026-02-15

### Changed
- **BREAKING**: Foundry VTT v13 ApplicationV2対応に完全移行
- jQuery依存を完全削除、標準DOM APIに移行
- クラスベースの実装に変更（`MetadataInspector`クラス）
- Tooltip APIをv13の新しい仕様に対応
- ProseMirrorエディタの操作方法を最新仕様に適合

### Added
- HTMLエスケープ処理を追加（XSS対策）
- エラーハンドリングの改善
- メタデータに年（year）フィールドのサポート追加
- より詳細なコンソールログとエラーメッセージ

### Fixed
- ApplicationV2でのフック処理の修正
- ツールチップ表示タイミングの改善
- 説明欄への転記機能のバグ修正
- メモリリークの可能性がある処理を修正

### Improved
- コードの可読性とメンテナンス性の向上
- モダンなJavaScript構文の採用（async/await、Promise等）
- パフォーマンスの最適化

## [1.0.0] - 2024-XX-XX

### Added
- 初回リリース
- プレイリストサイドバーでのホバー表示機能
- サウンド設定ダイアログでのメタデータ表示機能
- 説明欄への自動転記機能
