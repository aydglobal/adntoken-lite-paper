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
  Gift,
  HelpCircle,
  Landmark,
  LockKeyhole,
  Rocket,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
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

type Lang = "tr" | "en";
type PageKey = "overview" | "product" | "economy" | "trust" | "roadmap";

type HeroMetric = {
  label: string;
  value: string;
  note: string;
};

type PopupState = {
  eyebrow: string;
  title: string;
  text: string;
  bullets?: string[];
} | null;

type Copy = {
  brandSubtitle: string;
  entrance: {
    kicker: string;
    title: string;
    text: string;
    note: string;
  };
  hero: {
    kicker: string;
    title: string;
    text: string;
    primary: string;
    secondary: string;
    tertiary: string;
    badges: string[];
    stats: HeroMetric[];
    stageTitle: string;
    stageText: string;
    quickFacts: Array<{ label: string; value: string }>;
  };
  footer: {
    title: string;
    text: string;
    legal: string;
  };
};

const tokenWidths = [35, 20, 15, 10, 10, 5, 5];
const emissionWidths = [88, 58, 36];

const copy: Record<Lang, Copy> = {
  tr: {
    brandSubtitle: "From Zero to Power | Oyunlaştırılmış servet ve sadakat motoru",
    entrance: {
      kicker: "Canlı Açılış",
      title: "ADN ekosistemine hoş geldiniz",
      text:
        "ADN; sıfırdan başlayan kullanıcıyı strateji, süreklilik, yükseltme ve topluluk gücüyle büyüten yeni nesil Tap to Earn ekosistemidir.",
      note: "İçeriğe geçmek için sağ üstteki çarpıya dokunun.",
    },
    hero: {
      kicker: "Resmi Lite Paper",
      title: "ADN Token, sıfırdan güce uzanan oyunlaştırılmış dijital servet motorudur.",
      text:
        "Tap to Earn, progression, prestige, clan ekonomisi, airdrop uygunluğu ve dijital ticaret ADN içinde aynı davranış motorunda birleşir. Amaç kısa vadeli hype değil; güçlü retention, sürdürülebilir ekonomi ve görünür ürün faydasıdır.",
      primary: "Telegram Botunu Aç",
      secondary: "Ekonomiyi Gör",
      tertiary: "Açılışı Yeniden Aç",
      badges: ["Tap to Earn", "Airdrop", "Digital Commerce", "Prestige Engine"],
      stats: [
        {
          label: "Ekonomi Prensibi",
          value: "Retention > Hype",
          note: "ADN, kısa vadeli çıkarım yerine uzun vadeli davranış ve sadakat üretmeyi hedefler.",
        },
        {
          label: "Toplam Arz",
          value: "1B ADN",
          note: "Sayıdan çok akış önemlidir; ADN ekonomisi kontrollü emisyon ve güçlü sink tasarımıyla dengelenir.",
        },
        {
          label: "Topluluk Payı",
          value: "60%",
          note: "Topluluk, airdrop, görev ekonomisi ve sosyal büyüme ADN modelinin merkezindedir.",
        },
      ],
      stageTitle: "Topluluk odaklı büyüme",
      stageText: "Ürün, görünürlük ve güven aynı premium sahnede birleşir.",
      quickFacts: [
        { label: "Kategori", value: "Gamified wealth engine" },
        { label: "Ana Ürün", value: "Tap to Earn + progression" },
        { label: "Sosyal Katman", value: "Clan, leaderboard, referral" },
        { label: "Odak", value: "Sürdürülebilir retention" },
      ],
    },
    footer: {
      title: "Yasal ve gizlilik notu",
      text:
        "Bu lite paper tanıtım ve bilgilendirme amacı taşır. Nihai teknik, hukuki ve operasyonel detaylar resmi duyurularla netleşir.",
      legal: "© 2026 ADN Token. Tüm hakları saklıdır.",
    },
  },
  en: {
    brandSubtitle: "From Zero to Power | A gamified wealth and loyalty engine",
    entrance: {
      kicker: "Live Entrance",
      title: "Welcome to the ADN ecosystem",
      text:
        "ADN is a next-generation Tap to Earn ecosystem where users start from zero and grow through strategy, consistency, upgrades and community power.",
      note: "Use the close icon at the top right to enter the site.",
    },
    hero: {
      kicker: "Official Lite Paper",
      title: "ADN Token is a gamified digital wealth engine built for the journey from zero to power.",
      text:
        "Tap to Earn, progression, prestige, clan economy, airdrop eligibility and digital commerce are unified inside one behavior-driven engine. The goal is not short-term hype, but durable retention, sustainable tokenomics and visible product utility.",
      primary: "Open Telegram Bot",
      secondary: "View Economy",
      tertiary: "Reopen Entrance",
      badges: ["Tap to Earn", "Airdrop", "Digital Commerce", "Prestige Engine"],
      stats: [
        {
          label: "Economic Principle",
          value: "Retention > Hype",
          note: "ADN is designed around long-term user behavior and loyalty instead of extraction-driven hype.",
        },
        {
          label: "Total Supply",
          value: "1B ADN",
          note: "Flow matters more than raw supply; the ADN economy is stabilized by controlled emission and strong sinks.",
        },
        {
          label: "Community Share",
          value: "60%",
          note: "Community, airdrop, missions and social expansion remain at the center of the ADN design.",
        },
      ],
      stageTitle: "Community-led growth",
      stageText: "Product, visibility and trust grow together on one premium stage.",
      quickFacts: [
        { label: "Category", value: "Gamified wealth engine" },
        { label: "Core Product", value: "Tap to Earn + progression" },
        { label: "Social Layer", value: "Clan, leaderboard, referral" },
        { label: "Focus", value: "Sustainable retention" },
      ],
    },
    footer: {
      title: "Legal and privacy note",
      text:
        "This lite paper is prepared for promotional and informational purposes. Final technical, legal and operational details will be clarified through official announcements.",
      legal: "© 2026 ADN Token. All rights reserved.",
    },
  },
};

const pageTabs: Record<Lang, Array<{ key: PageKey; label: string; caption: string }>> = {
  tr: [
    { key: "overview", label: "Genel Bakış", caption: "Özet, problem ve çözüm" },
    { key: "product", label: "Ürün", caption: "Oynanış, sistemler ve kullanım" },
    { key: "economy", label: "Ekonomi", caption: "Dağılım, utility ve büyüme" },
    { key: "trust", label: "Güven", caption: "Doğrulama, AI ve SSS" },
    { key: "roadmap", label: "Yol Haritası", caption: "Aşamalar, fark ve vizyon" },
  ],
  en: [
    { key: "overview", label: "Overview", caption: "Summary, problem and solution" },
    { key: "product", label: "Product", caption: "Gameplay, systems and utility" },
    { key: "economy", label: "Economy", caption: "Allocation, utility and growth" },
    { key: "trust", label: "Trust", caption: "Verification, AI and FAQ" },
    { key: "roadmap", label: "Roadmap", caption: "Phases, edge and vision" },
  ],
};

