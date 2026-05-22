# 履歴書ビルダー

Webブラウザで動く履歴書作成アプリ。

🌐 **公開URL**: https://scolor-dev.github.io/rirekisho-builder/

---

## 技術スタック

| 項目 | 内容 |
|---|---|
| フレームワーク | React 19 + React Compiler |
| 言語 | TypeScript |
| ビルドツール | Vite |
| リンター | oxlint + ESLint |
| パッケージマネージャー | pnpm |
| ホスティング | GitHub Pages |

---

## 開発環境のセットアップ

### 必要なもの

- Node.js 20以上
- pnpm

### 手順

```bash
# リポジトリをクローン
git clone https://github.com/<ユーザー名>/rirekisho-builder.git
cd rirekisho-builder

# 依存関係のインストール
pnpm install

# 開発サーバー起動
pnpm dev
```

ブラウザで http://localhost:5173 を開く。

---

## コマンド一覧

| コマンド | 内容 |
|---|---|
| `pnpm dev` | 開発サーバー起動 |
| `pnpm build` | 型チェック + 本番ビルド |
| `pnpm preview` | ビルド結果のプレビュー |
| `pnpm lint` | oxlint + ESLint 実行 |
| `pnpm lint:ox` | oxlint 実行 |
| `pnpm deploy` | GitHub Pages へデプロイ |

---

## デプロイ

```bash
# ビルド → GitHub Pages へ公開
pnpm deploy
```

`gh-pages` ブランチに `dist/` の内容が自動でプッシュされる。

---

## ディレクトリ構成

```
rirekisho-builder/
├── src/
│   ├── App.tsx
│   └── main.tsx
├── public/
├── eslint.config.js
├── oxlintrc.json
├── .oxlintignore
├── tsconfig.json
├── vite.config.ts
└── package.json
```