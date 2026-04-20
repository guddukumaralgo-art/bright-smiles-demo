import { PageHero } from "../components/PageHero";
import { SectionHeading } from "../components/SectionHeading";
import { clinic } from "../data/clinic";
import { SiteShell } from "../layouts/SiteShell";

export function ServicesPage() {
  return (
    <SiteShell currentPage="Services">
      <PageHero
        eyebrow="Dental Services"
        title={clinic.pages.services.heroTitle}
        copy={clinic.pages.services.heroCopy}
      />
      <section className="shell pb-10">
        <div className="grid gap-6 md:grid-cols-2">
          {clinic.services.map((service) => (
            <article key={service.title} className="section-card p-8">
              <h2 className="text-2xl font-semibold text-ink-900">{service.title}</h2>
              <p className="mt-4 text-base leading-7 text-ink-700">{service.description}</p>
              <a href="./contact.html" className="button-secondary mt-6">
                Ask About {service.title}
              </a>
            </article>
          ))}
        </div>
      </section>
      <section className="shell pb-16">
        <div className="section-card p-8 sm:p-10 lg:p-12">
          <SectionHeading
            eyebrow="How Care Is Planned"
            title={clinic.pages.services.processTitle}
            copy={clinic.pages.services.processCopy}
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-4">
            {clinic.pages.services.processSteps.map((item, index) => (
              <div key={item} className="rounded-3xl bg-accent-50 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-700">0{index + 1}</p>
                <p className="mt-3 text-lg leading-8 text-ink-900">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
