"use client";

import { useLanguage } from "@/providers/LanguageProvider";

export default function AboutSection() {
  const { t } = useLanguage();

  const cards = [
    {
      icon: "fas fa-satellite-dish",
      title: { vi: "Viễn thám & GIS", en: "Remote Sensing & GIS" },
      desc: {
        vi: "Xử lý dữ liệu vệ tinh đa nguồn (Sentinel-1/2, MODIS, CHIRPS), phân tích không gian với Google Earth Engine, QGIS và ArcGIS Pro.",
        en: "Multi-source satellite data processing, spatial analysis with GEE, QGIS and ArcGIS Pro.",
      },
      revealClass: "reveal-left",
    },
    {
      icon: "fas fa-brain",
      title: { vi: "AI & Tối ưu hóa", en: "AI & Optimization" },
      desc: {
        vi: "Phát triển mô hình ML (Random Forest, XGBoost, Neural Networks). Tối ưu hóa hyperparameters bằng thuật toán meta-heuristic PUMA Optimizer.",
        en: "ML model development (RF, XGBoost, NN). Hyperparameter optimization using PUMA Optimizer.",
      },
      revealClass: "reveal-up",
    },
    {
      icon: "fas fa-bug",
      title: { vi: "Software Testing", en: "Software Testing" },
      desc: {
        vi: "Kinh nghiệm thực tập QA tại Lifetex. Thành thạo quy trình kiểm thử phần mềm, phân tích lỗi chi tiết.",
        en: "QA internship at Lifetex. Proficient in testing processes and bug analysis.",
      },
      revealClass: "reveal-right",
    },
  ];

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-header reveal-up">
          <span className="section-tag">&lt;about&gt;</span>
          <h2>{t("Giới thiệu", "About Me")}</h2>
          <p className="section-sub">{t("Tìm hiểu thêm về tôi", "Learn more about me")}</p>
        </div>
        <div className="about-grid">
          {cards.map((card, i) => (
            <div key={i} className={`about-card glass-card ${card.revealClass}`}>
              <div className="card-accent" />
              <div className="about-card-header">
                <div className="icon-wrapper"><i className={card.icon} /></div>
                <h3>{t(card.title.vi, card.title.en)}</h3>
              </div>
              <p>{t(card.desc.vi, card.desc.en)}</p>
            </div>
          ))}
        </div>
        <div className="about-info-strip reveal-up">
          <div className="info-chip"><i className="fas fa-map-marker-alt" /><span>{t("Hà Nội, Việt Nam", "Hanoi, Vietnam")}</span></div>
          <div className="info-chip"><i className="fas fa-graduation-cap" /><span>{t("UET - ĐHQGHN", "UET - VNU")}</span></div>
          <div className="info-chip"><i className="fas fa-code" /><span>GIS · AI · Optimization</span></div>
        </div>
        <div className="section-closer reveal-up"><span className="section-tag">&lt;/about&gt;</span></div>
      </div>
    </section>
  );
}
