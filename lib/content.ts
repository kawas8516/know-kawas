import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type ReadingItem = {
  slug: string
  title: string
  author: string
  year: number
  type: 'book' | 'paper' | 'essay' | 'talk' | 'other'
  status: 'reading' | 'finished' | 'abandoned'
  tags: string[]
  note?: string
}

export type Prompt = {
  slug: string
  title: string
  date: string
  model: 'claude' | 'gpt-4' | 'gemini' | 'generic'
  use_case: string
  tags: string[]
  content: string
}

const readingDir = path.join(process.cwd(), 'content', 'reading')
const promptsDir = path.join(process.cwd(), 'content', 'prompts')

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

export function getAllPrompts(): Prompt[] {
  const files = getMdxFiles(promptsDir)
  return files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(promptsDir, filename), 'utf8')
      const { data, content } = matter(raw)
      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        model: data.model as Prompt['model'],
        use_case: data.use_case as string,
        tags: (data.tags as string[]) ?? [],
        content,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPromptBySlug(slug: string): Prompt | null {
  const filepath = path.join(promptsDir, `${slug}.mdx`)
  if (!fs.existsSync(filepath)) return null
  const raw = fs.readFileSync(filepath, 'utf8')
  const { data, content } = matter(raw)
  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    model: data.model as Prompt['model'],
    use_case: data.use_case as string,
    tags: (data.tags as string[]) ?? [],
    content,
  }
}
