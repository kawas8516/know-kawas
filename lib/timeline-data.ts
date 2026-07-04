export type TimelineCategory = 'work' | 'education' | 'award';

export interface TimelineEvent {
  id: number;
  category: TimelineCategory;
  title: string;
  organization: string;
  location: string;
  date: string;
  achievements: string[];
  link?: string;
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    category: 'education',
    title: 'Master of Computer Applications (MCA)',
    organization: 'MIT World Peace University',
    location: 'Pune, Maharashtra, India',
    date: '2025 - 2027',
    achievements: [
      'Specializing in Computer Science with focus on backend development',
      'Building AI/ML projects including RAG-based chatbots',
      'Exploring microservices, Docker, and AWS',
    ],
    link: 'https://mitwpu.edu.in',
  },
  {
    id: 2,
    category: 'work',
    title: 'Content Writer',
    organization: 'STeRG',
    location: 'Pune, Maharashtra, India',
    date: 'Jan 2024 - Dec 2024',
    achievements: [
      'Composed 30+ emails to stakeholders',
      'Secured support and permissions from university authorities',
      'Developed professional communication skills',
    ],
  },
  {
    id: 3,
    category: 'work',
    title: 'General Member Board',
    organization: 'MIT-WPU Student Alumni Relations Society',
    location: 'Pune, Maharashtra, India',
    date: 'Feb 2024 - Aug 2024',
    achievements: [
      'Lead Generation: Identified and generated leads on LinkedIn for alumni podcasts and interviews',
      'Script Writing: Authored scripts for interviews reaching 1K+ students',
      'Helped grow the society\'s network and engagement',
    ],
  },
  {
    id: 4,
    category: 'education',
    title: 'Bachelor\'s in Computer Application',
    organization: 'Dr. Vishwanath Karad MIT World Peace University',
    location: 'Pune, Maharashtra, India',
    date: 'Aug 2022 - 2025',
    achievements: [
      'Specialization in Computer Software and Media Applications',
      'Built multiple projects including system utilities and web apps',
      'Active participation in technical clubs and hackathons',
    ],
    link: 'https://mitwpu.edu.in',
  },
  {
    id: 5,
    category: 'work',
    title: 'Co-Founder & Community Lead',
    organization: 'DNA (Discord Nation Alpha)',
    location: 'Remote',
    date: 'Jul 2020 - Sep 2022',
    achievements: [
      'Scaled a 4,300+ member creator network across Discord and Reddit',
      'Boosted community engagement by 35% through data-driven content strategies',
      'Surpassed 100,000+ messages in a single day — an all-time peak achievement',
      'Established governance framework and mentorship program, reducing churn by 20%',
      'Produced and edited tutorial videos; crafted graphics in Photoshop and Canva',
    ],
  },
  {
    id: 6,
    category: 'work',
    title: 'Associate Business Coordinator',
    organization: 'Hyperlinks.edit',
    location: 'Remote',
    date: 'Feb 2022 - May 2022',
    achievements: [
      'Coordinated business operations and client communications',
      'Supported team in achieving business objectives',
      'Gained experience in startup operations',
    ],
  },
  {
    id: 7,
    category: 'education',
    title: 'Secondary Education',
    organization: 'Mount Carmel English School',
    location: 'India',
    date: 'Jun 2008 - Jun 2018',
    achievements: ['Completed foundational education', 'Developed early interest in technology and computers'],
  },
];
