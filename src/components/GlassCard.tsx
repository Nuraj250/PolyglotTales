const GlassCard = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 text-white">
    {children}
  </div>
);

export default GlassCard;
