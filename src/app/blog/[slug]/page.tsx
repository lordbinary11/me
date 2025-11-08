import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { getPostBySlug, blogPosts } from '@/data/blogPosts';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export default async function BlogPost({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }
  
  // Get related posts (same category, excluding current post)
  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <Header />
      <article className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <Link
            href="/blog"
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
            Back to Blog
          </Link>

          {/* Post Header */}
          <header className="mb-12 animate-fade-in-up">
            <span className="inline-block px-4 py-2 bg-[#ff6b6b] text-white text-sm font-semibold rounded-full mb-4">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1f1f1f] dark:text-white mb-4">
              {post.title}
            </h1>
            <div className="flex items-center space-x-4 text-[#666666] dark:text-gray-400 text-sm">
              <span>{post.date}</span>
              <span>•</span>
              <span>By {post.author}</span>
            </div>
          </header>

          {/* Featured Image */}
          {post.image && post.image !== '/api/placeholder/600/400' ? (
            <div className="mb-12 h-96 rounded-lg overflow-hidden relative">
              <Image
                src={post.image}
                alt={post.title}
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

          {/* Post Content */}
          <div
            className="blog-content animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-bold text-[#1f1f1f] dark:text-white mb-4">Share this post</h3>
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-[#1f1f1f] text-white rounded-full hover:bg-[#ff6b6b] transition-colors">
                Twitter
              </button>
              <button className="px-4 py-2 bg-[#1f1f1f] text-white rounded-full hover:bg-[#ff6b6b] transition-colors">
                LinkedIn
              </button>
              <button className="px-4 py-2 bg-[#1f1f1f] text-white rounded-full hover:bg-[#ff6b6b] transition-colors">
                Facebook
              </button>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
              <h3 className="text-2xl font-bold text-[#1f1f1f] dark:text-white mb-8">Related Posts</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="block p-6 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <h4 className="font-bold text-[#1f1f1f] dark:text-white mb-2 hover:text-[#ff6b6b] transition-colors">
                      {relatedPost.title}
                    </h4>
                    <p className="text-sm text-[#666666] dark:text-gray-400">{relatedPost.date}</p>
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

