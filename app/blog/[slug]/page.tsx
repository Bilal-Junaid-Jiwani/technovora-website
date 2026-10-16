import { buildMetadata } from "@/lib/metadata";
import { ArticleTemplate } from "@/components/blog/ArticleTemplate";
import { ARTICLES } from "@/components/blog/articles";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = ARTICLES.find((a) => a.slug === slug)!;
  return buildMetadata({
    title: meta.metaTitle,
    description: meta.metaDescription,
    path: `/blog/${slug}`,
  });
}

/* ── Article 1 body ─────────────────────────────────────────── */
function ShipInThreeWeeksBody() {
  return (
    <>
      <p>
        Three weeks is an unusual promise in software. Most teams have been burned by
        vendors that quote three weeks and deliver in six months, or quote three weeks
        and deliver something fragile that falls over the first time a real user
        touches it. So it's worth being precise about what a three-week build actually
        is — and what has to be true for it to work.
      </p>
      <p>
        The short version: <strong>a three-week build is not a rushed build</strong>.
        It's a small build. The timeline doesn't come from working faster, it comes
        from scoping ruthlessly, demoing constantly, and handing over something your
        team can actually own. Here's how that works in practice.
      </p>

      <h2>Week zero: the scope document is the whole project</h2>
      <p>
        Everything that matters happens before the build starts. A proper scoping
        phase — usually a few days, sometimes folded into a paid discovery — produces
        a written document that says three things: what we're building, what done
        looks like, and what we're explicitly not building.
      </p>
      <p>
        "What done looks like" means <strong>acceptance criteria in plain
        language</strong>, not feature titles. Not "user dashboard" but "a logged-in
        user sees their last ten orders, can filter by date, and the page loads in
        under two seconds." Anyone on either side should be able to read the scope
        and know whether a deliverable passed.
      </p>
      <p>
        The "not building" list is just as important. Every scope needs a cut list —
        the features that would be nice but don't change whether the thing works.
        Writing them down does two things: it protects the timeline, and it gives you
        a ready-made roadmap for phase two. A vendor that won't commit to a cut list
        hasn't really committed to a timeline.
      </p>

      <h2>Weeks one and two: demos, not status updates</h2>
      <p>
        The single biggest difference between a build that ships and one that drifts
        is <strong>what you see, and when</strong>. Weekly demos of working software
        — not slide decks, not status reports — are the mechanism that keeps a fixed
        timeline fixed.
      </p>
      <p>
        At the end of week one, you should be clicking through something real, even
        if it's rough. Screens may be unpolished, data may be seeded, but the core
        flows exist. This is where surprises surface early, when they're still cheap
        to fix. A misunderstanding about how a workflow should behave costs an
        afternoon in week one; it costs a week of rework in week three.
      </p>
      <p>
        Week two's demo should feel close to final. The point of the cadence is that
        there are never more than a few days between you seeing the product and the
        product being the product. By the time you're reviewing it, you've already
        reviewed most of it.
      </p>

      <h2>Week three: handover is a deliverable, not a goodbye</h2>
      <p>
        This is the part most fast builds skip, and it's the part that determines
        whether the three weeks were worth it. Shipping code you can't maintain is
        just renting your vendor's time. A real handover includes:
      </p>
      <ul>
        <li>
          <strong>Documentation your team will actually read</strong> — short, with
          diagrams, covering architecture, where things live, and how to change them.
        </li>
        <li>
          <strong>A recorded walkthrough</strong> — an engineer explaining the system
          end to end, so knowledge isn't locked in one person's head.
        </li>
        <li>
          <strong>Deployment and rollback steps</strong> — written down, tested, and
          simple enough that someone other than the author can follow them.
        </li>
        <li>
          <strong>A short support window</strong> — real bugs found in the first weeks
          of production get fixed, no invoice required.
        </li>
      </ul>
      <p>
        Ask your vendor what their handover includes before you sign. If the answer
        is vague, the timeline probably is too.
      </p>

      <h2>What honestly doesn't fit in three weeks</h2>
      <p>
        A three-week timeline is real, but it has a shape. It works for a focused
        product surface: a marketing site rebuild, an internal tool, an automation
        pipeline, a minimum viable version of one workflow. It does not work for a
        platform with five integrations and two mobile apps, and anyone who tells you
        otherwise is selling you a deadline they'll miss.
      </p>
      <p>
        The honest version of "three weeks" is: a fixed, small scope, delivered
        completely — code, docs, and handover — in fifteen working days. That's still
        dramatically faster than the industry default, and it happens precisely
        because the scope is small enough to be fully understood.
      </p>

      <h2>What to ask before you sign</h2>
      <p>
        If you're evaluating a team that promises a fast build, four questions will
        tell you most of what you need to know: What exactly is in scope, in writing?
        What does the cut list look like? When do I see working software, not slides?
        And what does handover include? Clear answers to all four mean the timeline
        is a plan. Anything less means it's a hope.
      </p>
      <p className="related-link">
        Scoping a build of your own?{" "}
        <a href="/packages">Answer a few questions</a> and we will reply within
        one business day with your estimation.
      </p>
    </>
  );
}

