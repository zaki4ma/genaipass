"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QuizCard } from "@/components/QuizCard";
import { ProgressBar } from "@/components/ProgressBar";
import { ExamTimer } from "@/components/ExamTimer";
import { addAnswerLog, addToReviewList, removeFromReviewList } from "@/lib/storage";

interface Question {
  id: string;
  category: string;
  question: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
}

interface ExamClientProps {
  questions: Question[];
}

export function ExamClient({ questions }: ExamClientProps) {
  const [current, setCurrent] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [results, setResults] = useState<{ isCorrect: boolean; category: string }[]>([]);
  const [finished, setFinished] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const router = useRouter();

  const q = questions[current];

  function handleAnswer(isCorrect: boolean) {
    setAnswered(true);
    setResults((r) => [...r, { isCorrect, category: q.category }]);
    addAnswerLog(q.id, isCorrect);
    if (isCorrect) {
      removeFromReviewList(q.id);
    } else {
      addToReviewList(q.id);
    }
  }

  function handleNext() {
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setAnswered(false);
    }
  }

  function handleTimeUp() {
    setTimeUp(true);
    setFinished(true);
  }

  if (finished || timeUp) {
    const correctCount = results.filter((r) => r.isCorrect).length;
    const totalAnswered = results.length;
    const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
    const passed = accuracy >= 80 && totalAnswered >= questions.length;

    const categories = Array.from(new Set(questions.map((q) => q.category)));
    const categoryStats = categories.map((cat) => {
      const catResults = results.filter((r) => r.category === cat);
      const correct = catResults.filter((r) => r.isCorrect).length;
      return { cat, correct, total: catResults.length };
    });

    return (
      <main className="min-h-screen bg-gray-950 px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="text-5xl">{passed ? "🎉" : timeUp ? "⏰" : "📖"}</div>
            <h1 className="text-2xl font-bold text-white">
              {timeUp ? "時間切れ" : "模擬試験 終了"}
            </h1>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center space-y-3">
            <p className="text-gray-400 text-sm">スコア</p>
            <p className="text-5xl font-bold text-white">
              {correctCount} / {totalAnswered}
            </p>
            <p className={`text-3xl font-bold ${passed ? "text-green-400" : "text-orange-400"}`}>
              {accuracy}%
            </p>
            <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold ${
              passed ? "bg-green-900/40 text-green-300 border border-green-700" : "bg-red-900/40 text-red-300 border border-red-700"
            }`}>
              {passed ? "合格" : "不合格"}
            </div>
            <p className="text-xs text-gray-600">合格ライン: 80%以上</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-3">
            <h2 className="text-sm font-semibold text-gray-400">分野別正答率</h2>
            {categoryStats.map(({ cat, correct, total }) => {
              const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
              return (
                <div key={cat} className="space-y-1">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span className="truncate flex-1 mr-2">{cat}</span>
                    <span>{correct}/{total} ({pct}%)</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${pct >= 80 ? "bg-green-500" : "bg-orange-500"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => router.push("/dashboard")}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition-colors text-sm"
            >
              ダッシュボードへ
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
          <span className="text-sm text-gray-500 font-medium">模擬試験</span>
          <ExamTimer durationSeconds={60 * 60} onTimeUp={handleTimeUp} />
        </div>

        <ProgressBar current={current} total={questions.length} />

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <QuizCard key={q.id} question={q} onAnswer={handleAnswer} examMode />
        </div>

        {answered && (
          <button
            onClick={handleNext}
            className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition-colors font-medium"
          >
            {current + 1 >= questions.length ? "試験終了 →" : "次の問題 →"}
          </button>
        )}
      </div>
    </main>
  );
}
