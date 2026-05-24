import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/components/hero-section';
import { TechStackSection } from '@/components/tech-stack-section';
import { ProjectsSection } from '@/components/projects-section';
import { ExperienceSection } from '@/components/experience-section';
import { Footer } from '@/components/footer';
import { HomeContentSections } from '@/components/home-content-sections';
import { getAllReading, getAllPrompts } from '@/lib/content';

export default function Home() {
  const readingItems = getAllReading().filter((i) => i.status === 'reading').slice(0, 2);
  const promptItems = getAllPrompts().slice(0, 3);

  return (
    <main className="relative min-h-screen">
      {/* Background glow effects - positioned to match screenshot */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Purple glow - top left area */}
        <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[150px]" />
        {/* Blue glow - right side */}
        <div className="absolute top-1/4 -right-32 h-[400px] w-[400px] rounded-full bg-blue-500/15 blur-[120px]" />
        {/* Green glow - middle section */}
        <div className="absolute top-[45%] left-1/4 h-[350px] w-[350px] rounded-full bg-emerald-500/10 blur-[100px]" />
        {/* Orange glow - bottom section */}
        <div className="absolute bottom-1/4 right-1/3 h-[300px] w-[300px] rounded-full bg-orange-500/10 blur-[100px]" />
        {/* Pink glow - bottom left */}
        <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-pink-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <TechStackSection />
        <HomeContentSections readingItems={readingItems} promptItems={promptItems} />
        <ProjectsSection />
        <ExperienceSection />
        <Footer />
      </div>
    </main>
  );
}
