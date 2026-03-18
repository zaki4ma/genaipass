# 生成AIパスポート対策クイズアプリを作ってください

## サービス概要
生成AIパスポート試験（GUGA主催）の合格を目指すユーザー向けの問題演習Webアプリ。
AIで生成した問題を使い、分野別学習・苦手復習・模擬試験の3モードで学習できる。

## 技術スタック
- **フレームワーク**: Next.js 14（App Router）
- **スタイル**: Tailwind CSS
- **DB**: Neon（サーバーレスPostgreSQL）
- **ORM**: Drizzle ORM
- **認証**: NextAuth.js v5（Google OAuth）
- **デプロイ先**: Vercel

## 機能要件

### 0. 認証
- Googleアカウントでログイン・ログアウトできる
- 未ログイン時はランディングページを表示（サービス説明＋Googleログインボタン）
- ログイン済みはダッシュボードにリダイレクト

### 1. 四択問題を解く
- 問題文と4つの選択肢を表示する
- 回答後に正解・不正解をすぐ表示し、解説文も表示する
- 次の問題へ進むボタンで続けられる

### 2. 分野別に絞って解く
- 以下の分野から選んで出題できる
  - AIの基礎知識
  - 生成AIの仕組み
  - プロンプトエンジニアリング
  - 著作権・個人情報・法律
  - AIリスク・倫理・ガイドライン
  - ビジネス活用事例
- 分野を選ぶとその分野の問題だけがランダムに出題される

### 3. 間違えた問題を復習
- 不正解だった問題を自動で記録する
- 「復習モード」では間違えた問題だけを集中して出題する
- 正解できた復習問題は復習リストから除外される

### 4. 合格模擬試験モード
- 本番と同じ60問・60分のタイマー付き試験モード
- 全分野からバランスよく出題（分野ごとの出題比率を本番に合わせる）
- 試験終了後にスコア・合否判定（80%以上で合格）・分野別正答率を表示する

## DBスキーマ

```sql
-- ユーザーテーブル（NextAuthが自動管理）
users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT UNIQUE NOT NULL,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
)

-- 問題テーブル
questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL, -- 分野名
  question TEXT NOT NULL, -- 問題文
  choices JSONB NOT NULL, -- ["選択肢A", "選択肢B", "選択肢C", "選択肢D"]
  answer_index INTEGER NOT NULL, -- 正解のインデックス（0〜3）
  explanation TEXT NOT NULL, -- 解説文
  created_at TIMESTAMPTZ DEFAULT NOW()
)

-- ユーザーの回答履歴
answer_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  is_correct BOOLEAN NOT NULL,
  answered_at TIMESTAMPTZ DEFAULT NOW()
)

-- 復習リスト（間違えた問題）
review_list (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  UNIQUE(user_id, question_id)
)
```

## 問題データの投入方法
- 問題はJSONファイルで管理し、シードスクリプトでNeonに一括投入する
- `scripts/seed.ts` を作成し `npx tsx scripts/seed.ts` で実行できるようにする
- 初期データは `data/questions.json` に置く

## UI・UX要件
- ダークモードをデフォルトにする（Tsudzukiと統一感のあるデザイン）
- 回答時に正解は緑・不正解は赤でハイライトするアニメーション
- 進捗バーで「残り何問か」を常に表示する
- ダッシュボードに「今日の学習状況」「総回答数」「正答率」を表示する
- モバイルファーストで設計する

## 実装の進め方

### Step 1: 問題データの生成（最初にやること）
以下の条件で `data/questions.json` を生成してください。

- **総問題数**: 120問（各分野20問ずつ）
- **分野**:
  - AIの基礎知識
  - 生成AIの仕組み
  - プロンプトエンジニアリング
  - 著作権・個人情報・法律
  - AIリスク・倫理・ガイドライン
  - ビジネス活用事例
- **出題形式**: 四択（一部複数選択を含む）
- **難易度**: 本番試験（80%合格ライン）を意識した難易度
- **JSONフォーマット**:

```json
[
  {
    "category": "AIの基礎知識",
    "question": "問題文をここに書く",
    "choices": ["選択肢A", "選択肢B", "選択肢C", "選択肢D"],
    "answer_index": 0,
    "explanation": "解説文をここに書く。なぜこの選択肢が正解かを説明する。"
  }
]
```

問題を生成したら内容を確認して、その後以下のステップに進む。

### Step 2: アプリの実装
1. Neonのプロジェクト作成とDBスキーマのマイグレーション
2. Drizzle ORM のセットアップ
3. NextAuth.js v5 のGoogle プロバイダー設定
4. `scripts/seed.ts` でDBに問題を投入するスクリプト作成
5. Server Actionsでのデータ取得・回答処理の実装
6. 各画面のUIコンポーネント実装
7. 模擬試験モードのタイマー実装

## 環境変数

```.env.local
# Neon
DATABASE_URL=（NeonのConnection Stringをここにセット）

# NextAuth
AUTH_SECRET=（`npx auth secret` で生成）
AUTH_GOOGLE_ID=（Google Cloud ConsoleのクライアントID）
AUTH_GOOGLE_SECRET=（Google Cloud Consoleのクライアントシークレット）
```

## Google Cloud Consoleの設定
- 承認済みのリダイレクトURIに以下を追加すること
  - 開発環境: `http://localhost:3000/api/auth/callback/google`
  - 本番環境: `https://your-app.vercel.app/api/auth/callback/google`
