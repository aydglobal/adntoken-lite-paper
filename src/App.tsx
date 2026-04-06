import { useEffect, useState } from "react";
import {
  BadgeDollarSign,
  BadgeCheck,
  Blocks,
  Bot,
  Compass,
  Fingerprint,
  Gem,
  Gift,
  Globe,
  LockKeyhole,
  Landmark,
  Orbit,
  Rocket,
  Send,
  ShieldCheck,
  Sparkles,
  Store,
  Target,
  Wallet,
  Zap,
} from "lucide-react";
import "./App.css";
import adnTokenLogo from "../media/adn_token.png.png";
import campaignVisualOne from "../media/adn-campaign-01.jpg";
import campaignVisualThree from "../media/adn-campaign-03.jpg";
import campaignVisualFour from "../media/adn-campaign-04.jpg";

type Lang = "tr" | "en";
type TokenKey = "community" | "ecosystem" | "liquidity" | "treasury" | "team" | "partners";
type SectionId =
  | "overview"
  | "economic-model"
  | "problem"
  | "solution"
  | "tap-to-earn"
  | "use-cases"
  | "tokenomics"
  | "architecture"
  | "security"
  | "roadmap"
  | "governance"
  | "airdrop";

const tokenomics = [
  { key: "community" as TokenKey, value: 60, color: "#2563eb" },
  { key: "ecosystem" as TokenKey, value: 15, color: "#0f766e" },
  { key: "liquidity" as TokenKey, value: 10, color: "#16a34a" },
  { key: "treasury" as TokenKey, value: 8, color: "#f59e0b" },
  { key: "team" as TokenKey, value: 4, color: "#7c3aed" },
  { key: "partners" as TokenKey, value: 3, color: "#dc2626" },
];

const tokenomicsGradient = `conic-gradient(
  #2563eb 0% 60%,
  #0f766e 60% 75%,
  #16a34a 75% 85%,
  #f59e0b 85% 93%,
  #7c3aed 93% 97%,
  #dc2626 97% 100%
)`;

const sectionIcons: Record<SectionId, typeof Sparkles> = {
  overview: Sparkles,
  "economic-model": Landmark,
  problem: Target,
  solution: Gem,
  "tap-to-earn": Zap,
  "use-cases": Globe,
  tokenomics: BadgeDollarSign,
  architecture: Blocks,
  security: ShieldCheck,
  roadmap: Rocket,
  governance: Compass,
  airdrop: Gift,
};

