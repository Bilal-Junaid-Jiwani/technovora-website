import { buildMetadata } from "@/lib/metadata";
import { LegalTemplate, type LegalSection } from "@/components/legal/LegalTemplate";
import { legal } from "@/lib/i18n/en/legal";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description:
    "The plain-language terms under which Technovora delivers projects — in plain language.",
  path: "/terms",
});

const SECTIONS: LegalSection[] = [
  {
    heading: "What we do",
    paragraphs: [
      "Technovora designs and builds software: websites, web applications, mobile apps, AI automation, and cloud infrastructure. The specific work for your project is described in a written proposal or statement of work that we agree on before the project starts.",
      "The proposal — scope, timeline, deliverables, and price — is the governing document for each engagement. If anything in these terms conflicts with a signed proposal, the proposal wins.",
    ],
  },
  {
    heading: "Payment",
    paragraphs: [
      "Pricing is fixed and stated in the proposal: no hourly billing unless that's what we explicitly agreed. Payment schedules follow the proposal's milestones — a common structure is a deposit to start, a midpoint payment, and the balance on delivery.",
      "If a payment is late, we'll say so plainly and pause scheduled work until it's resolved. We don't charge surprise fees; anything beyond the agreed scope is quoted and approved in writing before we do it.",
    ],
  },
  {
    heading: "Intellectual property",
    paragraphs: [
      "When your final payment clears, full ownership of the project deliverables transfers to you: source code, designs, documentation, and anything else we built for the project. You don't need an ongoing contract with us to use, modify, or resell it.",
      "Before final payment, the work remains ours as security for the balance. We may reuse general techniques and know-how learned on your project, but never your confidential information, your data, or your brand assets.",
    ],
  },
  {
    heading: "30-day bug-fix guarantee",
    paragraphs: [
      "Every delivery includes a 30-day bug-fix guarantee, starting from the day we hand the project over. If something we built doesn't work the way the agreed scope says it should, we fix it at no charge.",
      "This covers defects against the agreed scope — not new features, not changes in requirements, and not problems caused by third-party services, hosting changes, or modifications made by someone else after handover. If you're unsure whether something qualifies, ask: we'd rather fix a genuine bug than argue about it.",
    ],
  },
  {
    heading: "Working together",
    paragraphs: [
      "Projects go well when both sides hold up their end. We'll show up with working software on a regular demo cadence. In return, we ask for timely feedback, access to the systems and people we need, and content or assets on the schedule we agree in the proposal. Delays in feedback or access move the timeline by the same amount.",
      "Either side can end a project with written notice. You'll pay for work completed through the termination date, and we'll hand over everything built so far in a usable state.",
    ],
  },
  {
    heading: "Limitation of liability",
    paragraphs: [
      "We build carefully and stand behind our work, but software operates in a world of third-party services, networks, and platforms we don't control. To the extent the law allows, our total liability for any project is capped at the amount you paid us for that project, and we're not liable for indirect losses like lost profits or lost data.",
      "Nothing here limits liability that can't legally be limited, or affects your rights as a consumer where consumer law applies.",
    ],
  },
  {
    heading: "Questions",
    paragraphs: [
      "These terms are meant to be read, not just signed. If anything is unclear, write to moin@technovora.com before you agree — we're happy to explain or adjust the project-specific terms in your proposal.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalTemplate
      variant="terms"
      title={legal["legal.terms.title"]}
      updated={legal["legal.terms.updated"]}
      sections={SECTIONS}
    />
  );
}
