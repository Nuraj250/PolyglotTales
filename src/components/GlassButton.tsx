import { motion } from "framer-motion";

const GlassButton = ({
  label,
  onClick,
  active = false,
}: {
  label: string;
  onClick: () => void;
  active?: boolean;
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`px-5 py-2 rounded-xl text-sm font-medium backdrop-blur-md border
        transition-all duration-300
        ${
          active
            ? "bg-white/30 border-white/30 shadow-lg"
            : "bg-white/10 border-white/10 hover:bg-white/20 hover:border-white/20"
        }
        text-white`}
    >
      {label}
    </motion.button>
  );
};

export default GlassButton;
