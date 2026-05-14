"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import { useTilt } from "@/hooks/useTilt";
import { GlitchText } from "@/components/ui/glitch-text";

export default function ContactSection() {
  const { t } = useLanguage();
  const tilt = useTilt();

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header reveal-up">
          <span className="section-tag">&lt;contact&gt;</span>
          <h2>{t("Liên hệ", "Contact")}</h2>
          <p className="section-sub">{t("Hãy kết nối với tôi", "Let's connect")}</p>
        </div>
        <div className="contact-grid">
          <div className="contact-text reveal-left">
            <h3>
              {t("Hãy cùng tạo nên điều", "Let's build something")}<br />
              <GlitchText words={[t("tuyệt vời!", "amazing!")]} className="gradient-text text-[length:inherit] font-[inherit]" />
            </h3>
            <p>
              {t(
                "Tôi luôn sẵn sàng thảo luận về các dự án mới, cơ hội hợp tác, hoặc chỉ đơn giản là trò chuyện về công nghệ.",
                "I am always ready to discuss new projects, collaboration opportunities, or just chat about technology."
              )}
            </p>
          </div>
          <div className="contact-links reveal-right">
            <a href="https://github.com/HiImKaii" target="_blank" className="contact-card glass-card" onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave}>
              <div className="contact-card-icon"><i className="fab fa-github" /></div>
              <div className="contact-card-info"><h4>GitHub</h4><span>@HiImKaii</span></div>
              <i className="fas fa-arrow-up-right-from-square contact-card-arrow" />
            </a>
            <a href="mailto:quanvuvan201@gmail.com" className="contact-card glass-card" onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave}>
              <div className="contact-card-icon"><i className="fas fa-envelope" /></div>
              <div className="contact-card-info"><h4>Email</h4><span>quanvuvan201@gmail.com</span></div>
              <i className="fas fa-arrow-up-right-from-square contact-card-arrow" />
            </a>
            <a href="tel:0388468147" className="contact-card glass-card" onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave}>
              <div className="contact-card-icon"><i className="fas fa-phone" /></div>
              <div className="contact-card-info"><h4>{t("Điện thoại", "Phone")}</h4><span>0388468147</span></div>
              <i className="fas fa-arrow-up-right-from-square contact-card-arrow" />
            </a>
            <div className="contact-card glass-card" onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave}>
              <div className="contact-card-icon"><i className="fas fa-map-pin" /></div>
              <div className="contact-card-info"><h4>{t("Địa điểm", "Location")}</h4><span>{t("Hà Nội, Việt Nam", "Hanoi, Vietnam")}</span></div>
            </div>
          </div>
        </div>
        <div className="section-closer reveal-up"><span className="section-tag">&lt;/contact&gt;</span></div>
      </div>
    </section>
  );
}
