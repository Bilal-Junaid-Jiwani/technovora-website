const fs = require('fs');
const path = require('path');

const sectionsDir = 'd:/new technovora/technovora-website/components/sections';

// 1. Redesign FAQ
const faqCode = `"use client";
import { useState } from "react";
import { FadeIn } from "@/components/animations/FadeIn";
import { ChevronDown } from "lucide-react";

const FAQS = [
  { q: "How long does a typical project take?", a: "Web builds: 3–6 weeks. AI automation workflows: 1–3 weeks. Mobile apps: 8–16 weeks. Cloud migrations: 4–8 weeks. Every project starts with a 48-hour scoping phase." },
  { q: "What are your payment terms?", a: "50% upfront, 50% on delivery. For retainer clients, monthly invoicing on the 1st. We accept wire transfer, Stripe, and crypto." },
  { q: "Do you work with early-stage startups?", a: "Both. We have fixed-scope packages starting at \\$5,000 designed for pre-seed teams." },
  { q: "Will we own the code after the project?", a: "Yes, full IP transfer on delivery. All source code, assets, and documentation are yours." },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-bg-base dark:bg-[#0D0D0D] border-t border-bg-border">
      <div className="max-w-4xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-text-main dark:text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-text-muted dark:text-gray-400 text-lg">Everything you need to know about the product and billing.</p>
          </div>
          <div className="space-y-4">
            {FAQS.map((item, i) => (
              <div key={i} className="border border-bg-border dark:border-[#2D1040] rounded-xl overflow-hidden bg-bg-elevated dark:bg-[#121212] transition-colors">
                <button
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F28627]"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <span className="font-medium text-text-main dark:text-white">{item.q}</span>
                  <ChevronDown className={\`w-5 h-5 text-text-muted dark:text-gray-400 transition-transform duration-200 \${openIndex === i ? 'rotate-180' : ''}\`} />
                </button>
                {openIndex === i && (
                  <div className="px-6 pb-5 text-text-muted dark:text-gray-400">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
`;
fs.writeFileSync(path.join(sectionsDir, 'FAQ.tsx'), faqCode);

// 2. Redesign ContactSection
const contactCode = `"use client";
import { FadeIn } from "@/components/animations/FadeIn";
import { Mail, MessageSquare } from "lucide-react";

export function ContactSection() {
  return (
    <section className="py-24 bg-bg-base dark:bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="grid lg:grid-cols-2 gap-12 items-center bg-bg-surface dark:bg-[#121212] rounded-3xl p-8 lg:p-12 border border-bg-border dark:border-[#2D1040]">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-main dark:text-white mb-4">Get in touch with our team</h2>
              <p className="text-text-muted dark:text-gray-400 mb-8">Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#BF216B]/10 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 text-[#BF216B]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-main dark:text-white">Chat to sales</h3>
                    <p className="text-sm text-text-muted dark:text-gray-400">Speak to our friendly team.</p>
                    <a href="mailto:sales@technovora.com" className="text-sm font-medium text-[#BF216B] hover:text-[#A02077]">sales@technovora.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#F28627]/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#F28627]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-main dark:text-white">Chat to support</h3>
                    <p className="text-sm text-text-muted dark:text-gray-400">We're here to help.</p>
                    <a href="mailto:support@technovora.com" className="text-sm font-medium text-[#F28627] hover:text-[#BF216B]">support@technovora.com</a>
                  </div>
                </div>
              </div>
            </div>
            <form className="space-y-4 bg-bg-elevated dark:bg-[#1A1A1A] p-6 rounded-2xl border border-bg-border dark:border-[#2D1040]">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-text-main dark:text-gray-300">First name</label>
                  <input type="text" className="w-full px-3 py-2 bg-bg-base dark:bg-[#0D0D0D] border border-bg-border dark:border-[#2D1040] rounded-lg focus:ring-2 focus:ring-[#BF216B] outline-none text-text-main dark:text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-text-main dark:text-gray-300">Last name</label>
                  <input type="text" className="w-full px-3 py-2 bg-bg-base dark:bg-[#0D0D0D] border border-bg-border dark:border-[#2D1040] rounded-lg focus:ring-2 focus:ring-[#BF216B] outline-none text-text-main dark:text-white" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-text-main dark:text-gray-300">Email</label>
                <input type="email" className="w-full px-3 py-2 bg-bg-base dark:bg-[#0D0D0D] border border-bg-border dark:border-[#2D1040] rounded-lg focus:ring-2 focus:ring-[#BF216B] outline-none text-text-main dark:text-white" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-text-main dark:text-gray-300">Message</label>
                <textarea rows={4} className="w-full px-3 py-2 bg-bg-base dark:bg-[#0D0D0D] border border-bg-border dark:border-[#2D1040] rounded-lg focus:ring-2 focus:ring-[#BF216B] outline-none text-text-main dark:text-white"></textarea>
              </div>
              <button type="button" className="w-full py-2.5 bg-[#BF216B] hover:bg-[#A02077] text-white rounded-lg font-medium transition-colors">Send message</button>
            </form>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
`;
fs.writeFileSync(path.join(sectionsDir, 'ContactSection.tsx'), contactCode);

