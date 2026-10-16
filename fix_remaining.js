const fs = require('fs');

// --- FeaturedPackage.tsx ---
let fp = fs.readFileSync('components/sections/FeaturedPackage.tsx', 'utf-8');

// Add "use client" and import
fp = `"use client";\n` + fp.replace('import Link from "next/link";', 'import Link from "next/link";\nimport { useI18n } from "@/components/layout/I18nProvider";');

// Add const { t } = useI18n(); inside the component
fp = fp.replace('export function FeaturedPackage() {\n  return (', 'export function FeaturedPackage() {\n  const { t } = useI18n();\n  return (');

// Replace hardcoded strings
fp = fp.replace('>Most Popular<', '>{t("pkg.popular") || "Most Popular"}<');
fp = fp.replace('>AI Automation{', '>{t("pkg.ai_automation") || "AI Automation"}{');
fp = fp.replace('>Sprint Package<', '>{t("pkg.sprint") || "Sprint Package"}<');
fp = fp.replace('>Highest demand. Fastest ROI. Your most painful manual process — automated and shipped in 3 weeks.<', '>{t("pkg.desc") || "Highest demand. Fastest ROI. Your most painful manual process — automated and shipped in 3 weeks."}<');
fp = fp.replace(`>What's included<`, '>{t("pkg.included") || "What\'s included"}<');
fp = fp.replace('>Starting from<', '>{t("pkg.starting") || "Starting from"}<');
fp = fp.replace('>50% upfront · 50% on delivery<', '>{t("pkg.terms") || "50% upfront · 50% on delivery"}<');
fp = fp.replace('>Book a Discovery Call<', '>{t("pkg.book_call") || "Book a Discovery Call"}<');
fp = fp.replace('>See All Packages<', '>{t("pkg.see_all") || "See All Packages"}<');
fp = fp.replace('>No retainer required. Cancel after delivery.<', '>{t("pkg.no_retainer") || "No retainer required. Cancel after delivery."}<');

fs.writeFileSync('components/sections/FeaturedPackage.tsx', fp);
console.log('Fixed FeaturedPackage.tsx');

// --- GlobeSection.tsx ---
let gs = fs.readFileSync('components/sections/GlobeSection.tsx', 'utf-8');

// Add import
gs = gs.replace('import { FadeIn }', 'import { useI18n } from "@/components/layout/I18nProvider";\nimport { FadeIn }');

// Add const { t } = useI18n(); inside the component
gs = gs.replace('export function GlobeSection() {\n  return (', 'export function GlobeSection() {\n  const { t } = useI18n();\n  return (');

// Replace hardcoded strings
gs = gs.replace('>Where We Are<', '>{t("globe.where") || "Where We Are"}<');
gs = gs.replace('>Two offices.{', '>{t("globe.two_offices") || "Two offices."}{');
gs = gs.replace('>One team.<', '>{t("globe.one_team") || "One team."}<');
gs = gs.replace('>US-incorporated in Wyoming. Engineering in Hong Kong. Clients across North America, Europe, and Southeast Asia.<', '>{t("globe.desc") || "US-incorporated in Wyoming. Engineering in Hong Kong. Clients across North America, Europe, and Southeast Asia."}<');

fs.writeFileSync('components/sections/GlobeSection.tsx', gs);
console.log('Fixed GlobeSection.tsx');

