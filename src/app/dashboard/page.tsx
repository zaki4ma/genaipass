export const dynamic = "force-dynamic";

import { auth, signOut } from "@/auth";
import { getDashboardStats } from "@/actions/answers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/");

  const stats = await getDashboardStats(session.user.id);

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">ダッシュボード</h1>
            <p className="text-sm text-gray-500">{session.user.name}</p>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
              ログアウト
            </button>
          </form>
        </div>

        {/* Today's stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-indigo-400">{stats.todayCount}</div>
            <div className="text-xs text-gray-500 mt-1">今日の回答数</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{stats.accuracy}%</div>
            <div className="text-xs text-gray-500 mt-1">総正答率</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-orange-400">{stats.reviewCount}</div>
            <div className="text-xs text-gray-500 mt-1">復習リスト</div>
          </div>
        </div>

        <div className="text-sm text-gray-500 text-center">
          累計回答数: <span className="text-gray-300">{stats.totalCount}問</span>
        </div>

        {/* Mode cards */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
            学習モードを選ぶ
          </h2>

          <Link
            href="/study"
            className="block bg-gray-900 border border-gray-800 hover:border-indigo-600 rounded-xl p-5 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl">📚</div>
              <div className="flex-1">
                <h3 className="font-semibold text-white group-hover:text-indigo-400 transition-colors">
                  分野別学習
                </h3>
                <p className="text-sm text-gray-500 mt-0.5">
                  6つの分野から選んで学習
                </p>
              </div>
              <div className="text-gray-600">→</div>
            </div>
          </Link>

          <Link
            href="/review"
            className={`block bg-gray-900 border rounded-xl p-5 transition-colors group ${
              stats.reviewCount === 0
                ? "border-gray-800 opacity-60 pointer-events-none"
                : "border-gray-800 hover:border-orange-600"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl">🔄</div>
              <div className="flex-1">
                <h3 className="font-semibold text-white group-hover:text-orange-400 transition-colors">
                  復習モード
                </h3>
                <p className="text-sm text-gray-500 mt-0.5">
                  {stats.reviewCount > 0
                    ? `${stats.reviewCount}問の苦手問題を集中攻略`
                    : "復習リストに問題がありません"}
                </p>
              </div>
              <div className="text-gray-600">→</div>
            </div>
          </Link>

          <Link
            href="/exam"
            className="block bg-gray-900 border border-gray-800 hover:border-purple-600 rounded-xl p-5 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl">📝</div>
              <div className="flex-1">
                <h3 className="font-semibold text-white group-hover:text-purple-400 transition-colors">
                  模擬試験
                </h3>
                <p className="text-sm text-gray-500 mt-0.5">
                  60問・60分 / 合格ライン80%
                </p>
              </div>
              <div className="text-gray-600">→</div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
