export const dynamic = "force-dynamic";

import { auth } from "@/auth";
import { getReviewQuestions } from "@/actions/questions";
import { redirect } from "next/navigation";
import { StudyClient } from "../study/[category]/StudyClient";

export default async function ReviewPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/");

  const questions = await getReviewQuestions(session.user.id);

  if (questions.length === 0) {
    redirect("/dashboard");
  }

  return (
    <StudyClient
      questions={questions}
      userId={session.user.id}
      backHref="/dashboard"
    />
  );
}
