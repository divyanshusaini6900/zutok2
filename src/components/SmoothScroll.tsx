"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { setLenis } from "@/lib/scroll";

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.1, anchors: { offset: -80 } });
    setLenis(lenis);
    return () => {
      setLenis(null);
      lenis.destroy();
    };
  }, []);
  return null;
}
