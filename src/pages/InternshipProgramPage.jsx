import { useRef, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight, CheckCircle2, XCircle, Zap, Users, Code2,
  Briefcase, MessageSquare, GitMerge, Bug, Server, Clock,
  Star, ChevronRight, AlertTriangle, Megaphone, X,
  Loader2, Send, User, Mail, Phone, Link2,
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
const whatYoullDo = [
  { icon: Code2,        text: 'Work on live projects handled by Viscano' },
  { icon: MessageSquare, text: 'Attend client meetings and understand requirements' },
  { icon: Users,        text: 'Collaborate with developers and designers' },
  { icon: Zap,          text: 'Build features used by real users' },
  { icon: Bug,          text: 'Debug, test, and improve real applications' },
  { icon: Server,       text: 'Learn how production systems are structured' },
]

const liveLearning = [
  { icon: Megaphone, title: 'Live Coding Sessions',         desc: 'Code alongside mentors in real time — no pre-recorded lectures.' },
  { icon: MessageSquare, title: 'Real-Time Doubt Solving',  desc: 'Ask questions and get answers the moment they arise.' },
  { icon: Zap,       title: 'Hands-On Implementation',      desc: 'You write the code during class, not just watch it being written.' },
  { icon: Users,     title: 'Continuous Mentor Guidance',   desc: 'A mentor is with you throughout — not just in scheduled slots.' },
]

const realExposure = [
  { icon: Briefcase,    text: 'Join real client discussions' },
  { icon: GitMerge,     text: 'Understand project planning and execution' },
  { icon: Users,        text: 'Learn team collaboration and communication' },
  { icon: Star,         text: 'Exposure to real business problems' },
]

const whatYoullGain = [
  'Real project experience (not just certificates)',
  'Portfolio with actual work you shipped',
  'Practical development skills that stick',
  'Understanding of real-world workflows and processes',
  'Confidence to walk into any professional environment',
]

const forYouIf = [
  "You're tired of just watching tutorials",
  'You want real project experience on your resume',
  "You're serious about becoming job-ready",
  "You're willing to actively participate and learn",
]

const notForYouIf = [
  'You prefer passive learning (watching recordings)',
  "You're not willing to attend live sessions",
  'You expect spoon-feeding and hand-holding',
  "You're not ready to work on actual tasks",
]

const steps = [
  { num: '01', title: 'Apply',              desc: 'Fill out the short application form. We review every applicant personally.' },
  { num: '02', title: 'Onboarding Session', desc: "You'll attend an onboarding call to understand the program, tools, and expectations." },
  { num: '03', title: 'Live Classes + Projects', desc: 'Start attending live sessions and get allocated to a real ongoing project.' },
  { num: '04', title: 'Work & Build',       desc: 'Work on actual tasks with daily mentor support and guidance.' },
  { num: '05', title: 'Reviews & Feedback', desc: 'Participate in code reviews, demo calls, and feedback cycles — just like a real team.' },
]

/* ── form field helpers ── */
const inputBase = {
  className: 'w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none transition-all',
  style: { background: '#FAFAFA' },
}

const statusOptions = ['Student', 'Recent Graduate', 'Working Professional', 'Fresher / No Experience']
const techOptions   = ['Frontend (React / Vue)', 'Backend (Node / Python / Java)', 'Full Stack', 'Mobile (React Native / Flutter)', 'UI/UX Design', 'DevOps / Cloud', 'Data Science / ML', 'Other']
const sourceOptions = ['Instagram', 'LinkedIn', 'YouTube', 'Friend / Referral', 'Google Search', 'Other']

function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  )
}

