import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import BlogClient from './BlogClient';
import { getSortedPostsData, getAllCategories } from '@/lib/markdown';

export default async function Blog() {
  const posts = await getSortedPostsData();
  const categories = getAllCategories();

  return <BlogClient posts={posts} categories={categories} />;
}

