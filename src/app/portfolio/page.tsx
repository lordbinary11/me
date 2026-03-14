import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PortfolioClient from '@/components/PortfolioClient';
import { getSortedProjectsData, getAllProjectCategories } from '@/lib/markdown';

export default async function PortfolioPage() {
  const projects = await getSortedProjectsData();
  const categories = ['All', ...getAllProjectCategories()];

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <Header />
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold text-[#1f1f1f] dark:text-white mb-4">
              My <span className="text-[#ff6b6b]">Portfolio</span>
            </h1>
            <div className="w-24 h-1 bg-[#ff6b6b] mx-auto mb-6"></div>
            <p className="text-lg text-[#666666] dark:text-gray-400 max-w-2xl mx-auto">
              A comprehensive collection of my work, showcasing various projects across different domains.
            </p>
          </div>

          <PortfolioClient projects={projects} categories={categories} />
        </div>
      </section>
      <Footer />
    </main>
  );
}

