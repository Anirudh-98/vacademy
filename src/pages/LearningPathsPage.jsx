import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Clock, BookOpen, BarChart2, CheckCircle,
  Code2, Brain, Cloud, Palette, Shield, TrendingUp, Smartphone,
} from 'lucide-react'
import Footer from '../components/Footer'

const paths = [
  {
    id: 1,
    title: 'Frontend Developer',
    subtitle: 'Build modern, responsive web apps',
    icon: Code2,
    color: '#4F46E5',
    bg: 'rgba(79,70,229,0.08)',
    duration: '6 months',
    courses: 8,
    level: 'Beginner → Advanced',
    enrolled: '32,400',
    tag: 'Most Popular',
    tagColor: '#f59e0b',
    steps: ['HTML & CSS Fundamentals', 'JavaScript Mastery', 'React & Next.js', 'TypeScript Patterns', 'Testing & Deployment'],
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Git', 'REST APIs'],
    description: 'Go from zero to a job-ready frontend developer. Cover everything from HTML basics to advanced React patterns used at top tech companies.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80',
  },
  {
    id: 2,
    title: 'Data Scientist',
    subtitle: 'Turn data into powerful insights',
    icon: Brain,
    color: '#7C3AED',
    bg: 'rgba(124,58,237,0.08)',
    duration: '8 months',
    courses: 10,
    level: 'Beginner → Advanced',
    enrolled: '28,100',
    tag: 'Trending',
    tagColor: '#ef4444',
    steps: ['Python Essentials', 'Data Analysis with Pandas', 'Machine Learning A-Z', 'Deep Learning', 'MLOps & Deployment'],
    skills: ['Python', 'Pandas', 'Scikit-learn', 'TensorFlow', 'SQL', 'Tableau'],
    description: 'Master data science from the ground up. Learn Python, statistics, machine learning, and how to deploy models that drive real business value.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80',
  },
  {
    id: 3,
    title: 'Cloud & DevOps Engineer',
    subtitle: 'Architect scalable cloud infrastructure',
    icon: Cloud,
    color: '#0891b2',
    bg: 'rgba(8,145,178,0.08)',
    duration: '7 months',
    courses: 9,
    level: 'Intermediate → Advanced',
    enrolled: '19,600',
    tag: 'In Demand',
    tagColor: '#10b981',
    steps: ['Linux & Networking', 'AWS Cloud Practitioner', 'Docker & Kubernetes', 'CI/CD Pipelines', 'Infrastructure as Code'],
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'ArgoCD'],
    description: 'Learn to build, automate, and scale cloud infrastructure. From AWS fundamentals to advanced Kubernetes orchestration and GitOps.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80',
  },
  {
    id: 4,
    title: 'UI/UX Designer',
    subtitle: 'Design products people love to use',
    icon: Palette,
    color: '#db2777',
    bg: 'rgba(219,39,119,0.08)',
    duration: '5 months',
    courses: 6,
    level: 'Beginner → Intermediate',
    enrolled: '15,800',
    tag: 'New',
    tagColor: '#6366f1',
    steps: ['Design Fundamentals', 'Figma Mastery', 'User Research', 'Prototyping', 'Motion Design'],
    skills: ['Figma', 'After Effects', 'User Research', 'Design Systems', 'Prototyping', 'Usability'],
    description: 'Learn user-centred design from scratch. Build stunning interfaces, conduct user research, and create polished design systems.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
  },
  {
    id: 5,
    title: 'Cybersecurity Specialist',
    subtitle: 'Defend systems and ethical hacking',
    icon: Shield,
    color: '#16a34a',
    bg: 'rgba(22,163,74,0.08)',
    duration: '6 months',
    courses: 7,
    level: 'Beginner → Advanced',
    enrolled: '12,300',
    tag: 'Hot',
    tagColor: '#ef4444',
    steps: ['Networking Basics', 'Linux for Security', 'Ethical Hacking', 'OWASP Top 10', 'SOC & Threat Intelligence'],
    skills: ['Kali Linux', 'Wireshark', 'Metasploit', 'Burp Suite', 'SIEM', 'Cryptography'],
    description: 'Build a career in cybersecurity. Learn ethical hacking, network defence, and the tools used by real security professionals.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80',
  },
  {
    id: 6,
    title: 'Product Manager',
    subtitle: 'Build and ship products that matter',
    icon: TrendingUp,
    color: '#d97706',
    bg: 'rgba(217,119,6,0.08)',
    duration: '4 months',
    courses: 5,
    level: 'Beginner → Intermediate',
    enrolled: '22,700',
    tag: 'Bestseller',
    tagColor: '#f59e0b',
    steps: ['PM Fundamentals', 'User Stories & PRDs', 'Roadmapping', 'Agile & Scrum', 'Product Analytics'],
    skills: ['Jira', 'Figma', 'OKRs', 'Agile', 'A/B Testing', 'SQL'],
    description: 'Learn how to define, build, and launch great products. From user discovery to roadmapping and stakeholder alignment.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&q=80',
  },
  {
    id: 7,
    title: 'Mobile Developer',
    subtitle: 'Ship apps to iOS and Android',
    icon: Smartphone,
    color: '#0284c7',
    bg: 'rgba(2,132,199,0.08)',
    duration: '6 months',
    courses: 7,
    level: 'Intermediate',
    enrolled: '10,400',
    tag: 'New',
    tagColor: '#6366f1',
    steps: ['Dart & Flutter Basics', 'UI Components', 'State Management', 'Firebase & Backend', 'App Store Publishing'],
    skills: ['Flutter', 'Dart', 'Firebase', 'Riverpod', 'Swift', 'App Store Connect'],
    description: 'Build cross-platform mobile apps with Flutter or go native with Swift. Ship to both the App Store and Play Store.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] } }),
}

