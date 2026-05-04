import { useState } from "react";
import { HudCard } from "../GameUI";
import { ACHIEVEMENTS, QUESTS, SHOP_ITEMS, LEADERBOARD } from "../gameData";
import { useRobokassa, openPaymentPage, isValidEmail } from "@/components/extensions/robokassa/useRobokassa";
import func2url from "../../../backend/func2url.json";

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

// ─── ShopPayModal ─────────────────────────────────────────────────────────────

const SHOP_REAL_PRICES: Record<number, number> = { 3: 199, 4: 499, 6: 149 };

function ShopPayModal({ item, onClose, onPaid }: {
  item: typeof SHOP_ITEMS[number];
  onClose: () => void;
  onPaid: (id: number) => void;
}) {
  const [form, setForm] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const realPrice = SHOP_REAL_PRICES[item.id];

  const { createPayment, isLoading } = useRobokassa({
    apiUrl: func2url["robokassa-robokassa"],
    onError: (e) => setErrors({ submit: e.message }),
  });

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Введите имя";
    if (!isValidEmail(form.email)) e.email = "Введите корректный email";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handlePay() {
    if (!validate()) return;
    const data = await createPayment({
      amount: realPrice,
      userName: form.name,
      userEmail: form.email,
      userPhone: "79000000000",
      orderComment: `Покупка: ${item.name}`,
      cartItems: [{ id: String(item.id), name: item.name, price: realPrice, quantity: 1 }],
      successUrl: window.location.href,
      failUrl: window.location.href,
    });
    onPaid(item.id);
    openPaymentPage(data.payment_url);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-lg animate-slide-up" onClick={e => e.stopPropagation()}>
        <HudCard className="p-5 rounded-b-none space-y-4" glowColor="yellow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="font-rajdhani font-bold text-sm text-white">{item.name}</p>
                <p className="font-orbitron text-xs font-black" style={{ color: item.color }}>{realPrice} ₽</p>
              </div>
            </div>
            <button onClick={onClose} className="w-7 h-7 rounded-lg bg-white/10 text-slate-400 hover:text-white flex items-center justify-center text-sm transition-colors">✕</button>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <label className="font-rajdhani text-xs text-slate-400 uppercase tracking-wider">Имя</label>
              <input type="text" placeholder="Иван Иванов" value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-white font-rajdhani text-sm placeholder-slate-600 focus:outline-none focus:border-neon-purple/60 transition-colors" />
              {errors.name && <p className="text-xs text-red-400 font-rajdhani">{errors.name}</p>}
            </div>
            <div className="space-y-1">
              <label className="font-rajdhani text-xs text-slate-400 uppercase tracking-wider">Email</label>
              <input type="email" placeholder="ivan@example.com" value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-white font-rajdhani text-sm placeholder-slate-600 focus:outline-none focus:border-neon-purple/60 transition-colors" />
              {errors.email && <p className="text-xs text-red-400 font-rajdhani">{errors.email}</p>}
            </div>
            {errors.submit && <p className="text-xs text-red-400 font-rajdhani">{errors.submit}</p>}
          </div>

          <button onClick={handlePay} disabled={isLoading}
            className="w-full py-3 rounded-xl font-orbitron font-bold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60"
            style={{ background: `linear-gradient(135deg, ${item.color}, #a855f7)`, boxShadow: `0 0 16px ${item.color}40` }}>
            {isLoading
              ? <><div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />Создаём заказ...</>
              : <>🔐 Оплатить {realPrice} ₽</>}
          </button>
          <p className="text-center font-rajdhani text-xs text-slate-500">Оплата через Robokassa · Безопасное соединение</p>
        </HudCard>
      </div>
    </div>
  );
}

// ─── ShopPage ─────────────────────────────────────────────────────────────────

export function ShopPage({ coins }: { coins: number }) {
  const [owned, setOwned] = useState([2]);
  const [payingItem, setPayingItem] = useState<typeof SHOP_ITEMS[number] | null>(null);

  function handleBuy(item: typeof SHOP_ITEMS[number]) {
    if (owned.includes(item.id)) return;
    if (SHOP_REAL_PRICES[item.id]) {
      setPayingItem(item);
    } else {
      setOwned(p => [...p, item.id]);
    }
  }

  return (
    <div className="space-y-4 animate-fade-in">
      {payingItem && (
        <ShopPayModal
          item={payingItem}
          onClose={() => setPayingItem(null)}
          onPaid={(id) => { setOwned(p => [...p, id]); setPayingItem(null); }}
        />
      )}

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
          const realPrice = SHOP_REAL_PRICES[item.id];
          return (
            <HudCard key={item.id} className="p-4 hover:scale-[1.02] transition-all duration-200" glowColor="yellow">
              <div className="text-3xl mb-2 text-center">{item.icon}</div>
              <h3 className="font-rajdhani font-bold text-sm text-white text-center leading-tight">{item.name}</h3>
              <p className="text-[11px] text-slate-400 font-rajdhani text-center mt-1 leading-tight">{item.desc}</p>
              {realPrice && !isOwned && (
                <p className="text-center font-orbitron text-[10px] text-neon-cyan mt-1">{realPrice} ₽</p>
              )}
              <button
                onClick={() => handleBuy(item)}
                className="w-full mt-3 py-1.5 rounded-lg text-xs font-orbitron font-bold transition-all duration-200"
                style={isOwned
                  ? { background: 'rgba(255,255,255,0.04)', color: '#64748b', border: '1px solid rgba(255,255,255,0.08)' }
                  : { background: `${item.color}18`, color: item.color, border: `1px solid ${item.color}35`, boxShadow: `0 0 8px ${item.color}18` }
                }>
                {isOwned ? '✓ КУПЛЕНО' : realPrice ? `💳 ${realPrice} ₽` : `🪙 ${item.price}`}
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