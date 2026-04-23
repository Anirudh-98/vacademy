import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle, MessageSquare, Clock, Users } from 'lucide-react'
import Footer from '../components/Footer'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
}

const contactInfo = [
  {
    Icon: Mail,
    label: 'Email Us',
    value: 'connect@viscano.com',
    sub: 'We reply within 24 hours',
    color: '#6D28D9',
    bg: '#EDE9FE',
  },
  {
    Icon: Phone,
    label: 'Call Us',
    value: '+91 6301361466',
    sub: 'Mon–Sat, 10 AM – 7 PM IST',
    color: '#0891B2',
    bg: '#E0F2FE',
  },
  {
    Icon: MapPin,
    label: 'Visit Us',
    value: 'HYDERABAD, INDIA',
    sub: 'Telangana, India',
    color: '#059669',
    bg: '#D1FAE5',
  },
]

const stats = [
  { Icon: MessageSquare, value: '< 24h', label: 'Response Time' },
  { Icon: Users, value: '50k+', label: 'Happy Learners' },
  { Icon: Clock, value: '24/7', label: 'Online Support' },
]

const topics = [
  'General Inquiry',
  'Course Support',
  'Billing & Payments',
  'Technical Issue',
  'Partnership',
  'Other',
]

function SectionWrapper({ children, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <div ref={ref} className={className}>
      <AnimatePresence>
        {inView && children}
      </AnimatePresence>
    </div>
  )
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', topic: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.topic) e.topic = 'Please select a topic'
    if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setErrors({})
    setLoading(true)
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white min-h-screen"
    >
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#6D28D9] via-[#7C3AED] to-[#9333EA] pt-32 pb-24 px-6">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.3) 1px,transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            <span className="inline-block bg-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-5 tracking-wide uppercase">
              Get in Touch
            </span>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5"
          >
            We'd love to hear
            <br />
            <span className="text-[#C4B5FD]">from you</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-purple-200 text-lg leading-relaxed max-w-xl mx-auto"
          >
            Whether you have a question about courses, pricing, or anything else — our team is ready to answer.
          </motion.p>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="mt-12 grid grid-cols-3 gap-4 max-w-lg mx-auto"
          >
            {stats.map(({ Icon, value, label }) => (
              <div key={label} className="bg-white/10 rounded-2xl p-4 text-white backdrop-blur-sm">
                <Icon size={18} className="mx-auto mb-2 text-[#C4B5FD]" />
                <div className="text-xl font-extrabold">{value}</div>
                <div className="text-xs text-purple-200 mt-0.5">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact cards */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {contactInfo.map(({ Icon, label, value, sub, color, bg }, i) => (
            <motion.div
              key={label}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: bg }}
              >
                <Icon size={22} style={{ color }} />
              </div>
              <h3 className="font-bold text-gray-800 mb-1">{label}</h3>
              <p className="font-semibold text-gray-900 text-sm">{value}</p>
              <p className="text-xs text-gray-400 mt-1">{sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Form + map */}
      <section className="px-6 pb-24 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-3 bg-white border border-gray-100 rounded-3xl p-8 shadow-sm"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center h-full py-16"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-5">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-gray-800 mb-2">Message Sent!</h3>
                  <p className="text-gray-500 max-w-xs">
                    Thanks for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', topic: '', message: '' }) }}
                    className="mt-8 px-6 py-2.5 rounded-xl bg-[#6D28D9] text-white text-sm font-semibold hover:bg-[#5B21B6] transition-colors"
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <h2 className="text-2xl font-extrabold text-gray-800 mb-1">Send us a message</h2>
                  <p className="text-sm text-gray-400 mb-7">Fill in the form and we'll be in touch shortly.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">Full Name</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={set('name')}
                        placeholder="Jane Doe"
                        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors focus:border-[#6D28D9] focus:ring-2 focus:ring-purple-100 ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'}`}
                      />
                      {errors.name && (
                        <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email Address</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={set('email')}
                        placeholder="jane@example.com"
                        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors focus:border-[#6D28D9] focus:ring-2 focus:ring-purple-100 ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'}`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Topic */}
                  <div className="mb-5">
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Topic</label>
                    <div className="relative">
                      <select
                        value={form.topic}
                        onChange={set('topic')}
                        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none appearance-none transition-colors focus:border-[#6D28D9] focus:ring-2 focus:ring-purple-100 ${errors.topic ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'} ${!form.topic ? 'text-gray-400' : 'text-gray-800'}`}
                      >
                        <option value="">Select a topic…</option>
                        {topics.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                    {errors.topic && (
                      <p className="text-xs text-red-500 mt-1">{errors.topic}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="mb-7">
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Message</label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={set('message')}
                      placeholder="Tell us how we can help you…"
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none transition-colors focus:border-[#6D28D9] focus:ring-2 focus:ring-purple-100 ${errors.message ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'}`}
                    />
                    {errors.message && (
                      <p className="text-xs text-red-500 mt-1">{errors.message}</p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.97 }}
                    className="w-full flex items-center justify-center gap-2 bg-[#6D28D9] hover:bg-[#5B21B6] disabled:opacity-70 text-white font-semibold py-3.5 rounded-xl transition-colors text-sm"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Side info */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* FAQ teaser */}
            <div className="bg-[#EDE9FE] rounded-3xl p-7">
              <h3 className="font-extrabold text-gray-800 text-lg mb-2">Quick answers</h3>
              <p className="text-sm text-gray-500 mb-5">
                Most questions are already answered in our FAQ — save time by checking there first.
              </p>
              <ul className="space-y-3 text-sm">
                {[
                  'How do I enroll in a course?',
                  'Can I get a refund?',
                  'Do courses have certificates?',
                  'Is there a free trial?',
                ].map((q) => (
                  <li key={q} className="flex items-start gap-2 text-gray-600">
                    <span className="mt-0.5 w-4 h-4 rounded-full bg-[#6D28D9] flex-shrink-0 flex items-center justify-center">
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1.5 4l2 2 3-3" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {q}
                  </li>
                ))}
              </ul>
            </div>

            {/* Office hours */}
            <div className="border border-gray-100 rounded-3xl p-7">
              <h3 className="font-extrabold text-gray-800 text-lg mb-4">Office Hours</h3>
              <ul className="space-y-3 text-sm text-gray-500">
                {[
                  { day: 'Monday – Friday', hours: '10:00 AM – 7:00 PM IST' },
                  { day: 'Saturday', hours: '10:00 AM – 4:00 PM IST' },
                  { day: 'Sunday', hours: 'Closed' },
                ].map(({ day, hours }) => (
                  <li key={day} className="flex justify-between">
                    <span className="font-medium text-gray-700">{day}</span>
                    <span>{hours}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-center gap-2 bg-green-50 text-green-700 text-xs font-semibold px-3 py-2 rounded-xl">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Support is currently online
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </motion.div>
  )
}