/* ── Article 2 body ─────────────────────────────────────────── */
function AiAgentsBody() {
  return (
    <>
      <p>
        AI agents are having their hype cycle. Every week there's a new demo of an
        "autonomous workforce" that will replace entire departments. Most of those
        demos never become production systems — not because the technology is fake,
        but because <strong>what's impressive in a demo and what's reliable in
        operations are two different things</strong>.
      </p>
      <p>
        So here's the honest version: where AI agents genuinely work in day-to-day
        operations right now, where they don't, and what separates the deployments
        that stick from the ones that get quietly turned off.
      </p>

      <h2>What actually works</h2>
      <p>
        The agents that survive in production share a pattern: they do a narrow,
        well-defined job, inside a workflow, with a human reviewing the output before
        anything irreversible happens. Three examples come up again and again:
      </p>

      <h2>1. Lead triage</h2>
      <p>
        Inbound leads arrive from forms, emails, and DMs in inconsistent formats. An
        agent can read each one, enrich it with public company data, score it against
        your criteria, and route it to the right person with a one-line summary.
        Nothing leaves the building without review — the agent's job is to make the
        human's decision faster, not to make it.
      </p>
      <p>
        Why it works: the task is <strong>read-only until the human approves</strong>.
        The cost of an agent mistake is a misrouted lead, not a lost customer. And
        the input is unstructured text, which is exactly where language models are
        strong.
      </p>

      <h2>2. Support drafting</h2>
      <p>
        First-line support is mostly pattern matching: the same questions, the same
        account states, the same documentation. An agent can draft replies against
        your help center and internal notes, pull the relevant account context, and
        hand the draft to a support rep. The rep edits and sends.
      </p>
      <p>
        The key decision is <strong>draft, don't send</strong>. Fully autonomous
        support fails the moment an edge case arrives — and edge cases are what
        support is for. Drafting still saves most of the time, because the time was
        never in typing; it was in finding the right answer.
      </p>

      <h2>3. Invoice reconciliation</h2>
      <p>
        Matching invoices to purchase orders and flagging discrepancies is tedious,
        rule-adjacent work that eats hours in finance teams. An agent can extract the
        fields from PDFs, match them against your records, and produce a clean
        exceptions list: "these 40 matched, these 3 need a look." Again, the agent
        flags — a human signs off.
      </p>

      <h2>Where it goes wrong</h2>
      <p>
        The failures follow a pattern too. Agents break down when they're given
        <strong> unsupervised actions with real consequences</strong>: sending emails
        to customers, changing records, spending money. Not because they always get
        it wrong, but because they sometimes do — and "sometimes" is unacceptable
        when there's no one watching.
      </p>
      <p>
        The second failure mode is data. An agent reading from messy, contradictory
        source systems will produce confident, well-formatted nonsense. If your CRM
        has three versions of the truth, an agent won't fix that; it will scale the
        confusion. Cleaning the data source is unglamorous, and it's the step most
        failed pilots skipped.
      </p>
      <p>
        The third is maintenance. Prompts drift, APIs change, business rules evolve.
        An agent deployed without an owner and without logs is a black box that
        silently degrades. Every production agent needs someone responsible for it
        and a log of what it did.
      </p>

      <h2>Three rules for agents that stick</h2>
      <ul>
        <li>
          <strong>Human in the loop for anything irreversible.</strong> Drafts,
          flags, and summaries — yes. Sending, deleting, spending — only after
          approval.
        </li>
        <li>
          <strong>Narrow permissions.</strong> An agent that only reads your inbox
          and writes to one spreadsheet can't do much damage. An agent with admin
          access to everything can. Scope access to the task, not the company.
        </li>
        <li>
          <strong>Measure before and after.</strong> Pick one workflow, time how
          long it takes today, run the pilot for a few weeks, and compare. If you
          can't point to the difference, it didn't work — no matter how impressive
          the demo was.
        </li>
      </ul>

      <h2>The takeaway</h2>
      <p>
        AI agents are genuinely useful operational tools — not autonomous employees,
        but extremely capable assistants with perfect recall and no ego about doing
        boring work. Deployed with a human in the loop, narrow permissions, and
        clean data, they take real hours off real teams' weeks. Deployed as magic,
        they become expensive demos. The difference is never the model. It's the
        workflow design around it.
      </p>
      <p className="related-link">
        Want agents like these in your operations? See{" "}
        <a href="/services/ai-automation">AI automation services</a>.
      </p>
    </>
  );
}