function ApplyModal({ onClose }) {
  const EMPTY = { name: '', email: '', phone: '', status: '', tech: '', linkedin: '', why: '', source: '' }
  const [form, setForm]       = useState(EMPTY)
  const [errors, setErrors]   = useState({})
  const [loading, setLoading] = useState(false)
  const [done, setDone]       = useState(false)

  /* lock body scroll */
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const set = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.name.trim())                        e.name   = 'Full name is required'
    if (!/\S+@\S+\.\S+/.test(form.email))         e.email  = 'Enter a valid email address'
    if (!/^\+?[0-9\s\-]{7,15}$/.test(form.phone)) e.phone  = 'Enter a valid phone number'
    if (!form.status)                              e.status = 'Please select your current status'
    if (!form.tech)                                e.tech   = 'Please select an area of interest'
    if (form.why.trim().length < 20)               e.why    = 'Please write at least 20 characters'
    return e
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1400))
    setLoading(false)
    setDone(true)
  }

  const focusRing = 'focus:ring-2 focus:ring-purple-400 focus:border-purple-400'

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(10,8,30,0.72)', backdropFilter: 'blur(6px)' }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      >
        <motion.div
          key="sheet"
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 24 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-white flex flex-col"
          style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.35)' }}
        >
          {/* close btn */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full transition-colors"
            style={{ background: 'rgba(0,0,0,0.06)' }}
          >
            <X size={16} className="text-gray-600" />
          </button>

          {done ? (
            /* ── success state ── */
            <div className="flex flex-col items-center gap-5 px-8 py-16 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(5,150,105,0.1)' }}>
                <CheckCircle2 size={32} style={{ color: '#059669' }} />
              </div>
              <h3 className="text-2xl font-black text-gray-900">Application Received!</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                We've received your application and will get back to you within <strong>48 hours</strong>.
                Keep an eye on your inbox.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-8 py-3 rounded-full font-bold text-sm text-white"
                style={{ background: 'linear-gradient(135deg, #6D28D9, #4F46E5)' }}
              >
                Close
              </button>
            </div>
          ) : (
            /* ── form ── */
            <>
              {/* header */}
              <div className="px-8 pt-8 pb-5" style={{ borderBottom: '1px solid #f0f0f0' }}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3"
                  style={{ background: 'rgba(109,40,217,0.08)', color: '#6D28D9' }}>
                  <Briefcase size={11} /> Internship Application
                </div>
                <h2 className="text-2xl font-black text-gray-900 leading-tight">Apply for the Program</h2>
                <p className="text-gray-500 text-sm mt-1">Fill this out and we'll review your application personally.</p>
              </div>

              <form onSubmit={handleSubmit} className="px-8 py-6 flex flex-col gap-5">

                {/* full name */}
                <Field label="Full Name *" error={errors.name}>
                  <div className="relative">
                    <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="e.g. Riya Sharma"
                      value={form.name}
                      onChange={set('name')}
                      {...inputBase}
                      className={`${inputBase.className} pl-10 ${focusRing} ${errors.name ? 'border-red-400' : ''}`}
                    />
                  </div>
                </Field>

                {/* email + phone side by side */}
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Email *" error={errors.email}>
                    <div className="relative">
                      <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        placeholder="you@email.com"
                        value={form.email}
                        onChange={set('email')}
                        {...inputBase}
                        className={`${inputBase.className} pl-10 ${focusRing} ${errors.email ? 'border-red-400' : ''}`}
                      />
                    </div>
                  </Field>
                  <Field label="Phone *" error={errors.phone}>
                    <div className="relative">
                      <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        placeholder="+91 9876543210"
                        value={form.phone}
                        onChange={set('phone')}
                        {...inputBase}
                        className={`${inputBase.className} pl-10 ${focusRing} ${errors.phone ? 'border-red-400' : ''}`}
                      />
                    </div>
                  </Field>
                </div>

                {/* current status */}
                <Field label="Current Status *" error={errors.status}>
                  <select
                    value={form.status}
                    onChange={set('status')}
                    {...inputBase}
                    className={`${inputBase.className} ${focusRing} ${errors.status ? 'border-red-400' : ''}`}
                  >
                    <option value="">Select your status…</option>
                    {statusOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </Field>

                {/* area of interest */}
                <Field label="Area of Interest *" error={errors.tech}>
                  <select
                    value={form.tech}
                    onChange={set('tech')}
                    {...inputBase}
                    className={`${inputBase.className} ${focusRing} ${errors.tech ? 'border-red-400' : ''}`}
                  >
                    <option value="">Select a tech area…</option>
                    {techOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </Field>

                {/* linkedin (optional) */}
                <Field label="LinkedIn Profile (optional)">
                  <div className="relative">
                    <Link2 size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="url"
                      placeholder="linkedin.com/in/yourname"
                      value={form.linkedin}
                      onChange={set('linkedin')}
                      {...inputBase}
                      className={`${inputBase.className} pl-10 ${focusRing}`}
                    />
                  </div>
                </Field>

                {/* why */}
                <Field label="Why do you want to join? *" error={errors.why}>
                  <textarea
                    rows={4}
                    placeholder="Tell us what you're hoping to build, learn, or prove through this internship…"
                    value={form.why}
                    onChange={set('why')}
                    {...inputBase}
                    className={`${inputBase.className} resize-none ${focusRing} ${errors.why ? 'border-red-400' : ''}`}
                  />
                </Field>

                {/* how did you hear */}
                <Field label="How did you hear about us?">
                  <select
                    value={form.source}
                    onChange={set('source')}
                    {...inputBase}
                    className={`${inputBase.className} ${focusRing}`}
                  >
                    <option value="">Select…</option>
                    {sourceOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </Field>

                {/* submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-1 w-full flex items-center justify-center gap-2 py-4 rounded-full font-bold text-sm text-white transition-opacity disabled:opacity-70"
                  style={{ background: 'linear-gradient(135deg, #6D28D9, #4F46E5)', boxShadow: '0 4px 20px rgba(109,40,217,0.35)' }}
                >
                  {loading
                    ? <><Loader2 size={16} className="animate-spin" /> Submitting…</>
                    : <><Send size={15} /> Submit Application</>
                  }
                </button>

                <p className="text-center text-xs text-gray-400">
                  We review every application personally. No spam, ever.
                </p>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  )
}

/* ── reusable section wrapper ── */
function Section({ children, className = '', style = {} }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.section
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={`px-6 ${className}`}
      style={style}
    >
      {children}
    </motion.section>
  )
}

function Badge({ children }) {
  return (
    <motion.span
      variants={fadeUp}
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
      style={{ background: 'rgba(109,40,217,0.10)', color: '#6D28D9', border: '1px solid rgba(109,40,217,0.2)' }}
    >
      {children}
    </motion.span>
  )
}

/* ── page ── */
export default function InternshipProgramPage() {
  const [showModal, setShowModal] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-white"
    >
      {showModal && <ApplyModal onClose={() => setShowModal(false)} />}

      {/* ─────────────── 1. HERO ─────────────── */}
      <div
        className="pt-36 pb-28 px-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #312e81 0%, #4F46E5 45%, #7C3AED 100%)' }}
      >
        {/* grid overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }} />
        {/* blobs */}
        <div className="absolute pointer-events-none rounded-full"
          style={{ width: 560, height: 560, background: 'rgba(255,255,255,0.06)', top: '-160px', right: '-120px' }} />
        <div className="absolute pointer-events-none rounded-full"
          style={{ width: 340, height: 340, background: 'rgba(255,255,255,0.04)', bottom: '-100px', left: '-80px' }} />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col items-center gap-6">
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold text-white"
              style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.28)' }}
            >
              <Briefcase size={12} /> Viscano Internship Program
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight leading-tight"
            >
              Work on Real Projects.{' '}
              <span style={{
                background: 'linear-gradient(90deg, #fde68a, #fbbf24)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                Not Practice Assignments.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-white/75 text-base md:text-lg max-w-2xl leading-relaxed"
            >
              Join the Viscano Internship Program and gain hands-on experience by working on real client projects,
              attending live sessions, and collaborating with developers in a real working environment.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mt-2">
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm cursor-pointer border-0"
                style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', color: '#1c1917' }}
              >
                Apply for Internship <ArrowRight size={15} />
              </button>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm no-underline text-white"
                style={{ border: '1.5px solid rgba(255,255,255,0.35)', background: 'rgba(255,255,255,0.1)' }}
              >
                Talk to Us <ChevronRight size={15} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ─────────────── 2. WHAT MAKES THIS DIFFERENT ─────────────── */}
      <Section className="py-24 max-w-5xl mx-auto">
        <div className="flex flex-col items-center gap-4 text-center mb-14">
          <Badge>What Makes This Different</Badge>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            This Isn't a Typical Internship
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 max-w-2xl leading-relaxed">
            Most internships give you dummy tasks. At Viscano, you'll be part of actual projects handled for real clients.
            You won't just learn — you'll contribute, collaborate, and build.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {[
            { good: true,  text: 'Work on real client requirements' },
            { good: false, text: 'No fake assignments or isolated tasks' },
            { good: true,  text: 'Be part of ongoing development workflows' },
            { good: true,  text: 'Experience how real teams actually operate' },
          ].map(({ good, text }, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              className="flex items-start gap-3 p-5 rounded-2xl border"
              style={{ borderColor: good ? 'rgba(5,150,105,0.2)' : 'rgba(109,40,217,0.15)', background: good ? 'rgba(5,150,105,0.04)' : 'rgba(109,40,217,0.04)' }}
            >
              {good
                ? <CheckCircle2 size={20} className="mt-0.5 shrink-0" style={{ color: '#059669' }} />
                : <XCircle size={20} className="mt-0.5 shrink-0" style={{ color: '#6D28D9' }} />
              }
              <p className="font-semibold text-gray-800 text-sm leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ─────────────── 3. WHAT YOU'LL DO ─────────────── */}
      <div style={{ background: '#F9FAFB' }}>
        <Section className="py-24 max-w-5xl mx-auto">
          <div className="flex flex-col items-center gap-4 text-center mb-14">
            <Badge>Day-to-Day Work</Badge>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
              What You'll Actually Be Doing
            </motion.h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whatYoullDo.map(({ icon: Icon, text }, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="flex gap-4 p-5 rounded-2xl bg-white border border-gray-100"
                style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}
              >
                <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(79,70,229,0.08)' }}>
                  <Icon size={18} style={{ color: '#4F46E5' }} />
                </div>
                <p className="text-sm font-semibold text-gray-700 leading-relaxed self-center">{text}</p>
              </motion.div>
            ))}
          </div>
        </Section>
      </div>

      {/* ─────────────── 4. LIVE LEARNING ─────────────── */}
      <Section className="py-24 max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-14 items-center">
          <div className="flex flex-col gap-4 lg:w-2/5">
            <Badge>Learning Format</Badge>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
              Learn Through Live Sessions
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 leading-relaxed">
              All sessions are conducted live — where you code, ask questions, and solve problems in real time.
              Recordings are available only if you miss a session, but the real value is in active participation.
            </motion.p>
          </div>

          <div className="lg:w-3/5 grid sm:grid-cols-2 gap-5 w-full">
            {liveLearning.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                className="p-5 rounded-2xl border border-gray-100 bg-white"
                style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: 'rgba(109,40,217,0.08)' }}>
                  <Icon size={18} style={{ color: '#6D28D9' }} />
                </div>
                <p className="font-bold text-gray-900 text-sm mb-1">{title}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─────────────── 5. REAL EXPOSURE ─────────────── */}
      <div style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #6D28D9 100%)' }} className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }} />
        <Section className="py-24 max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col items-center gap-4 text-center mb-14">
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold"
              style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.28)', color: '#fff' }}
            >
              Real Exposure
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Get Real Industry Exposure
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/70 max-w-xl leading-relaxed">
              You won't be isolated from how things actually work. You'll experience real workflows, deadlines,
              and communication — just like in a professional environment.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {realExposure.map(({ icon: Icon, text }, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                className="flex items-center gap-3 p-4 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(255,255,255,0.2)' }}>
                  <Icon size={16} className="text-white" />
                </div>
                <p className="text-white font-semibold text-sm">{text}</p>
              </motion.div>
            ))}
          </div>
        </Section>
      </div>

      {/* ─────────────── 6. WHAT YOU'LL GAIN ─────────────── */}
      <Section className="py-24 max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-14 items-center">
          <div className="flex flex-col gap-4 lg:w-2/5">
            <Badge>Outcomes</Badge>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
              What You Walk Away With
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 leading-relaxed">
              Not a certificate to hang on a wall. Real, demonstrable experience that employers can verify.
            </motion.p>
          </div>

          <div className="lg:w-3/5 flex flex-col gap-3 w-full">
            {whatYoullGain.map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                className="flex items-start gap-3 p-4 rounded-2xl border border-gray-100 bg-white"
                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
              >
                <CheckCircle2 size={18} className="mt-0.5 shrink-0" style={{ color: '#059669' }} />
                <p className="text-gray-800 font-semibold text-sm">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─────────────── 7 & 8. FOR YOU / NOT FOR YOU ─────────────── */}
      <div style={{ background: '#F9FAFB' }}>
        <Section className="py-24 max-w-5xl mx-auto">
          <div className="flex flex-col items-center gap-3 text-center mb-14">
            <Badge>Fit Check</Badge>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
              Is This Right for You?
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* For you */}
            <motion.div
              variants={fadeUp}
              className="rounded-3xl p-7 flex flex-col gap-5"
              style={{ background: 'rgba(5,150,105,0.06)', border: '1.5px solid rgba(5,150,105,0.2)' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(5,150,105,0.15)' }}>
                  <CheckCircle2 size={18} style={{ color: '#059669' }} />
                </div>
                <h3 className="font-black text-lg text-gray-900">This Program Is For You If</h3>
              </div>
              <div className="flex flex-col gap-3">
                {forYouIf.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: '#059669' }} />
                    <p className="text-sm text-gray-700 font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Not for you */}
            <motion.div
              variants={fadeUp}
              custom={1}
              className="rounded-3xl p-7 flex flex-col gap-5"
              style={{ background: 'rgba(239,68,68,0.05)', border: '1.5px solid rgba(239,68,68,0.2)' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(239,68,68,0.12)' }}>
                  <AlertTriangle size={18} style={{ color: '#dc2626' }} />
                </div>
                <h3 className="font-black text-lg text-gray-900">This Is NOT For You If</h3>
              </div>
              <div className="flex flex-col gap-3">
                {notForYouIf.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <XCircle size={16} className="mt-0.5 shrink-0" style={{ color: '#dc2626' }} />
                    <p className="text-sm text-gray-700 font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </Section>
      </div>

      {/* ─────────────── 9. PROGRAM STRUCTURE ─────────────── */}
      <Section className="py-24 max-w-4xl mx-auto">
        <div className="flex flex-col items-center gap-4 text-center mb-16">
          <Badge>Program Structure</Badge>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            How the Internship Works
          </motion.h2>
        </div>

        <div className="relative flex flex-col gap-0">
          {/* vertical connector line */}
          <div
            className="absolute left-6 top-10 bottom-10 w-px hidden sm:block"
            style={{ background: 'linear-gradient(to bottom, #4F46E5, #7C3AED)' }}
          />

          {steps.map(({ num, title, desc }, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              className="relative flex gap-6 pb-10 last:pb-0"
            >
              {/* step bubble */}
              <div
                className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-black z-10"
                style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', boxShadow: '0 0 0 4px white, 0 0 0 5px rgba(79,70,229,0.25)' }}
              >
                {num}
              </div>

              <div className="flex flex-col gap-1 pt-2">
                <p className="font-black text-gray-900 text-base">{title}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ─────────────── 10. FINAL CTA ─────────────── */}
      <div
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f0d1a 0%, #1e1b4b 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(rgba(109,40,217,0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(109,40,217,0.12) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }} />
        <div className="absolute pointer-events-none rounded-full"
          style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(109,40,217,0.18), transparent)', top: '-150px', right: '-100px' }} />

        <Section className="py-28 max-w-3xl mx-auto relative z-10">
          <div className="flex flex-col items-center gap-6 text-center">
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold"
              style={{ background: 'rgba(109,40,217,0.3)', border: '1px solid rgba(109,40,217,0.5)', color: '#C4B5FD' }}
            >
              <Clock size={12} /> Applications Open Now
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight"
            >
              Start Building{' '}
              <span style={{
                background: 'linear-gradient(90deg, #fde68a, #fbbf24)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                Real Experience
              </span>
            </motion.h2>

            <motion.p variants={fadeUp} className="text-white/60 text-base leading-relaxed max-w-xl">
              If you're serious about learning and want real-world exposure, this internship is for you.
              Don't come here to passively consume — come here to build.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mt-2">
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm cursor-pointer border-0"
                style={{ background: 'linear-gradient(135deg, #6D28D9, #4F46E5)', color: '#fff', boxShadow: '0 0 32px rgba(109,40,217,0.4)' }}
              >
                Apply Now <ArrowRight size={15} />
              </button>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm no-underline"
                style={{ border: '1.5px solid rgba(109,40,217,0.5)', color: '#C4B5FD', background: 'rgba(109,40,217,0.12)' }}
              >
                Talk to Us <ChevronRight size={15} />
              </Link>
            </motion.div>

            {/* trust signals */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap justify-center gap-4 mt-4 text-white/40 text-xs"
            >
              <span>No upfront fees to apply</span>
              <span>·</span>
              <span>Live sessions only</span>
              <span>·</span>
              <span>Real client projects</span>
              <span>·</span>
              <span>Portfolio-worthy work</span>
            </motion.div>
          </div>
        </Section>
      </div>

      <Footer />
    </motion.div>
  )
}
