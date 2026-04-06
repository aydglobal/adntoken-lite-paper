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

const telegramBotUrl = import.meta.env.VITE_TELEGRAM_BOT_URL ?? "https://t.me/adntoken_bot";
const tokenWidths = [35, 20, 15, 10, 10, 5, 5];
const emissionWidths = [100, 62, 34];

const copy: Record<Lang, Copy> = {
  tr: {
    brandSubtitle: "From Zero to Power | Oyunlaştırılmış dijital ekonomi motoru",
    entrance: {
      kicker: "Canlı açılış",
      title: "ADN Token ekosistemine hoş geldin",
      text:
        "ADN; tap-to-earn, progression, prestige, clan, airdrop ve digital commerce katmanlarını tek davranış motorunda birleştiren yeni nesil bir dijital ekonomi sistemidir.",
      note: "Siteye geçmek için sağ üstteki çarpıya dokun.",
    },
    hero: {
      kicker: "Resmi Lite Paper",
      title: "ADN Token, sıfırdan güce uzanan oyunlaştırılmış dijital servet motorudur.",
      text:
        "ADN Token; tap-to-earn mekaniklerini, sürdürülebilir token akışını, sosyal rekabeti ve uzun vadeli retention sistemlerini tek bir ürün katmanında toplar. Amaç kısa vadeli hype değil, davranış odaklı büyüme, kontrollü ekonomi ve görünür ürün değeridir.",
      primary: "Telegram botunu aç",
      secondary: "Ekonomi modelini gör",
      tertiary: "Açılış penceresini aç",
      badges: ["Dokun-Kazan", "Airdrop", "Dijital Ticaret", "Prestige Motoru"],
      stats: [
        {
          label: "Ana tez",
          value: "Retention > Hype",
          note: "ADN kısa vadeli çıkarım yerine uzun vadeli kullanıcı davranışı ve sadakati üzerine kuruludur.",
        },
        {
          label: "Toplam arz",
          value: "1B ADN",
          note: "ADN için önemli olan tek sayı arz değil; kontrollü emission, burn ve sink akışıdır.",
        },
        {
          label: "Günlük üst limit",
          value: "0.5% max",
          note: "Günlük emission tavanı ekonomi dengesi için üst sınır olarak tasarlanmıştır.",
        },
      ],
      stageTitle: "Topluluk odaklı büyüme",
      stageText:
        "Ürün, görünürlük, güven ve sosyal rekabet aynı sahnede toplanır. ADN; kullanıcıyı yalnızca ödüllendiren değil, onu sistem içinde daha güçlü hale getiren bir ilerleme ekonomisi kurar.",
      quickFacts: [
        { label: "Kategori", value: "Oyunlaştırılmış servet motoru" },
        { label: "Çekirdek ürün", value: "Tap to Earn + progression" },
        { label: "Sosyal katman", value: "Clan, referral, leaderboard" },
        { label: "Amaç", value: "Sürdürülebilir retention" },
      ],
    },
    footer: {
      title: "Yasal ve gizlilik notu",
      text:
        "Bu lite paper tanıtım ve bilgilendirme amacı taşır. Nihai teknik, hukuki ve operasyonel detaylar resmi dokümantasyon ve duyurularla netleştirilir.",
      legal: "© 2026 ADN Token. Tüm hakları saklıdır.",
    },
  },
  en: {
    brandSubtitle: "From Zero to Power | A gamified wealth engine",
    entrance: {
      kicker: "Live entrance",
      title: "Welcome to the ADN Token ecosystem",
      text:
        "ADN unifies tap-to-earn, progression, prestige, clans, airdrop logic and digital commerce inside one behavior-driven economy layer.",
      note: "Use the close icon at the top right to enter the site.",
    },
    hero: {
      kicker: "Official Lite Paper",
      title: "ADN Token is a gamified digital wealth engine built for the journey from zero to power.",
      text:
        "ADN merges tap-to-earn mechanics, sustainable token flow, social competition and long-term retention systems into one product layer. The goal is not short-term hype but controlled economics, visible utility and durable user growth.",
      primary: "Open Telegram bot",
      secondary: "View economy model",
      tertiary: "Open entrance panel",
      badges: ["Tap to Earn", "Airdrop", "Digital Commerce", "Prestige Engine"],
      stats: [
        {
          label: "Core thesis",
          value: "Retention > Hype",
          note: "ADN is built around long-term user behavior and loyalty instead of extraction-driven hype.",
        },
        {
          label: "Total supply",
          value: "1B ADN",
          note: "Flow matters more than raw supply; ADN is stabilized by controlled emission, burn and sink mechanics.",
        },
        {
          label: "Daily ceiling",
          value: "0.5% max",
          note: "A daily emission ceiling protects the system from runaway inflation.",
        },
      ],
      stageTitle: "Community-led growth",
      stageText:
        "Product, visibility, trust and competition grow together on one premium stage. ADN is designed to make users stronger inside the system, not just reward them once.",
      quickFacts: [
        { label: "Category", value: "Gamified wealth engine" },
        { label: "Core product", value: "Tap to Earn + progression" },
        { label: "Social layer", value: "Clan, referral, leaderboard" },
        { label: "Focus", value: "Sustainable retention" },
      ],
    },
    footer: {
      title: "Legal and privacy note",
      text:
        "This lite paper is prepared for promotional and informational purposes. Final technical, legal and operational details will be clarified through official documentation and announcements.",
      legal: "© 2026 ADN Token. All rights reserved.",
    },
  },
};

const pageTabs: Record<Lang, Array<{ key: PageKey; label: string; caption: string }>> = {
  tr: [
    { key: "overview", label: "Genel bakış", caption: "Abstract, problem ve çözüm" },
    { key: "product", label: "Ürün", caption: "Mekanikler, sistemler ve kullanım" },
    { key: "economy", label: "Ekonomi", caption: "Dağılım, akış ve büyüme" },
    { key: "trust", label: "Güven", caption: "Doğrulama, AI ve mimari" },
    { key: "roadmap", label: "Yol haritası", caption: "Fazlar, traction ve vizyon" },
  ],
  en: [
    { key: "overview", label: "Overview", caption: "Abstract, problem and solution" },
    { key: "product", label: "Product", caption: "Mechanics, systems and utility" },
    { key: "economy", label: "Economy", caption: "Tokenomics, flow and growth" },
    { key: "trust", label: "Trust", caption: "Verification, AI and architecture" },
    { key: "roadmap", label: "Roadmap", caption: "Phases, traction and vision" },
  ],
};