/* ── Article 3 body ─────────────────────────────────────────── */
function PerformanceBody() {
  return (
    <>
      <p>
        Your website's speed is not an engineering vanity metric. It's one of the
        few things that affects every visitor, every session, and every conversion
        — and unlike most growth levers, improving it never depends on convincing
        anyone of anything. The site just gets faster, and everything downstream
        gets easier.
      </p>
      <p>
        Here's a plain-English tour of what actually matters, how to measure it,
        and what changes when you rebuild properly.
      </p>

      <h2>Core Web Vitals, without the jargon</h2>
      <p>
        Google's Core Web Vitals are three measurements, and each one maps to
        something a visitor feels:
      </p>
      <ul>
        <li>
          <strong>Largest Contentful Paint (LCP)</strong> — how long until the main
          content of the page is visible. This is "how long until the page feels
          loaded." If your hero image or headline takes four seconds to appear,
          your LCP is four seconds.
        </li>
        <li>
          <strong>Interaction to Next Paint (INP)</strong> — how quickly the page
          responds when a visitor clicks, taps, or types. A page that looks loaded
          but freezes when you click a button has bad INP.
        </li>
        <li>
          <strong>Cumulative Layout Shift (CLS)</strong> — how much the page jumps
          around while loading. If you've ever gone to tap a link and the layout
          shifted so you hit an ad instead, that's layout shift.
        </li>
      </ul>
      <p>
        You don't need to memorize thresholds. The mental model is enough:
        <strong> show content fast, respond instantly, don't move things around</strong>.
        Every performance decision is in service of those three.
      </p>

      <h2>What to measure (and what to ignore)</h2>
      <p>
        There are two kinds of measurement, and confusing them causes most of the
        bad decisions. <strong>Lab data</strong> — tools like Lighthouse — tests
        your site in a controlled environment. It's great for catching regressions
        and comparing builds. <strong>Field data</strong> — real visitors' actual
        experiences, visible in Google Search Console's Core Web Vitals report — is
        what Google actually uses for ranking, and what your customers actually feel.
      </p>
      <p>
        Start with field data. It tells you what your real users experience on real
        devices and real connections — which is often very different from what your
        office wifi and your flagship phone show you. Then use lab tools to diagnose
        the specific problems field data reveals. Measuring in the other direction —
        optimizing a lab score that doesn't match real usage — is how teams spend
        months improving a number nobody feels.
      </p>

      <h2>What actually slows sites down</h2>
      <p>
        In our experience, the same four culprits show up on almost every slow site
        we audit:
      </p>
      <ul>
        <li>
          <strong>Unoptimized images</strong> — full-resolution photos served to
          phones, no modern formats, no lazy loading. Images are usually the
          biggest single chunk of page weight.
        </li>
        <li>
          <strong>Third-party scripts</strong> — analytics, chat widgets, ad pixels,
          and marketing tags, each adding its own delay. A page with fifteen
          trackers isn't fifteen times slower, but it's meaningfully slower, and
          nobody owns the list anymore.
        </li>
        <li>
          <strong>Client-side rendering</strong> — pages that ship an empty shell
          and build themselves in the visitor's browser. Fine for app dashboards
          behind a login; terrible for marketing pages that need to be fast and
          indexed.
        </li>
        <li>
          <strong>Bloated themes and page builders</strong> — generic templates that
          load everything for every page, because they can't know what you'll use.
          You pay the cost of a hundred features to use six.
        </li>
      </ul>

      <h2>What a rebuild changes</h2>
      <p>
        A proper rebuild doesn't just make the same site faster — it changes the
        architecture underneath it:
      </p>
      <ul>
        <li>
          <strong>Server rendering</strong> — pages arrive mostly complete, so
          visitors see content immediately instead of waiting for JavaScript to
          assemble it.
        </li>
        <li>
          <strong>Image pipelines</strong> — images served in modern formats, sized
          for the device, lazy-loaded below the fold. This alone is often the
          biggest single win.
        </li>
        <li>
          <strong>Script discipline</strong> — every third-party script audited,
          deferred where possible, removed where not. Someone owns the list.
        </li>
        <li>
          <strong>Caching and edge delivery</strong> — static pages served from
          servers close to the visitor, so geography stops mattering.
        </li>
      </ul>

      <h2>How to talk about it with your team</h2>
      <p>
        The most useful thing you can do this week is open Search Console, look at
        the Core Web Vitals report, and see what your real users experience. If a
        meaningful share of visits are rated "poor" on mobile, that's not an
        engineering backlog item — it's a revenue conversation. Every slow page is
        a page where some percentage of visitors leave before reading a word.
      </p>
      <p>
        And if you're evaluating a rebuild, ask the vendor what their target scores
        are and how they'll verify them in field data, not just in a lab test. A
        team that talks about real-user measurement is a team that understands what
        performance is for.
      </p>
      <p className="related-link">
        Considering a rebuild? See{" "}
        <a href="/services/web-development">web development services</a>.
      </p>
    </>
  );
}

