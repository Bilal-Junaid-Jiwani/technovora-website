const fs = require('fs');

let fp = fs.readFileSync('components/sections/FeaturedPackage.tsx', 'utf-8');

// 1. Add "use client" at top and import
fp = '"use client";\r\nimport { useI18n } from "@/components/layout/I18nProvider";\r\n' + fp;

// 2. Add const { t } = useI18n(); inside component
fp = fp.replace(
  'export function FeaturedPackage() {\r\n  return (',
  'export function FeaturedPackage() {\r\n  const { t } = useI18n();\r\n  return ('
);

// 3. Replace hardcoded text
fp = fp.replace(
  />\s*Most Popular\s*<\/p>/,
  '>{t("pkg.popular") || "Most Popular"}</p>'
);
fp = fp.replace(
  />AI Automation\{" "\}/,
  '>{t("pkg.ai_automation") || "AI Automation"}{" "}'
);
fp = fp.replace(
  /<span className="gradient-text">Sprint Package<\/span>/,
  '<span className="gradient-text">{t("pkg.sprint") || "Sprint Package"}</span>'
);
fp = fp.replace(
  />Highest demand\. Fastest ROI\. Your most painful manual process — automated and shipped in 3 weeks\.</,
  '>{t("pkg.desc") || "Highest demand. Fastest ROI. Your most painful manual process — automated and shipped in 3 weeks."}<'
);
fp = fp.replace(
  />What's included</,
  '>{t("pkg.included") || "What\'s included"}<'
);
fp = fp.replace(
  />\s*Starting from\s*<\/div>/,
  '>{t("pkg.starting") || "Starting from"}</div>'
);
fp = fp.replace(
  />50% upfront · 50% on delivery</,
  '>{t("pkg.terms") || "50% upfront · 50% on delivery"}<'
);
fp = fp.replace(
  />Book a Discovery Call</,
  '>{t("pkg.book_call") || "Book a Discovery Call"}<'
);
fp = fp.replace(
  />See All Packages</,
  '>{t("pkg.see_all") || "See All Packages"}<'
);
fp = fp.replace(
  />No retainer required\. Cancel after delivery\.</,
  '>{t("pkg.no_retainer") || "No retainer required. Cancel after delivery."}<'
);

fs.writeFileSync('components/sections/FeaturedPackage.tsx', fp);
console.log('Fixed FeaturedPackage.tsx');
