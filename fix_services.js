const fs = require('fs');
let c = fs.readFileSync('components/sections/ServiceCards.tsx', 'utf-8');
c = c.replace(/\{service.title\}/g, '{t(`services.tab.${service.id.split("-")[0]}`) || service.title}');
c = c.replace(/\{agent.name\}/g, '{activeTab === "ai-automation" ? (t(`services.agent.${i + 1}.name`) || agent.name) : agent.name}');
c = c.replace(/\{agent.role\}/g, '{activeTab === "ai-automation" ? (t(`services.agent.${i + 1}.role`) || agent.role) : agent.role}');
c = c.replace(/>Team Agents</g, '>{t("services.agents.team_title") || "Team Agents"}<');
c = c.replace(/placeholder="Search agents\.\.\."/g, 'placeholder={t("services.agents.search_placeholder") || "Search agents..."}');
fs.writeFileSync('components/sections/ServiceCards.tsx', c);
