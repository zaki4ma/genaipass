"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QuizCard } from "@/components/QuizCard";
import { ProgressBar } from "@/components/ProgressBar";
import { addAnswerLog, addToReviewList, removeFromReviewList } from "@/lib/storage";

interface Question {
  id: string;
  category: string;
  question: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
}

interface StudyClientProps {
  questions: Question[];
  backHref: string;
}

export function StudyClient({ questions, backHref }: StudyClientProps) {
  const [current, setCurrent] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const router = useRouter();

  const q = questions[current];

  function handleAnswer(isCorrect: boolean) {
    setAnswered(true);
    if (isCorrect) {
      setScore((s) => s + 1);
      removeFromReviewList(q.id);
    } else {
      addToReviewList(q.id);
    }
    addAnswerLog(q.id, isCorrect);
  }

  function handleNext() {
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setAnswered(false);
    }
  }

  if (finished) {
    const accuracy = Math.round((score / questions.length) * 100);
    return (
      <main className="min-h-screen bg-gray-950 px-4 py-8">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="text-5xl">{accuracy >= 80 ? "🎉" : "📖"}</div>
          <h1 className="text-2xl font-bold text-white">完了！</h1>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
            <p className="text-gray-400 text-sm">{q?.category}</p>
            <p className="text-4xl font-bold text-white">
              {score} / {questions.length}
            </p>
            <p
              className={`text-2xl font-bold ${
                accuracy >= 80 ? "text-green-400" : "text-orange-400"
              }`}
            >
              {accuracy}%
            </p>
            <p className="text-gray-500 text-sm">
              {accuracy >= 80 ? "合格ライン超え！" : "もう一度挑戦してみましょう"}
            </p>
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => router.push(backHref)}
              className="px-6 py-3 bg-gray-800 text-gray-300 rounded-xl hover:bg-gray-700 transition-colors text-sm"
            >
              戻る
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition-colors text-sm"
            >
              ダッシュボード
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push(backHref)}
            className="text-gray-500 hover:text-gray-300 text-sm"
          >
            ← 戻る
          </button>
          <span className="text-sm text-gray-500">
            {current + 1} / {questions.length}
          </span>
        </div>

        <ProgressBar current={current} total={questions.length} />

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <QuizCard key={q.id} question={q} onAnswer={handleAnswer} />
        </div>

        {answered && (
          <button
            onClick={handleNext}
            className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition-colors font-medium"
          >
            {current + 1 >= questions.length ? "結果を見る" : "次の問題 →"}
          </button>
        )}
      </div>
    </main>
  );
}
