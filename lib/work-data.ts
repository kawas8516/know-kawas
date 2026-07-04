export interface WorkProject {
  id: string;
  name: string;
  description: string;
  badges: { label: string; color: string }[];
  github?: string;
  demo?: string;
  languages: string[];
  accentBlob: string;
}

export const workProjects: WorkProject[] = [
  {
    id: 'food-recipes-bot',
    name: 'Food Recipes Bot',
    description:
      'Suggests recipes from available ingredients and gives storage tips using RAG + NLP. Built with Django, FAISS, Sentence Transformers, and HTMX.',
    badges: [
      { label: 'AI/ML', color: 'bg-emerald-400/15 text-emerald-400 border border-emerald-400/20' },
      { label: 'DJANGO', color: 'bg-rose-400/15 text-rose-400 border border-rose-400/20' },
    ],
    github: 'https://github.com/kawas8516/chat-cooking',
    demo: 'https://huggingface.co/spaces/kawas8516/chat-cooking',
    languages: ['Python', 'Django', 'HTMX'],
    accentBlob: 'bg-emerald-400/25',
  },
  {
    id: 'writing',
    name: 'Technical Blogs',
    description:
      'Writing on backend systems, ML concepts, and things I figure out while building. Published across Medium, Hashnode, and Dev.to.',
    badges: [
      { label: 'WRITING', color: 'bg-amber-400/15 text-amber-400 border border-amber-400/20' },
    ],
    languages: ['Medium', 'Hashnode', 'Dev.to'],
    accentBlob: 'bg-amber-400/25',
  },
  {
    id: 'java-task-scheduler',
    name: 'Java Task Scheduler',
    description:
      'Java-based scheduling application to manage and track daily/weekly tasks. Built with OOP principles and GUI-based task management.',
    badges: [
      { label: 'JAVA', color: 'bg-orange-400/15 text-orange-400 border border-orange-400/20' },
      { label: 'OOP', color: 'bg-rose-400/15 text-rose-400 border border-rose-400/20' },
    ],
    github: 'https://github.com/kawas8516/Taskscheduler',
    languages: ['Java'],
    accentBlob: 'bg-orange-400/25',
  },
  {
    id: 'cli-utilities',
    name: 'CLI Utilities (C/C++)',
    description:
      'Collection of system utilities and command-line tools — interactive mode, improved error handling. Built with C and C++.',
    badges: [
      { label: 'C++', color: 'bg-blue-400/15 text-blue-400 border border-blue-400/20' },
      { label: 'SYSTEM', color: 'bg-zinc-400/15 text-zinc-400 border border-zinc-400/20' },
    ],
    github: 'https://github.com/kawas8516/cpp-windows-system-utility-tool',
    languages: ['C++', 'C'],
    accentBlob: 'bg-blue-400/25',
  },
  {
    id: 'belleza',
    name: 'Belleza',
    description:
      'Salon landing page built with hand-rolled CSS — responsive layout, no framework.',
    badges: [
      { label: 'CSS', color: 'bg-pink-400/15 text-pink-400 border border-pink-400/20' },
      { label: 'FRONTEND', color: 'bg-rose-400/15 text-rose-400 border border-rose-400/20' },
    ],
    github: 'https://github.com/kawas8516/belleza',
    languages: ['CSS', 'HTML'],
    accentBlob: 'bg-pink-400/25',
  },
  {
    id: 'railway-reservation',
    name: 'Railway Reservation System',
    description:
      'A simple Python project for railway ticket booking. Learn Python basics, file handling, and console-based project workflow.',
    badges: [
      { label: 'PYTHON', color: 'bg-fuchsia-400/15 text-fuchsia-400 border border-fuchsia-400/20' },
      { label: 'BEGINNER', color: 'bg-emerald-400/15 text-emerald-400 border border-emerald-400/20' },
    ],
    github: 'https://github.com/kawas8516/Railway-Reservation-System',
    languages: ['Python'],
    accentBlob: 'bg-fuchsia-400/25',
  },
  {
    id: 'shopping-cart',
    name: 'Shopping Cart',
    description: 'Python-based shopping cart system. Practice OOP, data handling, and basic project structuring.',
    badges: [
      { label: 'PYTHON', color: 'bg-teal-400/15 text-teal-400 border border-teal-400/20' },
      { label: 'OOP', color: 'bg-rose-400/15 text-rose-400 border border-rose-400/20' },
    ],
    github: 'https://github.com/kawas8516/shopping-cart',
    languages: ['Python'],
    accentBlob: 'bg-teal-400/25',
  },
];
