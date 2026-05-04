import { useState } from "react";
import Icon from "@/components/ui/icon";
import { HudCard } from "./GameUI";
import {
  RANKS, INITIAL_HABITS, QUESTS, ACHIEVEMENTS,
  LEADERBOARD, SHOP_ITEMS, STATS_WEEKLY, WEEK_DAYS,
  getRank, getXpProgress,
} from "./gameData";

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

// ─── AchievementsPage ─────────────────────────────────────────────────────────

export function AchievementsPage() {
  const rarityColor: Record<string, string> = {
    "Обычный": "#94a3b8", "Необычный": "#4ade80", "Редкий": "#22d3ee",
    "Эпический": "#a855f7", "Легендарный": "#f472b6",
  };
  const earned = ACHIEVEMENTS.filter(a => a.earned).length;

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="font-orbitron text-lg font-black text-white">ДОСТИЖЕНИЯ</h2>
        <span className="font-rajdhani text-slate-400 text-sm">{earned}/{ACHIEVEMENTS.length}</span>
      </div>

      <HudCard className="p-4" glowColor="yellow">
        <div className="flex items-center gap-4">
          <span className="text-4xl">🏆</span>
          <div className="flex-1">
            <p className="font-orbitron text-xs text-neon-yellow font-bold tracking-wider">ПРОГРЕСС ДОСТИЖЕНИЙ</p>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden mt-2 border border-white/10">
              <div className="h-full rounded-full transition-all duration-700"
                style={{ width: `${(earned / ACHIEVEMENTS.length) * 100}%`, background: 'linear-gradient(90deg, #facc15, #fb923c)', boxShadow: '0 0 8px rgba(250,204,21,0.4)' }} />
            </div>
            <p className="text-xs font-rajdhani text-slate-400 mt-1">Получено {earned} из {ACHIEVEMENTS.length}</p>
          </div>
        </div>
      </HudCard>

      <div className="grid grid-cols-2 gap-3">
        {ACHIEVEMENTS.map(a => (
          <HudCard key={a.id} className={`p-4 transition-all duration-200 hover:scale-[1.02] ${!a.earned ? 'opacity-45 grayscale' : ''}`} glowColor="purple">
            <div className="text-3xl mb-2 text-center">{a.earned ? a.icon : '🔒'}</div>
            <p className="font-rajdhani font-bold text-sm text-white text-center">{a.name}</p>
            <p className="text-xs text-slate-400 font-rajdhani text-center mt-0.5 leading-tight">{a.desc}</p>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
              <span className="text-[10px] font-orbitron" style={{ color: rarityColor[a.rarity] }}>{a.rarity}</span>
              <span className="text-xs font-orbitron text-neon-yellow">+{a.xp} XP</span>
            </div>
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

// ─── QuestsPage ───────────────────────────────────────────────────────────────

export function QuestsPage() {
  const diffColor: Record<string, string> = { "Лёгкий": "#4ade80", "Средний": "#facc15", "Сложный": "#f472b6" };
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="font-orbitron text-lg font-black text-white">КВЕСТЫ</h2>
        <span className="font-orbitron text-neon-cyan text-sm">{QUESTS.length} активных</span>
      </div>

      {QUESTS.map(q => (
        <HudCard key={q.id} className="p-5 hover:scale-[1.01] transition-transform cursor-pointer" glowColor="cyan">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: `${q.color}18`, border: `1.5px solid ${q.color}35`, boxShadow: `0 0 12px ${q.color}25` }}>
              {q.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-rajdhani font-bold text-base text-white">{q.title}</h3>
                <span className="text-[10px] font-orbitron px-2 py-0.5 rounded-full flex-shrink-0"
                  style={{ color: diffColor[q.difficulty], background: `${diffColor[q.difficulty]}15`, border: `1px solid ${diffColor[q.difficulty]}25` }}>
                  {q.difficulty}
                </span>
              </div>
              <p className="text-xs font-rajdhani text-slate-400 mb-2">{q.desc}</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden border border-white/8">
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${(q.progress / q.total) * 100}%`, background: q.color, boxShadow: `0 0 8px ${q.color}` }} />
                </div>
                <span className="font-orbitron text-xs text-slate-400 flex-shrink-0">{q.progress}/{q.total}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
            <span className="text-xs font-rajdhani text-slate-500">Награда</span>
            <span className="font-orbitron text-sm text-neon-yellow font-bold">+{q.xp} XP ⚡</span>
          </div>
        </HudCard>
      ))}

      <HudCard className="p-4 text-center" glowColor="purple">
        <div className="text-2xl mb-1 opacity-40">🔒</div>
        <p className="font-rajdhani text-slate-500 text-sm">Новые квесты откроются на ранге <span className="text-neon-purple">Мастер</span></p>
      </HudCard>
    </div>
  );
}

// ─── ShopPage ─────────────────────────────────────────────────────────────────

export function ShopPage({ coins }: { coins: number }) {
  const [owned, setOwned] = useState([2]);
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="font-orbitron text-lg font-black text-white">МАГАЗИН</h2>
        <div className="flex items-center gap-1.5 bg-neon-yellow/10 border border-neon-yellow/25 rounded-full px-3 py-1.5">
          <span className="text-sm">🪙</span>
          <span className="font-orbitron text-sm font-bold text-neon-yellow">{coins.toLocaleString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {SHOP_ITEMS.map(item => {
          const isOwned = owned.includes(item.id);
          return (
            <HudCard key={item.id} className="p-4 hover:scale-[1.02] transition-all duration-200" glowColor="yellow">
              <div className="text-3xl mb-2 text-center">{item.icon}</div>
              <h3 className="font-rajdhani font-bold text-sm text-white text-center leading-tight">{item.name}</h3>
              <p className="text-[11px] text-slate-400 font-rajdhani text-center mt-1 leading-tight">{item.desc}</p>
              <button
                onClick={() => !isOwned && setOwned(p => [...p, item.id])}
                className="w-full mt-3 py-1.5 rounded-lg text-xs font-orbitron font-bold transition-all duration-200"
                style={isOwned
                  ? { background: 'rgba(255,255,255,0.04)', color: '#64748b', border: '1px solid rgba(255,255,255,0.08)' }
                  : { background: `${item.color}18`, color: item.color, border: `1px solid ${item.color}35`, boxShadow: `0 0 8px ${item.color}18` }
                }>
                {isOwned ? '✓ КУПЛЕНО' : `🪙 ${item.price}`}
              </button>
            </HudCard>
          );
        })}
      </div>
    </div>
  );
}

// ─── LeaderboardPage ──────────────────────────────────────────────────────────

export function LeaderboardPage() {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="font-orbitron text-lg font-black text-white">ЛИДЕРЫ</h2>
        <span className="font-rajdhani text-slate-400 text-sm">Сезон 1</span>
      </div>

      <HudCard className="p-5" glowColor="yellow">
        <div className="flex items-end justify-center gap-6">
          {[LEADERBOARD[1], LEADERBOARD[0], LEADERBOARD[2]].map((p, idx) => {
            const heights = [88, 108, 70];
            const podColors = ["#94a3b8", "#facc15", "#fb923c"];
            const podNums = [2, 1, 3];
            return (
              <div key={p.rank} className="flex flex-col items-center gap-1">
                <span className="text-xl">{p.badge}</span>
                <div className="text-xl">{p.avatar}</div>
                <div className="font-rajdhani text-[11px] text-slate-300 max-w-[56px] truncate text-center">{p.name.split('_')[0]}</div>
                <div className="w-14 rounded-t-lg flex items-center justify-center font-orbitron font-black text-black text-sm"
                  style={{ height: heights[idx], background: podColors[idx], boxShadow: `0 0 16px ${podColors[idx]}55` }}>
                  #{podNums[idx]}
                </div>
              </div>
            );
          })}
        </div>
      </HudCard>

      <div className="space-y-2">
        {LEADERBOARD.map(p => (
          <HudCard key={p.rank} className={`p-3 transition-all duration-200 ${p.isMe ? 'border-neon-cyan/40' : ''}`} glowColor={p.isMe ? 'cyan' : 'purple'}>
            <div className="flex items-center gap-3">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-orbitron text-xs font-bold flex-shrink-0
                ${p.rank === 1 ? 'bg-neon-yellow/20 text-neon-yellow' : p.rank === 2 ? 'bg-slate-400/20 text-slate-300' : p.rank === 3 ? 'bg-orange-400/20 text-orange-400' : 'bg-white/5 text-slate-400'}`}>
                {p.rank}
              </div>
              <span className="text-lg">{p.avatar}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className={`font-rajdhani font-semibold text-sm truncate ${p.isMe ? 'text-neon-cyan' : 'text-white'}`}>{p.name}</span>
                  {p.isMe && <span className="text-[9px] font-orbitron text-neon-cyan border border-neon-cyan/30 px-1 rounded-sm">ТЫ</span>}
                </div>
                <span className="font-orbitron text-[10px] text-slate-500">Ур. {p.level}</span>
              </div>
              <div className="text-right">
                <div className="font-orbitron text-sm font-bold text-neon-yellow">{p.xp.toLocaleString()}</div>
                <div className="font-rajdhani text-[10px] text-slate-500">XP</div>
              </div>
            </div>
          </HudCard>
        ))}
      </div>
    </div>
  );
}
