import Link from "next/link";

const CATEGORIES = [
  { id: "ai-basics", label: "AIの基礎知識", icon: "🧠", color: "indigo" },
  { id: "generative-ai", label: "生成AIの仕組み", icon: "⚙️", color: "blue" },
  { id: "prompt-engineering", label: "プロンプトエンジニアリング", icon: "✍️", color: "cyan" },
  { id: "law", label: "著作権・個人情報・法律", icon: "⚖️", color: "yellow" },
  { id: "risk-ethics", label: "AIリスク・倫理・ガイドライン", icon: "🛡️", color: "orange" },
  { id: "business", label: "ビジネス活用事例", icon: "💼", color: "green" },
];

export default function StudyPage() {
  return (
    <main className="min-h-screen bg-gray-950 px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-gray-500 hover:text-gray-300 text-sm">
            ← ダッシュボード
          </Link>
        </div>
        <h1 className="text-xl font-bold text-white">分野を選ぶ</h1>
        <p className="text-sm text-gray-500">各分野20問をランダム順で出題します</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/study/${cat.id}`}
              className="flex items-center gap-4 bg-gray-900 border border-gray-800 hover:border-gray-600 rounded-xl p-5 transition-colors group"
            >
              <div className="text-3xl">{cat.icon}</div>
              <div>
                <p className="font-medium text-white group-hover:text-gray-100 text-sm leading-tight">
                  {cat.label}
                </p>
                <p className="text-xs text-gray-600 mt-0.5">20問</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
