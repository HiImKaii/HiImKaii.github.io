"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cursorX = 0, cursorY = 0, outlineX = 0, outlineY = 0;
    let rafId: number;

    function onMouseMove(e: MouseEvent) {
      cursorX = e.clientX;
      cursorY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = cursorX + "px";
        dotRef.current.style.top = cursorY + "px";
      }
    }

    function animateOutline() {
      outlineX += (cursorX - outlineX) * 0.15;
      outlineY += (cursorY - outlineY) * 0.15;
      if (outlineRef.current) {
        outlineRef.current.style.left = outlineX + "px";
        outlineRef.current.style.top = outlineY + "px";
      }
      rafId = requestAnimationFrame(animateOutline);
    }

    function onEnter() { document.body.classList.add("cursor-hover"); }
    function onLeave() { document.body.classList.remove("cursor-hover"); }

    document.addEventListener("mousemove", onMouseMove);
    rafId = requestAnimationFrame(animateOutline);

    const targets = document.querySelectorAll("a, button, .glass-card, .skill-tag, .float-icon, .info-chip");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-outline" ref={outlineRef} />
    </>
  );
}
