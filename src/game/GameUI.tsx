import { useEffect } from "react";

// ─── XpFloater ────────────────────────────────────────────────────────────────

export function XpFloater({ amount, x, y, onDone }: { amount: number; x: number; y: number; onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 1200); return () => clearTimeout(t); }, [onDone]);
  return (
    <div className="xp-popup fixed pointer-events-none z-50 font-orbitron font-bold text-neon-yellow text-lg select-none"
      style={{ left: x, top: y }}>
      +{amount} XP
    </div>
  );
}

// ─── NavItem ──────────────────────────────────────────────────────────────────

export function NavItem({ icon, label, active, onClick }: { icon: string; label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-all duration-200 ${active ? 'text-neon-purple' : 'text-slate-400 hover:text-slate-200'}`}>
      <span className={`text-lg leading-none ${active ? 'animate-float' : ''}`}>{icon}</span>
      <span className={`text-[9px] font-rajdhani font-semibold tracking-wide uppercase leading-none ${active ? 'text-neon-purple' : ''}`}>{label}</span>
      {active && <div className="w-1 h-1 rounded-full bg-neon-purple mt-0.5" style={{ boxShadow: '0 0 6px #a855f7' }} />}
    </button>
  );
}

// ─── HudCard ──────────────────────────────────────────────────────────────────

export function HudCard({ children, className = "", glowColor = "purple" }: { children: React.ReactNode; className?: string; glowColor?: string }) {
  const glowMap: Record<string, string> = {
    purple: '168,85,247', cyan: '34,211,238', yellow: '250,204,21',
    green: '74,222,128', pink: '244,114,182', orange: '251,146,60'
  };
  const rgb = glowMap[glowColor] ?? glowMap.purple;
  return (
    <div className={`relative rounded-xl border border-white/10 bg-[#0f1120] overflow-hidden ${className}`}
      style={{ boxShadow: `0 0 24px rgba(${rgb}, 0.08), inset 0 1px 0 rgba(255,255,255,0.05)` }}>
      {children}
    </div>
  );
}
