import { useState } from "react";
import LanguageSelector from "@/components/LanguageSelector";
import GlassCard from "@/components/GlassCard";
import SelectorGroup from "@/components/SelectorGroup";
import { useRouter } from "next/router";

export default function Home() {
  const [language, setLanguage] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [theme, setTheme] = useState<string | null>(null);
  const router = useRouter();

  const handleStart = async () => {
    if (language && difficulty && theme) {
      router.push({
        pathname: "/story",
        query: { language, difficulty, theme },
      });
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-4xl font-bold">PolyglotTales</h1>
      {!language && <LanguageSelector onSelect={setLanguage} />}
      {language && !difficulty && (
        <SelectorGroup
          label="Choose Difficulty"
          options={["Beginner", "Intermediate", "Advanced"]}
          onSelect={setDifficulty}
        />
      )}
      {difficulty && !theme && (
        <SelectorGroup
          label="Choose a Theme"
          options={["Adventure", "Love", "Sci-Fi", "Mythology"]}
          onSelect={setTheme}
        />
      )}
      {theme && (
        <button
          onClick={handleStart}
          className="mt-4 px-6 py-3 bg-white/20 rounded-xl hover:bg-white/30"
        >
          Generate Story
        </button>
      )}
    </main>
  );
}
