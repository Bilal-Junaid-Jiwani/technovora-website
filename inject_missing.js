const fs = require('fs');

const missingTranslations = {
  "en": {
    "nav.about": "About", "nav.services": "Services", "nav.packages": "Packages", "nav.portfolio": "Portfolio", "nav.contact us": "Contact Us", "nav.blog": "Blog",
    "announcement.booking": "Now booking Q3 2026 projects", "announcement.book_call": "Book a call",
    "globe.ai.title": "Protonic Engineering AI", "globe.ai.subtitle": "Singapore",
    "globe.3d.title": "Medmarks 3D 5D [...]", "globe.3d.subtitle": "Indonesia",
    "globe.stripe.title": "Stripe Global Connect", "globe.stripe.subtitle": "USA",
    "services.tab.ai": "AI Agents & Automation", "services.tab.web": "Web Development", "services.tab.mobile": "Mobile Apps", "services.tab.cloud": "Cloud & DevOps", "services.tab.design": "Design & UI/UX", "services.tab.smm": "SMM & Growth",
    "services.agents.team_title": "Team Agents", "services.agents.search_placeholder": "Search agents...",
    "services.agent.1.name": "Workflow Architect", "services.agent.1.role": "n8n Specialist",
    "services.agent.2.name": "Data Organizer", "services.agent.2.role": "Data Pipeline",
    "services.agent.3.name": "Support Agent", "services.agent.3.role": "Claude Integration",
    "process.step.1.title": "Discovery Call", "process.step.1.desc": "30-minute call. We audit your biggest process bottleneck live — you walk away with a clear diagnosis whether we work together or not.", "process.step.1.day": "Day 0",
    "process.step.2.title": "Architecture & Scope", "process.step.2.desc": "Written gap analysis + recommended approach", "process.step.2.day": "Week 1",
    "process.step.3.title": "Build & Iterate", "process.step.3.desc": "Agile sprints", "process.step.3.day": "Week 2-4",
    "process.step.4.title": "Deploy & Handover", "process.step.4.desc": "Seamless release", "process.step.4.day": "Week 5",
    "process.step.5.title": "Support & Scale", "process.step.5.desc": "Ongoing maintenance", "process.step.5.day": "Ongoing",
    "work.proj.1.name": "Fintech Dashboard", "work.proj.1.type": "Web App",
    "work.proj.2.name": "AI Content Generator", "work.proj.2.type": "SaaS",
    "work.proj.3.name": "Logistics Platform", "work.proj.3.type": "Enterprise App",
    "work.proj.4.name": "Telehealth Portal", "work.proj.4.type": "Healthcare App",
    "home.blog.1.title": "The Future of Next.js Architecture", "home.blog.1.category": "Engineering", "home.blog.1.desc": "How we scale our application using the latest App Router patterns and Turbopack.",
    "home.blog.2.title": "Mastering Tailwind CSS Gradients", "home.blog.2.category": "Design", "home.blog.2.desc": "A deep dive into creating mesmerizing mesh gradients with standard Tailwind utilities.",
    "home.blog.3.title": "Deploying at the Edge with Vercel", "home.blog.3.category": "Infrastructure", "home.blog.3.desc": "Reducing latency and increasing performance by pushing compute to the edge."
  },
  "zh-CN": {
    "nav.about": "关于我们", "nav.services": "服务", "nav.packages": "套餐", "nav.portfolio": "作品集", "nav.contact us": "联系我们", "nav.blog": "博客",
    "announcement.booking": "现已开放 2026 年第三季度项目预订", "announcement.book_call": "预约电话",
    "globe.ai.title": "Protonic Engineering AI", "globe.ai.subtitle": "新加坡",
    "globe.3d.title": "Medmarks 3D 5D [...]", "globe.3d.subtitle": "印度尼西亚",
    "globe.stripe.title": "Stripe Global Connect", "globe.stripe.subtitle": "美国",
    "services.tab.ai": "AI 智能体与自动化", "services.tab.web": "Web 开发", "services.tab.mobile": "移动应用", "services.tab.cloud": "云与 DevOps", "services.tab.design": "设计与 UI/UX", "services.tab.smm": "SMM 与增长",
    "services.agents.team_title": "团队智能体", "services.agents.search_placeholder": "搜索智能体...",
    "services.agent.1.name": "工作流架构师", "services.agent.1.role": "n8n 专家",
    "services.agent.2.name": "数据组织者", "services.agent.2.role": "数据管道",
    "services.agent.3.name": "支持智能体", "services.agent.3.role": "Claude 集成",
    "process.step.1.title": "发现电话", "process.step.1.desc": "30分钟的电话。我们将现场审计您最大的流程瓶颈 — 无论我们是否合作，您都会得到清晰的诊断。", "process.step.1.day": "第 0 天",
    "process.step.2.title": "架构与范围", "process.step.2.desc": "书面差距分析 + 推荐方案", "process.step.2.day": "第 1 周",
    "process.step.3.title": "构建与迭代", "process.step.3.desc": "敏捷冲刺", "process.step.3.day": "第 2-4 周",
    "process.step.4.title": "部署与移交", "process.step.4.desc": "无缝发布", "process.step.4.day": "第 5 周",
    "process.step.5.title": "支持与扩展", "process.step.5.desc": "持续维护", "process.step.5.day": "持续进行",
    "work.proj.1.name": "金融科技仪表板", "work.proj.1.type": "Web 应用",
    "work.proj.2.name": "AI 内容生成器", "work.proj.2.type": "SaaS",
    "work.proj.3.name": "物流平台", "work.proj.3.type": "企业应用",
    "work.proj.4.name": "医疗健康门户", "work.proj.4.type": "医疗应用",
    "home.blog.1.title": "Next.js 架构的未来", "home.blog.1.category": "工程", "home.blog.1.desc": "我们如何使用最新的 App Router 模式和 Turbopack 扩展应用程序。",
    "home.blog.2.title": "精通 Tailwind CSS 渐变", "home.blog.2.category": "设计", "home.blog.2.desc": "深入探讨使用标准 Tailwind 实用工具创建迷人的网格渐变。",
    "home.blog.3.title": "使用 Vercel 在边缘部署", "home.blog.3.category": "基础设施", "home.blog.3.desc": "通过将计算推向边缘来减少延迟并提高性能。"
  },
  "ja": {
    "nav.about": "会社概要", "nav.services": "サービス", "nav.packages": "パッケージ", "nav.portfolio": "ポートフォリオ", "nav.contact us": "お問い合わせ", "nav.blog": "ブログ",
    "announcement.booking": "2026年第3四半期のプロジェクト予約受付中", "announcement.book_call": "通話を予約",
    "globe.ai.title": "Protonic Engineering AI", "globe.ai.subtitle": "シンガポール",
    "globe.3d.title": "Medmarks 3D 5D [...]", "globe.3d.subtitle": "インドネシア",
    "globe.stripe.title": "Stripe Global Connect", "globe.stripe.subtitle": "アメリカ",
    "services.tab.ai": "AI エージェントと自動化", "services.tab.web": "Web 開発", "services.tab.mobile": "モバイルアプリ", "services.tab.cloud": "クラウドと DevOps", "services.tab.design": "デザインと UI/UX", "services.tab.smm": "SMM と成長",
    "services.agents.team_title": "チームエージェント", "services.agents.search_placeholder": "エージェントを検索...",
    "services.agent.1.name": "ワークフローアーキテクト", "services.agent.1.role": "n8n スペシャリスト",
    "services.agent.2.name": "データオーガナイザー", "services.agent.2.role": "データパイプライン",
    "services.agent.3.name": "サポートエージェント", "services.agent.3.role": "Claude 統合",
    "process.step.1.title": "ディスカバリーコール", "process.step.1.desc": "30分の通話。プロセスの最大のボトルネックをライブで監査します。協力するかどうかに関わらず、明確な診断を得られます。", "process.step.1.day": "0日目",
    "process.step.2.title": "アーキテクチャとスコープ", "process.step.2.desc": "書面によるギャップ分析 + 推奨アプローチ", "process.step.2.day": "第1週",
    "process.step.3.title": "構築と反復", "process.step.3.desc": "アジャイルスプリント", "process.step.3.day": "第2-4週",
    "process.step.4.title": "展開と引き継ぎ", "process.step.4.desc": "シームレスなリリース", "process.step.4.day": "第5週",
    "process.step.5.title": "サポートと拡張", "process.step.5.desc": "継続的なメンテナンス", "process.step.5.day": "継続中",
    "work.proj.1.name": "Fintech ダッシュボード", "work.proj.1.type": "Web アプリ",
    "work.proj.2.name": "AI コンテンツジェネレーター", "work.proj.2.type": "SaaS",
    "work.proj.3.name": "物流プラットフォーム", "work.proj.3.type": "エンタープライズアプリ",
    "work.proj.4.name": "ヘルスケアポータル", "work.proj.4.type": "ヘルスケアアプリ",
    "home.blog.1.title": "Next.js アーキテクチャの未来", "home.blog.1.category": "エンジニアリング", "home.blog.1.desc": "最新の App Router パターンと Turbopack を使用してアプリケーションを拡張する方法。",
    "home.blog.2.title": "Tailwind CSS グラデーションの習得", "home.blog.2.category": "デザイン", "home.blog.2.desc": "標準の Tailwind ユーティリティを使用して魅惑的なメッシュグラデーションを作成するための詳細な解説。",
    "home.blog.3.title": "Vercel を使用したエッジでの展開", "home.blog.3.category": "インフラストラクチャ", "home.blog.3.desc": "コンピューティングをエッジに押し出すことで、遅延を減らし、パフォーマンスを向上させます。"
  },
  "de": {
    "nav.about": "Über uns", "nav.services": "Dienstleistungen", "nav.packages": "Pakete", "nav.portfolio": "Portfolio", "nav.contact us": "Kontakt", "nav.blog": "Blog",
    "announcement.booking": "Buchen Sie jetzt Projekte für Q3 2026", "announcement.book_call": "Anruf buchen",
    "globe.ai.title": "Protonic Engineering AI", "globe.ai.subtitle": "Singapur",
    "globe.3d.title": "Medmarks 3D 5D [...]", "globe.3d.subtitle": "Indonesien",
    "globe.stripe.title": "Stripe Global Connect", "globe.stripe.subtitle": "USA",
    "services.tab.ai": "KI-Agenten & Automatisierung", "services.tab.web": "Webentwicklung", "services.tab.mobile": "Mobile Apps", "services.tab.cloud": "Cloud & DevOps", "services.tab.design": "Design & UI/UX", "services.tab.smm": "SMM & Wachstum",
    "services.agents.team_title": "Team-Agenten", "services.agents.search_placeholder": "Agenten suchen...",
    "services.agent.1.name": "Workflow-Architekt", "services.agent.1.role": "n8n Spezialist",
    "services.agent.2.name": "Datenorganisator", "services.agent.2.role": "Datenpipeline",
    "services.agent.3.name": "Support-Agent", "services.agent.3.role": "Claude Integration",
    "process.step.1.title": "Entdeckungsanruf", "process.step.1.desc": "30-minütiger Anruf. Wir prüfen live Ihren größten Engpass – Sie erhalten eine klare Diagnose, ob wir zusammenarbeiten oder nicht.", "process.step.1.day": "Tag 0",
    "process.step.2.title": "Architektur & Umfang", "process.step.2.desc": "Schriftliche Lückenanalyse + empfohlener Ansatz", "process.step.2.day": "Woche 1",
    "process.step.3.title": "Bauen & Iterieren", "process.step.3.desc": "Agile Sprints", "process.step.3.day": "Woche 2-4",
    "process.step.4.title": "Bereitstellung & Übergabe", "process.step.4.desc": "Nahtlose Veröffentlichung", "process.step.4.day": "Woche 5",
    "process.step.5.title": "Support & Skalierung", "process.step.5.desc": "Laufende Wartung", "process.step.5.day": "Fortlaufend",
    "work.proj.1.name": "Fintech Dashboard", "work.proj.1.type": "Web App",
    "work.proj.2.name": "AI Content Generator", "work.proj.2.type": "SaaS",
    "work.proj.3.name": "Logistikplattform", "work.proj.3.type": "Enterprise App",
    "work.proj.4.name": "Gesundheitsportal", "work.proj.4.type": "Healthcare App",
    "home.blog.1.title": "Die Zukunft der Next.js-Architektur", "home.blog.1.category": "Engineering", "home.blog.1.desc": "Wie wir unsere Anwendung mit den neuesten App Router-Mustern und Turbopack skalieren.",
    "home.blog.2.title": "Tailwind CSS-Verläufe meistern", "home.blog.2.category": "Design", "home.blog.2.desc": "Ein tiefer Einblick in die Erstellung faszinierender Mesh-Verläufe mit Standard-Tailwind-Dienstprogrammen.",
    "home.blog.3.title": "Bereitstellung an der Edge mit Vercel", "home.blog.3.category": "Infrastruktur", "home.blog.3.desc": "Reduzierung der Latenz und Steigerung der Leistung durch Verlagerung der Rechenleistung an den Rand."
  },
  "nl": {
    "nav.about": "Over ons", "nav.services": "Diensten", "nav.packages": "Pakketten", "nav.portfolio": "Portfolio", "nav.contact us": "Contact", "nav.blog": "Blog",
    "announcement.booking": "Nu projecten voor Q3 2026 boeken", "announcement.book_call": "Plan een gesprek",
    "globe.ai.title": "Protonic Engineering AI", "globe.ai.subtitle": "Singapore",
    "globe.3d.title": "Medmarks 3D 5D [...]", "globe.3d.subtitle": "Indonesië",
    "globe.stripe.title": "Stripe Global Connect", "globe.stripe.subtitle": "VS",
    "services.tab.ai": "AI-agenten & Automatisering", "services.tab.web": "Webontwikkeling", "services.tab.mobile": "Mobiele apps", "services.tab.cloud": "Cloud & DevOps", "services.tab.design": "Ontwerp & UI/UX", "services.tab.smm": "SMM & Groei",
    "services.agents.team_title": "Teamagenten", "services.agents.search_placeholder": "Zoek agenten...",
    "services.agent.1.name": "Workflow-architect", "services.agent.1.role": "n8n Specialist",
    "services.agent.2.name": "Data-organisator", "services.agent.2.role": "Datapijplijn",
    "services.agent.3.name": "Support-agent", "services.agent.3.role": "Claude Integratie",
    "process.step.1.title": "Ontdekkingsgesprek", "process.step.1.desc": "Gesprek van 30 minuten. We auditen uw grootste procesknelpunt live — u vertrekt met een duidelijke diagnose of we wel of niet samenwerken.", "process.step.1.day": "Dag 0",
    "process.step.2.title": "Architectuur & Scope", "process.step.2.desc": "Schriftelijke gap-analyse + aanbevolen aanpak", "process.step.2.day": "Week 1",
    "process.step.3.title": "Bouwen & Itereren", "process.step.3.desc": "Agile sprints", "process.step.3.day": "Week 2-4",
    "process.step.4.title": "Implementatie & Overdracht", "process.step.4.desc": "Naadloze release", "process.step.4.day": "Week 5",
    "process.step.5.title": "Ondersteuning & Schaal", "process.step.5.desc": "Lopend onderhoud", "process.step.5.day": "Lopend",
    "work.proj.1.name": "Fintech Dashboard", "work.proj.1.type": "Web App",
    "work.proj.2.name": "AI Content Generator", "work.proj.2.type": "SaaS",
    "work.proj.3.name": "Logistiek platform", "work.proj.3.type": "Enterprise App",
    "work.proj.4.name": "Zorgportaal", "work.proj.4.type": "Healthcare App",
    "home.blog.1.title": "De toekomst van de Next.js-architectuur", "home.blog.1.category": "Engineering", "home.blog.1.desc": "Hoe we onze applicatie schalen met de nieuwste App Router-patronen en Turbopack.",
    "home.blog.2.title": "Tailwind CSS Gradiënten beheersen", "home.blog.2.category": "Ontwerp", "home.blog.2.desc": "Een diepe duik in het maken van betoverende mesh-gradiënten met standaard Tailwind-hulpprogramma's.",
    "home.blog.3.title": "Implementeren aan de Edge met Vercel", "home.blog.3.category": "Infrastructuur", "home.blog.3.desc": "Vertraging verminderen en prestaties verhogen door rekenkracht naar de rand te verplaatsen."
  }
};

let content = fs.readFileSync('components/layout/I18nProvider.tsx', 'utf-8');

const langs = ['en', 'zh-CN', 'ja', 'de', 'nl'];

for (const lang of langs) {
  const injection = Object.entries(missingTranslations[lang])
    .map(([k, v]) => `    "${k}": ${JSON.stringify(v)},`)
    .join('\n');
    
  // Find the end of the block.
  const searchPattern = new RegExp(`("${lang}"|${lang}): \\{[\\s\\S]*?(?=  },)`);
  
  content = content.replace(searchPattern, (match) => {
    return match + '\n' + injection + '\n';
  });
}

fs.writeFileSync('components/layout/I18nProvider.tsx', content, 'utf-8');
console.log('Successfully injected missing translations!');
