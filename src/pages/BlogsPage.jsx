import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, Clock, ArrowRight, BookOpen, Tag } from 'lucide-react'
import Footer from '../components/Footer'

const posts = [
  {
    id: 1,
    title: '10 React Patterns Every Senior Developer Should Know',
    excerpt: 'From compound components to render props — these patterns will make your React code cleaner, more reusable, and easier to test.',
    category: 'Development',
    author: 'Alex Johnson',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&q=80',
    date: 'Mar 20, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    featured: true,
    tags: ['React', 'JavaScript', 'Patterns'],
  },
  {
    id: 2,
    title: 'How to Break Into Data Science in 2026',
    excerpt: 'A practical, no-fluff guide to landing your first data science role — what to learn, what to skip, and how to build a portfolio.',
    category: 'Career',
    author: 'Priya Sharma',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=50&q=80',
    date: 'Mar 18, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
    featured: false,
    tags: ['Data Science', 'Career', 'Python'],
  },
  {
    id: 3,
    title: 'Kubernetes vs Docker Swarm: Which Should You Choose?',
    excerpt: 'A deep-dive comparison of the two leading container orchestration tools — performance, scalability, and developer experience.',
    category: 'Cloud',
    author: 'David Kim',
    authorAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=50&q=80',
    date: 'Mar 15, 2026',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&q=80',
    featured: false,
    tags: ['Kubernetes', 'Docker', 'DevOps'],
  },
  {
    id: 4,
    title: 'The UX Designer\'s Guide to Building Design Systems',
    excerpt: 'Design systems aren\'t just component libraries — learn how to build one that scales across teams and products.',
    category: 'Design',
    author: 'Maria Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&q=80',
    date: 'Mar 12, 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    featured: false,
    tags: ['Design Systems', 'Figma', 'UX'],
  },
  {
    id: 5,
    title: 'Prompt Engineering: Getting the Best Out of GPT-4',
    excerpt: 'Practical techniques for crafting prompts that produce consistent, high-quality outputs for real-world AI applications.',
    category: 'AI',
    author: 'Dr. Nisha Gupta',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&q=80',
    date: 'Mar 10, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
    featured: false,
    tags: ['AI', 'ChatGPT', 'LLM'],
  },
  {
    id: 6,
    title: 'From Bootcamp to ₹18 LPA: A Real Success Story',
    excerpt: 'Arjun shares how he went from a non-tech background to a senior frontend role in 14 months using structured learning paths.',
    category: 'Career',
    author: 'Arjun Nair',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&q=80',
    date: 'Mar 7, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80',
    featured: false,
    tags: ['Career', 'Success Story'],
  },
  {
    id: 7,
    title: 'TypeScript 5.4: What\'s New and Why It Matters',
    excerpt: 'The latest TypeScript release brings powerful improvements to type inference, narrowing, and decorator metadata.',
    category: 'Development',
    author: 'Lisa Park',
    authorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&q=80',
    date: 'Mar 4, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    featured: false,
    tags: ['TypeScript', 'JavaScript'],
  },
  {
    id: 8,
    title: 'AWS Cost Optimisation: Save Up to 40% on Your Cloud Bill',
    excerpt: 'Actionable tips to reduce your AWS spend without compromising performance — from Reserved Instances to S3 lifecycle policies.',
    category: 'Cloud',
    author: 'Kevin Patel',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&q=80',
    date: 'Feb 28, 2026',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    featured: false,
    tags: ['AWS', 'Cloud', 'Cost'],
  },
]

const categories = ['All', 'Development', 'Career', 'Cloud', 'Design', 'AI']

const categoryColors = {
  Development: { bg: 'rgba(79,70,229,0.1)',  color: '#4F46E5' },
  Career:      { bg: 'rgba(16,185,129,0.1)', color: '#059669' },
  Cloud:       { bg: 'rgba(8,145,178,0.1)',  color: '#0891b2' },
  Design:      { bg: 'rgba(219,39,119,0.1)', color: '#db2777' },
  AI:          { bg: 'rgba(124,58,237,0.1)', color: '#7C3AED' },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] } }),
}

