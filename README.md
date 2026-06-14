# Pokelist 開発手順

このリポジトリには、ルートの静的ツール群と、`kosakasakas-app` のAstroアプリがあります。
`kosakasakas-app` はルート側の `public/db/*.json` を参照します。
ウェブアプリの起動に必要なビルド済みデータはリポジトリに含めてあるため、Showdownのビルドができない環境でも、まずはそのまま起動できます。

## 前提

- Node.js / npm が利用できること
- リポジトリのルートで作業すること

## まず動かす手順

Showdownのビルドやデータ再生成をしなくても、以下だけで `kosakasakas-app` を起動できます。

### 1. Astroアプリ依存関係インストール

```bash
cd kosakasakas-app
npm install
```

### 2. 開発サーバー起動

```bash
npm run dev
```

`npm run dev` の事前処理で `sync:tool-assets` が実行され、
ルートの `public/db` から `kosakasakas-app/public/db` へコミット済みのデータが同期されます。

## データを再生成したい場合の手順

Showdown由来データを最新化したい場合だけ、ルートで以下を実行してください。

### 1. サブモジュール初期化

```bash
npm run setup
```

### 2. 依存関係インストール

```bash
npm install
```

### 3. Showdownビルド

```bash
npm run build:showdown
```

### 4. データ生成

```bash
npm run build:data
```

### 5. Astroアプリ依存関係インストール

```bash
cd kosakasakas-app
npm install
```

### 6. 開発サーバー起動

```bash
npm run dev
```

`npm run dev` の事前処理で `sync:tool-assets` が実行され、
ルートの `public/db` から `kosakasakas-app/public/db` へデータが同期されます。

## データ更新時に再実行するコマンド

ルートで以下を再実行してください。

```bash
npm run build:showdown
npm run build:data
```

その後、`kosakasakas-app` で `npm run dev` を再起動してください。

## 参考: ルートの主なスクリプト

- `npm run setup`: サブモジュール初期化
- `npm run server`: 旧システム（`public/`）のローカル配信
- `npm run build:showdown`: Showdownビルド
- `npm run build:data`: champions-calc-data生成
- `npm run build:csv:ja`: 日本語CSV生成
- `npm run refresh:champions`: データ一括更新