const pageSubnav: Record<Lang, Record<PageKey, Array<{ id: string; label: string }>>> = {
  tr: {
    overview: [
      { id: "overview-thesis", label: "Tez" },
      { id: "overview-problem", label: "Problem & çözüm" },
      { id: "overview-loop", label: "Oyun döngüsü" },
    ],
    product: [
      { id: "product-mechanics", label: "Mekanikler" },
      { id: "product-systems", label: "Derin sistemler" },
      { id: "product-usecases", label: "Kullanım alanları" },
    ],
    economy: [
      { id: "economy-tokenomics", label: "Dağılım" },
      { id: "economy-emission", label: "Emission & sink" },
      { id: "economy-growth", label: "Büyüme & airdrop" },
    ],
    trust: [
      { id: "trust-security", label: "Güvenlik" },
      { id: "trust-ai", label: "AI sistemi" },
      { id: "trust-faq", label: "SSS & yasal" },
    ],
    roadmap: [
      { id: "roadmap-phases", label: "Fazlar" },
      { id: "roadmap-edge", label: "Neden ADN?" },
      { id: "roadmap-vision", label: "Final vizyon" },
    ],
  },
  en: {
    overview: [
      { id: "overview-thesis", label: "Thesis" },
      { id: "overview-problem", label: "Problem & solution" },
      { id: "overview-loop", label: "Core loop" },
    ],
    product: [
      { id: "product-mechanics", label: "Mechanics" },
      { id: "product-systems", label: "Deep systems" },
      { id: "product-usecases", label: "Use cases" },
    ],
    economy: [
      { id: "economy-tokenomics", label: "Tokenomics" },
      { id: "economy-emission", label: "Emission & sink" },
      { id: "economy-growth", label: "Growth & airdrop" },
    ],
    trust: [
      { id: "trust-security", label: "Security" },
      { id: "trust-ai", label: "AI system" },
      { id: "trust-faq", label: "FAQ & legal" },
    ],
    roadmap: [
      { id: "roadmap-phases", label: "Phases" },
      { id: "roadmap-edge", label: "Why ADN?" },
      { id: "roadmap-vision", label: "Final vision" },
    ],
  },
};

const overviewDetails = {
  tr: {
    thesisBadge: "Abstract",
    thesisTitle: "ADN, basit etkileşimi uzun vadeli değer üretimine çeviren davranış motorudur.",
    thesisText:
      "ADN; oyun tasarımı, ekonomi sistemleri ve davranış psikolojisini tek mimaride birleştirir. Sonuç; kullanıcıların etkileşim, strateji ve katılım yoluyla büyüdüğü kendi kendini dengeleyen bir dijital ekonomidir.",
    metrics: [
      {
        value: "Vision",
        title: "From Zero to Power",
        text: "Kullanıcı ADN içinde sıfırdan başlar; tap, upgrade, prestige ve sosyal sistemlerle dijital gücünü inşa eder.",
      },
      {
        value: "Architecture",
        title: "Üç katmanlı sistem",
        text: "Gameplay layer, economy layer ve social layer birlikte çalışır; ürün değeri yalnızca tokena değil bütün akışa yayılır.",
      },
      {
        value: "Engine",
        title: "Behavior-driven economy",
        text: "ADN sadece ödül veren bir token değildir; davranışları yönlendiren, sadakati güçlendiren ve ekonomiyi dengeleyen bir motordur.",
      },
      {
        value: "Outcome",
        title: "Self-balancing ecosystem",
        text: "Controlled emission, sink design, prestige resets ve AI dengeleme ile sistem kısa vadeli enflasyon döngüsünden korunur.",
      },
    ],
    problemTitle: "Mevcut pazarın problemi",
    problemText:
      "Bugünkü tap-to-earn ve play-to-earn projelerinin büyük bölümü enflasyonist ödül yapısı, sığ oynanış ve zayıf retention yüzünden ilk hype dalgasından sonra çözülür. Kullanıcı farm yapar, dump eder ve sistemi terk eder.",
    solutionTitle: "ADN'nin çözümü",
    solutionText:
      "ADN; derin progression mekanikleri, kontrollü token akışı, prestige tabanlı sürdürülebilirlik ve sosyal rekabet katmanlarıyla kullanıcıyı yalnızca kazanan değil, güç inşa eden tarafa taşır.",
    compare: [
      {
        legacy: "Tekrarlayan tıklama, lineer grind ve hızla tükenen motivasyon",
        adn: "Tap → Earn → Upgrade → Unlock → Multiply → Prestige ile sürekli katmanlanan büyüme",
      },
      {
        legacy: "Enflasyonist ödül yapısı ve çöküşe giden emisyon",
        adn: "Controlled emission, sink mekanikleri, economy_factor ve burn ile dengelenen akış",
      },
      {
        legacy: "Kullanıcı girer, farm yapar, satar ve çıkar",
        adn: "Kullanıcı ilerler, klana katılır, güç kazanır, prestij yapar ve sistemde kalır",
      },
    ],
    loopTitle: "Çekirdek oyun döngüsü",
    loopText:
      "ADN'nin ana loop'u basit tıklamadan çok daha fazlasını üretir: tap gelir yaratır, gelir upgrade'i besler, upgrade yeni sistemleri açar, prestige ise aynı yolculuğu daha yüksek çarpanla yeniden başlatır.",
    loopSteps: ["Tap", "Earn", "Upgrade", "Unlock", "Multiply", "Prestige", "Repeat"],
    loopNote:
      "Bu yapı lineer grind yerine exponential progression üretir; erken oyunda öğrenme, orta oyunda büyüme, geç oyunda ise stratejik optimizasyon öne çıkar.",
  },
  en: {
    thesisBadge: "Abstract",
    thesisTitle: "ADN turns simple interaction into long-term value creation through a behavior-driven economy engine.",
    thesisText:
      "ADN combines game design, economic systems and behavioral psychology inside one architecture. The result is a self-balancing digital economy where users build value through engagement, strategy and participation.",
    metrics: [
      {
        value: "Vision",
        title: "From Zero to Power",
        text: "Every user starts from zero and builds digital power through tapping, upgrades, prestige and social progression.",
      },
      {
        value: "Architecture",
        title: "Three-layer system",
        text: "Gameplay, economy and social layers work together so the product carries utility far beyond the token itself.",
      },
      {
        value: "Engine",
        title: "Behavior-driven economy",
        text: "ADN is not just a reward token; it is an engine that shapes behavior, strengthens loyalty and balances the economy.",
      },
      {
        value: "Outcome",
        title: "Self-balancing ecosystem",
        text: "Controlled emission, sink design, prestige resets and AI balancing protect the system from short-term inflation loops.",
      },
    ],
    problemTitle: "The market problem",
    problemText:
      "Most tap-to-earn and play-to-earn projects collapse after the first hype wave because rewards are inflationary, gameplay is shallow and long-term retention is missing. Users farm, dump and leave.",
    solutionTitle: "The ADN solution",
    solutionText:
      "ADN introduces deep progression mechanics, controlled token flow, prestige-based sustainability and social competition layers so users build power instead of extracting value and leaving.",
    compare: [
      {
        legacy: "Repetitive tapping, linear grind and fading motivation",
        adn: "Tap → Earn → Upgrade → Unlock → Multiply → Prestige creates layered growth",
      },
      {
        legacy: "Inflationary rewards and collapsing emissions",
        adn: "Controlled emission, sink mechanics, economy_factor and burn create balance",
      },
      {
        legacy: "Users enter, farm, dump and exit",
        adn: "Users progress, join clans, gain status, prestige and stay in the system",
      },
    ],
    loopTitle: "Core game loop",
    loopText:
      "The ADN loop creates more than short-term tapping: taps generate income, income feeds upgrades, upgrades unlock systems and prestige restarts progress with stronger multipliers.",
    loopSteps: ["Tap", "Earn", "Upgrade", "Unlock", "Multiply", "Prestige", "Repeat"],
    loopNote:
      "This creates exponential progression instead of linear grinding; early game teaches, mid game expands and late game rewards strategy.",
  },
};