const pageSubnav: Record<Lang, Record<PageKey, Array<{ id: string; label: string }>>> = {
  tr: {
    overview: [
      { id: "overview-thesis", label: "Tez" },
      { id: "overview-problem", label: "Problem & Çözüm" },
      { id: "overview-loop", label: "Oyun Döngüsü" },
    ],
    product: [
      { id: "product-mechanics", label: "Mekanikler" },
      { id: "product-systems", label: "Derin Sistemler" },
      { id: "product-usecases", label: "Kullanım Alanları" },
    ],
    economy: [
      { id: "economy-tokenomics", label: "Tokenomics" },
      { id: "economy-emission", label: "Emisyon" },
      { id: "economy-growth", label: "Büyüme & Airdrop" },
    ],
    trust: [
      { id: "trust-security", label: "Güvenlik" },
      { id: "trust-ai", label: "AI Sistem" },
      { id: "trust-faq", label: "SSS & Yasal" },
    ],
    roadmap: [
      { id: "roadmap-phases", label: "Fazlar" },
      { id: "roadmap-edge", label: "Neden ADN?" },
      { id: "roadmap-vision", label: "Final Vizyon" },
    ],
  },
  en: {
    overview: [
      { id: "overview-thesis", label: "Thesis" },
      { id: "overview-problem", label: "Problem & Solution" },
      { id: "overview-loop", label: "Core Loop" },
    ],
    product: [
      { id: "product-mechanics", label: "Mechanics" },
      { id: "product-systems", label: "Deep Systems" },
      { id: "product-usecases", label: "Use Cases" },
    ],
    economy: [
      { id: "economy-tokenomics", label: "Tokenomics" },
      { id: "economy-emission", label: "Emission" },
      { id: "economy-growth", label: "Growth & Airdrop" },
    ],
    trust: [
      { id: "trust-security", label: "Security" },
      { id: "trust-ai", label: "AI System" },
      { id: "trust-faq", label: "FAQ & Legal" },
    ],
    roadmap: [
      { id: "roadmap-phases", label: "Phases" },
      { id: "roadmap-edge", label: "Why ADN?" },
      { id: "roadmap-vision", label: "Final Vision" },
    ],
  },
};

const overviewDetails = {
  tr: {
    thesisBadge: "Temel Tez",
    thesisTitle: "ADN davranış odaklı bir ekonomik motordur",
    thesisText:
      "Kullanıcı sıfırdan başlar, dokunur, kazanır, yükseltir, kilit açar, gücünü katlar ve prestige ile gelecekteki kazancını büyütür. ADN bu yolculuğu enflasyon yerine kontrollü emisyon, sosyal rekabet ve uzun vadeli retention ile destekler.",
    metrics: [
      {
        title: "Progression-first design",
        value: "6+ katman",
        text: "Tap, upgrade, unlock, multiply, prestige ve sosyal sistemler aynı akışta çalışır.",
      },
      {
        title: "Retention loop",
        value: "Uzun vadeli",
        text: "Günlük görev, haftalık etkinlik, streak bonusu ve limited challenge yapısı birlikte işler.",
      },
      {
        title: "Social competition",
        value: "Clan + war",
        text: "Klanlar, liderlik tabloları ve referans sistemleri organik büyümeyi hızlandırır.",
      },
      {
        title: "Controlled economy",
        value: "Burn + prestige",
        text: "Token sink ve prestige reset yapısı ekonomi dengesini korur.",
      },
    ],
    problemTitle: "Problemin özeti",
    problemText:
      "Çoğu Tap to Earn ve Play to Earn proje; sürdürülemez ödül, yüzeysel oynanış, zayıf motivasyon, hızlı enflasyon ve ilk hype sonrası kullanıcı kaybı nedeniyle çöker.",
    solutionTitle: "ADN çözümü",
    solutionText:
      "ADN; eforu büyümeye, zamanı bileşik avantaja ve beceriyi daha yüksek kazanca dönüştüren çok katmanlı progression ekonomisi kurar.",
    compare: [
      { legacy: "Kısa vadeli extraction", adn: "Davranış tabanlı sürdürülebilir ekonomi" },
      { legacy: "Lineer ve sıkıcı grind", adn: "Tap, chest, combo ve prestige ile katmanlı tempo" },
      { legacy: "İlk hype sonrası terk edilme", adn: "Streak, görev, klan ve sezon döngüsüyle retention" },
      { legacy: "Enflasyon çöküşü", adn: "Kontrollü emisyon, burn sink ve whale dengeleme" },
    ],
    loopTitle: "Çekirdek oyun döngüsü",
    loopText:
      "ADN lineer tıklama oyunu değildir. Her adım bir sonrakini büyütür, prestige ise eski emeği gelecekteki kazanca dönüştürür.",
    loopSteps: ["Tap", "Earn", "Upgrade", "Unlock", "Multiply", "Prestige", "Repeat"],
    loopNote:
      "Bu döngü kullanıcıyı yalnızca tıklamaya değil; doğru zamanda yükseltmeye, fırsat avlamaya ve daha verimli büyümeye iter.",
  },
  en: {
    thesisBadge: "Core Thesis",
    thesisTitle: "ADN is a behavior-driven economic engine",
    thesisText:
      "Users start from zero, tap, earn, upgrade, unlock, multiply and prestige into stronger future income. ADN supports that journey through controlled emission, social competition and durable retention instead of inflationary collapse.",
    metrics: [
      {
        title: "Progression-first design",
        value: "6+ layers",
        text: "Tap, upgrade, unlock, multiply, prestige and social systems work inside one loop.",
      },
      {
        title: "Retention loop",
        value: "Long-term",
        text: "Daily missions, weekly events, streak bonuses and limited-time challenges work together.",
      },
      {
        title: "Social competition",
        value: "Clan + war",
        text: "Clans, leaderboards and referrals accelerate organic growth.",
      },
      {
        title: "Controlled economy",
        value: "Burn + prestige",
        text: "Token sinks and prestige resets protect economic balance.",
      },
    ],
    problemTitle: "The problem",
    problemText:
      "Most Tap to Earn and Play to Earn projects fail because rewards become unsustainable, gameplay is shallow, motivation fades, inflation grows fast and users leave after the first hype wave.",
    solutionTitle: "The ADN solution",
    solutionText:
      "ADN introduces a multi-layer progression economy where effort becomes growth, time becomes compounding advantage and skill becomes higher earnings.",
    compare: [
      { legacy: "Short-term extraction", adn: "Behavior-driven sustainable economy" },
      { legacy: "Linear repetitive grind", adn: "Layered tempo with tap, chest, combo and prestige" },
      { legacy: "Drop-off after hype", adn: "Retention through missions, streaks, clans and seasons" },
      { legacy: "Inflation collapse", adn: "Controlled emission, burn sinks and whale balancing" },
    ],
    loopTitle: "Core game loop",
    loopText:
      "ADN is not a linear clicker. Every step compounds into the next one, while prestige converts previous effort into future acceleration.",
    loopSteps: ["Tap", "Earn", "Upgrade", "Unlock", "Multiply", "Prestige", "Repeat"],
    loopNote:
      "This loop pushes the user beyond tapping into timing, strategy, optimization and higher-value progression decisions.",
  },
};

