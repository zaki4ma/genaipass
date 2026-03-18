import { signIn } from "@/auth";

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

        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/dashboard" });
          }}
        >
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-3 mx-auto"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Googleでログイン
          </button>
        </form>
      </div>
    </main>
  );
}
