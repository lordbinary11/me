import fs from 'fs-extra';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/blog');
const projectsDirectory = path.join(process.cwd(), 'content/projects');

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

export interface Project {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
  slug: string;
  projectUrl?: string;
  githubUrl?: string;
  technologies: string[];
  featured?: boolean;
  content: string;
}

export async function getSortedPostsData(): Promise<BlogPost[]> {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      // Remove ".md" from file name to get id
      const id = parseInt(fileName.replace(/\.md$/, ''));

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Use remark to convert markdown into HTML string
      const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
      const contentHtml = processedContent.toString();

      // Combine the data with the id, slug, and contentHtml
      return {
        id,
        slug: fileName.replace(/\.md$/, ''),
        content: contentHtml,
        ...matterResult.data,
      } as BlogPost;
    })
  );

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((name) => {
    return {
      params: {
        slug: name.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(slug: string): Promise<BlogPost> {
  // Find the file that contains the matching slug in frontmatter
  const fileNames = fs.readdirSync(postsDirectory);
  
  for (const fileName of fileNames) {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    
    if (matterResult.data.slug === slug) {
      // Use remark to convert markdown into HTML string
      const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
      const contentHtml = processedContent.toString();

      // Combine the data with the id and contentHtml
      return {
        id: parseInt(fileName.replace(/\.md$/, '')),
        slug,
        content: contentHtml,
        ...matterResult.data,
      } as BlogPost;
    }
  }
  
  throw new Error(`Post with slug "${slug}" not found`);
}

export function getAllCategories(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const categories = new Set<string>();
  
  fileNames.forEach((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    
    if (matterResult.data.category) {
      categories.add(matterResult.data.category);
    }
  });
  
  return Array.from(categories);
}

// Project management functions
export async function getSortedProjectsData(): Promise<Project[]> {
  // Get file names under /projects
  const fileNames = fs.readdirSync(projectsDirectory);
  const allProjectsData = await Promise.all(
    fileNames.map(async (fileName) => {
      // Remove ".md" from file name to get id
      const id = parseInt(fileName.replace(/\.md$/, ''));

      // Read markdown file as string
      const fullPath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the project metadata section
      const matterResult = matter(fileContents);

      // Use remark to convert markdown into HTML string
      const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
      const contentHtml = processedContent.toString();

      // Combine the data with the id, slug, and contentHtml
      return {
        id,
        slug: fileName.replace(/\.md$/, ''),
        content: contentHtml,
        ...matterResult.data,
      } as Project;
    })
  );

  // Sort projects by date
  return allProjectsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllProjectSlugs() {
  const fileNames = fs.readdirSync(projectsDirectory);
  return fileNames.map((name) => {
    return {
      params: {
        slug: name.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getProjectData(slug: string): Promise<Project> {
  // Find the file that contains the matching slug in frontmatter
  const fileNames = fs.readdirSync(projectsDirectory);
  
  for (const fileName of fileNames) {
    const fullPath = path.join(projectsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    
    if (matterResult.data.slug === slug) {
      // Use remark to convert markdown into HTML string
      const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
      const contentHtml = processedContent.toString();

      // Combine the data with the id and contentHtml
      return {
        id: parseInt(fileName.replace(/\.md$/, '')),
        slug,
        content: contentHtml,
        ...matterResult.data,
      } as Project;
    }
  }
  
  throw new Error(`Project with slug "${slug}" not found`);
}

export function getAllProjectCategories(): string[] {
  const fileNames = fs.readdirSync(projectsDirectory);
  const categories = new Set<string>();
  
  fileNames.forEach((fileName) => {
    const fullPath = path.join(projectsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    
    if (matterResult.data.category) {
      categories.add(matterResult.data.category);
    }
  });
  
  return Array.from(categories);
}
