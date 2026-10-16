"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Sacramento } from "next/font/google";
import { CALENDLY_URL } from "@/lib/constants";
import { ScrollRunner } from "@/components/sections/ScrollRunner";

const scriptFont = Sacramento({
  weight: "400",
  subsets: ["latin"],
});

/*
  Illustrations are black-on-white engravings. On light panels they multiply into
  the paper; on dark mode they are inverted and screened so only the linework shows.
*/
const ENGRAVING = "object-contain mix-blend-multiply dark:invert dark:mix-blend-screen";

/* Dark panels (process / capabilities / contact) stay dark in both themes. */
const DARK_PANEL = "bg-brand-black dark:bg-bg-surface";

export function AboutHorizontalSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const processLineRef = useRef<HTMLDivElement>(null);
  const capabilitiesLineRef = useRef<HTMLDivElement>(null);

  // The section is 600vh tall to allow scrolling through 6 full-screen panels
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // 6 panels = width 600vw. To see the last panel, we translate by -500vw which is -83.333% of the container width.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-83.3333%"]);

  return (
    <section ref={targetRef} className="relative h-[600vh] bg-bg-base">
      <div ref={stickyRef} className="sticky top-0 flex h-screen items-center overflow-hidden">

        {/* Scrolling Container: 600vw width for 6 panels */}
        <motion.div style={{ x }} className="flex h-full w-[600vw]">

          {/* PANEL 1: HERO SECTION */}
          <div className="w-screen h-full flex-shrink-0 flex flex-col items-center justify-center px-4 md:px-8 lg:px-12 xl:px-24 border-r-4 border-text relative bg-bg-base pt-[120px] pb-8 lg:pt-[140px] lg:pb-12">
            <div className="border-4 border-text grid grid-cols-1 md:grid-cols-12 relative overflow-hidden bg-bg-surface w-full max-w-[1400px] my-auto">
              {/* Vertical Sticky Sidebar Line */}
              <div className="hidden lg:flex absolute left-0 top-0 bottom-0 w-12 2xl:w-16 border-r-4 border-text bg-magenta items-center justify-center pointer-events-none">
                 <div className="transform -rotate-90 whitespace-nowrap text-white font-mono text-[10px] 2xl:text-xs uppercase tracking-[0.3em] font-bold">
                   Schedule your vibe check
                 </div>
              </div>
              {/* Main Left Content */}
              <div className="md:col-span-7 lg:col-span-8 p-6 lg:py-6 lg:px-16 2xl:p-12 2xl:pl-24 2xl:pr-12 flex flex-col justify-center border-b-4 md:border-b-0 border-text">
                <span className="font-display font-bold text-lg md:text-xl 2xl:text-2xl text-magenta mb-2 2xl:mb-4">
                  We<br/>Are<br/>Technovora
                </span>
                <h1 className="font-bebas text-5xl md:text-6xl 2xl:text-[80px] leading-[0.85] tracking-tight uppercase text-text mb-4 2xl:mb-8">
                  Where <br/>Brands <br/>And <br/>Technology <br/>Scale
                </h1>
                <p className="font-mono text-[10px] md:text-xs 2xl:text-sm max-w-md text-text-muted leading-relaxed">
                  We drive enterprise-grade transformation by unifying elite branding, advanced software engineering, and strategic execution.
                </p>
              </div>
              {/* Main Right Content */}
              <div className="md:col-span-5 lg:col-span-4 border-l-0 md:border-l-4 border-text relative flex flex-col bg-bg-base">
                <div className="flex-1 p-4 lg:p-6 2xl:p-8 border-b-4 border-text flex items-center justify-center min-h-[150px] 2xl:min-h-[250px] relative overflow-hidden">
                   <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
                   <Image src="/images/logo-wordmark.webp" alt="Technovora" width={400} height={150} className="w-full max-w-[180px] lg:max-w-[200px] 2xl:max-w-[240px] object-contain drop-shadow-xl relative z-10" />
                </div>
                <div className="bg-magenta p-4 lg:p-6 2xl:p-10 text-white">
                  <p className="font-mono text-[10px] 2xl:text-xs mb-4 2xl:mb-6 leading-relaxed">
                    Technovora builds brands, develops technology, and drives growth through AI, development, and strategic marketing.
                  </p>
                  <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="group block">
                     <span className="block font-mono text-[9px] lg:text-[10px] 2xl:text-xs text-white/75 uppercase tracking-widest mb-1 2xl:mb-2 transition-colors group-hover:text-white">Start your brand journey.</span>
                     <span className="block font-display font-bold text-base lg:text-lg 2xl:text-xl underline underline-offset-4 decoration-2 decoration-transparent group-hover:decoration-white transition-colors">Schedule a vibe check.</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* PANEL 2: WHAT WE DO */}
          <div className="w-screen h-full flex-shrink-0 flex flex-col items-center justify-center px-4 md:px-8 lg:px-12 xl:px-24 border-r-4 border-text relative bg-bg-base pt-[120px] pb-8 lg:pt-[140px] lg:pb-12">
            <div className="w-full max-w-[1400px] my-auto">
              <div className="flex items-center justify-center gap-2 2xl:gap-4 mb-[-12px] 2xl:mb-[-20px] relative z-10">
                <div className="h-[2px] w-8 2xl:w-12 bg-text"></div>
                <h2 className={`${scriptFont.className} text-3xl md:text-4xl 2xl:text-5xl text-text -translate-y-2`}>What we do</h2>
                <div className="h-[2px] w-8 2xl:w-12 bg-text"></div>
              </div>
              <div className="border-4 border-text grid grid-cols-1 md:grid-cols-2 relative bg-bg-base min-h-[auto] 2xl:min-h-[400px]">
                 <div className="p-6 md:p-8 lg:p-10 2xl:p-12 border-b-4 md:border-b-0 md:border-r-4 border-text flex flex-col justify-center bg-bg-surface">
                    <h3 className="font-bebas text-4xl lg:text-5xl 2xl:text-6xl uppercase text-magenta leading-none mb-4 2xl:mb-6 tracking-tight">Built to Scale <br/>Brands End to End</h3>
                    <p className="font-mono text-[10px] md:text-xs 2xl:text-sm text-text-muted leading-relaxed mb-4 2xl:mb-6">
                      Technovora is a full-stack digital partner offering branding, development, AI, and marketing, providing end-to-end solutions for your business.
                    </p>
                    <Link href="/services" className="inline-flex items-center gap-2 font-display font-bold text-sm lg:text-base 2xl:text-lg text-text border-b-2 border-magenta pb-1 w-fit hover:text-magenta transition-colors">
                      See how we uncover our story
                    </Link>
                 </div>
                 <div className="p-6 md:p-8 lg:p-10 2xl:p-12 flex flex-col justify-center relative overflow-hidden">
                    <div className="relative z-10">
                      <div className="mb-4 2xl:mb-8 border-b-2 border-bg-border pb-4 2xl:pb-6">
                        <h4 className="font-display font-bold text-lg lg:text-xl 2xl:text-2xl mb-2 2xl:mb-4 text-text">FIRST THINGS FIRST</h4>
                        <p className="font-mono text-[10px] md:text-xs 2xl:text-sm text-text-muted leading-relaxed">
                          We start by understanding your business, goals, and challenges. Through detailed discussions and research, we define a tailored strategy, project scope, timeline, and success metrics.
                        </p>
                      </div>
                      <div className="pl-0 md:pl-8 2xl:pl-16">
                        <h4 className="font-display font-bold text-lg lg:text-xl 2xl:text-2xl mb-2 2xl:mb-4 text-text">SECOND THINGS SECOND</h4>
                        <p className="font-mono text-[10px] md:text-xs 2xl:text-sm text-text-muted leading-relaxed mb-4 lg:mb-6">
                          With a clear plan in place, we design, develop, and implement the solution—covering branding, technology, and marketing. Every stage is carefully managed with regular updates.
                        </p>
                      </div>
                    </div>
                    {/* Vintage Monkey Illustration */}
                    <div className="absolute right-[-10px] lg:right-[-20px] top-4 w-32 h-32 2xl:w-48 2xl:h-48 pointer-events-none opacity-20 lg:opacity-30">
                      <Image src="/images/about/monkey.png" alt="Vintage engraved monkey" fill className={ENGRAVING} />
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* PANEL 3: WHO'S THIS FOR */}
          <div className="w-screen h-full flex-shrink-0 flex flex-col items-center justify-center px-4 md:px-8 lg:px-12 xl:px-24 border-r-4 border-text relative bg-bg-base pt-[120px] pb-8 lg:pt-[140px] lg:pb-12">
            <div className="w-full max-w-[1400px] my-auto">
              <div className="flex items-center justify-center gap-2 2xl:gap-4 mb-[-12px] 2xl:mb-[-20px] relative z-10">
                <div className="h-[2px] w-8 2xl:w-12 bg-text"></div>
                <h2 className={`${scriptFont.className} text-3xl md:text-4xl 2xl:text-5xl text-text -translate-y-2`}>Who&apos;s this for?</h2>
                <div className="h-[2px] w-8 2xl:w-12 bg-text"></div>
              </div>
              <div className="border-4 border-text grid grid-cols-1 md:grid-cols-2 bg-bg-base relative min-h-[auto] 2xl:min-h-[400px]">
                 <div className="p-6 md:p-8 lg:p-10 2xl:p-12 border-b-4 md:border-b-0 md:border-r-4 border-text flex flex-col justify-center">
                    <h3 className="font-display font-bold text-3xl lg:text-4xl 2xl:text-4xl text-magenta mb-4 2xl:mb-6">ARE YOU A GOOD FIT?</h3>
                    <p className="font-mono text-[10px] md:text-xs 2xl:text-sm text-text-muted leading-relaxed mb-4 2xl:mb-6">
                      Technovora is the best match for your brand because we take the time to understand your business, goals, and challenges, ensuring every solution is tailored for real impact.
                    </p>
                    <p className="font-mono text-[10px] md:text-xs 2xl:text-sm text-text-muted leading-relaxed mb-6 2xl:mb-8">
                      With all-in-one expertise under one roof, we handle everything from design and development to AI driven solutions and growth marketing.
                    </p>
                    <div className="bg-text text-bg-base p-4 2xl:p-5 inline-flex flex-col gap-1 2xl:gap-2 w-fit">
                      <span className="font-mono text-[10px] 2xl:text-xs uppercase tracking-widest text-orange">Start your brand journey.</span>
                      <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="font-display font-bold text-base lg:text-lg 2xl:text-xl hover:text-magenta transition-colors">Schedule a vibe check.</a>
                    </div>
                 </div>
                 <div className="p-6 md:p-8 lg:p-10 2xl:p-12 flex items-center justify-center relative overflow-hidden bg-bg-surface min-h-[250px]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-[120%] h-[120%] md:w-[100%] md:h-[100%] opacity-[0.25]">
                        <Image src="/images/about/lion.png" alt="Vintage Winged Lion" fill className={ENGRAVING} />
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* PANEL 4: OUR PROCESS */}
          <div className={`w-screen h-full flex-shrink-0 flex flex-col items-center justify-center px-4 md:px-8 lg:px-12 xl:px-24 border-r-4 border-magenta/30 relative ${DARK_PANEL} pt-[120px] pb-8 lg:pt-[140px] lg:pb-12`}>
            <div className="w-full max-w-[1400px] relative z-10 my-auto">
              <div className="flex items-center justify-center gap-2 2xl:gap-4 mb-6 2xl:mb-12">
                <div className="h-[2px] w-8 2xl:w-12 bg-white/60"></div>
                <h2 className={`${scriptFont.className} text-4xl lg:text-5xl 2xl:text-6xl text-white -translate-y-2`}>Our Process</h2>
                <div className="h-[2px] w-8 2xl:w-12 bg-white/60"></div>
              </div>
              {/* Rule line the runner stands on (space above it is the runner's track) */}
              <div className="relative mt-24 lg:mt-32 2xl:mt-44">
                <div ref={processLineRef} className="absolute left-0 right-0 top-0 h-[3px] bg-magenta" aria-hidden="true" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 2xl:gap-8 relative pt-6 2xl:pt-10">
                 <div className="border-l-2 border-magenta pl-4 lg:pl-6 text-white backdrop-blur-sm bg-white/5 p-4 rounded-xl">
                    <h4 className="font-display font-bold text-lg lg:text-xl 2xl:text-2xl mb-2 2xl:mb-4">Discovery &<br/>Insight</h4>
                    <p className="font-mono text-[10px] md:text-xs 2xl:text-sm text-white/70 leading-relaxed">
                      We dive deep into your business, goals, and challenges to understand your needs and define the roadmap.
                    </p>
                 </div>
                 <div className="border-l-2 border-magenta pl-4 lg:pl-6 text-white backdrop-blur-sm bg-white/5 p-4 rounded-xl">
                    <h4 className="font-display font-bold text-lg lg:text-xl 2xl:text-2xl mb-2 2xl:mb-4">Strategy &<br/>Planning</h4>
                    <p className="font-mono text-[10px] md:text-xs 2xl:text-sm text-white/70 leading-relaxed">
                      We craft a tailored strategy, set clear objectives, define the scope, and establish timelines.
                    </p>
                 </div>
                 <div className="border-l-2 border-magenta pl-4 lg:pl-6 text-white backdrop-blur-sm bg-white/5 p-4 rounded-xl">
                    <h4 className="font-display font-bold text-lg lg:text-xl 2xl:text-2xl mb-2 2xl:mb-4">Design &<br/>Development</h4>
                    <p className="font-mono text-[10px] md:text-xs 2xl:text-sm text-white/70 leading-relaxed">
                      Our team creates compelling branding, web platforms, and integrates technology and automation.
                    </p>
                 </div>
                 <div className="border-l-2 border-magenta pl-4 lg:pl-6 text-white backdrop-blur-sm bg-white/5 p-4 rounded-xl">
                    <h4 className="font-display font-bold text-lg lg:text-xl 2xl:text-2xl mb-2 2xl:mb-4">Implementation &<br/>Optimization</h4>
                    <p className="font-mono text-[10px] md:text-xs 2xl:text-sm text-white/70 leading-relaxed">
                      We launch the solution with careful management, performance monitoring, and continuous optimization.
                    </p>
                 </div>
              </div>
            </div>
          </div>

          {/* PANEL 5: OUR CAPABILITIES */}
          <div className={`w-screen h-full flex-shrink-0 flex flex-col items-center justify-center px-4 md:px-8 lg:px-12 xl:px-24 border-r-4 border-magenta/30 relative ${DARK_PANEL} pt-[120px] pb-8 lg:pt-[140px] lg:pb-12`}>
            <div className="w-full max-w-[1400px] relative z-10 my-auto">
              <div className="flex items-center justify-center gap-2 2xl:gap-4 mb-6 2xl:mb-12">
                <div className="h-[2px] w-8 2xl:w-12 bg-white/60"></div>
                <h2 className={`${scriptFont.className} text-4xl lg:text-5xl 2xl:text-6xl text-white -translate-y-2`}>Our Capabilities</h2>
                <div className="h-[2px] w-8 2xl:w-12 bg-white/60"></div>
              </div>
              {/* Rule line the runner stands on (space above it is the runner's track) */}
              <div className="relative mt-24 lg:mt-32 2xl:mt-44">
                <div ref={capabilitiesLineRef} className="absolute left-0 right-0 top-0 h-[3px] bg-magenta" aria-hidden="true" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 2xl:gap-8 relative pt-6 2xl:pt-10">
                 <div className="border-t-2 border-magenta pt-4 lg:pt-6 text-white backdrop-blur-sm bg-white/5 p-4 rounded-xl lg:mt-4">
                    <h4 className="font-display font-bold text-lg lg:text-xl 2xl:text-2xl mb-2 2xl:mb-4">Complete Branding Solutions</h4>
                    <p className="font-mono text-[10px] md:text-xs 2xl:text-sm text-white/70 leading-relaxed">
                      Crafting logos, brand identities, mockups, animations, and videos that make your brand unforgettable.
                    </p>
                 </div>
                 <div className="border-t-2 border-magenta pt-4 lg:pt-6 text-white backdrop-blur-sm bg-white/5 p-4 rounded-xl lg:mt-4">
                    <h4 className="font-display font-bold text-lg lg:text-xl 2xl:text-2xl mb-2 2xl:mb-4">Full-Stack Development</h4>
                    <p className="font-mono text-[10px] md:text-xs 2xl:text-sm text-white/70 leading-relaxed">
                      Building websites, web apps, CRMs, using React, Next.js, Node.js, and modern cross-platform tech.
                    </p>
                 </div>
                 <div className="border-t-2 border-magenta pt-4 lg:pt-6 text-white backdrop-blur-sm bg-white/5 p-4 rounded-xl lg:mt-4">
                    <h4 className="font-display font-bold text-lg lg:text-xl 2xl:text-2xl mb-2 2xl:mb-4">AI & Automation Expertise</h4>
                    <p className="font-mono text-[10px] md:text-xs 2xl:text-sm text-white/70 leading-relaxed">
                      Designing AI workflows, RAG systems, and smart AI agents to automate processes and boost efficiency.
                    </p>
                 </div>
                 <div className="border-t-2 border-magenta pt-4 lg:pt-6 text-white backdrop-blur-sm bg-white/5 p-4 rounded-xl lg:mt-4">
                    <h4 className="font-display font-bold text-lg lg:text-xl 2xl:text-2xl mb-2 2xl:mb-4">Digital Marketing & PR</h4>
                    <p className="font-mono text-[10px] md:text-xs 2xl:text-sm text-white/70 leading-relaxed">
                      Driving visibility and authority through targeted media placements, influencer campaigns, and PR strategies.
                    </p>
                 </div>
              </div>
            </div>
          </div>

          {/* PANEL 6: CONTACT / LET'S CONNECT */}
          <div className={`w-screen h-full flex-shrink-0 flex flex-col justify-center items-center px-4 md:px-8 lg:px-12 xl:px-24 relative ${DARK_PANEL} pt-[120px] pb-8 lg:pt-[140px] lg:pb-12`}>
            <div className="my-auto w-full">
              <div className="flex items-center justify-center gap-2 2xl:gap-4 mb-6 2xl:mb-12 relative z-10">
                <div className="h-[2px] w-8 2xl:w-12 bg-white/60"></div>
                <h2 className={`${scriptFont.className} text-4xl lg:text-5xl 2xl:text-6xl text-white -translate-y-2`}>Let&apos;s Connect</h2>
                <div className="h-[2px] w-8 2xl:w-12 bg-white/60"></div>
              </div>
              <div className="text-center max-w-2xl mx-auto text-white">
                <h3 className="font-display font-bold text-4xl lg:text-5xl 2xl:text-6xl mb-4 2xl:mb-8">DROP US A LINE</h3>
                <p className="font-mono text-xs lg:text-sm 2xl:text-lg text-white/70 mb-6 2xl:mb-10">
                  Ready to create something fresh? Let&apos;s chat and see how Technovora can help your brand scale.
                </p>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-magenta text-white font-mono text-[10px] 2xl:text-sm font-bold uppercase tracking-widest px-8 2xl:px-12 py-4 2xl:py-6 hover:bg-white hover:text-black transition-colors">
                  Schedule a vibe check
                </a>
              </div>
            </div>
          </div>

        </motion.div>

        {/* Pinned runner: stays on screen while the panels slide underneath it */}
        <ScrollRunner
          progress={scrollYProgress}
          stickyRef={stickyRef}
          lineARef={processLineRef}
          lineBRef={capabilitiesLineRef}
        />
      </div>
    </section>
  );
}