const productDetails = {
  tr: {
    mechanicsTitle: "Derin mekanikler",
    mechanicsText:
      "ADN'de kazanç tek bir tık sayacıyla belirlenmez. Tap reward, chest chance ve prestige curve birlikte çalışır; kullanıcıyı daha çok oynatan şey sadece ödül değil, güç kazanma hissidir.",
    mechanics: [
      {
        title: "Tap reward engine",
        code: "earn = (tap_power × combo_multiplier × upgrade_bonus) × economy_factor",
        effect: "Temel kazanç; tap gücü, aktif oyun kombosu, yükseltme getirisi ve ekonomi denge katsayısı birlikte hesaplanarak üretilir.",
      },
      {
        title: "Chest drop layer",
        code: "random chest chance = 10%",
        effect: "Beklenmedik ödül ihtimali kullanıcıda 'belki büyük ödül gelir' hissi oluşturur, sıkıcılığı kırar ve geri dönüşü artırır.",
      },
      {
        title: "Prestige bonus curve",
        code: "prestige_bonus = sqrt(total_earned)",
        effect: "Prestige reset sonrası kalıcı çarpan verir; sınırsız büyüme hissini korurken enflasyonun kontrolden çıkmasını engeller.",
      },
    ],
    systemsTitle: "Oyunu derinleştiren sistemler",
    systems: [
      { title: "Combo system", text: "Arka arkaya gelen aktif aksiyonlar çarpanı yükseltir; aktif oyuncu pasif kullanıcıdan daha fazla kazanır." },
      { title: "Loot / chest economy", text: "Risk-ödül dengesiyle çalışan chest yapısı heyecan, FOMO ve retention üretir; expected_value her zaman maliyetin altında tutulur." },
      { title: "Prestige system", text: "Kullanıcı ilerlemeyi sıfırlar, kalıcı çarpan kazanır; bu katman ADN ekonomisinin ana dengeleyicilerinden biridir." },
      { title: "Clan system", text: "Clan ekonomisi ortak havuz, katkı bonusu ve sosyal bağ üretir; tekil kullanıcıyı topluluk davranışına çeker." },
      { title: "Leaderboards", text: "Haftalık resetlenen sıralamalar ego, statü ve rekabet duygusunu tetikler; kullanıcıyı rakibe dönüştürür." },
      { title: "Dynamic tasks", text: "AI destekli görev sistemi kullanıcı profiline uygun görevler üreterek her oyuncuda farklı ilerleme yolu açar." },
      { title: "Referral multiplier", text: "Invite → bonus → faster progress → competitive edge döngüsü doğal büyüme üretir ve viral coefficient'i yukarı taşır." },
      { title: "Clan wars", text: "Topluluk sadece sohbet değil, statü savaşı haline gelir; ortak hedefler kullanıcı kaybını düşürür." },
    ],
    useCasesTitle: "Gerçek kullanım alanları",
    useCases: [
      {
        title: "Dokun-Kazan",
        items: [
          "Tap gelir üretir, combo ve upgrade ile verimlilik artar.",
          "Prestige, ilerlemeyi yeni bir güç katmanına taşır.",
          "Görev, referans ve sezon etkinlikleri kazancı zenginleştirir.",
        ],
      },
      {
        title: "Airdrop",
        items: [
          "Airdrop uygunluğu davranış, streak, görev ve kalite skoruyla belirlenir.",
          "Gerçek kullanıcı katkısı, referral kalitesi ve clan değeri ölçülür.",
          "Claim akışı anti-bot ve captcha katmanıyla korunur.",
        ],
      },
      {
        title: "Dijital Ticaret",
        items: [
          "Marketplace, premium event ve mağaza indirimleri ADN utility üretir.",
          "Cashback, claim ve mağaza ödülleri tek ekonomi içinde birleşir.",
          "Merchant tarafı doğrudan kullanıcı etkileşimini ticarete bağlar.",
        ],
      },
    ],
    flowTitle: "Sosyal büyüme motoru",
    flow: [
      "Invite → bonus boost",
      "Clan invite → team growth",
      "Leaderboard reset → FOMO",
      "Event launch → session spike",
      "Referral reward → viral loop",
      "Prestige status → social proof",
    ],
  },
  en: {
    mechanicsTitle: "Deep mechanics",
    mechanicsText:
      "ADN rewards are not driven by a single tap counter. Tap reward, chest chance and prestige curves work together; users stay not only for rewards but for the feeling of building power.",
    mechanics: [
      {
        title: "Tap reward engine",
        code: "earn = (tap_power × combo_multiplier × upgrade_bonus) × economy_factor",
        effect: "Base income is calculated through tap power, active combo, upgrade returns and a dynamic economy balancing factor.",
      },
      {
        title: "Chest drop layer",
        code: "random chest chance = 10%",
        effect: "The possibility of a rare reward creates anticipation, reduces boredom and increases return behavior.",
      },
      {
        title: "Prestige bonus curve",
        code: "prestige_bonus = sqrt(total_earned)",
        effect: "Prestige grants a permanent multiplier after reset, preserving infinite growth feeling while keeping inflation under control.",
      },
    ],
    systemsTitle: "Systems that deepen the product",
    systems: [
      { title: "Combo system", text: "Consecutive active actions increase the multiplier, rewarding active users more than passive users." },
      { title: "Loot / chest economy", text: "Risk-reward chest logic creates excitement, FOMO and retention while keeping expected value below cost." },
      { title: "Prestige system", text: "Users reset progress and gain permanent multipliers; this is one of ADN's core economic stabilizers." },
      { title: "Clan system", text: "Clan pools, contribution bonuses and social ties transform single-user behavior into community behavior." },
      { title: "Leaderboards", text: "Weekly-reset rankings trigger ego, status and competition so users become rivals, not just players." },
      { title: "Dynamic tasks", text: "AI-backed dynamic tasks generate personalized engagement paths for different user profiles." },
      { title: "Referral multiplier", text: "Invite → bonus → faster progress → competitive edge becomes a built-in organic growth loop." },
      { title: "Clan wars", text: "The community layer becomes a status battle with shared goals that reduce churn." },
    ],
    useCasesTitle: "Real utility surfaces",
    useCases: [
      {
        title: "Tap to Earn",
        items: [
          "Taps produce income and efficiency grows through combo and upgrades.",
          "Prestige carries the user into a stronger progression layer.",
          "Tasks, referrals and seasonal events enrich the earning model.",
        ],
      },
      {
        title: "Airdrop",
        items: [
          "Eligibility is determined by behavior, streaks, tasks and quality score.",
          "Real user contribution, referral quality and clan value are measured.",
          "Claim flow is protected by anti-bot and captcha layers.",
        ],
      },
      {
        title: "Digital Commerce",
        items: [
          "Marketplace, premium events and merchant rewards create token utility.",
          "Cashback, claims and store rewards live inside one economy.",
          "The merchant side connects user engagement directly to commerce.",
        ],
      },
    ],
    flowTitle: "Social growth engine",
    flow: [
      "Invite → bonus boost",
      "Clan invite → team growth",
      "Leaderboard reset → FOMO",
      "Event launch → session spike",
      "Referral reward → viral loop",
      "Prestige status → social proof",
    ],
  },
};

