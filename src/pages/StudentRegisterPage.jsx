import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User, Mail, Phone, Building2, GraduationCap, BookOpen,
  CheckCircle2, ChevronDown, X, ArrowRight, Sparkles, MessageCircle,
} from 'lucide-react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { courses } from '../data/courses'

const WHATSAPP_CHANNEL_LINK = 'https://chat.whatsapp.com/D2CUT45xlq8Jf8sDQkMBpN'

const STUDYING_YEARS = [
  '1st Year', '2nd Year', '3rd Year', '4th Year', 'Final Year', 'Post Graduate', 'Alumni',
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] },
  }),
}

function InputField({ id, label, type = 'text', value, onChange, icon: Icon, error, placeholder }) {
  const [focused, setFocused] = useState(false)
  const lifted = focused || value.length > 0

  return (
    <div className="relative">
      <div
        className="flex items-center rounded-2xl border-2 transition-all duration-200"
        style={{
          height: '58px',
          borderColor: error ? '#ef4444' : focused ? '#4F46E5' : '#e5e7eb',
          background: focused ? '#fafafe' : '#f9fafb',
          boxShadow: focused ? '0 0 0 4px rgba(79,70,229,0.08)' : 'none',
        }}
      >
        <div
          className="flex items-center justify-center flex-shrink-0"
          style={{ width: '48px', color: focused ? '#4F46E5' : '#9ca3af' }}
        >
          <Icon size={17} />
        </div>
        <div className="relative flex-1 h-full">
          <label
            htmlFor={id}
            className="absolute left-0 transition-all duration-200 pointer-events-none select-none"
            style={{
              top: lifted ? '10px' : '50%',
              transform: lifted ? 'none' : 'translateY(-50%)',
              fontSize: lifted ? '10px' : '14px',
              color: error ? '#ef4444' : focused ? '#4F46E5' : '#9ca3af',
              fontWeight: lifted ? 600 : 400,
              letterSpacing: lifted ? '0.04em' : 0,
              textTransform: lifted ? 'uppercase' : 'none',
            }}
          >
            {label}
          </label>
          <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={focused && placeholder ? placeholder : ''}
            className="absolute bottom-0 left-0 right-0 bg-transparent outline-none text-sm text-gray-800"
            style={{ top: '28px', paddingBottom: '10px' }}
            autoComplete="off"
          />
        </div>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-xs text-red-500 mt-1 ml-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function SelectField({ id, label, value, onChange, icon: Icon, error, options }) {
  const [focused, setFocused] = useState(false)
  const lifted = focused || value.length > 0

  return (
    <div className="relative">
      <div
        className="flex items-center rounded-2xl border-2 transition-all duration-200"
        style={{
          height: '58px',
          borderColor: error ? '#ef4444' : focused ? '#4F46E5' : '#e5e7eb',
          background: focused ? '#fafafe' : '#f9fafb',
          boxShadow: focused ? '0 0 0 4px rgba(79,70,229,0.08)' : 'none',
        }}
      >
        <div
          className="flex items-center justify-center flex-shrink-0"
          style={{ width: '48px', color: focused ? '#4F46E5' : '#9ca3af' }}
        >
          <Icon size={17} />
        </div>
        <div className="relative flex-1 h-full">
          <label
            htmlFor={id}
            className="absolute left-0 transition-all duration-200 pointer-events-none select-none z-10"
            style={{
              top: lifted ? '10px' : '50%',
              transform: lifted ? 'none' : 'translateY(-50%)',
              fontSize: lifted ? '10px' : '14px',
              color: error ? '#ef4444' : focused ? '#4F46E5' : '#9ca3af',
              fontWeight: lifted ? 600 : 400,
              letterSpacing: lifted ? '0.04em' : 0,
              textTransform: lifted ? 'uppercase' : 'none',
            }}
          >
            {label}
          </label>
          <select
            id={id}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="absolute bottom-0 left-0 right-0 bg-transparent outline-none text-sm text-gray-800 cursor-pointer appearance-none"
            style={{ top: '28px', paddingBottom: '10px' }}
          >
            <option value="" disabled />
            {options.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-center flex-shrink-0" style={{ width: '44px', color: '#9ca3af' }}>
          <ChevronDown size={16} />
        </div>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-xs text-red-500 mt-1 ml-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function CourseMultiSelect({ selected, onChange, error }) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [otherText, setOtherText] = useState('')
  const [otherActive, setOtherActive] = useState(false)

  const filtered = courses.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase())
  )

  // custom "other" entries are items in selected that don't match any course title
  const courseTitles = new Set(courses.map((c) => c.title))
  const otherEntries = selected.filter((t) => !courseTitles.has(t))

  const toggle = (title) => {
    if (selected.includes(title)) {
      onChange(selected.filter((t) => t !== title))
    } else {
      onChange([...selected, title])
    }
  }

  const addOther = () => {
    const trimmed = otherText.trim()
    if (!trimmed || selected.includes(trimmed)) return
    onChange([...selected, trimmed])
    setOtherText('')
  }

  const handleOtherKeyDown = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); addOther() }
  }

  const toggleOtherPanel = (e) => {
    e.stopPropagation()
    setOtherActive((o) => !o)
  }

  return (
    <div className="relative">
      <div
        className="rounded-2xl border-2 transition-all duration-200 cursor-pointer"
        style={{
          borderColor: error ? '#ef4444' : open ? '#4F46E5' : '#e5e7eb',
          background: open ? '#fafafe' : '#f9fafb',
          boxShadow: open ? '0 0 0 4px rgba(79,70,229,0.08)' : 'none',
          minHeight: '58px',
        }}
        onClick={() => setOpen((o) => !o)}
      >
        <div className="flex items-center px-4 py-3 gap-3">
          <BookOpen size={17} style={{ color: open ? '#4F46E5' : '#9ca3af', flexShrink: 0 }} />
          <div className="flex-1 min-w-0">
            {selected.length === 0 ? (
              <span className="text-sm text-gray-400">Select interested courses</span>
            ) : (
              <div className="flex flex-wrap gap-1.5" onClick={(e) => e.stopPropagation()}>
                {selected.map((title) => (
                  <span
                    key={title}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{ background: 'rgba(79,70,229,0.1)', color: '#4F46E5' }}
                  >
                    {title}
                    <button
                      type="button"
                      onClick={() => toggle(title)}
                      className="bg-transparent border-none cursor-pointer p-0 flex items-center"
                      style={{ color: '#4F46E5' }}
                    >
                      <X size={10} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
          <ChevronDown
            size={16}
            style={{
              color: '#9ca3af',
              flexShrink: 0,
              transform: open ? 'rotate(180deg)' : 'rotate(0)',
              transition: 'transform 0.2s',
            }}
          />
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-50 w-full mt-2 rounded-2xl overflow-hidden"
            style={{ background: 'white', boxShadow: '0 16px 40px rgba(0,0,0,0.14)', border: '1px solid #e5e7eb' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search */}
            <div className="p-3 border-b border-gray-100">
              <input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-sm outline-none bg-gray-50 rounded-xl px-3 py-2 text-gray-700 placeholder-gray-400"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Course list */}
            <div className="max-h-40 sm:max-h-48 overflow-y-auto">
              {filtered.length === 0 ? (
                <p className="text-xs text-gray-400 text-center py-4">No courses found</p>
              ) : (
                filtered.map((course) => {
                  const isSelected = selected.includes(course.title)
                  return (
                    <div
                      key={course.id}
                      onClick={() => toggle(course.title)}
                      className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors"
                      style={{ background: isSelected ? 'rgba(79,70,229,0.05)' : 'transparent' }}
                      onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = '#f9fafb' }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = isSelected ? 'rgba(79,70,229,0.05)' : 'transparent' }}
                    >
                      <div
                        className="w-4 h-4 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-all"
                        style={{
                          borderColor: isSelected ? '#4F46E5' : '#d1d5db',
                          background: isSelected ? '#4F46E5' : 'white',
                        }}
                      >
                        {isSelected && (
                          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                            <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{course.title}</p>
                        <p className="text-xs text-gray-400">{course.category} · {course.level}</p>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            {/* Other option */}
            <div className="border-t border-gray-100">
              <div
                onClick={toggleOtherPanel}
                className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors"
                style={{ background: otherActive ? 'rgba(79,70,229,0.05)' : 'transparent' }}
                onMouseEnter={(e) => { if (!otherActive) e.currentTarget.style.background = '#f9fafb' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = otherActive ? 'rgba(79,70,229,0.05)' : 'transparent' }}
              >
                <div
                  className="w-4 h-4 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-all"
                  style={{
                    borderColor: otherActive ? '#4F46E5' : '#d1d5db',
                    background: otherActive ? '#4F46E5' : 'white',
                  }}
                >
                  {otherActive && (
                    <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                      <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Other</p>
                  <p className="text-xs text-gray-400">Type a course not listed above</p>
                </div>
              </div>

              <AnimatePresence>
                {otherActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.18 }}
                    className="px-4 pb-3 overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. Graphic Design, Digital Marketing..."
                        value={otherText}
                        onChange={(e) => setOtherText(e.target.value)}
                        onKeyDown={handleOtherKeyDown}
                        className="flex-1 text-sm outline-none bg-gray-50 rounded-xl px-3 py-2 text-gray-700 placeholder-gray-400 border border-gray-200 focus:border-indigo-400 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={addOther}
                        disabled={!otherText.trim()}
                        className="px-3 py-2 rounded-xl text-xs font-bold text-white border-none cursor-pointer disabled:opacity-40"
                        style={{ background: 'linear-gradient(135deg, #4F46E5, #6366f1)' }}
                      >
                        Add
                      </button>
                    </div>
                    {otherEntries.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {otherEntries.map((entry) => (
                          <span
                            key={entry}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
                            style={{ background: 'rgba(79,70,229,0.1)', color: '#4F46E5' }}
                          >
                            {entry}
                            <button
                              type="button"
                              onClick={() => onChange(selected.filter((t) => t !== entry))}
                              className="bg-transparent border-none cursor-pointer p-0 flex items-center"
                              style={{ color: '#4F46E5' }}
                            >
                              <X size={10} />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-xs text-red-500 mt-1 ml-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function StudentRegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    whatsapp: '',
    college: '',
    year: '',
    courses: [],
    masterclass: null,
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (field) => (e) => {
    setForm((p) => ({ ...p, [field]: e.target.value }))
    setErrors((p) => ({ ...p, [field]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Full name is required'
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!/^[6-9]\d{9}$/.test(form.whatsapp)) e.whatsapp = 'Enter a valid 10-digit Indian mobile number'
    if (!form.college.trim()) e.college = 'College name is required'
    if (!form.year) e.year = 'Please select your studying year'
    if (form.courses.length === 0) e.courses = 'Please select at least one course'
    if (form.masterclass === null) e.masterclass = 'Please select Yes or No'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    try {
      await addDoc(collection(db, 'student_leads'), {
        name: form.name.trim(),
        email: form.email.trim(),
        whatsapp: form.whatsapp.trim(),
        college: form.college.trim(),
        year: form.year,
        interestedCourses: form.courses,
        masterclassInterest: form.masterclass,
        submittedAt: serverTimestamp(),
      })
      setSubmitted(true)
    } catch (err) {
      setErrors({ submit: 'Something went wrong. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4 py-10"
        style={{ background: 'linear-gradient(135deg, #5b6ef5 0%, #7b8ff7 40%, #c5d4ff 100%)' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-3xl p-6 sm:p-10 text-center w-full max-w-md"
          style={{ boxShadow: '0 32px 80px rgba(79,70,229,0.2)' }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ background: 'linear-gradient(135deg, #4F46E5, #818cf8)' }}
          >
            <CheckCircle2 size={32} className="text-white" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-2">
              You're registered, {form.name.split(' ')[0]}!
            </h2>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Thanks for enrolling. Join our WhatsApp channel to get course updates,
              free resources, and stay connected with the community.
            </p>

            <motion.a
              href={WHATSAPP_CHANNEL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2.5 w-full sm:inline-flex sm:w-auto px-8 py-4 rounded-2xl text-white font-bold text-sm no-underline"
              style={{
                background: 'linear-gradient(135deg, #25D366, #128C7E)',
                boxShadow: '0 8px 24px rgba(37,211,102,0.35)',
              }}
            >
              <MessageCircle size={18} />
              Join WhatsApp Channel
              <ArrowRight size={16} />
            </motion.a>

            <p className="text-xs text-gray-400 mt-4">
              We'll reach out on your WhatsApp ({form.whatsapp}) with next steps.
            </p>
          </motion.div>
        </motion.div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen py-8 sm:py-12 px-4"
      style={{ background: 'linear-gradient(160deg, #f0f1ff 0%, #ffffff 50%, #f5f7ff 100%)' }}
    >
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="text-center mb-6 sm:mb-10"
        >
          <motion.div custom={0} variants={fadeUp}>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-3"
              style={{ background: 'rgba(79,70,229,0.08)', color: '#4F46E5' }}
            >
              <Sparkles size={12} /> Enroll Now — It's Free
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3 leading-tight">
              Start Your Learning Journey
            </h1>
            <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
              Fill in your details below to enroll in your preferred courses and join our growing student community.
            </p>
          </motion.div>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-3xl p-5 sm:p-8 md:p-10"
          style={{ boxShadow: '0 20px 60px rgba(79,70,229,0.1)', border: '1px solid rgba(79,70,229,0.08)' }}
        >
          <form onSubmit={handleSubmit} noValidate>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
              className="flex flex-col gap-4"
            >

              {/* Section: Personal Info */}
              <motion.p custom={0} variants={fadeUp} className="text-xs font-bold text-gray-400 uppercase tracking-widest pt-1">
                Personal Information
              </motion.p>

              <motion.div custom={1} variants={fadeUp}>
                <InputField
                  id="name" label="Student Full Name" value={form.name}
                  onChange={set('name')} icon={User} error={errors.name}
                />
              </motion.div>

              <motion.div custom={2} variants={fadeUp}>
                <InputField
                  id="email" label="Email ID" type="email" value={form.email}
                  onChange={set('email')} icon={Mail} error={errors.email}
                />
              </motion.div>

              <motion.div custom={3} variants={fadeUp}>
                <InputField
                  id="whatsapp" label="WhatsApp Mobile Number" type="tel" value={form.whatsapp}
                  onChange={set('whatsapp')} icon={Phone} error={errors.whatsapp}
                  placeholder="10-digit number"
                />
              </motion.div>

              {/* Section: Academic Info */}
              <motion.p custom={4} variants={fadeUp} className="text-xs font-bold text-gray-400 uppercase tracking-widest pt-3">
                Academic Information
              </motion.p>

              <motion.div custom={5} variants={fadeUp}>
                <InputField
                  id="college" label="College Name" value={form.college}
                  onChange={set('college')} icon={Building2} error={errors.college}
                />
              </motion.div>

              <motion.div custom={6} variants={fadeUp}>
                <SelectField
                  id="year" label="Studying Year" value={form.year}
                  onChange={(e) => { setForm((p) => ({ ...p, year: e.target.value })); setErrors((p) => ({ ...p, year: '' })) }}
                  icon={GraduationCap} error={errors.year}
                  options={STUDYING_YEARS}
                />
              </motion.div>

              {/* Section: Course Preferences */}
              <motion.p custom={7} variants={fadeUp} className="text-xs font-bold text-gray-400 uppercase tracking-widest pt-3">
                Course Preferences
              </motion.p>

              <motion.div custom={8} variants={fadeUp}>
                <CourseMultiSelect
                  selected={form.courses}
                  onChange={(val) => { setForm((p) => ({ ...p, courses: val })); setErrors((p) => ({ ...p, courses: '' })) }}
                  error={errors.courses}
                />
              </motion.div>

              {/* Section: Free Masterclass */}
              <motion.div custom={9} variants={fadeUp}>
                <div
                  className="rounded-2xl p-4 sm:p-5 mt-1"
                  style={{ background: 'linear-gradient(135deg, rgba(79,70,229,0.06), rgba(99,102,241,0.04))', border: '1.5px solid rgba(79,70,229,0.15)' }}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #4F46E5, #818cf8)' }}
                    >
                      <Sparkles size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 leading-snug">
                        Free Masterclass Invitation
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                        Are you interested in joining our <span className="font-semibold text-indigo-600">free masterclass</span> on{' '}
                        <span className="font-semibold">LinkedIn Profile Optimization</span> and{' '}
                        <span className="font-semibold">how to prepare an ATS-friendly Resume</span>?
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    {[
                      { value: true, label: 'Yes, I\'m interested!', emoji: '🙋' },
                      { value: false, label: 'No, maybe later', emoji: '🙅' },
                    ].map(({ value, label, emoji }) => {
                      const isActive = form.masterclass === value
                      return (
                        <motion.button
                          key={String(value)}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => { setForm((p) => ({ ...p, masterclass: value })); setErrors((p) => ({ ...p, masterclass: '' })) }}
                          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer border-2"
                          style={{
                            borderColor: isActive ? '#4F46E5' : '#e5e7eb',
                            background: isActive ? 'linear-gradient(135deg, #4F46E5, #6366f1)' : 'white',
                            color: isActive ? 'white' : '#6b7280',
                            boxShadow: isActive ? '0 4px 16px rgba(79,70,229,0.25)' : 'none',
                          }}
                        >
                          <span>{emoji}</span> {label}
                        </motion.button>
                      )
                    })}
                  </div>

                  <AnimatePresence>
                    {errors.masterclass && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="text-xs text-red-500 mt-2 ml-1"
                      >
                        {errors.masterclass}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Submit */}
              <motion.div custom={10} variants={fadeUp} className="pt-2">
                {errors.submit && (
                  <p className="text-xs text-red-500 text-center mb-3">{errors.submit}</p>
                )}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={!loading ? { scale: 1.02, y: -1 } : {}}
                  whileTap={!loading ? { scale: 0.97 } : {}}
                  className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl text-white font-bold text-sm cursor-pointer border-none disabled:opacity-70"
                  style={{
                    background: 'linear-gradient(135deg, #4F46E5, #6366f1)',
                    boxShadow: '0 8px 24px rgba(79,70,229,0.35)',
                  }}
                >
                  {loading
                    ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting…</>
                    : <> Submit & Enroll <ArrowRight size={16} /></>
                  }
                </motion.button>
              </motion.div>

            </motion.div>
          </form>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-xs text-gray-400 mt-6"
        >
          Your information is safe with us. We will never share your details.
        </motion.p>
      </div>
    </div>
  )
}
