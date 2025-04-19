import { useState } from "react";
import LanguageSelector from "@/components/LanguageSelector";
import SelectorGroup from "@/components/SelectorGroup";
import { useRouter } from "next/router";

export default function Home() {
  const [language, setLanguage] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [theme, setTheme] = useState<string | null>(null);
  const router = useRouter();

  const handleStart = () => {
    if (language && difficulty && theme) {
      router.push({
        pathname: "/story",
        query: { language, difficulty, theme },
      });
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]">
      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-lg w-full max-w-lg">
        <div className="flex flex-col items-center mb-6">
          <span className="text-5xl">🌍</span>
          <h1 className="text-3xl font-bold text-white mt-2">PolyglotTales</h1>
        </div>

        {!language && (
          <SelectorGroup
            label="🌐 Choose Language"
            options={["Spanish", "French", "German", "Japanese"]}
            onSelect={setLanguage}
          />
        )}

        {language && !difficulty && (
          <SelectorGroup
            label="🧠 Choose Difficulty"
            options={["Beginner", "Intermediate", "Advanced"]}
            onSelect={setDifficulty}
          />
        )}

        {difficulty && !theme && (
          <SelectorGroup
            label="🎨 Choose Theme"
            options={["Adventure", "Love", "Sci-Fi", "Mythology"]}
            onSelect={setTheme}
          />
        )}

        {theme && (
          <button
            onClick={handleStart}
            className="w-full mt-6 py-3 px-6 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl transition-all backdrop-blur-md"
          >
            🚀 Generate Story
          </button>
        )}
      </div>
    </main>
  );
}
