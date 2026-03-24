import Link from "next/link";

function ProjectPreview({
	title,
	description,
	stack,
	href,
	github,
	live,
	status,
}: {
	title: string;
	description: string;
	stack: string;
	href: string;
	github?: string;
	live?: string;
	status?: string;
}) {
	return (
		<div className="bg-card p-6 hover-card flex flex-col justify-between space-y-6">
			<div className="space-y-3">
				<div className="flex items-center justify-between gap-4">
					<h3 className="text-xl font-semibold">{title}</h3>
					{status && (
						<span className="text-xs px-2 py-1 rounded-md bg-card-soft text-text-subtle">
							{status}
						</span>
					)}
				</div>

				<p className="text-sm text-text-muted leading-relaxed">
					{description}
				</p>

				<p className="text-xs text-text-subtle">{stack}</p>
			</div>

			<div className="flex flex-wrap gap-3">
				<Link href={href}>
					<button
						className="px-4 py-2 bg-card border border-[var(--color-border)] rounded-md hover:bg-accent-soft transition-colors"
						style={{ color: "var(--color-text)" }}
					>
						Details
					</button>
				</Link>

				{github && (
					<a href={github} target="_blank" rel="noopener noreferrer">
						<button
							className="px-3 py-1 bg-card border border-[var(--color-border)] rounded-md hover:bg-accent-soft transition-colors"
							style={{ color: "var(--color-text)" }}
						>
							GitHub
						</button>
					</a>
				)}

				{live && (
					<a href={live} target="_blank" rel="noopener noreferrer">
						<button className="px-4 py-2 bg-accent-button text-button-text rounded-lg font-semibold hover:bg-accent-button-hover transition-colors">
							Live
						</button>
					</a>
				)}
			</div>
		</div>
	);
}

export default function ProjectsPage() {
	return (
		<div className="container py-16 space-y-20">
			{/* HEADER */}
			<section className="max-w-3xl space-y-6">
				<h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
					Projects
				</h1>

				<p className="text-lg">
					A selection of full stack applications focused on
					automation, data, and real world usability.
				</p>

				<p className="text-text-muted leading-relaxed">
					These projects reflect how I design systems end to end. From
					problem definition and data modeling to backend logic,
					frontend UX, and deployment.
				</p>
			</section>

			{/* PROJECTS GRID */}
			<section className="grid md:grid-cols-2 gap-8">
				<ProjectPreview
					title="PingElo"
					description="Ranked table tennis platform for tracking matches and leaderboards."
					stack="Next.js • TypeScript • Express • PostgreSQL"
					href="/projects/pingelo"
					live="https://pingelo.leapcell.app"
					status="Active"
				/>
			</section>

			{/* CTA */}
			<section>
				<p className="text-sm text-text-subtle">
					Interested in how I work?{" "}
					<Link
						href="/about"
						className="underline hover:text-text transition"
					>
						About me
					</Link>
				</p>
			</section>
		</div>
	);
}