const economyDetails = {
  tr: {
    modelTitle: "1 milyar ADN için tasarlanmış akış ekonomisi",
    modelText:
      "ADN ekonomisinde asıl kritik nokta sayı değil akıştır. Ödül girişi, sink çıkışı, burn oranı ve günlük emission limiti birlikte çalışarak ekonomiyi uzun vadeli oyunda dengede tutar.",
    modelStats: [
      { label: "Toplam arz", value: "1,000,000,000 ADN", note: "ADN sabit cap ile tasarlanır; ekonomi kontrolü arz sınırı ve treasury katmanıyla birlikte yürür." },
      { label: "Play & Earn Pool", value: "35%", note: "Oyuncu ödülleri ve progression tabanlı dağıtımlar için ayrılan ana havuzdur." },
      { label: "Ecosystem / Treasury", value: "20%", note: "Sistem dengesi, rezerv, operasyonel sürdürülebilirlik ve ekonomi savunması için kullanılır." },
      { label: "Economy factor", value: "0.3 - 1.2", note: "Sistem çok fazla token basıyorsa katsayı düşer; denge güçleniyorsa yükselir." },
    ],
    emissionTitle: "Emission, burn ve sink mantığı",
    emissionText:
      "ADN'de sisteme giren tokenın tamamı geri dağılmaz. Upgrade, prestige, loot, marketplace fee ve premium event girişleri hem burn hem treasury dönüşü üretir. Altın kural: sisteme giren token, sistemden çıkan tokendan düşük kalmalıdır.",
    emission: [
      { stage: "Early stage", label: "Yüksek ödül / hızlı edinim", text: "Erken fazda onboarding ve başlangıç ivmesi için daha görünür ödül katmanı bulunur." },
      { stage: "Mid game", label: "Dengeli dağıtım / güçlü sink", text: "Upgrade, prestige ve chest maliyetleri devreye girer; ekonomide giriş-çıkış dengesi kurulur." },
      { stage: "Late game", label: "Skill-based earnings", text: "Geç oyunda kazanç; strateji, clan katkısı, event katılımı ve verimlilik optimizasyonuna bağlı hale gelir." },
    ],
    utilityTitle: "Token utility yüzeyi",
    utility: [
      ["Upgrade purchases", "Upgrade maliyetleri ADN sink üretir ve tokenı oynanışa bağlar."],
      ["Prestige unlocks", "Prestige giriş maliyeti ekonomiyi korurken kalıcı çarpan kapısını açar."],
      ["Marketplace & commerce", "Marketplace işlemleri ve mağaza etkileşimi utility üretir."],
      ["Clan contributions", "Clan ekonomisi, ortak havuz ve registration fee ile sosyal sink üretir."],
    ],
    growthTitle: "Launch ve growth engine",
    growthText:
      "ADN dağıtımı sadece reklamla değil, viral loop, FOMO, statü rekabeti ve mikro influencer stratejisiyle büyür. Dağıtım + retention ADN modelinin merkezindedir.",
    growth: [
      { title: "Closed beta", value: "1k - 5k user", text: "İlk fazda ekonomi tuning, görev doğrulama ve session kalitesi optimize edilir." },
      { title: "Viral drop", value: "Invite-only", text: "Kodla giriş ve sınırlı erişim yapısı FOMO yaratır, referans gücünü artırır." },
      { title: "Influencer mesh", value: "50 micro creators", text: "10k - 100k arası küçük hesaplar büyük hesaplardan daha ucuz, daha gerçek ve daha etkili traction sağlar." },
      { title: "Core metrics", value: "D1>40 / D7>20 / K>1", text: "Retention, viral coefficient ve oturum süresi ADN'nin traction dilidir." },
    ],
    airdropTitle: "Airdrop uygunluk akışı",
    airdropText:
      "ADN airdrop modeli boş cüzdan toplamaz; gerçek etkileşim, referans kalitesi, clan katkısı ve doğrulama puanı üzerinden seçim yapar.",
    airdropFlow: ["Verify", "Play", "Invite", "Claim"],
    eligibility: [
      ["Gerçek aktivite", "Tap gücü, streak, görev kalitesi ve süreklilik takip edilir."],
      ["Referral kalitesi", "Davet edilen kullanıcıların gerçekliği ve devamlılığı ölçülür."],
      ["Clan katkısı", "Sosyal büyüme, takım katkısı ve ortak hedef performansı puanlanır."],
      ["Anti-bot skoru", "Captcha, davranış analizi ve claim denetimiyle sybil baskısı azaltılır."],
    ],
  },
  en: {
    modelTitle: "A flow economy designed around 1 billion ADN",
    modelText:
      "The key variable in ADN is not the number but the flow. Reward inflow, sink outflow, burn rate and daily emission limits work together to keep the economy balanced over the long term.",
    modelStats: [
      { label: "Total supply", value: "1,000,000,000 ADN", note: "ADN is designed with a fixed cap; economic control lives through the supply ceiling and treasury layer." },
      { label: "Play & Earn Pool", value: "35%", note: "The main pool allocated to player rewards and progression-based distribution." },
      { label: "Ecosystem / Treasury", value: "20%", note: "Used for reserve defense, operational sustainability and system balancing." },
      { label: "Economy factor", value: "0.3 - 1.2", note: "If the system prints too much, the factor falls; if balance improves, it rises." },
    ],
    emissionTitle: "Emission, burn and sink logic",
    emissionText:
      "Not every token entering the system goes back out as rewards. Upgrades, prestige, loot, marketplace fees and premium event entries create burn and treasury return. Golden rule: token entering the system should stay below token leaving it.",
    emission: [
      { stage: "Early stage", label: "Higher rewards / faster onboarding", text: "The early phase keeps rewards more visible to support onboarding and early traction." },
      { stage: "Mid game", label: "Balanced distribution / stronger sinks", text: "Upgrade, prestige and chest costs become meaningful and shape economic balance." },
      { stage: "Late game", label: "Skill-based earnings", text: "Late-game income depends on strategy, clan contribution, event participation and optimization." },
    ],
    utilityTitle: "Token utility surface",
    utility: [
      ["Upgrade purchases", "Upgrade costs create sinks and tie the token directly to gameplay."],
      ["Prestige unlocks", "Prestige entry cost protects the economy while opening a permanent multiplier layer."],
      ["Marketplace & commerce", "Marketplace actions and merchant interactions produce utility."],
      ["Clan contributions", "Clan economy and registration mechanics generate social sink behavior."],
    ],
    growthTitle: "Launch and growth engine",
    growthText:
      "ADN distribution is not powered only by marketing but by viral loops, FOMO, status competition and a micro-influencer strategy. Distribution + retention is the operating center of the model.",
    growth: [
      { title: "Closed beta", value: "1k - 5k users", text: "The first phase optimizes economic tuning, task verification and session quality." },
      { title: "Viral drop", value: "Invite-only", text: "Code-based access creates FOMO and increases referral value." },
      { title: "Influencer mesh", value: "50 micro creators", text: "10k - 100k creators are often cheaper, more authentic and more effective than oversized accounts." },
      { title: "Core metrics", value: "D1>40 / D7>20 / K>1", text: "Retention, viral coefficient and session time are the traction language of ADN." },
    ],
    airdropTitle: "Airdrop eligibility flow",
    airdropText:
      "The ADN airdrop model does not collect empty wallets; it selects users based on real engagement, referral quality, clan contribution and verification score.",
    airdropFlow: ["Verify", "Play", "Invite", "Claim"],
    eligibility: [
      ["Real activity", "Tap power, streak, task quality and consistency are measured."],
      ["Referral quality", "The quality and continuity of invited users is evaluated."],
      ["Clan contribution", "Social growth, team contribution and collective target performance are scored."],
      ["Anti-bot score", "Captcha, behavior analysis and claim control reduce sybil pressure."],
    ],
  },
};

