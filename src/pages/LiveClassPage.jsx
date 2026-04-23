import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Video, Users, Clock, Calendar, Bell, ArrowRight,
  Play, Star, Search, Zap, Mic, MonitorPlay,
  MessageSquare, Mail, User, CheckCircle2, X,
} from 'lucide-react'
import Footer from '../components/Footer'
import { liveClasses, categories, categoryColors, recordings } from '../data/liveClasses'
import { useLiveClass } from '../context/LiveClassContext'
import { useAuth } from '../context/AuthContext'

/* ── helpers ── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
}

function useCountdown(targetDate) {
  const calc = useCallback(() => {
    const diff = new Date(targetDate) - new Date()
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 }
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    }
  }, [targetDate])

  const [time, setTime] = useState(calc)
  useEffect(() => {
    const t = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(t)
  }, [calc])
  return time
}

/* ── sub-components ── */
function FreeBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black text-white uppercase tracking-wide bg-green-500">
      FREE
    </span>
  )
}

function CountdownBlock({ label, value }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-base"
        style={{ background: 'rgba(255,255,255,0.15)' }}>
        {String(value).padStart(2, '0')}
      </div>
      <span className="text-[9px] text-white/50 font-bold uppercase mt-1 tracking-wide">{label}</span>
    </div>
  )
}

