import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  // The only hand-written inline script is the static theme-init script in
  // app/layout.tsx (zero user input), allow-listed by exact SHA-256 hash.
  // script-src also carries 'unsafe-inline': the Next.js app router inlines
  // its React Server Component flight payload (self.__next_f.push(...)) as
  // per-request inline scripts, which can be neither hashed (content varies
  // per request) nor nonced (Next does not propagate nonces to its internal
  // flight scripts). Without 'unsafe-inline' hydration breaks site-wide.
  // The rest of the policy stays strict: no plugins, no framing, no
  // form exfiltration, base-uri locked, insecure requests upgraded.
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // NOTE: no sha256 hash may be added to script-src. Per CSP spec, the
      // presence of any hash or nonce causes browsers to IGNORE
      // 'unsafe-inline' entirely — which blocks Next.js's own inline
      // hydration scripts and leaves every scroll-reveal section stuck at
      // opacity: 0 (blank pages). 'unsafe-inline' alone is the correct,
      // working policy for Next.js apps.
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self' mailto:",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  trailingSlash: false,
  allowedDevOrigins: ["*.ngrok-free.app", "*.ngrok.io"],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  images: {
    formats: ["image/webp", "image/avif"],
  },
  modularizeImports: {
    "lucide-react": {
      transform: "lucide-react/dist/esm/icons/{{kebabCase member}}",
    },
  },
};

export default nextConfig;
