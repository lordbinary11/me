import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs-extra';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/blog');

interface PostData {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  author: string;
  content: string;
}

export async function GET() {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const posts = await Promise.all(
      fileNames.map(async (fileName) => {
        const id = parseInt(fileName.replace(/\.md$/, ''));
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);

        return {
          id,
          slug: matterResult.data.slug,
          content: matterResult.content,
          ...matterResult.data,
        } as PostData;
      })
    );

    return NextResponse.json(posts.sort((a, b) => {
      if (a.date < b.date) return 1;
      return -1;
    }));
  } catch (error) {
    console.error('Error reading posts:', error);
    return NextResponse.json({ error: 'Failed to read posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Get the next available ID
    const fileNames = fs.readdirSync(postsDirectory);
    const ids = fileNames.map(name => parseInt(name.replace(/\.md$/, ''))).filter(id => !isNaN(id));
    const nextId = ids.length > 0 ? Math.max(...ids) + 1 : 1;

    const { title, excerpt, date, category, image, slug, author, content } = body;
    
    const frontmatter = `---
title: '${title}'
excerpt: '${excerpt}'
date: '${date}'
category: '${category}'
image: '${image}'
author: '${author}'
slug: '${slug}'
---

${content}`;

    const filePath = path.join(postsDirectory, `${nextId}.md`);
    fs.writeFileSync(filePath, frontmatter);

    return NextResponse.json({ success: true, id: nextId });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
