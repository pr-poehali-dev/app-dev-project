import { useState, useRef } from "react";
import { XpFloater, NavItem } from "@/game/GameUI";
import { HomePage, HabitsPage, ProfilePage, AchievementsPage, StatsPage, QuestsPage, ShopPage, LeaderboardPage, SubscriptionPage } from "@/game/GamePages";
import { INITIAL_HABITS, PAGES } from "@/game/gameData";

export default function Index() {
  const [page, setPage] = useState("home");
  const [xp, setXp] = useState(4250);
  const [habits, setHabits] = useState(INITIAL_HABITS);
  const [floaters, setFloaters] = useState<{ id: number; amount: number; x: number; y: number }[]>([]);
  const nextId = useRef(0);

  const level = Math.floor(xp / 300) + 1;
  const coins = Math.floor(xp * 0.12);

  function handleToggleHabit(id: number, e: React.MouseEvent) {
    const habit = habits.find(h => h.id === id);
    if (!habit || habit.done) return;
    setHabits(prev => prev.map(h => h.id === id ? { ...h, done: true } : h));
    setXp(prev => prev + habit.xp);
    const fid = ++nextId.current;
    setFloaters(prev => [...prev, { id: fid, amount: habit.xp, x: e.clientX - 20, y: e.clientY - 40 }]);
  }

  return (
    <div className="min-h-screen bg-[#0b0d16] text-white relative">
      <div className="fixed inset-0 grid-bg opacity-35 pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-neon-purple/5 blur-3xl pointer-events-none" />

      {floaters.map(f => (
        <XpFloater key={f.id} amount={f.amount} x={f.x} y={f.y} onDone={() => setFloaters(p => p.filter(x => x.id !== f.id))} />
      ))}

      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#0b0d16]/92 backdrop-blur-xl border-b border-white/8">
        <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-orbitron font-black text-white"
              style={{ background: 'linear-gradient(135deg, #a855f7, #22d3ee)', boxShadow: '0 0 12px rgba(168,85,247,0.5)' }}>
              LU
            </div>
            <span className="font-orbitron text-base font-black tracking-wider text-white" style={{ textShadow: '0 0 12px rgba(168,85,247,0.5)' }}>LEVELUP</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-neon-yellow/10 border border-neon-yellow/20 rounded-full px-2.5 py-1">
              <span className="text-[11px]">🪙</span>
              <span className="font-orbitron text-[11px] text-neon-yellow font-bold">{coins}</span>
            </div>
            <div className="flex items-center gap-1 bg-neon-purple/10 border border-neon-purple/20 rounded-full px-2.5 py-1">
              <span className="text-[11px]">⚡</span>
              <span className="font-orbitron text-[11px] text-neon-purple font-bold">{xp.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-lg mx-auto px-4 pt-4 pb-28">
        {page === "home" && <HomePage xp={xp} level={level} habits={habits} />}
        {page === "habits" && <HabitsPage habits={habits} onToggle={handleToggleHabit} />}
        {page === "profile" && <ProfilePage xp={xp} level={level} />}
        {page === "achievements" && <AchievementsPage />}
        {page === "stats" && <StatsPage />}
        {page === "quests" && <QuestsPage />}
        {page === "shop" && <ShopPage coins={coins} />}
        {page === "leaderboard" && <LeaderboardPage />}
        {page === "subscription" && <SubscriptionPage />}
      </main>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-[#0b0d16]/95 backdrop-blur-xl border-t border-white/8">
        <div className="max-w-lg mx-auto flex items-center justify-around px-1 py-1.5">
          {PAGES.map(p => (
            <NavItem key={p.id} icon={p.icon} label={p.label} active={page === p.id} onClick={() => setPage(p.id)} />
          ))}
        </div>
      </nav>
    </div>
  );
}