const productDetails = {
  tr: {
    mechanicsTitle: "Tap endpoint ve çekirdek mekanikler",
    mechanicsText:
      "Gönderdiğin tap reward, chest drop ve prestige bonus mantığı korunur. ADN bu üç yapıyı ürün omurgasına yerleştirerek oyunu daha canlı, daha stratejik ve daha kalıcı hale getirir.",
    mechanics: [
      {
        title: "Tap Reward",
        code: "const reward = calculateTapReward(BASE_TAP);",
        effect: "Her dokunuşu ölçülebilir bir temel gelir katmanına dönüştürür.",
      },
      {
        title: "Chest Drop",
        code: "if (Math.random() < 0.1) {\n  const chest = rollChest();\n}",
        effect: "Belki büyük ödül gelir hissi yaratarak heyecan ve geri dönüş motivasyonu üretir.",
      },
      {
        title: "Prestige Bonus",
        code: "const bonus = calculatePrestigeBonus(user.level);",
        effect: "Sıfırlanmayı ceza değil, gelecekteki kazanç için bir çarpan fırsatına dönüştürür.",
      },
    ],
    systemsTitle: "Derin oyun sistemleri",
    systems: [
      {
        title: "Combo System",
        text: "Arka arkaya aksiyonlar çarpanı yükseltir ve aktif oyuncuyu daha verimli hale getirir.",
      },
      {
        title: "Loot / Chest System",
        text: "Rastgele ödül katmanı sürpriz, FOMO ve dopamine dayalı retention etkisi üretir.",
      },
      {
        title: "Prestige System",
        text: "İlerlemenin sıfırlanıp kalıcı bonusla geri dönmesi enflasyona karşı çekirdek savunmadır.",
      },
      {
        title: "Clan System",
        text: "Grup bonusları, ortak görevler ve klan savaşları sosyal yapıyı derinleştirir.",
      },
      {
        title: "Leaderboards",
        text: "Sezonluk sıralamalar rekabet üretir ve üst seviye oyuncu motivasyonunu canlı tutar.",
      },
      {
        title: "Dynamic Tasks",
        text: "Uyarlanan görevler kullanıcının davranışına göre değişir ve deneyimi taze tutar.",
      },
    ],
    useCasesTitle: "Gerçek kullanım alanları",
    useCases: [
      {
        title: "Tap to Earn",
        items: ["Günlük görev puanı", "Seviye, combo ve chest katmanı", "Prestige ile hızlanan büyüme"],
      },
      {
        title: "Airdrop",
        items: ["Davranış kalitesine bağlı uygunluk", "Görev, streak ve güven puanı", "Kademeli claim yapısı"],
      },
      {
        title: "Digital Commerce",
        items: ["Marketplace ve merchant işlemleri", "Cashback ve sadakat tetikleyicileri", "Klan ve etkinlik ödülleri"],
      },
    ],
    flowTitle: "Ürün akış şeması",
    flow: [
      "Tap ve görev ile baz gelir üretilir.",
      "Chest, combo ve upgrade ile verim artar.",
      "Unlock sistemi yeni gelir yüzeyleri açar.",
      "Prestige kalıcı bonus ve reset dengesi kurar.",
      "Clan, leaderboard ve referral büyümeyi hızlandırır.",
      "Marketplace ve airdrop katmanı gerçek utility üretir.",
    ],
  },
  en: {
    mechanicsTitle: "Tap endpoint and core mechanics",
    mechanicsText:
      "Your tap reward, chest drop and prestige bonus logic are preserved. ADN places those three systems at the center of the product so the game feels more alive, more strategic and more durable.",
    mechanics: [
      {
        title: "Tap Reward",
        code: "const reward = calculateTapReward(BASE_TAP);",
        effect: "Turns every tap into a measurable base income layer.",
      },
      {
        title: "Chest Drop",
        code: "if (Math.random() < 0.1) {\n  const chest = rollChest();\n}",
        effect: "Creates excitement and return motivation through the chance of a larger reward.",
      },
      {
        title: "Prestige Bonus",
        code: "const bonus = calculatePrestigeBonus(user.level);",
        effect: "Transforms resets into a multiplier opportunity for future earnings.",
      },
    ],
    systemsTitle: "Deep game systems",
    systems: [
      {
        title: "Combo System",
        text: "Consecutive actions raise the multiplier and reward active players more efficiently.",
      },
      {
        title: "Loot / Chest System",
        text: "Randomized rewards create surprise, FOMO and stronger retention.",
      },
      {
        title: "Prestige System",
        text: "Resetting progress with a permanent boost is the core anti-inflation mechanic.",
      },
      {
        title: "Clan System",
        text: "Group bonuses, shared missions and clan wars deepen the social layer.",
      },
      {
        title: "Leaderboards",
        text: "Seasonal rankings fuel competition and keep advanced players motivated.",
      },
      {
        title: "Dynamic Tasks",
        text: "Adaptive missions change with user behavior and keep the experience fresh.",
      },
    ],
    useCasesTitle: "Real utility zones",
    useCases: [
      {
        title: "Tap to Earn",
        items: ["Daily mission points", "Level, combo and chest layers", "Prestige-driven acceleration"],
      },
      {
        title: "Airdrop",
        items: ["Behavior-based eligibility", "Mission, streak and trust score", "Phased claim structure"],
      },
      {
        title: "Digital Commerce",
        items: ["Marketplace and merchant interactions", "Cashback and loyalty triggers", "Clan and event rewards"],
      },
    ],
    flowTitle: "Product flow schema",
    flow: [
      "Base income is generated through tap and missions.",
      "Chest, combo and upgrades increase efficiency.",
      "Unlock systems expand earning surfaces.",
      "Prestige creates permanent bonus with controlled reset.",
      "Clan, leaderboard and referral systems accelerate growth.",
      "Marketplace and airdrop layers create visible utility.",
    ],
  },
};

const economyDetails = {
  tr: {
    modelTitle: "ADN arz ve dağılım mantığı",
    modelText:
      "Toplam arz 1,000,000,000 ADN olarak tasarlanır. Ancak asıl kritik nokta sayı değil; tokenın sisteme nasıl girdiği, nasıl çıktığı ve hangi kurallarla dengelendiğidir.",
    modelStats: [
      { label: "Toplam Arz", value: "1B ADN", note: "Arz sabit tutulur; önemli olan kontrollü flow tasarımıdır." },
      { label: "Play & Earn Pool", value: "35%", note: "Oyuncu ödülleri için ayrılan ana havuzdur." },
      { label: "Burn Katmanı", value: "3 ana sink", note: "Upgrade, loot ve işlem ücretleri sürekli arz baskısı yaratır." },
      { label: "Günlük Emisyon", value: "0.5% max", note: "Aktif kullanıcı, burn rate ve harcama oranına göre ayarlanır." },
    ],
    utilityTitle: "Token utility katmanları",
    utility: [
      ["Upgrade purchases", "Yükseltme satın alımları ADN kullanımını sürekli hale getirir."],
      ["Prestige unlocks", "Prestige geçişleri ekonomik dengeyi güçlendirir."],
      ["Event participation", "Etkinlik, sezon ve özel mod girişleri ADN ile bağlanır."],
      ["Marketplace transactions", "Merchant ve mağaza katmanı gerçek kullanım alanı açar."],
    ],
    emissionTitle: "Emisyon modeli",
    emissionText:
      "Ödül miktarı oyunun safhasına göre değişir. Böylece ilk büyüme desteklenir, orta aşama dengelenir ve geç safhada beceri daha belirleyici hale gelir.",
    emission: [
      { stage: "Erken safha", label: "Yüksek ödül", text: "İlk kullanıcı kazanımı ve alışkanlık oluşumu hızlanır." },
      { stage: "Orta safha", label: "Dengeli ekonomi", text: "Verim, görev kalitesi ve sink mekanikleri denge kurar." },
      { stage: "Geç safha", label: "Beceri bazlı kazanç", text: "Strateji, seviye ve sosyal sistem kullanımı öne çıkar." },
    ],
    growthTitle: "Sosyal ve viral büyüme",
    growthText:
      "ADN büyümeyi reklam baskısıyla değil; davet, klan, rekabet ve görünür ödül psikolojisiyle organik olarak hızlandırır.",
    growth: [
      { title: "Referral", value: "Invite → multiplier", text: "Davet edilen kaliteli kullanıcı büyüme katsayısını yükseltir." },
      { title: "Clan Wars", value: "Shared rewards", text: "Topluluk savaşı hem etkileşim hem de ortak hedef üretir." },
      { title: "Leaderboards", value: "Seasonal reset", text: "Sezonlar rekabetin taze kalmasını sağlar." },
      { title: "Events", value: "FOMO loops", text: "Süreli görevler ve challenge akışı yeniden giriş üretir." },
    ],
    airdropTitle: "Airdrop ve uygunluk sistemi",
    airdropText:
      "Airdrop dağıtımı hype yerine gerçek kullanım, güven skoru ve davranış kalitesi üzerinden çalışır.",
    airdropFlow: ["Görevleri tamamla", "Captcha ve hesabı doğrula", "Cüzdanı eşleştir", "Claim dalgasına katıl"],
    eligibility: [
      ["Aktif kullanım", "Düzenli giriş, görev tamamlama, prestige ve seviye akışı"],
      ["Temiz hesap", "Bot, spam ve çoklu hesap filtresinden geçen profiller"],
      ["Topluluk katkısı", "Referans kalitesi, clan katılımı ve etkinlik davranışı"],
      ["Doğrulanmış cüzdan", "Claim döneminde güvenilir wallet eşleşmesi"],
    ],
  },
  en: {
    modelTitle: "ADN supply and allocation logic",
    modelText:
      "The total supply is designed at 1,000,000,000 ADN. But the more important issue is not the number itself, it is how tokens enter the system, leave the system and stay balanced over time.",
    modelStats: [
      { label: "Total Supply", value: "1B ADN", note: "The supply is fixed; the critical design issue is token flow." },
      { label: "Play & Earn Pool", value: "35%", note: "The primary reserve allocated to player rewards." },
      { label: "Burn Layer", value: "3 core sinks", note: "Upgrades, loot and transaction fees create continuous sink pressure." },
      { label: "Daily Emission", value: "0.5% max", note: "It can adjust based on active users, burn rate and spending ratio." },
    ],
    utilityTitle: "Token utility layers",
    utility: [
      ["Upgrade purchases", "Upgrades make ADN usage continuous across progression."],
      ["Prestige unlocks", "Prestige transitions reinforce economic balance."],
      ["Event participation", "Seasonal and special-mode entry can be tied to ADN utility."],
      ["Marketplace transactions", "Merchant and store flows create direct real-world usage."],
    ],
    emissionTitle: "Emission model",
    emissionText:
      "Reward output changes across the lifecycle of the product. Early adoption is supported, mid-game is balanced, and late-stage earnings become more skill-sensitive.",
    emission: [
      { stage: "Early stage", label: "Higher rewards", text: "Supports user acquisition and habit formation." },
      { stage: "Mid game", label: "Balanced economy", text: "Efficiency, mission quality and sinks create equilibrium." },
      { stage: "Late game", label: "Skill-based earning", text: "Strategy, level and social-system mastery matter more." },
    ],
    growthTitle: "Social and viral growth",
    growthText:
      "ADN scales through invites, clans, competition and visible reward psychology rather than pure paid acquisition pressure.",
    growth: [
      { title: "Referral", value: "Invite → multiplier", text: "High-quality referred users improve the growth coefficient." },
      { title: "Clan Wars", value: "Shared rewards", text: "Clan conflict creates engagement and common goals." },
      { title: "Leaderboards", value: "Seasonal reset", text: "Seasons keep competition fresh and recurring." },
      { title: "Events", value: "FOMO loops", text: "Limited challenges and event windows generate re-entry behavior." },
    ],
    airdropTitle: "Airdrop and eligibility system",
    airdropText:
      "Airdrop distribution is designed around real usage, trust score and behavior quality rather than hype alone.",
    airdropFlow: ["Complete missions", "Verify captcha and account", "Connect wallet", "Join the claim wave"],
    eligibility: [
      ["Active usage", "Consistent logins, missions, prestige and level progression"],
      ["Clean account", "Profiles passing bot, spam and multi-account filters"],
      ["Community contribution", "Referral quality, clan participation and event behavior"],
      ["Verified wallet", "Reliable wallet connection during claim windows"],
    ],
  },
};

