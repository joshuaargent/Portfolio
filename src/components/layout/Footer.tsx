import Link from "next/link";
import { siteConfig, footerNav } from "@/lib/constants";
import { Rss, Heart } from "lucide-react";

// ============================================
// Footer Component
// ============================================

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-secondary border-t border-border">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="text-xl font-semibold text-text-primary hover:text-accent transition-colors"
            >
              {siteConfig.name}
            </Link>
            <p className="mt-3 text-sm text-text-secondary max-w-xs">
              {siteConfig.description}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href={siteConfig.links.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-text-secondary hover:text-text-primary hover:bg-bg-primary rounded-lg transition-colors"
                aria-label="YouTube"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-text-secondary hover:text-text-primary hover:bg-bg-primary rounded-lg transition-colors"
                aria-label="GitHub"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href={siteConfig.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-text-secondary hover:text-text-primary hover:bg-bg-primary rounded-lg transition-colors"
                aria-label="Instagram"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href={siteConfig.links.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-text-secondary hover:text-text-primary hover:bg-bg-primary rounded-lg transition-colors"
                aria-label="Facebook"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.413c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.571.238 2.571.238v2.941h-1.455c-1.434 0-1.881.897-1.881 1.818v2.187h3.219l-.484 3.469h-2.735v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={siteConfig.links.strava}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-text-secondary hover:text-text-primary hover:bg-bg-primary rounded-lg transition-colors"
                aria-label="Strava"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066l-2.084 8.116zM12.735 8.403L9.141 0H0l5.338 15.597h3.182l.215-1.397 3.182-7.797h-3.182l.215-2.055 1.833-4.944h-2.918z" />
                </svg>
              </a>
              <a
                href={siteConfig.links.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-text-secondary hover:text-text-primary hover:bg-bg-primary rounded-lg transition-colors"
                aria-label="TikTok"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.12-.41.12-.43 1-.37 1.58.22.24.57.4 1.03.4.04 0 .09.01.14-.03.43-.26.83-.56 1.2-.87.34-.31.75-.51 1.2-.49.33.01.67.16.92.46.13.16.13 1.13-.16 1.56-.33.5-.88.84-1.46.86-.07.01-.15-.02-.22-.02-.04 2.01 1.51 3.98 3.45 4.18 1.08.11 2.18-.2 2.91-1.01.73-.81 1.11-1.87.97-2.92-.14-1.03-.89-1.89-1.99-2.1-.63-.12-1.3-.03-1.89.27-.3.15-.46.47-.44.8v-.01c-.02.32.13.62.38.83.5.41 1.18.36 1.77.23.42-.09.84-.27 1.16-.52.32-.25.49-.69.49-1.12V.02z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Main Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
              Navigate
            </h3>
            <ul className="mt-4 space-y-2">
              {footerNav.main.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Content */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
              Content
            </h3>
            <ul className="mt-4 space-y-2">
              {footerNav.content.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
              Connect
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={`mailto:${siteConfig.links.email}`}
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  Email
                </a>
              </li>
              {footerNav.social.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/feed.xml"
                  className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  <Rss className="h-4 w-4" />
                  RSS Feed
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-text-muted">
              © {currentYear} {siteConfig.name}. All rights reserved.
            </p>
            <p className="text-sm text-text-muted flex items-center gap-1">
              Built with{" "}
              <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" /> using
              Next.js
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