// 3. CtaBanner (Let's Build Together)
const ctaCode = `"use client";
import Link from "next/link";
import { FadeIn } from "@/components/animations/FadeIn";
import { CALENDLY_URL } from "@/lib/constants";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden py-32 bg-[#0D0D0D]">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(191,33,107,0.2)_0%,rgba(45,16,64,0.8)_100%)] pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[300px] bg-[#BF216B] opacity-30 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <FadeIn>
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6">Let's build together</h2>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Transform your ideas into reality with our cutting-edge engineering team. We deliver scalable solutions at lightning speed.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={CALENDLY_URL} className="px-8 py-4 rounded-full bg-[#F28627] hover:bg-[#D97722] text-white font-semibold transition-all shadow-[0_0_20px_rgba(242,134,39,0.4)] hover:shadow-[0_0_30px_rgba(242,134,39,0.6)]">
              Start your project
            </a>
            <Link href="/portfolio" className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium backdrop-blur-sm border border-white/10 transition-all">
              View our work
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
`;
fs.writeFileSync(path.join(sectionsDir, 'CtaBanner.tsx'), ctaCode);

// 4. FeaturedBlog
const blogCode = `"use client";
import { FadeIn } from "@/components/animations/FadeIn";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const POSTS = [
  { title: "The Future of Next.js Architecture", category: "Engineering", date: "Oct 24, 2026", readTime: "5 min read" },
  { title: "Mastering Tailwind CSS Gradients", category: "Design", date: "Oct 18, 2026", readTime: "4 min read" },
  { title: "Deploying at the Edge with Vercel", category: "Infrastructure", date: "Oct 12, 2026", readTime: "7 min read" }
];

export function FeaturedBlog() {
  return (
    <section className="py-24 bg-bg-base dark:bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-main dark:text-white mb-2">From the Blog</h2>
              <p className="text-text-muted dark:text-gray-400">Latest news, insights, and engineering practices.</p>
            </div>
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-[#BF216B] hover:text-[#A02077] transition-colors">
              View all posts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {POSTS.map((post, i) => (
              <Link key={i} href="/blog" className="group block">
                <div className="aspect-[16/9] bg-bg-surface dark:bg-[#1A1A1A] rounded-2xl mb-4 overflow-hidden border border-bg-border dark:border-[#2D1040] relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#BF216B]/20 to-[#F28627]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="flex items-center gap-3 text-xs font-medium text-text-muted dark:text-gray-400 mb-2">
                  <span className="text-[#BF216B]">{post.category}</span>
                  <span>&bull;</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="text-lg font-semibold text-text-main dark:text-white group-hover:text-[#BF216B] transition-colors">{post.title}</h3>
              </Link>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
`;
fs.writeFileSync(path.join(sectionsDir, 'FeaturedBlog.tsx'), blogCode);

// 5. TechWall
const techCode = `"use client";
import { FadeIn } from "@/components/animations/FadeIn";

const TECH_STACK = [
  { name: "Next.js", desc: "React Framework" },
  { name: "TypeScript", desc: "Static Typing" },
  { name: "Tailwind", desc: "Utility CSS" },
  { name: "Supabase", desc: "Backend" },
  { name: "Prisma", desc: "ORM" },
  { name: "Vercel", desc: "Deployment" },
];

export function TechWall() {
  return (
    <section className="py-24 bg-bg-surface dark:bg-[#121212] border-y border-bg-border dark:border-[#2D1040]">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-main dark:text-white mb-4">Our Tech Stack</h2>
            <p className="text-text-muted dark:text-gray-400 max-w-2xl mx-auto">We build with the best modern tools to ensure scalability, performance, and maintainability.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {TECH_STACK.map((tech, i) => (
              <div key={i} className="flex flex-col items-center justify-center p-6 bg-bg-base dark:bg-[#1A1A1A] rounded-xl border border-bg-border dark:border-[#2D1040] hover:border-[#BF216B] transition-colors group">
                <div className="w-12 h-12 bg-bg-surface dark:bg-[#2D1040] rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-[#BF216B] font-bold">{tech.name[0]}</span>
                </div>
                <h3 className="text-sm font-semibold text-text-main dark:text-white">{tech.name}</h3>
                <p className="text-xs text-text-muted dark:text-gray-500 mt-1">{tech.desc}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
`;
fs.writeFileSync(path.join(sectionsDir, 'TechWall.tsx'), techCode);

// 6. WorkIndex
const workCode = `"use client";
import { FadeIn } from "@/components/animations/FadeIn";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const WORKS = [
  { name: "Fintech Dashboard", type: "Web App", year: "2026" },
  { name: "AI Content Generator", type: "SaaS", year: "2025" },
  { name: "Global E-commerce", type: "Platform", year: "2025" },
  { name: "Healthcare Portal", type: "Web App", year: "2024" }
];

export function WorkIndex() {
  return (
    <section className="py-24 bg-bg-base dark:bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-main dark:text-white">Selected Work</h2>
          </div>
          <div className="flex flex-col border-t border-bg-border dark:border-[#2D1040]">
            {WORKS.map((work, i) => (
              <Link key={i} href="/portfolio" className="group flex items-center justify-between py-6 border-b border-bg-border dark:border-[#2D1040] hover:bg-bg-surface dark:hover:bg-[#121212] px-4 -mx-4 transition-colors">
                <div className="flex items-center gap-8">
                  <span className="font-mono text-sm text-text-muted dark:text-gray-500 w-8">0{i + 1}</span>
                  <h3 className="text-xl md:text-3xl font-bold text-text-main dark:text-white group-hover:text-[#BF216B] transition-colors">{work.name}</h3>
                </div>
                <div className="flex items-center gap-8">
                  <span className="text-sm text-text-muted dark:text-gray-400 hidden md:block">{work.type}</span>
                  <span className="text-sm text-text-muted dark:text-gray-400 hidden md:block">{work.year}</span>
                  <ArrowUpRight className="w-6 h-6 text-text-muted dark:text-gray-500 group-hover:text-[#BF216B] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
`;
fs.writeFileSync(path.join(sectionsDir, 'WorkIndex.tsx'), workCode);

console.log('Done');
