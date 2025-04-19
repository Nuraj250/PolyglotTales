const GlassCard = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-glass backdrop-blur-glass rounded-2xl shadow-xl p-6 border border-white/10">
      {children}
    </div>
  )
  
  export default GlassCard;
  