function PathCard({ path, i }) {
  const [open, setOpen] = useState(false)
  const Icon = path.icon

  return (
    <motion.div
      custom={i}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className="rounded-3xl overflow-hidden border border-gray-100 bg-white"
      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img src={path.image} alt={path.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)' }} />
        <span
          className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full text-white"
          style={{ background: path.tagColor }}
        >
          {path.tag}
        </span>
        <div
          className="absolute bottom-3 left-3 w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: path.color }}
        >
          <Icon size={20} className="text-white" />
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-extrabold text-gray-900">{path.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{path.description}</p>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-3">
          {[
            { icon: Clock,    val: path.duration },
            { icon: BookOpen, val: `${path.courses} courses` },
            { icon: BarChart2,val: path.level },
          ].map(({ icon: M, val }) => (
            <div key={val} className="flex items-center gap-1.5 text-xs text-gray-500">
              <M size={13} style={{ color: path.color }} />
              {val}
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5">
          {path.skills.slice(0, 4).map((s) => (
            <span key={s} className="text-xs px-2.5 py-1 rounded-full font-medium"
              style={{ background: path.bg, color: path.color }}>
              {s}
            </span>
          ))}
          {path.skills.length > 4 && (
            <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-gray-100 text-gray-500">
              +{path.skills.length - 4} more
            </span>
          )}
        </div>

        {/* Expandable steps */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="text-xs font-bold flex items-center gap-1 cursor-pointer bg-transparent border-none p-0 w-fit"
          style={{ color: path.color }}
        >
          {open ? 'Hide' : 'View'} roadmap steps
          <motion.span animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }}>
            <ArrowRight size={13} />
          </motion.span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-2 pt-1">
                {path.steps.map((step, idx) => (
                  <div key={step} className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                      style={{ background: path.color }}
                    >
                      {idx + 1}
                    </div>
                    <span className="text-xs text-gray-600">{step}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-400">{path.enrolled} enrolled</span>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/register"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white no-underline"
              style={{ background: path.color }}
            >
              Start Path <ArrowRight size={12} />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default function LearningPathsPage() {
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
        style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 60%, #9333EA 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold text-white mb-5"
              style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.28)' }}>
              Structured Learning
            </span>
            <h1 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-tight">
              Your Career<br />Starts Here
            </h1>
            <p className="text-white/70 mt-5 text-base max-w-xl mx-auto leading-relaxed">
              Curated learning paths designed by industry experts to take you from beginner to job-ready in months, not years.
            </p>
            <div className="flex justify-center gap-6 mt-8">
              {[['7', 'Career Paths'], ['500+', 'Courses'], ['1,20,000+', 'Learners']].map(([val, label]) => (
                <div key={label} className="text-center">
                  <p className="text-2xl font-black text-white">{val}</p>
                  <p className="text-xs text-white/60">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Paths grid */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">All Learning Paths</h2>
            <p className="text-gray-500 mt-1 text-sm">Choose a path and start building your future</p>
          </div>
          <span className="text-sm text-gray-400 font-medium">{paths.length} paths available</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paths.map((path, i) => (
            <PathCard key={path.id} path={path} i={i} />
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="py-16 px-6 text-center" style={{ background: '#F9FAFB' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Not sure where to start?</h2>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">Take our free career quiz to find the learning path that matches your goals.</p>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-bold text-sm no-underline"
              style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', boxShadow: '0 8px 24px rgba(79,70,229,0.3)' }}
            >
              Find My Path <ArrowRight size={16} />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </motion.div>
  )
}
