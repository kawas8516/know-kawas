import { getAllReading } from '@/lib/content';
import { workProjects } from '@/lib/work-data';
import { timelineEvents } from '@/lib/timeline-data';
import { NextResponse } from 'next/server';

export async function GET() {
  const reading = getAllReading().map(({ slug, title, author, status }) => ({
    slug,
    title,
    author,
    status,
  }));

  const projects = workProjects.map(({ id, name, description, languages, github, demo }) => ({
    id,
    name,
    description,
    languages,
    github,
    demo,
  }));

  const timeline = timelineEvents.map(({ id, title, organization, date, category }) => ({
    id,
    title,
    organization,
    date,
    category,
  }));

  return NextResponse.json({ reading, projects, timeline });
}
