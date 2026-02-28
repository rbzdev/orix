import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: "/account/",
        },
        sitemap: "https://orix-rbr2.vercel.app/sitemap.xml",
    };
}
