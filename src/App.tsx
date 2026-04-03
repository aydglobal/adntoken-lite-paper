import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  BadgeDollarSign,
  Crown,
  Gem,
  Gift,
  RefreshCcw,
  Sparkles,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import "./App.css";
import logoArt from "./assets/adn-nebula-logo.svg";
import kingArt from "../media/miniapp_king.png.png";

type PlayerState = {
  username: string;
  level: number;
  xp: number;
  adnTokens: number;
  cash: number;
  energy: number;
  maxEnergy: number;
  tapValue: number;
  hourlyIncome: number;
  rechargeLevel: number;
};

type FloatReward = {
  id: number;
  text: string;
};

type MarketItem = {
  id: string;
  name: string;
  description: string;
  effect: string;
  baseCost: number;
  rate: number;
};

const PASSIVE_TICK_MS = 5000;
const TAP_COOLDOWN_MS = 280;
const CASH_PER_ADN = 1 / 5000;
const MIN_WITHDRAW_USD = 10;
const MIN_WITHDRAW_LEVEL = 5;
const WITHDRAW_FEE_RATE = 0.1;

const marketCatalog: MarketItem[] = [
  {
    id: "tap-core",
    name: "Pençe Çekirdeği",
    description: "Temel tap gücünü artırır.",
    effect: "+1 tap",
    baseCost: 25,
    rate: 1.72,
  },
  {
    id: "gold-claw",
    name: "Altın Pençe",
    description: "Karakter vuruşunu güçlendirir.",
    effect: "+1 tap",
    baseCost: 30,
    rate: 1.74,
  },
  {
    id: "focus-band",
    name: "Odak Bandı",
    description: "Tap ritmini daha verimli hale getirir.",
    effect: "+1 tap",
    baseCost: 34,
    rate: 1.76,
  },
  {
    id: "royal-crown",
    name: "Kraliyet Tacı",
    description: "Her dokunuşa ek güç katar.",
    effect: "+1 tap",
    baseCost: 40,
    rate: 1.8,
  },
  {
    id: "king-instinct",
    name: "Kral İçgüdüsü",
    description: "Vuruş başına kazanılan ADN'yi büyütür.",
    effect: "+1 tap",
    baseCost: 46,
    rate: 1.82,
  },
  {
    id: "idle-miner",
    name: "Maden Botu",
    description: "Saatlik geliri düzenli artırır.",
    effect: "+8 saatlik",
    baseCost: 42,
    rate: 1.78,
  },
  {
    id: "lion-agency",
    name: "Aslan Ajansı",
    description: "Pasif gelir ekibini büyütür.",
    effect: "+10 saatlik",
    baseCost: 48,
    rate: 1.8,
  },
  {
    id: "city-billboard",
    name: "Şehir Panosu",
    description: "Reklam akışından daha fazla ADN toplar.",
    effect: "+12 saatlik",
    baseCost: 55,
    rate: 1.82,
  },
  {
    id: "vault-desk",
    name: "Kasa Masası",
    description: "Gelir akışını daha hızlı işler.",
    effect: "+14 saatlik",
    baseCost: 62,
    rate: 1.84,
  },
  {
    id: "cash-signal",
    name: "Nakit Sinyali",
    description: "Kazanç kanallarını genişletir.",
    effect: "+16 saatlik",
    baseCost: 70,
    rate: 1.86,
  },
  {
    id: "recharge-coil",
    name: "Dolum Bobini",
    description: "Enerji dolum süresini kısaltır.",
    effect: "+1 hız",
    baseCost: 58,
    rate: 1.84,
  },
  {
    id: "volt-core",
    name: "Volt Çekirdeği",
    description: "Enerji yenileme hızını yükseltir.",
    effect: "+1 hız",
    baseCost: 66,
    rate: 1.86,
  },
  {
    id: "speed-grid",
    name: "Hız Izgarası",
    description: "Dolum sistemini ileri seviyeye taşır.",
    effect: "+1 hız",
    baseCost: 74,
    rate: 1.88,
  },
  {
    id: "energy-cell",
    name: "Enerji Hücresi",
    description: "Maksimum enerji havuzunu genişletir.",
    effect: "+8 enerji",
    baseCost: 64,
    rate: 1.8,
  },
  {
    id: "mega-battery",
    name: "Mega Batarya",
    description: "Enerji kapasitesini güçlü biçimde büyütür.",
    effect: "+12 enerji",
    baseCost: 78,
    rate: 1.84,
  },
  {
    id: "friend-link",
    name: "Arkadaş Linki",
    description: "Sosyal destekle sabit üretim ekler.",
    effect: "+6 saatlik",
    baseCost: 72,
    rate: 1.88,
  },
  {
    id: "crew-hub",
    name: "Ekip Merkezi",
    description: "Hem gelir hem enerji desteği sağlar.",
    effect: "+8 saatlik, +4 enerji",
    baseCost: 84,
    rate: 1.9,
  },
  {
    id: "wheel-chip",
    name: "Çark Çipi",
    description: "Ek şans çarkı hakkı verir.",
    effect: "+1 çark",
    baseCost: 90,
    rate: 1.94,
  },
  {
    id: "daily-pass",
    name: "Günlük Kart",
    description: "Günlük ödül miktarını artırır.",
    effect: "+6 günlük",
    baseCost: 96,
    rate: 1.96,
  },
  {
    id: "vip-desk",
    name: "VIP Ofis",
    description: "Gelir ve enerjiye aynı anda bonus verir.",
    effect: "+12 saatlik, +5 enerji",
    baseCost: 108,
    rate: 2,
  },
];

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function format(value: number): string {
  return new Intl.NumberFormat("tr-TR").format(Math.floor(value));
}

