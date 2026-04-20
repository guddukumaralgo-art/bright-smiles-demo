import { useState } from "react";
import { clinic } from "../data/clinic";
import { resolveSharedAssetPath } from "../utils/sharedAssets";

const navItems = [
  { label: "Home", href: "./index.html" },
  { label: "About", href: "./about.html" },
  { label: "Services", href: "./services.html" },
  { label: "Contact", href: "./contact.html" }
];

export function Header({ currentPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const logoSrc = resolveSharedAssetPath(clinic.images.logo);

  return (
    <header className="sticky top-0 z-30 border-b border-white/70 bg-white/80 backdrop-blur-2xl">
      <div className="shell flex min-h-[84px] items-center justify-between gap-6">
        <a href="./index.html" className="group flex items-center gap-3">
          <img
            src={logoSrc}
            alt={`${clinic.shortName} logo`}
            className="h-11 w-11 rounded-2xl border border-brand-100 bg-white object-cover shadow-[0_14px_34px_rgba(31,111,194,0.12)] transition duration-300 group-hover:-translate-y-0.5"
          />
          <div>
            <div className="font-display text-[1.35rem] tracking-[-0.03em] text-ink-900">{clinic.shortName}</div>
            <div className="text-[0.68rem] uppercase tracking-[0.34em] text-ink-500">{clinic.specialty}</div>
          </div>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`nav-link ${currentPage === item.label ? "nav-link-active" : ""}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a href={clinic.ctaLink} className="button-primary hidden md:inline-flex">
          {clinic.ctaLabel}
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-200 bg-white/90 text-brand-700 shadow-[0_10px_24px_rgba(20,32,51,0.08)] transition duration-300 hover:-translate-y-0.5 hover:border-brand-300 md:hidden"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
        >
          <span className="relative h-4 w-5">
            <span
              className={`absolute left-0 top-0 block h-0.5 w-5 rounded-full bg-current transition duration-300 ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] block h-0.5 w-5 rounded-full bg-current transition duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] block h-0.5 w-5 rounded-full bg-current transition duration-300 ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        className={`border-t border-white/70 bg-white/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 overflow-hidden opacity-0"
        }`}
      >
        <div className="shell flex flex-col gap-3 py-4">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`rounded-2xl px-4 py-3 text-sm font-semibold transition duration-300 ${
                currentPage === item.label ? "bg-brand-50 text-brand-700" : "text-ink-700 hover:bg-accent-50 hover:text-brand-700"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a href={clinic.ctaLink} className="button-primary mt-2" onClick={() => setMenuOpen(false)}>
            {clinic.ctaLabel}
          </a>
        </div>
      </div>
    </header>
  );
}
