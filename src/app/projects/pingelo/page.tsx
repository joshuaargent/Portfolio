import Link from "next/link";

function Section({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<section className="space-y-8">
			<h2 className="text-2xl font-bold">{title}</h2>
			{children}
		</section>
	);
}

function Card({ children }: { children: React.ReactNode }) {
	return <div className="bg-card p-6 hover-card space-y-3">{children}</div>;
}

export default function PingEloProjectPage() {
	return (
		<div className="container py-16 space-y-20">
			{/* HEADER */}
			<section className="max-w-3xl space-y-6">
				<h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
					PingElo
				</h1>
				<p className="text-lg">
					A free competitive ranking platform for groups of table
					tennis players, built around a custom Elo based system and
					designed for real world usage.
				</p>

				<div className="flex flex-wrap gap-4 pt-2">
					<a
						href="https://pingelo.leapcell.app"
						target="_blank"
						rel="noopener noreferrer"
					>
						<button className="px-4 py-2 bg-accent-button text-button-text rounded-lg font-semibold hover:bg-accent-button-hover transition-colors">
							Live Site
						</button>
					</a>

					<Link href="/projects">
						<button
							className="px-3 py-1 bg-card border border-[var(--color-border)] rounded-md hover:bg-accent-soft transition-colors"
							style={{ color: "var(--color-text)" }}
						>
							All Projects
						</button>
					</Link>
				</div>
			</section>

			{/* TECH STACK & FEATURES */}
			<Section title="Tech Stack & Key Features">
				<div className="grid md:grid-cols-2 gap-6">
					<Card>
						<h3 className="font-semibold">Frontend & Backend</h3>
						<ul className="list-disc pl-5 text-text-muted space-y-1">
							<li>Next.js + TypeScript</li>
							<li>React, Tailwind CSS</li>
							<li>Express + TypeScript API</li>
							<li>Supabase PostgreSQL</li>
							<li>Leapcell (frontend & backend)</li>
						</ul>
					</Card>

					<Card>
						<h3 className="font-semibold">Core Features</h3>
						<ul className="list-disc pl-5 text-text-muted space-y-1">
							<li>Custom Elo ranking (singles & doubles)</li>
							<li>Flexible player system & claim codes</li>
							<li>
								Match validation (win by 2, score formats, group
								checks)
							</li>
							<li>
								Admin & manager dashboards for match & group
								management
							</li>
							<li>Infinite scroll & paginated API responses</li>
						</ul>
					</Card>
				</div>
			</Section>

			{/* OVERVIEW */}
			<Section title="Overview">
				<div className="max-w-3xl space-y-4 text-text-muted leading-relaxed">
					<p>
						PingElo was built to solve a real problem in my college
						table tennis group: tracking rankings, determining
						relative skill levels, and running tournaments without
						spreadsheets or paid software.
					</p>
					<p>
						The platform is actively used by my group and supports
						any collection of players who want a fair, automated,
						and competitive ranking system with minimal friction.
					</p>
				</div>
			</Section>

			{/* PROBLEM & SOLUTION */}
			<Section title="Problem & Solution">
				<div className="grid md:grid-cols-2 gap-8">
					<Card>
						<h3 className="text-lg font-semibold">Problem</h3>
						<ul className="list-disc pl-5 text-text-muted space-y-1">
							<li>
								Manual ranking made tournaments and leaderboards
								unreliable.
							</li>
							<li>
								Existing solutions were either paid or not
								flexible for small groups.
							</li>
						</ul>
					</Card>

					<Card>
						<h3 className="text-lg font-semibold">Solution</h3>
						<ul className="list-disc pl-5 text-text-muted space-y-1">
							<li>
								Custom Elo system with point margin & upset
								handling.
							</li>
							<li>
								Validation & automation reduce manual errors.
							</li>
							<li>
								Player claim system allows participation without
								accounts.
							</li>
							<li>
								Admin & manager dashboards for flexible control.
							</li>
						</ul>
					</Card>
				</div>
			</Section>

			{/* SCREENSHOT */}
			<Section title="Product Screenshot">
				<Card>
					<img
						src="/pingelo-screenshot.png"
						alt="PingElo Leaderboard Screenshot"
						className="w-full rounded-lg border border-[var(--color-border)]"
					/>
					<p className="text-sm text-text-muted mt-2">
						Leaderboard - all data updates in real time with Elo
						calculations.
					</p>
				</Card>
			</Section>

			{/* VALIDATION & ROLES */}
			<Section title="Validation, Permissions & Roles">
				<div className="grid md:grid-cols-3 gap-6">
					<Card>
						<h3 className="font-semibold">Match Validation</h3>
						<ul className="list-disc pl-5 text-text-muted space-y-1">
							<li>Win by two enforcement</li>
							<li>Score format checks</li>
							<li>Group membership validation</li>
						</ul>
					</Card>

					<Card>
						<h3 className="font-semibold">Authentication</h3>
						<p className="text-text-muted">
							Authenticated users can create matches. Admins can
							submit and edit matches on behalf of players.
						</p>
					</Card>

					<Card>
						<h3 className="font-semibold">Roles</h3>
						<ul className="list-disc pl-5 text-text-muted space-y-1">
							<li>Players</li>
							<li>Group Admins</li>
							<li>Managers (multi group control)</li>
						</ul>
					</Card>
				</div>
			</Section>

			{/* ELO SYSTEM */}
			<Section title="Custom Elo System">
				<div className="grid md:grid-cols-2 gap-8">
					<Card>
						<p className="text-text-muted leading-relaxed">
							The Elo system adjusts ratings based on match
							outcomes, point differences, and relative player
							skill. Separate calculations exist for singles and
							doubles.
						</p>
					</Card>
					<Card>
						<ul className="list-disc pl-5 text-text-muted space-y-1">
							<li>Higher gains for upsets</li>
							<li>Lower changes for expected wins</li>
							<li>Reduced impact for close matches</li>
							<li>
								Historical tracking enables leaderboard
								analytics
							</li>
						</ul>
					</Card>
				</div>
			</Section>

			{/* REFLECTION & NEXT STEPS */}
			<Section title="Reflection & Future Work">
				<div className="grid md:grid-cols-3 gap-6">
					<Card>
						<h3 className="font-semibold">Proudest Achievement</h3>
						<p className="text-text-muted">
							The Elo system and flexible player model that allows
							participation without mandatory accounts.
						</p>
					</Card>

					<Card>
						<h3 className="font-semibold">What I’d Change</h3>
						<p className="text-text-muted">
							I would design groups and tournaments first to avoid
							later scalability refactors.
						</p>
					</Card>

					<Card>
						<h3 className="font-semibold">Next Steps</h3>
						<ul className="list-disc pl-5 text-text-muted space-y-1">
							<li>Complete manager dashboard</li>
							<li>Improve tournament tooling</li>
							<li>Add automated tests for Elo calculations</li>
						</ul>
					</Card>
				</div>
			</Section>

			{/* CTA */}
			<section>
				<p className="text-sm text-text-subtle">
					Interested in working together?{" "}
					<Link
						href="/contact"
						className="underline hover:text-text transition"
					>
						Get in touch
					</Link>
				</p>
			</section>
		</div>
	);
}
