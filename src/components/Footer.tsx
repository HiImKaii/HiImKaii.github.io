"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import { Magnetic } from "@/components/ui/magnetic";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <Magnetic>
            <span className="footer-logo">&lt;VXQ /&gt;</span>
          </Magnetic>
          <p>{t("© 2025 Vũ Xuân Quân. Crafted with ❤️", "© 2025 Vu Xuan Quan. Crafted with ❤️")}</p>
          <div className="footer-links">
            <Magnetic>
              <a href="https://github.com/HiImKaii" target="_blank"><i className="fab fa-github" /></a>
            </Magnetic>
            <Magnetic>
              <a href="mailto:quanvuvan201@gmail.com"><i className="fas fa-envelope" /></a>
            </Magnetic>
          </div>
        </div>
      </div>
    </footer>
  );
}
