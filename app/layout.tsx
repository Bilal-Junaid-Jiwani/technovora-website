import type { Metadata } from "next";
import { Inter, Bebas_Neue, Syne } from "next/font/google";
import "@/styles/globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { PageTransitionWrapper } from "@/components/layout/PageTransitionWrapper";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { I18nProvider } from "@/lib/i18n";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Legacy display fonts — used ONLY by the preserved /about page
// (AboutHorizontalSection). New code must use Inter exclusively.
const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://technovora.com"),
  title: {
    default: "Technovora — Custom Software & AI Automation for SaaS Teams",
    template: "%s | Technovora",
  },
  description:
    "Technovora designs and builds custom software, AI automation, mobile apps, and cloud infrastructure for SaaS teams. Offices in Sheridan, WY and Hong Kong.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://technovora.com",
    siteName: "Technovora",
    title: "Technovora — Custom Software & AI Automation for SaaS Teams",
    description:
      "Custom software, AI automation, and cloud infrastructure for SaaS teams.",
    images: [
      {
        url: "/og/default.png",
        width: 1200,
        height: 630,
        alt: "Technovora",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technovora — Custom Software & AI Automation for SaaS Teams",
    description:
      "Custom software, AI automation, and cloud infrastructure for SaaS teams.",
    images: ["/og/default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${bebasNeue.variable} ${syne.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme")==="dark"?"dark":"light";document.documentElement.classList.add(t);document.documentElement.style.colorScheme=t;}catch(e){document.documentElement.classList.add("light");}})();`,
          }}
        />
        <I18nProvider>
          <ThemeProvider>
            <SmoothScrollProvider>
              <ScrollProgress />
              <Navbar />
              <main className="flex-1 pt-16">
                <PageTransitionWrapper>{children}</PageTransitionWrapper>
              </main>
              <Footer />
            </SmoothScrollProvider>
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
