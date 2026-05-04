import { useState } from "react";
import { HudCard } from "../GameUI";
import { useRobokassa, openPaymentPage, isValidEmail } from "@/components/extensions/robokassa/useRobokassa";
import func2url from "../../../backend/func2url.json";

const PLANS = [
  {
    id: "monthly",
    name: "Герой",
    price: 299,
    period: "месяц",
    color: "#a855f7",
    icon: "⚔️",
    features: ["Неограниченные привычки", "Все квесты", "Аналитика 360°", "Без рекламы"],
    popular: false,
  },
  {
    id: "yearly",
    name: "Легенда",
    price: 1990,
    period: "год",
    color: "#f472b6",
    icon: "👑",
    features: ["Всё из тарифа Герой", "Эксклюзивные ачивки", "Кастомный аватар", "Приоритетная поддержка", "2 месяца бесплатно"],
    popular: true,
  },
];

export function SubscriptionPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState<"plans" | "form">("plans");

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
    if (!validate() || !selected) return;
    const plan = PLANS.find(p => p.id === selected)!;
    const data = await createPayment({
      amount: plan.price,
      userName: form.name,
      userEmail: form.email,
      userPhone: "79000000000",
      orderComment: `Подписка LEVELUP — ${plan.name}`,
      cartItems: [{ id: plan.id, name: `Подписка ${plan.name}`, price: plan.price, quantity: 1 }],
      successUrl: window.location.href,
      failUrl: window.location.href,
    });
    openPaymentPage(data.payment_url);
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="font-orbitron text-lg font-black text-white">ПОДПИСКА</h2>
        {step === "form" && (
          <button onClick={() => setStep("plans")} className="text-slate-400 font-rajdhani text-sm hover:text-white transition-colors">
            ← Назад
          </button>
        )}
      </div>

      {step === "plans" && (
        <>
          <HudCard className="p-4" glowColor="purple">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🚀</span>
              <div>
                <p className="font-orbitron text-xs font-bold text-neon-purple tracking-wider">LEVELUP PRO</p>
                <p className="font-rajdhani text-slate-300 text-sm mt-0.5">Разблокируй весь потенциал трекера</p>
              </div>
            </div>
          </HudCard>

          <div className="space-y-3">
            {PLANS.map(plan => (
              <div key={plan.id} onClick={() => setSelected(plan.id)}
                className="relative cursor-pointer transition-all duration-200 hover:scale-[1.01]">
                {plan.popular && (
                  <div className="absolute -top-2 left-4 z-10 px-3 py-0.5 rounded-full text-[10px] font-orbitron font-bold text-black"
                    style={{ background: plan.color }}>
                    ПОПУЛЯРНЫЙ
                  </div>
                )}
                <HudCard className={`p-5 transition-all duration-200 ${selected === plan.id ? 'ring-2' : ''}`}
                  glowColor={plan.id === "yearly" ? "pink" : "purple"}>
                  <div style={selected === plan.id ? { '--tw-ring-color': plan.color } as React.CSSProperties : {}}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{plan.icon}</span>
                        <div>
                          <p className="font-orbitron font-bold text-base text-white">{plan.name}</p>
                          <p className="font-rajdhani text-xs text-slate-400">на {plan.period}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-orbitron font-black text-xl" style={{ color: plan.color }}>{plan.price} ₽</p>
                        {plan.id === "yearly" && (
                          <p className="font-rajdhani text-xs text-neon-green">≈ {Math.round(plan.price / 12)} ₽/мес</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      {plan.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[10px]"
                            style={{ background: `${plan.color}25`, color: plan.color }}>✓</div>
                          <span className="font-rajdhani text-sm text-slate-300">{f}</span>
                        </div>
                      ))}
                    </div>
                    {selected === plan.id && (
                      <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-center gap-2">
                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: plan.color }} />
                        <span className="font-orbitron text-xs font-bold" style={{ color: plan.color }}>ВЫБРАНО</span>
                      </div>
                    )}
                  </div>
                </HudCard>
              </div>
            ))}
          </div>

          <button
            disabled={!selected}
            onClick={() => selected && setStep("form")}
            className="w-full py-3.5 rounded-xl font-orbitron font-bold text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            style={selected
              ? { background: 'linear-gradient(135deg, #a855f7, #22d3ee)', color: '#fff', boxShadow: '0 0 20px rgba(168,85,247,0.4)' }
              : { background: 'rgba(255,255,255,0.05)', color: '#64748b', border: '1px solid rgba(255,255,255,0.1)' }
            }>
            {selected ? `Оформить — ${PLANS.find(p => p.id === selected)?.price} ₽` : "Выбери тариф"}
          </button>
        </>
      )}

      {step === "form" && (
        <>
          {(() => {
            const plan = PLANS.find(p => p.id === selected)!;
            return (
              <HudCard className="p-4" glowColor={plan.id === "yearly" ? "pink" : "purple"}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{plan.icon}</span>
                    <span className="font-orbitron font-bold text-sm text-white">{plan.name}</span>
                  </div>
                  <span className="font-orbitron font-black text-lg" style={{ color: plan.color }}>{plan.price} ₽</span>
                </div>
              </HudCard>
            );
          })()}

          <HudCard className="p-5 space-y-4" glowColor="cyan">
            <p className="font-orbitron text-xs text-neon-cyan font-bold tracking-wider">ДАННЫЕ ДЛЯ ОПЛАТЫ</p>

            <div className="space-y-1">
              <label className="font-rajdhani text-xs text-slate-400 uppercase tracking-wider">Имя</label>
              <input
                type="text"
                placeholder="Иван Иванов"
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2.5 text-white font-rajdhani text-sm placeholder-slate-600 focus:outline-none focus:border-neon-purple/60 transition-colors"
              />
              {errors.name && <p className="text-xs text-red-400 font-rajdhani">{errors.name}</p>}
            </div>

            <div className="space-y-1">
              <label className="font-rajdhani text-xs text-slate-400 uppercase tracking-wider">Email</label>
              <input
                type="email"
                placeholder="ivan@example.com"
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2.5 text-white font-rajdhani text-sm placeholder-slate-600 focus:outline-none focus:border-neon-purple/60 transition-colors"
              />
              {errors.email && <p className="text-xs text-red-400 font-rajdhani">{errors.email}</p>}
            </div>

            {errors.submit && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                <p className="text-xs text-red-400 font-rajdhani">{errors.submit}</p>
              </div>
            )}
          </HudCard>

          <button
            onClick={handlePay}
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl font-orbitron font-bold text-sm text-white transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg, #a855f7, #22d3ee)', boxShadow: '0 0 20px rgba(168,85,247,0.4)' }}>
            {isLoading ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Создаём заказ...
              </>
            ) : (
              <>🔐 Перейти к оплате</>
            )}
          </button>

          <p className="text-center font-rajdhani text-xs text-slate-500">
            Оплата через Robokassa · Безопасное соединение
          </p>
        </>
      )}
    </div>
  );
}