function xpNeed(level: number): number {
  return 24 + level * 12;
}

function fullRechargeHours(rechargeLevel: number): number {
  return Math.max(2.2, 6 - (rechargeLevel - 1) * 0.45);
}

function energyPerTick(maxEnergy: number, rechargeLevel: number): number {
  const totalMs = fullRechargeHours(rechargeLevel) * 60 * 60 * 1000;
  return (maxEnergy / totalMs) * PASSIVE_TICK_MS;
}

function applyLevelProgress(player: PlayerState): PlayerState {
  let next = { ...player };
  let need = xpNeed(next.level);

  while (next.xp >= need) {
    next = {
      ...next,
      level: next.level + 1,
      xp: next.xp - need,
      maxEnergy: next.maxEnergy + 3,
    };
    need = xpNeed(next.level);
  }

  return next;
}

function itemCost(item: MarketItem, level: number): number {
  return Math.round(item.baseCost * Math.pow(item.rate, level));
}

export default function App() {
  const [player, setPlayer] = useState<PlayerState>({
    username: "ArctisOne",
    level: 1,
    xp: 0,
    adnTokens: 120,
    cash: 0,
    energy: 100,
    maxEnergy: 100,
    tapValue: 1,
    hourlyIncome: 18,
    rechargeLevel: 1,
  });
  const [dailyClaimed, setDailyClaimed] = useState(false);
  const [wheelSpins, setWheelSpins] = useState(1);
  const [floats, setFloats] = useState<FloatReward[]>([]);
  const [tapLocked, setTapLocked] = useState(false);
  const [marketLevels, setMarketLevels] = useState<Record<string, number>>(
    Object.fromEntries(marketCatalog.map((item) => [item.id, 0]))
  );

  const passiveBufferRef = useRef(0);
  const gainIdRef = useRef(1);
  const lastTapRef = useRef(0);

  const xpTarget = useMemo(() => xpNeed(player.level), [player.level]);
  const xpProgress = useMemo(() => (player.xp / xpTarget) * 100, [player.xp, xpTarget]);
  const energyProgress = useMemo(
    () => (player.energy / player.maxEnergy) * 100,
    [player.energy, player.maxEnergy]
  );
  const rechargeHours = useMemo(
    () => fullRechargeHours(player.rechargeLevel),
    [player.rechargeLevel]
  );
  const estimatedCash = useMemo(() => player.adnTokens * CASH_PER_ADN, [player.adnTokens]);
  const netCashout = useMemo(
    () => Math.floor(estimatedCash * (1 - WITHDRAW_FEE_RATE) * 100) / 100,
    [estimatedCash]
  );
  const canWithdraw = useMemo(
    () => player.level >= MIN_WITHDRAW_LEVEL && estimatedCash >= MIN_WITHDRAW_USD,
    [player.level, estimatedCash]
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPlayer((prev) => {
        const rechargeGain = energyPerTick(prev.maxEnergy, prev.rechargeLevel);
        passiveBufferRef.current += (prev.hourlyIncome / 3600000) * PASSIVE_TICK_MS;
        const passiveWhole = Math.floor(passiveBufferRef.current);
        passiveBufferRef.current -= passiveWhole;

        return {
          ...prev,
          adnTokens: prev.adnTokens + passiveWhole,
          energy: clamp(prev.energy + rechargeGain, 0, prev.maxEnergy),
        };
      });
    }, PASSIVE_TICK_MS);

    return () => window.clearInterval(timer);
  }, []);

  const spawnFloat = (text: string) => {
    const reward = { id: gainIdRef.current++, text };
    setFloats((prev) => [...prev, reward]);
    window.setTimeout(() => {
      setFloats((prev) => prev.filter((item) => item.id !== reward.id));
    }, 900);
  };

  const handleTap = () => {
    const now = Date.now();
    if (tapLocked || now - lastTapRef.current < TAP_COOLDOWN_MS || player.energy < 1) {
      return;
    }

    lastTapRef.current = now;
    setTapLocked(true);

    setPlayer((prev) =>
      applyLevelProgress({
        ...prev,
        adnTokens: prev.adnTokens + prev.tapValue,
        energy: clamp(prev.energy - 1, 0, prev.maxEnergy),
        xp: prev.xp + 1,
      })
    );

    spawnFloat(`+${player.tapValue}`);
    window.setTimeout(() => setTapLocked(false), TAP_COOLDOWN_MS);
  };

  const claimDaily = () => {
    if (dailyClaimed) return;
    const reward = 18 + player.level * 2 + marketLevels["daily-pass"] * 6;
    setPlayer((prev) => ({ ...prev, adnTokens: prev.adnTokens + reward }));
    setDailyClaimed(true);
    spawnFloat(`+${reward}`);
  };

  const spinWheel = () => {
    if (wheelSpins <= 0) return;
    const rewards = [8, 10, 12, 15, 18, 22];
    const reward = rewards[Math.floor(Math.random() * rewards.length)];

    setWheelSpins((prev) => prev - 1);
    setPlayer((prev) => ({ ...prev, adnTokens: prev.adnTokens + reward }));
    spawnFloat(`+${reward}`);
  };

  const convertToCash = () => {
    if (!canWithdraw) return;
    setPlayer((prev) => ({
      ...prev,
      adnTokens: 0,
      cash: Number((prev.cash + netCashout).toFixed(2)),
    }));
  };

  const buyMarketItem = (item: MarketItem) => {
    const level = marketLevels[item.id] ?? 0;
    const cost = itemCost(item, level);
    if (player.adnTokens < cost) return;

    setPlayer((prev) => {
      const next: PlayerState = { ...prev, adnTokens: prev.adnTokens - cost };

      switch (item.id) {
        case "tap-core":
        case "gold-claw":
        case "focus-band":
        case "royal-crown":
        case "king-instinct":
          next.tapValue += 1;
          break;
        case "idle-miner":
          next.hourlyIncome += 8;
          break;
        case "lion-agency":
          next.hourlyIncome += 10;
          break;
        case "city-billboard":
          next.hourlyIncome += 12;
          break;
        case "vault-desk":
          next.hourlyIncome += 14;
          break;
        case "cash-signal":
          next.hourlyIncome += 16;
          break;
        case "recharge-coil":
        case "volt-core":
        case "speed-grid":
          next.rechargeLevel += 1;
          break;
        case "energy-cell":
          next.maxEnergy += 8;
          next.energy = Math.min(next.maxEnergy, next.energy + 8);
          break;
        case "mega-battery":
          next.maxEnergy += 12;
          next.energy = Math.min(next.maxEnergy, next.energy + 12);
          break;
        case "friend-link":
          next.hourlyIncome += 6;
          break;
        case "crew-hub":
          next.hourlyIncome += 8;
          next.maxEnergy += 4;
          break;
        case "wheel-chip":
          setWheelSpins((prevSpins) => prevSpins + 1);
          break;
        case "daily-pass":
          break;
        case "vip-desk":
          next.hourlyIncome += 12;
          next.maxEnergy += 5;
          break;
        default:
          break;
      }

      return next;
    });

    setMarketLevels((prev) => ({ ...prev, [item.id]: level + 1 }));
  };

  return (
    <div className="app-shell">
      <div className="ambient ambient-a" />
      <div className="ambient ambient-b" />

      <div className="screen">
        <header className="header-card">
          <div className="brand-row">
            <img src={logoArt} alt="ADN NEBULA" className="brand-icon" />
            <strong>ADN NEBULA</strong>
          </div>

          <div className="header-side">
            <div className="header-chip">
              <span>Kullanıcı</span>
              <strong>{player.username}</strong>
            </div>
            <div className="header-chip">
              <span>Seviye</span>
              <strong>{player.level}</strong>
            </div>
          </div>
        </header>

        <section className="hero-card">
          <div className="token-label">ADN Token</div>
          <div className="token-value">{format(player.adnTokens)}</div>

          <div className="stats-row">
            <div className="stat-pill">
              <Gem size={14} />
              Saatlik {format(player.hourlyIncome)}
            </div>
            <div className="stat-pill">
              <RefreshCcw size={14} />
              Dolum {rechargeHours.toFixed(1)} sa
            </div>
            <div className="stat-pill">
              <BadgeDollarSign size={14} />
              ${estimatedCash.toFixed(2)} değer
            </div>
          </div>

          <div className="stage">
            <button className="side-action top-left" onClick={claimDaily} disabled={dailyClaimed}>
              <Gift size={18} />
              <span>{dailyClaimed ? "Alındı" : "Günlük"}</span>
            </button>

            <button className="side-action top-right" onClick={spinWheel} disabled={wheelSpins <= 0}>
              <Sparkles size={18} />
              <span>{wheelSpins > 0 ? "Çark" : "Bitti"}</span>
            </button>

            <button className="side-action bottom-left" type="button">
              <Users size={18} />
              <span>Arkadaş</span>
            </button>

            <button className="side-action bottom-right" type="button">
              <Crown size={18} />
              <span>Market</span>
            </button>

            {floats.map((item, index) => (
              <motion.div
                key={item.id}
                className="floating-gain"
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: -90 - index * 8, scale: 1.04 }}
                transition={{ duration: 0.8 }}
              >
                {item.text}
              </motion.div>
            ))}

            <motion.button
              whileTap={{ scale: 0.975 }}
              className="king-button"
              onClick={handleTap}
              disabled={tapLocked || player.energy < 1}
              aria-label="Karaktere dokun"
            >
              <img src={kingArt} alt="ADN karakteri" className="king-art" />
            </motion.button>
          </div>

          <div className="energy-pill">
            <Zap size={14} />
            <span>
              {Math.floor(player.energy)}/{player.maxEnergy}
            </span>
          </div>
        </section>

        <section className="bottom-grid">
          <div className="progress-card">
            <div className="bar-block">
              <div className="bar-head">
                <span>Enerji</span>
                <span>
                  {Math.floor(player.energy)}/{player.maxEnergy}
                </span>
              </div>
              <div className="bar-track">
                <div className="bar-fill cyan" style={{ width: `${energyProgress}%` }} />
              </div>
            </div>

            <div className="bar-block">
              <div className="bar-head">
                <span>İlerleme</span>
                <span>
                  {player.xp}/{xpTarget}
                </span>
              </div>
              <div className="bar-track">
                <div className="bar-fill gold" style={{ width: `${xpProgress}%` }} />
              </div>
            </div>
          </div>

          <div className="cash-card">
            <div className="cash-top">
              <div>
                <span className="cash-label">Nakit Bakiye</span>
                <strong>${player.cash.toFixed(2)}</strong>
              </div>
              <BadgeDollarSign size={18} />
            </div>
            <div className="cash-rules">
              <span>Çekilebilir: ${netCashout.toFixed(2)}</span>
              <span>Min çekim: ${MIN_WITHDRAW_USD}</span>
              <span>Seviye şartı: {MIN_WITHDRAW_LEVEL}</span>
            </div>
            <button className="cash-button" onClick={convertToCash} disabled={!canWithdraw}>
              <Wallet size={16} />
              ADN tokenlarını nakde çevir
            </button>
          </div>
        </section>

        <section className="market-panel">
          <div className="market-head">
            <div>
              <span>Geliştirme Marketi</span>
              <strong>20 Ürün</strong>
            </div>
            <small>Tokenlarını burada güçlendirmeye harca</small>
          </div>

          <div className="market-grid">
            {marketCatalog.map((item) => {
              const level = marketLevels[item.id] ?? 0;
              const cost = itemCost(item, level);
              const canAfford = player.adnTokens >= cost;

              return (
                <button
                  key={item.id}
                  className="market-card"
                  onClick={() => buyMarketItem(item)}
                  disabled={!canAfford}
                >
                  <div className="market-top">
                    <div className="market-title">{item.name}</div>
                    <span className="market-effect">{item.effect}</span>
                  </div>
                  <p>{item.description}</p>
                  <div className="market-meta">
                    <span>Seviye {level + 1}</span>
                    <strong>{format(cost)} ADN</strong>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
