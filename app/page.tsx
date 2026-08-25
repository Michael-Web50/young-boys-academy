import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-black">
      <Header />
      <Hero />
      
      {/* Placeholder for next sections we will build */}
      <section className="py-20 bg-brand-white text-center">
        <h2 className="text-3xl font-bold text-brand-black">More Sections Coming Soon</h2>
        <p className="text-brand-darkGray mt-2">About, Training, Teams, News, and Support.</p>
      </section>
    </main>
  );
}
