import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User, Mail, Lock, Eye, EyeOff, ArrowRight,
  GraduationCap, CheckCircle2, Sparkles, BookOpen, Trophy, Users,
} from 'lucide-react'
import { auth, googleProvider } from '../lib/firebase'
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from 'firebase/auth'
import { updateUserProfile } from '../lib/userService'
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

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [showPass, setShowPass]       = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [agreed, setAgreed]           = useState(false)
  const [errors, setErrors]           = useState({})
  const [submitted, setSubmitted]     = useState(false)
  const [loading, setLoading]         = useState(false)

  const set = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.name.trim())              e.name    = 'Full name is required'
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (form.password.length < 8)       e.password = 'Minimum 8 characters'
    if (form.password !== form.confirm) e.confirm  = 'Passwords do not match'
    if (!agreed)                        e.agreed   = 'You must accept the terms'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password)
      await updateProfile(userCredential.user, { displayName: form.name })
      await updateUserProfile(userCredential.user.uid, { displayName: form.name })
      setSubmitted(true)
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setErrors({ email: 'Email already in use' })
      } else if (err.code === 'auth/invalid-email') {
        setErrors({ email: 'Invalid email address' })
      } else if (err.code === 'auth/weak-password') {
        setErrors({ password: 'Password is too weak' })
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
      setErrors({ email: 'Google registration failed. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const strength = (() => {
    const p = form.password
    if (!p) return 0
    let s = 0
    if (p.length >= 8)          s++
    if (/[A-Z]/.test(p))        s++
    if (/[0-9]/.test(p))        s++
    if (/[^A-Za-z0-9]/.test(p)) s++
    return s
  })()

  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength]
  const strengthColor = ['', '#ef4444', '#f59e0b', '#3b82f6', '#22c55e'][strength]

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
          <h2 className="text-2xl font-black text-gray-900 mb-2">You're in!</h2>
          <p className="text-gray-500 text-sm mb-8">
            Welcome to Viscano Learn, <span className="font-semibold text-gray-700">{form.name.split(' ')[0]}</span>!
            Your account has been created successfully.
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

        {/* Decorative blobs */}
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
              <Sparkles size={12} /> Start Learning Today
            </span>
            <h2 className="text-4xl xl:text-5xl font-black text-white leading-tight uppercase">
              Unlock Your<br />Full Potential
            </h2>
            <p className="text-white/70 text-sm mt-4 leading-relaxed max-w-xs">
              Join thousands of learners who transformed their careers with Viscano Learn's expert-led programs.
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
                <GraduationCap size={12} /> Free forever — no credit card needed
              </div>
              <h1 className="text-3xl font-black text-gray-900 mb-1.5">Create your account</h1>
              <p className="text-gray-400 text-sm">
                Already have an account?{' '}
                <Link to="/signin" className="text-indigo-600 font-semibold hover:underline">Sign in</Link>
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
              <span className="text-xs text-gray-400 font-medium">or register with email</span>
              <div className="flex-1 h-px bg-gray-100" />
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate>
              <motion.div custom={3} variants={fadeUp} className="mb-4">
                <FloatingLabel
                  id="name" label="Full Name" value={form.name}
                  onChange={(e) => { set('name')(e); setErrors((p) => ({ ...p, name: '' })) }}
                  icon={User} error={errors.name}
                />
              </motion.div>

              <motion.div custom={4} variants={fadeUp} className="mb-4">
                <FloatingLabel
                  id="email" label="Email Address" type="email" value={form.email}
                  onChange={(e) => { set('email')(e); setErrors((p) => ({ ...p, email: '' })) }}
                  icon={Mail} error={errors.email}
                />
              </motion.div>

              <motion.div custom={5} variants={fadeUp} className="mb-2">
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

              {/* Password strength */}
              <AnimatePresence>
                {form.password && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4 px-1"
                  >
                    <div className="flex gap-1 mt-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="flex-1 h-1 rounded-full transition-all duration-300"
                          style={{ background: i <= strength ? strengthColor : '#e5e7eb' }}
                        />
                      ))}
                    </div>
                    <p className="text-xs mt-1 font-medium" style={{ color: strengthColor }}>
                      {strengthLabel}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div custom={6} variants={fadeUp} className="mb-5">
                <FloatingLabel
                  id="confirm" label="Confirm Password" type={showConfirm ? 'text' : 'password'}
                  value={form.confirm}
                  onChange={(e) => { set('confirm')(e); setErrors((p) => ({ ...p, confirm: '' })) }}
                  icon={Lock} error={errors.confirm}
                  rightSlot={
                    <button type="button" onClick={() => setShowConfirm((s) => !s)}
                      className="text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer p-0">
                      {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  }
                />
              </motion.div>

              {/* Terms */}
              <motion.div custom={7} variants={fadeUp} className="mb-6">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <div
                    onClick={() => { setAgreed((a) => !a); setErrors((p) => ({ ...p, agreed: '' })) }}
                    className="mt-0.5 w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200 cursor-pointer"
                    style={{
                      borderColor: errors.agreed ? '#ef4444' : agreed ? '#4F46E5' : '#d1d5db',
                      background: agreed ? '#4F46E5' : 'white',
                    }}
                  >
                    <AnimatePresence>
                      {agreed && (
                        <motion.svg
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          exit={{ pathLength: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
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
                  <span className="text-xs text-gray-500 leading-relaxed">
                    I agree to the{' '}
                    <Link to="#" className="text-indigo-600 font-semibold hover:underline">Terms of Service</Link>
                    {' '}and{' '}
                    <Link to="#" className="text-indigo-600 font-semibold hover:underline">Privacy Policy</Link>
                  </span>
                </label>
                {errors.agreed && (
                  <p className="text-xs text-red-500 mt-1 ml-8">{errors.agreed}</p>
                )}
              </motion.div>

              {/* Submit */}
              <motion.div custom={8} variants={fadeUp}>
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
                  {loading ? 'Creating account…' : <> Create Account <ArrowRight size={16} /> </>}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
