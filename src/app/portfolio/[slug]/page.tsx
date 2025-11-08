import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { getProjectBySlug, portfolioProjects } from '@/data/portfolioProjects';
import { notFound } from 'next/navigation';

export default async function PortfolioProject({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  
  if (!project) {
    notFound();
  }
  
  // Get related projects (same category, excluding current project)
  const relatedProjects = portfolioProjects
    .filter((p) => p.category === project.category && p.id !== project.id)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <Header />
      <article className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <Link
            href="/portfolio"
            className="inline-flex items-center text-[#666666] dark:text-gray-400 hover:text-[#ff6b6b] transition-colors mb-8"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M15 19l-7-7 7-7" />
            </svg>
            Back to Portfolio
          </Link>

          {/* Project Header */}
          <header className="mb-12 animate-fade-in-up">
            <span className="inline-block px-4 py-2 bg-[#ff6b6b] text-white text-sm font-semibold rounded-full mb-4">
              {project.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1f1f1f] dark:text-white mb-4">
              {project.title}
            </h1>
            <p className="text-lg text-[#666666] dark:text-gray-400 mb-6">
              {project.description}
            </p>
            
            {/* Project Links */}
            <div className="flex flex-wrap gap-4 mb-6">
              {project.projectUrl && (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#ff6b6b] text-white font-semibold rounded-full hover:bg-[#ee5a5a] transition-colors inline-flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Project
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gray-800 dark:bg-gray-700 text-white font-semibold rounded-full hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors inline-flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  View Code
                </a>
              )}
            </div>

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-[#666666] dark:text-gray-300 text-sm rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Featured Image */}
          {project.image && project.image !== '/api/placeholder/800/600' ? (
            <div className="mb-12 h-96 rounded-lg overflow-hidden relative">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div className="mb-12 h-96 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-lg overflow-hidden">
              {/* Placeholder for featured image */}
            </div>
          )}

          {/* Project Content */}
          <div
            className="blog-content animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
            dangerouslySetInnerHTML={{ __html: project.content }}
          />

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
              <h3 className="text-2xl font-bold text-[#1f1f1f] dark:text-white mb-8">Related Projects</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedProjects.map((relatedProject) => (
                  <Link
                    key={relatedProject.id}
                    href={`/portfolio/${relatedProject.slug}`}
                    className="block p-6 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <h4 className="font-bold text-[#1f1f1f] dark:text-white mb-2 hover:text-[#ff6b6b] transition-colors">
                      {relatedProject.title}
                    </h4>
                    <p className="text-sm text-[#666666] dark:text-gray-400">{relatedProject.category}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
      <Footer />
    </main>
  );
}

