import Icon from "@/components/ui/icon";
import { HudCard } from "../GameUI";
import { RANKS, INITIAL_HABITS, STATS_WEEKLY, WEEK_DAYS, getRank, getXpProgress } from "../gameData";

// ─── ProfilePage ──────────────────────────────────────────────────────────────

export function ProfilePage({ xp, level }: { xp: number; level: number }) {
  const rank = getRank(xp);
  const progress = getXpProgress(xp);

  return (
    <div className="space-y-4 animate-fade-in">
      <HudCard className="p-6 text-center relative overflow-hidden" glowColor="purple">
        <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />
        <div className="relative z-10">
          <div className="relative inline-block mb-3">
            <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto"
              style={{ background: 'linear-gradient(135deg, #a855f7, #f472b6, #22d3ee)', boxShadow: '0 0 30px rgba(168,85,247,0.5)' }}>
              🧑‍💻
            </div>
            <div className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full text-[10px] font-orbitron font-black text-black"
              style={{ background: rank.color }}>УР.{level}</div>
          </div>
          <h2 className="font-orbitron text-xl font-black text-white">ГЕРОЙ</h2>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span>{rank.icon}</span>
            <span className="font-rajdhani font-bold text-base" style={{ color: rank.color }}>{rank.name}</span>
          </div>
          <div className="mt-4 space-y-1">
            <div className="flex justify-between text-xs font-rajdhani text-slate-400">
              <span className="uppercase tracking-wider">Прогресс</span>
              <span style={{ color: rank.color }}>{Math.round(progress)}%</span>
            </div>
            <div className="h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
              <div className="xp-bar-fill h-full rounded-full" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-xs text-slate-500 font-rajdhani">{xp.toLocaleString()} / {rank.max.toLocaleString()} XP</p>
          </div>
        </div>
      </HudCard>

      <HudCard className="p-4" glowColor="cyan">
        <h3 className="font-orbitron text-xs font-bold text-neon-cyan tracking-wider mb-3">📊 СИСТЕМА РАНГОВ</h3>
        <div className="space-y-2">
          {RANKS.map((r) => {
            const isActive = r.name === rank.name;
            const isUnlocked = xp >= r.min;
            return (
              <div key={r.name} className={`flex items-center gap-3 p-2 rounded-lg transition-all ${isActive ? 'bg-white/8 border border-white/15' : ''}`}>
                <span className={`text-lg ${isUnlocked ? '' : 'grayscale opacity-30'}`}>{r.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-rajdhani font-semibold text-sm" style={{ color: isUnlocked ? r.color : '#475569' }}>{r.name}</span>
                    <span className="font-orbitron text-xs text-slate-500">{r.min.toLocaleString()} XP</span>
                  </div>
                </div>
                {isActive && <span className="text-[10px] font-orbitron text-neon-yellow animate-pulse">▶</span>}
                {!isActive && isUnlocked && <Icon name="Check" size={13} className="text-neon-green flex-shrink-0" />}
                {!isUnlocked && <Icon name="Lock" size={13} className="text-slate-600 flex-shrink-0" />}
              </div>
            );
          })}
        </div>
      </HudCard>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Всего XP", value: xp.toLocaleString(), icon: "⚡", color: "#facc15" },
          { label: "Уровень", value: level.toString(), icon: "🏆", color: "#a855f7" },
          { label: "Лучшая серия", value: "21 день", icon: "🔥", color: "#fb923c" },
          { label: "Привычек", value: INITIAL_HABITS.length.toString(), icon: "💪", color: "#4ade80" },
        ].map((s, i) => (
          <HudCard key={i} className="p-4 text-center" glowColor="purple">
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="font-orbitron font-bold text-base text-white">{s.value}</div>
            <div className="font-rajdhani text-xs text-slate-400 uppercase tracking-wider mt-0.5">{s.label}</div>
          </HudCard>
        ))}
      </div>
    </div>
  );
}

// ─── StatsPage ────────────────────────────────────────────────────────────────

export function StatsPage() {
  const maxVal = Math.max(...STATS_WEEKLY);
  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="font-orbitron text-lg font-black text-white">СТАТИСТИКА</h2>

      <HudCard className="p-5" glowColor="cyan">
        <h3 className="font-orbitron text-xs text-neon-cyan font-bold tracking-wider mb-4">📈 АКТИВНОСТЬ НА НЕДЕЛЕ</h3>
        <div className="flex items-end gap-2" style={{ height: 120 }}>
          {STATS_WEEKLY.map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full rounded-t-md relative overflow-hidden"
                style={{ height: `${(val / maxVal) * 96}px`, background: 'linear-gradient(180deg, #a855f7 0%, #22d3ee 100%)', boxShadow: '0 0 8px rgba(168,85,247,0.35)', minHeight: 4 }}>
                <div className="absolute inset-0 rank-shimmer" />
              </div>
              <span className="font-rajdhani text-[10px] text-slate-500">{WEEK_DAYS[i]}</span>
            </div>
          ))}
        </div>
      </HudCard>

      <div className="grid grid-cols-2 gap-3">
        {[
          { title: "Среднее в день", value: "4.2", sub: "привычки", icon: "📊", color: "#a855f7" },
          { title: "Лучший день", value: "6/6", sub: "пятница", icon: "🌟", color: "#facc15" },
          { title: "XP за неделю", value: "+840", sub: "опыта", icon: "⚡", color: "#22d3ee" },
          { title: "Текущая серия", value: "12", sub: "дней", icon: "🔥", color: "#fb923c" },
        ].map((s, i) => (
          <HudCard key={i} className="p-4" glowColor="purple">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-rajdhani text-[10px] text-slate-400 uppercase tracking-wider">{s.title}</p>
                <p className="font-orbitron font-bold text-xl text-white mt-1">{s.value}</p>
                <p className="font-rajdhani text-xs text-slate-400">{s.sub}</p>
              </div>
              <span className="text-2xl">{s.icon}</span>
            </div>
          </HudCard>
        ))}
      </div>

      <HudCard className="p-4" glowColor="green">
        <h3 className="font-orbitron text-xs text-neon-green font-bold tracking-wider mb-3">💪 СЕРИИ ПРИВЫЧЕК</h3>
        <div className="space-y-3">
          {INITIAL_HABITS.map(h => (
            <div key={h.id} className="flex items-center gap-3">
              <span className="text-base w-7 text-center">{h.emoji}</span>
              <div className="flex-1">
                <div className="flex justify-between text-xs font-rajdhani mb-1">
                  <span className="text-slate-300">{h.name}</span>
                  <span style={{ color: h.color }}>{h.streak} дн.</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${Math.min(h.streak / 30 * 100, 100)}%`, background: h.color, boxShadow: `0 0 6px ${h.color}` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </HudCard>
    </div>
  );
}
