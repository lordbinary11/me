'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useState } from 'react';
import { blogPosts, getAllCategories } from '@/data/blogPosts';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', ...getAllCategories()];
  
  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter((post) => post.category === selectedCategory);

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
                    <span className="text-sm text-[#666666] dark:text-gray-400">{post.date}</span>
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

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-[#ff6b6b] text-white font-semibold rounded-full hover:bg-[#ee5a5a] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Load More Posts
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

