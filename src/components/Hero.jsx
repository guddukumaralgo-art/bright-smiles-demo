import { useEffect, useRef } from "react";
import { clinic } from "../data/clinic";
import { resolveSharedAssetPath } from "../utils/sharedAssets";

export function Hero() {
  const heroRef = useRef(null);
  const heroImageSrc = resolveSharedAssetPath(clinic.images.hero);
  const doctorImageSrc = resolveSharedAssetPath(clinic.images.doctor);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const moveX = (x - centerX) / centerX;
      const moveY = (y - centerY) / centerY;

      const bg1 = heroRef.current.querySelector('.bg-blur-1');
      const bg2 = heroRef.current.querySelector('.bg-blur-2');
      if (bg1) bg1.style.transform = `translate(${moveX * 20}px, ${moveY * 20}px)`;
      if (bg2) bg2.style.transform = `translate(${moveX * -15}px, ${moveY * -15}px)`;
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener('mousemove', handleMouseMove);
      return () => hero.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <section ref={heroRef} className="shell pb-6 pt-6 sm:pb-12 sm:pt-12 lg:pb-16 lg:pt-16">
      <div className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:gap-8">
        <div className="section-card relative overflow-hidden p-6 sm:p-10 lg:p-14">
          <div className="absolute inset-0 bg-clinic-glow opacity-70" />
          <div className="bg-blur-1 absolute -left-16 top-12 h-40 w-40 rounded-full bg-brand-100/50 blur-3xl" />
          <div className="bg-blur-2 absolute bottom-0 right-0 h-48 w-48 rounded-full bg-accent-100/80 blur-3xl" />
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(47,137,221,0.35),transparent)]" />

          <div className="relative">
            <div className="inline-flex items-center gap-3 rounded-full border border-brand-100 bg-white/80 px-4 py-2 shadow-[0_10px_30px_rgba(20,32,51,0.06)]">
              <span className="h-2 w-2 rounded-full bg-brand-500" />
              <p className="eyebrow !tracking-[0.32em]">{clinic.specialty}</p>
            </div>

            <h1 className="mt-6 max-w-3xl font-display text-[2.5rem] leading-[0.98] tracking-[-0.05em] text-ink-900 sm:mt-7 sm:text-[4.1rem] lg:text-[5.25rem]">
              {clinic.heroHeadline}
            </h1>
            <p className="mt-5 max-w-2xl text-[1rem] leading-7 text-ink-700 sm:mt-7 sm:text-[1.16rem] sm:leading-8">{clinic.subheadline}</p>

            <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:gap-4">
              <a href={clinic.ctaLink} className="button-primary w-full sm:w-auto">
                {clinic.pages.home.heroPrimaryCtaLabel}
              </a>
              <a href={clinic.phoneHref} className="button-secondary w-full sm:w-auto">
                {clinic.pages.home.heroSecondaryCtaLabel}
              </a>
            </div>

            <div className="mt-8 grid max-w-2xl gap-3 sm:mt-10 sm:gap-4 sm:grid-cols-3">
              <div className="surface-panel p-4">
                <div className="micro-icon">
                  <span className="h-2.5 w-2.5 rounded-full bg-brand-500" />
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.28em] text-brand-700">Experience</p>
                <p className="mt-3 text-lg font-semibold leading-7 text-ink-900">Calm, unhurried appointments</p>
              </div>
              <div className="surface-panel p-4">
                <div className="micro-icon">
                  <span className="h-px w-4 bg-brand-500" />
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.28em] text-brand-700">Planning</p>
                <p className="mt-3 text-lg font-semibold leading-7 text-ink-900">Clear options and next steps</p>
              </div>
              <div className="surface-panel p-4">
                <div className="micro-icon">
                  <span className="h-3 w-3 rounded-[0.4rem] border border-brand-500" />
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.28em] text-brand-700">Setting</p>
                <p className="mt-3 text-lg font-semibold leading-7 text-ink-900">Quiet private clinic atmosphere</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-8 top-12 hidden h-40 w-40 rounded-full bg-brand-100/45 blur-3xl lg:block" />
          <div className="section-card relative overflow-hidden p-2.5 sm:p-4">
            <div className="absolute inset-0 bg-clinic-glow opacity-80" />
            <div className="relative rounded-[2rem] border border-white/80 bg-white/75 p-5 shadow-soft sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={doctorImageSrc}
                    alt={clinic.doctorName}
                    className="h-16 w-16 rounded-3xl border border-brand-100 object-cover shadow-[0_18px_40px_rgba(31,111,194,0.16)]"
                  />
                  <div>
                    <p className="text-lg font-semibold text-ink-900">{clinic.doctorName}</p>
                    <p className="text-sm uppercase tracking-[0.22em] text-ink-500">{clinic.specialty}</p>
                  </div>
                </div>
                <div className="rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
                  Welcoming New Patients
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 sm:grid-cols-2">
                <div className="surface-panel p-5">
                  <p className="text-sm font-medium text-ink-500">Consultations</p>
                  <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-ink-900">Focused, unhurried</p>
                </div>
                <div className="surface-panel p-5">
                  <p className="text-sm font-medium text-ink-500">Approach</p>
                  <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-ink-900">Comfort-led care</p>
                </div>
              </div>

              <div className="mt-5 rounded-[1.75rem] bg-[linear-gradient(180deg,#1f406b_0%,#142b52_100%)] p-5 text-white shadow-float sm:mt-6 sm:p-6">
                <img
                  src={heroImageSrc}
                  alt={`${clinic.shortName} clinic`}
                  className="h-44 w-full rounded-[1.35rem] object-cover"
                />
                <p className="mt-5 text-sm uppercase tracking-[0.28em] text-brand-200">Patient Promise</p>
                <p className="mt-4 text-lg leading-8 text-white/90">
                  Clear guidance, respectful treatment planning, and a calmer standard of care from first visit onward.
                </p>
                <a
                  href="./about.html"
                  className="mt-5 inline-flex items-center text-sm font-semibold tracking-[0.08em] text-white transition hover:text-brand-200"
                >
                  Meet The Practice
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
