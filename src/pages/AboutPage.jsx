import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Target, Eye, Heart,
  Lightbulb, Users, Globe, Award,
  X, GitBranch,
} from 'lucide-react'
import Footer from '../components/Footer'

/* ── animation helpers ── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

/* ── data ── */
const stats = [
  { value: '2021', label: 'Founded' },
  { value: '1,20,000+', label: 'Students Enrolled' },
  { value: '500+', label: 'Courses Available' },
  { value: '95%', label: 'Placement Rate' },
]

const values = [
  {
    icon: Target,
    title: 'Outcome-First Learning',
    color: '#4F46E5',
    bg: 'rgba(79,70,229,0.08)',
    description: 'We design every course around real-world outcomes, not theory. Our students leave with skills employers actually want.',
  },
  {
    icon: Heart,
    title: 'Learner-Centric Culture',
    color: '#db2777',
    bg: 'rgba(219,39,119,0.08)',
    description: 'Every decision we make puts learners first — from how courses are structured to how our support team responds.',
  },
  {
    icon: Lightbulb,
    title: 'Constant Innovation',
    color: '#d97706',
    bg: 'rgba(217,119,6,0.08)',
    description: 'The industry moves fast. We update our curriculum continuously so our students are always learning what matters today.',
  },
  {
    icon: Globe,
    title: 'Accessible to All',
    color: '#059669',
    bg: 'rgba(5,150,105,0.08)',
    description: 'Quality education shouldn\'t be a privilege. We keep our pricing fair and offer scholarships for those who need them.',
  },
  {
    icon: Users,
    title: 'Community-Driven',
    color: '#7C3AED',
    bg: 'rgba(124,58,237,0.08)',
    description: 'Learning happens best together. Our community of 1,20,000+ students and alumni is one of our biggest assets.',
  },
  {
    icon: Award,
    title: 'Excellence in Quality',
    color: '#0891b2',
    bg: 'rgba(8,145,178,0.08)',
    description: 'We hold our instructors and content to the highest bar. Every course goes through a rigorous review before launch.',
  },
]

const team = [
  {
    name: 'Anirudh',
    role: 'Co-founder & CEO',
    bio: 'Ex-Royalcyber engineer. Built one IT & Consulting startup before Viscano Learn. Passionate about making quality education accessible to every Indian.',
    avatar: '/ani.png',
    linkedin: '#', x: '#',
  },
  {
    name: 'Rokkam Harish Kumar',
    role: 'Co-founder & CPO',
    bio: 'Former Employee at Facebook. Has designed learning experiences used by over 1 million students across India and South-East Asia.',
    avatar: '/harish.jpeg',
    linkedin: '#', x: '#',
  },
  {
    name: 'Prakash Mummidesetti',
    role: 'CTO',
    bio: 'Visual Designer with 8+ years of experience. Led design at two YC-backed startups. Obsessed with quality and design experience.',
    avatar: '/prakash.png',
    linkedin: '#', gitbranch: '#', x: undefined,
  },

]

const milestones = [
  { year: '2021', title: 'Viscano Learn Founded', desc: 'Started with 3 courses and 200 beta students out of a Bengaluru co-working space.' },
  { year: '2022', title: '10,000 Students', desc: 'Crossed 10,000 enrolled students and launched our first hiring partnership with TCS.' },
  { year: '2023', title: 'Series A — ₹28 Cr', desc: 'Raised Series A funding to expand our course catalogue and hire 50+ instructors.' },
  { year: '2024', title: '500+ Courses Live', desc: 'Reached 500 courses across 7 categories with a 4.8 average rating platform-wide.' },
  { year: '2025', title: '1 Lakh+ Learners', desc: 'Crossed 1,00,000 active learners with students in 120+ cities across India.' },
  { year: '2026', title: 'Going Global', desc: 'Launched English-medium paths targeting South-East Asia, Middle East and the diaspora.' },
]

/* ── components ── */
function StatCard({ value, label, i }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div
      ref={ref}
      custom={i}
      variants={fadeUp}
      className="flex flex-col items-center text-center gap-1"
    >
      <span className="text-4xl md:text-5xl font-black text-white">{value}</span>
      <span className="text-sm font-medium text-white/65">{label}</span>
    </motion.div>
  )
}

