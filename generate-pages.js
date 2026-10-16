const fs = require('fs');
const path = require('path');

const pagesDir = 'd:/new technovora/technovora-website/app';

const pagesConfig = {
  'about': [
    'HeroSection', 'StatsCounter', 'GlobeSection', 'Testimonials', 'Industries', 'TechWall', 'FeaturedBlog', 'CtaBanner'
  ],
  'services': [
    'HeroSection', 'ServiceCards', 'ProblemStatement', 'ProcessSnake', 'Testimonials', 'TechWall', 'WorkIndex', 'FAQ'
  ],
  'packages': [
    'HeroSection', 'FeaturedPackage', 'ServiceCards', 'Testimonials', 'FAQ', 'TechWall', 'CtaBanner', 'ContactSection'
  ],
  'portfolio': [
    'HeroSection', 'WorkIndex', 'KineticMarquee', 'Testimonials', 'Industries', 'FeaturedBlog', 'CtaBanner', 'ContactSection'
  ],
  'contact-us': [
    'HeroSection', 'ContactSection', 'FAQ', 'Testimonials', 'TrustedBy', 'TechWall', 'FeaturedBlog', 'CtaBanner'
  ],
  'blog': [
    'HeroSection', 'FeaturedBlog', 'KineticMarquee', 'ProblemStatement', 'ProcessSnake', 'Testimonials', 'FAQ', 'CtaBanner'
  ]
};

Object.entries(pagesConfig).forEach(([page, sections]) => {
  const pagePath = path.join(pagesDir, page, 'page.tsx');
  fs.mkdirSync(path.join(pagesDir, page), { recursive: true });

  const imports = sections.map(s => `import { ${s} } from "@/components/sections/${s}";`).join('\n');
  const components = sections.map(s => `      <${s} />`).join('\n');

  const content = `import { PageTransitionWrapper } from "@/components/layout/PageTransitionWrapper";
${imports}

export default function ${page.charAt(0).toUpperCase() + page.slice(1).replace('-', '')}Page() {
  return (
    <PageTransitionWrapper>
${components}
    </PageTransitionWrapper>
  );
}
`;
  fs.writeFileSync(pagePath, content);
});

console.log('Pages generated correctly with 8 sections each.');