function BlogCard({ post, i }) {
  const cat = categoryColors[post.category] || { bg: '#f3f4f6', color: '#6b7280' }
  return (
    <motion.article
      custom={i}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ y: -5 }}
      className="rounded-3xl overflow-hidden border border-gray-100 bg-white flex flex-col"
      style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
    >
      <div className="relative h-48 overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
        <span
          className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full"
          style={{ background: cat.bg, color: cat.color, backdropFilter: 'blur(8px)' }}
        >
          {post.category}
        </span>
      </div>
      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="font-extrabold text-gray-900 text-base leading-snug line-clamp-2">{post.title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-1">{post.excerpt}</p>
        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-[11px] px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium">
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <img src={post.authorAvatar} alt={post.author} className="w-7 h-7 rounded-full object-cover" />
            <div>
              <p className="text-xs font-semibold text-gray-700">{post.author}</p>
              <p className="text-[10px] text-gray-400">{post.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <Clock size={11} />
            <span className="text-[11px]">{post.readTime}</span>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [query, setQuery] = useState('')

  const featured = posts.find((p) => p.featured)
  const rest = posts.filter((p) => !p.featured)

  const filtered = rest.filter((p) => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory
    const matchQuery = p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(query.toLowerCase())
    return matchCat && matchQuery
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-white"
    >
      {/* Hero */}
      <div
        className="pt-32 pb-20 px-6 text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f0d1a 0%, #1e1b4b 60%, #312e81 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute pointer-events-none"
          style={{ width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(109,40,217,0.3) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />

        <div className="relative z-10 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold text-white mb-5"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <BookOpen size={12} /> Viscano Learn Blog
            </span>
            <h1 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-tight">
              Learn. Grow.<br />
              <span style={{ background: 'linear-gradient(90deg, #a78bfa, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Stay Ahead.
              </span>
            </h1>
            <p className="text-white/60 mt-4 text-sm leading-relaxed">
              Insights, tutorials, and career advice from top industry professionals.
            </p>

            {/* Search */}
            <div
              className="flex items-center mt-8 rounded-2xl overflow-hidden mx-auto max-w-md"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}
            >
              <Search size={16} className="ml-4 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.5)' }} />
              <input
                type="text"
                placeholder="Search articles..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 px-3 py-3.5 bg-transparent outline-none text-sm text-white placeholder-white/40"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Featured post */}
        {featured && activeCategory === 'All' && !query && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ background: '#4F46E5' }}>
                <Tag size={11} className="text-white" />
              </div>
              <span className="text-sm font-bold text-gray-900">Featured Article</span>
            </div>
            <motion.article
              whileHover={{ y: -4 }}
              className="grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-gray-100"
              style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}
            >
              <div className="relative h-64 md:h-auto overflow-hidden">
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 60%, rgba(0,0,0,0.1))' }} />
              </div>
              <div className="p-8 md:p-10 bg-white flex flex-col justify-center gap-4">
                <span
                  className="w-fit text-xs font-bold px-3 py-1 rounded-full"
                  style={{ background: categoryColors[featured.category]?.bg, color: categoryColors[featured.category]?.color }}
                >
                  {featured.category}
                </span>
                <h2 className="text-2xl font-extrabold text-gray-900 leading-snug">{featured.title}</h2>
                <p className="text-gray-500 text-sm leading-relaxed">{featured.excerpt}</p>
                <div className="flex items-center gap-3 mt-2">
                  <img src={featured.authorAvatar} alt={featured.author} className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{featured.author}</p>
                    <p className="text-xs text-gray-400">{featured.date} · {featured.readTime}</p>
                  </div>
                  <motion.div whileHover={{ x: 3 }} className="ml-auto">
                    <Link
                      to="#"
                      className="inline-flex items-center gap-1.5 text-sm font-bold no-underline"
                      style={{ color: '#4F46E5' }}
                    >
                      Read more <ArrowRight size={14} />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.article>
          </motion.div>
        )}

        {/* Category filter */}
        <div className="flex items-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="px-4 py-2 rounded-full text-sm font-semibold border cursor-pointer transition-all"
              style={{
                background: activeCategory === cat ? '#4F46E5' : 'white',
                color: activeCategory === cat ? 'white' : '#6b7280',
                borderColor: activeCategory === cat ? '#4F46E5' : '#e5e7eb',
              }}
            >
              {cat}
            </motion.button>
          ))}
          <span className="ml-auto text-sm text-gray-400">{filtered.length} articles</span>
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={activeCategory + query}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filtered.map((post, i) => (
                <BlogCard key={post.id} post={post} i={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <p className="text-4xl mb-4">📭</p>
              <p className="text-gray-500 font-medium">No articles found.</p>
              <button
                onClick={() => { setActiveCategory('All'); setQuery('') }}
                className="mt-3 text-sm text-indigo-600 font-semibold cursor-pointer bg-transparent border-none"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </motion.div>
  )
}
