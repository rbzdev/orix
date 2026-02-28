import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: "/account/",
        },
        sitemap: "https://orix-three.vercel.app/sitemap.xml",
    };
}
