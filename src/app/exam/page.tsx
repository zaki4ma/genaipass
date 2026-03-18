export const dynamic = "force-dynamic";

import { getMockExamQuestions } from "@/actions/questions";
import { ExamClient } from "./ExamClient";

export default async function ExamPage() {
  const questions = await getMockExamQuestions();
  return <ExamClient questions={questions} />;
}
