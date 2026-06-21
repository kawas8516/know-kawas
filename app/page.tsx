import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/components/hero-section';
import { TechStackSection } from '@/components/tech-stack-section';
import { ProjectsSection } from '@/components/projects-section';
import { ExperienceSection } from '@/components/experience-section';
import { Footer } from '@/components/footer';
import { HomeContentSections } from '@/components/home-content-sections';
import { getAllReading } from '@/lib/content';
import { LiquidGlassBg } from '@/components/liquid-glass-bg';

export default function Home() {
  const homeStatusPriority: Record<string, number> = { reading: 0, discussing: 1 };
  const readingItems = getAllReading()
    .filter((i) => i.status === 'reading' || i.status === 'discussing')
    .sort((a, b) => homeStatusPriority[a.status] - homeStatusPriority[b.status])
    .slice(0, 3);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <LiquidGlassBg />
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <TechStackSection />
        <HomeContentSections readingItems={readingItems} />
        <ProjectsSection />
        <ExperienceSection />
        <Footer />
      </div>
    </main>
  );
}
