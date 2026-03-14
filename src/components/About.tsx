'use client';

import { useEffect, useState } from 'react';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('main-skills');

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

    const element = document.getElementById('about');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const mainSkills = [
    {
      title: 'Mobile App Development',
      description:
        'Cross-platform mobile applications with performant UIs and native capabilities.',
    },
    {
      title: 'Web App Development',
      description:
        'Modern, scalable web applications using React/Next.js, TypeScript, and best practices.',
    },
    {
      title: 'AI / Machine Learning',
      description:
        'Integrating AI features, model inference, and intelligent automation into products.',
    },
    {
      title: 'Data Engineering',
      description:
        'Reliable data pipelines, ETL/ELT workflows, and analytics-ready datasets.',
    },
    {
      title: 'WordPress Development',
      description:
        'Custom themes, plugins, and performant sites with optimized SEO and security.',
    },
  ];

  const awards = [
    {
      title: 'Mentor of the Year',
      year: '2025',
      description: 'Recognized for outstanding mentorship at CSS KNUST.',
    },
  ];

  const experience = [
    {
      year: '2025 - Present',
      role: 'National Service Personnel-(Systems Admin)',
      company: 'Finance Office, KNUST',
      description: 'Finding solutions to problems and improving the efficiency of the office.',
    },
    {
      year: '2025',
      role: 'Software Developer Intern',
      company: 'Finance Office, KNUST',
      description: 'Finding solutions to problems and improving the efficiency of the office.',
    }
  ];

  const education = [
    {
      degree: 'Master of Philosophy in Computer Science',
      institution: 'Kwame Nkrumah University of Science and Technology',
      year: '2026 - Present',
    },
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'Kwame Nkrumah University of Science and Technology',
      year: '2022 - 2025',
    },
    {
      degree: 'Introduction to  High Performace Teams',
      institution: 'Queens University, Canada',
      year: '2024',
    },
  ];

  const tabs = [
    { id: 'main-skills', label: 'Main skills' },
    { id: 'awards', label: 'Awards' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education & Certification' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'main-skills':
        return (
          <div className="space-y-6">
            {mainSkills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <h4 className="text-lg font-bold text-[#1f1f1f] dark:text-white transition-colors">{skill.title}</h4>
                <p className="text-[#666666] dark:text-gray-300 text-sm leading-relaxed transition-colors">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        );
      case 'awards':
        return (
          <div className="space-y-6">
            {awards.map((award, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold text-[#1f1f1f] dark:text-white transition-colors">
                    {award.title}
                  </h4>
                  <span className="text-[#666666] dark:text-gray-300 text-sm transition-colors">{award.year}</span>
                </div>
                <p className="text-[#666666] dark:text-gray-300 text-sm leading-relaxed transition-colors">
                  {award.description}
                </p>
              </div>
            ))}
          </div>
        );
      case 'experience':
        return (
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold text-[#1f1f1f] dark:text-white transition-colors">
                    {exp.role}
                  </h4>
                  <span className="text-[#666666] dark:text-gray-300 text-sm transition-colors">{exp.year}</span>
                </div>
                <p className="text-[#ff6b6b] font-semibold text-sm">
                  {exp.company}
                </p>
                <p className="text-[#666666] dark:text-gray-300 text-sm leading-relaxed transition-colors">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        );
      case 'education':
        return (
          <div className="space-y-6">
            {education.map((edu, index) => (
              <div key={index} className="space-y-2">
                <h4 className="text-lg font-bold text-[#1f1f1f] dark:text-white transition-colors">
                  {edu.degree}
                </h4>
                <p className="text-[#ff6b6b] font-semibold text-sm">
                  {edu.institution}
                </p>
                <p className="text-[#666666] dark:text-gray-300 text-sm transition-colors">{edu.year}</p>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="about"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Image */}
          <div
            className={`order-1 lg:order-1 ${
              isVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.1s' }}
          >
            <div className="relative w-full aspect-[3/4] max-w-md mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg overflow-hidden shadow-xl">
                {/* About Image */}
                <div 
                  className="w-full h-full bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: 'url(/me.jpg)',
                    backgroundColor: '#e5e7eb', // Fallback color
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div
            className={`order-2 lg:order-2 space-y-8 ${
              isVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.2s' }}
          >
            

            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl font-bold text-[#1f1f1f] dark:text-white transition-colors">
              About Me
            </h2>

            {/* Description */}
            <p className="text-[#666666] dark:text-gray-300 leading-relaxed max-w-lg transition-colors">
            There are many versions of my story out there, but most have been exaggerated by caffeine and late-night coding.
             I build cool things, break them accidentally, and then pretend it was all part of the plan.
            </p>

            {/* Tabs */}
            <div className="space-y-6">
              {/* Tab Buttons */}
              <div className="flex flex-wrap gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-5 py-2.5 text-sm font-semibold transition-all duration-300 rounded-md ${
                      activeTab === tab.id
                        ? 'bg-[#ff6b6b] text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-[#666666] dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="min-h-[300px]">{renderTabContent()}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
