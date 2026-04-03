import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Crown,
  Gamepad2,
  Gem,
  Gift,
  Rocket,
  Shield,
  Sparkles,
  Trophy,
  UserRound,
  Zap,
} from "lucide-react";
import "./App.css";
import logoArt from "./assets/adn-nebula-logo.svg";
import neonixArt from "./assets/character-neonix-prime.svg";
import astraArt from "./assets/character-astra-lyn.svg";
import kairoArt from "./assets/character-kairo-vex.svg";

type CharacterId = "Neonix Prime" | "Astra Lyn" | "Kairo Vex";

type Character = {
  id: CharacterId;
  title: string;
  role: string;
  perk: string;
  art: string;
  tapBonus: number;
  passiveBonus: number;
  critBonus: number;
};

type PlayerState = {
  character: CharacterId;
  shards: number;
  energy: number;
  maxEnergy: number;
  tapPower: number;
  passiveRate: number;
  critChance: number;
  combo: number;
  level: number;
  xp: number;
  boostMinutes: number;
};

type FloatingGain = {
  id: number;
  text: string;
};

const TAP_COOLDOWN_MS = 260;
const ENERGY_REGEN_MS = 2400;
const PASSIVE_TICK_MS = 3200;

const characters: Character[] = [
  {
    id: "Neonix Prime",
    title: "Nebula Mascot",
    role: "Marka karakteri",
    perk: "+12% tap gücü",
    art: neonixArt,
    tapBonus: 1.12,
    passiveBonus: 1,
    critBonus: 1,
  },
  {
    id: "Astra Lyn",
    title: "Flash Hunter",
    role: "Kritik uzmanı",
    perk: "+18% kritik etkisi",
    art: astraArt,
    tapBonus: 1,
    passiveBonus: 1,
    critBonus: 1.18,
  },
  {
    id: "Kairo Vex",
    title: "Silent Grid",
    role: "Pasif gelir ustası",
    perk: "+20% pasif gelir",
    art: kairoArt,
    tapBonus: 1,
    passiveBonus: 1.2,
    critBonus: 1,
  },
];

