import { config, collection, fields } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  collections: {
    blog: collection({
      label: "Blog Posts",
      slugField: "title",
      path: "content/blog/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({
          label: "Description",
          description: "Under 160 characters for SEO.",
          multiline: false,
        }),
        publishedAt: fields.date({ label: "Published At" }),
        category: fields.text({ label: "Category" }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        author: fields.text({ label: "Author" }),
        coverImage: fields.image({
          label: "Cover Image",
          directory: "public/images/blog",
          publicPath: "/images/blog/",
        }),
        seoKeyword: fields.text({
          label: "Primary SEO Keyword",
          description: "One keyword this page targets.",
        }),
        content: fields.markdoc({ label: "Content" }),
      },
    }),
    portfolio: collection({
      label: "Portfolio",
      slugField: "client",
      path: "content/portfolio/*",
      format: { contentField: "content" },
      schema: {
        client: fields.slug({ name: { label: "Client Name" } }),
        service: fields.text({ label: "Service Delivered" }),
        headline: fields.text({
          label: "Result Headline",
          description: "Specific number. E.g. 'Cut deploy time from 4h to 11min'.",
        }),
        description: fields.text({ label: "Description", multiline: true }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        coverImage: fields.image({
          label: "Cover Image",
          directory: "public/images/portfolio",
          publicPath: "/images/portfolio/",
        }),
        publishedAt: fields.date({ label: "Published At" }),
        featured: fields.checkbox({ label: "Featured", defaultValue: false }),
        content: fields.markdoc({ label: "Case Study" }),
      },
    }),
  },
});
