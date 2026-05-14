"use client";

import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const ParticleCanvas = dynamic(() => import("@/components/ParticleCanvas"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
const BackToTop = dynamic(() => import("@/components/BackToTop"), { ssr: false });
const ScrollRevealInit = dynamic(() => import("@/components/ScrollRevealInit"), { ssr: false });

export default function Home() {
  return (
    <>
      <CustomCursor />
      <ParticleCanvas />
      <div className="noise-overlay" />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
      <BackToTop />
      <ScrollRevealInit />
    </>
  );
}
