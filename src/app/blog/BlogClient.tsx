'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useState } from 'react';
import { BlogPost } from '@/lib/markdown';

interface BlogClientProps {
  posts: BlogPost[];
  categories: string[];
}

export default function BlogClient({ posts, categories }: BlogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('Categories');
  const [selectedDateFilter, setSelectedDateFilter] = useState('Date');
  const allCategories = ['Categories', ...categories];
  
  // Get unique years from posts for date filtering
  const uniqueYears = [...new Set(posts.map(post => new Date(post.date).getFullYear().toString()))].sort((a, b) => parseInt(b) - parseInt(a));
  const dateFilters = ['Date', ...uniqueYears.map(year => `${year}`), 'Last 30 Days', 'Last 6 Months', 'Last Year'];
  
  const filteredPosts = posts.filter((post) => {
    // Category filter
    const categoryMatch = selectedCategory === 'Categories' || post.category === selectedCategory;
    
    // Date filter
    let dateMatch = true;
    const postDate = new Date(post.date);
    const now = new Date();
    
    if (selectedDateFilter === 'Last 30 Days') {
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      dateMatch = postDate >= thirtyDaysAgo;
    } else if (selectedDateFilter === 'Last 6 Months') {
      const sixMonthsAgo = new Date(now.getTime() - 6 * 30 * 24 * 60 * 60 * 1000);
      dateMatch = postDate >= sixMonthsAgo;
    } else if (selectedDateFilter === 'Last Year') {
      const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      dateMatch = postDate >= oneYearAgo;
    } else if (selectedDateFilter !== 'Date') {
      dateMatch = postDate.getFullYear().toString() === selectedDateFilter;
    }
    
    return categoryMatch && dateMatch;
  });

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <Header />
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold text-[#1f1f1f] dark:text-white mb-4">
              My <span className="text-[#ff6b6b]">Blog</span>
            </h1>
            <div className="w-24 h-1 bg-[#ff6b6b] mx-auto mb-6"></div>
            <p className="text-lg text-[#666666] dark:text-gray-400 max-w-2xl mx-auto">
              Thoughts, insights, and tutorials on web development, design, and
              technology.
            </p>
          </div>

          {/* Filters */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {/* Category Dropdown */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-[#1f1f1f] dark:text-white hover:border-[#ff6b6b] focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent transition-all duration-200 cursor-pointer"
                >
                  {allCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-4 h-4 text-[#666666] dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
              </div>

              {/* Date Dropdown */}
              <div className="relative">
                <select
                  value={selectedDateFilter}
                  onChange={(e) => setSelectedDateFilter(e.target.value)}
                  className="appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-[#1f1f1f] dark:text-white hover:border-[#ff6b6b] focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent transition-all duration-200 cursor-pointer"
                >
                  {dateFilters.map((filter) => (
                    <option key={filter} value={filter}>
                      {filter}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-4 h-4 text-[#666666] dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="text-center">
              <p className="text-sm text-[#666666] dark:text-gray-400">
                Showing {filteredPosts.length} of {posts.length} posts
              </p>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <article
                key={post.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
                    {post.image && post.image !== '/api/placeholder/600/400' ? (
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1f1f1f] dark:from-black to-transparent opacity-0 hover:opacity-60 transition-opacity duration-300"></div>
                    <span className="absolute top-4 left-4 px-3 py-1 bg-[#ff6b6b] text-white text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-[#666666] dark:text-gray-400 mb-2">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {post.date}
                    </div>
                    <h2 className="text-xl font-bold text-[#1f1f1f] dark:text-white mt-2 mb-3 hover:text-[#ff6b6b] transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-[#666666] dark:text-gray-400 leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    <span className="text-[#ff6b6b] font-semibold text-sm hover:underline">
                      Read More →
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-[#1f1f1f] dark:text-white mb-2">No posts found</h3>
              <p className="text-[#666666] dark:text-gray-400">Try adjusting your filters to find what you're looking for.</p>
            </div>
          )}

          {/* Load More Button */}
          {filteredPosts.length > 0 && (
            <div className="text-center mt-12">
              <button className="px-8 py-4 bg-[#ff6b6b] text-white font-semibold rounded-full hover:bg-[#ee5a5a] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Load More Posts
              </button>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