const trustDetails = {
  tr: {
    securityTitle: "Güvenlik ve adalet katmanı",
    securityText:
      "ADN, ödül dağıtımını sınırsız mint mantığına bırakmaz. Anti-bot, imza doğrulama, emission limiti, vesting, timelock ve multisig birlikte çalışarak güven çerçevesi oluşturur.",
    security: [
      { title: "Anti-bot kontrolü", text: "Captcha, davranış skoru, claim analizi ve görev doğrulaması ile otomasyon baskısı azaltılır." },
      { title: "Adil ödül dağıtımı", text: "RewardId, imza doğrulama ve approved module mantığıyla tekrar kullanım ve suistimal engellenir." },
      { title: "Şeffaf vesting", text: "Team, investor ve partner payları serbest cüzdanlara bırakılmaz; vesting wallet üzerinden takvime bağlanır." },
      { title: "Acil durdurma", text: "Pausable akışı kritik hata, açık veya anormal ödül dağıtımı durumunda sistemi geçici olarak dondurur." },
    ],
    trustTitle: "Güven çerçevesi",
    trustText:
      "ADN güven modeli tek admin cüzdana değil, rol bazlı yetki ayrımı ve timelock gecikmesine dayanır. Böylece topluluk değişimleri zincir üstünde görebilir.",
    trustCards: [
      ["AccessControl rolleri", "DEFAULT_ADMIN, MINTER, PAUSER, TREASURY, BURNER ve REWARD_DISTRIBUTOR rolleri ayrıştırılır."],
      ["Multisig → Timelock → Contracts", "Kritik yönetim işlemleri önce multisig, sonra timelock arkasından geçer."],
      ["Rewards reserve disiplini", "Oyuncu ödülleri sınırsız mint ile değil, önceden ayrılmış reserve üzerinden yönetilir."],
      ["Replay koruması", "RewardId ve claim imzaları tekrar kullanım riskini azaltır; zincir üstü ödeme sade kalır."],
    ],
    aiTitle: "AI economy engine",
    aiText:
      "ADN'de AI yalnızca gösteriş değil, ekonomi savunmasıdır. Görev üretimi, reward dengeleme, davranış analizi ve anomali tespiti aynı karar katmanında birleşir.",
    aiCards: [
      ["Dynamic task generation", "Kullanıcı davranışına göre görev üretir ve sıkıcılığı azaltır."],
      ["Smart reward balancing", "Aktif kullanıcı, harcama oranı ve burn verisine göre ekonomiyi dengeler."],
      ["Behavior-based progression", "Oyuncunun aksiyon kalitesine göre ilerleme katmanını kişiselleştirir."],
      ["Anti-cheat detection", "Anormal claim, görev istismarı ve sybil sinyallerini yakalar."],
    ],
    contractsTitle: "ADN smart contract mimarisi",
    contractsText:
      "Token çekirdeği sade, ekonomi katmanı modüler, yönetim katmanı gecikmeli ve denetlenebilir tutulur. ADN için önerilen yapı; asset layer, economy layer, progression layer ve trust layer ayrımına dayanır.",
    contracts: [
      ["ADNToken.sol", "ERC20, ERC20Capped, ERC20Burnable, ERC20Pausable ve AccessControl ile kurulur. MAX_SUPPLY = 1B ADN; mint yalnız MINTER_ROLE, pause yalnız PAUSER_ROLE tarafından çağrılır."],
      ["ADNTreasury.sol", "Reward reserve, approved module listesi, günlük emission limiti ve prestige / chest / event spend akışını yönetir. Oyun mantığı token içine gömülmez."],
      ["Reward modules", "TapReward, EventReward, ClanReward ve ReferralReward modülleri claim imzası, rewardId, cooldown ve anti-replay mantığıyla treasury'yi çağırır."],
      ["Vesting wallets", "Team, investors, advisors ve partnerships için ayrı VestingWallet kullanılır. Team: 12 ay cliff + 24 ay vesting. Investors: %10 TGE + 12 ay vesting."],
      ["Timelock + multisig", "Admin değişiklikleri, treasury parametreleri, whitelist güncellemeleri ve rol aktarımları timelock gecikmesiyle topluluğa görünür hale gelir."],
    ],
    faqTitle: "SSS",
    faq: [
      ["ADN sadece bir tap uygulaması mı?", "Hayır. ADN; oyun döngüsü, sosyal rekabet, utility, burn, prestige ve economy_factor katmanlarıyla kendi davranış ekonomisini kurar."],
      ["Token nasıl değer korur?", "Değer koruması yalnız mint sınırından değil, upgrade, prestige, chest, marketplace fee ve event entry gibi sink tasarımından gelir."],
      ["Whale riski nasıl yönetiliyor?", "Diminishing returns, soft cap, progressive tax ve clan_bonus log eğrisiyle büyük oyuncuların sistemi bozması sınırlanır."],
      ["Airdrop herkese açık mı?", "Airdrop boş claim akışı değildir; gerçek oynanış, görev, davet kalitesi ve doğrulama katmanlarıyla filtrelenir."],
      ["Akıllı kontrat yönetimi nasıl güvenli kalıyor?", "Deployer admini kalıcı kalmaz; roller multisig ve timelock arkasına devredilir, vestingler ayrı sözleşmelerde tutulur."],
    ],
    legalTitle: "Legal disclaimer",
    legalText:
      "ADN lite paper yatırım tavsiyesi, menkul kıymet teklifi veya garanti edilmiş getiri vaadi içermez. Nihai token, sözleşme, operasyon ve listeleme detayları resmi duyurularla doğrulanır.",
    privacyTitle: "Gizlilik sözleşmesi",
    privacyText:
      "Kullanıcı güvenliği ADN için temel önceliktir. Görev doğrulama, cüzdan uyumu, claim güvenliği ve ürün kalitesi için gerekli minimum veri işlenir; veriler operasyonel amaç dışında kullanılmaz.",
  },
  en: {
    securityTitle: "Security and fairness layer",
    securityText:
      "ADN does not leave distribution to uncontrolled mint logic. Anti-bot controls, signature checks, emission limits, vesting, timelock and multisig form the core trust framework.",
    security: [
      { title: "Anti-bot control", text: "Captcha, behavior scoring, claim analysis and task verification reduce automation pressure." },
      { title: "Fair reward distribution", text: "RewardId, signature validation and approved module logic reduce abuse and duplicate claims." },
      { title: "Transparent vesting", text: "Team, investor and partner allocations do not go to free wallets; they are scheduled through vesting wallets." },
      { title: "Emergency pause", text: "The pausable layer can freeze critical flows during exploits, anomalies or reward bugs." },
    ],
    trustTitle: "Trust framework",
    trustText:
      "The ADN trust model does not rely on a single admin wallet. It relies on role separation and timelock delay so critical changes become visible before execution.",
    trustCards: [
      ["AccessControl roles", "DEFAULT_ADMIN, MINTER, PAUSER, TREASURY, BURNER and REWARD_DISTRIBUTOR are clearly separated."],
      ["Multisig → Timelock → Contracts", "Critical management actions move through multisig and timelock before execution."],
      ["Reward reserve discipline", "Player rewards come from a reserved pool rather than unlimited minting."],
      ["Replay protection", "RewardId and signed claims reduce reuse risk while keeping on-chain payment simple."],
    ],
    aiTitle: "AI economy engine",
    aiText:
      "Inside ADN, AI is not decoration; it is economic defense. Task generation, reward balancing, behavior analysis and anomaly detection live inside the same decision layer.",
    aiCards: [
      ["Dynamic task generation", "Creates tasks based on user behavior and reduces boredom."],
      ["Smart reward balancing", "Balances the economy according to active users, spend rate and burn data."],
      ["Behavior-based progression", "Personalizes progression layers according to action quality."],
      ["Anti-cheat detection", "Detects abnormal claims, task abuse and sybil signals."],
    ],
    contractsTitle: "ADN smart contract architecture",
    contractsText:
      "The token core stays simple, the economy layer stays modular and the governance layer stays delayed and auditable. ADN is structured around asset, economy, progression and trust layers.",
    contracts: [
      ["ADNToken.sol", "Built with ERC20, ERC20Capped, ERC20Burnable, ERC20Pausable and AccessControl. MAX_SUPPLY = 1B ADN; mint is restricted to MINTER_ROLE and pause to PAUSER_ROLE."],
      ["ADNTreasury.sol", "Handles reward reserve, approved modules, daily emission limit and prestige / chest / event spending flows. Game logic is not embedded into the token contract."],
      ["Reward modules", "TapReward, EventReward, ClanReward and ReferralReward modules verify signatures, rewardId, cooldown and anti-replay rules before calling treasury."],
      ["Vesting wallets", "Separate VestingWallet contracts manage team, investor, advisor and partnership allocations. Team: 12 month cliff + 24 month vesting. Investors: 10% TGE + 12 month vesting."],
      ["Timelock + multisig", "Admin changes, treasury parameters, whitelist updates and role transfers are delayed through timelock for on-chain visibility."],
    ],
    faqTitle: "FAQ",
    faq: [
      ["Is ADN just a tap application?", "No. ADN combines progression, social competition, utility, burn, prestige and economy_factor into a behavior-driven system."],
      ["How does the token defend value?", "Value defense comes not only from capped supply but from sink design: upgrades, prestige, chest openings, marketplace fees and event entries."],
      ["How is whale risk handled?", "Diminishing returns, soft caps, progressive tax and logarithmic clan bonus curves reduce oversized advantage."],
      ["Is the airdrop open to everyone?", "The airdrop is not an empty claim flow; it is filtered through real play, tasks, referral quality and verification layers."],
      ["How is contract administration secured?", "Deployer admin does not remain permanent; roles are transferred behind multisig and timelock, while vesting lives in separate contracts."],
    ],
    legalTitle: "Legal disclaimer",
    legalText:
      "The ADN lite paper does not constitute investment advice, a securities offer or a guaranteed return promise. Final token, contract, operational and listing details will be confirmed through official announcements.",
    privacyTitle: "Privacy policy",
    privacyText:
      "User security is a core ADN priority. Only the minimum data required for task verification, wallet compatibility, claim security and service quality is processed.",
  },
};

