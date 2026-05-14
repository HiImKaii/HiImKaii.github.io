"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/providers/LanguageProvider";
import { Magnetic } from "@/components/ui/magnetic";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const { lang, toggleLang, t } = useLanguage();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);

      const sections = document.querySelectorAll("section[id]");
      sections.forEach((section) => {
        const el = section as HTMLElement;
        const top = el.offsetTop - 100;
        const height = el.offsetHeight;
        const id = el.getAttribute("id") || "";
        if (window.scrollY >= top && window.scrollY < top + height) {
          setActiveSection(id);
        }
      });
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { href: "#home", vi: "Trang chủ", en: "Home" },
    { href: "#about", vi: "Giới thiệu", en: "About" },
    { href: "#skills", vi: "Kỹ năng", en: "Skills" },
    { href: "#projects", vi: "Dự án", en: "Projects" },
    { href: "#contact", vi: "Liên hệ", en: "Contact" },
  ];

  function scrollTo(href: string) {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`} id="navbar">
      <div className="nav-container">
        <Magnetic>
          <a href="#home" className="nav-logo" onClick={(e) => { e.preventDefault(); scrollTo("#home"); }}>
            <span className="logo-bracket">&lt;</span>VXQ<span className="logo-bracket"> /&gt;</span>
          </a>
        </Magnetic>
        <div className={`nav-menu${menuOpen ? " active" : ""}`} id="nav-menu">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`nav-link${activeSection === item.href.slice(1) ? " active" : ""}`}
              onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
            >
              <span className="nav-link-text">{t(item.vi, item.en)}</span>
              <span className="nav-link-line" />
            </a>
          ))}
        </div>
        <div className="nav-actions">
          <Magnetic>
            <button className="action-btn" onClick={toggleLang} aria-label="Toggle language">
              <i className="fas fa-globe" />
              <span>{lang === "vi" ? "EN" : "VI"}</span>
            </button>
          </Magnetic>
          <Magnetic>
            <button
              className="action-btn"
              onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
              aria-label="Toggle theme"
            >
              <i className={`fas ${resolvedTheme === "light" ? "fa-sun" : "fa-moon"}`} />
            </button>
          </Magnetic>
          <button
            className={`hamburger${menuOpen ? " active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  );
}
