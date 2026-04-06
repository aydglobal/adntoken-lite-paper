import { useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import {
  BadgeDollarSign,
  Bot,
  Gift,
  LockKeyhole,
  Rocket,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Wallet,
  Zap,
} from "lucide-react";
import "./App.css";
import adnTokenMark from "../media/adn_token.png.png";
import adnTokenWordmark from "../media/adn-token-wordmark.png";
import adnLionMascot from "../media/adn-lion.png";

type Lang = "tr" | "en";

type Copy = {
  brandSubtitle: string;
  entrance: {
    kicker: string;
    title: string;
    text: string;
    note: string;
  };
  nav: Array<{ href: string; label: string }>;
  hero: {
    kicker: string;
    title: string;
    text: string;
    primary: string;
    secondary: string;
    tertiary: string;
    badges: string[];
    stats: Array<[string, string]>;
    stageTitle: string;
    stageText: string;
    quickFacts: Array<[string, string]>;
  };
  pillarsTitle: string;
  pillars: Array<{ title: string; text: string }>;
  tokenomics: {
    kicker: string;
    title: string;
    text: string;
    items: Array<[string, string]>;
  };
  tap: {
    kicker: string;
    title: string;
    text: string;
    badges: string[];
    points: Array<{ title: string; text: string }>;
  };
  security: {
    kicker: string;
    title: string;
    text: string;
    items: Array<{ title: string; text: string }>;
  };
  roadmap: {
    kicker: string;
    title: string;
    items: Array<{ phase: string; title: string; text: string }>;
  };
  footer: {
    title: string;
    text: string;
    legal: string;
  };
};

const tokenDistribution = [60, 15, 10, 8, 4, 3];

const copy: Record<Lang, Copy> = {
  tr: {
    brandSubtitle:
      "Topluluk, Tap to Earn ve dijital ticaret i\u00e7in premium lansman sayfas\u0131",
    entrance: {
      kicker: "\u00d6zel Giri\u015f",
      title: "ADN ekosistemine ho\u015f geldiniz",
      text:
        "Bu a\u00e7\u0131l\u0131\u015f penceresi, ADN Token d\u00fcnyas\u0131na daha s\u0131cak, daha g\u00fcven veren ve daha premium bir ilk temas sa\u011flamak i\u00e7in haz\u0131rland\u0131.",
      note: "\u0130\u00e7eri ge\u00e7mek i\u00e7in sa\u011f \u00fcstteki \u00e7arp\u0131ya dokunun.",
    },
    nav: [
      { href: "#hero", label: "Genel Bak\u0131\u015f" },
      { href: "#tokenomics", label: "Da\u011f\u0131l\u0131m" },
      { href: "#tap", label: "Tap to Earn" },
      { href: "#security", label: "G\u00fcvenlik" },
      { href: "#roadmap", label: "Yol Haritas\u0131" },
    ],
    hero: {
      kicker: "Resmi Lite Paper",
      title:
        "ADN Token, dokun-kazan, sadakat ve dijital ticareti tek ekonomik katmanda birle\u015ftirir.",
      text:
        "ADN; kullan\u0131c\u0131 kazan\u0131m\u0131, oyun i\u00e7i harcama, \u00f6d\u00fcl, sadakat ve partner al\u0131\u015fveri\u015f ak\u0131\u015flar\u0131n\u0131 ayn\u0131 modelde bulu\u015fturur. Bu sayfa, projeyi k\u0131sa, net ve yat\u0131r\u0131mc\u0131 odakl\u0131 bir sunumla aktar\u0131r.",
      primary: "Telegram Botunu A\u00e7",
      secondary: "Da\u011f\u0131l\u0131m\u0131 G\u00f6r",
      tertiary: "A\u00e7\u0131l\u0131\u015f Ekran\u0131",
      badges: ["Tap to Earn", "Airdrop", "Digital Commerce"],
      stats: [
        ["Toplam Arz", "100B ADN"],
        ["Topluluk Pay\u0131", "%60"],
        ["Ana Ak\u0131\u015f", "Tap to Earn + ticaret"],
      ],
      stageTitle: "Topluluk odakl\u0131 b\u00fcy\u00fcme",
      stageText:
        "\u00dcr\u00fcn, g\u00fcven ve g\u00f6r\u00fcn\u00fcrl\u00fck ayn\u0131 premium sahnede birle\u015fir.",
      quickFacts: [
        ["Kategori", "Oyun ve ticaret token\u0131"],
        ["Ana \u00dcr\u00fcn", "Tap to Earn + ma\u011faza \u00f6d\u00fclleri"],
        ["Model", "Sadakat ve kullan\u0131m ekonomisi"],
        ["Odak", "G\u00fcvenli topluluk b\u00fcy\u00fcmesi"],
      ],
    },
    pillarsTitle: "ADN neden daha g\u00fc\u00e7l\u00fc bir model sunar?",
    pillars: [
      {
        title: "Ger\u00e7ek kullan\u0131m oda\u011f\u0131",
        text:
          "Token yaln\u0131zca g\u00f6r\u00fcn\u00fcrl\u00fck \u00fcretmez; g\u00f6rev, \u00f6d\u00fcl, sadakat ve harcama ak\u0131\u015f\u0131n\u0131 birlikte ta\u015f\u0131r.",
      },
      {
        title: "Topluluk \u00f6nceli\u011fi",
        text:
          "En g\u00fc\u00e7l\u00fc pay kullan\u0131c\u0131 b\u00fcy\u00fcmesi, airdrop ve uzun vadeli sadakat ekonomisi i\u00e7in ayr\u0131ld\u0131.",
      },
      {
        title: "K\u0131sa ve temiz sunum",
        text:
          "Daha az g\u00fcr\u00fclt\u00fc, daha net mesaj ve daha k\u0131sa ak\u0131\u015f sayesinde dikkat da\u011f\u0131lmaz.",
      },
    ],
    tokenomics: {
      kicker: "Da\u011f\u0131l\u0131m",
      title: "ADN arz modeli eri\u015fim, \u00f6d\u00fcl ve s\u00fcrd\u00fcr\u00fclebilir b\u00fcy\u00fcme i\u00e7in tasarland\u0131",
      text:
        "100 milyar ADN; mikro \u00f6d\u00fcl ekonomisini, y\u00fcksek kullan\u0131c\u0131 eri\u015fimini ve dengeli topluluk b\u00fcy\u00fcmesini ayn\u0131 anda desteklemek i\u00e7in yap\u0131land\u0131r\u0131ld\u0131.",
      items: [
        ["Topluluk ve Airdrop", "60%"],
        ["Ekosistem Geli\u015fimi", "15%"],
        ["Likidite", "10%"],
        ["Hazine", "8%"],
        ["Tak\u0131m", "4%"],
        ["Partnerler", "3%"],
      ],
    },
    tap: {
      kicker: "Tap to Earn",
      title: "Dokun-kazan uygulamas\u0131 ADN b\u00fcy\u00fcmesinin ana motorudur",
      text:
        "Tap to Earn yaln\u0131zca trafik \u00fcretmez; kullan\u0131c\u0131 kalitesini, sadakat g\u00fcc\u00fcn\u00fc ve airdrop uygunlu\u011funu belirleyen ana sinyal katman\u0131 haline gelir.",
      badges: ["Maskot odakl\u0131 giri\u015f", "S\u0131cak \u00fcr\u00fcn dili", "G\u00fc\u00e7l\u00fc ilk temas"],
      points: [
        {
          title: "G\u00f6rev ekonomisi",
          text:
            "Kullan\u0131c\u0131lar g\u00fcnl\u00fck g\u00f6rev, check-in ve etkinliklerle puan \u00fcretir, seviye ilerletir.",
        },
        {
          title: "Kontroll\u00fc denge",
          text:
            "Enerji, g\u00f6rev limiti ve ilerleme sistemiyle enflasyon yerine s\u00fcrd\u00fcr\u00fclebilir b\u00fcy\u00fcme hedeflenir.",
        },
        {
          title: "Airdrop ba\u011flant\u0131s\u0131",
          text:
            "Davran\u0131\u015f kalitesi, airdrop puan\u0131 ve topluluk sadakati do\u011frudan birbirine ba\u011flan\u0131r.",
        },
      ],
    },
    security: {
      kicker: "G\u00fcvenlik",
      title: "Lansman g\u00fcveni i\u00e7in temel koruma katmanlar\u0131 haz\u0131rland\u0131",
      text:
        "Bot bask\u0131s\u0131n\u0131 azaltan, uygunluk kalitesini koruyan ve da\u011f\u0131t\u0131m\u0131 daha g\u00fcvenilir k\u0131lan ana ba\u015fl\u0131klar g\u00f6r\u00fcn\u00fcr ve anla\u015f\u0131l\u0131r bi\u00e7imde sunulur.",
      items: [
        {
          title: "Bot filtreleme",
          text:
            "\u015e\u00fcpheli tekrar, g\u00f6rev istismar\u0131 ve yapay trafik davran\u0131\u015f\u0131 temizlenir.",
        },
        {
          title: "C\u00fczdan do\u011frulama",
          text:
            "Hak edi\u015f ve uygunluk ad\u0131mlar\u0131 g\u00fcvenli c\u00fczdan e\u015fle\u015ftirmesiyle ilerler.",
        },
        {
          title: "Topluluk kalitesi",
          text:
            "Etkin kullan\u0131c\u0131 davran\u0131\u015f\u0131, sadakat g\u00fcc\u00fc ve g\u00f6rev istikrar\u0131 birlikte de\u011ferlendirilir.",
        },
        {
          title: "A\u015famal\u0131 da\u011f\u0131t\u0131m",
          text:
            "Airdrop ve \u00f6d\u00fcl ak\u0131\u015flar\u0131 kontroll\u00fc, g\u00f6r\u00fcn\u00fcr ve operasyonel olarak s\u00fcrd\u00fcr\u00fclebilir ilerler.",
        },
      ],
    },
    roadmap: {
      kicker: "Yol Haritas\u0131",
      title: "K\u0131sa ve net b\u00fcy\u00fcme plan\u0131",
      items: [
        {
          phase: "Faz 1",
          title: "Marka ve topluluk a\u00e7\u0131l\u0131\u015f\u0131",
          text:
            "Tap to Earn ba\u015flang\u0131c\u0131, topluluk b\u00fcy\u00fcmesi ve giri\u015f kampanyalar\u0131 devreye al\u0131n\u0131r.",
        },
        {
          phase: "Faz 2",
          title: "Airdrop ve g\u00f6rev ekonomisi",
          text:
            "Uygunluk sistemi, g\u00f6rev puanlar\u0131 ve topluluk etkile\u015fimi g\u00fc\u00e7lendirilir.",
        },
        {
          phase: "Faz 3",
          title: "Ticaret ve partner geni\u015flemesi",
          text:
            "Ma\u011faza \u00f6d\u00fclleri, cashback ve partner ak\u0131\u015flar\u0131 a\u00e7\u0131l\u0131r.",
        },
        {
          phase: "Faz 4",
          title: "\u00d6l\u00e7ek ve kal\u0131c\u0131l\u0131k",
          text:
            "Uzun vadeli sadakat, g\u00f6r\u00fcn\u00fcr \u00fcr\u00fcn faydas\u0131 ve daha g\u00fc\u00e7l\u00fc ekosistem d\u00f6ng\u00fcs\u00fc kurulur.",
        },
      ],
    },
    footer: {
      title: "Yasal ve gizlilik notu",
      text:
        "Bu lite paper tan\u0131t\u0131m ve bilgilendirme amac\u0131 ta\u015f\u0131r. Nihai teknik, operasyonel ve da\u011f\u0131t\u0131m detaylar\u0131 resmi duyurularla netle\u015ftirilir.",
      legal: "\u00a9 2026 ADN Token. T\u00fcm haklar\u0131 sakl\u0131d\u0131r.",
    },
  },
  en: {
    brandSubtitle: "A premium launch page for community, Tap to Earn and digital commerce",
    entrance: {
      kicker: "Entrance Mode",
      title: "Welcome to the ADN ecosystem",
      text:
        "This opening screen is designed to create a warmer, sharper and more premium first impression for ADN Token.",
      note: "Use the close icon at the top right to enter the site.",
    },
    nav: [
      { href: "#hero", label: "Overview" },
      { href: "#tokenomics", label: "Tokenomics" },
      { href: "#tap", label: "Tap to Earn" },
      { href: "#security", label: "Security" },
      { href: "#roadmap", label: "Roadmap" },
    ],
    hero: {
      kicker: "Official Lite Paper",
      title:
        "ADN Token unifies Tap to Earn, loyalty and digital commerce in one economic layer.",
      text:
        "ADN aligns user acquisition, in-game spending, rewards, loyalty and partner commerce inside one model. This page presents the project in a shorter, cleaner and more investor-focused flow.",
      primary: "Open Telegram Bot",
      secondary: "View Tokenomics",
      tertiary: "Open Entrance",
      badges: ["Tap to Earn", "Airdrop", "Digital Commerce"],
      stats: [
        ["Total Supply", "100B ADN"],
        ["Community Share", "60%"],
        ["Core Flow", "Tap to Earn + commerce"],
      ],
      stageTitle: "Community-led growth",
      stageText:
        "Product, trust and visibility come together inside one premium scene.",
      quickFacts: [
        ["Category", "Gaming and commerce token"],
        ["Core Product", "Tap to Earn + merchant rewards"],
        ["Model", "Loyalty and utility economy"],
        ["Focus", "Secure community growth"],
      ],
    },
    pillarsTitle: "Why ADN presents a stronger model",
    pillars: [
      {
        title: "Real utility",
        text:
          "The token supports missions, rewards, loyalty and commerce instead of pure visibility alone.",
      },
      {
        title: "Community priority",
        text:
          "The largest share is reserved for user growth, airdrop and long-term loyalty mechanics.",
      },
      {
        title: "Cleaner presentation",
        text:
          "Shorter sections, less noise and clearer messaging keep user and investor attention stronger.",
      },
    ],
    tokenomics: {
      kicker: "Tokenomics",
      title: "ADN supply is structured for reach, rewards and sustainable growth",
      text:
        "The 100 billion ADN supply is designed to support micro rewards, broad user access and a durable community-driven economy at the same time.",
      items: [
        ["Community and Airdrop", "60%"],
        ["Ecosystem Growth", "15%"],
        ["Liquidity", "10%"],
        ["Treasury", "8%"],
        ["Team", "4%"],
        ["Partners", "3%"],
      ],
    },
    tap: {
      kicker: "Tap to Earn",
      title: "The Tap to Earn app is the primary ADN growth engine",
      text:
        "Tap to Earn does more than generate traffic. It becomes the main signal layer for user quality, loyalty strength and airdrop eligibility.",
      badges: ["Mascot-led entry", "Warmer product tone", "Stronger first impression"],
      points: [
        {
          title: "Mission economy",
          text:
            "Users progress through daily tasks, check-ins and events while generating points and levels.",
        },
        {
          title: "Controlled balance",
          text:
            "Energy, mission limits and progression rules support sustainability instead of inflation.",
        },
        {
          title: "Airdrop linkage",
          text:
            "Behavior quality, airdrop score and loyalty are directly connected inside the ecosystem.",
        },
      ],
    },
    security: {
      kicker: "Security",
      title: "Core launch protection layers are visible and easy to understand",
      text:
        "This section highlights the essentials that reduce bot pressure, protect eligibility quality and support a more reliable distribution flow.",
      items: [
        {
          title: "Bot filtering",
          text:
            "Suspicious repetition, mission abuse and artificial activity patterns are removed.",
        },
        {
          title: "Wallet verification",
          text:
            "Claim and eligibility steps move forward through secure wallet validation.",
        },
        {
          title: "Community quality",
          text:
            "Engagement quality, loyalty strength and mission consistency are reviewed together.",
        },
        {
          title: "Phased distribution",
          text:
            "Airdrop and reward flows are managed in a controlled and sustainable way.",
        },
      ],
    },
    roadmap: {
      kicker: "Roadmap",
      title: "A shorter and clearer growth plan",
      items: [
        {
          phase: "Phase 1",
          title: "Brand and community opening",
          text:
            "Tap to Earn launch, community growth and the first campaign wave go live.",
        },
        {
          phase: "Phase 2",
          title: "Airdrop and mission economy",
          text:
            "Eligibility logic, mission points and community participation are strengthened.",
        },
        {
          phase: "Phase 3",
          title: "Commerce and partner expansion",
          text:
            "Merchant rewards, cashback and partner flows are activated.",
        },
        {
          phase: "Phase 4",
          title: "Scale and retention",
          text:
            "Long-term loyalty, visible product utility and stronger ecosystem retention.",
        },
      ],
    },
    footer: {
      title: "Legal and privacy note",
      text:
        "This lite paper is intended for informational and promotional purposes. Final technical, operational and distribution details will be defined through official announcements.",
      legal: "\u00a9 2026 ADN Token. All rights reserved.",
    },
  },
};

function SectionBadge({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="section-badge">
      <span className="section-badge-icon">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang>("tr");
  const [showEntrance, setShowEntrance] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [heroLight, setHeroLight] = useState({ x: 68, y: 34 });
  const t = copy[lang];
  const telegramBotUrl =
    import.meta.env.VITE_TELEGRAM_BOT_URL || "https://t.me/adntoken_bot?start=litepaper";

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const next = total > 0 ? (window.scrollY / total) * 100 : 0;
      setScrollProgress(next);
    };

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );

    document.querySelectorAll(".reveal-on-scroll").forEach((el) => revealObserver.observe(el));
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      revealObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lang]);

  const heroStyle = {
    "--hero-light-x": `${heroLight.x}%`,
    "--hero-light-y": `${heroLight.y}%`,
  } as CSSProperties;

  return (
    <div className="landing-shell">
      <div className="scroll-progress">
        <span style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className={`entrance-overlay ${showEntrance ? "visible" : ""}`}>
        <div className={`entrance-modal ${showEntrance ? "visible" : ""}`}>
          <button
            type="button"
            className="entrance-close"
            aria-label={lang === "tr" ? "Giri\u015fi kapat" : "Close entrance"}
            onClick={() => setShowEntrance(false)}
          >
            x
          </button>

          <div className="entrance-copy">
            <span className="entrance-kicker">{t.entrance.kicker}</span>
            <h2>{t.entrance.title}</h2>
            <p>{t.entrance.text}</p>
            <div className="entrance-note">{t.entrance.note}</div>
          </div>

          <div className="entrance-visual">
            <div className="entrance-ring entrance-ring-one" />
            <div className="entrance-ring entrance-ring-two" />
            <img src={adnLionMascot} alt="ADN mascot" className="entrance-mascot" />
            <div className="entrance-chip">
              <img src={adnTokenMark} alt="ADN emblem" />
              <span>{lang === "tr" ? "Tap to Earn karakteri" : "Tap to Earn mascot"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="page-glow page-glow-left" />
      <div className="page-glow page-glow-right" />

      <header className="topbar">
        <a href="#hero" className="brand">
          <span className="brand-mark">
            <img src={adnTokenMark} alt="ADN emblem" />
          </span>
          <img src={adnTokenWordmark} alt="ADN Token" className="brand-wordmark" />
        </a>

        <nav className="topnav">
          {t.nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="lang-switch" aria-label="Language switch">
          <button
            type="button"
            className={`lang-btn ${lang === "tr" ? "active" : ""}`}
            onClick={() => setLang("tr")}
          >
            TR
          </button>
          <button
            type="button"
            className={`lang-btn ${lang === "en" ? "active" : ""}`}
            onClick={() => setLang("en")}
          >
            EN
          </button>
        </div>
      </header>

      <main className="page">
        <section
          id="hero"
          className="hero reveal-on-scroll is-visible"
          style={heroStyle}
          onMouseMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            setHeroLight({
              x: ((event.clientX - rect.left) / rect.width) * 100,
              y: ((event.clientY - rect.top) / rect.height) * 100,
            });
          }}
          onMouseLeave={() => setHeroLight({ x: 68, y: 34 })}
        >
          <div className="hero-copy">
            <SectionBadge icon={<Sparkles size={16} />} label={t.hero.kicker} />
            <h1>{t.hero.title}</h1>
            <p>{t.hero.text}</p>

            <div className="hero-badges">
              {t.hero.badges.map((badge) => (
                <span key={badge}>{badge}</span>
              ))}
            </div>

            <div className="hero-actions">
              <a href={telegramBotUrl} target="_blank" rel="noreferrer" className="cta-btn primary">
                <Send size={18} />
                <span>{t.hero.primary}</span>
              </a>
              <a href="#tokenomics" className="cta-btn secondary">
                <BadgeDollarSign size={18} />
                <span>{t.hero.secondary}</span>
              </a>
              <button type="button" className="cta-btn ghost" onClick={() => setShowEntrance(true)}>
                <Star size={18} />
                <span>{t.hero.tertiary}</span>
              </button>
            </div>

            <div className="hero-stats">
              {t.hero.stats.map(([label, value]) => (
                <div className="hero-stat" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-stage">
            <div className="hero-stage-light" />
            <div className="hero-stage-ring hero-stage-ring-one" />
            <div className="hero-stage-ring hero-stage-ring-two" />
            <div className="hero-stage-head">
              <span>{t.hero.stageTitle}</span>
              <img src={adnTokenMark} alt="ADN emblem" />
            </div>
            <img src={adnLionMascot} alt="ADN mascot" className="hero-mascot" />
            <div className="hero-stage-token">
              <img src={adnTokenMark} alt="ADN emblem" />
            </div>
            <div className="hero-stage-copy">
              <strong>{t.hero.stageText}</strong>
            </div>
            <div className="hero-facts">
              {t.hero.quickFacts.map(([label, value]) => (
                <div key={label} className="hero-fact">
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pillars reveal-on-scroll">
          <SectionBadge icon={<Zap size={16} />} label={t.pillarsTitle} />
          <div className="pillars-grid">
            {t.pillars.map((item) => (
              <article className="glass-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="tokenomics" className="section-block reveal-on-scroll">
          <SectionBadge icon={<BadgeDollarSign size={16} />} label={t.tokenomics.kicker} />
          <h2>{t.tokenomics.title}</h2>
          <p>{t.tokenomics.text}</p>
          <div className="token-grid">
            <div className="token-chart">
              <div className="token-chart-core">
                <strong>100B</strong>
                <span>ADN</span>
              </div>
            </div>
            <div className="token-list">
              {t.tokenomics.items.map(([label, value], index) => (
                <div className="token-row" key={label}>
                  <div className="token-row-top">
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                  <div className="token-bar">
                    <div className="token-bar-fill" style={{ width: `${tokenDistribution[index]}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="tap" className="section-block reveal-on-scroll">
          <SectionBadge icon={<Zap size={16} />} label={t.tap.kicker} />
          <div className="split-head">
            <div>
              <h2>{t.tap.title}</h2>
              <p>{t.tap.text}</p>
            </div>
            <div className="tap-badges">
              {t.tap.badges.map((badge) => (
                <span key={badge}>{badge}</span>
              ))}
            </div>
          </div>
          <div className="tap-grid">
            <div className="tap-mascot-card">
              <img src={adnLionMascot} alt="ADN mascot" className="tap-mascot" />
              <div className="tap-mascot-chip">
                <img src={adnTokenMark} alt="ADN emblem" />
                <div>
                  <strong>{lang === "tr" ? "Tap to Earn karakteri" : "Tap to Earn mascot"}</strong>
                  <span>
                    {lang === "tr"
                      ? "Daha s\u0131cak, daha ak\u0131lda kal\u0131c\u0131 ve daha g\u00fc\u00e7l\u00fc ilk temas"
                      : "Warmer, more memorable and stronger first contact"}
                  </span>
                </div>
              </div>
            </div>
            <div className="tap-points">
              {t.tap.points.map((item) => (
                <article className="glass-card compact" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="security" className="section-block reveal-on-scroll">
          <SectionBadge icon={<ShieldCheck size={16} />} label={t.security.kicker} />
          <h2>{t.security.title}</h2>
          <p>{t.security.text}</p>
          <div className="security-grid">
            {[<Bot size={18} />, <Wallet size={18} />, <LockKeyhole size={18} />, <Gift size={18} />].map(
              (icon, index) => (
                <article className="security-card" key={t.security.items[index].title}>
                  <span className="security-icon">{icon}</span>
                  <h3>{t.security.items[index].title}</h3>
                  <p>{t.security.items[index].text}</p>
                </article>
              )
            )}
          </div>
        </section>

        <section id="roadmap" className="section-block reveal-on-scroll">
          <SectionBadge icon={<Rocket size={16} />} label={t.roadmap.kicker} />
          <h2>{t.roadmap.title}</h2>
          <div className="roadmap-grid">
            {t.roadmap.items.map((item) => (
              <article className="roadmap-card" key={item.phase}>
                <span className="roadmap-phase">{item.phase}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-card">
          <img src={adnTokenWordmark} alt="ADN Token" className="footer-wordmark" />
          <div className="footer-copy">
            <h3>{t.footer.title}</h3>
            <p>{t.footer.text}</p>
            <strong>{t.footer.legal}</strong>
          </div>
        </div>
      </footer>
    </div>
  );
}
