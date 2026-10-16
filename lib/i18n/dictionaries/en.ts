// en dictionary — loaded on demand, not in the initial bundle.

import { blog } from "@/lib/i18n/en/blog";
import { chrome } from "@/lib/i18n/en/chrome";
import { contact } from "@/lib/i18n/en/contact";
import { home } from "@/lib/i18n/en/home";
import { legal } from "@/lib/i18n/en/legal";
import { packages } from "@/lib/i18n/en/packages";
import { portfolio } from "@/lib/i18n/en/portfolio";
import { services } from "@/lib/i18n/en/services";
import { services2 } from "@/lib/i18n/en/services2";
import { servicesindex } from "@/lib/i18n/en/servicesindex";

const en: Record<string, string> = {
    ...blog,
    ...chrome,
    ...contact,
    ...home,
    ...legal,
    ...packages,
    ...portfolio,
    ...services,
    ...services2.cloud,
    ...services2.design,
    ...services2.smm,
    ...servicesindex,
};

export default en;
