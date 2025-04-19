import { useState } from "react";
import { useRouter } from "next/router";
import SelectorGroup from "@/components/SelectorGroup";
import { motion } from "framer-motion";

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
    <main className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl"
      >
        <div className="text-center mb-8">
          <div className="text-5xl">🌍</div>
          <h1 className="text-3xl font-bold text-white mt-2">PolyglotTales</h1>
          <p className="text-white/70 mt-1">
            Learn languages through immersive, AI-powered storytelling.
          </p>
        </div>

        {!language && (
          <SelectorGroup
            label="🌐 Choose Language"
            options={["Spanish", "French", "German", "Japanese"]}
            onSelect={setLanguage}
            selected={language ?? undefined}
          />
        )}

        {language && !difficulty && (
          <SelectorGroup
            label="📈 Select Difficulty"
            options={["Beginner", "Intermediate", "Advanced"]}
            onSelect={setDifficulty}
            selected={difficulty ?? undefined}
          />
        )}

        {language && difficulty && !theme && (
          <SelectorGroup
            label="🎭 Choose Theme"
            options={["Adventure", "Romance", "Sci-Fi", "Mystery"]}
            onSelect={setTheme}
            selected={theme ?? undefined}
          />
        )}

        {theme && (
          <motion.button
            onClick={handleStart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full mt-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 text-white font-semibold rounded-xl transition-all shadow-lg"
          >
            ✨ Generate Story
          </motion.button>
        )}
      </motion.div>
    </main>
  );
}
