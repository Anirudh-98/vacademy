import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Check, X, ArrowRight, Zap, Shield, Users,
  Star, ChevronDown, Sparkles,
} from 'lucide-react'
import Footer from '../components/Footer'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
}

const plans = [
  {
    id: 'free',
    name: 'Free',
    tagline: 'Perfect to get started',
    monthlyPrice: 0,
    yearlyPrice: 0,
    color: '#6b7280',
    bg: '#f9fafb',
    border: '#e5e7eb',
    cta: 'Get Started Free',
    ctaStyle: { background: '#f3f4f6', color: '#374151' },
    popular: false,
    features: [
      { text: 'Access to 50+ free courses', included: true },
      { text: 'Community forum access', included: true },
      { text: 'Course completion certificates', included: true },
      { text: 'Mobile app access', included: true },
      { text: 'Offline downloads', included: false },
      { text: 'Mentor support', included: false },
      { text: 'Live sessions & workshops', included: false },
      { text: 'Career placement support', included: false },
      { text: 'Team management', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'For serious learners',
    monthlyPrice: 1499,
    yearlyPrice: 999,
    color: '#4F46E5',
    bg: 'linear-gradient(145deg, #4F46E5, #7C3AED)',
    border: '#4F46E5',
    cta: 'Start Pro — Free 7 Days',
    ctaStyle: { background: 'white', color: '#4F46E5' },
    popular: true,
    features: [
      { text: 'Access to all 500+ courses', included: true },
      { text: 'Community forum access', included: true },
      { text: 'Course completion certificates', included: true },
      { text: 'Mobile app access', included: true },
      { text: 'Offline downloads', included: true },
      { text: 'Mentor support (2 sessions/mo)', included: true },
      { text: 'Live sessions & workshops', included: true },
      { text: 'Career placement support', included: true },
      { text: 'Team management', included: false },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'For teams & organisations',
    monthlyPrice: null,
    yearlyPrice: null,
    color: '#0891b2',
    bg: '#f0f9ff',
    border: '#bae6fd',
    cta: 'Contact Sales',
    ctaStyle: { background: 'linear-gradient(135deg, #0891b2, #0284c7)', color: 'white' },
    popular: false,
    features: [
      { text: 'Access to all 500+ courses', included: true },
      { text: 'Community forum access', included: true },
      { text: 'Course completion certificates', included: true },
      { text: 'Mobile app access', included: true },
      { text: 'Offline downloads', included: true },
      { text: 'Dedicated mentor support', included: true },
      { text: 'Live sessions & workshops', included: true },
      { text: 'Career placement support', included: true },
      { text: 'Team management dashboard', included: true },
    ],
  },
]

const faqs = [
  {
    q: 'Can I switch plans anytime?',
    a: 'Yes. You can upgrade, downgrade, or cancel your plan at any time from your account settings. If you downgrade, changes take effect at the end of your billing cycle.',
  },
  {
    q: 'Is there a free trial for the Pro plan?',
    a: 'Yes — the Pro plan comes with a 7-day free trial. No credit card required to start. You\'ll only be charged after the trial ends if you choose to continue.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit/debit cards, UPI, Net Banking, and wallets like Paytm and PhonePe. EMI options are available on select cards.',
  },
  {
    q: 'Do you offer student discounts?',
    a: 'Yes! Students with a valid college email (.edu or .ac.in) get an additional 20% off the Pro plan. Apply at checkout.',
  },
  {
    q: 'What is the refund policy?',
    a: 'We offer a 30-day money-back guarantee on all paid plans, no questions asked. Just reach out to our support team within 30 days of purchase.',
  },
  {
    q: 'How does the Enterprise plan work?',
    a: 'Enterprise plans are custom-priced based on team size and requirements. You get a dedicated account manager, custom onboarding, and monthly usage reports.',
  },
]

function FAQItem({ q, a, i }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      custom={i}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="border border-gray-100 rounded-2xl overflow-hidden"
      style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-6 py-5 text-left bg-white cursor-pointer border-none"
      >
        <span className="font-bold text-gray-900 text-sm pr-4">{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0 text-gray-400">
          <ChevronDown size={18} />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-4">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function PricingPage() {
  const [yearly, setYearly] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-white"
    >
      {/* Hero */}
      <div
        className="pt-36 pb-24 px-6 text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #3730a3 0%, #4F46E5 50%, #7C3AED 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute rounded-full pointer-events-none"
          style={{ width: 500, height: 500, background: 'rgba(255,255,255,0.06)', top: '-120px', right: '-80px' }} />

        <div className="relative z-10 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold text-white"
              style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.28)' }}>
              <Sparkles size={12} /> Simple, Transparent Pricing
            </span>
            <h1 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-tight">
              Invest In<br />Your Future
            </h1>
            <p className="text-white/70 max-w-md leading-relaxed">
              Choose the plan that fits your goals. Start free — upgrade anytime. No hidden fees, no surprises.
            </p>

            {/* Billing toggle */}
            <div
              className="flex items-center gap-3 px-5 py-2.5 rounded-full mt-2"
              style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}
            >
              <span className={`text-sm font-semibold transition-colors ${!yearly ? 'text-white' : 'text-white/50'}`}>Monthly</span>
              <button
                onClick={() => setYearly((y) => !y)}
                className="relative w-12 h-6 rounded-full cursor-pointer border-none transition-colors duration-200 flex-shrink-0"
                style={{ background: yearly ? 'white' : 'rgba(255,255,255,0.3)' }}
              >
                <motion.div
                  animate={{ x: yearly ? 24 : 2 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="absolute top-1 w-4 h-4 rounded-full"
                  style={{ background: yearly ? '#4F46E5' : 'white' }}
                />
              </button>
              <span className={`text-sm font-semibold transition-colors ${yearly ? 'text-white' : 'text-white/50'}`}>
                Yearly
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(251,191,36,0.25)', color: '#fde68a' }}>
                Save 33%
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Pricing cards */}
      <div className="max-w-6xl mx-auto px-6 -mt-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: plan.popular ? -4 : -2 }}
              className="rounded-3xl overflow-hidden relative"
              style={{
                boxShadow: plan.popular
                  ? '0 24px 64px rgba(79,70,229,0.3)'
                  : '0 4px 24px rgba(0,0,0,0.07)',
                border: `2px solid ${plan.border}`,
                marginTop: plan.popular ? '-16px' : '0',
              }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div
                  className="text-center py-2.5 text-xs font-black text-white tracking-widest uppercase flex items-center justify-center gap-1.5"
                  style={{ background: plan.bg }}
                >
                  <Star size={11} fill="white" /> Most Popular
                </div>
              )}

              {/* Card body */}
              <div
                className="p-7"
                style={{
                  background: plan.popular ? plan.bg : plan.bg,
                }}
              >
                {/* Header */}
                <div className="mb-6">
                  <p className={`text-sm font-bold mb-1 ${plan.popular ? 'text-white/70' : 'text-gray-500'}`}>
                    {plan.name}
                  </p>
                  <p className={`text-xs mb-4 ${plan.popular ? 'text-white/60' : 'text-gray-400'}`}>
                    {plan.tagline}
                  </p>

                  {plan.monthlyPrice === null ? (
                    <div>
                      <p className={`text-4xl font-black ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                        Custom
                      </p>
                      <p className={`text-xs mt-1 ${plan.popular ? 'text-white/60' : 'text-gray-400'}`}>
                        Tailored to your team
                      </p>
                    </div>
                  ) : plan.monthlyPrice === 0 ? (
                    <div>
                      <p className={`text-4xl font-black ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                        Free
                      </p>
                      <p className={`text-xs mt-1 ${plan.popular ? 'text-white/60' : 'text-gray-400'}`}>
                        Forever
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-end gap-1">
                        <span className={`text-lg font-bold ${plan.popular ? 'text-white/80' : 'text-gray-500'}`}>₹</span>
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={yearly ? 'yearly' : 'monthly'}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className={`text-4xl font-black leading-none ${plan.popular ? 'text-white' : 'text-gray-900'}`}
                          >
                            {yearly ? plan.yearlyPrice.toLocaleString('en-IN') : plan.monthlyPrice.toLocaleString('en-IN')}
                          </motion.span>
                        </AnimatePresence>
                        <span className={`text-sm mb-1 ${plan.popular ? 'text-white/60' : 'text-gray-400'}`}>/mo</span>
                      </div>
                      {yearly && (
                        <p className={`text-xs mt-1 ${plan.popular ? 'text-white/60' : 'text-gray-400'}`}>
                          Billed ₹{(plan.yearlyPrice * 12).toLocaleString('en-IN')}/year
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* CTA */}
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="mb-6">
                  <Link
                    to="/register"
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-bold text-sm no-underline"
                    style={{ ...plan.ctaStyle, boxShadow: plan.popular ? '0 8px 20px rgba(0,0,0,0.2)' : 'none' }}
                  >
                    {plan.cta} <ArrowRight size={14} />
                  </Link>
                </motion.div>

                {/* Divider */}
                <div className={`h-px mb-5 ${plan.popular ? 'bg-white/20' : 'bg-gray-100'}`} />

                {/* Features */}
                <ul className="flex flex-col gap-3">
                  {plan.features.map(({ text, included }) => (
                    <li key={text} className="flex items-center gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          background: included
                            ? plan.popular ? 'rgba(255,255,255,0.2)' : 'rgba(79,70,229,0.1)'
                            : 'transparent',
                        }}
                      >
                        {included
                          ? <Check size={11} style={{ color: plan.popular ? 'white' : '#4F46E5' }} strokeWidth={3} />
                          : <X size={11} style={{ color: plan.popular ? 'rgba(255,255,255,0.3)' : '#d1d5db' }} strokeWidth={2.5} />
                        }
                      </div>
                      <span
                        className="text-sm"
                        style={{
                          color: included
                            ? plan.popular ? 'rgba(255,255,255,0.9)' : '#374151'
                            : plan.popular ? 'rgba(255,255,255,0.35)' : '#d1d5db',
                        }}
                      >
                        {text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust row */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 mt-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {[
            { icon: Shield, text: '30-day money-back guarantee' },
            { icon: Zap,    text: 'Cancel anytime, no lock-in' },
            { icon: Users,  text: '1,20,000+ happy learners' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-sm text-gray-500">
              <Icon size={15} className="text-indigo-400" />
              {text}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Compare table */}
      <div className="px-6 py-16" style={{ background: '#F9FAFB' }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-bold text-[#6D28D9] uppercase tracking-widest">Compare</span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-2">Everything you get</h2>
          </motion.div>

          <motion.div
            className="rounded-3xl overflow-hidden border border-gray-200 bg-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
          >
            {/* Header */}
            <div className="grid grid-cols-4 border-b border-gray-100">
              <div className="p-5 text-sm font-bold text-gray-500">Feature</div>
              {['Free', 'Pro', 'Enterprise'].map((p) => (
                <div key={p} className="p-5 text-sm font-extrabold text-center"
                  style={{ color: p === 'Pro' ? '#4F46E5' : '#374151' }}>
                  {p}
                </div>
              ))}
            </div>
            {[
              ['Course access',          '50 free',    'All 500+',   'All 500+'],
              ['Certificates',           true,          true,          true],
              ['Mobile app',             true,          true,          true],
              ['Offline downloads',      false,         true,          true],
              ['Mentor sessions',        false,         '2 / month',  'Unlimited'],
              ['Live workshops',         false,         true,          true],
              ['Placement support',      false,         true,          true],
              ['Team dashboard',         false,         false,         true],
              ['Dedicated manager',      false,         false,         true],
            ].map(([feature, free, pro, ent], i) => (
              <div key={feature} className={`grid grid-cols-4 ${i % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}`}>
                <div className="p-4 text-sm text-gray-600 font-medium">{feature}</div>
                {[free, pro, ent].map((val, j) => (
                  <div key={j} className="p-4 flex items-center justify-center">
                    {typeof val === 'boolean' ? (
                      val
                        ? <Check size={16} className="text-indigo-500" strokeWidth={3} />
                        : <X size={15} className="text-gray-300" strokeWidth={2.5} />
                    ) : (
                      <span className="text-xs font-semibold text-gray-700">{val}</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-20">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-xs font-bold text-[#6D28D9] uppercase tracking-widest">FAQ</span>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-2">Frequently asked questions</h2>
        </motion.div>
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => <FAQItem key={faq.q} {...faq} i={i} />)}
        </div>
      </div>

      {/* Bottom CTA */}
      <div
        className="py-20 px-6 text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)' }}
      >
        <div className="absolute rounded-full pointer-events-none"
          style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
        <motion.div
          className="relative z-10 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase mb-4">
            Still not sure?
          </h2>
          <p className="text-white/70 mb-8 leading-relaxed">
            Start for free — no credit card needed. Upgrade when you're ready. Every plan comes with a 30-day money-back guarantee.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm no-underline"
                style={{ background: 'white', color: '#4F46E5', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
              >
                Try Free — No Card Needed <ArrowRight size={15} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <a
                href="mailto:sales@viscanolearn.in"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm no-underline border"
                style={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)' }}
              >
                Talk to Sales
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </motion.div>
  )
}
