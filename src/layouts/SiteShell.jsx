import { useEffect, useState } from "react";
import { clinic } from "../data/clinic";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export function SiteShell({ currentPage, children }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cursorScale = 0.82;

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="min-h-screen relative"
      style={{
        "--clinic-primary": clinic.colors.primary,
        "--clinic-primary-dark": clinic.colors.primaryDark,
        "--clinic-accent": clinic.colors.accent,
        "--clinic-surface": clinic.colors.surface
      }}
    >
      <div
        className="fixed pointer-events-none z-50 w-4 h-4 bg-brand-500 rounded-full opacity-50 transition-transform duration-100 ease-out"
        style={{
          left: mousePos.x - 8,
          top: mousePos.y - 8,
          transform: `scale(${cursorScale})`,
        }}
      />
      <Header currentPage={currentPage} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
