export const dynamic = "force-dynamic";

import { getQuestionsByCategory } from "@/actions/questions";
import { redirect } from "next/navigation";
import { StudyClient } from "./StudyClient";

const CATEGORY_MAP: Record<string, string> = {
  "ai-basics": "AIの基礎知識",
  "generative-ai": "生成AIの仕組み",
  "prompt-engineering": "プロンプトエンジニアリング",
  "law": "著作権・個人情報・法律",
  "risk-ethics": "AIリスク・倫理・ガイドライン",
  "business": "ビジネス活用事例",
};

export default async function StudyCategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const categoryName = CATEGORY_MAP[params.category];
  if (!categoryName) redirect("/study");

  const questions = await getQuestionsByCategory(categoryName);

  return <StudyClient questions={questions} backHref="/study" />;
}
