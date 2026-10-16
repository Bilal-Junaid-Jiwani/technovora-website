import { buildMetadata } from "@/lib/metadata";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactMain } from "@/components/contact/ContactMain";
import { NeedsMatcher } from "@/components/contact/NeedsMatcher";
import { NextSteps } from "@/components/contact/NextSteps";
import { BookingBand } from "@/components/contact/BookingBand";
import { ContactAnimator } from "@/components/motion/ContactAnimator";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Tell us what you're building. We reply within one business day — or book a 30-minute call directly.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="bg-background">
      <ContactAnimator>
        <ContactHero />
        <ContactMain />
        <NeedsMatcher />
        <NextSteps />
        <BookingBand />
      </ContactAnimator>
    </div>
  );
}
