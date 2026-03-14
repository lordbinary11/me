import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs-extra';
import path from 'path';
import matter from 'gray-matter';
import { Project } from '@/lib/markdown';

const projectsDirectory = path.join(process.cwd(), 'content/projects');

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const filePath = path.join(projectsDirectory, `${id}.md`);
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const matterResult = matter(fileContents);

    return NextResponse.json({
      id: parseInt(id),
      slug: matterResult.data.slug || id,
      content: matterResult.content, // Return raw markdown, not HTML
      ...matterResult.data,
    } as Project);
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    const filePath = path.join(projectsDirectory, `${id}.md`);
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

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
    fs.writeFileSync(filePath, content, 'utf8');

    return NextResponse.json({ 
      success: true,
      message: 'Project updated successfully' 
    });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const filePath = path.join(projectsDirectory, `${id}.md`);
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    fs.removeSync(filePath);

    return NextResponse.json({ 
      success: true,
      message: 'Project deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
