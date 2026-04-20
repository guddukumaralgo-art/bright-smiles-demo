export function PageHero({ eyebrow, title, copy, primaryLabel = "Book A Consultation", primaryHref = "./contact.html" }) {
  return (
    <section className="shell pb-10 pt-8 sm:pb-12 sm:pt-12">
      <div className="section-card bg-clinic-glow p-8 sm:p-10 lg:p-12">
        <div className="max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-5 font-display text-4xl leading-[1.02] tracking-[-0.04em] text-ink-900 sm:text-5xl lg:text-[3.7rem]">{title}</h1>
          <p className="mt-6 max-w-2xl text-[1.08rem] leading-8 text-ink-700">{copy}</p>
          <a href={primaryHref} className="button-primary mt-8">
            {primaryLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
