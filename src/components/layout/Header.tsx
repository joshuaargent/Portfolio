"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
	const [open, setOpen] = useState(false);

	const navLinks = [
		{ href: "/projects", label: "Projects" },
		{ href: "/about", label: "About" },
		{ href: "/contact", label: "Contact" },
	];

	return (
		<header className="bg-card sticky top-0 z-50">
			<div className="container py-4 flex items-center justify-between">
				{/* Identity */}
				<Link
					href="/"
					className="text-2xl font-bold tracking-tight text-text"
				>
					Joshua Argent
				</Link>

				{/* Desktop Navigation */}
				<nav className="hidden md:flex items-center gap-6 text-sm font-medium">
					{navLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className="text-text-nav hover:text-accent-hover"
						>
							{link.label}
						</Link>
					))}

					{/* Resume as button */}
					<Link
						href="/resume.pdf"
						target="_blank"
						rel="noopener noreferrer"
					>
						<button className="px-4 py-2 bg-accent-button text-button-text rounded-lg font-semibold hover:bg-accent-button-hover transition-colors">
							Resume
						</button>
					</Link>
				</nav>

				{/* Mobile Menu Button */}
				<button
					className="md:hidden p-2 text-text"
					onClick={() => setOpen((v) => !v)}
					aria-label={open ? "Close menu" : "Open menu"}
				>
					{open ? <X size={24} /> : <Menu size={24} />}
				</button>
			</div>

			{/* Mobile Navigation */}
			<nav
				className={`md:hidden bg-card-square overflow-hidden ${
					open
						? "max-h-80 py-4 pointer-events-auto"
						: "max-h-0 pointer-events-none"
				}`}
				aria-hidden={!open}
			>
				<div className="flex flex-col gap-2 px-4">
					{navLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className="py-2 text-text-nav hover:text-accent-hover"
							onClick={() => setOpen(false)}
						>
							{link.label}
						</Link>
					))}

					<Link
						href="/resume.pdf"
						target="_blank"
						rel="noopener noreferrer"
						onClick={() => setOpen(false)}
					>
						<button className="px-4 py-2 bg-accent-button text-button-text rounded-lg font-semibold hover:bg-accent-button-hover transition-colors">
							Resume
						</button>
					</Link>
				</div>
			</nav>
		</header>
	);
}
