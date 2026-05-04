// ─── Constants ────────────────────────────────────────────────────────────────

export const RANKS = [
  { name: "Новичок", min: 0, max: 500, color: "#94a3b8", icon: "⚪" },
  { name: "Ученик", min: 500, max: 1500, color: "#4ade80", icon: "🟢" },
  { name: "Воин", min: 1500, max: 3000, color: "#22d3ee", icon: "🔵" },
  { name: "Герой", min: 3000, max: 6000, color: "#a855f7", icon: "🟣" },
  { name: "Мастер", min: 6000, max: 10000, color: "#facc15", icon: "🟡" },
  { name: "Легенда", min: 10000, max: 99999, color: "#f472b6", icon: "💗" },
];

export const INITIAL_HABITS = [
  { id: 1, name: "Спорт", emoji: "💪", xp: 50, streak: 12, done: false, color: "#f472b6", desc: "30 мин тренировки" },
  { id: 2, name: "Медитация", emoji: "🧘", xp: 30, streak: 7, done: true, color: "#a855f7", desc: "10 мин осознанности" },
  { id: 3, name: "Чтение", emoji: "📚", xp: 40, streak: 21, done: false, color: "#22d3ee", desc: "20 страниц в день" },
  { id: 4, name: "Вода 2л", emoji: "💧", xp: 20, streak: 5, done: true, color: "#4ade80", desc: "Выпить 8 стаканов" },
  { id: 5, name: "Ранний подъём", emoji: "🌅", xp: 60, streak: 3, done: false, color: "#facc15", desc: "Подъём до 7:00" },
  { id: 6, name: "Холодный душ", emoji: "🚿", xp: 45, streak: 9, done: false, color: "#fb923c", desc: "60 сек холодной воды" },
];

export const QUESTS = [
  { id: 1, title: "Семидневный воин", desc: "Выполняй все привычки 7 дней подряд", xp: 500, progress: 5, total: 7, color: "#a855f7", icon: "⚔️", difficulty: "Сложный" },
  { id: 2, title: "Водный мастер", desc: "Выпей норму воды 30 дней", xp: 300, progress: 18, total: 30, color: "#22d3ee", icon: "💧", difficulty: "Средний" },
  { id: 3, title: "Книжный червь", desc: "Прочитай 5 книг в этом месяце", xp: 400, progress: 2, total: 5, color: "#4ade80", icon: "📖", difficulty: "Средний" },
  { id: 4, title: "Ранняя пташка", desc: "Вставай до 6:00 утра 10 раз", xp: 250, progress: 3, total: 10, color: "#facc15", icon: "🌅", difficulty: "Лёгкий" },
];

export const ACHIEVEMENTS = [
  { id: 1, name: "Первый шаг", desc: "Выполни первую привычку", icon: "🏃", earned: true, xp: 50, rarity: "Обычный", color: "#4ade80" },
  { id: 2, name: "Огонь не гаснет", desc: "Серия 7 дней", icon: "🔥", earned: true, xp: 100, rarity: "Необычный", color: "#fb923c" },
  { id: 3, name: "Легион дисциплины", desc: "Серия 30 дней", icon: "⚡", earned: false, xp: 300, rarity: "Редкий", color: "#22d3ee" },
  { id: 4, name: "Ранний герой", desc: "Вставай рано 10 раз", icon: "🌅", earned: true, xp: 150, rarity: "Необычный", color: "#facc15" },
  { id: 5, name: "Перфекционист", desc: "100% выполнение за неделю", icon: "💎", earned: false, xp: 500, rarity: "Эпический", color: "#a855f7" },
  { id: 6, name: "Легенда привычек", desc: "Достигни ранга Легенда", icon: "👑", earned: false, xp: 1000, rarity: "Легендарный", color: "#f472b6" },
];

export const LEADERBOARD = [
  { rank: 1, name: "MasterX_99", xp: 12450, avatar: "🦁", level: 28, badge: "👑" },
  { rank: 2, name: "FireWolf", xp: 10200, avatar: "🐺", level: 24, badge: "⚡" },
  { rank: 3, name: "NightHawk", xp: 9800, avatar: "🦅", level: 23, badge: "🔥" },
  { rank: 4, name: "Ты (Герой)", xp: 4250, avatar: "🧑‍💻", level: 14, badge: "⚔️", isMe: true },
  { rank: 5, name: "StarChaser", xp: 3900, avatar: "⭐", level: 13, badge: "🌟" },
  { rank: 6, name: "IronMind", xp: 3200, avatar: "🤖", level: 11, badge: "🎯" },
  { rank: 7, name: "ZenMaster", xp: 2800, avatar: "🧘", level: 9, badge: "☮️" },
];

export const SHOP_ITEMS = [
  { id: 1, name: "Бустер XP ×2", desc: "Двойной опыт на 24 часа", price: 200, icon: "⚡", color: "#facc15" },
  { id: 2, name: "Щит серии", desc: "Сохрани серию при пропуске", price: 150, icon: "🛡️", color: "#22d3ee" },
  { id: 3, name: "Тёмная тема Pro", desc: "Эксклюзивная тема оформления", price: 500, icon: "🌑", color: "#a855f7" },
  { id: 4, name: "Аватар: Дракон", desc: "Легендарный аватар профиля", price: 1000, icon: "🐉", color: "#f472b6" },
  { id: 5, name: "Напоминание Pro", desc: "Умные напоминания по AI", price: 300, icon: "🔔", color: "#4ade80" },
  { id: 6, name: "Аналитика 360°", desc: "Глубокий анализ привычек", price: 400, icon: "📊", color: "#fb923c" },
];

export const STATS_WEEKLY = [65, 80, 45, 90, 70, 85, 60];
export const WEEK_DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export const PAGES = [
  { id: "home", icon: "🏠", label: "Главная" },
  { id: "habits", icon: "💪", label: "Привычки" },
  { id: "quests", icon: "⚔️", label: "Квесты" },
  { id: "stats", icon: "📊", label: "Статистика" },
  { id: "achievements", icon: "🏆", label: "Ачивки" },
  { id: "leaderboard", icon: "👑", label: "Лидеры" },
  { id: "shop", icon: "🛒", label: "Магазин" },
  { id: "subscription", icon: "💎", label: "Pro" },
  { id: "profile", icon: "👤", label: "Профиль" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getRank(xp: number) {
  return [...RANKS].reverse().find(r => xp >= r.min) ?? RANKS[0];
}

export function getXpProgress(xp: number) {
  const rank = getRank(xp);
  return Math.min(((xp - rank.min) / (rank.max - rank.min)) * 100, 100);
}