const roadmapDetails = {
  tr: {
    title: "Faz bazlı büyüme planı",
    phases: [
      { phase: "Phase 1", title: "Core launch", text: "Tap sistemi, temel upgrade yapısı, onboarding, wallet entegrasyonu ve reward reserve hazırlığı." },
      { phase: "Phase 2", title: "Economy layer", text: "Token launch, treasury kontrolleri, burn mekanikleri, marketplace ve sink yüzeylerinin açılması." },
      { phase: "Phase 3", title: "Social expansion", text: "Clan system, leaderboard, referral multiplier, weekly reset rekabeti ve viral loop katmanı." },
      { phase: "Phase 4", title: "AI + advanced systems", text: "AI görev üretimi, event engine, competitive modes ve davranışa göre ekonomi optimizasyonu." },
    ],
    whyTitle: "Neden ADN kazanır?",
    whyText:
      "ADN, rakiplerden yalnızca daha çok ödül vererek ayrışmaz. ADN; retention, utility, traction, social virality ve ekonomik dengeyi aynı yapıda sunar.",
    whyCards: [
      ["Retention > hype", "Kullanıcı yalnızca gelip kazanan değil, kaybetmek istemediği ilerleme katmanına bağlanan oyuncuya dönüşür."],
      ["Economy > extraction", "Controlled emission, prestige, sink ve treasury mantığı ADN'yi kısa ömürlü çıkarım döngüsünden ayırır."],
      ["Gameplay > click spam", "Combo, chest, clan, leaderboard ve AI tasks ADN ürününü basit tık spaminden çıkarır."],
      ["Virality > paid noise", "Referral multiplier, clan rekabeti ve event FOMO organik büyümenin temelini kurar."],
    ],
    marketTitle: "Traction ve yatırımcı dili",
    marketCards: [
      ["Mobil oyun pazarı", "$100B+ mobil oyun ekosistemi ile Web3 oyun katmanı arasında köprü kuran bir ürün konumu."],
      ["Göstereceğimiz metrikler", "DAU / MAU, session time, D1 retention, D7 retention, revenue per user ve viral coefficient."],
      ["Launch strategy", "Closed beta → viral drop → influencer mesh → leaderboard hype sıralamasıyla kontrollü patlama."],
      ["Ask", "Scaling, strategic partnerships, exchange listings ve büyüme operasyonları için kaynak ve iş ortaklığı."],
    ],
    visionTitle: "Final vizyon",
    visionText:
      "ADN bir spekülatif token değil; engagement, progression ve strategic growth üzerine kurulu kendi kendini sürdürebilen dijital ekonomidir. Nihai hedef, kullanıcıya sadece gelir değil; servet, strateji ve etki inşa ettiren bir yolculuk sunmaktır.",
    governance: [
      "Week 1: ekonomi dengesi, görev doğrulama ve çekirdek loop stabilizasyonu",
      "Week 2: referral ve clan katmanının aktifleşmesi",
      "Week 3: event ve leaderboard ile ilk viral dalga",
      "Week 4: influencer push, traction görünürlüğü ve growth explosion",
    ],
    ctaPrimary: "Bot üzerinden katıl",
    ctaSecondary: "Ekonomi sayfasına dön",
  },
  en: {
    title: "Phase-based expansion plan",
    phases: [
      { phase: "Phase 1", title: "Core launch", text: "Tap system, base upgrades, onboarding, wallet integration and reward reserve preparation." },
      { phase: "Phase 2", title: "Economy layer", text: "Token launch, treasury controls, burn mechanics, marketplace and sink surfaces go live." },
      { phase: "Phase 3", title: "Social expansion", text: "Clan system, leaderboard, referral multiplier, weekly reset competition and viral loop layer." },
      { phase: "Phase 4", title: "AI + advanced systems", text: "AI task generation, event engine, competitive modes and behavior-based economy optimization." },
    ],
    whyTitle: "Why ADN wins",
    whyText:
      "ADN does not differentiate by promising higher rewards. It differentiates by unifying retention, utility, traction, social virality and economic balance inside one system.",
    whyCards: [
      ["Retention > hype", "Users do not just arrive and earn; they become attached to a progression layer they do not want to abandon."],
      ["Economy > extraction", "Controlled emission, prestige, sinks and treasury logic keep ADN away from extraction-first collapse."],
      ["Gameplay > click spam", "Combo, chests, clans, leaderboards and AI tasks lift the product beyond mindless tapping."],
      ["Virality > paid noise", "Referral multipliers, clan competition and event FOMO form the core of organic growth."],
    ],
    marketTitle: "Traction and investor language",
    marketCards: [
      ["Mobile gaming market", "A product positioned between a $100B+ mobile gaming ecosystem and the expanding Web3 game layer."],
      ["Metrics we will show", "DAU / MAU, session time, D1 retention, D7 retention, revenue per user and viral coefficient."],
      ["Launch strategy", "Closed beta → viral drop → influencer mesh → leaderboard hype for controlled expansion."],
      ["Ask", "Funding for scaling, strategic partnerships, exchange listings and growth operations."],
    ],
    visionTitle: "Final vision",
    visionText:
      "ADN is not a speculative token; it is a self-sustaining digital economy built on engagement, progression and strategic growth. The end goal is to let users build not only rewards, but wealth, strategy and influence.",
    governance: [
      "Week 1: stabilize economy balance, verification and core loop",
      "Week 2: activate referral and clan layers",
      "Week 3: trigger the first viral wave through events and leaderboards",
      "Week 4: influencer push, visible traction and growth explosion",
    ],
    ctaPrimary: "Join through the bot",
    ctaSecondary: "Back to economy",
  },
};

