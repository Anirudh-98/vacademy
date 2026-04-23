export const categoryColors = {
  Development: { bg: 'rgba(79,70,229,0.1)', color: '#4F46E5' },
  'Data Science': { bg: 'rgba(124,58,237,0.1)', color: '#7C3AED' },
  Design: { bg: 'rgba(219,39,119,0.1)', color: '#db2777' },
  Cloud: { bg: 'rgba(8,145,178,0.1)', color: '#0891b2' },
  AI: { bg: 'rgba(124,58,237,0.1)', color: '#7C3AED' },
  Mobile: { bg: 'rgba(2,132,199,0.1)', color: '#0284c7' },
}

export const categories = ['All', 'Development', 'Data Science', 'Design', 'Cloud', 'AI', 'Mobile']

export const liveClasses = [
  {
    id: 'u4',
    title: 'Figma to Code: Design Systems Workshop',
    instructor: 'Maria Chen',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80',
    date: '2026-04-04T16:00:00',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    category: 'Design',
    color: '#db2777',
    enrolled: 541,
    level: 'Beginner',
    tags: ['Figma', 'Design Systems', 'CSS'],
    description: 'Convert a production Figma design into a fully responsive component library. Covers tokens, variants, and handoff best practices.',
  },
]

export const liveNow = [
  {
    id: 'l1',
    title: 'React 19 Deep Dive: Concurrent Features',
    instructor: 'Alex Johnson',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80',
    viewers: 1243,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    category: 'Development',
    color: '#4F46E5',
    started: '45 min ago',
  },
]

export const recordings = [
  {
    id: 'r1',
    title: 'TypeScript Generics — From Zero to Expert',
    instructor: 'Lisa Park',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    duration: '1h 48m',
    views: '14,200',
    date: 'Mar 20, 2026',
    category: 'Development',
    color: '#4F46E5',
    rating: 4.9,
  },
  {
    id: 'r2',
    title: 'SQL for Data Analysts — Live Practice',
    instructor: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    duration: '2h 12m',
    views: '9,800',
    date: 'Mar 15, 2026',
    category: 'Data Science',
    color: '#7C3AED',
    rating: 4.8,
  },
  {
    id: 'r3',
    title: 'Flutter State Management Deep Dive',
    instructor: 'James Wu',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    duration: '1h 32m',
    views: '6,400',
    date: 'Mar 10, 2026',
    category: 'Mobile',
    color: '#0284c7',
    rating: 4.9,
  },
]
