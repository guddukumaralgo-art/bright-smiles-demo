import { clinic } from "../data/clinic";

export function TrustBar() {
  return (
    <section className="shell pb-6 sm:pb-10">
      <div className="section-card p-4 sm:p-5">
        <div className="grid gap-4 text-center sm:grid-cols-2 lg:grid-cols-4">
          {clinic.trustItems.map((item) => (
            <div
              key={item}
              className="rounded-3xl bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(239,247,255,0.72)_100%)] px-5 py-4 text-sm font-semibold text-ink-700 shadow-[0_10px_28px_rgba(20,32,51,0.05)] transition duration-300 hover:-translate-y-0.5"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
