// Renders one or more JSON-LD structured-data blocks.
// Values must come from lib/jsonld.ts builders (real site content only).
// `<` is escaped to \u003c so a stray "</script>" sequence in content can
// never break out of the script tag (defense in depth; JSON parsers
// decode \u003c identically).

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(block).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
