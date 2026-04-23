import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ExternalLink, Star, Search, ArrowRight,
  Trophy, Sparkles, Filter,
} from 'lucide-react'
import Footer from '../components/Footer'

const works = [
  {
    id: 1,
    studentName: 'Rohan Verma',
    studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80',
    studentCourse: 'React & Next.js: Zero to Hero',
    location: 'Pune, India',
    projectTitle: 'Personal Portfolio Website',
    description: 'A sleek portfolio with dark mode, animated transitions, and a working contact form. Built from scratch using React and Tailwind CSS.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
    liveUrl: '#',
    tags: ['React', 'Tailwind CSS', 'Framer Motion'],
    category: 'Portfolio',
    featured: true,
    rating: 5,
    completedIn: '6 months',
    hired: true,
    hiredAt: 'Infosys',
  },
  {
    id: 2,
    studentName: 'Sneha Kapoor',
    studentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80',
    studentCourse: 'Python for Data Science & AI',
    location: 'Bengaluru, India',
    projectTitle: 'Sales Forecasting Dashboard',
    description: 'An interactive dashboard that predicts monthly sales using ML models trained on 3 years of e-commerce data. Built with Python, Pandas, and Streamlit.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    liveUrl: '#',
    tags: ['Python', 'Scikit-learn', 'Streamlit'],
    category: 'Data Science',
    featured: true,
    rating: 5,
    completedIn: '8 months',
    hired: true,
    hiredAt: 'Flipkart',
  },
  {
    id: 3,
    studentName: 'Aryan Mehta',
    studentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80',
    studentCourse: 'UI/UX Design Mastery',
    location: 'Mumbai, India',
    projectTitle: 'Food Delivery App UI',
    description: 'A complete mobile UI for a food delivery app — with onboarding, menus, cart, and order tracking screens. Fully prototyped in Figma.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
    liveUrl: '#',
    tags: ['Figma', 'Prototyping', 'Mobile UI'],
    category: 'Design',
    featured: false,
    rating: 5,
    completedIn: '5 months',
    hired: false,
  },
  {
    id: 4,
    studentName: 'Divya Nair',
    studentAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80',
    studentCourse: 'AWS Cloud Practitioner',
    location: 'Hyderabad, India',
    projectTitle: 'Serverless Image Processor',
    description: 'An AWS-powered image resizing pipeline using S3, Lambda, and CloudFront. Auto-scales to handle thousands of images per second.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    liveUrl: '#',
    tags: ['AWS Lambda', 'S3', 'CloudFront'],
    category: 'Cloud',
    featured: false,
    rating: 5,
    completedIn: '7 months',
    hired: true,
    hiredAt: 'TCS',
  },
  {
    id: 5,
    studentName: 'Karan Singh',
    studentAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&q=80',
    studentCourse: 'Full-Stack Mobile with Flutter',
    location: 'Delhi, India',
    projectTitle: 'Habit Tracker Mobile App',
    description: 'A cross-platform habit tracking app with streaks, reminders, and analytics. Published on both the App Store and Play Store.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    liveUrl: '#',
    tags: ['Flutter', 'Firebase', 'Riverpod'],
    category: 'Mobile',
    featured: false,
    rating: 5,
    completedIn: '6 months',
    hired: false,
  },
  {
    id: 6,
    studentName: 'Meera Joshi',
    studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80',
    studentCourse: 'Generative AI & Prompt Engineering',
    location: 'Chennai, India',
    projectTitle: 'AI Resume Builder',
    description: 'A web app that uses GPT-4 to generate tailored resumes and cover letters based on job descriptions. Includes PDF export.',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
    liveUrl: '#',
    tags: ['OpenAI API', 'React', 'LangChain'],
    category: 'AI',
    featured: true,
    rating: 5,
    completedIn: '4 months',
    hired: true,
    hiredAt: 'Zoho',
  },
  {
    id: 7,
    studentName: 'Vikram Das',
    studentAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80',
    studentCourse: 'DevOps & Kubernetes Mastery',
    location: 'Kolkata, India',
    projectTitle: 'CI/CD Pipeline for Microservices',
    description: 'A complete GitOps pipeline using GitHub Actions, Docker, and ArgoCD to deploy a microservices app to a self-managed Kubernetes cluster.',
    image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&q=80',
    liveUrl: '#',
    tags: ['Kubernetes', 'ArgoCD', 'Docker'],
    category: 'Cloud',
    featured: false,
    rating: 5,
    completedIn: '9 months',
    hired: true,
    hiredAt: 'Wipro',
  },
  {
    id: 8,
    studentName: 'Ananya Roy',
    studentAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&q=80',
    studentCourse: 'Digital Marketing & Growth Hacking',
    location: 'Jaipur, India',
    projectTitle: 'E-commerce Growth Campaign',
    description: 'Grew a D2C skincare brand from ₹2L to ₹18L monthly revenue in 3 months using paid ads, SEO, and email automation.',
    image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&q=80',
    liveUrl: '#',
    tags: ['Google Ads', 'SEO', 'Email Marketing'],
    category: 'Marketing',
    featured: false,
    rating: 5,
    completedIn: '4 months',
    hired: false,
  },
]

