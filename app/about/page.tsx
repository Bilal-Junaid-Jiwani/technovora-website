import { Metadata } from "next";
import { AboutHorizontalSection } from "@/components/sections/AboutHorizontalSection";

export const metadata: Metadata = {
  title: "About Us",
  description: "Where brands and technology scale. End-to-end solutions for SaaS teams.",
};

export default function AboutPage() {
  return (
    <div className="bg-bg-base min-h-screen text-text selection:bg-orange selection:text-white pb-0">
      {/*
        The entire About Page is a single cohesive horizontal scroll experience
      */}
      <AboutHorizontalSection />
    </div>
  );
}
