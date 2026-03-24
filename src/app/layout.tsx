import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: {
		default: "Joshua Argent | Full Stack Developer & Automation Engineer",
		template: "%s | Joshua Argent",
	},

	description:
		"Joshua Argent is a full stack developer and automation engineer building scalable, data driven web applications with TypeScript, Next.js, and PostgreSQL.",

	keywords: [
		"Joshua Argent",
		"full stack developer",
		"automation developer",
		"workflow automation",
		"Next.js",
		"TypeScript",
		"JavaScript",
		"PostgreSQL",
		"web developer portfolio",
	],

	authors: [{ name: "Joshua Argent" }],
	creator: "Joshua Argent",
	publisher: "Joshua Argent",

	metadataBase: new URL("https://joshuaargent.vercel.app"),

	openGraph: {
		title: "Joshua Argent | Full Stack Developer & Automation Engineer",
		description:
			"Full stack developer and automation engineer building scalable systems, workflow automation, and modern web applications with TypeScript and Next.js.",
		url: "https://joshuaargent.vercel.app",
		siteName: "Joshua Argent",
		locale: "en_GB",
		type: "website",
		images: [
			{
				url: "/og.png",
				width: 1200,
				height: 630,
				alt: "Joshua Argent - Full Stack Developer & Automation Engineer",
			},
		],
	},

	twitter: {
		card: "summary_large_image",
		title: "Joshua Argent | Full Stack Developer & Automation Engineer",
		description:
			"Building scalable web applications and automation systems with TypeScript, Next.js, and PostgreSQL.",
		images: ["/og.png"],
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				{/* Set theme BEFORE first paint to avoid flash */}
				<script
					dangerouslySetInnerHTML={{
						__html: `
(function () {
    try {
        const stored = localStorage.getItem("theme");
        if (stored === "light" || stored === "dark") {
            document.documentElement.setAttribute("data-theme", stored);
            return;
        }
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
    } catch (e) {}
})();
            `,
					}}
				/>
			</head>

			<body className="flex min-h-screen flex-col">
				<Header />

				<main className="flex-1 w-full max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
					{children}
				</main>

				<Footer />
			</body>
		</html>
	);
}
