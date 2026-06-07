# AGENTS.md

このファイルは、このリポジトリで作業するAIコーディングエージェント向けの最小ガイドです。

## 1) コミュニケーション

- ユーザーとのやり取りは、常に日本語で行うこと。
- 変更理由・影響範囲・次のアクションを短く明確に説明すること。

## 2) リポジトリ概要

- ルート側は静的フロントエンド中心（`public/` のHTML/CSS/JS）。
- `library/pokemon-showdown/` はサブモジュール由来のコアロジックとデータ。
- `scripts/export-champions-calc-data.js` が Showdown データを `public/db/` 向けJSONに変換する。

## 3) まず実行するコマンド

ルートで実行:

1. `npm run setup`（サブモジュール初期化）
2. `npm install`（ルート + サブモジュール依存関係）
3. `npm run build:showdown`（Showdownビルド）
4. `npm run build:data`（`public/db/champions-calc-data.json` 生成）
5. `npm run server`（`public/` のローカル配信）

## 4) 重要な落とし穴

- `npm run build:data` は `library/pokemon-showdown/dist/sim/index.js` が前提。未生成なら先に `npm run build:showdown` を実行すること。
- データ更新タスクでは、生成物（`public/db/*.json`）と元ロジック（`scripts/export-champions-calc-data.js`）を混同しないこと。
- `library/pokemon-showdown/` 側の設計や規約は upstream ドキュメントを優先し、内容をこのファイルに重複記載しないこと。

## 5) 変更時の推奨確認

- データ生成ロジック変更時: `npm run build:showdown` → `npm run build:data`
- サブモジュール内変更時: `npm --prefix library/pokemon-showdown test`
- フロント変更時: `npm run server` で該当ページを目視確認

## 6) 参照先（詳細はリンク先を正とする）

- プロジェクト方針: [GEMINI.md](./GEMINI.md)
- Showdown全体: [library/pokemon-showdown/README.md](./library/pokemon-showdown/README.md)
- Showdown設計: [library/pokemon-showdown/ARCHITECTURE.md](./library/pokemon-showdown/ARCHITECTURE.md)
- Showdown開発規約: [library/pokemon-showdown/CONTRIBUTING.md](./library/pokemon-showdown/CONTRIBUTING.md)