const content = {
  tr: {
    brandTitle: "ADN Token Dokümanları",
    brandSubtitle: "Resmi lite paper ve ürün tanıtımı",
    topLinks: [
      { href: "#economic-model", label: "Ekonomik Model" },
      { href: "#tokenomics", label: "Dağılım" },
      { href: "#airdrop", label: "Airdrop" },
    ],
    langLabel: "Dil",
    nav: [
      { id: "overview", label: "Genel Bakış" },
      { id: "economic-model", label: "Ekonomik Model" },
      { id: "problem", label: "Problem" },
      { id: "solution", label: "Çözüm" },
      { id: "tap-to-earn", label: "Dokun-Kazan" },
      { id: "use-cases", label: "Kullanım Alanları" },
      { id: "tokenomics", label: "Dağılım" },
      { id: "architecture", label: "Sistem Akışı" },
      { id: "security", label: "Güvenlik" },
      { id: "roadmap", label: "Yol Haritası" },
      { id: "governance", label: "Yönetişim" },
      { id: "airdrop", label: "Airdrop" },
    ],
    sidebarTitle: "ADN Token",
    sidebarText:
      "Oyun, dokun-kazan ve online alışveriş deneyimlerini tek bir güvenilir token altyapısında birleştiren resmi lite paper sayfası.",
    sidebarBadge: "Belge",
    sidebarStrong: "Resmi lite paper",
    sidebarNote: "Ürün vizyonu, token yapısı, güvenlik modeli ve airdrop kurgusu tek akışta sunulur.",
    overviewKicker: "Genel Bakış",
    overviewTitle: "ADN Token, dokun-kazan ve dijital ticaret arasında çalışan gerçek kullanım katmanıdır.",
    overviewText:
      "ADN; kullanıcı kazanımı, oyun içi harcama, sadakat, airdrop ve partner alışveriş deneyimlerini aynı ekonomik yapı içinde toplar. Bu lite paper, ADN ekosisteminin ürün mantığını, dağılım modelini ve büyüme vizyonunu açık, güçlü ve kurumsal bir formatta sunar.",
    quickFactsTitle: "Hızlı Bilgiler",
    quickFacts: [
      ["Kategori", "Oyun ve ticaret tokenı"],
      ["Toplam Arz", "100,000,000,000 ADN"],
      ["Ana Ürün", "Dokun-kazan + mağaza ödülleri"],
      ["Ağ Yapısı", "Topluluk odaklı dijital ekonomi"],
    ],
    heroMetrics: [
      ["Aktif Model", "Görev + sadakat + ödeme"],
      ["Ana Büyüme", "Topluluk ve ürün kullanımı"],
      ["Çekirdek Fayda", "Oyun, ticaret, ödül"],
    ],
    highlights: [
      {
        title: "Kullanım odaklı ekonomi",
        text: "ADN, yalnızca bir alım-satım varlığı olarak değil; görev, ödeme, sadakat ve ödül deneyimini birleştiren işlevsel bir dijital varlık olarak konumlanır.",
      },
      {
        title: "Topluluk öncelikli dağılım",
        text: "ADN ekosisteminde en büyük pay, kullanıcı büyümesi, dokun-kazan katılımı, görev ekonomisi ve airdrop mekanikleri için ayrılır.",
      },
      {
        title: "Ürün merkezli fayda",
        text: "Dokun-kazan, oyun satın alımları ve online alışveriş sadakati aynı token fayda modelinde birleşir.",
      },
      {
        title: "Güvenilir operasyon",
        text: "Anti-bot kontrolleri, görev doğrulama ve şeffaf dağıtım mantığı ile güven veren bir lansman yapısı hedeflenir.",
      },
    ],
    spotlightTitle: "ADN Neyi Birleştirir?",
    spotlightText:
      "ADN, oyuncunun günlük etkileşimini, markanın dönüşüm hedefini ve topluluğun sadakat davranışını tek bir değer zincirinde buluşturur.",
    utilityStrip: [
      "Oyun içi satın alım",
      "Sadakat ödülü",
      "Mağaza indirimi",
      "Görev teşviki",
      "Topluluk erişimi",
    ],
    economicModel: {
      kicker: "Ekonomik Model",
      title: "ADN arz ve dağılım mantığı",
      text: "ADN toplam arzı 100 milyar adet olarak yapılandırılmıştır. Bu ölçek; mikro ödül ekonomisi, oyun içi kullanım, yüksek kullanıcı erişimi ve sadakat tabanlı dağıtım yapısını dengeli biçimde desteklemek için seçilmiştir.",
      stats: [
        ["Toplam Arz", "100B ADN"],
        ["Topluluk Payı", "60%"],
        ["Likidite Payı", "10%"],
        ["Rezerv ve Hazine", "8%"],
      ],
    },
    problem: {
      kicker: "Problem",
      title: "Dijital ödül ve harcama deneyimi parçalı ilerliyor",
      text: "Kullanıcı bir uygulamada etkileşim üretirken başka bir platformda harcama yapıyor; ancak bu iki davranışı ortak değer modeliyle bağlayan ürünler hâlâ sınırlı. ADN, dokun-kazan kullanıcı tabanını ödeme ve sadakat ekonomisine bağlamak için tasarlanır.",
    },
    solution: {
      kicker: "Çözüm",
      title: "ADN tek ekonomik katman olarak çalışır",
      callout:
        "ADN; dokun-kazan uygulaması, oyun ekonomileri, mağaza ödülleri ve airdrop dağıtımını tek ürün dili içinde birleştirerek kullanıcı davranışını uzun vadeli ekosistem değerine dönüştürür.",
    },
    tap: {
      kicker: "Dokun-Kazan Uygulaması",
      title: "Dokun-kazan uygulaması büyüme motorudur",
      text: "ADN ekosisteminde dokun-kazan yalnızca trafik kaynağı değil, aynı zamanda kullanıcı kalitesi, sadakat seviyesi ve airdrop uygunluğu için ana sinyal katmanıdır.",
      items: [
        {
          title: "Günlük görev ekonomisi",
          text: "Kullanıcılar tap, check-in, görev, referans ve sezon etkinlikleriyle puan üretir ve ADN hak edişi kazanır.",
        },
        {
          title: "Sürdürülebilir denge",
          text: "Enerji, combo, görev tavanı ve seviye mantığı ile kontrolsüz enflasyon yerine dengeli büyüme hedeflenir.",
        },
        {
          title: "Airdrop'a bağlı değer akışı",
          text: "Dokun-kazan davranışı, airdrop puanı ve ekosistem sadakati ile doğrudan ilişkilendirilir.",
        },
      ],
    },
    useCases: {
      kicker: "Kullanım Alanları",
      title: "Temel kullanım alanları",
      items: [
        {
          title: "Oyun içi kullanım",
          items: [
            "Skin, battle pass, turnuva ve premium erişim ödemeleri",
            "Görev, sezon, başarı ve topluluk etkinliği ödülleri",
            "VIP üyelik, boost ve özel içerik kilitleri",
          ],
        },
        {
          title: "Online alışveriş kullanımı",
          items: [
            "Partner mağazalarda cashback ve indirim mekanikleri",
            "Sepet tamamlama ve kampanya katılım teşvikleri",
            "Sadakat puanını token ekonomisine bağlayan alışveriş akışı",
          ],
        },
        {
          title: "Topluluk ve yönetişim",
          items: [
            "Stake ederek ekosistem katkı ödülleri alma",
            "Ürün öncelikleri ve kampanya yapıları için oylama",
            "Özel görev serileri ve whitelist erişimi",
          ],
        },
      ],
    },
    tokenomics: {
      kicker: "Tokenomics",
      title: "ADN dağılım modeli",
      text: "ADN dağılım modeli; kullanıcı kazanımı, ekosistem büyümesi, likidite sürdürülebilirliği ve operasyonel devamlılık arasında dengeli bir yapı kurmak amacıyla tasarlanmıştır. Topluluk, dokun-kazan ve airdrop havuzu toplamda %60 olarak belirlenmiştir.",
      center: "ADN Arzı",
      labels: {
        community: "Topluluk, Dokun-Kazan ve Airdrop",
        ecosystem: "Ekosistem Gelişimi",
        liquidity: "Likidite ve Piyasa Desteği",
        treasury: "Hazine ve Rezerv",
        team: "Takım ve Operasyon",
        partners: "Stratejik Partnerler",
      },
    },
    architecture: {
      kicker: "Sistem Akışı",
      title: "Sistem nasıl çalışır?",
      items: [
        "Kullanıcı dokun-kazan uygulamasına girer, görevleri tamamlar ve puan üretir.",
        "Cüzdan doğrulaması ile oyun içi ve ticaret odaklı kullanım alanlarına bağlanır.",
        "Sadakat seviyesi, görev kalitesi ve kullanım davranışı ADN hak ediş skorunu oluşturur.",
        "Uygun kullanıcılar airdrop, ödül ve partner teşvik akışlarına dahil edilir.",
      ],
    },
    security: {
      kicker: "Güvenlik",
      title: "Profesyonel, güvenilir ve ölçeklenebilir yapı",
      items: [
        "Cüzdan bağlantıları yalnızca güvenli imza akışları ve doğrulama katmanları ile yönetilir.",
        "Çoklu hesap, bot trafiği ve yapay görev üretimi davranış analizi ile filtrelenir.",
        "Airdrop uygunluğu, görev kalitesi, hesap güven skoru ve cüzdan geçmişi ile değerlendirilir.",
        "Dağıtım ve ödül süreçleri kayıt altına alınarak denetlenebilir ve raporlanabilir hale getirilir.",
      ],
    },
    roadmap: {
      kicker: "Yol Haritası",
      title: "Büyüme planı",
      items: [
        {
          phase: "Faz 1",
          title: "Lansman Hazırlığı",
          text: "Marka, lite paper, topluluk altyapısı, cüzdan deneyimi ve ilk bekleme listesi açılışı.",
        },
        {
          phase: "Faz 2",
          title: "Dokun-Kazan Beta",
          text: "Uygulama yayını, görev sistemi, seviye kurgusu, anti-bot filtreleri ve puan toplama altyapısı.",
        },
        {
          phase: "Faz 3",
          title: "Token ve Merchant Açılımı",
          text: "ADN kullanım alanlarının oyun ve online alışveriş partnerlerinde aktif hale gelmesi.",
        },
        {
          phase: "Faz 4",
          title: "Airdrop ve Ölçeklenme",
          text: "Snapshot, hak ediş, topluluk dağıtımı, staking ve yönetişim özelliklerinin açılması.",
        },
      ],
    },
    governance: {
      kicker: "Yönetişim",
      title: "Yönetişim ve ilkeler",
      items: [
        "Topluluk büyümesi ile ürün gelişimi arasında şeffaf bir karar mekanizması yürütülür.",
        "Rezerv, teşvik ve kampanya kullanımları periyodik raporlarla açıklanır.",
        "Partner kabul modeli, marka güvenliği, gerçek kullanım ve uyum kriterlerine göre çalışır.",
        "Uzun vadeli hedef, ADN'yi oyun ve ticaret odaklı sadakat ekonomisinin omurgası haline getirmektir.",
      ],
    },
    airdrop: {
      kicker: "Airdrop",
      title: "Yayın hazır airdrop modeli",
      callout:
        "ADN airdrop'u, geçici hype yerine gerçek kullanıcı kalitesi, uygulama içi davranış ve doğrulanmış sadakat sinyalleri üzerinden dağıtım yapacak şekilde tasarlanır.",
      items: [
        "Airdrop havuzu, %60 topluluk payı içindeki dokun-kazan ve erken kullanıcı ödül mekanizmasının ana parçası olarak çalışır.",
        "Hak ediş modeli; aktif kullanım, görev kalitesi, seviye, referans kalitesi ve cüzdan doğrulamasına göre puanlanır.",
        "Bot, spam, çoklu hesap ve manipülasyon tespit edilen hesaplar otomatik veya manuel inceleme ile kapsam dışı bırakılır.",
        "Snapshot tarihi, claim dönemi ve vesting detayları resmi yayında sabit takvim ile duyurulur.",
      ],
    },
    releaseTitle: "Not",
    releaseText:
      "Bu belge ADN Token lite paper sunumudur. Nihai hukuki çerçeve, listelenme planı ve teknik sözleşme detayları resmi lansman dokümanlarında ayrıca duyurulacaktır.",
    heroBadges: ["Dokun-Kazan", "Online Alışveriş", "Topluluk Ekonomisi"],
    trustBar: [
      "Şeffaf dağılım mantığı",
      "Gerçek kullanıcı odaklı airdrop",
      "Anti-bot güvenlik katmanı",
      "Ölçeklenebilir ürün yapısı",
    ],
    ctaTitle: "ADN ile dijital değer akışını büyütün",
    ctaText:
      "Lite paper; ürün vizyonu, kullanıcı büyümesi, token faydası ve airdrop stratejisini tek bir profesyonel sunum altında toplar.",
    ctaPrimary: "Airdrop Bölümüne Git",
    ctaSecondary: "Dağılımı İncele",
  },
  en: {
    brandTitle: "ADN Token Docs",
    brandSubtitle: "Official lite paper and product overview",
    topLinks: [
      { href: "#economic-model", label: "Economic Model" },
      { href: "#tokenomics", label: "Tokenomics" },
      { href: "#airdrop", label: "Airdrop" },
    ],
    langLabel: "Language",
    nav: [
      { id: "overview", label: "Overview" },
      { id: "economic-model", label: "Economic Model" },
      { id: "problem", label: "Problem" },
      { id: "solution", label: "Solution" },
      { id: "tap-to-earn", label: "Tap to Earn" },
      { id: "use-cases", label: "Use Cases" },
      { id: "tokenomics", label: "Tokenomics" },
      { id: "architecture", label: "Architecture" },
      { id: "security", label: "Security" },
      { id: "roadmap", label: "Roadmap" },
      { id: "governance", label: "Governance" },
      { id: "airdrop", label: "Airdrop" },
    ],
    sidebarTitle: "ADN Token",
    sidebarText:
      "A publication-ready documentation site that brings gaming, Tap to Earn and online shopping experiences together under one reliable token infrastructure.",
    sidebarBadge: "Document",
    sidebarStrong: "Official lite paper",
    sidebarNote: "Product vision, token structure, security model and airdrop design are presented in one consistent flow.",
    overviewKicker: "Overview",
    overviewTitle: "ADN Token is a real utility layer connecting Tap to Earn and digital commerce.",
    overviewText:
      "ADN brings user acquisition, in-game spending, loyalty, airdrop mechanics and partner shopping experiences into a single economic model. This document is a publication-ready lite paper built with benchmark token references in mind.",
    quickFactsTitle: "Quick Facts",
    quickFacts: [
      ["Category", "Gaming and commerce token"],
      ["Total Supply", "100,000,000,000 ADN"],
      ["Core Product", "Tap to Earn + merchant rewards"],
      ["Network Model", "Community-led digital economy"],
    ],
    highlights: [
      {
        title: "Utility-driven economy",
        text: "ADN is positioned not merely as a tradable asset, but as a functional digital asset connecting missions, payments, loyalty and rewards.",
      },
      {
        title: "Community-first allocation",
        text: "The largest share of ADN is reserved for user growth, Tap to Earn participation, mission economics and airdrop mechanics.",
      },
      {
        title: "Product-centered utility",
        text: "Tap to Earn, in-game purchases and online shopping loyalty are combined into one token utility model.",
      },
      {
        title: "Reliable operations",
        text: "Anti-bot controls, task verification and transparent distribution logic support a trustworthy launch structure.",
      },
    ],
    economicModel: {
      kicker: "Economic Model",
      title: "ADN supply and allocation logic",
      text: "ADN is structured with a total supply of 100 billion tokens. This scale was chosen to support micro-reward economics, in-game usage, broad user accessibility and a loyalty-based distribution framework in a balanced way.",
      stats: [
        ["Total Supply", "100B ADN"],
        ["Community Share", "60%"],
        ["Liquidity Share", "10%"],
        ["Treasury and Reserve", "8%"],
      ],
    },
    problem: {
      kicker: "Problem",
      title: "Digital rewards and spending are still fragmented",
      text: "Users generate engagement in one product and spend value in another, yet very few systems connect those behaviors through a shared value layer. ADN is designed to connect Tap to Earn audiences with payment and loyalty economics.",
    },
    solution: {
      kicker: "Solution",
      title: "ADN works as a unified economic layer",
      callout:
        "ADN combines the Tap to Earn app, gaming economies, merchant rewards and airdrop distribution into one product language that turns user behavior into long-term ecosystem value.",
    },
    tap: {
      kicker: "Tap to Earn App",
      title: "The Tap to Earn app is the growth engine",
      text: "Inside the ADN ecosystem, Tap to Earn is not only a traffic source but also the core signal layer for user quality, loyalty level and airdrop eligibility.",
      items: [
        {
          title: "Daily task economy",
          text: "Users generate points and ADN eligibility through tapping, check-ins, missions, referrals and seasonal events.",
        },
        {
          title: "Sustainable balance",
          text: "Energy, combo, task caps and progression systems are designed to support controlled growth rather than uncontrolled inflation.",
        },
        {
          title: "Airdrop-linked value flow",
          text: "Tap to Earn behavior is directly connected to airdrop scoring and ecosystem loyalty.",
        },
      ],
    },
    useCases: {
      kicker: "Use Cases",
      title: "Core use cases",
      items: [
        {
          title: "In-game utility",
          items: [
            "Skin, battle pass, tournament and premium access payments",
            "Quest, season, achievement and community event rewards",
            "VIP memberships, boosts and premium content locks",
          ],
        },
        {
          title: "Online shopping utility",
          items: [
            "Cashback and discount mechanics in partner stores",
            "Cart completion and campaign participation incentives",
            "Shopping flows connected to token-based loyalty value",
          ],
        },
        {
          title: "Community and governance",
          items: [
            "Staking for ecosystem contribution rewards",
            "Voting on product priorities and campaign structures",
            "Special mission series and whitelist access",
          ],
        },
      ],
    },
    tokenomics: {
      kicker: "Tokenomics",
      title: "ADN allocation model",
      text: "The ADN allocation model is designed to balance user acquisition, ecosystem growth, liquidity sustainability and operational continuity. The combined pool for community, Tap to Earn and airdrop activity is set at 60%.",
      center: "ADN Supply",
      labels: {
        community: "Community, Tap to Earn and Airdrop",
        ecosystem: "Ecosystem Growth",
        liquidity: "Liquidity and Market Support",
        treasury: "Treasury and Reserve",
        team: "Team and Operations",
        partners: "Strategic Partners",
      },
    },
    architecture: {
      kicker: "Architecture",
      title: "How the system works",
      items: [
        "The user enters the Tap to Earn app, completes tasks and generates points.",
        "Wallet verification connects the user to in-game and commerce-focused utility layers.",
        "Loyalty level, task quality and activity behavior form the ADN eligibility score.",
        "Eligible users enter airdrop, reward and partner incentive flows.",
      ],
    },
    security: {
      kicker: "Security",
      title: "Professional, reliable and scalable structure",
      items: [
        "Wallet connections are handled only through secure signing flows and verification layers.",
        "Multi-account behavior, bot traffic and artificial task generation are filtered through behavior analysis.",
        "Airdrop eligibility is evaluated using task quality, account trust score and wallet history.",
        "Distribution and reward flows are logged to stay auditable and reportable.",
      ],
    },
    roadmap: {
      kicker: "Roadmap",
      title: "Growth roadmap",
      items: [
        {
          phase: "Phase 1",
          title: "Launch Preparation",
          text: "Branding, lite paper, community infrastructure, wallet experience and first waitlist activation.",
        },
        {
          phase: "Phase 2",
          title: "Tap to Earn Beta",
          text: "App release, mission system, progression design, anti-bot filters and points infrastructure.",
        },
        {
          phase: "Phase 3",
          title: "Token and Merchant Expansion",
          text: "ADN utility going live across gaming and online shopping partner environments.",
        },
        {
          phase: "Phase 4",
          title: "Airdrop and Scaling",
          text: "Snapshot, eligibility, community distribution, staking and governance features go live.",
        },
      ],
    },
    governance: {
      kicker: "Governance",
      title: "Governance and principles",
      items: [
        "A transparent decision mechanism is maintained between community growth and product development.",
        "Reserve, incentive and campaign usage are disclosed through periodic reporting.",
        "Partner onboarding operates through brand safety, real utility and compliance criteria.",
        "The long-term goal is to position ADN as the backbone of gaming and commerce loyalty economics.",
      ],
    },
    airdrop: {
      kicker: "Airdrop",
      title: "Publication-ready airdrop model",
      callout:
        "The ADN airdrop is designed to reward real user quality, in-app behavior and verified loyalty signals instead of short-term hype.",
      items: [
        "The airdrop pool operates as a core part of the 60% community allocation covering Tap to Earn and early user rewards.",
        "Eligibility is scored using active usage, task quality, level, referral quality and wallet verification.",
        "Bot, spam, multi-account and manipulation patterns are removed through automated or manual review.",
        "Snapshot date, claim period and vesting details will be announced through the official release calendar.",
      ],
    },
    releaseTitle: "Note",
    releaseText:
      "This document is the ADN Token lite paper presentation. Final legal framing, listing plans and technical contract details will be announced separately in official launch documents.",
    heroBadges: ["Tap to Earn", "Online Commerce", "Community Economy"],
    heroMetrics: [
      ["Active Model", "Missions + loyalty + payments"],
      ["Core Growth", "Community and product usage"],
      ["Primary Utility", "Gaming, commerce, rewards"],
    ],
    spotlightTitle: "What ADN Connects",
    spotlightText:
      "ADN unifies player engagement, merchant conversion goals and community loyalty behavior within a single value chain.",
    utilityStrip: [
      "In-game purchases",
      "Loyalty rewards",
      "Store discounts",
      "Mission incentives",
      "Community access",
    ],
    trustBar: [
      "Transparent allocation logic",
      "Real-user focused airdrop",
      "Anti-bot security layer",
      "Scalable product structure",
    ],
    ctaTitle: "Grow digital value with ADN",
    ctaText:
      "The lite paper brings together product vision, user growth, token utility and airdrop strategy in one professional presentation.",
    ctaPrimary: "Go to Airdrop",
    ctaSecondary: "Review Allocation",
  },
} as const;

