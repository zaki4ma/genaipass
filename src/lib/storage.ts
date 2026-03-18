export interface AnswerLog {
  questionId: string;
  isCorrect: boolean;
  answeredAt: string; // ISO string
}

const ANSWER_LOGS_KEY = "genaipass_answer_logs";
const REVIEW_LIST_KEY = "genaipass_review_list";

export function getAnswerLogs(): AnswerLog[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(ANSWER_LOGS_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function addAnswerLog(questionId: string, isCorrect: boolean) {
  const logs = getAnswerLogs();
  logs.push({ questionId, isCorrect, answeredAt: new Date().toISOString() });
  localStorage.setItem(ANSWER_LOGS_KEY, JSON.stringify(logs));
}

export function getReviewList(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(REVIEW_LIST_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function addToReviewList(questionId: string) {
  const list = getReviewList();
  if (!list.includes(questionId)) {
    list.push(questionId);
    localStorage.setItem(REVIEW_LIST_KEY, JSON.stringify(list));
  }
}

export function removeFromReviewList(questionId: string) {
  const list = getReviewList().filter((id) => id !== questionId);
  localStorage.setItem(REVIEW_LIST_KEY, JSON.stringify(list));
}

export function getDashboardStats() {
  const logs = getAnswerLogs();
  const reviewList = getReviewList();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayLogs = logs.filter((l) => new Date(l.answeredAt) >= today);
  const totalCorrect = logs.filter((l) => l.isCorrect).length;

  return {
    todayCount: todayLogs.length,
    totalCount: logs.length,
    accuracy:
      logs.length > 0 ? Math.round((totalCorrect / logs.length) * 100) : 0,
    reviewCount: reviewList.length,
  };
}
