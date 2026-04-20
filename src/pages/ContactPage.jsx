import { PageHero } from "../components/PageHero";
import { clinic } from "../data/clinic";
import { SiteShell } from "../layouts/SiteShell";

export function ContactPage() {
  return (
    <SiteShell currentPage="Contact">
      <PageHero
        eyebrow="Contact"
        title={clinic.pages.contact.heroTitle}
        copy={clinic.pages.contact.heroCopy}
      />
      <section className="shell pb-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="section-card p-8 sm:p-10">
            <h2 className="font-display text-3xl text-ink-900">Contact Details</h2>
            <div className="mt-8 space-y-5">
              <div className="rounded-3xl bg-accent-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-700">Phone</p>
                <a href={clinic.phoneHref} className="mt-3 block text-xl font-semibold text-ink-900">
                  {clinic.phone}
                </a>
              </div>
              <div className="rounded-3xl bg-accent-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-700">Email</p>
                <a href={clinic.emailHref} className="mt-3 block text-xl font-semibold text-ink-900">
                  {clinic.email}
                </a>
              </div>
              <div className="rounded-3xl bg-accent-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-700">Address</p>
                <p className="mt-3 text-xl font-semibold leading-8 text-ink-900">{clinic.addressText}</p>
              </div>
            </div>
          </div>
          <div className="section-card p-8 sm:p-10">
            <h2 className="font-display text-3xl text-ink-900">Opening Hours</h2>
            <div className="mt-8 space-y-4 text-base leading-7 text-ink-700">
              {clinic.hours.map((entry) => (
                <p key={entry} className="rounded-3xl bg-accent-50 px-5 py-4">
                  {entry}
                </p>
              ))}
            </div>
            <div className="mt-8 rounded-[1.75rem] bg-brand-900 p-6 text-white">
              <p className="text-lg leading-8 text-white/90">
                {clinic.pages.contact.reuseNote}
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
