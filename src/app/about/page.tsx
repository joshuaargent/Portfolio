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

export default function AboutPage() {
	return (
		<div className="container py-16 space-y-14">
			{/* INTRO */}
			<section className="max-w-3xl space-y-3">
				<h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
					About Me
				</h1>

				<p className="text-lg">
					I’m Joshua Argent, a full stack web developer based in
					Surrey, UK.
				</p>

				<p className="text-text-muted leading-relaxed">
					I build end to end web systems with a strong focus on
					backend engineering, automation, and data driven workflows.
					I enjoy taking slow, manual, or inefficient processes and
					turning them into systems that are reliable, scalable, and
					easy to use.
				</p>

				<p className="text-text-muted leading-relaxed">
					While I work across the full stack, my strengths are in
					backend development, system design, and automation -
					building tools that save time, reduce errors, and scale
					cleanly.
				</p>
			</section>

			{/* FOCUS */}
			<Section title="What I Focus On">
				<div className="grid md:grid-cols-3 gap-6">
					<Card>
						<h3 className="font-semibold">
							Shipping Complete Systems
						</h3>
						<p className="text-text-muted">
							I build full applications from frontend to backend,
							including APIs, databases, authentication,
							validation, and deployment. I focus on systems that
							work properly in real world usage, not just demos.
						</p>
					</Card>

					<Card>
						<h3 className="font-semibold">
							Automation & Efficiency
						</h3>
						<p className="text-text-muted">
							I love automating workflows, scraping data, reducing
							repetitive tasks, and building systems that replace
							manual processes. Making things faster and more
							reliable is what I enjoy most.
						</p>
					</Card>

					<Card>
						<h3 className="font-semibold">
							Backend & Data Oriented Thinking
						</h3>
						<p className="text-text-muted">
							I’m particularly interested in backend engineering,
							data modelling, and system logic. My frontend work
							is intentionally minimal and clean, allowing the
							underlying system to do the heavy lifting.
						</p>
					</Card>
				</div>
			</Section>

			{/* BACKGROUND */}
			<Section title="Background">
				<div className="max-w-3xl space-y-4 text-text-muted leading-relaxed">
					<p>
						I’m currently 17 and studying A level Computer Science
						in the UK. I started programming seriously after getting
						a laptop for my course and quickly moved beyond
						coursework into building real projects that solve actual
						problems.
					</p>

					<p>
						Projects like PingElo came directly from things I wanted
						to use with friends - tracking rankings, automating
						scoring, and removing the need for spreadsheets or
						manual management. Seeing people actively use and
						benefit from systems I’ve built is one of the main
						reasons I enjoy full stack development and automation.
					</p>

					<p>
						I’m still early in my career, but I focus on writing
						production ready code and building systems properly from
						the start, rather than treating projects as throwaway
						experiments.
					</p>
				</div>
			</Section>

			{/* OPPORTUNITIES */}
			<Section title="What I’m Looking For">
				<div className="grid md:grid-cols-2 gap-6">
					<Card>
						<h3 className="font-semibold">Employment</h3>
						<p className="text-text-muted">
							I’m actively looking for opportunities where I can
							work as a developer, learn from experienced
							engineers, and contribute to real production
							systems. Particularly roles involving backend
							development, automation, or full stack work.
						</p>
					</Card>

					<Card>
						<h3 className="font-semibold">
							Freelance & Automation Work
						</h3>
						<p className="text-text-muted">
							Alongside employment, I’m open to building full
							stack applications and automation systems for
							individuals, teams, and businesses who want to
							streamline workflows, process data, or replace
							manual operations with reliable software.
						</p>
					</Card>
				</div>
			</Section>

			{/* CTA */}
			<section className="max-w-3xl space-y-6">
				<p className="text-text-muted">
					If you’d like to work with me, discuss a role, or explore an
					automation project, feel free to get in touch.
				</p>

				<div className="flex flex-wrap gap-4">
					<Link href="/contact">
						<button className="px-4 py-2 bg-accent-button text-button-text rounded-lg font-semibold hover:bg-accent-button-hover transition-colors">
							Contact
						</button>
					</Link>

					<Link
						href="/resume.pdf"
						target="_blank"
						rel="noopener noreferrer"
					>
						<button
							className="px-3 py-1 bg-card border border-[var(--color-border)] rounded-md hover:bg-accent-soft transition-colors"
							style={{ color: "var(--color-text)" }}
						>
							Resume
						</button>
					</Link>

					<a
						href="https://github.com/joshu-git"
						target="_blank"
						rel="noopener noreferrer"
					>
						<button
							className="px-3 py-1 bg-card border border-[var(--color-border)] rounded-md hover:bg-accent-soft transition-colors"
							style={{ color: "var(--color-text)" }}
						>
							GitHub
						</button>
					</a>
				</div>
			</section>
		</div>
	);
}
