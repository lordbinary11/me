export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  slug: string;
  author: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Agency Works Only Under These Conditions',
    excerpt:
      'Discover the key conditions that make agency work successful and productive.',
    date: 'March 15, 2024',
    category: 'Business',
    image: '/api/placeholder/600/400',
    slug: 'agency-works-only-under-these-conditions',
    author: 'Mujahid Shahid',
    content: `
      <p class="mb-6 text-[#666666] dark:text-gray-400 leading-relaxed">
        Agency work is a unique form of collaboration that requires specific conditions
        to be successful. In this article, we'll explore the essential elements that
        make agency partnerships thrive.
      </p>
      
      <h2 class="text-3xl font-bold text-[#1f1f1f] dark:text-white mb-4 mt-8">Clear Communication</h2>
      <p class="mb-6 text-[#666666] dark:text-gray-400 leading-relaxed">
        One of the most critical factors for successful agency work is clear and
        consistent communication. Both parties must establish open channels of
        communication from the start, ensuring that expectations, timelines, and
        deliverables are clearly defined.
      </p>
      
      <h2 class="text-3xl font-bold text-[#1f1f1f] dark:text-white mb-4 mt-8">Mutual Trust and Respect</h2>
      <p class="mb-6 text-[#666666] dark:text-gray-400 leading-relaxed">
        Trust is the foundation of any successful agency-client relationship. When
        both parties trust each other's expertise and respect each other's opinions,
        the collaboration becomes more productive and enjoyable.
      </p>
      
      <h2 class="text-3xl font-bold text-[#1f1f1f] dark:text-white mb-4 mt-8">Defined Goals and Objectives</h2>
      <p class="mb-6 text-[#666666] dark:text-gray-400 leading-relaxed">
        Before starting any project, it's essential to have clearly defined goals
        and objectives. This ensures that everyone is working towards the same
        outcome and helps measure success accurately.
      </p>
      
      <h2 class="text-3xl font-bold text-[#1f1f1f] dark:text-white mb-4 mt-8">Flexibility and Adaptability</h2>
      <p class="mb-6 text-[#666666] dark:text-gray-400 leading-relaxed">
        The digital landscape is constantly evolving, and successful agency work
        requires flexibility and adaptability. Both parties must be willing to
        adjust strategies and approaches as new information and opportunities arise.
      </p>
      
      <h2 class="text-3xl font-bold text-[#1f1f1f] dark:text-white mb-4 mt-8">Conclusion</h2>
      <p class="mb-6 text-[#666666] dark:text-gray-400 leading-relaxed">
        Agency work thrives when these conditions are met: clear communication,
        mutual trust, defined goals, and flexibility. By establishing these
        foundations from the start, agencies and clients can create successful,
        long-lasting partnerships.
      </p>
    `,
  },
  {
    id: 2,
    title: 'The Future of Web Development',
    excerpt:
      'Exploring the latest trends and technologies shaping the future of web development.',
    date: 'March 10, 2024',
    category: 'Technology',
    image: '/api/placeholder/600/400',
    slug: 'future-of-web-development',
    author: 'Mujahid Shahid',
    content: `
      <p class="mb-6 text-[#666666] dark:text-gray-400 leading-relaxed">
        Web development is evolving at an unprecedented pace. New frameworks, tools,
        and methodologies are emerging constantly, reshaping how we build and deploy
        web applications.
      </p>
      
      <h2 class="text-3xl font-bold text-[#1f1f1f] dark:text-white mb-4 mt-8">Emerging Technologies</h2>
      <p class="mb-6 text-[#666666] dark:text-gray-400 leading-relaxed">
        From serverless architectures to edge computing, the landscape of web
        development is being transformed by innovative technologies that promise
        better performance, scalability, and developer experience.
      </p>
      
      <h2 class="text-3xl font-bold text-[#1f1f1f] dark:text-white mb-4 mt-8">The Rise of AI in Development</h2>
      <p class="mb-6 text-[#666666] dark:text-gray-400 leading-relaxed">
        Artificial Intelligence is becoming an integral part of the development
        workflow, from code generation to testing and deployment automation.
      </p>
    `,
  },
  {
    id: 3,
    title: 'Design Principles for Modern Web Apps',
    excerpt:
      'Learn the essential design principles that create exceptional user experiences.',
    date: 'March 5, 2024',
    category: 'Design',
    image: '/api/placeholder/600/400',
    slug: 'design-principles-modern-web-apps',
    author: 'Mujahid Shahid',
    content: `
      <p class="mb-6 text-[#666666] dark:text-gray-400 leading-relaxed">
        Great design is more than just aesthetics. It's about creating intuitive,
        accessible, and delightful experiences that users love.
      </p>
      
      <h2 class="text-3xl font-bold text-[#1f1f1f] dark:text-white mb-4 mt-8">User-Centered Design</h2>
      <p class="mb-6 text-[#666666] dark:text-gray-400 leading-relaxed">
        Putting users at the center of the design process ensures that products
        meet real needs and solve actual problems.
      </p>
      
      <h2 class="text-3xl font-bold text-[#1f1f1f] dark:text-white mb-4 mt-8">Responsive and Adaptive</h2>
      <p class="mb-6 text-[#666666] dark:text-gray-400 leading-relaxed">
        Modern web apps must work seamlessly across all devices and screen sizes,
        providing consistent experiences regardless of the platform.
      </p>
    `,
  },
  {
    id: 4,
    title: 'Building Scalable React Applications',
    excerpt:
      'Best practices and patterns for building scalable and maintainable React applications.',
    date: 'February 28, 2024',
    category: 'Development',
    image: '/api/placeholder/600/400',
    slug: 'building-scalable-react-applications',
    author: 'Mujahid Shahid',
    content: `
      <p class="mb-6 text-[#666666] dark:text-gray-400 leading-relaxed">
        Scaling React applications requires careful architecture, performance
        optimization, and maintainable code patterns.
      </p>
      
      <h2 class="text-3xl font-bold text-[#1f1f1f] dark:text-white mb-4 mt-8">Component Architecture</h2>
      <p class="mb-6 text-[#666666] dark:text-gray-400 leading-relaxed">
        A well-structured component hierarchy is crucial for maintainability and
        scalability in large React applications.
      </p>
      
      <h2 class="text-3xl font-bold text-[#1f1f1f] dark:text-white mb-4 mt-8">Performance Optimization</h2>
      <p class="mb-6 text-[#666666] dark:text-gray-400 leading-relaxed">
        Techniques like code splitting, lazy loading, and memoization can significantly
        improve the performance of React applications.
      </p>
    `,
  },
  {
    id: 5,
    title: 'The Art of User Experience Design',
    excerpt:
      'Understanding the psychology behind great user experiences and how to implement them.',
    date: 'February 20, 2024',
    category: 'Design',
    image: '/api/placeholder/600/400',
    slug: 'art-of-user-experience-design',
    author: 'Mujahid Shahid',
    content: `
      <p class="mb-6 text-[#666666] dark:text-gray-400 leading-relaxed">
        User Experience Design is both an art and a science, combining creative
        thinking with user research and data-driven decisions.
      </p>
      
      <h2 class="text-3xl font-bold text-[#1f1f1f] dark:text-white mb-4 mt-8">Understanding User Psychology</h2>
      <p class="mb-6 text-[#666666] dark:text-gray-400 leading-relaxed">
        Deep understanding of how users think and behave is fundamental to creating
        great user experiences.
      </p>
      
      <h2 class="text-3xl font-bold text-[#1f1f1f] dark:text-white mb-4 mt-8">Designing for Emotions</h2>
      <p class="mb-6 text-[#666666] dark:text-gray-400 leading-relaxed">
        Great UX design doesn't just solve problems—it creates emotional connections
        with users that keep them coming back.
      </p>
    `,
  },
  {
    id: 6,
    title: 'Optimizing Website Performance',
    excerpt:
      'Practical tips and techniques for improving website speed and performance.',
    date: 'February 15, 2024',
    category: 'Development',
    image: '/api/placeholder/600/400',
    slug: 'optimizing-website-performance',
    author: 'Mujahid Shahid',
    content: `
      <p class="mb-6 text-[#666666] dark:text-gray-400 leading-relaxed">
        Website performance directly impacts user experience, SEO, and conversion
        rates. Here are practical strategies to optimize your site.
      </p>
      
      <h2 class="text-3xl font-bold text-[#1f1f1f] dark:text-white mb-4 mt-8">Image Optimization</h2>
      <p class="mb-6 text-[#666666] dark:text-gray-400 leading-relaxed">
        Optimizing images through compression, modern formats, and responsive
        delivery can dramatically improve load times.
      </p>
      
      <h2 class="text-3xl font-bold text-[#1f1f1f] dark:text-white mb-4 mt-8">Code Splitting and Lazy Loading</h2>
      <p class="mb-6 text-[#666666] dark:text-gray-400 leading-relaxed">
        Breaking down your code and loading only what's needed can significantly
        reduce initial load times and improve performance.
      </p>
    `,
  },
];

// Helper function to get a post by slug
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

// Helper function to get all categories
export function getAllCategories(): string[] {
  const categories = new Set(blogPosts.map((post) => post.category));
  return Array.from(categories);
}