function UpcomingCard({ session, i, onRegisterClick }) {
  const { d, h, m, s } = useCountdown(session.date)
  const { isRegistered } = useLiveClass()
  const registered = isRegistered(session.id)
  const cat = categoryColors[session.category] || { bg: '#f3f4f6', color: '#6b7280' }
  const dateObj = new Date(session.date)
  const isToday = d === 0

  return (
    <motion.div
      custom={i}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ y: -5 }}
      className="rounded-3xl overflow-hidden border border-gray-100 bg-white flex flex-col group"
      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
    >
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden">
        <img src={session.thumbnail} alt={session.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }} />

        <div className="absolute top-3 left-3 flex gap-2">
          <span className="text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ background: cat.bg, color: cat.color, backdropFilter: 'blur(8px)' }}>
            {session.category}
          </span>
          <FreeBadge />
        </div>

        {/* Countdown overlay */}
        <div className="absolute bottom-3 left-3 right-3">
          {isToday ? (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)' }}>
              <Zap size={12} className="text-yellow-400" />
              <span className="text-white text-xs font-bold">Starting in</span>
              <div className="flex items-center gap-1.5 ml-auto">
                <CountdownBlock label="h" value={h} />
                <span className="text-white/60 font-black text-sm">:</span>
                <CountdownBlock label="m" value={m} />
                <span className="text-white/60 font-black text-sm">:</span>
                <CountdownBlock label="s" value={s} />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)' }}>
              <Calendar size={12} className="text-white/70" />
              <span className="text-white text-xs font-semibold">
                {dateObj.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
                {' · '}
                {dateObj.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="font-extrabold text-gray-900 text-sm leading-snug">{session.title}</h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium mt-1.5 inline-block">
            {session.level}
          </span>
        </div>

        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{session.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {session.tags.map((t) => (
            <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">#{t}</span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <img src={session.avatar} alt={session.instructor}
              className="w-7 h-7 rounded-full object-cover" />
            <span className="text-xs font-semibold text-gray-700">{session.instructor}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400 text-xs">
            <Users size={11} />
            {session.enrolled.toLocaleString('en-IN')} registered
          </div>
        </div>

        {registered ? (
          <div className="flex items-center justify-center gap-2 py-2.5 rounded-2xl text-xs font-bold bg-green-50 text-green-600 border border-green-200">
            <CheckCircle2 size={13} /> Registered
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onRegisterClick(session)}
            className="flex items-center justify-center gap-1.5 py-2.5 rounded-2xl text-xs font-bold text-white w-full cursor-pointer border-none"
            style={{ background: session.color }}
          >
            <Bell size={12} /> Register for Free
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

function RecordingCard({ rec, i }) {
  const cat = categoryColors[rec.category] || { bg: '#f3f4f6', color: '#6b7280' }
  return (
    <motion.div
      custom={i}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ y: -4 }}
      className="rounded-3xl overflow-hidden border border-gray-100 bg-white flex flex-col group cursor-pointer"
      style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
    >
      <div className="relative h-40 overflow-hidden">
        <img src={rec.thumbnail} alt={rec.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
          <motion.div
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.9)' }}
          >
            <Play size={18} fill="#4F46E5" className="text-indigo-600 ml-0.5" />
          </motion.div>
        </div>
        <span className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full"
          style={{ background: cat.bg, color: cat.color, backdropFilter: 'blur(8px)' }}>
          {rec.category}
        </span>
        <span className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold text-white"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
          <Clock size={10} /> {rec.duration}
        </span>
      </div>
      <div className="p-4 flex flex-col gap-3">
        <h3 className="font-extrabold text-gray-900 text-sm leading-snug">{rec.title}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={rec.avatar} alt={rec.instructor} className="w-6 h-6 rounded-full object-cover" />
            <span className="text-xs text-gray-500">{rec.instructor}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star size={11} fill="#f59e0b" className="text-yellow-400" />
            <span className="text-xs font-bold text-gray-700">{rec.rating}</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-[10px] text-gray-400">
          <span className="flex items-center gap-1"><MonitorPlay size={10} /> {rec.views} views</span>
          <span>{rec.date}</span>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Registration Modal ── */
function RegistrationModal({ session, onClose }) {
  const { user } = useAuth()
  const { registerForClass } = useLiveClass()
  const [form, setForm] = useState({ name: '', email: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // Pre-fill from auth on open
  useEffect(() => {
    setForm({
      name: user?.displayName || '',
      email: user?.email || '',
    })
    setErrors({})
    setSuccess(false)
    setLoading(false)
  }, [session?.id, user?.displayName, user?.email])

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const set = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    return e
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    registerForClass(session.id, { name: form.name.trim(), email: form.email.trim() })
    setLoading(false)
    setSuccess(true)
    setTimeout(onClose, 1600)
  }

  const cat = categoryColors[session.category] || { bg: '#f3f4f6', color: '#6b7280' }
  const dateObj = new Date(session.date)

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  }
  const panelVariants = {
    hidden: { opacity: 0, scale: 0.94, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, scale: 0.96, y: 10, transition: { duration: 0.2 } },
  }

  return createPortal(
    <motion.div
      key="backdrop"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <motion.div
        key="panel"
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="bg-white rounded-3xl overflow-hidden w-full max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Thumbnail header */}
        <div className="relative h-36 overflow-hidden">
          <img src={session.thumbnail} alt={session.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)' }} />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-white cursor-pointer border-none"
            style={{ background: 'rgba(0,0,0,0.45)' }}
          >
            <X size={14} />
          </button>
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ background: cat.bg, color: cat.color, backdropFilter: 'blur(8px)' }}>
              {session.category}
            </span>
            <FreeBadge />
          </div>
          <div className="absolute bottom-3 left-4">
            <p className="text-white font-extrabold text-base leading-tight">{session.title}</p>
          </div>
        </div>

        <div className="p-6">
          {/* Class meta */}
          <div className="flex items-center gap-3 mb-5 pb-5 border-b border-gray-100">
            <img src={session.avatar} alt={session.instructor} className="w-9 h-9 rounded-full object-cover" />
            <div>
              <p className="text-xs font-bold text-gray-800">{session.instructor}</p>
              <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                <Calendar size={10} />
                {dateObj.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
                {' · '}
                {dateObj.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-4"
              >
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-3">
                  <CheckCircle2 size={28} className="text-green-600" />
                </div>
                <p className="font-extrabold text-gray-900 text-lg">You're registered!</p>
                <p className="text-sm text-gray-500 mt-1">We'll remind you before the class starts.</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
                noValidate
              >
                <p className="text-sm font-bold text-gray-800 mb-4">Complete your free registration</p>

                {/* Name */}
                <div className="mb-4">
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'}`}
                    style={{ outline: 'none' }}>
                    <User size={15} className="text-gray-400 shrink-0" />
                    <input
                      type="text"
                      value={form.name}
                      onChange={set('name')}
                      placeholder="Your full name"
                      className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                    />
                  </div>
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="mb-6">
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'}`}>
                    <Mail size={15} className="text-gray-400 shrink-0" />
                    <input
                      type="email"
                      value={form.email}
                      onChange={set('email')}
                      placeholder="Email address"
                      className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                    />
                  </div>
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.97 }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold text-white cursor-pointer border-none disabled:opacity-70"
                  style={{ background: session.color }}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Registering…
                    </>
                  ) : (
                    <><Bell size={14} /> Register for Free</>
                  )}
                </motion.button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full mt-3 py-2.5 rounded-2xl text-sm font-semibold text-gray-500 hover:text-gray-700 bg-transparent border-none cursor-pointer transition-colors"
                >
                  Cancel
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  )
}

/* ── page ── */
export default function LiveClassPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [selectedClass, setSelectedClass] = useState(null)

  const filteredClasses = liveClasses.filter((s) => {
    const matchCat = activeCategory === 'All' || s.category === activeCategory
    const matchQ = s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.instructor.toLowerCase().includes(query.toLowerCase())
    return matchCat && matchQ
  })

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-white"
    >
      {/* Hero */}
      <div
        className="pt-36 pb-20 px-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #0f0d1a 0%, #1a0533 50%, #2d1065 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute pointer-events-none"
          style={{ width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(109,40,217,0.25) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black text-white uppercase tracking-wide"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              100% Free Live Classes
            </span>

            <h1 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-tight">
              Learn Live.<br />
              <span style={{ background: 'linear-gradient(90deg, #C4B5FD, #A78BFA, #8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Free. Forever.
              </span>
            </h1>
            <p className="text-white/60 max-w-xl leading-relaxed">
              Join upcoming live sessions taught by industry experts. Ask questions in real time, learn with thousands of peers — always free to attend.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {[
                { icon: Mic, label: 'Interactive Q&A' },
                { icon: MessageSquare, label: 'Live Chat' },
                { icon: Video, label: 'Recorded Replay' },
                { icon: Users, label: 'Peer Learning' },
              ].map(({ icon: Icon, label }) => (
                <div key={label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white"
                  style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <Icon size={13} />
                  {label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Upcoming Free Classes */}
      <div className="px-6 pb-20" style={{ background: '#f9fafb' }}>
        <div className="max-w-7xl mx-auto pt-14">
          <motion.div
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
          >
            <div>
              <span className="text-xs font-bold text-[#6D28D9] uppercase tracking-widest">Upcoming Schedule</span>
              <h2 className="text-3xl font-extrabold text-gray-900 mt-1">Free Live Classes</h2>
              <p className="text-sm text-gray-400 mt-1">All classes are free. Register to secure your spot.</p>
            </div>

            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-gray-200 bg-white"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <Search size={14} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search classes..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 w-40"
              />
            </div>
          </motion.div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                className="px-4 py-2 rounded-full text-sm font-semibold border cursor-pointer transition-all"
                style={{
                  background: activeCategory === cat ? '#6D28D9' : 'white',
                  color: activeCategory === cat ? 'white' : '#6b7280',
                  borderColor: activeCategory === cat ? '#6D28D9' : '#e5e7eb',
                }}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {filteredClasses.length > 0 ? (
              <motion.div
                key={activeCategory + query}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredClasses.map((s, i) => (
                  <UpcomingCard key={s.id} session={s} i={i} onRegisterClick={setSelectedClass} />
                ))}
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                <p className="text-4xl mb-4">📭</p>
                <p className="text-gray-500 font-medium">No classes found.</p>
                <button onClick={() => { setActiveCategory('All'); setQuery('') }}
                  className="mt-3 text-sm text-[#6D28D9] font-semibold cursor-pointer bg-transparent border-none">
                  Clear filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Recordings */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          className="flex items-end justify-between mb-10"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
        >
          <div>
            <span className="text-xs font-bold text-[#6D28D9] uppercase tracking-widest">Missed a session?</span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-1">Watch Recordings</h2>
          </div>
          <Link to="/courses" className="text-sm font-bold text-indigo-600 no-underline flex items-center gap-1 hover:gap-2 transition-all">
            View all <ArrowRight size={14} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recordings.map((rec, i) => (
            <RecordingCard key={rec.id} rec={rec} i={i} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        className="py-20 px-6 text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f0d1a 0%, #1a0533 60%, #2d1065 100%)' }}
      >
        <div className="absolute pointer-events-none"
          style={{ width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(109,40,217,0.3) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
        <motion.div
          className="relative z-10 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black text-white uppercase tracking-wide"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Always Free
          </span>
          <h2 className="text-4xl font-black text-white uppercase mt-5 mb-4">
            Never Miss a<br />Live Session
          </h2>
          <p className="text-white/60 mb-8 leading-relaxed">
            Register free and get notified before every live class. Access all recordings anytime, even after the session ends.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link to="/courses"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm no-underline border"
                style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>
                Browse Courses <ArrowRight size={15} />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <Footer />

      {/* Registration modal */}
      <AnimatePresence>
        {selectedClass && (
          <RegistrationModal
            key={selectedClass.id}
            session={selectedClass}
            onClose={() => setSelectedClass(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
