import { buildMetadata } from "@/lib/metadata";
import { LegalTemplate, type LegalSection } from "@/components/legal/LegalTemplate";
import { legal } from "@/lib/i18n/en/legal";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How Technovora collects, uses, and protects your information — in plain language.",
  path: "/privacy",
});

const SECTIONS: LegalSection[] = [
  {
    heading: "What we collect",
    paragraphs: [
      "When you contact us — through our inquiry form, by email, or on a call — we receive the details you choose to share: your name, email address, and whatever project information you include. Submitting the inquiry form opens your own email app, so those details travel to us as an email you send.",
      "Like most websites, our hosting provider keeps standard server logs for security and reliability: IP addresses, timestamps, and requested pages. We don't run advertising trackers, and we don't use third-party analytics cookies that follow you around the web.",
    ],
  },
  {
    heading: "How we use it",
    paragraphs: [
      "We use your contact details to do exactly what you'd expect: reply to your inquiry, prepare a proposal, and — if we work together — deliver the project. We may also send you the occasional update about our work if you've asked to hear from us.",
      "We don't sell your information, rent it, or share it with third parties for their marketing. The only exceptions are service providers that help us operate (like our email and hosting providers), and only to the extent needed to provide their service.",
    ],
  },
  {
    heading: "How long we keep it",
    paragraphs: [
      "We keep inquiry correspondence for as long as it's useful for the conversation — typically up to two years — and project records for as long as needed to support delivered work. Server logs are retained by our hosting provider on their standard schedule.",
    ],
  },
  {
    heading: "Cookies",
    paragraphs: [
      "We don't use advertising or cross-site tracking cookies. If the site sets any cookies at all, they're strictly functional — for example, remembering your theme preference (light or dark) so you don't have to choose it again on every visit.",
      "Because our inquiry form submits through your own email app rather than a backend form handler, we don't store form submissions in a database at all.",
    ],
  },
  {
    heading: "Security",
    paragraphs: [
      "We keep the number of systems that touch your data small on purpose: email, our project tools, and our hosting provider. Access to project correspondence is limited to the people working on your project.",
      "No system is perfectly secure, and we'll be honest if something goes wrong: if we ever learn of a breach affecting your personal information, we'll tell you promptly and explain what we're doing about it.",
    ],
  },
  {
    heading: "Your rights",
    paragraphs: [
      "You can ask us at any time what information we hold about you, ask us to correct it, or ask us to delete it. We'll act on deletion requests promptly unless we're legally required to keep something (for example, invoicing records).",
      "To make any of these requests, write to moin@technovora.com with the subject line “Privacy request”. A real person will reply.",
    ],
  },
  {
    heading: "Changes to this policy",
    paragraphs: [
      "If we change this policy in a way that affects you, we'll update the date at the top of this page and — for material changes — note it on the site. The current version is always the one published here.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalTemplate
      variant="privacy"
      title={legal["legal.privacy.title"]}
      updated={legal["legal.privacy.updated"]}
      sections={SECTIONS}
    />
  );
}