function NavLink({ id, label, active }: { id: string; label: string; active?: boolean }) {
  const Icon = sectionIcons[id as SectionId] ?? Orbit;
  return (
    <a className={`nav-link ${active ? "active" : ""}`} href={`#${id}`}>
      <span className="nav-icon">
        <Icon size={14} strokeWidth={2.2} />
      </span>
      <span>{label}</span>
    </a>
  );
}

function SectionBadge({ id, label }: { id: SectionId; label: string }) {
  const Icon = sectionIcons[id];
  return (
    <span className="section-kicker">
      <span className="section-kicker-icon">
        <Icon size={14} strokeWidth={2.2} />
      </span>
      {label}
    </span>
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang>("tr");
  const [showIntro, setShowIntro] = useState(true);
  const [activeSection, setActiveSection] = useState<SectionId>("overview");
  const [glowShift, setGlowShift] = useState({ x: 0, y: 0 });
  const t = content[lang];
  const telegramBotUrl = import.meta.env.VITE_TELEGRAM_BOT_URL || "https://t.me/adntoken_bot?start=litepaper";

  useEffect(() => {
    const introTimer = window.setTimeout(() => {
      setShowIntro(false);
    }, 1200);

    return () => window.clearTimeout(introTimer);
  }, []);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal-on-scroll"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [lang]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id as SectionId);
        }
      },
      {
        rootMargin: "-18% 0px -52% 0px",
        threshold: [0.2, 0.35, 0.5, 0.7],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [lang]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = ((event.clientX / innerWidth) - 0.5) * 24;
      const y = ((event.clientY / innerHeight) - 0.5) * 24;
      setGlowShift({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="docs-shell">
      <div
        className="page-glow page-glow-one"
        style={{ transform: `translate3d(${glowShift.x}px, ${glowShift.y}px, 0)` }}
      />
      <div
        className="page-glow page-glow-two"
        style={{ transform: `translate3d(${-glowShift.x * 0.75}px, ${-glowShift.y * 0.75}px, 0)` }}
      />
      <div className={`intro-screen ${showIntro ? "visible" : "hidden"}`}>
        <div className="intro-core">
          <img src={adnTokenLogo} alt="ADN Token" className="intro-logo" />
          <div className="intro-title">{t.brandTitle}</div>
          <div className="intro-subtitle">{t.brandSubtitle}</div>
        </div>
      </div>

      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">
            <img src={adnTokenLogo} alt="ADN Token" className="brand-logo-image" />
          </div>
          <div>
            <strong>{t.brandTitle}</strong>
            <span>{t.brandSubtitle}</span>
          </div>
        </div>

        <div className="topbar-controls">
          <div className="topbar-links">
            {t.topLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>

          <div className="lang-switch" aria-label={t.langLabel}>
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
        </div>
      </header>

      <div className="docs-layout">
        <aside className="sidebar">
          <div className="sidebar-card">
            <img src={adnTokenLogo} alt="ADN Token" className="sidebar-logo" />
            <div className="sidebar-title">{t.sidebarTitle}</div>
            <p>{t.sidebarText}</p>
          </div>

          <nav className="sidebar-nav">
            {t.nav.map((item) => (
              <NavLink
                key={item.id}
                id={item.id}
                label={item.label}
                active={activeSection === item.id}
              />
            ))}
          </nav>

          <div className="sidebar-note">
            <span className="note-label">{t.sidebarBadge}</span>
            <strong>{t.sidebarStrong}</strong>
            <p>{t.sidebarNote}</p>
          </div>
        </aside>

        <main className="content">
          <section id="overview" className="hero reveal-on-scroll is-visible">
            <div className="hero-copy">
              <SectionBadge id="overview" label={t.overviewKicker} />
              <div className="hero-brandline">
                <img src={adnTokenLogo} alt="ADN Token" className="hero-brand-emblem" />
                <div className="hero-brand-text">
                  <strong>ADN Token</strong>
                  <span>Lite Paper 2026</span>
                </div>
              </div>
              <h1>{t.overviewTitle}</h1>
              <p>{t.overviewText}</p>
              <div className="hero-badges">
                {t.heroBadges.map((badge) => (
                  <span key={badge} className="hero-badge">
                    {badge}
                  </span>
                ))}
              </div>
              <div className="hero-cta-row">
                <a
                  href={telegramBotUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="cta-btn primary hero-telegram-btn"
                >
                  <Send size={18} strokeWidth={2.3} />
                  <span>{lang === "tr" ? "Telegram Botunu Aç" : "Open Telegram Bot"}</span>
                </a>
                <a href="#airdrop" className="cta-btn secondary hero-telegram-btn secondary">
                  <Gift size={18} strokeWidth={2.3} />
                  <span>{lang === "tr" ? "Airdropa Geç" : "Go to Airdrop"}</span>
                </a>
              </div>
              <div className="hero-metrics">
                {t.heroMetrics.map(([label, value]) => (
                  <div className="hero-metric-card" key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-panel">
              <div className="hero-ambient hero-ambient-one" />
              <div className="hero-ambient hero-ambient-two" />
              <div className="hero-panel-brand">
                <img src={adnTokenLogo} alt="ADN Token" className="hero-logo" />
              </div>
              <div className="hero-token-stage">
                <div className="hero-ring hero-ring-one" />
                <div className="hero-ring hero-ring-two" />
                <div className="hero-token-core">
                  <img src={adnTokenLogo} alt="ADN Token" className="hero-token-image" />
                </div>
              </div>
              <div className="hero-panel-head">{t.quickFactsTitle}</div>
              <div className="fact-list">
                {t.quickFacts.map(([label, value]) => (
                  <div className="fact-item" key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="summary-grid">
            {t.highlights.map((item, index) => (
              <article
                className="summary-card reveal-on-scroll"
                key={item.title}
                style={{ ["--delay" as string]: `${index * 80}ms` }}
              >
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </section>

          <section className="spotlight-strip reveal-on-scroll">
            <div className="spotlight-copy">
              <SectionBadge id="solution" label={t.spotlightTitle} />
              <p>{t.spotlightText}</p>
            </div>
            <div className="utility-strip">
              {t.utilityStrip.map((item) => (
                <span key={item} className="utility-pill">
                  {item}
                </span>
              ))}
            </div>
          </section>

          <section className="launch-billboard reveal-on-scroll">
            <div className="launch-copy">
              <SectionBadge id="overview" label={lang === "tr" ? "Lansman Vitrini" : "Launch Showcase"} />
              <h2>
                {lang === "tr"
                  ? "ADN Token için daha sıcak, daha premium ve daha dikkat çekici bir sahne"
                  : "A warmer, more premium and more compelling stage for ADN Token"}
              </h2>
              <p>
                {lang === "tr"
                  ? "Türkçe kampanya görseli öne alındı ve ilk izlenim alanı daha temiz bir lansman düzenine taşındı. Amaç; bilgi ile heyecanı aynı yüzeyde buluşturarak değer, güven ve hareket hissi üretmek."
                  : "The Turkish campaign visual is now featured up front with a cleaner launch layout. The goal is to combine information and excitement on the same surface while creating value, trust and momentum."}
              </p>

              <div className="launch-points">
                <div className="launch-point">
                  <strong>{lang === "tr" ? "Altın Enerji" : "Golden Energy"}</strong>
                  <span>{lang === "tr" ? "Daha sıcak ve premium atmosfer" : "A warmer and more premium mood"}</span>
                </div>
                <div className="launch-point">
                  <strong>{lang === "tr" ? "Temiz Hiyerarşi" : "Clean Hierarchy"}</strong>
                  <span>{lang === "tr" ? "Görsel karmaşa yerine net vurgu" : "Clear emphasis instead of visual clutter"}</span>
                </div>
                <div className="launch-point">
                  <strong>{lang === "tr" ? "Marka Etkisi" : "Brand Impact"}</strong>
                  <span>{lang === "tr" ? "Daha güçlü ilk temas" : "A stronger first touchpoint"}</span>
                </div>
              </div>
            </div>

            <article className="launch-main-visual">
              <img
                src={campaignVisualOne}
                alt={lang === "tr" ? "ADN Türkçe lansman görseli" : "ADN Turkish campaign visual"}
              />
              <div className="launch-main-overlay">
                <span>{lang === "tr" ? "Türkçe Lansman Serisi" : "Turkish Launch Series"}</span>
                <strong>{lang === "tr" ? "Topluluk ve güven odaklı açılış" : "Community and trust-led opening"}</strong>
              </div>
            </article>
          </section>

          <section id="economic-model" className="doc-section reveal-on-scroll">
            <SectionBadge id="economic-model" label={t.economicModel.kicker} />
            <h2>{t.economicModel.title}</h2>
            <p>{t.economicModel.text}</p>
            <div className="chart-card">
              <div className="model-stats-grid">
                {t.economicModel.stats.map(([label, value]) => (
                  <div className="model-stat-card" key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="problem" className="doc-section reveal-on-scroll">
            <SectionBadge id="problem" label={t.problem.kicker} />
            <h2>{t.problem.title}</h2>
            <p>{t.problem.text}</p>
          </section>

          <section id="solution" className="doc-section reveal-on-scroll">
            <SectionBadge id="solution" label={t.solution.kicker} />
            <h2>{t.solution.title}</h2>
            <div className="callout">{t.solution.callout}</div>
          </section>

          <section id="tap-to-earn" className="doc-section reveal-on-scroll">
            <SectionBadge id="tap-to-earn" label={t.tap.kicker} />
            <h2>{t.tap.title}</h2>
            <p>{t.tap.text}</p>
            <div className="card-grid feature-grid">
              {t.tap.items.map((item, index) => (
                <article
                  className="doc-card reveal-on-scroll"
                  key={item.title}
                  style={{ ["--delay" as string]: `${index * 90}ms` }}
                >
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="use-cases" className="doc-section reveal-on-scroll">
            <SectionBadge id="use-cases" label={t.useCases.kicker} />
            <h2>{t.useCases.title}</h2>
            <div className="card-grid">
              {t.useCases.items.map((useCase, index) => (
                <article
                  className="doc-card reveal-on-scroll"
                  key={useCase.title}
                  style={{ ["--delay" as string]: `${index * 90}ms` }}
                >
                  <h3>{useCase.title}</h3>
                  <ul>
                    {useCase.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section id="tokenomics" className="doc-section reveal-on-scroll">
            <SectionBadge id="tokenomics" label={t.tokenomics.kicker} />
            <h2>{t.tokenomics.title}</h2>
            <p className="section-note">{t.tokenomics.text}</p>
            <div className="chart-grid">
              <div className="chart-card">
                <div className="donut-wrap">
                  <div className="donut-chart" style={{ background: tokenomicsGradient }}>
                    <div className="donut-hole">
                      <strong>100B</strong>
                      <span>{t.tokenomics.center}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tokenomics-list">
                {tokenomics.map((item, index) => (
                  <article
                    className="metric-card reveal-on-scroll"
                    key={item.key}
                    style={{ ["--delay" as string]: `${index * 70}ms` }}
                  >
                    <span className="metric-label">
                      <span className="legend-dot" style={{ backgroundColor: item.color }} />
                      {t.tokenomics.labels[item.key]}
                    </span>
                    <strong>{item.value}%</strong>
                    <div className="progress-line">
                      <div
                        className="progress-line-fill"
                        style={{ width: `${item.value}%`, backgroundColor: item.color }}
                      />
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="infographic-grid">
              <article className="infographic-card reveal-on-scroll">
                <div className="infographic-head">
                  <span className="info-icon">
                    <BadgeDollarSign size={18} strokeWidth={2.2} />
                  </span>
                  <div>
                    <strong>{lang === "tr" ? "Token Fayda Katmanları" : "Token Utility Layers"}</strong>
                    <p>
                      {lang === "tr"
                        ? "ADN yalnızca ödül değil, doğrudan kullanım akışı üretir."
                        : "ADN is designed to power real product flows beyond rewards."}
                    </p>
                  </div>
                </div>
                <div className="utility-flow">
                  {(lang === "tr"
                    ? [
                        ["Görev", "Kullanıcı etkileşimi puan ve seviye üretir."],
                        ["Ödül", "Hak edilen ADN sadakat davranışını güçlendirir."],
                        ["Harcama", "Token oyun ve mağaza deneyiminde kullanılır."],
                        ["Erişim", "Topluluk görevleri ve özel kampanyalar açılır."],
                      ]
                    : [
                        ["Tasks", "User activity creates points and progression signals."],
                        ["Rewards", "Earned ADN reinforces loyalty behavior."],
                        ["Spending", "Token utility expands into gaming and merchant flows."],
                        ["Access", "Community campaigns and gated benefits unlock."],
                      ]
                  ).map(([title, text]) => (
                    <div className="utility-flow-item" key={title}>
                      <span>{title}</span>
                      <strong>{text}</strong>
                    </div>
                  ))}
                </div>
              </article>

              <article className="infographic-card reveal-on-scroll">
                <div className="infographic-head">
                  <span className="info-icon">
                    <Globe size={18} strokeWidth={2.2} />
                  </span>
                  <div>
                    <strong>{lang === "tr" ? "Partner Akış Modeli" : "Partner Flow Model"}</strong>
                    <p>
                      {lang === "tr"
                        ? "Merchant tarafı, kullanıcı kazanımını doğrudan ticarete bağlar."
                        : "The merchant side converts user growth into measurable commerce activity."}
                    </p>
                  </div>
                </div>
                <div className="partner-flow">
                  {(lang === "tr"
                    ? [
                        "Kampanya ve görev yayına alınır",
                        "Topluluk uygulamada etkileşim üretir",
                        "Cüzdan ve uygunluk doğrulanır",
                        "İndirim, cashback veya claim akışı tetiklenir",
                      ]
                    : [
                        "Campaigns and missions go live",
                        "The community generates in-app activity",
                        "Wallet and eligibility checks are completed",
                        "Discount, cashback or claim flows are triggered",
                      ]
                  ).map((item, index) => (
                    <div className="partner-step" key={item}>
                      <span>{`0${index + 1}`}</span>
                      <strong>{item}</strong>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </section>

          <section id="architecture" className="doc-section reveal-on-scroll">
            <SectionBadge id="architecture" label={t.architecture.kicker} />
            <h2>{t.architecture.title}</h2>
            <ol className="steps">
              {t.architecture.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>

          <section id="security" className="doc-section reveal-on-scroll">
            <SectionBadge id="security" label={t.security.kicker} />
            <h2>{t.security.title}</h2>
            <div className="security-visual-grid">
              <article className="security-visual-card reveal-on-scroll">
                <div className="infographic-head">
                  <span className="info-icon">
                    <LockKeyhole size={18} strokeWidth={2.2} />
                  </span>
                  <div>
                    <strong>{lang === "tr" ? "Captcha Doğrulama Katmanı" : "Captcha Verification Layer"}</strong>
                    <p>
                      {lang === "tr"
                        ? "Airdrop ve görev akışında bot baskısını düşüren çok adımlı doğrulama yapısı."
                        : "A multi-step verification layer that reduces bot pressure across missions and airdrop flows."}
                    </p>
                  </div>
                </div>

                <div className="captcha-mock">
                  <div className="captcha-window">
                    <div className="captcha-head">
                      <span>{lang === "tr" ? "Güvenlik Kontrolü" : "Security Check"}</span>
                      <BadgeCheck size={18} strokeWidth={2.4} />
                    </div>
                    <div className="captcha-body">
                      <div className="captcha-box checked">
                        <span className="captcha-tick">✓</span>
                        <strong>{lang === "tr" ? "İnsan doğrulaması tamamlandı" : "Human verification complete"}</strong>
                      </div>
                      <div className="captcha-meta">
                        <span>{lang === "tr" ? "Captcha skoru" : "Captcha score"}</span>
                        <strong>98/100</strong>
                      </div>
                      <div className="captcha-meta">
                        <span>{lang === "tr" ? "Risk sinyali" : "Risk signal"}</span>
                        <strong>{lang === "tr" ? "Düşük" : "Low"}</strong>
                      </div>
                    </div>
                  </div>
                  <div className="captcha-points">
                    {(lang === "tr"
                      ? [
                          ["Davranış Analizi", "Tıklama ritmi, görev süresi ve cihaz paterni birlikte izlenir."],
                          ["Cihaz İmzası", "Şüpheli tekrarlar fingerprint ve oturum verisiyle filtrelenir."],
                          ["Claim Koruması", "Airdrop talebi öncesi ek doğrulama katmanı devreye girer."],
                        ]
                      : [
                          ["Behavior Analysis", "Tap rhythm, mission duration and device patterns are monitored together."],
                          ["Device Signature", "Suspicious repetition is filtered through fingerprint and session data."],
                          ["Claim Protection", "An extra verification layer activates before the airdrop claim step."],
                        ]
                    ).map(([title, text]) => (
                      <div className="captcha-point" key={title}>
                        <span>{title}</span>
                        <strong>{text}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </article>

              <article className="security-visual-card reveal-on-scroll">
                <div className="infographic-head">
                  <span className="info-icon">
                    <Fingerprint size={18} strokeWidth={2.2} />
                  </span>
                  <div>
                    <strong>{lang === "tr" ? "Risk Skorlama Şeması" : "Risk Scoring Scheme"}</strong>
                    <p>
                      {lang === "tr"
                        ? "Hesapların uygunluğu tek sinyal yerine çoklu güven göstergesiyle ölçülür."
                        : "Eligibility is measured through multiple trust indicators instead of a single signal."}
                    </p>
                  </div>
                </div>
                <div className="risk-layers">
                  {[
                    {
                      icon: <Bot size={18} strokeWidth={2.1} />,
                      title: lang === "tr" ? "Bot Filtresi" : "Bot Filter",
                      text:
                        lang === "tr"
                          ? "Otomasyon, tekrar ve spam davranışı temizlenir."
                          : "Automation, repetition and spam behavior are removed.",
                    },
                    {
                      icon: <Wallet size={18} strokeWidth={2.1} />,
                      title: lang === "tr" ? "Cüzdan Güveni" : "Wallet Trust",
                      text:
                        lang === "tr"
                          ? "Wallet geçmişi ve claim hazırlığı değerlendirilir."
                          : "Wallet history and claim readiness are evaluated.",
                    },
                    {
                      icon: <Store size={18} strokeWidth={2.1} />,
                      title: lang === "tr" ? "Kullanım Kalitesi" : "Usage Quality",
                      text:
                        lang === "tr"
                          ? "Görev, merchant ve topluluk davranışı birlikte puanlanır."
                          : "Mission, merchant and community behavior are scored together.",
                    },
                  ].map((item) => (
                    <div className="risk-layer-card" key={item.title}>
                      <span className="risk-icon">{item.icon}</span>
                      <div>
                        <strong>{item.title}</strong>
                        <p>{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </div>
            <ul className="governance-list">
              {t.security.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="visual-accent-grid reveal-on-scroll">
            <article className="visual-accent-card visual-accent-wide">
              <img
                src={campaignVisualFour}
                alt={lang === "tr" ? "ADN geniş kampanya görseli" : "ADN wide campaign visual"}
              />
              <div className="visual-accent-overlay">
                <span>{lang === "tr" ? "Pazar ve Marka Etkisi" : "Market and Brand Impact"}</span>
                <strong>{lang === "tr" ? "Değer anlatımını güçlendiren premium görsel dil" : "A premium visual language that strengthens value storytelling"}</strong>
              </div>
            </article>

            <article className="visual-accent-card visual-accent-tall">
              <img
                src={campaignVisualThree}
                alt={lang === "tr" ? "ADN dikey kampanya görseli" : "ADN vertical campaign visual"}
              />
              <div className="visual-accent-overlay">
                <span>{lang === "tr" ? "Sosyal Tanıtım" : "Social Promotion"}</span>
                <strong>{lang === "tr" ? "Topluluk tarafında daha enerjik görünüm" : "A more energetic look for community-facing promotion"}</strong>
              </div>
            </article>
          </section>

          <section id="roadmap" className="doc-section reveal-on-scroll">
            <SectionBadge id="roadmap" label={t.roadmap.kicker} />
            <h2>{t.roadmap.title}</h2>
            <div className="timeline">
              {t.roadmap.items.map((item, index) => (
                <article
                  className="timeline-item reveal-on-scroll"
                  key={item.phase}
                  style={{ ["--delay" as string]: `${index * 90}ms` }}
                >
                  <div className="timeline-phase">{item.phase}</div>
                  <div className="timeline-body">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="governance" className="doc-section reveal-on-scroll">
            <SectionBadge id="governance" label={t.governance.kicker} />
            <h2>{t.governance.title}</h2>
            <ul className="governance-list">
              {t.governance.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section id="airdrop" className="doc-section airdrop-section reveal-on-scroll">
            <SectionBadge id="airdrop" label={t.airdrop.kicker} />
            <h2>{t.airdrop.title}</h2>
            <div className="callout">{t.airdrop.callout}</div>
            <div className="airdrop-join-card reveal-on-scroll">
              <div className="airdrop-join-copy">
                <span className="airdrop-join-tag">
                  {lang === "tr" ? "Erken Katılım" : "Early Access"}
                </span>
                <h3>{lang === "tr" ? "Airdropa Katıl" : "Join the Airdrop"}</h3>
                <p>
                  {lang === "tr"
                    ? "Cüzdanını hazırla, görev geçmişini güçlendir ve resmi uygunluk duyuruları açıldığında ilk dalgada yer al."
                    : "Prepare your wallet, strengthen your mission history and be ready for the first official eligibility wave."}
                </p>
              </div>
              <div className="airdrop-join-actions">
                <a
                  href={telegramBotUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="cta-btn primary"
                >
                  {lang === "tr" ? "Botta Katılımı Başlat" : "Start in Telegram Bot"}
                </a>
                <a href="#tap-to-earn" className="cta-btn primary">
                  {lang === "tr" ? "Görev Akışını İncele" : "Explore Mission Flow"}
                </a>
                <a href="#overview" className="cta-btn secondary">
                  {lang === "tr" ? "Cüzdanını Hazırla" : "Prepare Your Wallet"}
                </a>
              </div>
            </div>
            <div className="join-flow-band reveal-on-scroll">
              {[
                {
                  icon: <Zap size={18} strokeWidth={2.2} />,
                  title: lang === "tr" ? "1. Görevleri Tamamla" : "1. Complete Missions",
                },
                {
                  icon: <ShieldCheck size={18} strokeWidth={2.2} />,
                  title: lang === "tr" ? "2. Captcha ve Hesap Doğrula" : "2. Verify Captcha and Account",
                },
                {
                  icon: <Wallet size={18} strokeWidth={2.2} />,
                  title: lang === "tr" ? "3. Wallet Hazırla" : "3. Prepare Wallet",
                },
                {
                  icon: <Gift size={18} strokeWidth={2.2} />,
                  title: lang === "tr" ? "4. Claim Dalgasına Katıl" : "4. Join the Claim Wave",
                },
              ].map((item) => (
                <div className="join-flow-step" key={item.title}>
                  <span className="join-flow-icon">{item.icon}</span>
                  <strong>{item.title}</strong>
                </div>
              ))}
            </div>
            <div className="eligibility-grid">
              {(lang === "tr"
                ? [
                    ["Aktif Kullanım", "Düzenli giriş, görev tamamlama ve seviye ilerlemesi."],
                    ["Temiz Hesap", "Bot, spam ve çoklu hesap filtresinden geçen profiller."],
                    ["Cüzdan Doğrulaması", "Talep sürecine uygun güvenilir wallet bağlantısı."],
                    ["Topluluk Katkısı", "Referans kalitesi, sadakat ve kampanya uyumu."],
                  ]
                : [
                    ["Active Usage", "Consistent logins, mission completion and level progression."],
                    ["Clean Account", "Profiles that pass bot, spam and multi-account filters."],
                    ["Wallet Verification", "A reliable wallet connection ready for claim periods."],
                    ["Community Contribution", "Referral quality, loyalty and campaign alignment."],
                  ]
              ).map(([title, text]) => (
                <article className="eligibility-card reveal-on-scroll" key={title}>
                  <span>{title}</span>
                  <strong>{text}</strong>
                </article>
              ))}
            </div>
            <ul className="governance-list">
              {t.airdrop.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="trust-bar reveal-on-scroll">
            {t.trustBar.map((item) => (
              <div className="trust-pill" key={item}>
                {item}
              </div>
            ))}
          </section>

          <section className="cta-panel reveal-on-scroll">
            <div className="cta-copy">
              <SectionBadge id="overview" label="ADN" />
              <h2>{t.ctaTitle}</h2>
              <p>{t.ctaText}</p>
            </div>
            <div className="cta-actions">
              <a href="#airdrop" className="cta-btn primary">
                {t.ctaPrimary}
              </a>
              <a href="#tokenomics" className="cta-btn secondary">
                {t.ctaSecondary}
              </a>
            </div>
          </section>

          <section className="footer-note reveal-on-scroll">
            <img src={adnTokenLogo} alt="ADN Token" className="footer-logo" />
            <strong>{t.releaseTitle}</strong>
            <p>{t.releaseText}</p>
          </section>
        </main>
      </div>
    </div>
  );
}
