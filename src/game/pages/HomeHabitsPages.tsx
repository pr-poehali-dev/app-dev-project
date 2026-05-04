import Icon from "@/components/ui/icon";
import { HudCard } from "../GameUI";
import { INITIAL_HABITS, QUESTS, getRank, getXpProgress, RANKS } from "../gameData";

// ─── HomePage ─────────────────────────────────────────────────────────────────

export function HomePage({ xp, level, habits }: { xp: number; level: number; habits: typeof INITIAL_HABITS }) {
  const rank = getRank(xp);
  const progress = getXpProgress(xp);
  const todayDone = habits.filter(h => h.done).length;
  const nextRank = RANKS[RANKS.indexOf(rank) + 1];

  return (
    <div className="space-y-4 animate-fade-in">
      <HudCard className="p-5 relative overflow-hidden" glowColor="purple">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-neon-purple/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-4 bottom-0 w-28 h-28 rounded-full bg-neon-cyan/8 blur-2xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="font-rajdhani text-xs text-slate-400 tracking-[0.2em] uppercase mb-0.5">Добро пожаловать</p>
              <h1 className="font-orbitron text-2xl font-black text-white" style={{ textShadow: '0 0 20px rgba(168,85,247,0.6)' }}>ГЕРОЙ</h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span>{rank.icon}</span>
                <span className="font-rajdhani text-sm font-bold" style={{ color: rank.color }}>{rank.name}</span>
                <span className="font-orbitron text-xs text-slate-500">· УР.{level}</span>
              </div>
            </div>
            <div className="relative">
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                style={{ background: 'linear-gradient(135deg, #a855f7, #22d3ee)', boxShadow: '0 0 20px rgba(168,85,247,0.4)' }}>
                🧑‍💻
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-neon-green flex items-center justify-center text-[9px] font-orbitron font-black text-black">
                {level}
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-rajdhani text-slate-400">
              <span className="tracking-wider uppercase">Опыт</span>
              <span className="font-semibold" style={{ color: rank.color }}>{xp.toLocaleString()} / {rank.max.toLocaleString()} XP</span>
            </div>
            <div className="h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/10 relative">
              <div className="xp-bar-fill h-full rounded-full" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-xs text-slate-500 font-rajdhani">
              {nextRank ? `${Math.round(nextRank.min - xp).toLocaleString()} XP до ранга ` : 'Максимальный ранг'}
              {nextRank && <span style={{ color: nextRank.color }}>{nextRank.name}</span>}
            </p>
          </div>
        </div>
      </HudCard>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Серия", value: "12", unit: "дней", icon: "🔥", color: "#fb923c" },
          { label: "Сегодня", value: `${todayDone}/${habits.length}`, unit: "привычек", icon: "✅", color: "#4ade80" },
          { label: "Очки", value: xp >= 1000 ? `${(xp / 1000).toFixed(1)}K` : xp.toString(), unit: "XP", icon: "⚡", color: "#facc15" },
        ].map((s, i) => (
          <HudCard key={i} className="p-3 text-center" glowColor={i === 0 ? 'orange' : i === 1 ? 'green' : 'yellow'}>
            <div className="text-lg mb-0.5">{s.icon}</div>
            <div className="font-orbitron font-bold text-sm text-white">{s.value}</div>
            <div className="font-rajdhani text-[10px] text-slate-400 uppercase tracking-wider">{s.unit}</div>
          </HudCard>
        ))}
      </div>

      <HudCard className="p-4" glowColor="cyan">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-orbitron text-xs font-bold text-neon-cyan tracking-wider">⚔️ АКТИВНЫЕ КВЕСТЫ</h3>
          <span className="text-xs font-rajdhani text-slate-400">{QUESTS.length} квестов</span>
        </div>
        <div className="space-y-3">
          {QUESTS.slice(0, 2).map(q => (
            <div key={q.id} className="flex items-center gap-3">
              <span className="text-lg">{q.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-rajdhani text-sm text-white truncate">{q.title}</span>
                  <span className="font-orbitron text-xs text-slate-400 ml-2 flex-shrink-0">{q.progress}/{q.total}</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${(q.progress / q.total) * 100}%`, background: q.color, boxShadow: `0 0 6px ${q.color}` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </HudCard>

      <HudCard className="p-4" glowColor="pink">
        <h3 className="font-orbitron text-xs font-bold text-neon-pink tracking-wider mb-3">💪 ЗАДАЧИ НА СЕГОДНЯ</h3>
        <div className="grid grid-cols-3 gap-2">
          {habits.map(h => (
            <div key={h.id} className={`p-2 rounded-lg border text-center transition-all duration-200 ${h.done ? 'border-neon-green/40 bg-neon-green/10' : 'border-white/10 bg-white/5'}`}>
              <div className="text-xl mb-0.5">{h.emoji}</div>
              <div className="font-rajdhani text-xs text-slate-300 truncate leading-tight">{h.name}</div>
              {h.done && <div className="text-neon-green text-[9px] font-orbitron mt-0.5">✓ ГОТОВО</div>}
            </div>
          ))}
        </div>
      </HudCard>
    </div>
  );
}

// ─── HabitsPage ───────────────────────────────────────────────────────────────

export function HabitsPage({ habits, onToggle }: { habits: typeof INITIAL_HABITS; onToggle: (id: number, e: React.MouseEvent) => void }) {
  const done = habits.filter(h => h.done).length;
  const pct = Math.round((done / habits.length) * 100);

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="font-orbitron text-lg font-black text-white">ПРИВЫЧКИ</h2>
        <span className="font-orbitron text-sm text-neon-green">{done}/{habits.length}</span>
      </div>

      <HudCard className="p-4 flex items-center gap-4" glowColor="cyan">
        <div className="relative flex-shrink-0" style={{ width: 72, height: 72 }}>
          <svg width="72" height="72" viewBox="0 0 72 72" className="-rotate-90">
            <circle cx="36" cy="36" r="28" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
            <circle cx="36" cy="36" r="28" fill="none" strokeWidth="5" strokeLinecap="round"
              stroke="url(#pg)" strokeDasharray={`${2 * Math.PI * 28}`}
              strokeDashoffset={`${2 * Math.PI * 28 * (1 - done / habits.length)}`}
              className="progress-ring" />
            <defs>
              <linearGradient id="pg" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a855f7" /><stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-orbitron text-sm font-bold text-white">{pct}%</span>
          </div>
        </div>
        <div>
          <p className="font-orbitron text-xs text-neon-cyan font-bold tracking-wider">ПРОГРЕСС ДНЯ</p>
          <p className="font-rajdhani text-slate-300 text-sm mt-1">Выполнено {done} из {habits.length}</p>
          <p className="font-rajdhani text-xs text-slate-500 mt-0.5">Серия: <span className="text-neon-orange font-semibold">🔥 12 дней</span></p>
        </div>
      </HudCard>

      <div className="space-y-3">
        {habits.map(h => (
          <HudCard key={h.id} className={`p-4 cursor-pointer hover:scale-[1.01] transition-all duration-200 ${h.done ? 'opacity-75' : ''}`}
            glowColor={h.done ? 'green' : 'purple'}>
            <div className="flex items-center gap-3">
              <div className="relative flex-shrink-0">
                <button onClick={(e) => onToggle(h.id, e)}
                  className={`w-11 h-11 rounded-xl border-2 flex items-center justify-center text-xl transition-all duration-300 habit-check
                    ${h.done ? 'bg-neon-green/20 border-neon-green text-neon-green' : 'bg-white/5 border-white/20 hover:border-white/40'}`}>
                  {h.done ? '✓' : h.emoji}
                </button>
                {h.done && <div className="absolute inset-0 rounded-xl border-2 border-neon-green/40 animate-ping-slow pointer-events-none" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className={`font-rajdhani font-semibold text-sm ${h.done ? 'text-neon-green line-through' : 'text-white'}`}>{h.name}</span>
                  {h.streak >= 7 && <span className="text-xs">🔥</span>}
                </div>
                <p className="text-xs font-rajdhani text-slate-500">{h.desc}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-orbitron text-neon-yellow">+{h.xp} XP</span>
                  <span className="text-slate-600 text-xs">·</span>
                  <span className="text-xs font-rajdhani text-slate-500">{h.streak} дней подряд</span>
                </div>
              </div>
              <div className="w-2 h-8 rounded-full flex-shrink-0" style={{ background: h.color, boxShadow: `0 0 8px ${h.color}` }} />
            </div>
          </HudCard>
        ))}
      </div>

      <button className="w-full p-3 rounded-xl border border-dashed border-white/15 text-slate-500 font-rajdhani text-sm hover:border-neon-purple/40 hover:text-neon-purple transition-all duration-200 flex items-center justify-center gap-2">
        <Icon name="Plus" size={15} />
        Добавить привычку
      </button>
    </div>
  );
}
