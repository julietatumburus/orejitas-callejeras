import type { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_APP_URL || "https://orejitas-callejeras.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/adoptar", "/transito", "/concientizacion"];
  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}
