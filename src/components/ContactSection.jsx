import { clinic } from "../data/clinic";
import { SectionHeading } from "./SectionHeading";

export function ContactSection() {
  return (
    <section className="shell section-wrap section-divider pt-8">
      <div className="grid gap-5 lg:grid-cols-[1fr_0.92fr] lg:gap-6">
        <div className="section-card p-6 sm:p-10 lg:p-12">
          <SectionHeading
            eyebrow="Contact & Location"
            title={clinic.pages.home.contactTitle}
            copy={clinic.contactBlurb}
          />
          <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 sm:grid-cols-2">
            <div className="surface-panel p-5">
              <p className="eyebrow !tracking-[0.28em]">Call</p>
              <a href={clinic.phoneHref} className="mt-3 block text-lg font-semibold text-ink-900">
                {clinic.phone}
              </a>
            </div>
            <div className="surface-panel p-5">
              <p className="eyebrow !tracking-[0.28em]">Email</p>
              <a href={clinic.emailHref} className="mt-3 block text-lg font-semibold text-ink-900">
                {clinic.email}
              </a>
            </div>
          </div>
          <div className="surface-panel mt-5 p-5">
            <p className="eyebrow !tracking-[0.28em]">Address</p>
            <p className="mt-3 text-lg font-semibold leading-8 text-ink-900">{clinic.addressText}</p>
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4">
            <a href={clinic.ctaLink} className="button-primary w-full sm:w-auto">
              {clinic.pages.home.contactPrimaryCtaLabel}
            </a>
            <a href={clinic.phoneHref} className="button-secondary w-full sm:w-auto">
              {clinic.pages.home.contactSecondaryCtaLabel}
            </a>
          </div>
        </div>
        <div className="section-card overflow-hidden p-2">
          <div className="h-full min-h-[360px] rounded-[1.75rem] bg-clinic-glow p-5 sm:p-8">
            <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-white/80 bg-white/75 p-5 shadow-soft sm:p-7">
              <div>
                <p className="eyebrow !tracking-[0.28em]">Opening Hours</p>
                <div className="mt-4 space-y-3 text-base leading-7 text-ink-700 sm:mt-5">
                  {clinic.hours.map((entry) => (
                    <p key={entry} className="rounded-2xl bg-white/70 px-4 py-3">
                      {entry}
                    </p>
                  ))}
                </div>
              </div>
              <div className="mt-6 rounded-3xl bg-[linear-gradient(180deg,#1f406b_0%,#142b52_100%)] p-5 text-white shadow-float sm:p-6">
                <p className="text-lg leading-8 text-white/90">
                  Prefer a quieter start? Call to arrange a consultation time that fits your schedule.
                </p>
                <a
                  href={clinic.ctaLink}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-full border border-white/20 bg-white px-6 py-3.5 text-sm font-semibold tracking-[0.06em] text-brand-800 shadow-[0_12px_24px_rgba(20,32,51,0.12)] transition duration-300 hover:-translate-y-0.5 sm:w-auto"
                >
                  {clinic.ctaLabel}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
