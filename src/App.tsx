import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
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
  tapLevel: number;
  incomeLevel: number;
  friendsLevel: number;
};

type FloatReward = {
  id: number;
  text: string;
};

const PASSIVE_TICK_MS = 5000;
const TAP_COOLDOWN_MS = 280;

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

function upgradeCost(base: number, level: number, rate: number): number {
  return Math.round(base * Math.pow(rate, level - 1));
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
    tapLevel: 1,
    incomeLevel: 1,
    friendsLevel: 1,
  });
  const [dailyClaimed, setDailyClaimed] = useState(false);
  const [wheelSpins, setWheelSpins] = useState(1);
  const [floats, setFloats] = useState<FloatReward[]>([]);
  const [tapLocked, setTapLocked] = useState(false);

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

  const tapUpgradeCost = useMemo(
    () => upgradeCost(25, player.tapLevel, 1.72),
    [player.tapLevel]
  );
  const incomeUpgradeCost = useMemo(
    () => upgradeCost(40, player.incomeLevel, 1.78),
    [player.incomeLevel]
  );
  const rechargeUpgradeCost = useMemo(
    () => upgradeCost(55, player.rechargeLevel, 1.85),
    [player.rechargeLevel]
  );
  const friendUpgradeCost = useMemo(
    () => upgradeCost(70, player.friendsLevel, 1.92),
    [player.friendsLevel]
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

    const gain = player.tapValue;
    const xpGain = 1;

    setPlayer((prev) =>
      applyLevelProgress({
        ...prev,
        adnTokens: prev.adnTokens + gain,
        energy: clamp(prev.energy - 1, 0, prev.maxEnergy),
        xp: prev.xp + xpGain,
      })
    );

    spawnFloat(`+${gain}`);
    window.setTimeout(() => setTapLocked(false), TAP_COOLDOWN_MS);
  };

  const claimDaily = () => {
    if (dailyClaimed) return;
    const reward = 18 + player.level * 2;
    setPlayer((prev) => ({ ...prev, adnTokens: prev.adnTokens + reward }));
    setDailyClaimed(true);
    spawnFloat(`+${reward}`);
  };

  const spinWheel = () => {
    if (wheelSpins <= 0) return;

    const pool = [8, 10, 12, 15, 18, 22];
    const reward = pool[Math.floor(Math.random() * pool.length)];

    setWheelSpins((prev) => prev - 1);
    setPlayer((prev) => ({ ...prev, adnTokens: prev.adnTokens + reward }));
    spawnFloat(`+${reward}`);
  };

  const convertToCash = () => {
    const pack = 100;
    if (player.adnTokens < pack) return;

    const cashGain = 1;
    setPlayer((prev) => ({
      ...prev,
      adnTokens: prev.adnTokens - pack,
      cash: prev.cash + cashGain,
    }));
  };

  const buyTapUpgrade = () => {
    if (player.adnTokens < tapUpgradeCost) return;
    setPlayer((prev) => ({
      ...prev,
      adnTokens: prev.adnTokens - tapUpgradeCost,
      tapValue: prev.tapValue + 1,
      tapLevel: prev.tapLevel + 1,
    }));
  };

  const buyIncomeUpgrade = () => {
    if (player.adnTokens < incomeUpgradeCost) return;
    setPlayer((prev) => ({
      ...prev,
      adnTokens: prev.adnTokens - incomeUpgradeCost,
      hourlyIncome: prev.hourlyIncome + 10,
      incomeLevel: prev.incomeLevel + 1,
    }));
  };

  const buyRechargeUpgrade = () => {
    if (player.adnTokens < rechargeUpgradeCost) return;
    setPlayer((prev) => ({
      ...prev,
      adnTokens: prev.adnTokens - rechargeUpgradeCost,
      rechargeLevel: prev.rechargeLevel + 1,
    }));
  };

  const buyFriendsUpgrade = () => {
    if (player.adnTokens < friendUpgradeCost) return;
    setPlayer((prev) => ({
      ...prev,
      adnTokens: prev.adnTokens - friendUpgradeCost,
      hourlyIncome: prev.hourlyIncome + 6,
      friendsLevel: prev.friendsLevel + 1,
    }));
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
          <div className="profile-row">
            <div className="profile-chip">
              <span>Kullanıcı</span>
              <strong>{player.username}</strong>
            </div>
            <div className="profile-chip">
              <span>Seviye</span>
              <strong>{player.level}</strong>
            </div>
          </div>
        </header>

        <section className="hero-card">
          <div className="token-label">ADN Token</div>
          <div className="token-value">{format(player.adnTokens)}</div>

          <div className="info-pills">
            <div className="pill">
              <Gem size={14} />
              Saatlik {format(player.hourlyIncome)}
            </div>
            <div className="pill">
              <RefreshCcw size={14} />
              Tam dolum {rechargeHours.toFixed(1)} sa
            </div>
          </div>

          <div className="stage">
            <button
              className="daily-action left"
              onClick={claimDaily}
              disabled={dailyClaimed}
            >
              <Gift size={18} />
              <span>{dailyClaimed ? "Alındı" : "Günlük Ödül"}</span>
            </button>

            <button
              className="daily-action right"
              onClick={spinWheel}
              disabled={wheelSpins <= 0}
            >
              <Sparkles size={18} />
              <span>{wheelSpins > 0 ? "Şans Çarkı" : "Bitti"}</span>
            </button>

            <button className="stage-action left-bottom" onClick={buyFriendsUpgrade}>
              <Users size={18} />
              <span>Arkadaşlar</span>
            </button>

            <button className="stage-action right-bottom" onClick={buyTapUpgrade}>
              <Crown size={18} />
              <span>Geliştirme</span>
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
              whileTap={{ scale: 0.97 }}
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
            <span>{Math.floor(player.energy)}/{player.maxEnergy}</span>
          </div>
        </section>

        <section className="progress-card">
          <div className="bar-block">
            <div className="bar-head">
              <span>Enerji</span>
              <span>{Math.floor(player.energy)}/{player.maxEnergy}</span>
            </div>
            <div className="bar-track">
              <div className="bar-fill cyan" style={{ width: `${energyProgress}%` }} />
            </div>
          </div>

          <div className="bar-block">
            <div className="bar-head">
              <span>İlerleme</span>
              <span>{player.xp}/{xpTarget}</span>
            </div>
            <div className="bar-track">
              <div className="bar-fill gold" style={{ width: `${xpProgress}%` }} />
            </div>
          </div>
        </section>

        <section className="overview-grid">
          <article className="panel">
            <div className="panel-title">Profil</div>
            <div className="panel-list">
              <div>
                <span>Tap kazancı</span>
                <strong>{player.tapValue}</strong>
              </div>
              <div>
                <span>Saatlik kazanç</span>
                <strong>{format(player.hourlyIncome)}</strong>
              </div>
              <div>
                <span>Nakit</span>
                <strong>${player.cash}</strong>
              </div>
            </div>
          </article>

          <article className="panel">
            <div className="panel-title">ADN Cash</div>
            <p className="panel-copy">
              Her 100 ADN token, 1 nakit puana çevrilir.
            </p>
            <button className="main-action" onClick={convertToCash}>
              <Wallet size={16} />
              Nakit Çevir
            </button>
          </article>
        </section>

        <section className="shop-grid">
          <button className="shop-card" onClick={buyTapUpgrade}>
            <div className="shop-label">Karakter Gücü</div>
            <strong>Tap değeri +1</strong>
            <small>Seviye {player.tapLevel}</small>
            <span>{format(tapUpgradeCost)} ADN</span>
          </button>

          <button className="shop-card" onClick={buyIncomeUpgrade}>
            <div className="shop-label">Saatlik Gelir</div>
            <strong>+10 ADN / saat</strong>
            <small>Seviye {player.incomeLevel}</small>
            <span>{format(incomeUpgradeCost)} ADN</span>
          </button>

          <button className="shop-card" onClick={buyRechargeUpgrade}>
            <div className="shop-label">Yenileme Hızı</div>
            <strong>Daha hızlı dolum</strong>
            <small>Seviye {player.rechargeLevel}</small>
            <span>{format(rechargeUpgradeCost)} ADN</span>
          </button>

          <button className="shop-card" onClick={buyFriendsUpgrade}>
            <div className="shop-label">Arkadaşlar</div>
            <strong>Pasif destek</strong>
            <small>Seviye {player.friendsLevel}</small>
            <span>{format(friendUpgradeCost)} ADN</span>
          </button>
        </section>
      </div>
    </div>
  );
}
