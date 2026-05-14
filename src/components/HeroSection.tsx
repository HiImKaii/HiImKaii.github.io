"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/providers/LanguageProvider";
import { useGitHubStats } from "@/hooks/useGitHubStats";
import Typewriter from "./Typewriter";
import { GlitchText } from "@/components/ui/glitch-text";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Magnetic } from "@/components/ui/magnetic";

export default function HeroSection() {
  const { t } = useLanguage();
  const stats = useGitHubStats("HiImKaii");
  const statsRef = useRef<HTMLDivElement>(null);
  const countersAnimated = useRef(false);

  useEffect(() => {
    if (!statsRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !countersAnimated.current) {
            countersAnimated.current = true;
            animateCounters();
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [stats]);

  function animateCounters() {
    const counters = document.querySelectorAll(".stat-number[data-target]");
    counters.forEach((counter) => {
      const target = +(counter.getAttribute("data-target") || "0");
      const duration = 2000;
      const start = performance.now();
      function update(now: number) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = String(Math.round(target * eased));
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    });
  }

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge reveal-up">
              <span className="badge-dot" />
              <span>{t("Sẵn sàng cho cơ hội mới", "Open for opportunities")}</span>
            </div>
            <h1 className="hero-title reveal-up" style={{ "--delay": "0.1s" } as React.CSSProperties}>
              <span className="greeting">{t("Xin chào, tôi là", "Hello, I'm")}</span>
              <GlitchText words={["Vũ Xuân Quân", "Kaitovu"]} className="name-glitch text-[length:inherit] font-[inherit]" />
            </h1>
            <div className="reveal-up" style={{ "--delay": "0.2s" } as React.CSSProperties}>
              <Typewriter />
            </div>
            <p className="hero-description reveal-up" style={{ "--delay": "0.3s" } as React.CSSProperties}>
              {t(
                "Sinh viên năm cuối ngành Công nghệ Hàng không Vũ trụ tại UET-VNU. Đam mê GIS, AI và Tối ưu hóa. Xây dựng các giải pháp từ dữ liệu vệ tinh đến mô hình ML.",
                "Final-year Aerospace Engineering student at UET-VNU. Passionate about GIS, AI, and Optimization. Building solutions from satellite data to ML models."
              )}
            </p>
            <div className="hero-cta reveal-up" style={{ "--delay": "0.4s" } as React.CSSProperties}>
              <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}>
                <RainbowButton>
                  <span>{t("Liên hệ", "Contact me")}</span>
                  <i className="fas fa-arrow-right" style={{ marginLeft: "8px" }} />
                </RainbowButton>
              </a>
            </div>
            <div className="hero-stats reveal-up" style={{ "--delay": "0.5s" } as React.CSSProperties} ref={statsRef}>
              <div className="stat-pill">
                <span className="stat-number" data-target={stats.contributions}>0</span>
                <span className="stat-label">Contributions</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-pill">
                <span className="stat-number" data-target={stats.repos}>0</span>
                <span className="stat-label">Repos</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-pill">
                <span className="stat-number" data-target={stats.followers}>0</span>
                <span className="stat-label">Followers</span>
              </div>
            </div>
          </div>
          <div className="hero-visual reveal-up" style={{ "--delay": "0.3s" } as React.CSSProperties}>
            <Magnetic>
              <div className="avatar-container">
                <div className="avatar-ring" />
                <div className="avatar-ring ring-2" />
                <div className="avatar-glow" />
                <img src="/avatar.jpg" alt="Vũ Xuân Quân" className="avatar-img" />
                <div className="avatar-status"><span className="status-dot" /></div>
              </div>
            </Magnetic>
            <div className="floating-icons">
              {[
                { icon: "fab fa-python", x: "-80px", y: "-60px", delay: "0s" },
                { icon: "fab fa-react", x: "80px", y: "-40px", delay: "0.5s" },
                { icon: "fas fa-satellite", x: "-60px", y: "70px", delay: "1s" },
                { icon: "fas fa-brain", x: "70px", y: "60px", delay: "1.5s" },
                { icon: "fas fa-cogs", x: "-100px", y: "10px", delay: "2s" },
                { icon: "fab fa-js", x: "100px", y: "15px", delay: "2.5s" },
              ].map((item, i) => (
                <div key={i} className="float-icon" style={{ "--x": item.x, "--y": item.y, "--delay": item.delay } as React.CSSProperties}>
                  <i className={item.icon} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="mouse"><div className="wheel" /></div>
        <span>{t("Cuộn xuống", "Scroll down")}</span>
      </div>
    </section>
  );
}
