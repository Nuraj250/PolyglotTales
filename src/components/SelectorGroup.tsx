import GlassButton from "./GlassButton";

const SelectorGroup = ({
  label,
  options,
  onSelect,
  selected
}: {
  label: string;
  options: string[];
  onSelect: (val: string) => void;
  selected?: string;
}) => (
  <div className="mb-6 flex flex-col items-center text-center">
    <h2 className="text-white font-semibold text-lg mb-4 glow-text">{label}</h2>
    <div className="flex flex-wrap justify-center gap-3">
      {options.map((opt) => (
        <GlassButton
          key={opt}
          label={opt}
          onClick={() => onSelect(opt)}
          active={selected === opt}
        />
      ))}
    </div>
  </div>
);

export default SelectorGroup;