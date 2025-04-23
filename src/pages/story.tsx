import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { extractVocabulary } from "@/utils/tokenizer";
import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";

export default function StoryPage() {
  const { query } = useRouter();
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const generateStory = async () => {
    if (!input || !query.language || !query.difficulty || !query.theme) return;
    setLoading(true);
    setSubmitted(true);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: query.language,
        difficulty: query.difficulty,
        theme: query.theme,
        input,
      }),
    });

    const data = await res.json();
    setStory(data.story);
    setLoading(false);
  };

  const speakStory = () => {
    const utterance = new SpeechSynthesisUtterance(story);
    speechSynthesis.speak(utterance);
  };

  const vocab = extractVocabulary(story);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] px-6 py-10 flex flex-col items-center">
      <div className="w-full max-w-3xl space-y-8 text-white">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-4xl font-bold glow-text"
        >
          📖 Your Custom Tale
        </motion.h1>

        {!submitted && (
          <GlassCard>
            <h2 className="text-lg font-semibold mb-3">✍️ Write a starting sentence</h2>
            <textarea
              className="w-full p-4 rounded-lg bg-white/10 text-white focus:outline-none resize-none backdrop-blur-sm"
              rows={4}
              placeholder="e.g. A girl wandered into a mysterious forest..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              onClick={generateStory}
              className="mt-4 w-full py-2 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 hover:opacity-90 text-white rounded-xl font-semibold transition-all"
            >
              ✨ Generate Story
            </button>
          </GlassCard>
        )}

        {loading && <p className="text-center">✨ Generating story...</p>}

        {story && (
          <>
            <GlassCard>
              <div className="whitespace-pre-wrap prose prose-invert max-w-none text-white">
                {story}
              </div>
              <button
                onClick={speakStory}
                className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all text-white font-medium"
              >
                🔊 Read Aloud
              </button>
            </GlassCard>

            <GlassCard>
              <h2 className="text-xl font-semibold mb-3">🧠 Vocabulary Boost</h2>
              <ul className="list-disc pl-6 space-y-1">
                {vocab.map((word) => (
                  <li key={word}>{word}</li>
                ))}
              </ul>
            </GlassCard>
          </>
        )}
      </div>
    </main>
  );
}