function SectionBadge({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <span className="section-badge">
      <span className="section-badge-icon">{icon}</span>
      {label}
    </span>
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

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      setScrollProgress(progress);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal-on-scroll"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.16 }
    );

    elements.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [activePage, lang]);

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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
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
          <button type="button" className="entrance-close" aria-label="Close entrance" onClick={() => setShowEntrance(false)}>
            ×
          </button>
          <div className="entrance-copy">
            <span className="entrance-kicker">{t.entrance.kicker}</span>
            <h2>{t.entrance.title}</h2>
            <p>{t.entrance.text}</p>
            <span className="entrance-note">{t.entrance.note}</span>
          </div>
          <div className="entrance-visual">
            <div className="entrance-ring entrance-ring-one" />
            <div className="entrance-ring entrance-ring-two" />
            <img src={adnLionMascot} alt="ADN mascot" className="entrance-mascot" />
          </div>
        </div>
      </div>

      {modal ? (
        <div className="detail-overlay" onClick={() => setModal(null)}>
          <div className="detail-modal reveal-on-scroll is-visible" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="detail-close" aria-label="Close detail popup" onClick={() => setModal(null)}>
              ×
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
                    <div className="compare-arrow">→</div>
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
                  <SectionTitle icon={<Users size={16} />} label={product.flowTitle} title={product.flowTitle} />
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
              <SectionBadge icon={<BadgeDollarSign size={16} />} label={lang === "tr" ? "Dağılım" : "Tokenomics"} />
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
                    { label: "Play & Earn Pool", value: "35%", note: lang === "tr" ? "Oyuncu ödülleri" : "Player rewards" },
                    { label: "Ecosystem / Treasury", value: "20%", note: lang === "tr" ? "Sistem dengesi" : "System balance" },
                    { label: "Team", value: "15%", note: lang === "tr" ? "Kilitli + vesting" : "Locked + vesting" },
                    { label: "Investors", value: "10%", note: lang === "tr" ? "Seed + private" : "Seed + private" },
                    { label: "Marketing & Growth", value: "10%", note: lang === "tr" ? "Kullanıcı edinimi" : "User acquisition" },
                    { label: "Partnerships", value: "5%", note: lang === "tr" ? "Stratejik ortaklık" : "Strategic partners" },
                    { label: "Liquidity", value: "5%", note: lang === "tr" ? "Borsa / likidite" : "Exchange liquidity" },
                  ].map((item, index) => (
                    <button
                      key={item.label}
                      type="button"
                      className="token-row popup-card"
                      onClick={() =>
                        openPopup("Tokenomics", `${item.label} — ${item.value}`, item.note, [lang === "tr" ? "Dağıtım rolü" : "Allocation role"])
                      }
                    >
                      <div className="token-row-top">
                        <span>{item.label}</span>
                        <strong>{item.value}</strong>
                      </div>
                      <div className="token-bar">
                        <div className="token-bar-fill" style={{ width: `${tokenWidths[index]}%` }} />
                      </div>
                      <p className="token-row-note">{item.note}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div className="vesting-grid">
                <article className="glass-card compact">
                  <h3>Team vesting</h3>
                  <p>{lang === "tr" ? "12 ay cliff + 24 ay vesting" : "12 month cliff + 24 month vesting"}</p>
                </article>
                <article className="glass-card compact">
                  <h3>Investor vesting</h3>
                  <p>{lang === "tr" ? "%10 TGE + 12 ay vesting" : "10% TGE + 12 month vesting"}</p>
                </article>
                <article className="glass-card compact">
                  <h3>Loot economy</h3>
                  <p>{lang === "tr" ? "expected_value < cost kuralı korunur" : "expected_value < cost is preserved"}</p>
                </article>
                <article className="glass-card compact">
                  <h3>Anti-whale</h3>
                  <p>{lang === "tr" ? "Diminishing returns, soft cap ve progressive tax" : "Diminishing returns, soft cap and progressive tax"}</p>
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
                        ? "economy_factor dinamik olarak 0.3 ile 1.2 arasında hareket eder; sistem aşırı ısınırsa düşer, denge güçlenirse yükselir."
                        : "economy_factor moves dynamically between 0.3 and 1.2; it falls when the system overheats and rises when balance improves."}
                    </p>
                    <strong>prestige_bonus = sqrt(total_earned)</strong>
                    <p>
                      {lang === "tr"
                        ? "clan_bonus = log(total_clan_points) ve streak = base × (1 + streak × 0.1) katmanları retention ekonomisini destekler."
                        : "clan_bonus = log(total_clan_points) and streak = base × (1 + streak × 0.1) support the retention economy."}
                    </p>
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
                        ? "Çok adımlı güvenlik yapısı; davranış analizi, claim koruması ve cihaz sinyalleriyle bot baskısını azaltır."
                        : "A multi-step security structure that reduces bot pressure through behavior analysis, claim protection and device signals."
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
                        <span>{lang === "tr" ? "Risk seviyesi" : "Risk signal"}</span>
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
              <SectionTitle icon={<Rocket size={16} />} label="Roadmap" title={roadmap.title} />
              <div className="roadmap-grid">
                {roadmap.phases.map((item) => (
                  <button
                    key={item.phase}
                    type="button"
                    className="roadmap-card popup-card"
                    onClick={() => openPopup("Roadmap", `${item.phase} — ${item.title}`, item.text)}
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
                    <span className="insight-value">{lang === "tr" ? "Büyüme" : "Traction"}</span>
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
