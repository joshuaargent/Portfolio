import Link from "next/link";
import {
	SiNextdotjs,
	SiTypescript,
	SiJavascript,
	SiRender,
	SiHtml5,
	SiExpress,
	SiPostgresql,
	SiTailwindcss,
	SiNodedotjs,
	SiVercel,
	SiNetlify,
	SiGit,
	SiGithub,
	SiCss3,
	SiReact,
} from "react-icons/si";
import type { ReactNode } from "react";

function ValueProp({
	title,
	description,
}: {
	title: string;
	description: string;
}) {
	return (
		<div className="bg-card p-6 hover-card space-y-2">
			<h3 className="font-semibold text-lg">{title}</h3>
			<p className="text-sm text-text-muted leading-relaxed">
				{description}
			</p>
		</div>
	);
}

function Skill({ name, icon }: { name: string; icon?: ReactNode }) {
	return (
		<div className="flex items-center gap-2 px-4 py-2 bg-card-soft rounded-md text-sm font-medium text-text-subtle hover:bg-accent-soft transition-colors">
			{icon && icon}
			<span>{name}</span>
		</div>
	);
}

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
				<p className="text-sm text-text-muted mt-2 leading-relaxed">
					{description}
				</p>
				<p className="text-xs text-text-subtle mt-3">{stack}</p>
			</div>

			<div className="flex gap-3 pt-4 flex-wrap">
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

export default function HomePage() {
	return (
		<div className="container py-16 space-y-16 md:space-y-20">
			{/* HERO */}
			<section className="max-w-3xl space-y-4 md:space-y-6">
				<h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
					Full Stack Web Developer
				</h1>

				<p className="text-lg md:text-xl">
					Building scalable web applications and automation systems.
				</p>

				<p className="text-text-muted max-w-2xl leading-relaxed">
					I’m Joshua Argent. I build full stack applications with a
					strong focus on automating workflows, extracting insights
					from data, and reducing manual processes.
				</p>

				<div className="flex flex-wrap gap-4 pt-4">
					<Link href="/projects">
						<button className="px-4 py-2 bg-accent-button text-button-text rounded-lg font-semibold hover:bg-accent-button-hover transition-colors">
							View Projects
						</button>
					</Link>

					<Link href="/about">
						<button
							className="px-3 py-1 bg-card border border-[var(--color-border)] rounded-md hover:bg-accent-soft transition-colors"
							style={{ color: "var(--color-text)" }}
						>
							About Me
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

			{/* VALUE PROPOSITION */}
			<section className="grid md:grid-cols-3 gap-6">
				<ValueProp
					title="End to End Systems"
					description="From frontend UX to backend APIs, database design, integrations, and deployment."
				/>
				<ValueProp
					title="Automation & Data Focus"
					description="Building systems for scraping, analysis, and workflow automation."
				/>
				<ValueProp
					title="Production Ready Engineering"
					description="Authentication, validation, error handling, and performance built in."
				/>
			</section>

			{/* SKILLS */}
			<section className="space-y-4">
				<h2 className="text-2xl font-bold">Core Skills</h2>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap gap-3">
					<Skill
						name="JavaScript"
						icon={<SiJavascript size={18} />}
					/>
					<Skill
						name="TypeScript"
						icon={<SiTypescript size={18} />}
					/>
					<Skill
						name="PostgreSQL"
						icon={<SiPostgresql size={18} />}
					/>
					<Skill name="HTML5" icon={<SiHtml5 size={18} />} />
					<Skill name="CSS3" icon={<SiCss3 size={18} />} />
					<Skill
						name="Tailwind CSS"
						icon={<SiTailwindcss size={18} />}
					/>
					<Skill name="React" icon={<SiReact size={18} />} />
					<Skill name="Next.js" icon={<SiNextdotjs size={18} />} />
					<Skill name="Express.js" icon={<SiExpress size={18} />} />
					<Skill name="Node.js" icon={<SiNodedotjs size={18} />} />
					<Skill name="Vercel" icon={<SiVercel size={18} />} />
					<Skill name="Netlify" icon={<SiNetlify size={18} />} />
					<Skill name="Render" icon={<SiRender size={18} />} />
					<Skill name="Git" icon={<SiGit size={18} />} />
					<Skill name="Github" icon={<SiGithub size={18} />} />
				</div>
			</section>

			{/* PROJECTS */}
			<section className="space-y-10">
				<div className="flex justify-between items-end">
					<h2 className="text-3xl font-bold">Featured Projects</h2>
					<Link href="/projects" className="text-sm font-medium">
						View All
					</Link>
				</div>

				<div className="grid md:grid-cols-2 gap-8">
					<ProjectPreview
						title="PingElo"
						description="Ranked table tennis platform for tracking matches and leaderboards."
						stack="Next.js • TypeScript • Express • PostgreSQL"
						href="/projects/pingelo"
						live="https://pingelo.leapcell.app"
						status="Active"
					/>
				</div>
			</section>
		</div>
	);
}
