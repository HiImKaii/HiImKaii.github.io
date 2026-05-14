"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

export function useScrollReveal<T extends HTMLElement>(threshold = 0.1) {
  const ref = useRef<T>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

  useEffect(() => {
    if (isInView && ref.current) {
      ref.current.classList.add("revealed");
    }
  }, [isInView]);

  return ref;
}
