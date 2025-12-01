import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/mobile", "/desktop"],
      },
    ],
    sitemap: "https://www.airtel5grouter.co.ke/sitemap.xml",
  };
}
