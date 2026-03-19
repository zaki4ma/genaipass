import Link from "next/link";
import { blogPosts } from "@/lib/blog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ブログ | 生成AIパスポート合格対策",
  description:
    "生成AIパスポート試験の攻略情報、勉強法、出題傾向など役立つ記事を掲載しています。",
};

export default function BlogListPage() {
  return (
    <main className="min-h-screen bg-gray-950 px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-10">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">ブログ</h1>
          <p className="text-gray-400">
            生成AIパスポート試験の攻略情報・勉強法まとめ
          </p>
        </div>

        <ul className="space-y-6">
          {blogPosts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="block group">
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-indigo-700 transition-colors">
                  <p className="text-xs text-gray-500 mb-2">{post.publishedAt}</p>
                  <h2 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                    {post.description}
                  </p>
                  <span className="inline-block mt-4 text-indigo-400 text-sm">
                    続きを読む →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="pt-4">
          <Link href="/" className="text-gray-500 hover:text-gray-300 text-sm">
            ← トップに戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
