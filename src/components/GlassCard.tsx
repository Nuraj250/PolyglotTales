const GlassCard = ({ children }: { children: React.ReactNode }) => (
  <div className="relative bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden p-8">
    {/* Folder Tab Effect */}
    <div className="absolute -top-4 left-8 w-32 h-8 bg-white/10 rounded-b-2xl"></div>
    {children}
  </div>
);

export default GlassCard;