// --- Add translations to I18nProvider ---
const newKeys = {
  en: {
    "pkg.popular": "Most Popular",
    "pkg.ai_automation": "AI Automation",
    "pkg.sprint": "Sprint Package",
    "pkg.desc": "Highest demand. Fastest ROI. Your most painful manual process — automated and shipped in 3 weeks.",
    "pkg.included": "What's included",
    "pkg.starting": "Starting from",
    "pkg.terms": "50% upfront · 50% on delivery",
    "pkg.book_call": "Book a Discovery Call",
    "pkg.see_all": "See All Packages",
    "pkg.no_retainer": "No retainer required. Cancel after delivery.",
    "globe.where": "Where We Are",
    "globe.two_offices": "Two offices.",
    "globe.one_team": "One team.",
    "globe.desc": "US-incorporated in Wyoming. Engineering in Hong Kong. Clients across North America, Europe, and Southeast Asia.",
  },
  "zh-CN": {
    "pkg.popular": "最受欢迎",
    "pkg.ai_automation": "AI 自动化",
    "pkg.sprint": "冲刺套餐",
    "pkg.desc": "需求最高。ROI最快。您最痛苦的手动流程 — 在3周内自动化并上线。",
    "pkg.included": "包含内容",
    "pkg.starting": "起步价",
    "pkg.terms": "50% 预付 · 50% 交付",
    "pkg.book_call": "预约发现电话",
    "pkg.see_all": "查看所有套餐",
    "pkg.no_retainer": "无需预付费。交付后可取消。",
    "globe.where": "我们在哪里",
    "globe.two_offices": "两个办公室。",
    "globe.one_team": "一个团队。",
    "globe.desc": "在怀俄明州注册。工程团队在香港。客户遍及北美、欧洲和东南亚。",
  },
  ja: {
    "pkg.popular": "最も人気",
    "pkg.ai_automation": "AI 自動化",
    "pkg.sprint": "スプリントパッケージ",
    "pkg.desc": "最高の需要。最速のROI。最も苦痛な手動プロセスを3週間で自動化して本番環境にデプロイ。",
    "pkg.included": "含まれるもの",
    "pkg.starting": "開始価格",
    "pkg.terms": "50% 前払い · 50% 納品時",
    "pkg.book_call": "ディスカバリーコールを予約",
    "pkg.see_all": "全パッケージを見る",
    "pkg.no_retainer": "リテイナー不要。納品後にキャンセル可能。",
    "globe.where": "拠点",
    "globe.two_offices": "2つのオフィス。",
    "globe.one_team": "1つのチーム。",
    "globe.desc": "ワイオミング州で法人登記。エンジニアリングは香港。クライアントは北米、ヨーロッパ、東南アジアに展開。",
  },
  de: {
    "pkg.popular": "Am beliebtesten",
    "pkg.ai_automation": "KI-Automatisierung",
    "pkg.sprint": "Sprint-Paket",
    "pkg.desc": "Höchste Nachfrage. Schnellster ROI. Ihr schmerzhaftester manueller Prozess — automatisiert und in 3 Wochen live.",
    "pkg.included": "Was enthalten ist",
    "pkg.starting": "Ab",
    "pkg.terms": "50% im Voraus · 50% bei Lieferung",
    "pkg.book_call": "Discovery-Anruf buchen",
    "pkg.see_all": "Alle Pakete ansehen",
    "pkg.no_retainer": "Kein Retainer erforderlich. Nach Lieferung kündbar.",
    "globe.where": "Wo wir sind",
    "globe.two_offices": "Zwei Büros.",
    "globe.one_team": "Ein Team.",
    "globe.desc": "In Wyoming eingetragen. Engineering in Hongkong. Kunden in Nordamerika, Europa und Südostasien.",
  },
  nl: {
    "pkg.popular": "Meest populair",
    "pkg.ai_automation": "AI-automatisering",
    "pkg.sprint": "Sprint-pakket",
    "pkg.desc": "Hoogste vraag. Snelste ROI. Uw pijnlijkste handmatige proces — geautomatiseerd en live in 3 weken.",
    "pkg.included": "Wat inbegrepen is",
    "pkg.starting": "Vanaf",
    "pkg.terms": "50% vooraf · 50% bij oplevering",
    "pkg.book_call": "Ontdekkingsgesprek boeken",
    "pkg.see_all": "Alle pakketten bekijken",
    "pkg.no_retainer": "Geen retainer vereist. Na oplevering opzegbaar.",
    "globe.where": "Waar we zijn",
    "globe.two_offices": "Twee kantoren.",
    "globe.one_team": "Eén team.",
    "globe.desc": "Gevestigd in Wyoming. Engineering in Hong Kong. Klanten in Noord-Amerika, Europa en Zuidoost-Azië.",
  },
};

let provider = fs.readFileSync('components/layout/I18nProvider.tsx', 'utf-8');

for (const [lang, keys] of Object.entries(newKeys)) {
  const injection = Object.entries(keys)
    .map(([k, v]) => `    "${k}": ${JSON.stringify(v)},`)
    .join('\n');
  
  // Find the closing of each lang block and inject before it
  const pattern = lang === 'zh-CN' 
    ? /"zh-CN":\s*\{/ 
    : new RegExp(`${lang}:\\s*\\{`);
  
  const match = provider.match(pattern);
  if (match) {
    const startIdx = provider.indexOf(match[0]);
    // Find the first closing brace-comma after the opening
    const blockStart = provider.indexOf('{', startIdx);
    // Find where to inject - look for the closing `},` of this block
    let braceCount = 0;
    let insertPos = -1;
    for (let j = blockStart; j < provider.length; j++) {
      if (provider[j] === '{') braceCount++;
      if (provider[j] === '}') {
        braceCount--;
        if (braceCount === 0) {
          insertPos = j;
          break;
        }
      }
    }
    if (insertPos > 0) {
      provider = provider.slice(0, insertPos) + '\n' + injection + '\n  ' + provider.slice(insertPos);
    }
  }
}

fs.writeFileSync('components/layout/I18nProvider.tsx', provider);
console.log('Injected new translations');