const trustDetails = {
  tr: {
    securityTitle: "Güvenlik ve doğrulama katmanı",
    securityText:
      "ADN güven katmanı; bot baskısını azaltmak, uygunluk kalitesini korumak ve dağıtımın güvenilirliğini artırmak için görünür prensiplere dayanır.",
    security: [
      { title: "Captcha ve anti-bot", text: "Görev ve claim akışları çok katmanlı filtrelerle korunur." },
      { title: "Cüzdan doğrulama", text: "Katılım ve hak ediş süreci güvenilir wallet eşleşmesiyle ilerler." },
      { title: "Davranış skoru", text: "Aktif kullanım, tekrar kalitesi ve görev disiplini birlikte değerlendirilir." },
      { title: "Aşamalı dağıtım", text: "Claim ve ödül dalgaları kontrollü dönemler halinde yönetilir." },
    ],
    trustTitle: "ADN güven çerçevesi",
    trustText:
      "Bu ilke seti; sürdürülebilir ekonomiyi, marka güvenliğini ve topluluk kalitesini aynı anda korumak için tasarlanır.",
    trustCards: [
      ["Gerçek kullanıcı skoru", "Ödül ve airdrop mantığı aktif davranış ve kaliteli katılım verisi üzerinden çalışır."],
      ["Şeffaf topluluk payı", "Topluluk ayrımı ve ana dağılım mantığı açık biçimde sunulur."],
      ["Aşamalı hak ediş", "Claim dalgaları kontrollü takvimlerle yürütülür."],
      ["Çoklu hesap filtresi", "Şüpheli tekrar ve ağ manipülasyonu sistem dışında bırakılır."],
      ["Partner uyum kontrolü", "Merchant ve kampanya akışı marka güvenliği standardına göre incelenir."],
      ["Rezerv disiplini", "Hazine ve teşvik alanları planlı kullanım ilkesiyle çalışır."],
    ],
    aiTitle: "AI-driven system",
    aiText:
      "ADN uyarlanabilir görev, ödül dengesi ve davranış analizi ile oyunu tek tip bir tıklama akışından çıkarır.",
    aiCards: [
      ["Personalized tasks", "Kullanıcı davranışına göre görev yoğunluğu ve kategori akışı kişiselleşir."],
      ["Smart reward balancing", "Ödül hacmi ekonomi sağlığına ve kullanıcı niteliğine göre optimize edilir."],
      ["Behavior-based progression", "Süreklilik, strateji ve görev disiplini büyüme hızını etkiler."],
      ["Anti-cheat detection", "Anormal pattern, bot izi ve kötüye kullanım sinyalleri otomatik ayıklanır."],
    ],
    faqTitle: "Sık sorulan sorular",
    faq: [
      ["ADN yalnızca bir token mı?", "Hayır. ADN; oyunu, ödülü, topluluk büyümesini ve ticareti aynı ekonomik motorda birleştiren ürün katmanıdır."],
      ["Tap to Earn neden daha güçlü?", "Çünkü chest, prestige, combo, görev ve sosyal rekabet tek loop içinde çalışır."],
      ["Airdrop neye göre dağılır?", "Aktif kullanım, temiz hesap, topluluk katkısı ve doğrulanmış cüzdan temel kriterlerdir."],
      ["Ekonomi neden daha dayanıklı?", "Kontrollü emisyon, burn sink, prestige reset ve whale dengeleme birlikte çalışır."],
    ],
    contractsTitle: "ADN smart contract mimarisi",
    contractsText:
      "Kurumsal yapı için token çekirdeği, ekonomi katmanı, progression katmanı ve trust katmanı birbirinden ayrılır. Böylece audit daha kolay, yönetim daha güvenli ve ekonomi daha şeffaf hale gelir.",
    contracts: [
      ["ADNToken.sol", "ERC20, capped supply, burn, pause ve rol bazlı mint akışını taşır."],
      ["ADNTreasury.sol", "Reward reserve, emission limit, sink split ve yetkili modül yönetimini yapar."],
      ["Reward Modules", "Tap, event, clan ve referral claim akışında imza doğrulama ve anti-replay çalışır."],
      ["VestingWallets", "Team, investor ve partner payları cliff + vesting planıyla tutulur."],
      ["Timelock + Multisig", "Hassas admin işlemleri gecikmeli ve görünür şekilde yürütülür."],
    ],
    legalTitle: "Legal disclaimer",
    legalText:
      "Bu lite paper yalnızca bilgilendirme ve tanıtım amacı taşır. Yatırım tavsiyesi, menkul kıymet teklifi veya garanti edilmiş getiri vaadi değildir.",
    privacyTitle: "Gizlilik sözleşmesi",
    privacyText:
      "Bot, görev, cüzdan ve kampanya akışlarında toplanan sınırlı veriler; güvenlik, uygunluk doğrulaması, kötüye kullanım önleme ve hizmet kalitesini artırma amacıyla işlenebilir.",
  },
  en: {
    securityTitle: "Security and verification layer",
    securityText:
      "The ADN trust layer is built on visible principles that reduce bot pressure, protect eligibility quality and improve distribution reliability.",
    security: [
      { title: "Captcha and anti-bot", text: "Mission and claim flows are protected by multi-layer filtering." },
      { title: "Wallet verification", text: "Participation and claiming move forward through reliable wallet matching." },
      { title: "Behavior score", text: "Active usage, repetition quality and mission discipline are evaluated together." },
      { title: "Phased distribution", text: "Claims and reward waves are managed through controlled time windows." },
    ],
    trustTitle: "ADN trust framework",
    trustText:
      "These principles protect sustainable economics, brand safety and community quality at the same time.",
    trustCards: [
      ["Real user score", "Reward and airdrop logic are based on active behavior and quality participation signals."],
      ["Transparent community share", "The main distribution logic is presented clearly."],
      ["Phased claiming", "Claim waves are executed through controlled calendars."],
      ["Multi-account filter", "Suspicious repetition and network manipulation remain outside the system."],
      ["Partner compliance", "Merchant and campaign flows are reviewed through brand-safety standards."],
      ["Reserve discipline", "Treasury and incentive areas operate under planned usage rules."],
    ],
    aiTitle: "AI-driven system",
    aiText:
      "ADN uses adaptive tasks, reward balancing and behavior analysis to move beyond a one-dimensional tapping loop.",
    aiCards: [
      ["Personalized tasks", "Mission intensity and category flow can adapt to user behavior."],
      ["Smart reward balancing", "Reward volume is optimized around economy health and user quality."],
      ["Behavior-based progression", "Consistency, strategy and mission discipline affect growth speed."],
      ["Anti-cheat detection", "Abnormal patterns, bot fingerprints and abuse signals are filtered automatically."],
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      ["Is ADN only a token?", "No. ADN is a product layer that unifies gameplay, rewards, community growth and commerce in one economy engine."],
      ["Why is the Tap to Earn layer stronger?", "Because chest, prestige, combo, missions and social competition work inside one loop."],
      ["How is the airdrop distributed?", "Active usage, clean account quality, community contribution and verified wallet signals are the core criteria."],
      ["Why is the economy more durable?", "Controlled emission, burn sinks, prestige resets and whale balancing work together."],
    ],
    contractsTitle: "ADN smart contract architecture",
    contractsText:
      "For a professional production setup, the asset layer, economy layer, progression layer and trust layer should remain separate. This makes audits easier, governance safer and token economics more transparent.",
    contracts: [
      ["ADNToken.sol", "Carries ERC20, capped supply, burn, pause and role-based mint logic."],
      ["ADNTreasury.sol", "Handles reward reserve, emission limits, sink splits and approved modules."],
      ["Reward Modules", "Tap, event, clan and referral claims can use signature validation and anti-replay protection."],
      ["VestingWallets", "Team, investor and partner allocations stay under cliff and vesting schedules."],
      ["Timelock + Multisig", "Sensitive admin actions execute with delay and visible governance."],
    ],
    legalTitle: "Legal disclaimer",
    legalText:
      "This lite paper is intended for informational and promotional purposes only. It is not investment advice, a securities offering or a guaranteed return statement.",
    privacyTitle: "Privacy policy",
    privacyText:
      "Limited data collected across bot, mission, wallet and campaign flows may be processed for security, eligibility verification, abuse prevention and service quality improvement.",
  },
};

