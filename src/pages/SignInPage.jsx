import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, ArrowRight,
  GraduationCap, Sparkles, BookOpen, Trophy, Users, CheckCircle2,
} from 'lucide-react'
import { auth, googleProvider } from '../lib/firebase'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import TestimonialCarousel from '../components/TestimonialCarousel'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] },
  }),
}

const features = [
  { icon: BookOpen, text: '15,000+ courses across all domains' },
  { icon: Trophy,   text: 'Industry-recognized certificates' },
  { icon: Users,    text: 'Join 1,20,000+ learners worldwide' },
]

function FloatingLabel({ id, label, type = 'text', value, onChange, icon: Icon, error, rightSlot }) {
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
            className="absolute bottom-0 left-0 right-0 bg-transparent outline-none text-sm text-gray-800"
            style={{ top: '28px', paddingBottom: '10px' }}
            autoComplete="off"
          />
        </div>
        {rightSlot && (
          <div className="flex items-center justify-center flex-shrink-0" style={{ width: '44px' }}>
            {rightSlot}
          </div>
        )}
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

export default function SignInPage() {
  const [form, setForm]         = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [errors, setErrors]     = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [remember, setRemember] = useState(false)
  const [loading, setLoading]   = useState(false)

  const set = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email    = 'Enter a valid email'
    if (form.password.length < 1)         e.password = 'Password is required'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password)
      setSubmitted(true)
    } catch (err) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setErrors({ email: 'Invalid email or password' })
      } else {
        setErrors({ email: 'An error occurred. Please try again.' })
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    try {
      await signInWithPopup(auth, googleProvider)
      setSubmitted(true)
    } catch (err) {
      setErrors({ email: 'Google sign-in failed. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: 'linear-gradient(135deg, #5b6ef5 0%, #7b8ff7 40%, #c5d4ff 100%)' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-3xl p-10 text-center max-w-md w-full"
          style={{ boxShadow: '0 32px 80px rgba(79,70,229,0.2)' }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: 'linear-gradient(135deg, #4F46E5, #818cf8)' }}
          >
            <CheckCircle2 size={36} className="text-white" />
          </motion.div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Welcome back!</h2>
          <p className="text-gray-500 text-sm mb-8">
            You've signed in successfully. Let's pick up where you left off.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-white font-bold text-sm no-underline"
            style={{ background: 'linear-gradient(135deg, #4F46E5, #6366f1)', boxShadow: '0 8px 24px rgba(79,70,229,0.35)' }}
          >
            Go to Dashboard <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">

      {/* ── Left panel ── */}
      <div
        className="hidden lg:flex flex-col justify-between w-[46%] relative overflow-hidden px-14 py-12"
        style={{ background: 'linear-gradient(145deg, #3730a3 0%, #4F46E5 45%, #818cf8 100%)' }}
      >
        {/* Grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />

        {/* Blobs */}
        <div className="absolute pointer-events-none"
          style={{ width: 420, height: 420, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', top: '-80px', right: '-100px' }} />
        <div className="absolute pointer-events-none"
          style={{ width: 260, height: 260, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', bottom: '60px', left: '-60px' }} />

        {/* Logo */}
        <motion.div
          className="relative z-10 flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center font-black text-white border border-white/30 text-base">
            V
          </div>
          <span style={{ fontFamily: 'var(--font-logo)', fontWeight: 800, fontSize: '1.15rem', letterSpacing: '-0.02em', lineHeight: 1 }}>Viscano<span style={{ opacity: 0.75 }}>Learn</span></span>
        </motion.div>

        {/* Center content */}
        <motion.div
          className="relative z-10 flex flex-col gap-8"
          initial="hidden" animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div variants={fadeUp}>
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-white mb-5"
              style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.28)' }}
            >
              <Sparkles size={12} /> Good to have you back
            </span>
            <h2 className="text-4xl xl:text-5xl font-black text-white leading-tight uppercase">
              Continue<br />Your Journey
            </h2>
            <p className="text-white/70 text-sm mt-4 leading-relaxed max-w-xs">
              Sign in to access your courses, track your progress, and pick up right where you left off.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            {features.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}
                >
                  <Icon size={16} className="text-white" />
                </div>
                <span className="text-white/85 text-sm font-medium">{text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Testimonial carousel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <TestimonialCarousel />
        </motion.div>
      </div>

      {/* ── Right panel ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white overflow-y-auto">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8 no-underline">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-sm"
              style={{ background: 'linear-gradient(135deg, #4F46E5, #818cf8)' }}>
              V
            </div>
            <span style={{ fontFamily: 'var(--font-logo)', fontWeight: 800, fontSize: '1.15rem', letterSpacing: '-0.02em', color: '#1a1a2e', lineHeight: 1 }}>Viscano<span style={{ background: 'linear-gradient(135deg, #4F46E5, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Learn</span></span>
          </Link>

          <motion.div
            initial="hidden" animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            <motion.div custom={0} variants={fadeUp} className="mb-8">
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4"
                style={{ background: 'rgba(79,70,229,0.08)', color: '#4F46E5' }}
              >
                <GraduationCap size={12} /> Welcome back to Viscano Learn
              </div>
              <h1 className="text-3xl font-black text-gray-900 mb-1.5">Sign in to your account</h1>
              <p className="text-gray-400 text-sm">
                Don't have an account?{' '}
                <Link to="/register" className="text-indigo-600 font-semibold hover:underline">
                  Create one free
                </Link>
              </p>
            </motion.div>

            {/* Social buttons */}
            <motion.div custom={1} variants={fadeUp} className="mb-6">
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2.5 py-3 rounded-2xl text-sm font-semibold text-gray-700 border border-gray-200 bg-white cursor-pointer transition-shadow hover:shadow-md disabled:opacity-60"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-4 h-4 object-contain" />
                Continue with Google
              </motion.button>
            </motion.div>

            {/* Divider */}
            <motion.div custom={2} variants={fadeUp} className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-400 font-medium">or sign in with email</span>
              <div className="flex-1 h-px bg-gray-100" />
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate>
              <motion.div custom={3} variants={fadeUp} className="mb-4">
                <FloatingLabel
                  id="email" label="Email Address" type="email" value={form.email}
                  onChange={(e) => { set('email')(e); setErrors((p) => ({ ...p, email: '' })) }}
                  icon={Mail} error={errors.email}
                />
              </motion.div>

              <motion.div custom={4} variants={fadeUp} className="mb-2">
                <FloatingLabel
                  id="password" label="Password" type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => { set('password')(e); setErrors((p) => ({ ...p, password: '' })) }}
                  icon={Lock} error={errors.password}
                  rightSlot={
                    <button type="button" onClick={() => setShowPass((s) => !s)}
                      className="text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer p-0">
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  }
                />
              </motion.div>

              {/* Remember + Forgot */}
              <motion.div custom={5} variants={fadeUp} className="flex items-center justify-between mb-6 mt-3">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <div
                    onClick={() => setRemember((r) => !r)}
                    className="w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200 cursor-pointer"
                    style={{
                      borderColor: remember ? '#4F46E5' : '#d1d5db',
                      background: remember ? '#4F46E5' : 'white',
                    }}
                  >
                    <AnimatePresence>
                      {remember && (
                        <motion.svg
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          width="11" height="9" viewBox="0 0 11 9" fill="none"
                        >
                          <motion.path
                            d="M1 4.5L4 7.5L10 1.5"
                            stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                            transition={{ duration: 0.2 }}
                          />
                        </motion.svg>
                      )}
                    </AnimatePresence>
                  </div>
                  <span className="text-xs text-gray-500 font-medium">Remember me</span>
                </label>
                <Link to="#" className="text-xs text-indigo-600 font-semibold hover:underline">
                  Forgot password?
                </Link>
              </motion.div>

              {/* Submit */}
              <motion.div custom={6} variants={fadeUp}>
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
                  {loading ? 'Signing in…' : <> Sign In <ArrowRight size={16} /> </>}
                </motion.button>
              </motion.div>

              {/* Register CTA */}
              <motion.p custom={7} variants={fadeUp} className="text-center text-xs text-gray-400 mt-6">
                New to Viscano Learn?{' '}
                <Link to="/register" className="text-indigo-600 font-semibold hover:underline">
                  Create a free account
                </Link>
              </motion.p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
