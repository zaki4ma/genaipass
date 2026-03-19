import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts, getBlogPost } from "@/lib/blog";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} | 生成AIパスポート合格対策`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      url: `https://genaipass.vercel.app/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-12">
      <article className="max-w-2xl mx-auto space-y-8">
        <div className="space-y-3">
          <Link
            href="/blog"
            className="text-gray-500 hover:text-gray-300 text-sm"
          >
            ← 記事一覧
          </Link>
          <p className="text-xs text-gray-500 pt-2">{post.publishedAt}</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
            {post.title}
          </h1>
          <p className="text-gray-400">{post.description}</p>
        </div>

        <div className="space-y-8">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-lg font-semibold text-indigo-400 mb-2">
                {section.heading}
              </h2>
              <p className="text-gray-300 leading-relaxed">{section.content}</p>
            </section>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 space-y-4">
          <p className="text-gray-400 text-sm">
            実際に問題を解いて理解を深めましょう。
          </p>
          <Link
            href="/dashboard"
            className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-500 transition-colors"
          >
            無料クイズで練習する →
          </Link>
        </div>
      </article>
    </main>
  );
}
