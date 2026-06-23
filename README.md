<div align="center">

# Vũ Xuân Quân — Portfolio

[![Deploy](https://github.com/HiImKaii/HiImKaii.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/HiImKaii/HiImKaii.github.io/actions/workflows/deploy.yml)
[![GitHub Pages](https://img.shields.io/badge/Live-hiimkaii.github.io-6c63ff?style=flat-square&logo=github)](https://hiimkaii.github.io)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)

Portfolio cá nhân — Kỹ sư Công nghệ Hàng không Vũ trụ · GIS · AI · Tối ưu hóa

[**Xem trang web →**](https://hiimkaii.github.io)

</div>

---

## Tính năng

- 🌓 Dark / Light mode
- 🌐 Song ngữ Tiếng Việt – English
- 🎯 Particle background, custom cursor, scroll reveal animations
- 📊 GitHub stats realtime (contributions, repos, followers)
- 📱 Responsive trên mọi thiết bị

## Stack

| Layer | Công nghệ |
|-------|-----------|
| Framework | Next.js 16 (App Router, Static Export) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion, CSS Keyframes |
| UI | Glassmorphism, Glitch Text, Rainbow Button, Magnetic |
| Font | Space Grotesk, JetBrains Mono |
| Deploy | GitHub Actions → GitHub Pages |

## Cấu trúc dự án

```
src/
├── app/
│   ├── globals.css          # Design system + toàn bộ CSS
│   ├── layout.tsx           # Root layout, metadata, fonts
│   └── page.tsx             # Trang chính
├── components/
│   ├── HeroSection.tsx      # Hero + GitHub stats
│   ├── AboutSection.tsx     # Giới thiệu bản thân
│   ├── SkillsSection.tsx    # Kỹ năng theo nhóm
│   ├── ProjectsSection.tsx  # Các dự án cá nhân
│   ├── ContactSection.tsx   # Form liên hệ
│   ├── Navbar.tsx           # Navigation + theme/lang toggle
│   ├── ParticleCanvas.tsx   # Particle background
│   ├── CustomCursor.tsx     # Custom cursor effect
│   └── ui/                  # Reusable UI components
├── hooks/                   # Custom hooks (tilt, scroll, GitHub API)
├── providers/               # Theme + Language context providers
└── lib/                     # Utilities
```

## Chạy local

```bash
# Clone
git clone https://github.com/HiImKaii/HiImKaii.github.io.git
cd HiImKaii.github.io

# Cài dependencies
npm install

# Dev server
npm run dev

# Build static
npm run build
```

## Dự án tiêu biểu

| Dự án | Mô tả | Stack |
|-------|--------|-------|
| [iuHA](https://github.com/HiImKaii/iuHA) | Ứng dụng Android đa tính năng: tài chính, sức khỏe, ghi chú | Android Native · React · TypeScript |
| [KaiRuou](https://kairuou.duckdns.org) | Website thương mại điện tử bán rượu | Rust · Axum · PostgreSQL |
| [KaiRust](https://kairust.duckdns.org) | Nền tảng dạy lập trình Rust với chấm bài tự động | Rust · Vite · Docker · Caddy |

## Liên hệ

[![GitHub](https://img.shields.io/badge/@HiImKaii-181717?style=flat-square&logo=github)](https://github.com/HiImKaii)
[![Email](https://img.shields.io/badge/quanvuvan201@gmail.com-ea4335?style=flat-square&logo=gmail&logoColor=white)](mailto:quanvuvan201@gmail.com)

---

<div align="center">

**© 2026 Vũ Xuân Quân** · Built with Next.js

</div>