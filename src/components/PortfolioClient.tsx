'use client';

import { useState } from 'react';
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

interface PortfolioClientProps {
  projects: Project[];
  categories: string[];
}

export default function PortfolioClient({ projects, categories }: PortfolioClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter((project) => project.category === selectedCategory);

  return (
    <>
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-[#ff6b6b] text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-[#666666] dark:text-gray-300 hover:bg-[#ff6b6b] hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            className="group relative overflow-hidden rounded-lg animate-fade-in-up"
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

              {/* Dark Overlay */}
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
    </>
  );
}
