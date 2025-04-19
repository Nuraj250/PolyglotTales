const SelectorGroup = ({
  label,
  options,
  onSelect
}: {
  label: string;
  options: string[];
  onSelect: (val: string) => void;
}) => (
  <div className="mb-6">
    <h2 className="text-white font-semibold text-lg mb-3">{label}</h2>
    <div className="flex flex-wrap gap-3">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onSelect(opt)}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-md transition-all"
        >
          {opt}
        </button>
      ))}
    </div>
  </div>
);

export default SelectorGroup;
