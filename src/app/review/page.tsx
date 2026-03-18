"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getReviewList } from "@/lib/storage";
import { getQuestionsByIds } from "@/actions/questions";
import { StudyClient } from "../study/[category]/StudyClient";

interface Question {
  id: string;
  category: string;
  question: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
}

export default function ReviewPage() {
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    const ids = getReviewList();
    if (ids.length === 0) {
      router.push("/dashboard");
      return;
    }
    getQuestionsByIds(ids).then((qs) => setQuestions(qs as Question[]));
  }, [router]);

  if (!questions) {
    return (
      <main className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-gray-500">読み込み中...</p>
      </main>
    );
  }

  return <StudyClient questions={questions} backHref="/dashboard" />;
}
