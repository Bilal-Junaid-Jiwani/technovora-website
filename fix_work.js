const fs = require('fs');
let c = fs.readFileSync('components/sections/WorkIndex.tsx', 'utf-8');
c = c.replace(/\{work.name\}/g, '{t(`work.proj.${index + 1}.name`) || work.name}');
c = c.replace(/\{work.type\}/g, '{t(`work.proj.${index + 1}.type`) || work.type}');
fs.writeFileSync('components/sections/WorkIndex.tsx', c);