const CONTENT: Record<string, { topic: string; title: string; read: string; seasonKey: string; body: ReactNode }> = {
  "ship-production-software-three-weeks": {
    topic: "Process",
    title: "Ship production software in three weeks",
    read: "8 min read",
    seasonKey: "blog3.post.1.season",
    body: <ShipInThreeWeeksBody />,
  },
  "ai-agents-operations-what-works": {
    topic: "AI automation",
    title: "AI agents for operations: what actually works",
    read: "9 min read",
    seasonKey: "blog3.post.2.season",
    body: <AiAgentsBody />,
  },
  "website-performance-revenue-feature": {
    topic: "Engineering",
    title: "Website performance as a revenue feature",
    read: "7 min read",
    seasonKey: "blog3.post.3.season",
    body: <PerformanceBody />,
  },
};

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = CONTENT[slug];
  if (!article) notFound();
  const meta = ARTICLES.find((a) => a.slug === slug)!;
  const idx = ARTICLES.findIndex((a) => a.slug === slug);
  const prevArticle = idx > 0 ? ARTICLES[idx - 1] : null;
  const nextArticle = idx < ARTICLES.length - 1 ? ARTICLES[idx + 1] : null;
  const jsonLd = [
    articleJsonLd({
      slug,
      headline: meta.metaTitle,
      description: meta.metaDescription,
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: meta.metaTitle, path: `/blog/${slug}` },
    ]),
  ];
  return (
    <ArticleTemplate
      topic={article.topic}
      title={article.title}
      seasonKey={article.seasonKey}
      readTime={article.read}
      prev={
        prevArticle
          ? { slug: prevArticle.slug, titleKey: prevArticle.titleKey }
          : null
      }
      next={
        nextArticle
          ? { slug: nextArticle.slug, titleKey: nextArticle.titleKey }
          : null
      }
    >
      <JsonLd data={jsonLd} />
      {article.body}
    </ArticleTemplate>
  );
}
