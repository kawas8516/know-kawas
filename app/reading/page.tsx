import { getAllReading } from '@/lib/content';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ReadingList } from '@/components/reading-list';

export default function ReadingPage() {
  const items = getAllReading();
  return (
    <main className="min-h-screen bg-background">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-fuchsia-600/20 blur-[150px]" />
        <div className="absolute top-1/4 -right-32 h-[400px] w-[400px] rounded-full bg-blue-500/15 blur-[120px]" />
        <div className="absolute top-[45%] left-1/4 h-[350px] w-[350px] rounded-full bg-emerald-500/10 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/3 h-[300px] w-[300px] rounded-full bg-orange-500/10 blur-[100px]" />
        <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-pink-500/10 blur-[120px]" />
      </div>
      <div className="relative z-10">
        <Navbar />
        <ReadingList items={items} />
        <Footer />
      </div>
    </main>
  );
}
