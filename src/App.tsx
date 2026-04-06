import { useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import {
  BadgeCheck,
  BadgeDollarSign,
  Blocks,
  Bot,
  BrainCircuit,
  Compass,
  FileText,
  Flame,
  Gem,
  HelpCircle,
  Landmark,
  LockKeyhole,
  Rocket,
  Send,
  ShieldCheck,
  Sparkles,
  Store,
  Swords,
  Target,
  Trophy,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import "./App.css";
import adnTokenMark from "../media/adn-token-clean.png";
import adnLionMascot from "../media/adn-lion.png";
import campaignOne from "../media/adn-campaign-01.jpg";
import campaignTwo from "../media/adn-campaign-02.jpg";
import campaignThree from "../media/adn-campaign-03.jpg";
import campaignFour from "../media/adn-campaign-04.jpg";

type PageKey = "overview" | "product" | "economy" | "trust" | "roadmap";

type Metric = {
  label: string;
  value: string;
  note: string;
};

type PopupData = {
  title: string;
  text: string;
  bullets?: string[];
  code?: string;
} | null;

type SectionLink = {
  id: string;
  label: string;
};

type DetailCard = {
  title: string;
  text: string;
  bullets?: string[];
  code?: string;
};

const telegramBotUrl = import.meta.env.VITE_TELEGRAM_BOT_URL ?? "https://t.me/adntoken_bot";

const pages: Array<{ key: PageKey; label: string; caption: string }> = [
  { key: "overview", label: "Overview", caption: "Abstract, thesis, system" },
  { key: "product", label: "Product", caption: "Loop, systems, gameplay" },
  { key: "economy", label: "Economy", caption: "Tokenomics, flow, sinks" },
  { key: "trust", label: "Trust", caption: "Security, contracts, legal" },
  { key: "roadmap", label: "Roadmap", caption: "Launch, growth, vision" },
];

const subnav: Record<PageKey, SectionLink[]> = {
  overview: [
    { id: "overview-thesis", label: "Abstract" },
    { id: "overview-problem", label: "Problem" },
    { id: "overview-architecture", label: "Architecture" },
    { id: "overview-loop", label: "Game Loop" },
  ],
  product: [
    { id: "product-mechanics", label: "Mechanics" },
    { id: "product-systems", label: "Deep Systems" },
    { id: "product-social", label: "Social Engine" },
    { id: "product-utility", label: "Utility" },
  ],
  economy: [
    { id: "economy-tokenomics", label: "Tokenomics" },
    { id: "economy-flow", label: "Flow" },
    { id: "economy-formulas", label: "Formulas" },
    { id: "economy-controls", label: "Controls" },
  ],
  trust: [
    { id: "trust-security", label: "Security" },
    { id: "trust-ai", label: "AI Layer" },
    { id: "trust-contracts", label: "Contracts" },
    { id: "trust-legal", label: "FAQ & Legal" },
  ],
  roadmap: [
    { id: "roadmap-phases", label: "Phases" },
    { id: "roadmap-growth", label: "Growth Plan" },
    { id: "roadmap-metrics", label: "Metrics" },
    { id: "roadmap-vision", label: "Vision" },
  ],
};

const heroMetrics: Metric[] = [
  {
    label: "Category",
    value: "Gamified wealth engine",
    note: "ADN turns simple user input into a progression-based digital economy.",
  },
  {
    label: "Core thesis",
    value: "Retention > Hype",
    note: "The system is built for long-term engagement, not short-term extraction.",
  },
  {
    label: "Supply model",
    value: "1,000,000,000 ADN",
    note: "Flow discipline matters more than headline supply.",
  },
  {
    label: "Growth stack",
    value: "Tap + Social + Commerce",
    note: "Product, community and token utility compound together.",
  },
];

const overviewHighlights: DetailCard[] = [
  {
    title: "Abstract",
    text:
      "ADN is a gamified digital economy designed to transform simple user interaction into long-term value creation through engagement, strategy and participation.",
    bullets: ["Sustainable tokenomics", "Progression-based mechanics", "Behavioral retention systems"],
  },
  {
    title: "Vision",
    text:
      "From Zero to Power means every user begins with almost nothing, then builds wealth, influence and efficiency through upgrades, prestige, social competition and consistency.",
    bullets: ["Not a disposable tap app", "Not a speculative-only token", "A behavior-driven economy engine"],
  },
  {
    title: "Why ADN exists",
    text:
      "Most Web3 tap and play-to-earn models collapse because they optimize extraction before retention. ADN reverses that order and makes progression the center of the economy.",
    bullets: ["Gameplay before click spam", "Economy before inflation", "Retention before hype"],
  },
  {
    title: "Outcome",
    text:
      "The intended result is a self-balancing ecosystem where user effort, strategy, time and social participation turn into compounding in-system power.",
  },
];

const marketProblems: DetailCard[] = [
  { title: "Unsustainable rewards", text: "Most reward models inflate too quickly, damage perceived value and train users to sell immediately." },
  { title: "Shallow gameplay", text: "A repetitive loop with no meaningful progression cannot hold users once novelty fades." },
  { title: "No long-term motivation", text: "Without prestige, status and consequence, users leave after the first farm cycle." },
  { title: "Inflation collapse", text: "If token inflow is greater than sink pressure, the economy eventually breaks under its own emission curve." },
  { title: "Weak retention", text: "The classic pattern is simple: users enter, farm, dump and disappear. ADN is designed to interrupt that pattern." },
];

const solutionPoints: DetailCard[] = [
  { title: "Progression-first design", text: "ADN uses structured progression rather than flat tapping so each loop creates a stronger future state." },
  { title: "Controlled economy", text: "Emission limits, prestige resets, token sinks and anti-whale balancing protect the system from runaway inflation." },
  { title: "Social dominance layer", text: "Clans, leaderboards, resets and invite loops convert passive users into competitive participants." },
  { title: "Behavior-based retention", text: "Daily rewards, events, streaks, missions and unlocks create reasons to return beyond pure farming." },
];

const architectureLayers: DetailCard[] = [
  { title: "Gameplay Layer", text: "Tap mechanics, combo logic, upgrades, unlock paths, prestige and progression systems shape how power is earned." },
  { title: "Economy Layer", text: "Token flow, burn design, emission control, treasury discipline and reward reserve logic stabilize the system." },
  { title: "Social Layer", text: "Clans, referral loops, rankings, seasonal competition and shared goals turn growth into a community engine." },
];

const loopSteps = ["Tap", "Earn", "Upgrade", "Unlock", "Multiply", "Prestige", "Repeat"];

const mechanicCards: DetailCard[] = [
  {
    title: "Tap Reward Engine",
    text: "Base rewards should feel immediate, but the real value comes from upgraded efficiency and an economy-aware multiplier stack.",
    code: "const reward = calculateTapReward(BASE_TAP);",
    bullets: ["Tap generates base income", "Combo rewards active users", "Upgrade bonus rewards investment", "Economy factor protects balance"],
  },
  {
    title: "Chest Drop Layer",
    text: "A small chance of a rare drop introduces anticipation, surprise and return behavior without making the economy uncontrolled.",
    code: "if (Math.random() < 0.1) {\\n  const chest = rollChest();\\n}",
    bullets: ["Creates the maybe a big reward feeling", "Breaks repetitive tapping", "Improves retention and session depth"],
  },
  {
    title: "Prestige Curve",
    text: "Prestige is the core anti-inflation and long-term progression mechanic. Users reset visible progress to gain permanent future strength.",
    code: "const bonus = calculatePrestigeBonus(user.level);",
    bullets: ["Resets short-term progress", "Creates permanent future advantage", "Supports infinite but controlled growth"],
  },
];

const deepSystems: DetailCard[] = [
  { title: "Combo System", text: "Consecutive active actions raise the multiplier and reward players who stay engaged instead of tapping once and leaving." },
  { title: "Loot / Chest Economy", text: "Reward randomness is exciting only when expected value remains disciplined. ADN keeps chest value below cost over time." },
  { title: "Clan Wars", text: "Users stop behaving like isolated tappers and start acting like factions competing for status, rewards and visibility." },
  { title: "Leaderboards", text: "Seasonal ranking resets create ego pressure, urgency and a public reason to return, improve and defend position." },
  { title: "AI Tasks", text: "Dynamic task generation keeps gameplay fresh and allows individualized engagement paths instead of static mission spam." },
  { title: "Referral Multiplier", text: "Invite -> bonus -> faster progress -> stronger status -> more invite becomes a built-in viral growth machine." },
  { title: "Dynamic Events", text: "Limited-time windows, short multipliers and weekly resets create FOMO without turning the economy into chaos." },
  { title: "Retention Ladder", text: "Daily rewards, streak logic, unlock thresholds and social pressure all stack into a durable return loop." },
];

const utilityCards: DetailCard[] = [
  { title: "Tap to Earn", text: "Tapping is the entry point, not the full product. ADN uses taps to introduce progression, efficiency upgrades and future earning power.", bullets: ["Base income generation", "Combo and streak interaction", "Upgrade and prestige dependence"] },
  { title: "Airdrop", text: "Airdrop distribution is tied to contribution quality, not just raw presence. Real activity, streak quality and social value matter.", bullets: ["Task completion score", "Referral quality", "Clan contribution", "Bot filtering"] },
  { title: "Digital Commerce", text: "Marketplace activity, premium event access, merchant rewards and store discounts convert engagement into visible commerce utility.", bullets: ["Marketplace transactions", "Event access", "Merchant reward links", "Store and cashback mechanics"] },
];

const socialEngine: DetailCard[] = [
  { title: "Viral Loop", text: "Invite -> bonus -> faster progress -> competitive edge -> more invite. ADN is designed to spread through motivated players, not only paid traffic." },
  { title: "Social Dominance", text: "Weekly resets, clan wars and top-tier rewards convert the game from a reward toy into a status arena." },
  { title: "Revenue Engine", text: "Boosters, passes, chests, premium access and special clan perks are built around pay-to-progress rather than pay-to-win." },
  { title: "FOMO Engine", text: "Short events, time-boxed multipliers and limited opportunities increase return frequency and emotional urgency." },
];

const allocation = [
  { label: "Play & Earn Pool", value: "35%", note: "Player rewards and progression reserve" },
  { label: "Ecosystem / Treasury", value: "20%", note: "System balance, reserve and operational control" },
  { label: "Team", value: "15%", note: "Locked allocation with vesting discipline" },
  { label: "Investors", value: "10%", note: "Seed and private allocation with release control" },
  { label: "Marketing & Growth", value: "10%", note: "Acquisition, campaigns and launch support" },
  { label: "Partnerships", value: "5%", note: "Strategic partners and business development" },
  { label: "Liquidity", value: "5%", note: "Exchange and liquidity deployment" },
];

const vestingCards: DetailCard[] = [
  { title: "Team Vesting", text: "12 month cliff plus 24 month vesting is designed to minimize dump risk and align long-term execution incentives." },
  { title: "Investor Vesting", text: "10% TGE and 12 month vesting creates access while maintaining post-launch discipline." },
  { title: "Advisor / Partner Vesting", text: "Structured release helps strategic support without introducing sudden supply shock." },
];

const tokenFlowIn = ["Tap rewards", "Event rewards", "Clan rewards", "Referral incentives"];
const tokenFlowOut = ["Upgrades", "Prestige unlocks", "Loot / chest", "Marketplace fee", "Event entry", "Clan war registration"];

const formulaCards: DetailCard[] = [
  {
    title: "Core earn formula",
    text: "The real ADN model blends activity, investment and system balance into one reward expression.",
    code: "earn = (tap_power * combo_multiplier * upgrade_bonus) * economy_factor",
    bullets: ["tap_power = base earning capability", "combo_multiplier = active player premium", "upgrade_bonus = return on investment", "economy_factor = anti-collapse balancing variable"],
  },
  {
    title: "Economy factor",
    text: "The economy factor is a dynamic control layer between 0.3 and 1.2. When inflation pressure rises, rewards compress; when the system is healthy, rewards expand.",
    code: "economy_factor = dynamic(0.3 -> 1.2)",
  },
  {
    title: "Prestige bonus",
    text: "Prestige converts lifetime output into permanent future strength, letting the product grow while keeping inflation lower than naive linear loops.",
    code: "prestige_bonus = sqrt(total_earned)",
  },
  {
    title: "Clan bonus",
    text: "Clan benefit is designed with logarithmic scaling so large groups still gain value without creating whale abuse or runaway advantage.",
    code: "clan_bonus = log(total_clan_points)",
  },
  {
    title: "Daily emission ceiling",
    text: "Daily emission is capped and then adapted by active users, burn rate and spending ratio. Supply control is an explicit system rule, not a vague promise.",
    code: "daily_emission <= total_supply * 0.5%",
  },
];

const controlCards: DetailCard[] = [
  { title: "Burn mechanisms", text: "Prestige unlocks, loot boxes, marketplace fees, premium events and clan registration can route portions of spend into permanent burn." },
  { title: "Anti-whale logic", text: "Diminishing returns, soft caps and progressive tax reduce the ability of large users to distort the reward surface." },
  { title: "Retention economy", text: "Daily streak rewards, limited event multipliers and weekly competition create healthy reasons to return without endless emissions." },
  { title: "Loot discipline", text: "Chest design follows the rule expected_value < cost so the system wins long term while players still feel the thrill of upside." },
  { title: "Treasury reserve", text: "Reward distribution should come from reserve logic and emission control, not uncontrolled token minting inside gameplay functions." },
  { title: "Flow principle", text: "The most important rule is simple: token entering the system as rewards must stay below token leaving through sinks over time." },
];

const trustCards: DetailCard[] = [
  { title: "Anti-cheat layer", text: "Behavior analysis, cooldowns, signer validation and abnormal pattern detection protect claim flows and reward integrity." },
  { title: "Captcha and human checks", text: "A visible verification layer filters automated abuse and raises trust around airdrop and reward distribution." },
  { title: "Fair reward routing", text: "Replay-protected reward IDs, approved modules and emission limits stop uncontrolled distribution behavior." },
  { title: "Transparent control", text: "Critical admin actions should sit behind multisig and timelock so changes are visible before execution." },
  { title: "Reserve discipline", text: "Treasury logic should separate token custody, reward release and burn routing so the economy stays auditable." },
  { title: "Emergency response", text: "Pause controls allow fast containment if an exploit, oracle issue or reward bug appears in production." },
];

const aiCards: DetailCard[] = [
  { title: "Dynamic task generation", text: "Adaptive missions increase content depth and reduce repetitive behavior loops." },
  { title: "Economy balancing", text: "AI can react to active user count, spend ratio and burn rate to protect the system from imbalance." },
  { title: "Behavior anomaly detection", text: "Suspicious reward patterns, abnormal claim timing and bot-like interaction signatures can be flagged early." },
  { title: "Personalized progression", text: "Different users can receive different task intensity, unlock pacing and activity prompts." },
];

const contractCards: DetailCard[] = [
  {
    title: "ADNToken.sol",
    text: "The ERC-20 core should stay simple, auditable and role-driven. It should manage balances, transfers, burn, capped supply, pause and authorized mint flows.",
    bullets: ["ERC20", "ERC20Capped", "ERC20Burnable", "ERC20Pausable", "AccessControl", "MAX_SUPPLY = 1_000_000_000 * 1e18"],
  },
  {
    title: "ADNTreasury.sol",
    text: "Treasury is the economy layer. It should hold reward reserve, emission limits, approved game modules and burn / fee split logic.",
    bullets: ["dailyEmissionLimit", "approvedModules", "usedRewardIds", "burn sink", "fee collector"],
  },
  {
    title: "Reward Modules",
    text: "Tap, event, clan and referral modules should validate claims, apply cooldowns and forward approved reward distributions to treasury.",
    bullets: ["TapRewardModule", "EventRewardModule", "ClanRewardModule", "ReferralRewardModule", "Signature-based claim flow"],
  },
  {
    title: "VestingWallets",
    text: "Team, investor, advisor and partner allocations should never be released as free-floating wallets at genesis. Structured vesting is mandatory.",
    bullets: ["Team vesting", "Investor vesting", "Advisor vesting", "Partner vesting"],
  },
  {
    title: "TimelockController",
    text: "High-sensitivity operations should sit behind timelock so parameter updates and role changes are visible before execution.",
    bullets: ["Mint role changes", "Treasury parameter updates", "Module whitelist changes", "Reserve movements"],
  },
];

const deploySteps = [
  "Create multisig",
  "Deploy TimelockController",
  "Deploy ADNToken",
  "Deploy ADNTreasury",
  "Grant treasury and pause roles",
  "Deploy reward modules",
  "Approve modules in treasury",
  "Deploy vesting wallets",
  "Mint genesis allocations",
  "Transfer admin to multisig / timelock",
  "Revoke deployer powers",
];

const checklist = [
  "Cap enforcement test",
  "Pause / unpause test",
  "Replay attack protection test",
  "Duplicate rewardId rejection",
  "Vesting release test",
  "Role escalation test",
  "Treasury spend split test",
  "Signer and backend rate-limit review",
];

const faqItems = [
  {
    question: "Is ADN a speculative token only?",
    answer: "No. The token is positioned as an asset layer inside a broader gameplay, reward and commerce system. Utility and flow matter more than short-term speculation.",
  },
  {
    question: "Why does ADN use prestige?",
    answer: "Prestige is a retention and inflation-control mechanism. It preserves growth fantasy while preventing purely linear reward inflation.",
  },
  {
    question: "Why is emission control so important?",
    answer: "Because most failures in the category happen when distribution is larger than sustainable sink pressure. ADN explicitly controls that balance.",
  },
  {
    question: "How does ADN reduce dump risk?",
    answer: "Through vesting discipline, treasury control, controlled emission, sink design, progression friction and anti-whale logic.",
  },
];

const roadmapPhases: DetailCard[] = [
  { title: "Phase 1 - Core Launch", text: "Tap system, basic upgrades, wallet integration and first retention loop." },
  { title: "Phase 2 - Economy Layer", text: "Token launch, marketplace logic, burn mechanisms and reserve-based distribution." },
  { title: "Phase 3 - Social Expansion", text: "Clan system, leaderboards, referral network and seasonal competition." },
  { title: "Phase 4 - Advanced Systems", text: "AI tasks, adaptive balancing, events engine and competitive modes." },
];

const growthPlan: DetailCard[] = [
  { title: "Closed beta", text: "Start with a focused 1k to 5k user base, gather data, tune balance and stabilize the core system." },
  { title: "Viral drop", text: "Use invite-only access, codes and social status to create scarcity and controlled FOMO." },
  { title: "Explosion stage", text: "Layer in influencer push, events, leaderboards and reset-driven competition after balance is proven." },
  { title: "Influencer stack", text: "Prefer many smaller, more authentic creators over a few large but expensive accounts." },
];

const metricCards: DetailCard[] = [
  { title: "D1 retention", text: "Target above 40% to prove users return after first contact." },
  { title: "D7 retention", text: "Target above 20% to show ADN keeps users beyond launch curiosity." },
  { title: "Viral coefficient", text: "Target above 1 through invite bonuses, clan pressure and leaderboard ego loops." },
  { title: "Session depth", text: "Track session time, combo behavior, prestige frequency and event participation." },
  { title: "Revenue per user", text: "Show monetization quality through boosters, premium access, chests and progression offers." },
  { title: "DAU / MAU", text: "Investors care about usage quality and repeat behavior more than a one-day spike." },
];

const whyAdnWins: DetailCard[] = [
  { title: "Deeper than hype competitors", text: "ADN positions itself as a system with progression, retention and social power rather than a shallow click trend." },
  { title: "Real economy logic", text: "Flow, sinks, reserve control, prestige and anti-whale logic create a stronger foundation than naive emissions." },
  { title: "Organic growth engine", text: "Referral pressure, clans, leaderboards and event rhythm make growth part of the product itself." },
  { title: "Investor-ready framing", text: "The story is not token launch first. The story is traction, retention, monetization and scalable systems." },
];

function SectionBadge({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <span className="section-badge">
      <span className="section-badge-icon">{icon}</span>
      <span>{label}</span>
    </span>
  );
}

function SectionHeader({
  icon,
  label,
  title,
  text,
}: {
  icon: ReactNode;
  label: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="section-header">
      <SectionBadge icon={icon} label={label} />
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState<PageKey>("overview");
  const [showIntro, setShowIntro] = useState(true);
  const [popup, setPopup] = useState<PopupData>(null);
  const [progress, setProgress] = useState(0);
  const [heroLight, setHeroLight] = useState({ x: 70, y: 28 });

  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      const ratio = total <= 0 ? 0 : (window.scrollY / total) * 100;
      setProgress(Math.min(100, Math.max(0, ratio)));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>(".reveal-on-scroll"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.16 }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [activePage]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activePage]);

  const openPopup = (card: DetailCard) => setPopup(card);

  const jumpTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const heroStyle = {
    "--hero-light-x": `${heroLight.x}%`,
    "--hero-light-y": `${heroLight.y}%`,
  } as CSSProperties;

  return (
    <div className="landing-shell">
      <div className="scroll-progress">
        <span style={{ width: `${progress}%` }} />
      </div>
      <div className="page-glow page-glow-left" />
      <div className="page-glow page-glow-right" />

      <div className={`entrance-overlay ${showIntro ? "visible" : ""}`}>
        <div className={`entrance-modal ${showIntro ? "visible" : ""}`}>
          <button type="button" className="entrance-close" onClick={() => setShowIntro(false)} aria-label="Close">
            ×
          </button>
          <div className="entrance-copy">
            <SectionBadge icon={<Sparkles size={14} />} label="Live launch signal" />
            <h2>ADN Token opens with a cleaner, shorter and investor-facing product story.</h2>
            <p>
              ADN is positioned as a progression economy where users start from zero, build power, compete socially and
              stay inside a sustainable token flow instead of farming once and leaving.
            </p>
            <p className="entrance-note">Read the opening, close the panel and continue into the site.</p>
          </div>
          <div className="entrance-visual">
            <span className="entrance-ring entrance-ring-one" />
            <span className="entrance-ring entrance-ring-two" />
            <img src={adnLionMascot} alt="ADN mascot" className="entrance-mascot" />
          </div>
        </div>
      </div>

      <div className={`detail-overlay ${popup ? "visible" : ""}`} onClick={() => setPopup(null)}>
        <div className={`detail-modal ${popup ? "visible" : ""}`} onClick={(event) => event.stopPropagation()}>
          <button type="button" className="detail-close" onClick={() => setPopup(null)} aria-label="Close">
            ×
          </button>
          {popup ? (
            <>
              <SectionBadge icon={<Sparkles size={14} />} label="Detail" />
              <h3>{popup.title}</h3>
              <p>{popup.text}</p>
              {popup.code ? <pre>{popup.code}</pre> : null}
              {popup.bullets ? (
                <ul className="clean-list">
                  {popup.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </>
          ) : null}
        </div>
      </div>

      <header className="topbar-shell">
        <div className="topbar">
          <div className="brand">
            <img src={adnTokenMark} alt="ADN Token emblem" className="brand-mark" />
            <div className="brand-copy">
              <strong>ADN Token</strong>
              <span>From Zero to Power</span>
            </div>
          </div>
          <div className="topbar-right">
            <nav className="topnav" aria-label="Page navigation">
              {pages.map((page) => (
                <button
                  key={page.key}
                  type="button"
                  className={`topnav-btn ${activePage === page.key ? "active" : ""}`}
                  onClick={() => setActivePage(page.key)}
                >
                  <strong>{page.label}</strong>
                  <span>{page.caption}</span>
                </button>
              ))}
            </nav>
            <a href={telegramBotUrl} target="_blank" rel="noreferrer" className="topbar-cta">
              <Send size={16} />
              <span>Telegram Bot</span>
            </a>
          </div>
        </div>
      </header>

      <main className="page">
        <section
          className="hero reveal-on-scroll"
          style={heroStyle}
          onMouseMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 100;
            const y = ((event.clientY - rect.top) / rect.height) * 100;
            setHeroLight({ x, y });
          }}
        >
          <div className="hero-copy">
            <SectionBadge icon={<BadgeDollarSign size={14} />} label="Official Lite Paper" />
            <h1>ADN - From Zero to Power</h1>
            <p>
              A gamified economic engine where users build, compound and control value through progression, strategy and
              on-chain systems.
            </p>
            <div className="hero-badges">
              <span>Tap to Earn</span>
              <span>Airdrop</span>
              <span>Digital Commerce</span>
              <span>Prestige Engine</span>
            </div>
            <div className="hero-actions">
              <a href={telegramBotUrl} target="_blank" rel="noreferrer" className="cta-btn primary">
                <Send size={18} />
                <span>Start Building Power</span>
              </a>
              <button type="button" className="cta-btn secondary" onClick={() => setActivePage("economy")}>
                <BadgeDollarSign size={18} />
                <span>View Litepaper</span>
              </button>
              <button type="button" className="cta-btn ghost" onClick={() => setShowIntro(true)}>
                <Sparkles size={18} />
                <span>Open Launch Intro</span>
              </button>
            </div>
            <div className="metric-grid hero-metrics">
              {heroMetrics.map((item) => (
                <article className="glass-card compact" key={item.label}>
                  <span className="eyebrow">{item.label}</span>
                  <strong>{item.value}</strong>
                  <p>{item.note}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="hero-stage">
            <div className="hero-stage-inner">
              <div className="hero-poster">
                <img src={campaignOne} alt="ADN launch artwork" className="hero-poster-image" />
                <img src={adnLionMascot} alt="ADN Tap to Earn mascot" className="hero-mascot" />
                <div className="hero-stage-copy">
                  <span>Launch 2026</span>
                  <strong>Community-led growth</strong>
                  <p>Product, token flow, visibility and trust are designed to move together.</p>
                </div>
              </div>
              <div className="hero-facts">
                <article className="fact-card">
                  <span>Core loop</span>
                  <strong>{"Tap -> Earn -> Upgrade -> Prestige"}</strong>
                </article>
                <article className="fact-card">
                  <span>Utility surface</span>
                  <strong>Upgrades, events, commerce, clan economy</strong>
                </article>
                <article className="fact-card">
                  <span>Economic shield</span>
                  <strong>Emission control, burn, anti-whale logic</strong>
                </article>
                <article className="fact-card">
                  <span>Growth engine</span>
                  <strong>Referral, clan pressure, resets, FOMO events</strong>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="page-nav reveal-on-scroll">
          <div className="page-tab-list">
            {pages.map((page) => (
              <button
                key={page.key}
                type="button"
                className={`page-tab ${activePage === page.key ? "active" : ""}`}
                onClick={() => setActivePage(page.key)}
              >
                <strong>{page.label}</strong>
                <span>{page.caption}</span>
              </button>
            ))}
          </div>
          <div className="subnav">
            {subnav[activePage].map((item) => (
              <button key={item.id} type="button" className="subnav-btn" onClick={() => jumpTo(item.id)}>
                {item.label}
              </button>
            ))}
          </div>
        </section>

        {activePage === "overview" ? (
          <div className="page-stack">
            <section id="overview-thesis" className="section-block reveal-on-scroll">
              <SectionHeader
                icon={<Sparkles size={16} />}
                label="Abstract"
                title="ADN is a self-balancing digital economy that uses progression to create long-term value."
                text="Instead of treating token rewards as the product, ADN treats rewards as one layer inside a broader system that includes behavior design, status loops, utility and social pressure."
              />
              <div className="insight-grid">
                {overviewHighlights.map((item) => (
                  <button key={item.title} type="button" className="glass-card popup-card" onClick={() => openPopup(item)}>
                    <span className="insight-value">{item.title}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </button>
                ))}
              </div>
            </section>

            <section id="overview-problem" className="section-block reveal-on-scroll">
              <div className="split-grid">
                <article className="glass-card">
                  <SectionHeader
                    icon={<Target size={16} />}
                    label="Problem"
                    title="Most tap-to-earn systems fail because they are built for extraction, not retention."
                    text="The market repeatedly proves the same failure pattern: inflation rises, gameplay stays shallow, social status remains weak and the user base leaves after initial hype."
                  />
                  <div className="mini-grid">
                    {marketProblems.map((item) => (
                      <button key={item.title} type="button" className="mini-card popup-card" onClick={() => openPopup(item)}>
                        <strong>{item.title}</strong>
                        <p>{item.text}</p>
                      </button>
                    ))}
                  </div>
                </article>
                <article className="glass-card">
                  <SectionHeader
                    icon={<Gem size={16} />}
                    label="Solution"
                    title="ADN replaces short-term farming logic with a progression economy."
                    text="The system connects game design, economic discipline and behavioral psychology so that effort, strategy and time create compounding advantage."
                  />
                  <div className="mini-grid">
                    {solutionPoints.map((item) => (
                      <button key={item.title} type="button" className="mini-card popup-card" onClick={() => openPopup(item)}>
                        <strong>{item.title}</strong>
                        <p>{item.text}</p>
                      </button>
                    ))}
                  </div>
                </article>
              </div>
            </section>

            <section id="overview-architecture" className="section-block reveal-on-scroll">
              <SectionHeader
                icon={<Blocks size={16} />}
                label="System architecture"
                title="Three layers hold the ADN model together."
                text="Gameplay, economy and social structures are separated so that the product can evolve without collapsing the core asset layer."
              />
              <div className="system-grid">
                {architectureLayers.map((item, index) => (
                  <button key={item.title} type="button" className="glass-card popup-card" onClick={() => openPopup(item)}>
                    <span className="system-index">0{index + 1}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </button>
                ))}
              </div>
            </section>

            <section id="overview-loop" className="section-block reveal-on-scroll">
              <SectionHeader
                icon={<Zap size={16} />}
                label="Core game loop"
                title="Tap -> Earn -> Upgrade -> Unlock -> Multiply -> Prestige -> Repeat"
                text="This loop is designed to feel simple on day one and strategically deep over time. Early game is accessible, mid game expands and late game rewards mastery."
              />
              <div className="loop-board">
                {loopSteps.map((step, index) => (
                  <div key={step} className="loop-step">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{step}</strong>
                  </div>
                ))}
              </div>
            </section>
          </div>
        ) : null}

        {activePage === "product" ? (
          <div className="page-stack">
            <section id="product-mechanics" className="section-block reveal-on-scroll">
              <SectionHeader
                icon={<Flame size={16} />}
                label="Core mechanics"
                title="ADN makes tapping deeper by adding reward variance, progression friction and prestige resets."
                text="The objective is to create an addictive but disciplined loop where growth feels real and repeated sessions feel justified."
              />
              <div className="metric-grid">
                {mechanicCards.map((item) => (
                  <button key={item.title} type="button" className="glass-card popup-card" onClick={() => openPopup(item)}>
                    <h3>{item.title}</h3>
                    {item.code ? <pre className="inline-code">{item.code}</pre> : null}
                    <p>{item.text}</p>
                  </button>
                ))}
              </div>
            </section>

            <section id="product-systems" className="section-block reveal-on-scroll">
              <div className="split-grid">
                <article className="glass-card">
                  <SectionHeader
                    icon={<Swords size={16} />}
                    label="Deep systems"
                    title="Retention comes from layered systems, not from tapping alone."
                    text="Each subsystem exists to increase depth, session quality, return motivation and social pressure."
                  />
                  <div className="mini-grid">
                    {deepSystems.map((item) => (
                      <button key={item.title} type="button" className="mini-card popup-card" onClick={() => openPopup(item)}>
                        <strong>{item.title}</strong>
                        <p>{item.text}</p>
                      </button>
                    ))}
                  </div>
                </article>
                <div className="visual-poster">
                  <img src={campaignThree} alt="ADN feature artwork" />
                </div>
              </div>
            </section>

            <section id="product-social" className="section-block reveal-on-scroll">
              <SectionHeader
                icon={<Users size={16} />}
                label="Social and viral engine"
                title="Distribution plus retention is the real growth strategy."
                text="The ADN stack is designed for Telegram and mobile web app distribution, where low friction and strong social proof can create fast loops."
              />
              <div className="insight-grid">
                {socialEngine.map((item) => (
                  <button key={item.title} type="button" className="glass-card popup-card" onClick={() => openPopup(item)}>
                    <span className="insight-value">Growth</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </button>
                ))}
              </div>
            </section>

            <section id="product-utility" className="section-block reveal-on-scroll">
              <SectionHeader
                icon={<Store size={16} />}
                label="Product surfaces"
                title="Tap to Earn, Airdrop and Digital Commerce are visible, connected and utility-driven."
              />
              <div className="usecase-grid">
                {utilityCards.map((item) => (
                  <button key={item.title} type="button" className="glass-card popup-card" onClick={() => openPopup(item)}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    {item.bullets ? (
                      <ul className="card-list">
                        {item.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    ) : null}
                  </button>
                ))}
              </div>
            </section>
          </div>
        ) : null}

        {activePage === "economy" ? (
          <div className="page-stack">
            <section id="economy-tokenomics" className="section-block reveal-on-scroll">
              <SectionHeader
                icon={<BadgeDollarSign size={16} />}
                label="Tokenomics"
                title="Total supply is fixed at 1,000,000,000 ADN, but the real priority is flow discipline."
                text="What matters is not only the headline number. What matters is how rewards enter, how sinks remove pressure and how treasury logic keeps the system stable."
              />
              <div className="allocation-board">
                {allocation.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    className="allocation-row popup-card"
                    onClick={() => openPopup({ title: `${item.label} ${item.value}`, text: item.note })}
                  >
                    <div className="allocation-meta">
                      <strong>{item.label}</strong>
                      <span>{item.note}</span>
                    </div>
                    <b>{item.value}</b>
                  </button>
                ))}
              </div>
              <div className="metric-grid">
                {vestingCards.map((item) => (
                  <button key={item.title} type="button" className="glass-card compact popup-card" onClick={() => openPopup(item)}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </button>
                ))}
              </div>
            </section>

            <section id="economy-flow" className="section-block reveal-on-scroll">
              <div className="split-grid">
                <article className="glass-card">
                  <SectionHeader icon={<Wallet size={16} />} label="Token enters" title="Reward distribution must stay controlled and measurable." />
                  <ul className="clean-list">
                    {tokenFlowIn.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
                <article className="glass-card">
                  <SectionHeader icon={<Flame size={16} />} label="Token exits" title="Sinks are the economic shield that protects ADN from collapse." />
                  <ul className="clean-list">
                    {tokenFlowOut.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              </div>
              <div className="rule-banner">
                <strong>Golden rule</strong>
                <p>Token entering the system as reward must remain lower than token leaving the system through sinks over time.</p>
              </div>
            </section>

            <section id="economy-formulas" className="section-block reveal-on-scroll">
              <SectionHeader
                icon={<Landmark size={16} />}
                label="Core economy model"
                title="The ADN economy is designed around formulas, limits and balancing levers rather than vague promises."
              />
              <div className="metric-grid">
                {formulaCards.map((item) => (
                  <button key={item.title} type="button" className="glass-card popup-card" onClick={() => openPopup(item)}>
                    <h3>{item.title}</h3>
                    {item.code ? <pre className="inline-code">{item.code}</pre> : null}
                    <p>{item.text}</p>
                  </button>
                ))}
              </div>
            </section>

            <section id="economy-controls" className="section-block reveal-on-scroll">
              <SectionHeader icon={<ShieldCheck size={16} />} label="Control systems" title="ADN treats sustainability as a design rule, not a marketing phrase." />
              <div className="insight-grid">
                {controlCards.map((item) => (
                  <button key={item.title} type="button" className="glass-card popup-card" onClick={() => openPopup(item)}>
                    <span className="insight-value">Control</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </button>
                ))}
              </div>
            </section>
          </div>
        ) : null}

        {activePage === "trust" ? (
          <div className="page-stack">
            <section id="trust-security" className="section-block reveal-on-scroll">
              <SectionHeader
                icon={<ShieldCheck size={16} />}
                label="Security and fairness"
                title="Security, verification and operational transparency are part of the product story."
                text="Trust is built through visible controls, measured distribution and clear governance layers."
              />
              <div className="security-grid">
                {trustCards.map((item) => (
                  <button key={item.title} type="button" className="security-card popup-card" onClick={() => openPopup(item)}>
                    <span className="security-icon">
                      <ShieldCheck size={18} />
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </button>
                ))}
              </div>

              <div className="split-grid trust-panels">
                <article className="glass-card captcha-panel">
                  <SectionHeader
                    icon={<LockKeyhole size={16} />}
                    label="Captcha verification"
                    title="Human verification is visible and product-facing."
                    text="Verification should reduce bot pressure, protect claims and improve confidence around airdrop participation."
                  />
                  <div className="captcha-window">
                    <div className="captcha-head">
                      <span>Security check</span>
                      <BadgeCheck size={18} />
                    </div>
                    <div className="captcha-body">
                      <div className="captcha-box checked">
                        <span className="captcha-tick">✓</span>
                        <strong>Human verification complete</strong>
                      </div>
                      <div className="captcha-meta">
                        <span>Captcha score</span>
                        <strong>98 / 100</strong>
                      </div>
                      <div className="captcha-meta">
                        <span>Risk level</span>
                        <strong>Low</strong>
                      </div>
                    </div>
                  </div>
                </article>
                <article className="glass-card">
                  <SectionHeader
                    icon={<Bot size={16} />}
                    label="Verification stack"
                    title="Trust should feel operational, not theoretical."
                    text="ADN combines visible verification with deeper control logic around claims, emissions and approvals."
                  />
                  <div className="mini-grid">
                    <div className="mini-card">
                      <strong>Reward ID protection</strong>
                      <p>Replay-safe reward routing prevents duplicate claim behavior.</p>
                    </div>
                    <div className="mini-card">
                      <strong>Approved modules</strong>
                      <p>Only authorized modules can distribute from treasury logic.</p>
                    </div>
                    <div className="mini-card">
                      <strong>Emission ceilings</strong>
                      <p>Daily limits stop runaway distribution even during heavy activity.</p>
                    </div>
                    <div className="mini-card">
                      <strong>Multisig governance</strong>
                      <p>Critical actions should not stay in a single wallet.</p>
                    </div>
                  </div>
                </article>
              </div>
            </section>

            <section id="trust-ai" className="section-block reveal-on-scroll">
              <div className="split-grid">
                <article className="glass-card">
                  <SectionHeader icon={<BrainCircuit size={16} />} label="AI layer" title="AI supports mission depth, balance control and abnormal behavior detection." />
                  <div className="mini-grid">
                    {aiCards.map((item) => (
                      <button key={item.title} type="button" className="mini-card popup-card" onClick={() => openPopup(item)}>
                        <strong>{item.title}</strong>
                        <p>{item.text}</p>
                      </button>
                    ))}
                  </div>
                </article>
                <div className="visual-poster">
                  <img src={campaignFour} alt="ADN ecosystem artwork" />
                </div>
              </div>
            </section>

            <section id="trust-contracts" className="section-block reveal-on-scroll">
              <SectionHeader
                icon={<FileText size={16} />}
                label="Smart contract architecture"
                title="ADN should separate asset layer, economy layer, progression layer and trust layer."
                text="The objective is simple: keep the token core clean, move reward logic into treasury modules and place critical governance behind timelock."
              />
              <div className="usecase-grid">
                {contractCards.map((item) => (
                  <button key={item.title} type="button" className="glass-card popup-card" onClick={() => openPopup(item)}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    {item.bullets ? (
                      <ul className="card-list">
                        {item.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    ) : null}
                  </button>
                ))}
              </div>
              <div className="split-grid">
                <article className="glass-card">
                  <SectionHeader icon={<Rocket size={16} />} label="Deploy order" title="Suggested deployment sequence" />
                  <ol className="ordered-list">
                    {deploySteps.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </article>
                <article className="glass-card">
                  <SectionHeader icon={<BadgeCheck size={16} />} label="Audit checklist" title="Pre-audit validation points" />
                  <ul className="clean-list">
                    {checklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              </div>
            </section>

            <section id="trust-legal" className="section-block reveal-on-scroll">
              <div className="split-grid">
                <article className="glass-card">
                  <SectionHeader icon={<HelpCircle size={16} />} label="FAQ" title="Key questions around utility and sustainability" />
                  <div className="faq-list">
                    {faqItems.map((item) => (
                      <details className="faq-item" key={item.question}>
                        <summary>{item.question}</summary>
                        <p>{item.answer}</p>
                      </details>
                    ))}
                  </div>
                </article>
                <article className="glass-card legal-stack">
                  <SectionHeader
                    icon={<FileText size={16} />}
                    label="Legal and privacy"
                    title="Legal disclaimer and privacy statement"
                    text="This lite paper is presented for informational and promotional purposes. Final legal, technical and operational terms should be confirmed through official documentation."
                  />
                  <div className="legal-box">
                    <strong>Privacy statement</strong>
                    <p>ADN should collect only required operational data, use verification layers to protect reward integrity and keep sensitive admin operations behind transparent governance controls.</p>
                  </div>
                  <div className="legal-box compact-legal">
                    <strong>ADN Token 2026</strong>
                    <p>(c) 2026 ADN Token. All rights reserved.</p>
                  </div>
                </article>
              </div>
            </section>
          </div>
        ) : null}

        {activePage === "roadmap" ? (
          <div className="page-stack">
            <section id="roadmap-phases" className="section-block reveal-on-scroll">
              <SectionHeader
                icon={<Rocket size={16} />}
                label="Roadmap"
                title="ADN scales in four clear phases."
                text="Each phase extends the product from core loop to full economy to social systems and then advanced adaptive infrastructure."
              />
              <div className="roadmap-grid">
                {roadmapPhases.map((item, index) => (
                  <button key={item.title} type="button" className="roadmap-card popup-card" onClick={() => openPopup(item)}>
                    <span className="roadmap-phase">0{index + 1}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </button>
                ))}
              </div>
            </section>

            <section id="roadmap-growth" className="section-block reveal-on-scroll">
              <div className="split-grid">
                <article className="glass-card">
                  <SectionHeader icon={<Users size={16} />} label="Growth strategy" title="The growth plan is built around distribution, FOMO and competition." />
                  <div className="mini-grid">
                    {growthPlan.map((item) => (
                      <button key={item.title} type="button" className="mini-card popup-card" onClick={() => openPopup(item)}>
                        <strong>{item.title}</strong>
                        <p>{item.text}</p>
                      </button>
                    ))}
                  </div>
                </article>
                <div className="visual-poster">
                  <img src={campaignTwo} alt="ADN launch campaign art" />
                </div>
              </div>
            </section>

            <section id="roadmap-metrics" className="section-block reveal-on-scroll">
              <SectionHeader
                icon={<Trophy size={16} />}
                label="Metrics and investor signals"
                title="Traction is sold through retention, monetization and usage quality."
                text="Investors want to see user growth, stickiness, session depth and monetization quality rather than a one-day token spike."
              />
              <div className="insight-grid">
                {metricCards.map((item) => (
                  <button key={item.title} type="button" className="glass-card popup-card" onClick={() => openPopup(item)}>
                    <span className="insight-value">Metric</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </button>
                ))}
              </div>
            </section>

            <section id="roadmap-vision" className="section-block reveal-on-scroll cta-shell">
              <div className="cta-copy">
                <SectionHeader
                  icon={<Compass size={16} />}
                  label="Final vision"
                  title="ADN is not a basic tap app and not a speculative shell. It is a long-term digital economy."
                  text="The final positioning combines addictive gameplay, controlled economics, social virality and a credible trust layer for users, partners and investors."
                />
                <div className="insight-grid">
                  {whyAdnWins.map((item) => (
                    <button key={item.title} type="button" className="glass-card popup-card" onClick={() => openPopup(item)}>
                      <span className="insight-value">ADN</span>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </button>
                  ))}
                </div>
                <div className="hero-actions">
                  <a href={telegramBotUrl} target="_blank" rel="noreferrer" className="cta-btn primary">
                    <Send size={18} />
                    <span>Open Telegram Bot</span>
                  </a>
                  <button type="button" className="cta-btn secondary" onClick={() => setActivePage("trust")}>
                    <FileText size={18} />
                    <span>View Contract Layer</span>
                  </button>
                </div>
              </div>
              <div className="cta-side">
                <article className="glass-card callout-card">
                  <SectionBadge icon={<Landmark size={14} />} label="Market + ask" />
                  <h3>Funding, strategic partnerships and exchange readiness</h3>
                  <p>ADN is positioned to bridge mobile gaming scale with Web3 economy depth. The ask is built around scaling, partnerships, liquidity preparation and distribution acceleration.</p>
                  <ul className="clean-list">
                    <li>Mobile gaming is a massive market with proven session behavior</li>
                    <li>Telegram Mini App reduces onboarding friction</li>
                    <li>ADN aims to combine retention, monetization and social virality</li>
                  </ul>
                </article>
              </div>
            </section>
          </div>
        ) : null}
      </main>

      <footer className="footer">
        <div className="footer-card">
          <div className="footer-brand">
            <img src={adnTokenMark} alt="ADN Token emblem" />
            <div className="footer-brand-copy">
              <strong>ADN Token</strong>
              <span>Lite Paper 2026</span>
            </div>
          </div>
          <div className="footer-copy">
            <h3>From Zero to Power</h3>
            <p>ADN combines progression, token discipline, social growth and digital commerce inside one ecosystem built for users, partners and investors who care about sustainability.</p>
            <strong>(c) 2026 ADN Token. All rights reserved.</strong>
          </div>
        </div>
      </footer>
    </div>
  );
}
