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
  hasContent: boolean
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
      const { data, content } = matter(raw)
      return {
        slug,
        title: data.title as string,
        author: data.author as string,
        year: data.year as number,
        type: data.type as ReadingItem['type'],
        status: data.status as ReadingItem['status'],
        tags: (data.tags as string[]) ?? [],
        note: data.note as string | undefined,
        hasContent: content.trim().length > 0,
      }
    })
    .sort((a, b) => a.title.localeCompare(b.title))
}

export function getReading(slug: string): { item: ReadingItem; content: string; readingTime: number; related: ReadingItem[] } | null {
  const filePath = path.join(readingDir, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const item: ReadingItem = {
    slug,
    title: data.title as string,
    author: data.author as string,
    year: data.year as number,
    type: data.type as ReadingItem['type'],
    status: data.status as ReadingItem['status'],
    tags: (data.tags as string[]) ?? [],
    note: data.note as string | undefined,
    hasContent: content.trim().length > 0,
  }
  const wordCount = content.trim().split(/\s+/).length
  const readingTime = Math.max(1, Math.round(wordCount / 200))

  const related = getAllReading()
    .filter((r) => r.slug !== slug && r.hasContent && r.type === item.type)
    .slice(0, 3)

  return { item, content, readingTime, related }
}
