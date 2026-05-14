"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import { useTilt } from "@/hooks/useTilt";

const skillGroups = [
  {
    icon: "fas fa-code",
    title: { vi: "Ngôn ngữ", en: "Languages" },
    tags: [
      { icon: "fab fa-python", name: "Python" },
      { icon: "fab fa-js", name: "JavaScript" },
      { icon: "fab fa-cuttlefish", name: "C++" },
      { icon: "fab fa-react", name: "TypeScript" },
      { icon: "fas fa-gear", name: "Rust" },
    ],
  },
  {
    icon: "fas fa-laptop-code",
    title: { vi: "Web Dev", en: "Web Dev" },
    tags: [
      { icon: "fab fa-react", name: "React" },
      { icon: "fas fa-wind", name: "Tailwind" },
      { icon: "fab fa-node-js", name: "Express" },
      { icon: "fas fa-bolt", name: "Vite" },
    ],
  },
  {
    icon: "fas fa-satellite",
    title: { vi: "GIS", en: "GIS" },
    tags: [
      { icon: "fas fa-globe", name: "GEE" },
      { icon: "fas fa-map", name: "QGIS" },
      { icon: "fas fa-layer-group", name: "ArcGIS" },
    ],
  },
  {
    icon: "fas fa-brain",
    title: { vi: "AI & ML", en: "AI & ML" },
    tags: [
      { icon: "fas fa-robot", name: "Scikit-learn" },
      { icon: "fas fa-network-wired", name: "TensorFlow" },
      { icon: "fas fa-cogs", name: "Optimization" },
    ],
  },
  {
    icon: "fas fa-chart-line",
    title: { vi: "Data", en: "Data" },
    tags: [
      { icon: "fas fa-book", name: "Jupyter" },
      { icon: "fas fa-table", name: "Pandas" },
      { icon: "fas fa-calculator", name: "NumPy" },
      { icon: "fas fa-chart-bar", name: "Matplotlib" },
    ],
  },
];

export default function SkillsSection() {
  const { t } = useLanguage();
  const tilt = useTilt();

  return (
    <section id="skills" className="skills">
      <div className="container">
        <div className="section-header reveal-up">
          <span className="section-tag">&lt;skills&gt;</span>
          <h2>{t("Kỹ năng", "Skills")}</h2>
          <p className="section-sub">{t("Công nghệ tôi sử dụng", "Technologies I use")}</p>
        </div>
        <div className="skills-orbit">
          {skillGroups.map((group, i) => (
            <div
              key={i}
              className="skill-card glass-card reveal-up"
              style={{ "--delay": `${i * 0.1}s` } as React.CSSProperties}
              onMouseMove={tilt.onMouseMove}
              onMouseLeave={tilt.onMouseLeave}
            >
              <div className="skill-card-glow" />
              <h4><i className={group.icon} /><span>{t(group.title.vi, group.title.en)}</span></h4>
              <div className="skill-tags">
                {group.tags.map((tag, j) => (
                  <span key={j} className="skill-tag"><i className={tag.icon} /> {tag.name}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="section-closer reveal-up"><span className="section-tag">&lt;/skills&gt;</span></div>
      </div>
    </section>
  );
}
