import { clinic } from "../data/clinic";
import { SectionHeading } from "./SectionHeading";

export function DoctorPreview() {
  return (
    <section className="shell section-wrap section-divider">
      <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-10">
        <div className="section-card bg-clinic-glow p-6 sm:p-10 lg:p-12">
          <div className="surface-panel p-6 sm:p-8">
            <p className="eyebrow">Lead Clinician</p>
            <h3 className="mt-4 font-display text-3xl text-ink-900">{clinic.doctorName}</h3>
            <p className="mt-2 text-sm uppercase tracking-[0.25em] text-ink-500">{clinic.specialty}</p>
            <div className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
              {clinic.doctorCredentials.map((item) => (
                <div key={item} className="rounded-2xl bg-accent-50 px-4 py-3 text-sm text-ink-700 transition duration-300 hover:bg-white">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:pl-4">
          <SectionHeading
            eyebrow="About The Doctor"
            title={clinic.pages.home.doctorSectionTitle}
            copy={clinic.aboutText}
          />
          <p className="mt-6 max-w-2xl text-[1rem] leading-7 text-ink-700 sm:mt-7 sm:text-[1.02rem] sm:leading-8">
            {clinic.pages.home.doctorSectionBody}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4">
            <a href="./about.html" className="button-secondary w-full sm:w-auto">
              {clinic.pages.home.aboutPrimaryCtaLabel}
            </a>
            <a href={clinic.ctaLink} className="button-primary w-full sm:w-auto">
              {clinic.pages.home.aboutSecondaryCtaLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
