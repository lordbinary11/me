import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs-extra';
import path from 'path';
import matter from 'gray-matter';
import { Project } from '@/lib/markdown';

const projectsDirectory = path.join(process.cwd(), 'content/projects');

export async function GET() {
  try {
    const fileNames = fs.readdirSync(projectsDirectory);
    const projects = fileNames.map((fileName) => {
      const id = parseInt(fileName.replace(/\.md$/, ''));
      const fullPath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      return {
        id,
        slug: matterResult.data.slug || fileName.replace(/\.md$/, ''),
        content: matterResult.content, // Return raw markdown, not HTML
        ...matterResult.data,
      } as Project;
    });

    return NextResponse.json(projects.sort((a, b) => (a.date < b.date ? 1 : -1)));
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Get the next available ID
    const fileNames = fs.readdirSync(projectsDirectory);
    const ids = fileNames.map(name => parseInt(name.replace(/\.md$/, ''))).filter(id => !isNaN(id));
    const nextId = ids.length > 0 ? Math.max(...ids) + 1 : 1;

    // Create project markdown content
    const projectData = {
      title: data.title,
      description: data.description,
      date: data.date,
      category: data.category,
      image: data.image || '',
      projectUrl: data.projectUrl || '',
      githubUrl: data.githubUrl || '',
      technologies: data.technologies || [],
      featured: data.featured || false,
      slug: data.slug,
    };

    const content = matter.stringify(data.content, projectData);
    const filePath = path.join(projectsDirectory, `${nextId}.md`);
    
    fs.writeFileSync(filePath, content, 'utf8');

    return NextResponse.json({ 
      success: true, 
      id: nextId,
      message: 'Project created successfully' 
    });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
