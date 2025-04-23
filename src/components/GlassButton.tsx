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
      className={`px-5 py-2 rounded-xl text-sm font-medium border transition-all duration-300
        ${active 
          ? "bg-white/20 border-white/30 shadow-lg text-white" 
          : "bg-white/10 border-white/20 text-white hover:bg-white/15 hover:border-white/30"}
        backdrop-blur-md shadow-md hover:shadow-xl`}
    >
      {label}
    </motion.button>
  );
};

export default GlassButton;