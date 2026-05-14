"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import { RotatingText } from "@/components/ui/rotate-text";

const roles = {
  vi: ["Kỹ sư Hàng không Vũ trụ", "GIS & Viễn thám", "AI & Tối ưu hóa", "Machine Learning", "Phân tích Dữ liệu Không gian"],
  en: ["Aerospace Engineer", "GIS & Remote Sensing", "AI & Optimization", "Machine Learning", "Spatial Data Analysis"],
};

export default function Typewriter() {
  const { lang } = useLanguage();
  const currentRoles = roles[lang] || roles.vi;

  return (
    <div className="hero-roles flex items-center gap-2 text-cyan-400 font-mono">
      <span className="role-prefix text-white">&gt;&gt;&gt;</span>
      <RotatingText words={currentRoles} className="typewriter" interval={2500} />
    </div>
  );
}
