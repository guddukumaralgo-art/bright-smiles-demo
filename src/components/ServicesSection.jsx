import { clinic } from "../data/clinic";
import { SectionHeading } from "./SectionHeading";

export function ServicesSection() {
  return (
    <section className="shell section-wrap section-divider">
      <SectionHeading
        eyebrow="Services"
        title={clinic.pages.home.servicesTitle}
        copy={clinic.pages.home.servicesCopy}
      />
      <div className="mt-10 grid gap-5 md:mt-12 md:grid-cols-2 md:gap-6">
        {clinic.services.map((service, index) => (
          <article key={service.title} className="section-card interactive-card flex h-full flex-col p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-4">
              <div className="micro-icon">
                {index === 0 ? <span className="h-3 w-3 rounded-full bg-brand-500" /> : null}
                {index === 1 ? <span className="h-3 w-3 rounded-[0.35rem] border border-brand-500" /> : null}
                {index === 2 ? <span className="h-px w-4 bg-brand-500" /> : null}
                {index === 3 ? <span className="h-3 w-3 rotate-45 border border-brand-500" /> : null}
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-700">Private Care</p>
            </div>
            <h3 className="text-[1.55rem] font-semibold tracking-[-0.03em] text-ink-900 sm:text-[1.7rem]">{service.title}</h3>
            <p className="mt-4 flex-1 text-base leading-7 text-ink-700">{service.description}</p>
            <a
              href="./contact.html"
              className="mt-7 inline-flex items-center text-sm font-semibold tracking-[0.08em] text-brand-700 transition hover:translate-x-1"
            >
              Enquire About This Service
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
