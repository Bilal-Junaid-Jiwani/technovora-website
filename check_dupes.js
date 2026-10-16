const fs = require('fs');
const content = fs.readFileSync('components/layout/I18nProvider.tsx', 'utf-8');
const matches = content.match(/"zh-CN":\s*\{/g);
console.log('zh-CN blocks:', matches ? matches.length : 0);