const roadmapDetails = {
  tr: {
    title: "Büyüme fazları",
    phases: [
      { phase: "Phase 1", title: "Core Launch", text: "Tap sistemi, temel upgrade yapısı ve wallet entegrasyonu devreye alınır." },
      { phase: "Phase 2", title: "Economy Layer", text: "Token launch, marketplace ve burn mekanizmaları ekonomiyi derinleştirir." },
      { phase: "Phase 3", title: "Social Expansion", text: "Clan sistemi, leaderboards ve referral katmanı organik büyümeyi hızlandırır." },
      { phase: "Phase 4", title: "Advanced Systems", text: "AI görevler, event sistemi ve rekabetçi modlar ADN'yi daha güçlü hale getirir." },
    ],
    whyTitle: "Neden ADN kazanır?",
    whyText:
      "ADN; addictive gameplay, gerçek ekonomik fayda, uzun vadeli progression ve sosyal virality katmanlarını aynı stratejik motorda toplar.",
    whyCards: [
      ["Gameplay > click spam", "Sistem yalnızca tıklamaya değil; stratejiye, upgrade zamanlamasına ve prestij kararına dayanır."],
      ["Economy > extraction", "Burn sink, kontrollü emisyon ve whale balancing yapı taşları ekonomiyi korur."],
      ["Retention > hype", "Günlük ödül, streak, event ve sosyal rekabet kullanıcıyı geri çağırır."],
      ["Community > isolation", "Referral, clan, savaş ve leaderboard katmanı ürünü organik biçimde büyütür."],
    ],
    marketTitle: "Market ve yatırım tezi",
    marketCards: [
      ["$100B+ mobile gaming", "ADN, Web3 economy katmanını büyük mobil oyun davranışıyla birleştirir."],
      ["Telegram Mini App", "Frictionless onboarding ve viral paylaşım avantajı büyümenin gizli silahıdır."],
      ["Traction metrics", "DAU / MAU, session time ve revenue per user yatırımcı anlatısının çekirdeğidir."],
      ["Strategic ask", "Scaling, stratejik partnerlik ve exchange listing desteği ADN'nin bir sonraki sıçrama alanıdır."],
    ],
    visionTitle: "Final vizyon",
    visionText:
      "ADN yalnızca bir Tap to Earn uygulaması değil; servet, strateji ve etki üreten dijital yolculuktur. Hedef; oyun, ticaret, sadakat ve topluluk davranışını aynı ekonomik omurgada toplamak.",
    governance: [
      "Şeffaf yol haritası ve periyodik ürün iletişimi",
      "Topluluk sinyalini dikkate alan ürün öncelikleri",
      "Uyum odaklı partner kabul modeli",
      "Uzun vadeli sadakat ekonomisine dönüşen dijital marka altyapısı",
    ],
    ctaPrimary: "Telegram Botunu Aç",
    ctaSecondary: "Ekonomi Sayfasına Dön",
  },
  en: {
    title: "Growth phases",
    phases: [
      { phase: "Phase 1", title: "Core Launch", text: "The tap system, basic upgrades and wallet integration go live." },
      { phase: "Phase 2", title: "Economy Layer", text: "Token launch, marketplace and burn mechanisms deepen the economy." },
      { phase: "Phase 3", title: "Social Expansion", text: "Clan systems, leaderboards and referrals accelerate organic growth." },
      { phase: "Phase 4", title: "Advanced Systems", text: "AI tasks, event systems and competitive modes make ADN more resilient." },
    ],
    whyTitle: "Why ADN wins",
    whyText:
      "ADN combines addictive gameplay, real economic utility, long-term progression and social virality inside one strategic engine.",
    whyCards: [
      ["Gameplay > click spam", "The system depends on strategy, upgrade timing and prestige decisions, not empty tapping alone."],
      ["Economy > extraction", "Burn sinks, controlled emission and whale balancing protect the economy."],
      ["Retention > hype", "Daily rewards, streaks, events and social competition bring users back."],
      ["Community > isolation", "Referral, clans, wars and leaderboards grow the product organically."],
    ],
    marketTitle: "Market and investment thesis",
    marketCards: [
      ["$100B+ mobile gaming", "ADN connects a Web3 economy layer with large-scale mobile gaming behavior."],
      ["Telegram Mini App", "Frictionless onboarding and viral sharing act as a growth advantage."],
      ["Traction metrics", "DAU / MAU, session time and revenue per user sit at the center of the investor story."],
      ["Strategic ask", "Scaling support, strategic partnerships and exchange listings define the next leap."],
    ],
    visionTitle: "Final vision",
    visionText:
      "ADN is not only a Tap to Earn app. It is a digital journey that builds wealth, strategy and influence. The goal is to unify gaming, commerce, loyalty and community behavior inside one economic backbone.",
    governance: [
      "Transparent roadmap and periodic product communication",
      "Product priorities shaped by community signals",
      "Compliance-focused partner acceptance model",
      "A digital brand infrastructure that matures into a long-term loyalty economy",
    ],
    ctaPrimary: "Open Telegram Bot",
    ctaSecondary: "Back to Economy",
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

function SectionTitle({
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
    <div className="section-title">
      <SectionBadge icon={icon} label={label} />
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang>("tr");
  const [showEntrance, setShowEntrance] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [heroLight, setHeroLight] = useState({ x: 68, y: 34 });
  const [activePage, setActivePage] = useState<PageKey>("overview");
  const [modal, setModal] = useState<PopupState>(null);

  const t = copy[lang];
  const tabs = pageTabs[lang];
  const subnav = pageSubnav[lang][activePage];
  const overview = overviewDetails[lang];
  const product = productDetails[lang];
  const economy = economyDetails[lang];
  const trust = trustDetails[lang];
  const roadmap = roadmapDetails[lang];
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
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    document.querySelectorAll(".reveal-on-scroll").forEach((el) => revealObserver.observe(el));
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      revealObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lang, activePage]);

  useEffect(() => {
    const lockScroll = showEntrance || modal !== null;
    document.body.style.overflow = lockScroll ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showEntrance, modal]);

  const heroStyle = {
    "--hero-light-x": `${heroLight.x}%`,
    "--hero-light-y": `${heroLight.y}%`,
  } as CSSProperties;

  const openPage = (page: PageKey) => {
    setActivePage(page);
    requestAnimationFrame(() => {
      document.getElementById("page-switcher")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const scrollToSection = (id: string) => {
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const openPopup = (eyebrow: string, title: string, text: string, bullets?: string[]) => {
    setModal({ eyebrow, title, text, bullets });
  };

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
            aria-label={lang === "tr" ? "Girişi kapat" : "Close entrance"}
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

      {modal ? (
        <div className="detail-overlay" onClick={() => setModal(null)}>
          <div className="detail-modal reveal-on-scroll is-visible" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="detail-close"
              aria-label={lang === "tr" ? "Detay penceresini kapat" : "Close detail popup"}
              onClick={() => setModal(null)}
            >
              x
            </button>
            <span className="detail-eyebrow">{modal.eyebrow}</span>
            <h3>{modal.title}</h3>
            <p>{modal.text}</p>
            {modal.bullets?.length ? (
              <ul className="detail-list">
                {modal.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="page-glow page-glow-left" />
      <div className="page-glow page-glow-right" />

      <header className="topbar">
        <a href="#hero" className="brand">
          <span className="brand-mark">
            <img src={adnTokenMark} alt="ADN emblem" />
          </span>
          <div className="brand-copy">
            <strong className="brand-title">ADN Token</strong>
            <span>{t.brandSubtitle}</span>
          </div>
        </a>

        <div className="topbar-right">
          <nav className="topnav">
            {tabs.map((item) => (
              <button
                key={item.key}
                type="button"
                className={`topnav-btn ${activePage === item.key ? "active" : ""}`}
                onClick={() => openPage(item.key)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="lang-switch" aria-label="Language switch">
            <button type="button" className={`lang-btn ${lang === "tr" ? "active" : ""}`} onClick={() => setLang("tr")}>
              TR
            </button>
            <button type="button" className={`lang-btn ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")}>
              EN
            </button>
          </div>
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
              <button type="button" className="cta-btn secondary" onClick={() => openPage("economy")}>
                <BadgeDollarSign size={18} />
                <span>{t.hero.secondary}</span>
              </button>
              <button type="button" className="cta-btn ghost" onClick={() => setShowEntrance(true)}>
                <Star size={18} />
                <span>{t.hero.tertiary}</span>
              </button>
            </div>

            <div className="hero-stats">
              {t.hero.stats.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className="hero-stat popup-card"
                  onClick={() => openPopup(t.hero.kicker, item.value, item.note, [item.label])}
                >
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </button>
              ))}
            </div>
          </div>

          <div className="hero-stage">
            <div className="hero-stage-light" />
            <div className="hero-stage-ring hero-stage-ring-one" />
            <div className="hero-stage-ring hero-stage-ring-two" />
            <div className="hero-stage-head">
              <span>{t.hero.stageTitle}</span>
            </div>
            <img src={adnLionMascot} alt="ADN mascot" className="hero-mascot" />
            <img src={adnTokenMark} alt="ADN emblem" className="hero-stage-mark" />
            <div className="hero-stage-copy">
              <strong>{t.hero.stageText}</strong>
            </div>
            <div className="hero-facts">
              {t.hero.quickFacts.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className="hero-fact popup-card"
                  onClick={() => openPopup(t.hero.stageTitle, item.value, t.hero.stageText, [item.label])}
                >
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="page-switcher" className="page-switcher reveal-on-scroll">
          <div className="page-tab-list">
            {tabs.map((item) => (
              <button
                key={item.key}
                type="button"
                className={`page-tab ${activePage === item.key ? "active" : ""}`}
                onClick={() => openPage(item.key)}
              >
                <span className="page-tab-icon">
                  {{
                    overview: <Sparkles size={16} />,
                    product: <Zap size={16} />,
                    economy: <BadgeDollarSign size={16} />,
                    trust: <ShieldCheck size={16} />,
                    roadmap: <Rocket size={16} />,
                  }[item.key]}
                </span>
                <span className="page-tab-copy">
                  <strong>{item.label}</strong>
                  <small>{item.caption}</small>
                </span>
              </button>
            ))}
          </div>

          <div className="page-subnav">
            {subnav.map((item) => (
              <button key={item.id} type="button" className="subnav-btn" onClick={() => scrollToSection(item.id)}>
                {item.label}
              </button>
            ))}
          </div>
        </section>

        {activePage === "overview" && (
          <div className="page-stack">
            <section id="overview-thesis" className="pillars reveal-on-scroll">
              <SectionTitle icon={<Target size={16} />} label={overview.thesisBadge} title={overview.thesisTitle} text={overview.thesisText} />
              <div className="insight-grid">
                {overview.metrics.map((item) => (
                  <button
                    key={item.title}
                    type="button"
                    className="glass-card insight-card popup-card"
                    onClick={() => openPopup(overview.thesisBadge, item.title, item.text, [item.value])}
                  >
                    <span className="insight-value">{item.value}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </button>
                ))}
              </div>
            </section>

            <section id="overview-problem" className="section-block reveal-on-scroll">
              <div className="split-grid">
                <article className="glass-card essay-card">
                  <SectionTitle icon={<Target size={16} />} label={overview.problemTitle} title={overview.problemTitle} text={overview.problemText} />
                </article>
                <article className="glass-card essay-card">
                  <SectionTitle icon={<Gem size={16} />} label={overview.solutionTitle} title={overview.solutionTitle} text={overview.solutionText} />
                </article>
              </div>
              <div className="compare-grid">
                {overview.compare.map((item) => (
                  <article className="compare-card" key={item.legacy}>
                    <div>
                      <span className="compare-label muted">{lang === "tr" ? "Eski model" : "Legacy"}</span>
                      <strong>{item.legacy}</strong>
                    </div>
                    <div className="compare-arrow">-&gt;</div>
                    <div>
                      <span className="compare-label warm">ADN</span>
                      <strong>{item.adn}</strong>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section id="overview-loop" className="section-block reveal-on-scroll visual-section">
              <div className="visual-copy">
                <SectionTitle icon={<Blocks size={16} />} label={overview.loopTitle} title={overview.loopTitle} text={overview.loopText} />
                <div className="loop-board">
                  {overview.loopSteps.map((step, index) => (
                    <div className="loop-node" key={step}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <strong>{step}</strong>
                    </div>
                  ))}
                </div>
                <p className="loop-note">{overview.loopNote}</p>
              </div>
              <div className="visual-poster">
                <img src={campaignOne} alt="ADN campaign visual" />
              </div>
            </section>
          </div>
        )}

        {activePage === "product" && (
          <div className="page-stack">
            <section id="product-mechanics" className="section-block reveal-on-scroll">
              <SectionTitle icon={<Zap size={16} />} label={product.mechanicsTitle} title={product.mechanicsTitle} text={product.mechanicsText} />
              <div className="mechanic-grid">
                {product.mechanics.map((item) => (
                  <button
                    key={item.title}
                    type="button"
                    className="mechanic-card popup-card"
                    onClick={() => openPopup(product.mechanicsTitle, item.title, item.effect, [item.code])}
                  >
                    <h3>{item.title}</h3>
                    <pre>{item.code}</pre>
                    <p>{item.effect}</p>
                  </button>
                ))}
              </div>
            </section>

            <section id="product-systems" className="section-block reveal-on-scroll">
              <div className="split-grid usecase-layout">
                <div>
                  <SectionTitle icon={<Swords size={16} />} label={product.systemsTitle} title={product.systemsTitle} />
                  <div className="system-grid">
                    {product.systems.map((item) => (
                      <button
                        key={item.title}
                        type="button"
                        className="system-card popup-card"
                        onClick={() => openPopup(product.systemsTitle, item.title, item.text)}
                      >
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="visual-stack">
                  <img src={campaignThree} alt="ADN campaign vertical visual" />
                  <img src={campaignTwo} alt="ADN campaign board" />
                </div>
              </div>
            </section>

            <section id="product-usecases" className="section-block reveal-on-scroll">
              <div className="split-grid usecase-layout">
                <div>
                  <SectionTitle icon={<Store size={16} />} label={product.useCasesTitle} title={product.useCasesTitle} />
                  <div className="usecase-grid three-col">
                    {product.useCases.map((item) => (
                      <article className="glass-card compact" key={item.title}>
                        <h3>{item.title}</h3>
                        <ul className="clean-list">
                          {item.items.map((entry) => (
                            <li key={entry}>{entry}</li>
                          ))}
                        </ul>
                      </article>
                    ))}
                  </div>
                </div>
                <div>
                  <SectionTitle icon={<Blocks size={16} />} label={product.flowTitle} title={product.flowTitle} />
                  <div className="step-grid product-flow-grid">
                    {product.flow.map((item, index) => (
                      <article className="step-card" key={item}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <p>{item}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activePage === "economy" && (
          <div className="page-stack">
            <section id="economy-tokenomics" className="section-block reveal-on-scroll">
              <SectionTitle icon={<Landmark size={16} />} label={economy.modelTitle} title={economy.modelTitle} text={economy.modelText} />
              <div className="metric-grid">
                {economy.modelStats.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    className="glass-card compact metric-card popup-card"
                    onClick={() => openPopup(economy.modelTitle, item.value, item.note, [item.label])}
                  >
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </button>
                ))}
              </div>
            </section>

            <section className="section-block reveal-on-scroll">
              <SectionBadge icon={<BadgeDollarSign size={16} />} label="Tokenomics" />
              <div className="split-grid token-layout">
                <div className="token-chart-wrap">
                  <div className="token-chart">
                    <div className="token-chart-core">
                      <strong>1B</strong>
                      <span>ADN</span>
                    </div>
                  </div>
                </div>
                <div className="token-list">
                  {[
                    { label: lang === "tr" ? "Play & Earn Pool" : "Play & Earn Pool", value: "35%" },
                    { label: lang === "tr" ? "Ecosystem / Treasury" : "Ecosystem / Treasury", value: "20%" },
                    { label: lang === "tr" ? "Team" : "Team", value: "15%" },
                    { label: lang === "tr" ? "Investors" : "Investors", value: "10%" },
                    { label: lang === "tr" ? "Marketing & Growth" : "Marketing & Growth", value: "10%" },
                    { label: lang === "tr" ? "Partnerships" : "Partnerships", value: "5%" },
                    { label: lang === "tr" ? "Liquidity" : "Liquidity", value: "5%" },
                  ].map((item, index) => (
                    <button
                      key={item.label}
                      type="button"
                      className="token-row popup-card"
                      onClick={() =>
                        openPopup(
                          "Tokenomics",
                          `${item.label} • ${item.value}`,
                          lang === "tr"
                            ? "Bu dağılım alanı ADN ekonomisindeki rolüne göre planlanmıştır."
                            : "This allocation block is planned according to its role inside the ADN economy."
                        )
                      }
                    >
                      <div className="token-row-top">
                        <span>{item.label}</span>
                        <strong>{item.value}</strong>
                      </div>
                      <div className="token-bar">
                        <div className="token-bar-fill" style={{ width: `${tokenWidths[index]}%` }} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="vesting-grid">
                <article className="glass-card compact">
                  <h3>{lang === "tr" ? "Team vesting" : "Team vesting"}</h3>
                  <p>{lang === "tr" ? "12 ay cliff + 24 ay vesting" : "12 month cliff + 24 month vesting"}</p>
                </article>
                <article className="glass-card compact">
                  <h3>{lang === "tr" ? "Investor vesting" : "Investor vesting"}</h3>
                  <p>{lang === "tr" ? "%10 TGE + 12 ay vesting" : "10% TGE + 12 month vesting"}</p>
                </article>
                <article className="glass-card compact">
                  <h3>{lang === "tr" ? "Anti-whale" : "Anti-whale"}</h3>
                  <p>{lang === "tr" ? "Diminishing returns, soft cap ve progressive tax" : "Diminishing returns, soft cap and progressive tax"}</p>
                </article>
                <article className="glass-card compact">
                  <h3>{lang === "tr" ? "Altın kural" : "Golden rule"}</h3>
                  <p>{lang === "tr" ? "Sisteme giren token, sistemden çıkan tokenden küçük kalmalıdır." : "Token entering the system should stay below token leaving the system."}</p>
                </article>
              </div>
            </section>

            <section id="economy-emission" className="section-block reveal-on-scroll">
              <div className="split-grid">
                <article className="glass-card">
                  <SectionTitle icon={<Flame size={16} />} label={economy.emissionTitle} title={economy.emissionTitle} text={economy.emissionText} />
                  <div className="emission-grid">
                    {economy.emission.map((item, index) => (
                      <button
                        key={item.stage}
                        type="button"
                        className="emission-card popup-card"
                        onClick={() => openPopup(economy.emissionTitle, item.stage, item.text, [item.label])}
                      >
                        <div className="token-row-top">
                          <span>{item.stage}</span>
                          <strong>{item.label}</strong>
                        </div>
                        <div className="token-bar">
                          <div className="token-bar-fill" style={{ width: `${emissionWidths[index]}%` }} />
                        </div>
                        <p>{item.text}</p>
                      </button>
                    ))}
                  </div>
                </article>
                <article className="glass-card">
                  <SectionTitle icon={<BadgeCheck size={16} />} label={economy.utilityTitle} title={economy.utilityTitle} />
                  <div className="mini-grid">
                    {economy.utility.map(([title, text]) => (
                      <div className="mini-card" key={title}>
                        <strong>{title}</strong>
                        <p>{text}</p>
                      </div>
                    ))}
                  </div>
                  <div className="formula-card">
                    <strong>earn = (tap_power × combo_multiplier × upgrade_bonus) × economy_factor</strong>
                    <p>
                      {lang === "tr"
                        ? "economy_factor dinamik olarak 0.3 ile 1.2 arasında ayarlanır; sistem aşırı token basarsa düşer, denge sağlanırsa güçlenir."
                        : "economy_factor adjusts dynamically between 0.3 and 1.2; it falls when the system overheats and strengthens when balance improves."}
                    </p>
                    <strong>prestige_bonus = sqrt(total_earned)</strong>
                  </div>
                </article>
              </div>
            </section>

            <section id="economy-growth" className="section-block reveal-on-scroll">
              <SectionTitle icon={<Users size={16} />} label={economy.growthTitle} title={economy.growthTitle} text={economy.growthText} />
              <div className="metric-grid">
                {economy.growth.map((item) => (
                  <button
                    key={item.title}
                    type="button"
                    className="glass-card compact metric-card popup-card"
                    onClick={() => openPopup(economy.growthTitle, item.title, item.text, [item.value])}
                  >
                    <span>{item.title}</span>
                    <strong>{item.value}</strong>
                  </button>
                ))}
              </div>

              <SectionTitle icon={<Gift size={16} />} label={economy.airdropTitle} title={economy.airdropTitle} text={economy.airdropText} />
              <div className="airdrop-flow-grid">
                {economy.airdropFlow.map((item, index) => (
                  <button
                    key={item}
                    type="button"
                    className="flow-pill popup-card"
                    onClick={() => openPopup(economy.airdropTitle, item, economy.airdropText, [String(index + 1)])}
                  >
                    <span>{index + 1}</span>
                    <strong>{item}</strong>
                  </button>
                ))}
              </div>

              <div className="metric-grid">
                {economy.eligibility.map(([label, value]) => (
                  <article className="glass-card compact" key={label}>
                    <h3>{label}</h3>
                    <p>{value}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        )}

        {activePage === "trust" && (
          <div className="page-stack">
            <section id="trust-security" className="section-block reveal-on-scroll">
              <SectionTitle icon={<ShieldCheck size={16} />} label={trust.securityTitle} title={trust.securityTitle} text={trust.securityText} />
              <div className="security-grid">
                {[<Bot size={18} />, <Wallet size={18} />, <Target size={18} />, <Gift size={18} />].map((icon, index) => (
                  <article className="security-card" key={trust.security[index].title}>
                    <span className="security-icon">{icon}</span>
                    <h3>{trust.security[index].title}</h3>
                    <p>{trust.security[index].text}</p>
                  </article>
                ))}
              </div>

              <div className="split-grid trust-panels">
                <article className="glass-card captcha-panel">
                  <SectionTitle
                    icon={<LockKeyhole size={16} />}
                    label={lang === "tr" ? "Captcha doğrulama katmanı" : "Captcha verification layer"}
                    title={lang === "tr" ? "Captcha doğrulama katmanı" : "Captcha verification layer"}
                    text={
                      lang === "tr"
                        ? "Davranış analizi, cihaz imzası ve claim koruması ile bot baskısını düşüren çok adımlı güvenlik yapısı."
                        : "A multi-step security structure that reduces bot pressure through behavior analysis, device signature and claim protection."
                    }
                  />
                  <div className="captcha-window">
                    <div className="captcha-head">
                      <span>{lang === "tr" ? "Güvenlik kontrolü" : "Security check"}</span>
                      <BadgeCheck size={18} />
                    </div>
                    <div className="captcha-body">
                      <div className="captcha-box checked">
                        <span className="captcha-tick">✓</span>
                        <strong>{lang === "tr" ? "İnsan doğrulaması tamamlandı" : "Human verification complete"}</strong>
                      </div>
                      <div className="captcha-meta">
                        <span>{lang === "tr" ? "Captcha skoru" : "Captcha score"}</span>
                        <strong>98 / 100</strong>
                      </div>
                      <div className="captcha-meta">
                        <span>{lang === "tr" ? "Risk sinyali" : "Risk signal"}</span>
                        <strong>{lang === "tr" ? "Düşük" : "Low"}</strong>
                      </div>
                    </div>
                  </div>
                </article>

                <article className="glass-card">
                  <SectionTitle icon={<HelpCircle size={16} />} label={trust.trustTitle} title={trust.trustTitle} text={trust.trustText} />
                  <div className="trust-grid">
                    {trust.trustCards.map(([title, text], index) => (
                      <article className="trust-card" key={title}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <h3>{title}</h3>
                        <p>{text}</p>
                      </article>
                    ))}
                  </div>
                </article>
              </div>
            </section>

            <section id="trust-ai" className="section-block reveal-on-scroll">
              <div className="split-grid">
                <article className="glass-card">
                  <SectionTitle icon={<BrainCircuit size={16} />} label={trust.aiTitle} title={trust.aiTitle} text={trust.aiText} />
                  <div className="mini-grid">
                    {trust.aiCards.map(([title, text]) => (
                      <div className="mini-card" key={title}>
                        <strong>{title}</strong>
                        <p>{text}</p>
                      </div>
                    ))}
                  </div>
                </article>
                <div className="visual-poster banner-poster">
                  <img src={campaignFour} alt="ADN campaign banner" />
                </div>
              </div>
            </section>

            <section className="section-block reveal-on-scroll">
              <SectionTitle icon={<FileText size={16} />} label={trust.contractsTitle} title={trust.contractsTitle} text={trust.contractsText} />
              <div className="usecase-grid three-col">
                {trust.contracts.map(([title, text]) => (
                  <article className="glass-card compact" key={title}>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </article>
                ))}
              </div>
            </section>

            <section id="trust-faq" className="section-block reveal-on-scroll">
              <div className="split-grid">
                <article className="glass-card">
                  <SectionTitle icon={<HelpCircle size={16} />} label={trust.faqTitle} title={trust.faqTitle} />
                  <div className="faq-list">
                    {trust.faq.map(([question, answer]) => (
                      <div className="faq-item" key={question}>
                        <strong>{question}</strong>
                        <p>{answer}</p>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="glass-card legal-stack">
                  <SectionTitle icon={<FileText size={16} />} label={trust.legalTitle} title={trust.legalTitle} text={trust.legalText} />
                  <div className="legal-box">
                    <strong>{trust.privacyTitle}</strong>
                    <p>{trust.privacyText}</p>
                  </div>
                  <div className="legal-box compact-legal">
                    <strong>ADN Token 2026</strong>
                    <p>{t.footer.legal}</p>
                  </div>
                </article>
              </div>
            </section>
          </div>
        )}

        {activePage === "roadmap" && (
          <div className="page-stack">
            <section id="roadmap-phases" className="section-block reveal-on-scroll">
              <SectionTitle icon={<Rocket size={16} />} label={lang === "tr" ? "Yol Haritası" : "Roadmap"} title={roadmap.title} />
              <div className="roadmap-grid">
                {roadmap.phases.map((item) => (
                  <button
                    key={item.phase}
                    type="button"
                    className="roadmap-card popup-card"
                    onClick={() => openPopup("Roadmap", `${item.phase} • ${item.title}`, item.text)}
                  >
                    <span className="roadmap-phase">{item.phase}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </button>
                ))}
              </div>
            </section>

            <section id="roadmap-edge" className="section-block reveal-on-scroll">
              <SectionTitle icon={<Trophy size={16} />} label={roadmap.whyTitle} title={roadmap.whyTitle} text={roadmap.whyText} />
              <div className="insight-grid">
                {roadmap.whyCards.map(([title, text]) => (
                  <article className="glass-card insight-card" key={title}>
                    <span className="insight-value">ADN</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="section-block reveal-on-scroll">
              <SectionTitle icon={<Users size={16} />} label={roadmap.marketTitle} title={roadmap.marketTitle} />
              <div className="insight-grid">
                {roadmap.marketCards.map(([title, text]) => (
                  <article className="glass-card insight-card" key={title}>
                    <span className="insight-value">Market</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </article>
                ))}
              </div>
            </section>

            <section id="roadmap-vision" className="section-block reveal-on-scroll cta-shell">
              <div className="cta-copy">
                <SectionTitle icon={<Compass size={16} />} label={roadmap.visionTitle} title={roadmap.visionTitle} text={roadmap.visionText} />
                <ul className="clean-list">
                  {roadmap.governance.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="hero-actions">
                  <a href={telegramBotUrl} target="_blank" rel="noreferrer" className="cta-btn primary">
                    <Send size={18} />
                    <span>{roadmap.ctaPrimary}</span>
                  </a>
                  <button type="button" className="cta-btn secondary" onClick={() => openPage("economy")}>
                    <BadgeDollarSign size={18} />
                    <span>{roadmap.ctaSecondary}</span>
                  </button>
                </div>
              </div>
              <div className="cta-mascot-wrap">
                <img src={campaignTwo} alt="ADN campaign visual" className="cta-board" />
              </div>
            </section>
          </div>
        )}
      </main>

      <footer className="footer">
        <div className="footer-card">
          <div className="footer-brand">
            <img src={adnTokenMark} alt="ADN emblem" />
            <div className="footer-brand-copy">
              <strong>ADN Token</strong>
              <span>Lite Paper 2026</span>
            </div>
          </div>
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
