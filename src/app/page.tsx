import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import HashScrollHandler from '@/components/HashScrollHandler';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HashScrollHandler />
      <Header />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Contact />
      <Footer />
    </main>
  );
}
