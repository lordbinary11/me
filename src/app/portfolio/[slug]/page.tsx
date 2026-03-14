import { getProjectData, getSortedProjectsData } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import ProjectClient from '@/components/ProjectClient';

export default async function PortfolioProject({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const project = await getProjectData(slug);
  
  if (!project) {
    notFound();
  }
  
  // Get related projects (same category, excluding current project)
  const allProjects = await getSortedProjectsData();
  const relatedProjects = allProjects
    .filter((p) => p.category === project.category && p.id !== project.id)
    .slice(0, 3);

  return <ProjectClient project={project} relatedProjects={relatedProjects} />;
}

