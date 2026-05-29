import type { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { WorkContent } from '@/components/work-content';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Projects I have built — from backend systems to ML experiments.',
};

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <WorkContent />
      <Footer />
    </main>
  );
}
