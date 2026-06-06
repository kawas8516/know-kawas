import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type ReadingItem = {
  slug: string
  title: string
  author: string
  year: number
  type: 'book' | 'paper' | 'essay' | 'talk' | 'other'
  status: 'reading' | 'finished' | 'abandoned' | 'discussing'
  tags: string[]
  note?: string
}

const readingDir = path.join(process.cwd(), 'content', 'reading')

function getMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))
}

export function getAllReading(): ReadingItem[] {
  const files = getMdxFiles(readingDir)
  return files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(readingDir, filename), 'utf8')
      const { data } = matter(raw)
      return {
        slug,
        title: data.title as string,
        author: data.author as string,
        year: data.year as number,
        type: data.type as ReadingItem['type'],
        status: data.status as ReadingItem['status'],
        tags: (data.tags as string[]) ?? [],
        note: data.note as string | undefined,
      }
    })
    .sort((a, b) => a.title.localeCompare(b.title))
}
