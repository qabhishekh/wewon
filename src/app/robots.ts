import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/auth/", "/c/", "/s/"],
      },
    ],
    sitemap: "https://collegeskhojo.com/sitemap.xml",
  };
}
