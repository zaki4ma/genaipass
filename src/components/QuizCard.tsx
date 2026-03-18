"use client";

import { useState } from "react";

interface Question {
  id: string;
  category: string;
  question: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
}

interface QuizCardProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
  examMode?: boolean;
}

export function QuizCard({ question, onAnswer, examMode = false }: QuizCardProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;

  function handleSelect(index: number) {
    if (answered) return;
    setSelected(index);
    const isCorrect = index === question.answerIndex;
    onAnswer(isCorrect);
  }

  function getButtonClass(index: number) {
    const base =
      "w-full text-left px-4 py-3 rounded-lg border transition-all duration-200 text-sm";
    if (!answered) {
      return `${base} border-gray-700 bg-gray-800 hover:bg-gray-700 hover:border-indigo-500 cursor-pointer`;
    }
    if (index === question.answerIndex) {
      return `${base} border-green-500 bg-green-900/40 text-green-300`;
    }
    if (index === selected) {
      return `${base} border-red-500 bg-red-900/40 text-red-300`;
    }
    return `${base} border-gray-700 bg-gray-800 opacity-50`;
  }

  return (
    <div className="space-y-4">
      <div className="text-xs text-indigo-400 font-medium">{question.category}</div>
      <p className="text-gray-100 text-base leading-relaxed">{question.question}</p>

      <div className="space-y-2">
        {question.choices.map((choice, i) => (
          <button key={i} className={getButtonClass(i)} onClick={() => handleSelect(i)}>
            <span className="font-bold mr-2 text-gray-400">
              {["A", "B", "C", "D"][i]}.
            </span>
            {choice}
          </button>
        ))}
      </div>

      {answered && !examMode && (
        <div
          className={`mt-4 p-4 rounded-lg border text-sm ${
            selected === question.answerIndex
              ? "border-green-700 bg-green-900/20 text-green-300"
              : "border-red-700 bg-red-900/20 text-red-300"
          }`}
        >
          <p className="font-bold mb-1">
            {selected === question.answerIndex ? "✓ 正解！" : "✗ 不正解"}
          </p>
          <p className="text-gray-300">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
