'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Project {
  id: number;
  title: string;
  slug: string;
  content: string;
  description: string;
  date: string;
  category: string;
  image?: string;
  projectUrl?: string;
  githubUrl?: string;
  technologies: string[];
  featured?: boolean;
}

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (response.ok) {
          const projectsData = await response.json();
          // Show first 6 projects (featured first, then others)
          const featuredProjects = projectsData.filter((p: Project) => p.featured);
          const otherProjects = projectsData.filter((p: Project) => !p.featured);
          const sortedProjects = [...featuredProjects, ...otherProjects].slice(0, 6);
          setProjects(sortedProjects);
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('portfolio');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section
      id="portfolio"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="container mx-auto max-w-7xl">
        <div
          className={`text-center mb-16 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#1f1f1f] dark:text-white mb-4 transition-colors">
            My <span className="text-[#ff6b6b]">Portfolio</span>
          </h2>
          <div className="w-24 h-1 bg-[#ff6b6b] mx-auto mb-6"></div>
          <p className="text-lg text-[#666666] dark:text-gray-300 max-w-2xl mx-auto transition-colors">
            A collection of my recent work and projects.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative overflow-hidden rounded-lg ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
                {/* Card Container with Image */}
                <div className="relative h-[450px] w-full">
                  {/* Background Image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900">
                    {project.image && project.image !== '/api/placeholder/800/600' ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900" />
                    )}
                  </div>

                  {/* Dark Overlay - Stronger at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20"></div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-between p-8 text-white">
                    {/* Top - Category */}
                    <div className="text-xs text-gray-300 font-medium uppercase tracking-wider">
                      {project.category}
                    </div>

                    {/* Center - Title */}
                    <div className="flex-1 flex items-center">
                      <h3 className="text-3xl md:text-4xl font-bold leading-tight">
                        {project.title}
                      </h3>
                    </div>

                    {/* Bottom - Case Study Button */}
                    <div>
                      <Link
                        href={`/portfolio/${project.slug}`}
                        className="inline-block px-6 py-2.5 bg-transparent border-2 border-white text-white font-semibold rounded hover:bg-white hover:text-black transition-all duration-300 text-sm"
                      >
                        Case Study
                      </Link>
                    </div>
                  </div>
                </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <Link
            href="/portfolio"
            className="inline-block px-8 py-4 bg-[#ff6b6b] text-white font-semibold rounded-full hover:bg-[#ee5a5a] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            View More Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
