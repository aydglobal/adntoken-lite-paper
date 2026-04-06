import { useEffect, useState } from "react";
import {
  BadgeDollarSign,
  BadgeCheck,
  Blocks,
  Bot,
  Compass,
  Fingerprint,
  FileText,
  Gem,
  Gift,
  Globe,
  HelpCircle,
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
import adnTokenMark from "../media/adn_token.png.png";
import adnTokenWordmark from "../media/adn-token-wordmark.png";
import adnLionMascot from "../media/adn-lion.png";
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
  | "airdrop"
  | "faq"
  | "legal";

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
  faq: HelpCircle,
  legal: FileText,
};

const content = {
  tr: {
    brandTitle: "ADN Gold Launch",
    brandSubtitle: "Dijital odul ve harcama deneyimi hala parcalidir",
    topLinks: [
      { href: "#economic-model", label: "Ekonomik Model" },
      { href: "#tokenomics", label: "DaÄŸÄ±lÄ±m" },
      { href: "#airdrop", label: "Airdrop" },
    ],
    langLabel: "Dil",
    nav: [
      { id: "overview", label: "Genel BakÄ±ÅŸ" },
      { id: "economic-model", label: "Ekonomik Model" },
      { id: "problem", label: "Problem" },
      { id: "solution", label: "Ã‡Ã¶zÃ¼m" },
      { id: "tap-to-earn", label: "Dokun-Kazan" },
      { id: "use-cases", label: "KullanÄ±m AlanlarÄ±" },
      { id: "tokenomics", label: "DaÄŸÄ±lÄ±m" },
      { id: "architecture", label: "Sistem AkÄ±ÅŸÄ±" },
      { id: "security", label: "GÃ¼venlik" },
      { id: "roadmap", label: "Yol HaritasÄ±" },
      { id: "governance", label: "YÃ¶netiÅŸim" },
      { id: "airdrop", label: "Airdrop" },
      { id: "faq", label: "SSS" },
      { id: "legal", label: "Yasal" },
    ],
    sidebarTitle: "ADN Gold Launch",
    sidebarText:
      "Oyun, dokun-kazan ve online alÄ±ÅŸveriÅŸ deneyimlerini tek bir gÃ¼venilir token altyapÄ±sÄ±nda birleÅŸtiren resmi lite paper sayfasÄ±.",
    sidebarBadge: "Belge",
    sidebarStrong: "Resmi lite paper",
    sidebarNote: "ÃœrÃ¼n vizyonu, token yapÄ±sÄ±, gÃ¼venlik modeli ve airdrop kurgusu tek akÄ±ÅŸta sunulur.",
    overviewKicker: "Genel BakÄ±ÅŸ",
    overviewTitle: "ADN Token, dokun-kazan, sadakat ve dijital ticareti ayni ekonomik katmanda birlestirir.",
    overviewText:
      "ADN; kullanici kazanimi, oyun ici harcama, odul, sadakat ve partner alisveris deneyimlerini ayni ekonomik modelde bulusturur. Bu lite paper; urun mantigini, dagitim yapisini ve buyume vizyonunu rafine ve profesyonel bir sunumla aktarir.",
    quickFacts: [
      ["Kategori", "Oyun ve ticaret tokenÄ±"],
      ["Toplam Arz", "100,000,000,000 ADN"],
      ["Ana ÃœrÃ¼n", "Dokun-kazan + maÄŸaza Ã¶dÃ¼lleri"],
      ["AÄŸ YapÄ±sÄ±", "Topluluk odaklÄ± dijital ekonomi"],
    ],
    heroMetrics: [
      ["Aktif Model", "GÃ¶rev + sadakat + Ã¶deme"],
      ["Ana BÃ¼yÃ¼me", "Topluluk ve Ã¼rÃ¼n kullanÄ±mÄ±"],
      ["Ã‡ekirdek Fayda", "Oyun, ticaret, Ã¶dÃ¼l"],
    ],
    highlights: [
      {
        title: "KullanÄ±m odaklÄ± ekonomi",
        text: "ADN, yalnÄ±zca bir alÄ±m-satÄ±m varlÄ±ÄŸÄ± olarak deÄŸil; gÃ¶rev, Ã¶deme, sadakat ve Ã¶dÃ¼l deneyimini birleÅŸtiren iÅŸlevsel bir dijital varlÄ±k olarak konumlanÄ±r.",
      },
      {
        title: "Topluluk Ã¶ncelikli daÄŸÄ±lÄ±m",
        text: "ADN ekosisteminde en bÃ¼yÃ¼k pay, kullanÄ±cÄ± bÃ¼yÃ¼mesi, dokun-kazan katÄ±lÄ±mÄ±, gÃ¶rev ekonomisi ve airdrop mekanikleri iÃ§in ayrÄ±lÄ±r.",
      },
      {
        title: "ÃœrÃ¼n merkezli fayda",
        text: "Dokun-kazan, oyun satÄ±n alÄ±mlarÄ± ve online alÄ±ÅŸveriÅŸ sadakati aynÄ± token fayda modelinde birleÅŸir.",
      },
      {
        title: "GÃ¼venilir operasyon",
        text: "Anti-bot kontrolleri, gÃ¶rev doÄŸrulama ve ÅŸeffaf daÄŸÄ±tÄ±m mantÄ±ÄŸÄ± ile gÃ¼ven veren bir lansman yapÄ±sÄ± hedeflenir.",
      },
    ],
    spotlightTitle: "ADN Neyi BirleÅŸtirir?",
    spotlightText:
      "ADN, oyuncunun gÃ¼nlÃ¼k etkileÅŸimini, markanÄ±n dÃ¶nÃ¼ÅŸÃ¼m hedefini ve topluluÄŸun sadakat davranÄ±ÅŸÄ±nÄ± tek bir deÄŸer zincirinde buluÅŸturur.",
    utilityStrip: [
      "Oyun iÃ§i satÄ±n alÄ±m",
      "Sadakat Ã¶dÃ¼lÃ¼",
      "MaÄŸaza indirimi",
      "GÃ¶rev teÅŸviki",
      "Topluluk eriÅŸimi",
    ],
    economicModel: {
      kicker: "Ekonomik Model",
      title: "ADN arz ve daÄŸÄ±lÄ±m mantÄ±ÄŸÄ±",
      text: "ADN toplam arzÄ± 100 milyar adet olarak yapÄ±landÄ±rÄ±lmÄ±ÅŸtÄ±r. Bu Ã¶lÃ§ek; mikro Ã¶dÃ¼l ekonomisi, oyun iÃ§i kullanÄ±m, yÃ¼ksek kullanÄ±cÄ± eriÅŸimi ve sadakat tabanlÄ± daÄŸÄ±tÄ±m yapÄ±sÄ±nÄ± dengeli biÃ§imde desteklemek iÃ§in seÃ§ilmiÅŸtir.",
      stats: [
        ["Toplam Arz", "100B ADN"],
        ["Topluluk PayÄ±", "60%"],
        ["Likidite PayÄ±", "10%"],
        ["Rezerv ve Hazine", "8%"],
      ],
    },
    problem: {
      kicker: "Problem",
      title: "Dijital odul ve harcama deneyimi hala parcalidir",
      text: "KullanÄ±cÄ± bir uygulamada etkileÅŸim Ã¼retirken baÅŸka bir platformda harcama yapÄ±yor; ancak bu iki davranÄ±ÅŸÄ± ortak deÄŸer modeliyle baÄŸlayan Ã¼rÃ¼nler hÃ¢lÃ¢ sÄ±nÄ±rlÄ±. ADN, dokun-kazan kullanÄ±cÄ± tabanÄ±nÄ± Ã¶deme ve sadakat ekonomisine baÄŸlamak iÃ§in tasarlanÄ±r.",
    },
    solution: {
      kicker: "Ã‡Ã¶zÃ¼m",
      title: "ADN tum ana akislar icin ortak ekonomik katman olarak calisir",
      callout:
        "ADN; dokun-kazan uygulamasÄ±, oyun ekonomileri, maÄŸaza Ã¶dÃ¼lleri ve airdrop daÄŸÄ±tÄ±mÄ±nÄ± tek Ã¼rÃ¼n dili iÃ§inde birleÅŸtirerek kullanÄ±cÄ± davranÄ±ÅŸÄ±nÄ± uzun vadeli ekosistem deÄŸerine dÃ¶nÃ¼ÅŸtÃ¼rÃ¼r.",
    },
    tap: {
      kicker: "Dokun-Kazan UygulamasÄ±",
      title: "Dokun-kazan uygulamasÄ± bÃ¼yÃ¼me motorudur",
      text: "ADN ekosisteminde dokun-kazan yalnÄ±zca trafik kaynaÄŸÄ± deÄŸil, aynÄ± zamanda kullanÄ±cÄ± kalitesi, sadakat seviyesi ve airdrop uygunluÄŸu iÃ§in ana sinyal katmanÄ±dÄ±r.",
      items: [
        {
          title: "GÃ¼nlÃ¼k gÃ¶rev ekonomisi",
          text: "KullanÄ±cÄ±lar tap, check-in, gÃ¶rev, referans ve sezon etkinlikleriyle puan Ã¼retir ve ADN hak ediÅŸi kazanÄ±r.",
        },
        {
          title: "SÃ¼rdÃ¼rÃ¼lebilir denge",
          text: "Enerji, combo, gÃ¶rev tavanÄ± ve seviye mantÄ±ÄŸÄ± ile kontrolsÃ¼z enflasyon yerine dengeli bÃ¼yÃ¼me hedeflenir.",
        },
        {
          title: "Airdrop'a baÄŸlÄ± deÄŸer akÄ±ÅŸÄ±",
          text: "Dokun-kazan davranÄ±ÅŸÄ±, airdrop puanÄ± ve ekosistem sadakati ile doÄŸrudan iliÅŸkilendirilir.",
        },
      ],
    },
    useCases: {
      kicker: "KullanÄ±m AlanlarÄ±",
      title: "Temel kullanÄ±m alanlarÄ±",
      items: [
        {
          title: "Oyun iÃ§i kullanÄ±m",
          items: [
            "Skin, battle pass, turnuva ve premium eriÅŸim Ã¶demeleri",
            "GÃ¶rev, sezon, baÅŸarÄ± ve topluluk etkinliÄŸi Ã¶dÃ¼lleri",
            "VIP Ã¼yelik, boost ve Ã¶zel iÃ§erik kilitleri",
          ],
        },
        {
          title: "Online alÄ±ÅŸveriÅŸ kullanÄ±mÄ±",
          items: [
            "Partner maÄŸazalarda cashback ve indirim mekanikleri",
            "Sepet tamamlama ve kampanya katÄ±lÄ±m teÅŸvikleri",
            "Sadakat puanÄ±nÄ± token ekonomisine baÄŸlayan alÄ±ÅŸveriÅŸ akÄ±ÅŸÄ±",
          ],
        },
        {
          title: "Topluluk ve yÃ¶netiÅŸim",
          items: [
            "Stake ederek ekosistem katkÄ± Ã¶dÃ¼lleri alma",
            "ÃœrÃ¼n Ã¶ncelikleri ve kampanya yapÄ±larÄ± iÃ§in oylama",
            "Ã–zel gÃ¶rev serileri ve whitelist eriÅŸimi",
          ],
        },
      ],
    },
    tokenomics: {
      kicker: "Tokenomics",
      title: "ADN daÄŸÄ±lÄ±m modeli",
      text: "ADN daÄŸÄ±lÄ±m modeli; kullanÄ±cÄ± kazanÄ±mÄ±, ekosistem bÃ¼yÃ¼mesi, likidite sÃ¼rdÃ¼rÃ¼lebilirliÄŸi ve operasyonel devamlÄ±lÄ±k arasÄ±nda dengeli bir yapÄ± kurmak amacÄ±yla tasarlanmÄ±ÅŸtÄ±r. Topluluk, dokun-kazan ve airdrop havuzu toplamda %60 olarak belirlenmiÅŸtir.",
      center: "ADN ArzÄ±",
      labels: {
        community: "Topluluk, Dokun-Kazan ve Airdrop",
        ecosystem: "Ekosistem GeliÅŸimi",
        liquidity: "Likidite ve Piyasa DesteÄŸi",
        treasury: "Hazine ve Rezerv",
        team: "TakÄ±m ve Operasyon",
        partners: "Stratejik Partnerler",
      },
    },
    architecture: {
      kicker: "Sistem AkÄ±ÅŸÄ±",
      title: "Sistem nasÄ±l Ã§alÄ±ÅŸÄ±r?",
      items: [
        "KullanÄ±cÄ± dokun-kazan uygulamasÄ±na girer, gÃ¶revleri tamamlar ve puan Ã¼retir.",
        "CÃ¼zdan doÄŸrulamasÄ± ile oyun iÃ§i ve ticaret odaklÄ± kullanÄ±m alanlarÄ±na baÄŸlanÄ±r.",
        "Sadakat seviyesi, gÃ¶rev kalitesi ve kullanÄ±m davranÄ±ÅŸÄ± ADN hak ediÅŸ skorunu oluÅŸturur.",
        "Uygun kullanÄ±cÄ±lar airdrop, Ã¶dÃ¼l ve partner teÅŸvik akÄ±ÅŸlarÄ±na dahil edilir.",
      ],
    },
    security: {
      kicker: "GÃ¼venlik",
      title: "Profesyonel, gÃ¼venilir ve Ã¶lÃ§eklenebilir yapÄ±",
      items: [
        "CÃ¼zdan baÄŸlantÄ±larÄ± yalnÄ±zca gÃ¼venli imza akÄ±ÅŸlarÄ± ve doÄŸrulama katmanlarÄ± ile yÃ¶netilir.",
        "Ã‡oklu hesap, bot trafiÄŸi ve yapay gÃ¶rev Ã¼retimi davranÄ±ÅŸ analizi ile filtrelenir.",
        "Airdrop uygunluÄŸu, gÃ¶rev kalitesi, hesap gÃ¼ven skoru ve cÃ¼zdan geÃ§miÅŸi ile deÄŸerlendirilir.",
        "DaÄŸÄ±tÄ±m ve Ã¶dÃ¼l sÃ¼reÃ§leri kayÄ±t altÄ±na alÄ±narak denetlenebilir ve raporlanabilir hale getirilir.",
      ],
    },
    roadmap: {
      kicker: "Yol HaritasÄ±",
      title: "BÃ¼yÃ¼me planÄ±",
      items: [
        {
          phase: "Faz 1",
          title: "Lansman HazÄ±rlÄ±ÄŸÄ±",
          text: "Marka, lite paper, topluluk altyapÄ±sÄ±, cÃ¼zdan deneyimi ve ilk bekleme listesi aÃ§Ä±lÄ±ÅŸÄ±.",
        },
        {
          phase: "Faz 2",
          title: "Dokun-Kazan Beta",
          text: "Uygulama yayÄ±nÄ±, gÃ¶rev sistemi, seviye kurgusu, anti-bot filtreleri ve puan toplama altyapÄ±sÄ±.",
        },
        {
          phase: "Faz 3",
          title: "Token ve Merchant AÃ§Ä±lÄ±mÄ±",
          text: "ADN kullanÄ±m alanlarÄ±nÄ±n oyun ve online alÄ±ÅŸveriÅŸ partnerlerinde aktif hale gelmesi.",
        },
        {
          phase: "Faz 4",
          title: "Airdrop ve Ã–lÃ§eklenme",
          text: "Snapshot, hak ediÅŸ, topluluk daÄŸÄ±tÄ±mÄ±, staking ve yÃ¶netiÅŸim Ã¶zelliklerinin aÃ§Ä±lmasÄ±.",
        },
      ],
    },
    governance: {
      kicker: "YÃ¶netiÅŸim",
      title: "YÃ¶netiÅŸim ve ilkeler",
      items: [
        "Topluluk bÃ¼yÃ¼mesi ile Ã¼rÃ¼n geliÅŸimi arasÄ±nda ÅŸeffaf bir karar mekanizmasÄ± yÃ¼rÃ¼tÃ¼lÃ¼r.",
        "Rezerv, teÅŸvik ve kampanya kullanÄ±mlarÄ± periyodik raporlarla aÃ§Ä±klanÄ±r.",
        "Partner kabul modeli, marka gÃ¼venliÄŸi, gerÃ§ek kullanÄ±m ve uyum kriterlerine gÃ¶re Ã§alÄ±ÅŸÄ±r.",
        "Uzun vadeli hedef, ADN'yi oyun ve ticaret odaklÄ± sadakat ekonomisinin omurgasÄ± haline getirmektir.",
      ],
    },
    airdrop: {
      kicker: "Airdrop",
      title: "YayÄ±n hazÄ±r airdrop modeli",
      callout:
        "ADN airdrop'u, geÃ§ici hype yerine gerÃ§ek kullanÄ±cÄ± kalitesi, uygulama iÃ§i davranÄ±ÅŸ ve doÄŸrulanmÄ±ÅŸ sadakat sinyalleri Ã¼zerinden daÄŸÄ±tÄ±m yapacak ÅŸekilde tasarlanÄ±r.",
      items: [
        "Airdrop havuzu, %60 topluluk payÄ± iÃ§indeki dokun-kazan ve erken kullanÄ±cÄ± Ã¶dÃ¼l mekanizmasÄ±nÄ±n ana parÃ§asÄ± olarak Ã§alÄ±ÅŸÄ±r.",
        "Hak ediÅŸ modeli; aktif kullanÄ±m, gÃ¶rev kalitesi, seviye, referans kalitesi ve cÃ¼zdan doÄŸrulamasÄ±na gÃ¶re puanlanÄ±r.",
        "Bot, spam, Ã§oklu hesap ve manipÃ¼lasyon tespit edilen hesaplar otomatik veya manuel inceleme ile kapsam dÄ±ÅŸÄ± bÄ±rakÄ±lÄ±r.",
        "Snapshot tarihi, claim dÃ¶nemi ve vesting detaylarÄ± resmi yayÄ±nda sabit takvim ile duyurulur.",
      ],
    },
    releaseTitle: "Not",
    releaseText:
      "Bu belge ADN Token lite paper sunumudur. Nihai hukuki Ã§erÃ§eve, listelenme planÄ± ve teknik sÃ¶zleÅŸme detaylarÄ± resmi lansman dokÃ¼manlarÄ±nda ayrÄ±ca duyurulacaktÄ±r.",
    heroBadges: ["Dokun-Kazan", "Online AlÄ±ÅŸveriÅŸ", "Topluluk Ekonomisi"],
    trustBar: [
      "Åeffaf daÄŸÄ±lÄ±m mantÄ±ÄŸÄ±",
      "GerÃ§ek kullanÄ±cÄ± odaklÄ± airdrop",
      "Anti-bot gÃ¼venlik katmanÄ±",
      "Ã–lÃ§eklenebilir Ã¼rÃ¼n yapÄ±sÄ±",
    ],
    trustFeaturesTitle: "ADN GÃ¼ven Ã‡erÃ§evesi",
    trustFeaturesText:
      "AÅŸaÄŸÄ±daki yapÄ± taÅŸlarÄ±, ADN ekosisteminin daha gÃ¼venilir, daha Ã¶lÃ§Ã¼lebilir ve daha sÃ¼rdÃ¼rÃ¼lebilir ÅŸekilde bÃ¼yÃ¼mesi iÃ§in temel ilke seti olarak konumlanÄ±r.",
    trustFeatures: [
      ["GerÃ§ek kullanÄ±cÄ± skoru", "Airdrop ve Ã¶dÃ¼l modeli, aktif davranÄ±ÅŸ ve kaliteli katÄ±lÄ±m verisi Ã¼zerinden hesaplanÄ±r."],
      ["Captcha ve anti-bot", "GÃ¶rev ve claim akÄ±ÅŸÄ±, otomasyon ve spam davranÄ±ÅŸlarÄ±nÄ± azaltan Ã§ok katmanlÄ± filtrelerle korunur."],
      ["Åeffaf topluluk payÄ±", "Topluluk ayrÄ±mÄ± ve ana daÄŸÄ±lÄ±m mantÄ±ÄŸÄ± aÃ§Ä±k ÅŸekilde sunulur."],
      ["AÅŸamalÄ± hak ediÅŸ", "Ã–dÃ¼l ve claim yapÄ±sÄ± tek seferlik deÄŸil, kontrollÃ¼ dÃ¶nemler halinde kurgulanÄ±r."],
      ["CÃ¼zdan doÄŸrulama", "KatÄ±lÄ±m ve hak ediÅŸ sÃ¼reÃ§lerinde gÃ¼venilir wallet baÄŸlama adÄ±mlarÄ± uygulanÄ±r."],
      ["Ã‡oklu hesap filtresi", "ÅÃ¼pheli tekrar, bot ve aÄŸ manipÃ¼lasyonu davranÄ±ÅŸÄ± sistem dÄ±ÅŸÄ±nda bÄ±rakÄ±lÄ±r."],
      ["Partner uyum kontrolÃ¼", "Merchant ve kampanya tarafÄ±nda marka gÃ¼venliÄŸi ve uyum kriterleri gÃ¶zetilir."],
      ["Rezerv disiplini", "Hazine ve teÅŸvik alanlarÄ± kontrolsÃ¼z deÄŸil, planlÄ± kullanÄ±m ilkesiyle Ã§alÄ±ÅŸÄ±r."],
      ["Topluluk yÃ¶netiÅŸimi", "ÃœrÃ¼n geliÅŸimi ve kampanya Ã¶ncelikleri iÃ§in topluluk sinyali dikkate alÄ±nÄ±r."],
      ["Resmi iletiÅŸim takvimi", "Snapshot, claim, gÃ¼ncelleme ve kritik deÄŸiÅŸiklikler resmi duyuru akÄ±ÅŸÄ±yla paylaÅŸÄ±lÄ±r."],
    ],
    faqSection: {
      kicker: "SSS",
      title: "SÄ±k sorulan sorular",
      items: [
        [
          "ADN Token ne iÃ§in tasarlanmÄ±ÅŸtÄ±r?",
          "ADN Token; oyun, dokun-kazan, topluluk Ã¶dÃ¼lleri ve online alÄ±ÅŸveriÅŸ deneyimlerini aynÄ± ekonomik yapÄ± iÃ§inde birleÅŸtirmek iÃ§in tasarlanmÄ±ÅŸtÄ±r.",
        ],
        [
          "Toplam arz ne kadar?",
          "Lite paper yapÄ±sÄ±nda toplam arz 100,000,000,000 ADN olarak planlanmÄ±ÅŸtÄ±r.",
        ],
        [
          "Airdrop nasÄ±l iÅŸleyecek?",
          "Airdrop modeli; aktif kullanÄ±m, gÃ¶rev kalitesi, cÃ¼zdan doÄŸrulamasÄ± ve gÃ¼ven skoru gibi kriterlere dayalÄ± ÅŸekilde Ã§alÄ±ÅŸacaktÄ±r.",
        ],
        [
          "Bot ve spam hesaplara karÅŸÄ± ne yapÄ±lacak?",
          "Captcha, davranÄ±ÅŸ analizi, Ã§oklu hesap filtresi ve manuel inceleme katmanlarÄ± birlikte kullanÄ±lacaktÄ±r.",
        ],
        [
          "ADN yalnÄ±zca bir tanÄ±tÄ±m tokenÄ± mÄ±?",
          "HayÄ±r. Model; kullanÄ±m, Ã¶dÃ¼l, sadakat, kampanya ve partner ticaret akÄ±ÅŸlarÄ±yla gerÃ§ek fayda Ã¼retmeye odaklanÄ±r.",
        ],
        [
          "Resmi duyurular nereden takip edilmeli?",
          "Resmi aÃ§Ä±klamalar yalnÄ±zca ADN Tokenâ€™Ä±n doÄŸrulanmÄ±ÅŸ sosyal kanallarÄ±, resmi botu ve yayÄ±nlanan dokÃ¼man akÄ±ÅŸÄ± Ã¼zerinden takip edilmelidir.",
        ],
      ],
    },
    legalSection: {
      kicker: "Yasal ve Gizlilik",
      title: "Legal disclaimer ve gizlilik sÃ¶zleÅŸmesi",
      disclaimerTitle: "Legal Disclaimer",
      disclaimerText:
        "Bu lite paper yalnÄ±zca bilgilendirme ve tanÄ±tÄ±m amacÄ± taÅŸÄ±r. Buradaki iÃ§erikler yatÄ±rÄ±m tavsiyesi, menkul kÄ±ymet teklifi, garanti edilmiÅŸ getiri vaadi veya baÄŸlayÄ±cÄ± finansal beyan niteliÄŸi taÅŸÄ±maz. Nihai teknik, hukuki ve operasyonel Ã§erÃ§eve resmi lansman dokÃ¼manlarÄ±nda ayrÄ±ca duyurulabilir.",
      privacyTitle: "Gizlilik SÃ¶zleÅŸmesi",
      privacyText:
        "ADN ekosisteminde kullanÄ±cÄ± gÃ¼veni temel Ã¶nceliktir. Bot, gÃ¶rev, cÃ¼zdan ve kampanya akÄ±ÅŸlarÄ±nda elde edilen veriler; gÃ¼venlik, uygunluk doÄŸrulamasÄ±, kÃ¶tÃ¼ye kullanÄ±m Ã¶nleme ve hizmet kalitesi amacÄ±yla sÄ±nÄ±rlÄ± Ã¶lÃ§Ã¼de iÅŸlenebilir. KullanÄ±cÄ± verileri yalnÄ±zca gerekli operasyonel Ã§erÃ§evede deÄŸerlendirilir.",
      copyright: "Â© 2026 ADN Token. TÃ¼m haklarÄ± saklÄ±dÄ±r.",
    },
    ctaTitle: "ADN ile dijital deger akisini guclendirin",
    ctaText:
      "Lite paper; Ã¼rÃ¼n vizyonu, kullanÄ±cÄ± bÃ¼yÃ¼mesi, token faydasÄ± ve airdrop stratejisini tek bir profesyonel sunum altÄ±nda toplar.",
    ctaPrimary: "Airdrop BÃ¶lÃ¼mÃ¼ne Git",
    ctaSecondary: "DaÄŸÄ±lÄ±mÄ± Ä°ncele",
  },
  en: {
    brandTitle: "ADN Gold Launch",
    brandSubtitle: "Dijital odul ve harcama deneyimi hala parcalidir",
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
      { id: "faq", label: "FAQ" },
      { id: "legal", label: "Legal" },
    ],
    sidebarTitle: "ADN Gold Launch",
    sidebarText:
      "A publication-ready documentation site that brings gaming, Tap to Earn and online shopping experiences together under one reliable token infrastructure.",
    sidebarBadge: "Document",
    sidebarStrong: "Official lite paper",
    sidebarNote: "Product vision, token structure, security model and airdrop design are presented in one consistent flow.",
    overviewKicker: "Overview",
    overviewTitle: "ADN Token unifies Tap to Earn, loyalty and digital commerce in one economic layer.",
    overviewText:
      "ADN aligns user acquisition, in-game spending, rewards, loyalty and partner commerce inside a single economic model. This lite paper presents the product logic, token structure and growth vision in a cleaner and more premium format.",
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
      title: "ADN operates as the unified economic layer across the product stack",
      callout:
        "ADN combines the Tap to Earn app, gaming economies, merchant rewards and airdrop distribution into one product language that turns user behavior into long-term ecosystem value.",
    },
    tap: {
      kicker: "Tap to Earn App",
      title: "The Tap to Earn app is the primary ADN growth engine",
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
    trustFeaturesTitle: "ADN Trust Framework",
    trustFeaturesText:
      "The following pillars define the core principles designed to make the ADN ecosystem more credible, measurable and sustainable over time.",
    trustFeatures: [
      ["Real-user scoring", "Airdrop and reward distribution is based on active behavior and quality participation data."],
      ["Captcha and anti-bot", "Mission and claim flows are protected through multi-layer filters against automation and spam."],
      ["Transparent community allocation", "Community allocation and core distribution logic are presented clearly."],
      ["Phased eligibility", "Reward and claim structures are designed in controlled stages rather than one-time bursts."],
      ["Wallet verification", "Reliable wallet connection steps support participation and eligibility flows."],
      ["Multi-account filtering", "Suspicious repetition, bot behavior and network manipulation patterns are excluded."],
      ["Partner compliance checks", "Merchant and campaign-side brand safety and compliance criteria are considered."],
      ["Treasury discipline", "Treasury and incentive allocations follow planned usage principles rather than uncontrolled release."],
      ["Community governance", "Community signals are considered in product priorities and campaign direction."],
      ["Official communication schedule", "Snapshot, claim, update and critical timeline changes are shared through official channels."],
    ],
    faqSection: {
      kicker: "FAQ",
      title: "Frequently asked questions",
      items: [
        [
          "What is ADN Token designed for?",
          "ADN Token is designed to bring gaming, Tap to Earn, community rewards and online shopping experiences into one unified economic layer.",
        ],
        ["What is the total supply?", "The lite paper model is structured around a total supply of 100,000,000,000 ADN."],
        [
          "How will the airdrop work?",
          "The airdrop model is expected to use criteria such as active usage, task quality, wallet verification and trust scoring.",
        ],
        [
          "How will bot and spam accounts be handled?",
          "Captcha checks, behavior analysis, multi-account filters and manual review layers are designed to work together.",
        ],
        [
          "Is ADN only a promotional token?",
          "No. The model is centered on real utility across rewards, loyalty, campaigns, in-product access and partner commerce flows.",
        ],
        [
          "Where should official announcements be followed?",
          "Official updates should only be followed through ADN Tokenâ€™s verified social channels, official bot and published documentation flow.",
        ],
      ],
    },
    legalSection: {
      kicker: "Legal and Privacy",
      title: "Legal disclaimer and privacy notice",
      disclaimerTitle: "Legal Disclaimer",
      disclaimerText:
        "This lite paper is intended for informational and promotional purposes only. Nothing presented here should be interpreted as investment advice, a securities offering, guaranteed return language or a binding financial commitment. Final technical, legal and operational terms may be announced separately in official launch documents.",
      privacyTitle: "Privacy Notice",
      privacyText:
        "User trust is a core priority within the ADN ecosystem. Data collected across bot, mission, wallet and campaign flows may be processed in a limited scope for security, eligibility verification, abuse prevention and service quality purposes. User information is evaluated only within required operational boundaries.",
      copyright: "Â© 2026 ADN Token. All rights reserved.",
    },
    ctaTitle: "ADN ile dijital deger akisini guclendirin",
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
  const [showLaunchPopup, setShowLaunchPopup] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("overview");
  const [glowShift, setGlowShift] = useState({ x: 0, y: 0 });
  const [heroLight, setHeroLight] = useState({ x: 68, y: 30 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const t = content[lang];
  const telegramBotUrl = import.meta.env.VITE_TELEGRAM_BOT_URL || "https://t.me/adntoken_bot?start=litepaper";

  useEffect(() => {
    const introTimer = window.setTimeout(() => {
      setShowIntro(false);
      setShowLaunchPopup(true);
    }, 1700);

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

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const next = total > 0 ? (window.scrollY / total) * 100 : 0;
      setScrollProgress(next);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="docs-shell">
      <div className="scroll-progress">
        <span style={{ width: `${scrollProgress}%` }} />
      </div>
      <div className={`launch-popup-overlay ${showLaunchPopup ? "visible" : ""}`}>
        <div className={`launch-popup ${showLaunchPopup ? "visible" : ""}`}>
          <button
            type="button"
            className="popup-close"
            onClick={() => setShowLaunchPopup(false)}
            aria-label={lang === "tr" ? "Pencereyi kapat" : "Close popup"}
          >
            ×
          </button>
          <div className="launch-popup-copy">
            <span className="launch-popup-kicker">{lang === "tr" ? "Özel giriş" : "Entrance mode"}</span>
            <h3>{lang === "tr" ? "ADN ekosistemine hoş geldiniz" : "Welcome to the ADN ecosystem"}</h3>
            <p>
              {lang === "tr"
                ? "Bu açılış penceresi, ADN Token dünyasına daha sakin, daha premium ve daha net bir ilk temas vermek için hazırlandı. İçeri geçmeden önce ekosistemin odak noktasını kısa şekilde sunar."
                : "This entrance modal is designed to provide a calmer, more premium and clearer first touch before entering the ADN ecosystem."}
            </p>
            <div className="popup-points">
              <div className="popup-point">
                <strong>{lang === "tr" ? "Topluluk odaklı yapı" : "Community-led structure"}</strong>
                <span>{lang === "tr" ? "Tap to Earn, airdrop ve sadakat akışı aynı ekonomik mantıkta birleşir." : "Tap to Earn, airdrop and loyalty mechanics align under one economic model."}</span>
              </div>
              <div className="popup-point">
                <strong>{lang === "tr" ? "Güvenli başlangıç" : "Secure start"}</strong>
                <span>{lang === "tr" ? "Güvenlik, uygunluk ve topluluk kalitesi lansmanın merkezinde tutulur." : "Security, eligibility and community quality remain central to the launch."}</span>
              </div>
              <div className="popup-point">
                <strong>{lang === "tr" ? "Maskot destekli giriş" : "Mascot-led entrance"}</strong>
                <span>{lang === "tr" ? "Daha sıcak, daha akılda kalıcı ve daha enerjik bir ilk izlenim hedeflenir." : "A warmer, more memorable and more energetic first impression is the goal."}</span>
              </div>
            </div>
            <div className="popup-note">
              <span>{lang === "tr" ? "İçeri geçmek için sağ üstteki çarpıya dokunun." : "Use the close icon at the top right to enter the site."}</span>
            </div>
          </div>
          <div className="launch-popup-visual">
            <div className="launch-popup-orbit launch-popup-orbit-one" />
            <div className="launch-popup-orbit launch-popup-orbit-two" />
            <img src={adnLionMascot} alt="ADN mascot" className="launch-popup-mascot" />
            <div className="launch-popup-chip">
              <img src={adnTokenMark} alt="ADN emblem" className="launch-popup-chip-logo" />
              <div>
                <strong>{lang === "tr" ? "Tap to Earn hazır" : "Tap to Earn ready"}</strong>
                <span>{lang === "tr" ? "Daha enerjik ürün sahnesi" : "A more energetic product stage"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

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
          <img src={adnTokenWordmark} alt="ADN Token" className="intro-wordmark" />
          <img src={adnTokenMark} alt="ADN emblem" className="intro-logo" />
          <div className="intro-title">{lang === "tr" ? "Resmi Lansman Girişi" : "Official Launch Entrance"}</div>
          <div className="intro-subtitle">{t.brandSubtitle}</div>
          <div className="intro-progress">
            <span className="intro-progress-bar" />
          </div>
        </div>
      </div>

      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">
            <img src={adnTokenMark} alt="ADN emblem" className="brand-logo-image" />
          </div>
          <div className="brand-copy">
            <img src={adnTokenWordmark} alt="ADN Token" className="brand-wordmark" />
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
            <img src={adnTokenWordmark} alt="ADN Token" className="sidebar-logo" />
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
          <section
            id="overview"
            className="hero reveal-on-scroll is-visible"
            style={{ ["--hero-light-x" as string]: `${heroLight.x}%`, ["--hero-light-y" as string]: `${heroLight.y}%` }}
            onMouseMove={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              const x = ((event.clientX - rect.left) / rect.width) * 100;
              const y = ((event.clientY - rect.top) / rect.height) * 100;
              setHeroLight({ x, y });
            }}
            onMouseLeave={() => setHeroLight({ x: 68, y: 30 })}
          >
            <div className="hero-copy">
              <SectionBadge id="overview" label={t.overviewKicker} />
              <div className="hero-brandline">
                <img src={adnTokenWordmark} alt="ADN Token" className="hero-wordmark" />
                <div className="hero-brand-text">
                  <strong>{lang === "tr" ? "Resmi Lite Paper" : "Official Lite Paper"}</strong>
                  <span>
                    {lang === "tr"
                      ? "Topluluk, Tap to Earn ve dijital ticaret için rafine lansman sayfası"
                      : "A refined launch page for community, Tap to Earn and digital commerce"}
                  </span>
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
                  <span>{lang === "tr" ? "Telegram Botunu AÃ§" : "Open Telegram Bot"}</span>
                </a>
                <a href="#airdrop" className="cta-btn secondary hero-telegram-btn secondary">
                  <Gift size={18} strokeWidth={2.3} />
                  <span>{lang === "tr" ? "Airdropa GeÃ§" : "Go to Airdrop"}</span>
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

            <div className="hero-panel hero-stage">
              <div className="hero-stage-light" />
              <div className="hero-stage-rings hero-stage-rings-one" />
              <div className="hero-stage-rings hero-stage-rings-two" />
              <div className="hero-poster-brand">
                <span className="hero-panel-head">{lang === "tr" ? "Launch 2026" : "Launch 2026"}</span>
                <img src={adnTokenMark} alt="ADN emblem" className="hero-logo" />
              </div>
              <img
                src={adnLionMascot}
                alt={lang === "tr" ? "ADN maskotu" : "ADN mascot"}
                className="hero-stage-mascot"
              />
              <div className="hero-stage-token">
                <img src={adnTokenMark} alt="ADN emblem" className="hero-stage-token-image" />
              </div>
              <div className="hero-poster-copy">
                <span>{lang === "tr" ? "Topluluk odaklı büyüme" : "Community-led growth"}</span>
                <strong>{lang === "tr" ? "Ürün, güven ve görünürlüğü aynı sahnede toplayan premium lansman akışı" : "A premium launch flow aligning product, trust and visibility in one scene"}</strong>
              </div>
              <div className="hero-poster-facts hero-stage-facts">
                {t.quickFacts.map(([label, value]) => (
                  <div className="hero-poster-fact" key={label}>
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
            <div className="tap-showcase">
              <div className="tap-showcase-copy">
                <h2>{t.tap.title}</h2>
                <p>{t.tap.text}</p>
                <div className="tap-showcase-pills">
                  <span>{lang === "tr" ? "Maskot odaklÄ± onboarding" : "Mascot-led onboarding"}</span>
                  <span>{lang === "tr" ? "Daha sÄ±cak Ã¼rÃ¼n hikayesi" : "Warmer product storytelling"}</span>
                  <span>{lang === "tr" ? "Tap to Earn yÃ¼zÃ¼" : "The face of Tap to Earn"}</span>
                </div>
              </div>
              <div className="tap-showcase-visual">
                <div className="tap-character-stage">
                  <div className="tap-character-glow" />
                  <img
                    src={adnLionMascot}
                    alt={lang === "tr" ? "ADN Tap to Earn aslan maskotu" : "ADN Tap to Earn lion mascot"}
                    className="tap-character-image"
                  />
                  <div className="tap-character-chip">
                    <img src={adnTokenMark} alt="ADN emblem" className="tap-character-chip-logo" />
                    <div>
                      <strong>{lang === "tr" ? "Tap to Earn Karakteri" : "Tap to Earn Mascot"}</strong>
                      <span>{lang === "tr" ? "Daha akÄ±lda kalÄ±cÄ±, daha sÄ±cak, daha gÃ¼Ã§lÃ¼ ilk temas" : "A warmer, stronger and more memorable first touch"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                    <strong>{lang === "tr" ? "Token Fayda KatmanlarÄ±" : "Token Utility Layers"}</strong>
                    <p>
                      {lang === "tr"
                        ? "ADN yalnÄ±zca Ã¶dÃ¼l deÄŸil, doÄŸrudan kullanÄ±m akÄ±ÅŸÄ± Ã¼retir."
                        : "ADN is designed to power real product flows beyond rewards."}
                    </p>
                  </div>
                </div>
                <div className="utility-flow">
                  {(lang === "tr"
                    ? [
                        ["GÃ¶rev", "KullanÄ±cÄ± etkileÅŸimi puan ve seviye Ã¼retir."],
                        ["Ã–dÃ¼l", "Hak edilen ADN sadakat davranÄ±ÅŸÄ±nÄ± gÃ¼Ã§lendirir."],
                        ["Harcama", "Token oyun ve maÄŸaza deneyiminde kullanÄ±lÄ±r."],
                        ["EriÅŸim", "Topluluk gÃ¶revleri ve Ã¶zel kampanyalar aÃ§Ä±lÄ±r."],
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
                    <strong>{lang === "tr" ? "Partner AkÄ±ÅŸ Modeli" : "Partner Flow Model"}</strong>
                    <p>
                      {lang === "tr"
                        ? "Merchant tarafÄ±, kullanÄ±cÄ± kazanÄ±mÄ±nÄ± doÄŸrudan ticarete baÄŸlar."
                        : "The merchant side converts user growth into measurable commerce activity."}
                    </p>
                  </div>
                </div>
                <div className="partner-flow">
                  {(lang === "tr"
                    ? [
                        "Kampanya ve gÃ¶rev yayÄ±na alÄ±nÄ±r",
                        "Topluluk uygulamada etkileÅŸim Ã¼retir",
                        "CÃ¼zdan ve uygunluk doÄŸrulanÄ±r",
                        "Ä°ndirim, cashback veya claim akÄ±ÅŸÄ± tetiklenir",
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
                    <strong>{lang === "tr" ? "Captcha DoÄŸrulama KatmanÄ±" : "Captcha Verification Layer"}</strong>
                    <p>
                      {lang === "tr"
                        ? "Airdrop ve gÃ¶rev akÄ±ÅŸÄ±nda bot baskÄ±sÄ±nÄ± dÃ¼ÅŸÃ¼ren Ã§ok adÄ±mlÄ± doÄŸrulama yapÄ±sÄ±."
                        : "A multi-step verification layer that reduces bot pressure across missions and airdrop flows."}
                    </p>
                  </div>
                </div>

                <div className="captcha-mock">
                  <div className="captcha-window">
                    <div className="captcha-head">
                      <span>{lang === "tr" ? "GÃ¼venlik KontrolÃ¼" : "Security Check"}</span>
                      <BadgeCheck size={18} strokeWidth={2.4} />
                    </div>
                    <div className="captcha-body">
                      <div className="captcha-box checked">
                        <span className="captcha-tick">âœ“</span>
                        <strong>{lang === "tr" ? "Ä°nsan doÄŸrulamasÄ± tamamlandÄ±" : "Human verification complete"}</strong>
                      </div>
                      <div className="captcha-meta">
                        <span>{lang === "tr" ? "Captcha skoru" : "Captcha score"}</span>
                        <strong>98/100</strong>
                      </div>
                      <div className="captcha-meta">
                        <span>{lang === "tr" ? "Risk sinyali" : "Risk signal"}</span>
                        <strong>{lang === "tr" ? "DÃ¼ÅŸÃ¼k" : "Low"}</strong>
                      </div>
                    </div>
                  </div>
                  <div className="captcha-points">
                    {(lang === "tr"
                      ? [
                          ["DavranÄ±ÅŸ Analizi", "TÄ±klama ritmi, gÃ¶rev sÃ¼resi ve cihaz paterni birlikte izlenir."],
                          ["Cihaz Ä°mzasÄ±", "ÅÃ¼pheli tekrarlar fingerprint ve oturum verisiyle filtrelenir."],
                          ["Claim KorumasÄ±", "Airdrop talebi Ã¶ncesi ek doÄŸrulama katmanÄ± devreye girer."],
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
                    <strong>{lang === "tr" ? "Risk Skorlama ÅemasÄ±" : "Risk Scoring Scheme"}</strong>
                    <p>
                      {lang === "tr"
                        ? "HesaplarÄ±n uygunluÄŸu tek sinyal yerine Ã§oklu gÃ¼ven gÃ¶stergesiyle Ã¶lÃ§Ã¼lÃ¼r."
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
                          ? "Otomasyon, tekrar ve spam davranÄ±ÅŸÄ± temizlenir."
                          : "Automation, repetition and spam behavior are removed.",
                    },
                    {
                      icon: <Wallet size={18} strokeWidth={2.1} />,
                      title: lang === "tr" ? "CÃ¼zdan GÃ¼veni" : "Wallet Trust",
                      text:
                        lang === "tr"
                          ? "Wallet geÃ§miÅŸi ve claim hazÄ±rlÄ±ÄŸÄ± deÄŸerlendirilir."
                          : "Wallet history and claim readiness are evaluated.",
                    },
                    {
                      icon: <Store size={18} strokeWidth={2.1} />,
                      title: lang === "tr" ? "KullanÄ±m Kalitesi" : "Usage Quality",
                      text:
                        lang === "tr"
                          ? "GÃ¶rev, merchant ve topluluk davranÄ±ÅŸÄ± birlikte puanlanÄ±r."
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
                alt={lang === "tr" ? "ADN geniÅŸ kampanya gÃ¶rseli" : "ADN wide campaign visual"}
              />
              <div className="visual-accent-overlay">
                <span>{lang === "tr" ? "Pazar ve Marka Etkisi" : "Market and Brand Impact"}</span>
                <strong>{lang === "tr" ? "DeÄŸer anlatÄ±mÄ±nÄ± gÃ¼Ã§lendiren premium gÃ¶rsel dil" : "A premium visual language that strengthens value storytelling"}</strong>
              </div>
            </article>

            <article className="visual-accent-card visual-accent-tall">
              <img
                src={campaignVisualThree}
                alt={lang === "tr" ? "ADN dikey kampanya gÃ¶rseli" : "ADN vertical campaign visual"}
              />
              <div className="visual-accent-overlay">
                <span>{lang === "tr" ? "Sosyal TanÄ±tÄ±m" : "Social Promotion"}</span>
                <strong>{lang === "tr" ? "Topluluk tarafÄ±nda daha enerjik gÃ¶rÃ¼nÃ¼m" : "A more energetic look for community-facing promotion"}</strong>
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
                  {lang === "tr" ? "Erken KatÄ±lÄ±m" : "Early Access"}
                </span>
                <h3>{lang === "tr" ? "Airdropa KatÄ±l" : "Join the Airdrop"}</h3>
                <p>
                  {lang === "tr"
                    ? "CÃ¼zdanÄ±nÄ± hazÄ±rla, gÃ¶rev geÃ§miÅŸini gÃ¼Ã§lendir ve resmi uygunluk duyurularÄ± aÃ§Ä±ldÄ±ÄŸÄ±nda ilk dalgada yer al."
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
                  {lang === "tr" ? "Botta KatÄ±lÄ±mÄ± BaÅŸlat" : "Start in Telegram Bot"}
                </a>
                <a href="#tap-to-earn" className="cta-btn primary">
                  {lang === "tr" ? "GÃ¶rev AkÄ±ÅŸÄ±nÄ± Ä°ncele" : "Explore Mission Flow"}
                </a>
                <a href="#overview" className="cta-btn secondary">
                  {lang === "tr" ? "CÃ¼zdanÄ±nÄ± HazÄ±rla" : "Prepare Your Wallet"}
                </a>
              </div>
            </div>
            <div className="join-flow-band reveal-on-scroll">
              {[
                {
                  icon: <Zap size={18} strokeWidth={2.2} />,
                  title: lang === "tr" ? "1. GÃ¶revleri Tamamla" : "1. Complete Missions",
                },
                {
                  icon: <ShieldCheck size={18} strokeWidth={2.2} />,
                  title: lang === "tr" ? "2. Captcha ve Hesap DoÄŸrula" : "2. Verify Captcha and Account",
                },
                {
                  icon: <Wallet size={18} strokeWidth={2.2} />,
                  title: lang === "tr" ? "3. Wallet HazÄ±rla" : "3. Prepare Wallet",
                },
                {
                  icon: <Gift size={18} strokeWidth={2.2} />,
                  title: lang === "tr" ? "4. Claim DalgasÄ±na KatÄ±l" : "4. Join the Claim Wave",
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
                    ["Aktif KullanÄ±m", "DÃ¼zenli giriÅŸ, gÃ¶rev tamamlama ve seviye ilerlemesi."],
                    ["Temiz Hesap", "Bot, spam ve Ã§oklu hesap filtresinden geÃ§en profiller."],
                    ["CÃ¼zdan DoÄŸrulamasÄ±", "Talep sÃ¼recine uygun gÃ¼venilir wallet baÄŸlantÄ±sÄ±."],
                    ["Topluluk KatkÄ±sÄ±", "Referans kalitesi, sadakat ve kampanya uyumu."],
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

          <section id="faq" className="doc-section trust-framework reveal-on-scroll">
            <SectionBadge id="faq" label={t.trustFeaturesTitle} />
            <h2>{t.trustFeaturesTitle}</h2>
            <p>{t.trustFeaturesText}</p>
            <div className="trust-matrix">
              {t.trustFeatures.map(([title, text], index) => (
                <article
                  className="trust-feature-card reveal-on-scroll"
                  key={title}
                  style={{ ["--delay" as string]: `${index * 55}ms` }}
                >
                  <span className="trust-feature-number">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="doc-section faq-section reveal-on-scroll">
            <SectionBadge id="faq" label={t.faqSection.kicker} />
            <h2>{t.faqSection.title}</h2>
            <div className="faq-list">
              {t.faqSection.items.map(([question, answer], index) => (
                <article
                  className="faq-item reveal-on-scroll"
                  key={question}
                  style={{ ["--delay" as string]: `${index * 60}ms` }}
                >
                  <h3>{question}</h3>
                  <p>{answer}</p>
                </article>
              ))}
            </div>
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
            <div className="cta-mascot-wrap">
              <img
                src={adnLionMascot}
                alt={lang === "tr" ? "ADN topluluk maskotu" : "ADN community mascot"}
                className="cta-mascot"
              />
            </div>
          </section>

          <section id="legal" className="legal-panel reveal-on-scroll">
            <div className="legal-card">
              <SectionBadge id="legal" label={t.legalSection.kicker} />
              <h2>{t.legalSection.title}</h2>
              <div className="legal-grid">
                <article className="legal-copy-block">
                  <h3>{t.legalSection.disclaimerTitle}</h3>
                  <p>{t.legalSection.disclaimerText}</p>
                </article>
                <article className="legal-copy-block">
                  <h3>{t.legalSection.privacyTitle}</h3>
                  <p>{t.legalSection.privacyText}</p>
                </article>
              </div>
              <div className="legal-bottom-line">{t.legalSection.copyright}</div>
            </div>
          </section>

          <section className="footer-note reveal-on-scroll">
            <img src={adnTokenWordmark} alt="ADN Token" className="footer-wordmark" />
            <strong>{t.releaseTitle}</strong>
            <p>{t.releaseText}</p>
          </section>
        </main>
      </div>
    </div>
  );
}

