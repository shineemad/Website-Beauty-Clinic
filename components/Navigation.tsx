"use client";

import { useEffect, useRef, useState } from "react";

import gsap from "gsap";

type NavItem = {
  label: string;
  sectionId: string;
};

const navItems: NavItem[] = [
  { label: "Home", sectionId: "hero" },
  { label: "Philosophy", sectionId: "philosophy" },
  { label: "Treatments", sectionId: "treatments" },
  { label: "Products", sectionId: "products" },
  { label: "Trust", sectionId: "hall-of-trust" },
  { label: "Contact", sectionId: "footer" },
];

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => {
        const element = document.getElementById(item.sectionId);
        return { id: item.sectionId, element };
      });

      let currentSection = "hero";

      for (const { id, element } of sections) {
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            currentSection = id;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      window.addEventListener("scroll", handleScroll, { once: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isMobileMenuOpen]);

  const handleNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  return (
    <>
      {/* Skip to main content link */}
      <a href="#main-content" className="sr-only">
        Skip to main content
      </a>

      <nav
        ref={navRef}
        className="fixed top-0 z-[1000] w-full bg-canvas/80 px-[6vw] py-4 backdrop-blur-md lg:px-[8vw]"
        style={{
          borderBottom: "1px solid rgba(212, 201, 190, 0.3)",
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("hero");
            }}
            className="font-display text-[20px] font-light tracking-[0.2em] text-charcoal transition-colors duration-300 hover:text-gold lg:text-[24px]"
            aria-label="JGLOW - Home"
          >
            JGLOW
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 lg:flex" role="menubar">
            {navItems.slice(1).map((item) => (
              <button
                key={item.sectionId}
                onClick={() => handleNavClick(item.sectionId)}
                className="font-sans text-[12px] uppercase tracking-[0.1em] text-charcoal/70 transition-colors duration-300 hover:text-gold"
                style={{
                  color:
                    activeSection === item.sectionId
                      ? "#D5B97D"
                      : "rgba(26, 26, 26, 0.7)",
                }}
                data-cursor="view"
                role="menuitem"
                aria-current={
                  activeSection === item.sectionId ? "page" : undefined
                }
                aria-label={`Go to ${item.label} section`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="flex flex-col gap-1.5 lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span
              className="block h-[2px] w-6 bg-charcoal transition-all duration-300"
              style={{
                transform: isMobileMenuOpen
                  ? "rotate(45deg) translateY(11px)"
                  : "rotate(0)",
              }}
            />
            <span
              className="block h-[2px] w-6 bg-charcoal transition-all duration-300"
              style={{
                opacity: isMobileMenuOpen ? 0 : 1,
              }}
            />
            <span
              className="block h-[2px] w-6 bg-charcoal transition-all duration-300"
              style={{
                transform: isMobileMenuOpen
                  ? "rotate(-45deg) translateY(-11px)"
                  : "rotate(0)",
              }}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          ref={mobileMenuRef}
          className="absolute left-0 right-0 top-full border-t border-charcoal/10 bg-canvas lg:hidden"
          id="mobile-menu"
          role="menu"
          style={{
            maxHeight: isMobileMenuOpen ? "400px" : "0",
            overflow: "hidden",
            transition: "max-height 0.3s ease",
          }}
        >
          <div className="flex flex-col gap-0">
            {navItems.slice(1).map((item) => (
              <button
                key={item.sectionId}
                onClick={() => handleNavClick(item.sectionId)}
                className="border-t border-charcoal/5 px-[6vw] py-4 text-left font-sans text-[14px] uppercase tracking-[0.1em] text-charcoal/70 transition-colors duration-300 hover:text-gold"
                style={{
                  backgroundColor:
                    activeSection === item.sectionId
                      ? "rgba(213, 185, 125, 0.05)"
                      : "transparent",
                  color:
                    activeSection === item.sectionId
                      ? "#D5B97D"
                      : "rgba(26, 26, 26, 0.7)",
                }}
                role="menuitem"
                aria-current={
                  activeSection === item.sectionId ? "page" : undefined
                }
                aria-label={`Go to ${item.label} section`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content overlap */}
      <div className="h-[60px] lg:h-[70px]" />
    </>
  );
}
