export interface PortfolioProject {
  id: number;
  title: string;
  category: string;
  image: string;
  slug: string;
  description: string;
  projectUrl?: string;
  githubUrl?: string;
  technologies: string[];
  content: string;
  featured?: boolean;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 1,
    title: 'Verdiscan',
    category: 'Development',
    image: '/verdiscan.jpg',
    slug: 'verdiscan',
    description: 'A comprehensive verification and scanning platform for document authentication.',
    projectUrl: 'https://verdiscan.com',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    featured: true,
    content: `
      <p class="mb-6 text-[#666666] dark:text-gray-400 leading-relaxed">
        Verdiscan is a cutting-edge platform designed to revolutionize document verification and authentication. 
        Built with modern web technologies, it provides secure and efficient scanning solutions for businesses 
        and individuals alike.
      </p>
      
      <h2 class="text-3xl font-bold text-[#1f1f1f] dark:text-white mb-4 mt-8">Project Overview</h2>
      <p class="mb-6 text-[#666666] dark:text-gray-400 leading-relaxed">
        The platform was developed to address the growing need for reliable document verification systems. 
        Verdiscan combines advanced scanning technology with an intuitive user interface to deliver a seamless 
        experience for users across various industries.
      </p>
      
      <h2 class="text-3xl font-bold text-[#1f1f1f] dark:text-white mb-4 mt-8">Key Features</h2>
      <ul class="mb-6 text-[#666666] dark:text-gray-400 leading-relaxed list-disc list-inside space-y-2">
        <li>Real-time document scanning and verification</li>
        <li>Secure authentication system</li>
        <li>Multi-format document support</li>
        <li>Advanced analytics and reporting</li>
        <li>Responsive design for all devices</li>
      </ul>
      
      <h2 class="text-3xl font-bold text-[#1f1f1f] dark:text-white mb-4 mt-8">Technologies Used</h2>
      <p class="mb-6 text-[#666666] dark:text-gray-400 leading-relaxed">
        The project leverages React and Next.js for the frontend, ensuring fast performance and excellent 
        user experience. TypeScript provides type safety, while Tailwind CSS enables rapid UI development. 
        The backend is powered by Node.js, ensuring scalability and reliability.
      </p>
      
      <h2 class="text-3xl font-bold text-[#1f1f1f] dark:text-white mb-4 mt-8">Challenges & Solutions</h2>
      <p class="mb-6 text-[#666666] dark:text-gray-400 leading-relaxed">
        One of the main challenges was implementing real-time document processing while maintaining 
        system performance. This was solved through optimized algorithms and efficient state management. 
        Security was another critical aspect, addressed through robust authentication and encryption protocols.
      </p>
    `,
  },
  {
    id: 2,
    title: 'Reporting Development',
    category: 'Development',
    image: '/api/placeholder/800/600',
    slug: 'reporting-development',
    description: 'Advanced reporting system with data visualization and analytics capabilities.',
    projectUrl: 'https://example.com/reporting',
    technologies: ['React', 'D3.js', 'Python', 'PostgreSQL'],
    featured: true,
    content: `
      <p class="mb-6 text-[#666666] dark:text-gray-400 leading-relaxed">
        A comprehensive reporting platform that transforms raw data into actionable insights through 
        powerful visualization tools and advanced analytics.
      </p>
      
      <h2 class="text-3xl font-bold text-[#1f1f1f] dark:text-white mb-4 mt-8">Project Overview</h2>
      <p class="mb-6 text-[#666666] dark:text-gray-400 leading-relaxed">
        This reporting system was designed to help businesses make data-driven decisions by providing 
        intuitive dashboards and detailed reports. The platform supports multiple data sources and 
        offers customizable reporting templates.
      </p>
      
      <h2 class="text-3xl font-bold text-[#1f1f1f] dark:text-white mb-4 mt-8">Key Features</h2>
      <ul class="mb-6 text-[#666666] dark:text-gray-400 leading-relaxed list-disc list-inside space-y-2">
        <li>Interactive data visualizations</li>
        <li>Custom report builder</li>
        <li>Real-time data updates</li>
        <li>Export to multiple formats</li>
        <li>Role-based access control</li>
      </ul>
    `,
  },
  {
    id: 3,
    title: 'SEO Marketing',
    category: 'Application Development',
    image: '/api/placeholder/800/600',
    slug: 'seo-marketing',
    description: 'SEO optimization platform with keyword tracking and analytics.',
    projectUrl: 'https://example.com/seo',
    technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Express'],
    featured: true,
    content: `
      <p class="mb-6 text-[#666666] dark:text-gray-400 leading-relaxed">
        An all-in-one SEO marketing platform that helps businesses improve their online visibility 
        and track their search engine rankings.
      </p>
      
      <h2 class="text-3xl font-bold text-[#1f1f1f] dark:text-white mb-4 mt-8">Project Overview</h2>
      <p class="mb-6 text-[#666666] dark:text-gray-400 leading-relaxed">
        This platform provides comprehensive SEO tools including keyword research, rank tracking, 
        competitor analysis, and performance reporting. It's designed to help marketers and SEO 
        professionals optimize their strategies effectively.
      </p>
    `,
  },
  {
    id: 4,
    title: 'Web Application',
    category: 'Development',
    image: '/api/placeholder/800/600',
    slug: 'web-application',
    description: 'Modern web application with full-stack capabilities.',
    projectUrl: 'https://example.com/webapp',
    technologies: ['React', 'Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
    featured: true,
    content: `
      <p class="mb-6 text-[#666666] dark:text-gray-400 leading-relaxed">
        A full-featured web application built with modern technologies, providing a robust platform 
        for various business needs.
      </p>
      
      <h2 class="text-3xl font-bold text-[#1f1f1f] dark:text-white mb-4 mt-8">Project Overview</h2>
      <p class="mb-6 text-[#666666] dark:text-gray-400 leading-relaxed">
        This application demonstrates best practices in modern web development, featuring a clean 
        architecture, scalable design, and excellent user experience.
      </p>
    `,
  },
  {
    id: 5,
    title: 'Mobile App Design',
    category: 'Application Development',
    image: '/api/placeholder/800/600',
    slug: 'mobile-app-design',
    description: 'Beautiful and intuitive mobile application design.',
    projectUrl: 'https://example.com/mobile',
    technologies: ['React Native', 'TypeScript', 'Firebase'],
    featured: true,
    content: `
      <p class="mb-6 text-[#666666] dark:text-gray-400 leading-relaxed">
        A mobile application featuring modern design principles and smooth user interactions, 
        built with React Native for cross-platform compatibility.
      </p>
      
      <h2 class="text-3xl font-bold text-[#1f1f1f] dark:text-white mb-4 mt-8">Project Overview</h2>
      <p class="mb-6 text-[#666666] dark:text-gray-400 leading-relaxed">
        This mobile app design focuses on user experience and accessibility, ensuring that users 
        can easily navigate and interact with the application on any device.
      </p>
    `,
  },
  {
    id: 6,
    title: 'Brand Identity',
    category: 'Design',
    image: '/api/placeholder/800/600',
    slug: 'brand-identity',
    description: 'Complete brand identity design including logo, colors, and typography.',
    technologies: ['Figma', 'Adobe Illustrator', 'Photoshop'],
    featured: true,
    content: `
      <p class="mb-6 text-[#666666] dark:text-gray-400 leading-relaxed">
        A comprehensive brand identity project that establishes a cohesive visual language across 
        all brand touchpoints.
      </p>
      
      <h2 class="text-3xl font-bold text-[#1f1f1f] dark:text-white mb-4 mt-8">Project Overview</h2>
      <p class="mb-6 text-[#666666] dark:text-gray-400 leading-relaxed">
        This project involved creating a complete brand identity system, including logo design, 
        color palette, typography, and brand guidelines. The design reflects the brand's values 
        and resonates with the target audience.
      </p>
    `,
  },
];

// Helper function to get a project by slug
export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return portfolioProjects.find((project) => project.slug === slug);
}

// Helper function to get featured projects
export function getFeaturedProjects(): PortfolioProject[] {
  return portfolioProjects.filter((project) => project.featured);
}

// Helper function to get all categories
export function getAllCategories(): string[] {
  const categories = new Set(portfolioProjects.map((project) => project.category));
  return Array.from(categories);
}

