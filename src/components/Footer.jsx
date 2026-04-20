import { clinic } from "../data/clinic";
import { resolveSharedAssetPath } from "../utils/sharedAssets";

export function Footer() {
  const logoSrc = resolveSharedAssetPath(clinic.images.logo);

  return (
    <footer className="mt-10 border-t border-brand-100/70 bg-[linear-gradient(180deg,#f6fbff_0%,#ffffff_100%)]">
      <div className="shell py-12 sm:py-16">
        <div className="section-card overflow-hidden p-6 sm:p-10 lg:p-12">
          <div className="mb-6 h-px bg-[linear-gradient(90deg,transparent,rgba(47,137,221,0.22),transparent)] sm:mb-8" />
          <div className="grid gap-8 md:grid-cols-[1.25fr_0.8fr_0.85fr] md:gap-10">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-brand-100 bg-white/85 px-4 py-2">
                <img
                  src={logoSrc}
                  alt={`${clinic.shortName} logo`}
                  className="h-10 w-10 rounded-2xl border border-brand-100 bg-white object-cover shadow-[0_14px_30px_rgba(31,111,194,0.10)]"
                />
                <span className="font-display text-2xl tracking-[-0.03em] text-ink-900">{clinic.shortName}</span>
              </div>
              <p className="mt-5 max-w-md text-base leading-7 text-ink-700">
                {clinic.specialty} in {clinic.city}. {clinic.contactBlurb}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href={clinic.ctaLink} className="button-primary w-full sm:w-auto">
                  {clinic.ctaLabel}
                </a>
                <a href={clinic.phoneHref} className="button-secondary w-full sm:w-auto">
                  Call The Clinic
                </a>
              </div>
            </div>

            <div>
              <p className="eyebrow">Pages</p>
              <div className="mt-5 space-y-3 text-sm text-ink-700">
                <a href="./index.html" className="block transition hover:translate-x-1 hover:text-brand-700">
                  Home
                </a>
                <a href="./about.html" className="block transition hover:translate-x-1 hover:text-brand-700">
                  About
                </a>
                <a href="./services.html" className="block transition hover:translate-x-1 hover:text-brand-700">
                  Services
                </a>
                <a href="./contact.html" className="block transition hover:translate-x-1 hover:text-brand-700">
                  Contact
                </a>
              </div>
            </div>

            <div>
              <p className="eyebrow">Contact</p>
              <div className="mt-5 space-y-4 text-sm leading-7 text-ink-700">
                <p className="font-medium text-ink-900">
                  {clinic.name}
                </p>
                <p>
                  {clinic.specialty}, {clinic.city}
                </p>
                <a href={clinic.phoneHref} className="block transition hover:text-brand-700">
                  {clinic.phone}
                </a>
                <a href={clinic.emailHref} className="block transition hover:text-brand-700">
                  {clinic.email}
                </a>
                <p>{clinic.addressText}</p>
                <p className="rounded-3xl bg-accent-50 px-4 py-3 text-ink-600">Static site template ready for future clinic rollouts.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-brand-100/70 pt-5 text-sm text-ink-500 md:mt-10 md:flex-row md:items-center md:justify-between md:gap-4 md:pt-6">
            <p>{clinic.name}. {clinic.footerTagline}</p>
            <p>Built for fast static hosting and multi-page deployment.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
