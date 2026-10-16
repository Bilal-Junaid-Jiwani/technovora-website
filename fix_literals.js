const fs = require('fs');

let c = fs.readFileSync('components/sections/WorkIndex.tsx', 'utf-8');
c = c.replace(/\{t\(work\.proj\.\.name\) \|\| work\.name\}/g, '{t(`work.proj.${i + 1}.name`) || work.name}');
c = c.replace(/\{t\(work\.proj\.\.type\) \|\| work\.type\}/g, '{t(`work.proj.${i + 1}.type`) || work.type}');
fs.writeFileSync('components/sections/WorkIndex.tsx', c);

let f = fs.readFileSync('components/sections/FeaturedBlog.tsx', 'utf-8');
f = f.replace(/\{t\(home\.blog\.\.title\) \|\| post\.title\}/g, '{t(`home.blog.${i + 1}.title`) || post.title}');
f = f.replace(/\{t\(home\.blog\.\.category\) \|\| post\.category\}/g, '{t(`home.blog.${i + 1}.category`) || post.category}');
f = f.replace(/\{t\(home\.blog\.\.desc\) \|\| post\.description\}/g, '{t(`home.blog.${i + 1}.desc`) || post.description}');
fs.writeFileSync('components/sections/FeaturedBlog.tsx', f);

let p = fs.readFileSync('components/sections/ProcessSnake.tsx', 'utf-8');
p = p.replace(/\{t\(process\.step\.\.title\) \|\| step\.title\}/g, '{t(`process.step.${i + 1}.title`) || step.title}');
p = p.replace(/\{t\(process\.step\.\.desc\) \|\| step\.description\}/g, '{t(`process.step.${i + 1}.desc`) || step.description}');
p = p.replace(/\{t\(process\.step\.\.day\) \|\| step\.tag\}/g, '{t(`process.step.${i + 1}.day`) || step.tag}');
p = p.replace(/\{t\(process\.step\.NaN\.title\) \|\| STEPS\[activeStep\]\.title\}/g, '{t(`process.step.${activeStep + 1}.title`) || STEPS[activeStep].title}');
fs.writeFileSync('components/sections/ProcessSnake.tsx', p);
