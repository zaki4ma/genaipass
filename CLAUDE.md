# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

必ず回答は日本語で行ってください。ユーザーの意欲、継続性を高める返答をしてください。


## ワークフロー
### 1. 計画フェーズ（プランモード）
- 3ステップ以上 または 設計判断が必要なタスクは **必ずプランモードに入る**
- 途中で問題が発生したら **即座に作業を止めて再計画する**（無理に進めない）
- 構築だけでなく、検証ステップもプランモードで計画する
- 詳細な仕様をあらかじめ明文化して曖昧さを排除する

### 2. サブエージェント戦略
- メインのコンテキストウィンドウをクリーンに保つために **サブエージェントを積極活用する**
- リサーチ・コード探索・並列分析はサブエージェントに委譲する
- 複雑な問題には複数のサブエージェントを投入してより多くの計算リソースをかける
- 1サブエージェント = 1タスクで集中して実行させる

### 3. 自己改善ループ
- ユーザーから修正指摘を受けたら **必ず `tasks/lessons.md` にそのパターンを記録する**
- 同じミスを繰り返さないためのルールを自分向けに書く
- ミス率が下がるまでレッスンを徹底的に改善し続ける
- セッション開始時にそのプロジェクトに関連するレッスンをレビューする

### 4. 完了前の検証（必須）
- **動作を証明せずにタスク完了としない**
- 関連する場合は `main` と自分の変更の差分を確認する
- 「スタッフエンジニアがこれを承認するか？」と自問する
- テストを実行し、ログを確認し、正しさを実証する

### 5. エレガントさを追求する（バランス重視）
- 非自明な変更では「より優雅な方法はないか？」と立ち止まって考える
- 修正がハック的に感じたら：「今知っている全てを活かして、エレガントな解決策を実装する」
- 単純で明白な修正にはこれを省略する（過剰設計しない）
- 提示する前に自分のコードを批判的にレビューする

### 6. バグ修正の自律対応
- バグレポートが来たら **そのまま修正する**（手取り足取り聞かない）
- ログ・エラー・失敗テストを手がかりにして自力で解決する
- ユーザーのコンテキストスイッチをゼロにする
- 指示されなくても CI の失敗テストを修正しに行く

---

## タスク管理

| ステップ | 内容 |
|----------|------|
| **計画を立てる** | `tasks/todo.md` にチェック可能な項目でプランを書く |
| **計画を確認する** | 実装開始前にチェックインする |
| **進捗を追跡する** | 完了した項目を随時チェック済みにする |
| **変更を説明する** | 各ステップでハイレベルなサマリーを提示する |
| **結果を記録する** | `tasks/todo.md` にレビューセクションを追加する |
| **レッスンを残す** | 修正指摘を受けたら `tasks/lessons.md` を更新する |

---

## 基本原則
**シンプルさを最優先**: あらゆる変更を可能な限りシンプルにする。影響するコードを最小限に留める。
**手を抜かない**: 根本原因を突き止める。一時しのぎの修正はしない。シニアエンジニアの水準で臨む。
**影響を最小化する**: 変更は必要な箇所だけに留める。バグを新たに持ち込まない。




## Project Overview

生成AIパスポート対策クイズアプリ — A quiz web app for the Generative AI Passport exam (GUGA-sponsored). Users can study by field, review incorrect answers, and take mock exams.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS (dark mode default)
- **Database**: Neon (serverless PostgreSQL)
- **ORM**: Drizzle ORM
- **Auth**: NextAuth.js v5 (Google OAuth)
- **Deployment**: Vercel

## Common Commands

```bash
# Development
npm run dev

# Build
npm run build

# DB migrations (after schema changes in src/db/schema.ts)
npx drizzle-kit generate
npx drizzle-kit migrate

# Seed questions into DB
npx tsx scripts/seed.ts

# Lint
npm run lint
```

## Architecture

### Directory Structure (planned)
```
src/
  app/              # Next.js App Router pages
  components/       # UI components
  db/               # Drizzle schema and client
  lib/              # Shared utilities, auth config
  actions/          # Next.js Server Actions
scripts/
  seed.ts           # DB seeding script
data/
  questions.json    # Source of truth for quiz questions
```

### Data Flow
- Questions live in `data/questions.json` (120 questions, 20 per field) and are seeded into the `questions` table via `scripts/seed.ts`.
- All data mutations use **Next.js Server Actions** (not API routes).
- Auth state is managed by NextAuth.js v5; the `users` table is auto-managed by NextAuth.

### Database Schema
Four tables: `users`, `questions`, `answers_logs`, `review_list`.
- `questions.choices` is stored as JSONB array.
- `review_list` has a `UNIQUE(user_id, question_id)` constraint — upsert when adding, delete on correct answer in review mode.

### Key Features
1. **Field-based learning** — filter questions by one of 6 categories
2. **Review mode** — only questions in `review_list` for the current user
3. **Mock exam** — 60 questions, 60-minute timer, pass at ≥80%, field-breakdown on results

## Environment Variables

Required in `.env.local`:
```
DATABASE_URL=       # Neon connection string
AUTH_SECRET=        # Generate with: npx auth secret
AUTH_GOOGLE_ID=     # Google Cloud Console OAuth client ID
AUTH_GOOGLE_SECRET= # Google Cloud Console OAuth client secret
```

Google OAuth redirect URIs to register:
- Dev: `http://localhost:3000/api/auth/callback/google`
- Prod: `https://<your-app>.vercel.app/api/auth/callback/google`

## UI/UX Guidelines

- Dark mode is the default (matches Tsudzuki design system)
- Correct answers highlight green, incorrect highlight red (with animation)
- Always show a progress bar indicating remaining questions
- Dashboard shows: today's study stats, total answers, accuracy rate
- Mobile-first layout
