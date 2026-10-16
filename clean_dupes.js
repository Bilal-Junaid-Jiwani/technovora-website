const fs = require('fs');

let lines = fs.readFileSync('components/layout/I18nProvider.tsx', 'utf-8').split('\n');

const newLines = [];
let currentLang = null;
let seenKeys = new Set();
let duplicatesRemoved = 0;

for (let i = lines.length - 1; i >= 0; i--) {
  const line = lines[i];
  
  const langMatch = line.match(/^\s*(?:"?([a-zA-Z0-9_-]+)"?):\s*\{\s*$/);
  if (langMatch) {
    currentLang = null;
    seenKeys.clear();
    newLines.unshift(line);
    continue;
  }
  
  if (line.match(/^\s*\},?\s*$/)) {
    // End of a lang block
    seenKeys.clear();
    newLines.unshift(line);
    continue;
  }

  const keyMatch = line.match(/^\s*"([^"]+)"\s*:/);
  if (keyMatch) {
    const key = keyMatch[1];
    if (seenKeys.has(key)) {
      duplicatesRemoved++;
      // Skip this line because we already saw it (we are going backwards, so we keep the LAST occurrence)
      continue;
    } else {
      seenKeys.add(key);
      newLines.unshift(line);
    }
  } else {
    newLines.unshift(line);
  }
}

fs.writeFileSync('components/layout/I18nProvider.tsx', newLines.join('\n'), 'utf-8');
console.log('Duplicates removed:', duplicatesRemoved);
