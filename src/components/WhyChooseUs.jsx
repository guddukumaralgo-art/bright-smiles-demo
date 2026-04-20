import { clinic } from "../data/clinic";
import { SectionHeading } from "./SectionHeading";

export function WhyChooseUs() {
  return (
    <section className="shell section-wrap section-divider">
      <div className="section-card p-8 sm:p-10 lg:p-14">
        <SectionHeading
          eyebrow="Why Choose Us"
          title={clinic.pages.home.whyChooseUsTitle}
          copy={clinic.pages.home.whyChooseUsCopy}
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
          {clinic.reasons.map((reason) => (
            <div key={reason.title} className="surface-panel p-6 sm:p-7">
              <h3 className="text-[1.45rem] font-semibold tracking-[-0.03em] text-ink-900">{reason.title}</h3>
              <p className="mt-3 text-base leading-7 text-ink-700">{reason.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
