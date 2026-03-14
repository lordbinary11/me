import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { getPostData, getSortedPostsData } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import BlogPostClient from './BlogPostClient';

export default async function BlogPost({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  
  // Validate slug format - prevent URL-like slugs
  if (slug.startsWith('http://') || slug.startsWith('https://') || slug.includes('://')) {
    notFound();
  }
  
  // Additional validation for common malformed slugs
  if (slug.length > 200 || slug.includes('/') || slug.includes('?')) {
    notFound();
  }
  
  const post = await getPostData(slug);
  
  if (!post) {
    notFound();
  }
  
  // Get related posts (same category, excluding current post)
  const allPosts = await getSortedPostsData();
  const relatedPosts = allPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return <BlogPostClient post={post} relatedPosts={relatedPosts} />;
}

