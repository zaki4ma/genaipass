export const dynamic = "force-dynamic";

import { auth } from "@/auth";
import { getMockExamQuestions } from "@/actions/questions";
import { redirect } from "next/navigation";
import { ExamClient } from "./ExamClient";

export default async function ExamPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/");

  const questions = await getMockExamQuestions();

  return <ExamClient questions={questions} userId={session.user.id} />;
}
