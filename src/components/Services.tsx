'use client';

import { useEffect, useState } from 'react';

export default function Services() {
  const [isVisible, setIsVisible] = useState(false);

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

    const element = document.getElementById('services');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const services = [
    {
      // Mobile App Development
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
        </svg>
      ),
      title: 'Mobile App Development',
      description: 'Cross‑platform apps with native UX and robust performance.',
    },
    {
      // Web App Development
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
        </svg>
      ),
      title: 'Web App Development',
      description: 'Full‑stack apps with Next.js, TypeScript, secure APIs and CI/CD.',
    },
    {
      // AI/ML Products
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 7.5A3 3 0 0112 4.5a3 3 0 013 3v9a3 3 0 01-3 3 3 3 0 01-3-3v-9zM3.75 12h3.75m9 0h3.75M7.5 9.75h9m-9 4.5h9" />
        </svg>
      ),
      title: 'AI / ML Products',
      description: 'Model integration, LLM features and intelligent automation.',
    },
    {
      // Data Analytics
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>
      ),
      title: 'Data Analytics',
      description: 'ETL/ELT pipelines, dashboards, and decision‑ready insights.',
    },
    {
      // WordPress
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
        </svg>
      ),
      title: 'WordPress',
      description: 'Custom themes/plugins, fast builds, SEO and security.',
    },
  ];

  return (
    <section
      id="services"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="container mx-auto max-w-6xl">
        <div
          className={`text-center mb-16 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >

          
          {/* Main Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-[#1f1f1f] dark:text-white mb-4 transition-colors">
            My Awesome Service
          </h2>
          
          {/* Red Underline */}
          <div className="w-24 h-1 bg-[#ff6b6b] mx-auto mb-6"></div>
          
          {/* Description */}
          <p className="text-lg text-[#666666] dark:text-gray-300 max-w-2xl mx-auto transition-colors">
           Services I Offer
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900/70 transition-all duration-300 transform hover:-translate-y-2 ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="text-[#ff6b6b] mb-4">
                {service.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-bold text-[#1f1f1f] dark:text-white mb-3 transition-colors">
                {service.title}
              </h3>
              
              {/* Description */}
              <p className="text-[#666666] dark:text-gray-300 leading-relaxed transition-colors">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