function TeamCard({ member, i }) {
  return (
    <motion.div
      custom={i}
      variants={fadeUp}
      whileHover={{ y: -6 }}
      className="rounded-3xl overflow-hidden bg-white border border-gray-100 flex flex-col"
      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
    >
      <div className="relative h-56 overflow-hidden">
        <img src={member.avatar} alt={member.name} className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }} />
        <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
          <div>
            <p className="text-white font-extrabold text-base">{member.name}</p>
            <p className="text-white/70 text-xs">{member.role}</p>
          </div>
          <div className="flex gap-2">
            {member.linkedin && (
              <a href={member.linkedin} className="w-7 h-7 rounded-full flex items-center justify-center no-underline"
                style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}>
                <Globe size={13} className="text-white" />
              </a>
            )}
            {member.x && (
              <a href={member.x} className="w-7 h-7 rounded-full flex items-center justify-center no-underline"
                style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}>
                <X size={13} className="text-white" />
              </a>
            )}
            {member.gitbranch && (
              <a href={member.gitbranch} className="w-7 h-7 rounded-full flex items-center justify-center no-underline"
                style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}>
                <GitBranch size={13} className="text-white" />
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm text-gray-500 leading-relaxed">{member.bio}</p>
      </div>
    </motion.div>
  )
}

