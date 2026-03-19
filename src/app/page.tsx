import Link from "next/link";
import { blogPosts } from "@/lib/blog";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-950">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="space-y-3">
          <div className="inline-block bg-indigo-900/40 border border-indigo-700 text-indigo-300 text-xs px-3 py-1 rounded-full">
            GUGA 生成AIパスポート対策
          </div>
          <h1 className="text-4xl font-bold text-white">
            生成AIパスポート
            <br />
            <span className="text-indigo-400">合格対策クイズ</span>
          </h1>
          <p className="text-gray-400 text-lg">
            6分野・120問で本番試験に挑む実力をつける
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          {[
            { icon: "📚", title: "分野別学習", desc: "6分野から選んで集中学習" },
            { icon: "🔄", title: "復習モード", desc: "苦手問題を繰り返し克服" },
            { icon: "📝", title: "模擬試験", desc: "60問60分で本番シミュレーション" },
          ].map((f) => (
            <div
              key={f.title}
              className="bg-gray-900 border border-gray-800 rounded-xl p-4"
            >
              <div className="text-2xl mb-2">{f.icon}</div>
              <h3 className="font-semibold text-white text-sm">{f.title}</h3>
              <p className="text-gray-500 text-xs mt-1">{f.desc}</p>
            </div>
          ))}
        </div>

        <Link
          href="/dashboard"
          className="inline-block px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-500 transition-colors"
        >
          はじめる →
        </Link>

        <div className="space-y-4 text-left pt-4">
          <h2 className="text-xl font-bold text-white text-center">
            試験対策ブログ
          </h2>
          <ul className="space-y-3">
            {blogPosts.slice(0, 3).map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 hover:border-indigo-700 transition-colors"
                >
                  <span className="text-sm text-white hover:text-indigo-400 transition-colors">
                    {post.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="text-center">
            <Link
              href="/blog"
              className="text-indigo-400 hover:text-indigo-300 text-sm"
            >
              記事をもっと見る →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
