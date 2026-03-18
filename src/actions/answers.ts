"use server";

import { db } from "@/db";
import { answerLogs, reviewList } from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";

export async function submitAnswer(
  userId: string,
  questionId: string,
  isCorrect: boolean
) {
  // 回答ログに記録
  await db.insert(answerLogs).values({ userId, questionId, isCorrect, answeredAt: new Date() });

  if (isCorrect) {
    // 正解したら復習リストから削除
    await db
      .delete(reviewList)
      .where(
        and(eq(reviewList.userId, userId), eq(reviewList.questionId, questionId))
      );
  } else {
    // 不正解なら復習リストに追加（upsert）
    await db
      .insert(reviewList)
      .values({ userId, questionId })
      .onConflictDoNothing();
  }
}

export async function getDashboardStats(userId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [todayStats] = await db
    .select({
      count: sql<number>`COUNT(*)`,
      correct: sql<number>`SUM(CASE WHEN is_correct THEN 1 ELSE 0 END)`,
    })
    .from(answerLogs)
    .where(
      and(
        eq(answerLogs.userId, userId),
        sql`${answerLogs.answeredAt} >= ${today}`
      )
    );

  const [totalStats] = await db
    .select({
      count: sql<number>`COUNT(*)`,
      correct: sql<number>`SUM(CASE WHEN is_correct THEN 1 ELSE 0 END)`,
    })
    .from(answerLogs)
    .where(eq(answerLogs.userId, userId));

  const [reviewCount] = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(reviewList)
    .where(eq(reviewList.userId, userId));

  return {
    todayCount: Number(todayStats?.count ?? 0),
    todayCorrect: Number(todayStats?.correct ?? 0),
    totalCount: Number(totalStats?.count ?? 0),
    totalCorrect: Number(totalStats?.correct ?? 0),
    reviewCount: Number(reviewCount?.count ?? 0),
    accuracy:
      Number(totalStats?.count ?? 0) > 0
        ? Math.round(
            (Number(totalStats?.correct ?? 0) /
              Number(totalStats?.count ?? 0)) *
              100
          )
        : 0,
  };
}
