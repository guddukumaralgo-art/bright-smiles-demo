import { clinic } from "../data/clinic";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export function SiteShell({ currentPage, children }) {
  return (
    <div
      className="min-h-screen"
      style={{
        "--clinic-primary": clinic.colors.primary,
        "--clinic-primary-dark": clinic.colors.primaryDark,
        "--clinic-accent": clinic.colors.accent,
        "--clinic-surface": clinic.colors.surface
      }}
    >
      <Header currentPage={currentPage} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
