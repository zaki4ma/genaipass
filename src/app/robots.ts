import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/study", "/review", "/exam"],
    },
    sitemap: "https://genaipass.vercel.app/sitemap.xml",
  };
}
