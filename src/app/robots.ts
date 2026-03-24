import { MetadataRoute } from "next";

//Tells scrapers what they can scrape
export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
		},
		sitemap: "https://joshuaargent.leapcell.app/sitemap.xml",
	};
}