function format(value: number): string {
  return new Intl.NumberFormat("tr-TR").format(Math.floor(value));
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function xpNeed(level: number): number {
  return 180 + level * 80 + level * level * 8;
}

function getCharacter(id: CharacterId): Character {
  return characters.find((character) => character.id === id) ?? characters[0];
}

function applyLevelProgress(player: PlayerState): PlayerState {
  let next = { ...player };
  let need = xpNeed(next.level);

  while (next.xp >= need) {
    next = {
      ...next,
      level: next.level + 1,
      xp: next.xp - need,
      tapPower: next.tapPower + 1,
      passiveRate: next.passiveRate + 1,
      maxEnergy: next.maxEnergy + 3,
      critChance: clamp(next.critChance + 0.4, 8, 45),
    };
    need = xpNeed(next.level);
  }

  return next;
}

export default function App() {
  const [player, setPlayer] = useState<PlayerState>({
    character: "Neonix Prime",
    shards: 1640,
    energy: 92,
    maxEnergy: 100,
    tapPower: 10,
    passiveRate: 9,
    critChance: 12,
    combo: 0,
    level: 1,
    xp: 0,
    boostMinutes: 0,
  });
  const [gains, setGains] = useState<FloatingGain[]>([]);
  const [tapLocked, setTapLocked] = useState(false);

  const lastTapRef = useRef(0);
  const gainIdRef = useRef(1);

  const activeCharacter = useMemo(() => getCharacter(player.character), [player.character]);
  const xpTarget = useMemo(() => xpNeed(player.level), [player.level]);
  const xpProgress = useMemo(() => (player.xp / xpTarget) * 100, [player.xp, xpTarget]);
  const energyProgress = useMemo(
    () => (player.energy / player.maxEnergy) * 100,
    [player.energy, player.maxEnergy]
  );

  useEffect(() => {
    const energyTimer = window.setInterval(() => {
      setPlayer((prev) => ({ ...prev, energy: clamp(prev.energy + 1, 0, prev.maxEnergy) }));
    }, ENERGY_REGEN_MS);
    return () => window.clearInterval(energyTimer);
  }, []);

  useEffect(() => {
    const passiveTimer = window.setInterval(() => {
      setPlayer((prev) => {
        const character = getCharacter(prev.character);
        const boost = prev.boostMinutes > 0 ? 1.5 : 1;
        const gain = Math.round(prev.passiveRate * character.passiveBonus * boost);
        return applyLevelProgress({
          ...prev,
          shards: prev.shards + gain,
          xp: prev.xp + Math.round(gain * 0.45),
        });
      });
    }, PASSIVE_TICK_MS);
    return () => window.clearInterval(passiveTimer);
  }, []);

  const spawnGain = (value: number) => {
    const item = { id: gainIdRef.current++, text: `+${value}` };
    setGains((prev) => [...prev, item]);
    window.setTimeout(() => {
      setGains((prev) => prev.filter((gain) => gain.id !== item.id));
    }, 800);
  };

  const handleTap = () => {
    const now = Date.now();
    if (tapLocked || now - lastTapRef.current < TAP_COOLDOWN_MS || player.energy <= 0) return;

    lastTapRef.current = now;
    setTapLocked(true);

    const critChance = clamp(player.critChance * activeCharacter.critBonus, 8, 50);
    const crit = Math.random() * 100 < critChance ? 1.85 : 1;
    const combo = 1 + clamp(player.combo, 0, 24) * 0.025;
    const boost = player.boostMinutes > 0 ? 1.5 : 1;
    const gain = Math.round(player.tapPower * activeCharacter.tapBonus * crit * combo * boost);

    setPlayer((prev) =>
      applyLevelProgress({
        ...prev,
        shards: prev.shards + gain,
        energy: clamp(prev.energy - 1, 0, prev.maxEnergy),
        combo: clamp(prev.combo + 1, 0, 30),
        xp: prev.xp + Math.round(gain * 0.72),
      })
    );

    spawnGain(gain);
    window.setTimeout(() => setTapLocked(false), TAP_COOLDOWN_MS);
  };

  return (
    <div className="app-shell">
      <div className="ambient ambient-a" />
      <div className="ambient ambient-b" />
      <div className="app-frame">
        <header className="topbar">
          <button className="icon-button" aria-label="Kapat">
            x
          </button>
          <div className="brand-title">
            <img src={logoArt} alt="ADN NEBULA" className="brand-icon" />
            <div>
              <small>Canlı tap evreni</small>
              <strong>ADN NEBULA</strong>
            </div>
          </div>
          <button className="icon-button" aria-label="Menü">
            +
          </button>
        </header>

        <main className="phone-panel">
          <div className="wallet-row">
            <div className="profile-pill">
              <img src={activeCharacter.art} alt={activeCharacter.id} className="profile-avatar" />
              <div>
                <strong>{activeCharacter.id}</strong>
                <small>Seviye {player.level}</small>
              </div>
            </div>
            <div className="header-chip">
              <Gem size={15} />
              <span>{format(player.shards)}</span>
            </div>
          </div>

          <section className="hero-stage">
            <div className="token-title">ADN Token</div>
            <div className="token-value">{format(player.shards)}</div>

            <div className="status-row">
              <div className="status-pill gold">
                <Crown size={14} />
                {player.tapPower} Tap
              </div>
              <div className="status-pill cyan">
                <Zap size={14} />
                {player.passiveRate} Pasif
              </div>
            </div>

            <div className="action-floating left top">
              <Gift size={20} />
              <span>Görevler</span>
            </div>
            <div className="action-floating right top">
              <Trophy size={20} />
              <span>Ligler</span>
            </div>
            <div className="action-floating left bottom">
              <Rocket size={20} />
              <span>Boost</span>
            </div>
            <div className="action-floating right bottom">
              <UserRound size={20} />
              <span>Karakter</span>
            </div>

            <div className="tap-zone">
              {gains.map((gain, index) => (
                <motion.div
                  key={gain.id}
                  className="gain-float"
                  initial={{ opacity: 0, y: 16, scale: 0.9 }}
                  animate={{ opacity: 1, y: -80 - index * 8, scale: 1.03 }}
                  transition={{ duration: 0.75 }}
                >
                  {gain.text}
                </motion.div>
              ))}

              <motion.button
                whileTap={{ scale: 0.97 }}
                className="character-button"
                onClick={handleTap}
                disabled={tapLocked || player.energy <= 0}
              >
                <img src={activeCharacter.art} alt={activeCharacter.id} className="main-character-art" />
              </motion.button>
            </div>

            <div className="energy-pill">
              <Zap size={14} />
              <span>
                {player.energy}/{player.maxEnergy}
              </span>
            </div>
          </section>

          <section className="meter-panel">
            <div className="meter-head">
              <span>Enerji</span>
              <span>{player.energy}/{player.maxEnergy}</span>
            </div>
            <div className="meter-track">
              <div className="meter-fill cyan" style={{ width: `${energyProgress}%` }} />
            </div>

            <div className="meter-head spaced">
              <span>XP</span>
              <span>
                {player.xp}/{xpTarget}
              </span>
            </div>
            <div className="meter-track">
              <div className="meter-fill gold" style={{ width: `${xpProgress}%` }} />
            </div>
          </section>

          <section className="character-strip">
            {characters.map((character) => (
              <button
                key={character.id}
                className={player.character === character.id ? "character-card active" : "character-card"}
                onClick={() => setPlayer((prev) => ({ ...prev, character: character.id }))}
              >
                <img src={character.art} alt={character.id} />
                <strong>{character.id}</strong>
                <span>{character.role}</span>
                <em>{character.perk}</em>
              </button>
            ))}
          </section>
        </main>

        <footer className="bottom-nav">
          <button>
            <Shield size={18} />
            <span>Klan</span>
          </button>
          <button>
            <Sparkles size={18} />
            <span>Şehir</span>
          </button>
          <button className="active">
            <Gem size={18} />
            <span>Ana Sayfa</span>
          </button>
          <button>
            <Gamepad2 size={18} />
            <span>Oyunlar</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
