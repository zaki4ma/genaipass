"use server";

import { db } from "@/db";
import { questions, reviewList } from "@/db/schema";
import { eq, inArray, sql } from "drizzle-orm";

export async function getQuestionsByCategory(category: string) {
  const results = await db
    .select()
    .from(questions)
    .where(eq(questions.category, category))
    .orderBy(sql`RANDOM()`);
  return results;
}

export async function getReviewQuestions(userId: string) {
  const reviewItems = await db
    .select({ questionId: reviewList.questionId })
    .from(reviewList)
    .where(eq(reviewList.userId, userId));

  if (reviewItems.length === 0) return [];

  const questionIds = reviewItems.map((r) => r.questionId);
  const results = await db
    .select()
    .from(questions)
    .where(inArray(questions.id, questionIds))
    .orderBy(sql`RANDOM()`);

  return results;
}

export async function getMockExamQuestions() {
  // 6分野 × 10問 = 60問
  const categories = [
    "AIの基礎知識",
    "生成AIの仕組み",
    "プロンプトエンジニアリング",
    "著作権・個人情報・法律",
    "AIリスク・倫理・ガイドライン",
    "ビジネス活用事例",
  ];

  const allQuestions = await Promise.all(
    categories.map((cat) =>
      db
        .select()
        .from(questions)
        .where(eq(questions.category, cat))
        .orderBy(sql`RANDOM()`)
        .limit(10)
    )
  );

  return allQuestions.flat();
}
