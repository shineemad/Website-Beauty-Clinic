"use client";

import { useEffect, useState } from "react";

import gsap from "gsap";
import Lenis from "lenis";

import BookingOverlay from "@/components/BookingOverlay";
import Navigation from "@/components/Navigation";
import Preloader from "@/components/Preloader";
import FooterSection from "@/components/sections/FooterSection";
import HallOfTrust from "@/components/sections/HallOfTrust";
import Hero from "@/components/sections/Hero";
import Philosophy from "@/components/sections/Philosophy";
import Products from "@/components/sections/Products";
import Treatments from "@/components/sections/Treatments";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smooth: true,
    } as unknown as ConstructorParameters<typeof Lenis>[0]);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section]"),
    );

    // Fallback: prevent sections from staying hidden when observer misses entries.
    const fallbackTimer = window.setTimeout(() => {
      sections.forEach((section) => {
        if (section.classList.contains("section-reveal")) {
          section.classList.add("in-view");
        }
      });
    }, 1600);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          (entry.target as HTMLElement).classList.add("in-view");
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    sections.forEach((section) => {
      if (section.getAttribute("data-section") === "hero") {
        section.classList.add("in-view");
        return;
      }

      observer.observe(section);
    });

    return () => {
      window.clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, [isLoading]);

  return (
    <main className="bg-canvas text-charcoal" id="main-content">
      {isLoading ? <Preloader onComplete={() => setIsLoading(false)} /> : null}

      <Navigation />

      <div
        className={`transition-opacity duration-700 ease-out ${isLoading ? "opacity-0" : "opacity-100"}`}
      >
        <div data-section="hero" id="hero">
          <Hero onBookingOpen={() => setIsBookingOpen(true)} />
        </div>

        <div data-section id="philosophy" className="section-reveal">
          <Philosophy />
        </div>

        <div data-section id="treatments" className="section-reveal">
          <Treatments />
        </div>

        <div data-section id="products" className="section-reveal">
          <Products />
        </div>

        <div data-section id="hall-of-trust" className="section-reveal">
          <HallOfTrust />
        </div>

        <div data-section id="footer" className="section-reveal">
          <FooterSection onBookingOpen={() => setIsBookingOpen(true)} />
        </div>
      </div>

      <BookingOverlay
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </main>
  );
}
