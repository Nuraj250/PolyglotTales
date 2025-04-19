import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import GlassCard from "@/components/GlassCard";
import { extractVocabulary } from "@/utils/tokenizer";

export default function StoryPage() {
  const { query } = useRouter();
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query.language || !query.difficulty || !query.theme) return;

    const generate = async () => {
      setLoading(true);
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: query.language,
          difficulty: query.difficulty,
          theme: query.theme,
        }),
      });

      const data = await res.json();
      setStory(data.story);
      setLoading(false);
    };

    generate();
  }, [query]);

  const vocab = story ? extractVocabulary(story, 5) : [];

  const speakStory = () => {
    const utterance = new SpeechSynthesisUtterance(story);
    speechSynthesis.speak(utterance);
  };

  return (
    <main className="min-h-screen p-6 flex flex-col items-center gap-6 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
      <h1 className="text-3xl font-bold">📚 Your Story</h1>

      {loading ? (
        <p className="text-lg">Generating story...</p>
      ) : (
        <>
          <GlassCard>
            <p className="whitespace-pre-wrap leading-relaxed">{story}</p>
          </GlassCard>

          <button
            onClick={speakStory}
            className="px-5 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition"
          >
            🔈 Read Aloud
          </button>

          <GlassCard>
            <h2 className="font-semibold text-xl mb-2">🧠 Vocabulary Challenge</h2>
            <ul className="list-disc pl-6 space-y-1">
              {vocab.map((word) => (
                <li key={word}>{word}</li>
              ))}
            </ul>
          </GlassCard>
        </>
      )}
    </main>
  );
}
