import GlassCard from "./GlassCard";

const SelectorGroup = ({
  label,
  options,
  onSelect
}: {
  label: string;
  options: string[];
  onSelect: (val: string) => void;
}) => (
  <GlassCard>
    <h2 className="text-lg font-semibold mb-2">{label}</h2>
    <div className="flex gap-3 flex-wrap">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onSelect(opt)}
          className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30"
        >
          {opt}
        </button>
      ))}
    </div>
  </GlassCard>
);

export default SelectorGroup;