const categories = ['All', 'Portfolio', 'Data Science', 'Design', 'Cloud', 'Mobile', 'AI', 'Marketing']

const categoryColors = {
  Portfolio:    { bg: 'rgba(79,70,229,0.1)',   color: '#4F46E5' },
  'Data Science': { bg: 'rgba(124,58,237,0.1)', color: '#7C3AED' },
  Design:       { bg: 'rgba(219,39,119,0.1)',  color: '#db2777' },
  Cloud:        { bg: 'rgba(8,145,178,0.1)',   color: '#0891b2' },
  Mobile:       { bg: 'rgba(2,132,199,0.1)',   color: '#0284c7' },
  AI:           { bg: 'rgba(124,58,237,0.1)',  color: '#7C3AED' },
  Marketing:    { bg: 'rgba(217,119,6,0.1)',   color: '#d97706' },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] } }),
}

function WorkCard({ work, i }) {
  const cat = categoryColors[work.category] || { bg: '#f3f4f6', color: '#6b7280' }

  return (
    <motion.div
      custom={i}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ y: -6 }}
      className="rounded-3xl overflow-hidden border border-gray-100 bg-white flex flex-col group"
      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
    >
      {/* Project image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={work.image}
          alt={work.projectTitle}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <motion.a
            href={work.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2 px-4 py-2 rounded-xl text-white font-bold text-sm no-underline"
            style={{ background: 'rgba(79,70,229,0.9)', backdropFilter: 'blur(8px)' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <ExternalLink size={14} /> Live Preview
          </motion.a>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ background: cat.bg, color: cat.color, backdropFilter: 'blur(8px)' }}>
            {work.category}
          </span>
          {work.featured && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white flex items-center gap-1"
              style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
              <Sparkles size={10} /> Featured
            </span>
          )}
        </div>

        {work.hired && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold text-white"
            style={{ background: 'rgba(16,185,129,0.9)', backdropFilter: 'blur(8px)' }}>
            <Trophy size={10} /> Hired at {work.hiredAt}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="font-extrabold text-gray-900 text-base leading-snug">{work.projectTitle}</h3>
        <p className="text-gray-500 text-sm leading-relaxed flex-1">{work.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {work.tags.map((tag) => (
            <span key={tag} className="text-[11px] px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 font-medium">
              {tag}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100" />

        {/* Student */}
        <div className="flex items-center gap-3">
          <img src={work.studentAvatar} alt={work.studentName}
            className="w-9 h-9 rounded-full object-cover border-2 border-white"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate">{work.studentName}</p>
            <p className="text-[11px] text-gray-400 truncate">{work.studentCourse}</p>
          </div>
          <div className="flex items-center gap-0.5 flex-shrink-0">
            {[...Array(work.rating)].map((_, i) => (
              <Star key={i} size={11} fill="#f59e0b" className="text-yellow-400" />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{work.location}</span>
          <span>Completed in {work.completedIn}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function StudentWorksPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)

  const filtered = works.filter((w) => {
    const matchCat = activeCategory === 'All' || w.category === activeCategory
    const matchQuery = w.projectTitle.toLowerCase().includes(query.toLowerCase()) ||
      w.studentName.toLowerCase().includes(query.toLowerCase()) ||
      w.description.toLowerCase().includes(query.toLowerCase())
    const matchFeatured = !showFeaturedOnly || w.featured
    return matchCat && matchQuery && matchFeatured
  })

  const hiredCount = works.filter((w) => w.hired).length
  const featuredCount = works.filter((w) => w.featured).length

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
        className="pt-32 pb-20 px-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f0d1a 0%, #1e1b4b 50%, #312e81 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute pointer-events-none"
          style={{ width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(109,40,217,0.25) 0%, transparent 70%)', top: '50%', left: '30%', transform: 'translate(-50%,-50%)' }} />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold text-white mb-6"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <Trophy size={12} /> Built by Our Students
            </span>
            <h1 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-tight">
              Real Projects.<br />
              <span style={{ background: 'linear-gradient(90deg, #a78bfa, #818cf8, #6ee7b7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Real Results.
              </span>
            </h1>
            <p className="text-white/60 mt-5 text-base max-w-xl mx-auto leading-relaxed">
              Every project here was built by a Viscano Learn student. These aren't exercises — they're real products used by real people.
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-8 mt-10">
              {[
                { val: works.length + '+', label: 'Projects Showcased' },
                { val: hiredCount + '+', label: 'Students Got Hired' },
                { val: featuredCount, label: 'Featured Works' },
              ].map(({ val, label }) => (
                <div key={label} className="text-center">
                  <p className="text-3xl font-black text-white">{val}</p>
                  <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Filters bar */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-10">
          {/* Search */}
          <div
            className="flex items-center gap-2 rounded-2xl px-4 py-2.5 border border-gray-200 bg-white w-full md:w-72"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
          >
            <Search size={15} className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search by name or project..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
            />
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Featured toggle */}
            <button
              onClick={() => setShowFeaturedOnly((f) => !f)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold border cursor-pointer transition-all"
              style={{
                background: showFeaturedOnly ? '#f59e0b' : 'white',
                color: showFeaturedOnly ? 'white' : '#6b7280',
                borderColor: showFeaturedOnly ? '#f59e0b' : '#e5e7eb',
              }}
            >
              <Sparkles size={13} /> Featured only
            </button>

            <div className="flex items-center gap-1.5 text-sm text-gray-400">
              <Filter size={13} />
              <span>{filtered.length} projects</span>
            </div>
          </div>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-10">
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
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={activeCategory + query + showFeaturedOnly}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filtered.map((work, i) => (
                <WorkCard key={work.id} work={work} i={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24"
            >
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-gray-500 font-medium text-lg">No projects found</p>
              <button
                onClick={() => { setActiveCategory('All'); setQuery(''); setShowFeaturedOnly(false) }}
                className="mt-3 text-sm text-indigo-600 font-semibold cursor-pointer bg-transparent border-none"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Submit CTA */}
      <div
        className="py-20 px-6 text-center"
        style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto"
        >
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ background: 'rgba(255,255,255,0.2)' }}>
            <Trophy size={26} className="text-white" />
          </div>
          <h2 className="text-3xl font-black text-white uppercase mb-3">
            Are You a Viscano Learn Student?
          </h2>
          <p className="text-white/70 mb-8 leading-relaxed">
            Built something you're proud of? Submit your project and get featured on this page for thousands of visitors to see.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm no-underline"
                style={{ background: 'white', color: '#4F46E5', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
              >
                Submit Your Work <ArrowRight size={15} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm no-underline border"
                style={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)' }}
              >
                Start Learning
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </motion.div>
  )
}
