'use client';

import { useEffect } from 'react';

import gsap from 'gsap';
import { ScrollTrigger, TextPlugin } from 'gsap/all';
import Lenis from 'lenis';

export default function GlobalMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    const root = document.documentElement;
    root.classList.add('lenis', 'lenis-smooth');

    const lenis = new Lenis({
      duration: 1.2,
      lerp: 0.08,
      smoothWheel: true
    });

    const updateScroll = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(updateScroll);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(updateScroll);
      lenis.destroy();
      root.classList.remove('lenis', 'lenis-smooth');
    };
  }, []);

  return null;
}