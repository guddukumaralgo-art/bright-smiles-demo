import { PageHero } from "../components/PageHero";
import { SectionHeading } from "../components/SectionHeading";
import { clinic } from "../data/clinic";
import { SiteShell } from "../layouts/SiteShell";
import { resolveSharedAssetPath } from "../utils/sharedAssets";

export function AboutPage() {
  const doctorImageSrc = resolveSharedAssetPath(clinic.images.doctor);
  const galleryImages = clinic.images.gallery.map((imagePath) => resolveSharedAssetPath(imagePath));

  return (
    <SiteShell currentPage="About">
      <PageHero
        eyebrow="About The Practice"
        title={clinic.pages.about.heroTitle}
        copy={clinic.pages.about.heroCopy}
      />
      <section className="shell pb-10">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="section-card p-8 sm:p-10">
            <img
              src={doctorImageSrc}
              alt={clinic.doctorName}
              className="h-64 w-full rounded-[1.75rem] object-cover"
            />
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.35em] text-brand-700">Lead Dentist</p>
            <h2 className="mt-4 font-display text-3xl text-ink-900">{clinic.doctorName}</h2>
            <p className="mt-2 text-sm uppercase tracking-[0.25em] text-ink-500">{clinic.specialty}</p>
            <p className="mt-6 text-base leading-7 text-ink-700">{clinic.aboutText}</p>
          </div>
          <div className="section-card p-8 sm:p-10">
            <SectionHeading
              eyebrow="Practice Philosophy"
              title={clinic.pages.about.philosophyTitle}
              copy={clinic.pages.about.philosophyCopy}
            />
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {clinic.pages.about.values.map((value) => (
                <div key={value.title} className="rounded-3xl bg-accent-50 p-5">
                  <h3 className="text-xl font-semibold text-ink-900">{value.title}</h3>
                  <p className="mt-3 text-base leading-7 text-ink-700">{value.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="shell pb-16">
        <div className="section-card p-8 sm:p-10 lg:p-12">
          <SectionHeading
            eyebrow="What Patients Can Expect"
            title={clinic.pages.about.expectTitle}
            copy={clinic.pages.about.expectCopy}
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {clinic.pages.about.expectSteps.map((step, index) => (
              <div key={step} className="rounded-[1.75rem] border border-brand-100 bg-white p-6 shadow-soft">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-700">Step {index + 1}</p>
                <p className="mt-4 text-lg leading-8 text-ink-900">{step}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {galleryImages.map((imageSrc, index) => (
              <img
                key={imageSrc}
                src={imageSrc}
                alt={`${clinic.shortName} gallery ${index + 1}`}
                className="h-64 w-full rounded-[1.75rem] object-cover"
              />
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
