"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import { useTilt } from "@/hooks/useTilt";

const projects = [
  {
    href: "https://github.com/HiImKaii/iuHA",
    icon: "fab fa-android",
    name: "iuHA",
    desc: {
      vi: "Ứng dụng Android tích hợp đa tính năng: quản lý tài chính, sức khỏe, ghi chú, thị trường. Xây dựng bằng Android Native + React WebView.",
      en: "Multi-feature Android app: finance, health, notes, market management. Built with Android Native + React WebView.",
    },
    tags: ["Android", "React", "TypeScript", "Vite"],
    liveUrl: null,
  },
  {
    href: "https://kairuou.duckdns.org",
    icon: "fas fa-wine-bottle",
    name: "KaiRuou",
    desc: {
      vi: "Website thương mại điện tử bán rượu. Backend Rust (Axum) + PostgreSQL, frontend hiện đại.",
      en: "E-commerce wine shop website. Rust (Axum) + PostgreSQL backend, modern frontend.",
    },
    tags: ["Rust", "Axum", "PostgreSQL"],
    liveUrl: "kairuou.duckdns.org",
  },
  {
    href: "https://kairust.duckdns.org",
    icon: "fas fa-graduation-cap",
    name: "KaiRust",
    desc: {
      vi: "Nền tảng web dạy học lập trình Rust với hệ thống chấm bài tự động. Deploy bằng Docker + Cloudflare Tunnel.",
      en: "Rust programming learning platform with auto-grading system. Deployed with Docker + Cloudflare Tunnel.",
    },
    tags: ["Rust", "Vite", "Docker", "Caddy"],
    liveUrl: "kairust.duckdns.org",
  },
];

export default function ProjectsSection() {
  const { t } = useLanguage();
  const tilt = useTilt();

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-header reveal-up">
          <span className="section-tag">&lt;projects&gt;</span>
          <h2>{t("Dự án", "Projects")}</h2>
          <p className="section-subtitle">{t("Các dự án cá nhân", "Personal projects")}</p>
        </div>
        <div className="skills-orbit">
          {projects.map((proj, i) => (
            <a
              key={i}
              href={proj.href}
              target="_blank"
              rel="noopener noreferrer"
              className="skill-card glass-card reveal-up"
              style={{ "--delay": `${i * 0.1}s`, textDecoration: "none", color: "inherit" } as React.CSSProperties}
              onMouseMove={tilt.onMouseMove}
              onMouseLeave={tilt.onMouseLeave}
            >
              <div className="skill-card-glow" />
              <h4><i className={proj.icon} /> {proj.name}</h4>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                {t(proj.desc.vi, proj.desc.en)}
              </p>
              <div className="skill-tags" style={{ marginTop: "0.75rem" }}>
                {proj.tags.map((tag) => (
                  <span key={tag} className="skill-tag">{tag}</span>
                ))}
              </div>
              {proj.liveUrl && (
                <div style={{ marginTop: "0.75rem" }}>
                  <span className="skill-tag" style={{ background: "#6c63ff", color: "#fff" }}>
                    <i className="fas fa-external-link-alt" /> {proj.liveUrl}
                  </span>
                </div>
              )}
            </a>
          ))}
        </div>
        <div className="section-closer reveal-up"><span className="section-tag">&lt;/projects&gt;</span></div>
      </div>
    </section>
  );
}
