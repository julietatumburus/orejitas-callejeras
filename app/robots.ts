import type { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_APP_URL || "https://orejitas-callejeras.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin", // el panel no se indexa
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
