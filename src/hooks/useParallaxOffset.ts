import { useEffect, useState } from "react";

export function useParallaxOffset(multiplier = 0.12) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateOffset = () => {
      setOffset(window.scrollY * multiplier);
      ticking = false;
    };

    const onScroll = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      if (!ticking) {
        window.requestAnimationFrame(updateOffset);
        ticking = true;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [multiplier]);

  return offset;
}