/* ── page ── */
export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-white"
    >

      {/* ── Hero ── */}
      <div
        className="pt-36 pb-28 px-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #3730a3 0%, #4F46E5 50%, #7C3AED 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute pointer-events-none rounded-full"
          style={{ width: 520, height: 520, background: 'rgba(255,255,255,0.06)', top: '-120px', right: '-100px' }} />
        <div className="absolute pointer-events-none rounded-full"
          style={{ width: 320, height: 320, background: 'rgba(255,255,255,0.04)', bottom: '-80px', left: '-60px' }} />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            variants={stagger} initial="hidden" animate="visible"
            className="flex flex-col items-center gap-6"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold text-white"
              style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.28)' }}
            >
              Our Story
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight leading-tight"
            >
              We Believe<br />Education<br />
              <span style={{ background: 'linear-gradient(90deg, #fde68a, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Changes Lives
              </span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-white/70 text-base max-w-xl leading-relaxed"
            >
              Viscano Learn was born from a simple belief — that where you were born shouldn't determine where you end up. We're on a mission to give every Indian access to world-class education.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)' }}>
        <motion.div
          className="max-w-5xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-8"
          variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          {stats.map((s, i) => <StatCard key={s.label} {...s} i={i} />)}
        </motion.div>
      </div>

      {/* ── Our Story ── */}
      <div className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs font-bold text-[#6D28D9] uppercase tracking-widest">Our Story</span>
            <h2 className="text-4xl font-extrabold text-gray-900 mt-3 mb-5 tracking-tight leading-tight">
              From a co-working desk<br />to 1,20,000 learners
            </h2>
            <div className="flex flex-col gap-4 text-gray-500 text-sm leading-relaxed">
              <p>
                Viscano Learn started in 2021 when our founders Aarav and Riya noticed something frustrating — India was producing millions of graduates every year, yet companies were desperate for skilled talent. The gap wasn't in effort; it was in the quality and relevance of education.
              </p>
              <p>
                They set out to fix it. Starting with just 3 courses and 200 beta students from a rented desk in Bengaluru, they obsessed over one question: <span className="text-gray-800 font-semibold">"What do students actually need to get hired?"</span>
              </p>
              <p>
                Five years later, Viscano Learn has grown to 500+ courses, 1,20,000+ learners, and partnerships with 200+ companies. But the mission remains exactly the same.
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block mt-8">
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-white font-bold text-sm no-underline"
                style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', boxShadow: '0 8px 24px rgba(79,70,229,0.3)' }}
              >
                Explore Our Courses <ArrowRight size={15} />
              </Link>
            </motion.div>
          </motion.div>

          {/* Image collage */}
          <motion.div
            className="relative h-96 md:h-auto"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80"
              alt="Team working"
              className="rounded-3xl w-full object-cover"
              style={{ height: '320px', boxShadow: '0 16px 48px rgba(79,70,229,0.18)' }}
            />
            <motion.div
              className="absolute -bottom-6 -left-6 rounded-2xl p-4 bg-white border border-gray-100 flex items-center gap-3"
              style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }}>
                <Award size={18} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-extrabold text-gray-900">Best EdTech 2025</p>
                <p className="text-xs text-gray-400">India EdTech Awards</p>
              </div>
            </motion.div>
            <motion.div
              className="absolute -top-5 -right-5 rounded-2xl p-4 bg-white border border-gray-100"
              style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}
              initial={{ opacity: 0, y: -16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="flex -space-x-2 mb-2">
                {[
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&q=80',
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&q=80',
                  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&q=80',
                ].map((src, i) => (
                  <img key={i} src={src} alt="" className="w-8 h-8 rounded-full object-cover border-2 border-white" />
                ))}
              </div>
              <p className="text-xs font-bold text-gray-900">1,20,000+</p>
              <p className="text-[10px] text-gray-400">Happy learners</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Mission & Vision ── */}
      <div className="px-6 py-20" style={{ background: '#F9FAFB' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-bold text-[#6D28D9] uppercase tracking-widest">What Drives Us</span>
            <h2 className="text-4xl font-extrabold text-gray-900 mt-3 tracking-tight">Mission & Vision</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Target,
                label: 'Our Mission',
                color: '#4F46E5',
                bg: 'rgba(79,70,229,0.08)',
                text: 'To make world-class, industry-relevant education accessible to every learner in India — regardless of their background, city, or financial situation.',
              },
              {
                icon: Eye,
                label: 'Our Vision',
                color: '#7C3AED',
                bg: 'rgba(124,58,237,0.08)',
                text: 'A future where talent — not privilege — determines opportunity. Where a student from a Tier-3 town has the same shot at their dream career as one from an IIT.',
              },
            ].map(({ icon: Icon, label, color, bg, text }, i) => (
              <motion.div
                key={label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="rounded-3xl p-8 border border-gray-100 bg-white"
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: bg }}>
                  <Icon size={22} style={{ color }} />
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 mb-3">{label}</h3>
                <p className="text-gray-500 leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Values ── */}
      <div className="max-w-6xl mx-auto px-6 py-24">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-bold text-[#6D28D9] uppercase tracking-widest">What We Stand For</span>
          <h2 className="text-4xl font-extrabold text-gray-900 mt-3 tracking-tight">Our Core Values</h2>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
        >
          {values.map(({ icon: Icon, title, color, bg, description }, i) => (
            <motion.div
              key={title}
              custom={i}
              variants={fadeUp}
              whileHover={{ y: -5 }}
              className="rounded-3xl p-6 border border-gray-100 bg-white"
              style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: bg }}>
                <Icon size={20} style={{ color }} />
              </div>
              <h3 className="font-extrabold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Timeline ── */}

      {/* ── Team ── */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-bold text-[#6D28D9] uppercase tracking-widest">The People</span>
          <h2 className="text-4xl font-extrabold text-gray-900 mt-3 tracking-tight">Meet Our Team</h2>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">
            A diverse team of educators, engineers, and dreamers united by one mission.
          </p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
        >
          {team.map((member, i) => <TeamCard key={member.name} member={member} i={i} />)}
        </motion.div>
      </div>

      {/* ── Join CTA ── */}
      <div
        className="py-24 px-6 text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #0f0d1a 0%, #1e1b4b 60%, #312e81 100%)' }}
      >
        <div className="absolute pointer-events-none"
          style={{ width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(109,40,217,0.3) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
        <motion.div
          className="relative z-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-tight mb-5">
            Be Part of<br />
            <span style={{ background: 'linear-gradient(90deg, #a78bfa, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              The Mission
            </span>
          </h2>
          <p className="text-white/60 leading-relaxed mb-10 max-w-lg mx-auto">
            Whether you're a student ready to transform your career, an expert who wants to teach, or a company looking to hire — there's a place for you at Viscano Learn.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-bold text-sm no-underline"
                style={{ background: 'linear-gradient(135deg, #6D28D9, #4F46E5)', boxShadow: '0 8px 32px rgba(109,40,217,0.4)' }}
              >
                Start Learning Free <ArrowRight size={15} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm no-underline border"
                style={{ color: '#c4b5fd', borderColor: 'rgba(109,40,217,0.5)', background: 'rgba(109,40,217,0.1)' }}
              >
                Browse Courses
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </motion.div>
  )
}
