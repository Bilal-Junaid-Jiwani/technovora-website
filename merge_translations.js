const fs = require('fs');

async function main() {
  const translations = { 'zh-CN': {}, 'ja': {}, 'de': {}, 'nl': {} };

  for (let i = 1; i <= 4; i++) {
    try {
      const data = fs.readFileSync(`translations_tmp/${i}.json`, 'utf-8');
      const json = JSON.parse(data);
      for (const lang of Object.keys(translations)) {
        if (json[lang]) {
          Object.assign(translations[lang], json[lang]);
        }
      }
    } catch (e) {
      console.error(`Failed to read or parse translations_tmp/${i}.json`, e.message);
    }
  }

  let content = fs.readFileSync('components/layout/I18nProvider.tsx', 'utf-8');

  // We need to inject the keys into each block. 
  // It's safer to use regex replacement based on the start of the next block.

  const langs = ['zh-CN', 'ja', 'de', 'nl'];
  
  for (const lang of langs) {
    const injection = Object.entries(translations[lang])
      .map(([k, v]) => `    "${k}": ${JSON.stringify(v)},`)
      .join('\n');
      
    if (!injection) continue;
      
    // Find the end of the block. We can look for the next language key, or the end of the translations object.
    const searchPattern = new RegExp(`("${lang}"|${lang}): \\{[\\s\\S]*?(?=  },)`);
    
    content = content.replace(searchPattern, (match) => {
      return match + '\n' + injection + '\n';
    });
  }

  fs.writeFileSync('components/layout/I18nProvider.tsx', content, 'utf-8');
  console.log('Successfully injected translations!');
}

main();
