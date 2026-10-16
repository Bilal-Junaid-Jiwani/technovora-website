const fs = require('fs');

// Service tab keys that match the actual lookup pattern in ServiceCards.tsx line 89
const serviceTabKeys = {
  en: {
    "services.ai-automation": "AI Agents & Automation",
    "services.web-development": "Web Development",
    "services.mobile-apps": "Mobile Apps",
    "services.cloud-devops": "Cloud & DevOps",
    "services.design": "Design & UI/UX",
    "services.smm": "SMM & Growth",
  },
  "zh-CN": {
    "services.ai-automation": "AI 智能体与自动化",
    "services.web-development": "Web 开发",
    "services.mobile-apps": "移动应用",
    "services.cloud-devops": "云与 DevOps",
    "services.design": "设计与 UI/UX",
    "services.smm": "SMM 与增长",
  },
  ja: {
    "services.ai-automation": "AI エージェントと自動化",
    "services.web-development": "Web 開発",
    "services.mobile-apps": "モバイルアプリ",
    "services.cloud-devops": "クラウドと DevOps",
    "services.design": "デザインと UI/UX",
    "services.smm": "SMM と成長",
  },
  de: {
    "services.ai-automation": "KI-Agenten & Automatisierung",
    "services.web-development": "Webentwicklung",
    "services.mobile-apps": "Mobile Apps",
    "services.cloud-devops": "Cloud & DevOps",
    "services.design": "Design & UI/UX",
    "services.smm": "SMM & Wachstum",
  },
  nl: {
    "services.ai-automation": "AI-agenten & Automatisering",
    "services.web-development": "Webontwikkeling",
    "services.mobile-apps": "Mobiele apps",
    "services.cloud-devops": "Cloud & DevOps",
    "services.design": "Ontwerp & UI/UX",
    "services.smm": "SMM & Groei",
  },
};

let provider = fs.readFileSync('components/layout/I18nProvider.tsx', 'utf-8');

for (const [lang, keys] of Object.entries(serviceTabKeys)) {
  const injection = Object.entries(keys)
    .map(([k, v]) => `    "${k}": ${JSON.stringify(v)},`)
    .join('\n');
  
  const pattern = lang === 'zh-CN' 
    ? /"zh-CN":\s*\{/ 
    : new RegExp(`  ${lang}:\\s*\\{`);
  
  const match = provider.match(pattern);
  if (match) {
    const startIdx = provider.indexOf(match[0]);
    const blockStart = provider.indexOf('{', startIdx);
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
console.log('Injected service tab translations');
