import GlassCard from "./GlassCard";

const LanguageSelector = ({ onSelect }: { onSelect: (lang: string) => void }) => (
  <GlassCard>
    <h2 className="text-lg font-semibold mb-2">Choose Language</h2>
    <div className="flex flex-wrap gap-2">
      {["Spanish", "French", "German", "Japanese"].map((lang) => (
        <button key={lang}
          onClick={() => onSelect(lang)}
          className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg transition backdrop-blur-md">
          {lang}
        </button>
      ))}
    </div>
  </GlassCard>
);

export default LanguageSelector;
