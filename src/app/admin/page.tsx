'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: string;
  category: string;
  image?: string;
  author: string;
}

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

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'posts' | 'projects'>('posts');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  
  // Blog form data
  const [blogFormData, setBlogFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    category: 'Technology',
    image: '',
    author: 'Admin'
  });

  // Project form data
  const [projectFormData, setProjectFormData] = useState({
    title: '',
    slug: '',
    content: '',
    description: '',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    category: 'Development',
    image: '',
    projectUrl: '',
    githubUrl: '',
    technologies: '',
    featured: false
  });

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchProjects();
    setLoading(false);
  }, []);

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingPost ? `/api/blog/${editingPost.id}` : '/api/blog';
      const method = editingPost ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogFormData),
      });

      if (response.ok) {
        await fetchPosts();
        setIsEditing(false);
        setEditingPost(null);
        setBlogFormData({
          title: '',
          slug: '',
          content: '',
          excerpt: '',
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          category: 'Technology',
          image: '',
          author: 'Admin'
        });
      }
    } catch (error) {
      console.error('Failed to save post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingProject ? `/api/projects/${editingProject.id}` : '/api/projects';
      const method = editingProject ? 'PUT' : 'POST';
      
      const projectData = {
        ...projectFormData,
        technologies: projectFormData.technologies.split(',').map(t => t.trim()).filter(t => t)
      };
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        await fetchProjects();
        setIsEditing(false);
        setEditingProject(null);
        setProjectFormData({
          title: '',
          slug: '',
          content: '',
          description: '',
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          category: 'Development',
          image: '',
          projectUrl: '',
          githubUrl: '',
          technologies: '',
          featured: false
        });
      }
    } catch (error) {
      console.error('Failed to save project:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setBlogFormData({
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt,
      date: post.date,
      category: post.category,
      image: post.image || '',
      author: post.author
    });
    setIsEditing(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setProjectFormData({
      title: project.title,
      slug: project.slug,
      content: project.content,
      description: project.description,
      date: project.date,
      category: project.category,
      image: project.image || '',
      projectUrl: project.projectUrl || '',
      githubUrl: project.githubUrl || '',
      technologies: project.technologies.join(', '),
      featured: project.featured || false
    });
    setIsEditing(true);
  };

  const handleDeletePost = async (id: number) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await fetch(`/api/blog/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          await fetchPosts();
        }
      } catch (error) {
        console.error('Failed to delete post:', error);
      }
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        const response = await fetch(`/api/projects/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          await fetchProjects();
        }
      } catch (error) {
        console.error('Failed to delete project:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading && posts.length === 0 && projects.length === 0) {
    return (
      <main className="min-h-screen bg-white dark:bg-black">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-2xl text-[#666666] dark:text-gray-400">Loading...</div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <Header />
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-[#1f1f1f] dark:text-white mb-2">
                Admin Panel
              </h1>
              <p className="text-[#666666] dark:text-gray-400">
                Manage your blog posts and projects
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8">
            <button
              onClick={() => setActiveTab('posts')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'posts'
                  ? 'text-[#ff6b6b] border-b-2 border-[#ff6b6b]'
                  : 'text-[#666666] dark:text-gray-400 hover:text-[#1f1f1f] dark:hover:text-white'
              }`}
            >
              Blog Posts ({posts.length})
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'projects'
                  ? 'text-[#ff6b6b] border-b-2 border-[#ff6b6b]'
                  : 'text-[#666666] dark:text-gray-400 hover:text-[#1f1f1f] dark:hover:text-white'
              }`}
            >
              Projects ({projects.length})
            </button>
          </div>

          {/* Blog Posts Tab */}
          {activeTab === 'posts' && (
            <div>
              {!isEditing ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-[#1f1f1f] dark:text-white">
                      Blog Posts
                    </h2>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-6 py-3 bg-[#ff6b6b] text-white rounded-lg hover:bg-[#ee5a5a] transition-colors"
                    >
                      New Post
                    </button>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Title
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Category
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                          {posts.map((post) => (
                            <tr key={post.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div>
                                  <div className="text-sm font-medium text-[#1f1f1f] dark:text-white">
                                    {post.title}
                                  </div>
                                  <div className="text-sm text-[#666666] dark:text-gray-400">
                                    {post.slug}
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 py-1 text-xs font-medium bg-[#ff6b6b] text-white rounded-full">
                                  {post.category}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-[#666666] dark:text-gray-400">
                                {post.date}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button
                                  onClick={() => handleEditPost(post)}
                                  className="text-[#ff6b6b] hover:text-[#ee5a5a] mr-4"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeletePost(post.id)}
                                  className="text-red-500 hover:text-red-600"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-[#1f1f1f] dark:text-white mb-6">
                    {editingPost ? 'Edit Post' : 'New Post'}
                  </h2>
                  <form onSubmit={handleBlogSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-[#1f1f1f] dark:text-white mb-2">
                          Title
                        </label>
                        <input
                          type="text"
                          required
                          value={blogFormData.title}
                          onChange={(e) => setBlogFormData({ ...blogFormData, title: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent bg-white dark:bg-gray-700 text-[#1f1f1f] dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1f1f1f] dark:text-white mb-2">
                          Slug
                        </label>
                        <input
                          type="text"
                          required
                          value={blogFormData.slug}
                          onChange={(e) => setBlogFormData({ ...blogFormData, slug: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent bg-white dark:bg-gray-700 text-[#1f1f1f] dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#1f1f1f] dark:text-white mb-2">
                        Date
                      </label>
                      <input
                        type="text"
                        required
                        value={blogFormData.date}
                        onChange={(e) => setBlogFormData({ ...blogFormData, date: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent bg-white dark:bg-gray-700 text-[#1f1f1f] dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#1f1f1f] dark:text-white mb-2">
                        Excerpt
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={blogFormData.excerpt}
                        onChange={(e) => setBlogFormData({ ...blogFormData, excerpt: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent bg-white dark:bg-gray-700 text-[#1f1f1f] dark:text-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-[#1f1f1f] dark:text-white mb-2">
                          Category
                        </label>
                        <select
                          value={blogFormData.category}
                          onChange={(e) => setBlogFormData({ ...blogFormData, category: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent bg-white dark:bg-gray-700 text-[#1f1f1f] dark:text-white"
                        >
                          <option value="Technology">Technology</option>
                          <option value="Development">Development</option>
                          <option value="Design">Design</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1f1f1f] dark:text-white mb-2">
                          Author
                        </label>
                        <input
                          type="text"
                          required
                          value={blogFormData.author}
                          onChange={(e) => setBlogFormData({ ...blogFormData, author: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent bg-white dark:bg-gray-700 text-[#1f1f1f] dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#1f1f1f] dark:text-white mb-2">
                        Image URL
                      </label>
                      <input
                        type="text"
                        value={blogFormData.image}
                        onChange={(e) => setBlogFormData({ ...blogFormData, image: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent bg-white dark:bg-gray-700 text-[#1f1f1f] dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#1f1f1f] dark:text-white mb-2">
                        Content (Markdown)
                      </label>
                      <textarea
                        required
                        rows={10}
                        value={blogFormData.content}
                        onChange={(e) => setBlogFormData({ ...blogFormData, content: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent bg-white dark:bg-gray-700 text-[#1f1f1f] dark:text-white"
                      />
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 bg-[#ff6b6b] text-white rounded-lg hover:bg-[#ee5a5a] transition-colors disabled:opacity-50"
                      >
                        {loading ? 'Saving...' : (editingPost ? 'Update Post' : 'Create Post')}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          setEditingPost(null);
                          setBlogFormData({
                            title: '',
                            slug: '',
                            content: '',
                            excerpt: '',
                            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                            category: 'Technology',
                            image: '',
                            author: 'Admin'
                          });
                        }}
                        className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-[#1f1f1f] dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div>
              {!isEditing ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-[#1f1f1f] dark:text-white">
                      Projects
                    </h2>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-6 py-3 bg-[#ff6b6b] text-white rounded-lg hover:bg-[#ee5a5a] transition-colors"
                    >
                      New Project
                    </button>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Title
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Category
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Featured
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                          {projects.map((project) => (
                            <tr key={project.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div>
                                  <div className="text-sm font-medium text-[#1f1f1f] dark:text-white">
                                    {project.title}
                                  </div>
                                  <div className="text-sm text-[#666666] dark:text-gray-400">
                                    {project.slug}
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 py-1 text-xs font-medium bg-[#ff6b6b] text-white rounded-full">
                                  {project.category}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {project.featured ? (
                                  <span className="px-2 py-1 text-xs font-medium bg-green-500 text-white rounded-full">
                                    Featured
                                  </span>
                                ) : (
                                  <span className="px-2 py-1 text-xs font-medium bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full">
                                    Standard
                                  </span>
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-[#666666] dark:text-gray-400">
                                {project.date}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button
                                  onClick={() => handleEditProject(project)}
                                  className="text-[#ff6b6b] hover:text-[#ee5a5a] mr-4"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteProject(project.id)}
                                  className="text-red-500 hover:text-red-600"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-[#1f1f1f] dark:text-white mb-6">
                    {editingProject ? 'Edit Project' : 'New Project'}
                  </h2>
                  <form onSubmit={handleProjectSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-[#1f1f1f] dark:text-white mb-2">
                          Title
                        </label>
                        <input
                          type="text"
                          required
                          value={projectFormData.title}
                          onChange={(e) => setProjectFormData({ ...projectFormData, title: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent bg-white dark:bg-gray-700 text-[#1f1f1f] dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1f1f1f] dark:text-white mb-2">
                          Slug
                        </label>
                        <input
                          type="text"
                          required
                          value={projectFormData.slug}
                          onChange={(e) => setProjectFormData({ ...projectFormData, slug: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent bg-white dark:bg-gray-700 text-[#1f1f1f] dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#1f1f1f] dark:text-white mb-2">
                        Description
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={projectFormData.description}
                        onChange={(e) => setProjectFormData({ ...projectFormData, description: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent bg-white dark:bg-gray-700 text-[#1f1f1f] dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#1f1f1f] dark:text-white mb-2">
                        Date
                      </label>
                      <input
                        type="text"
                        required
                        value={projectFormData.date}
                        onChange={(e) => setProjectFormData({ ...projectFormData, date: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent bg-white dark:bg-gray-700 text-[#1f1f1f] dark:text-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-[#1f1f1f] dark:text-white mb-2">
                          Category
                        </label>
                        <select
                          value={projectFormData.category}
                          onChange={(e) => setProjectFormData({ ...projectFormData, category: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent bg-white dark:bg-gray-700 text-[#1f1f1f] dark:text-white"
                        >
                          <option value="Development">Development</option>
                          <option value="Application Development">Application Development</option>
                          <option value="Design">Design</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1f1f1f] dark:text-white mb-2">
                          Featured
                        </label>
                        <select
                          value={projectFormData.featured.toString()}
                          onChange={(e) => setProjectFormData({ ...projectFormData, featured: e.target.value === 'true' })}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent bg-white dark:bg-gray-700 text-[#1f1f1f] dark:text-white"
                        >
                          <option value="false">No</option>
                          <option value="true">Yes</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-[#1f1f1f] dark:text-white mb-2">
                          Project URL
                        </label>
                        <input
                          type="url"
                          value={projectFormData.projectUrl}
                          onChange={(e) => setProjectFormData({ ...projectFormData, projectUrl: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent bg-white dark:bg-gray-700 text-[#1f1f1f] dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1f1f1f] dark:text-white mb-2">
                          GitHub URL
                        </label>
                        <input
                          type="url"
                          value={projectFormData.githubUrl}
                          onChange={(e) => setProjectFormData({ ...projectFormData, githubUrl: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent bg-white dark:bg-gray-700 text-[#1f1f1f] dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#1f1f1f] dark:text-white mb-2">
                        Image URL
                      </label>
                      <input
                        type="text"
                        value={projectFormData.image}
                        onChange={(e) => setProjectFormData({ ...projectFormData, image: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent bg-white dark:bg-gray-700 text-[#1f1f1f] dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#1f1f1f] dark:text-white mb-2">
                        Technologies (comma-separated)
                      </label>
                      <input
                        type="text"
                        value={projectFormData.technologies}
                        onChange={(e) => setProjectFormData({ ...projectFormData, technologies: e.target.value })}
                        placeholder="React, Next.js, TypeScript"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent bg-white dark:bg-gray-700 text-[#1f1f1f] dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#1f1f1f] dark:text-white mb-2">
                        Content (Markdown)
                      </label>
                      <textarea
                        required
                        rows={10}
                        value={projectFormData.content}
                        onChange={(e) => setProjectFormData({ ...projectFormData, content: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent bg-white dark:bg-gray-700 text-[#1f1f1f] dark:text-white"
                      />
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 bg-[#ff6b6b] text-white rounded-lg hover:bg-[#ee5a5a] transition-colors disabled:opacity-50"
                      >
                        {loading ? 'Saving...' : (editingProject ? 'Update Project' : 'Create Project')}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          setEditingProject(null);
                          setProjectFormData({
                            title: '',
                            slug: '',
                            content: '',
                            description: '',
                            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                            category: 'Development',
                            image: '',
                            projectUrl: '',
                            githubUrl: '',
                            technologies: '',
                            featured: false
                          });
                        }}
                        className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-[#1f1f1f] dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
