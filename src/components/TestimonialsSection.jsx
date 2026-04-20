import { clinic } from "../data/clinic";
import { SectionHeading } from "./SectionHeading";

export function TestimonialsSection() {
  return (
    <section className="shell section-wrap section-divider">
      <SectionHeading
        eyebrow="Testimonials"
        title={clinic.pages.home.testimonialsTitle}
        copy={clinic.pages.home.testimonialsCopy}
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {clinic.testimonials.map((item) => (
          <blockquote key={item.quote} className="section-card interactive-card p-7 sm:p-8">
            <div className="mb-6 text-4xl font-display leading-none text-brand-300">“</div>
            <p className="text-[1.08rem] leading-8 text-ink-900">{item.quote}</p>
            <footer className="mt-6 text-sm font-medium uppercase tracking-[0.22em] text-ink-500">{item.author}</footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
