import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import GlassCard from "@/components/GlassCard";
import { extractVocabulary } from "@/utils/tokenizer";

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
    utterance.lang = "en"; // Optionally detect or switch by language
    speechSynthesis.speak(utterance);
  };

  const vocab = extractVocabulary(story);

  return (
    <main className="min-h-screen px-6 py-12 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white flex flex-col items-center">
      <div className="w-full max-w-3xl space-y-8">
        <h1 className="text-4xl font-bold text-center">📖 Your Custom Tale</h1>

        {!submitted && (
          <GlassCard>
            <h2 className="mb-3 font-semibold text-lg">✍️ Start your story with a sentence</h2>
            <textarea
              className="w-full p-3 rounded-lg bg-white/10 backdrop-blur-md text-white resize-none focus:outline-none focus:ring"
              rows={4}
              placeholder="e.g. Once upon a time in a quiet French village..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              onClick={generateStory}
              className="mt-4 px-5 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition"
            >
              🚀 Generate Story
            </button>
          </GlassCard>
        )}

        {loading && <p className="text-center">✨ Generating your story...</p>}

        {story && (
          <>
            <GlassCard>
              <div className="prose prose-invert max-w-none whitespace-pre-wrap">
                {story}
              </div>
              <button
                onClick={speakStory}
                className="mt-4 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition"
              >
                🔊 Read Aloud
              </button>
            </GlassCard>

            <GlassCard>
              <h2 className="text-xl font-semibold mb-2">🧠 Vocabulary Challenge</h2>
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
