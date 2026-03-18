"use client";

import { useEffect, useState } from "react";

interface ExamTimerProps {
  durationSeconds: number;
  onTimeUp: () => void;
}

export function ExamTimer({ durationSeconds, onTimeUp }: ExamTimerProps) {
  const [remaining, setRemaining] = useState(durationSeconds);

  useEffect(() => {
    if (remaining <= 0) {
      onTimeUp();
      return;
    }
    const timer = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeUp]); // eslint-disable-line react-hooks/exhaustive-deps

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const isWarning = remaining < 300; // 5分以下で警告

  return (
    <div
      className={`font-mono text-2xl font-bold ${
        isWarning ? "text-red-400 animate-pulse" : "text-gray-200"
      }`}
    >
      {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    </div>
  );
}
