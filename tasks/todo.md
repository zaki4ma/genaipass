# 生成AIパスポート対策クイズアプリ 実装タスク

## Phase 1: プロジェクト初期化
- [x] create-next-app@14 でプロジェクト初期化
- [x] 追加パッケージインストール (drizzle-orm, next-auth@beta, tsx等)
- [x] tailwind.config.ts ダークモード設定
- [x] layout.tsx に dark クラス設定

## Phase 2: DB設定
- [x] src/db/schema.ts 作成
- [x] src/db/index.ts 作成
- [x] drizzle.config.ts 作成
- [x] .env.local テンプレート作成

## Phase 3: 問題データ生成
- [x] data/questions.json (120問) 生成

## Phase 4: Auth & シード
- [x] src/auth.ts (NextAuth v5 Google Provider)
- [x] src/middleware.ts
- [x] scripts/seed.ts

## Phase 5: Server Actions
- [x] src/actions/questions.ts
- [x] src/actions/answers.ts

## Phase 6: UI実装
- [x] src/components/QuizCard.tsx
- [x] src/components/ProgressBar.tsx
- [x] src/components/ExamTimer.tsx
- [x] app/page.tsx ランディング
- [x] app/dashboard/page.tsx ダッシュボード
- [x] app/study/page.tsx 分野選択
- [x] app/study/[category]/page.tsx & StudyClient.tsx
- [x] app/review/page.tsx 復習モード
- [x] app/exam/page.tsx & ExamClient.tsx 模擬試験（結果含む）

## Review
- npm run build 成功 ✅
- 全ページ実装完了

## 次のステップ（ユーザー作業）
1. .env.local に環境変数を設定
2. npx drizzle-kit generate && npx drizzle-kit migrate
3. npx tsx scripts/seed.ts
4. npm run dev で動作確認
