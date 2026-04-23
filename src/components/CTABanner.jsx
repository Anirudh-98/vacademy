import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Shield, Clock } from 'lucide-react'

const perks = [
  { icon: Zap,    text: 'Instant access to all courses' },
  { icon: Shield, text: '30-day money-back guarantee'   },
  { icon: Clock,  text: 'Learn at your own pace'        },
]

export default function CTABanner() {
  return (
    <section className="py-24 px-6 overflow-hidden" style={{ background: '#0f0d1a' }}>
      <div className="max-w-6xl mx-auto relative">

        {/* Background glows */}
        <div className="absolute pointer-events-none"
          style={{ width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(109,40,217,0.35) 0%, transparent 70%)', top: '50%', left: '20%', transform: 'translate(-50%,-50%)' }} />
        <div className="absolute pointer-events-none"
          style={{ width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)', top: '50%', right: '10%', transform: 'translateY(-50%)' }} />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* Left */}
          <motion.div
            className="flex flex-col gap-6 max-w-lg"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-5"
                style={{ background: 'rgba(109,40,217,0.3)', color: '#c4b5fd', border: '1px solid rgba(109,40,217,0.4)' }}
              >
                <Zap size={12} /> Limited Time Offer
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight uppercase tracking-tight">
                Start Learning<br />
                <span style={{ background: 'linear-gradient(90deg, #a78bfa, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  For Free Today
                </span>
              </h2>
              <p className="text-gray-400 mt-4 leading-relaxed">
                Join over 1,20,000 learners already building their future on Viscano Learn.
                Get unlimited access to 500+ courses with a free account.
              </p>
            </div>

            {/* Perks */}
            <div className="flex flex-col gap-3">
              {perks.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(109,40,217,0.3)' }}
                  >
                    <Icon size={14} style={{ color: '#a78bfa' }} />
                  </div>
                  <span className="text-sm text-gray-300">{text}</span>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-white font-bold text-sm no-underline"
                  style={{ background: 'linear-gradient(135deg, #6D28D9, #4F46E5)', boxShadow: '0 8px 32px rgba(109,40,217,0.45)' }}
                >
                  Create Free Account <ArrowRight size={16} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm no-underline border"
                  style={{ color: '#c4b5fd', borderColor: 'rgba(109,40,217,0.5)', background: 'rgba(109,40,217,0.1)' }}
                >
                  Browse Courses
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Right — floating card stack */}
          <motion.div
            className="relative flex-shrink-0 w-full max-w-sm"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Card 1 — back */}
            <div
              className="absolute rounded-2xl w-full"
              style={{
                height: '180px',
                background: 'rgba(109,40,217,0.25)',
                border: '1px solid rgba(109,40,217,0.3)',
                top: '-16px',
                left: '16px',
                transform: 'rotate(3deg)',
              }}
            />
            {/* Card 2 — middle */}
            <div
              className="absolute rounded-2xl w-full"
              style={{
                height: '180px',
                background: 'rgba(99,102,241,0.3)',
                border: '1px solid rgba(99,102,241,0.4)',
                top: '-8px',
                left: '8px',
                transform: 'rotate(1.5deg)',
              }}
            />
            {/* Card 3 — front */}
            <div
              className="relative rounded-2xl p-6 flex flex-col gap-5"
              style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-white text-lg"
                  style={{ background: 'linear-gradient(135deg, #6D28D9, #4F46E5)' }}
                >
                  V
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Viscano Learn Pro</p>
                  <p className="text-gray-400 text-xs">Full access unlocked</p>
                </div>
                <span
                  className="ml-auto text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(16,185,129,0.2)', color: '#34d399' }}
                >
                  Free
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {['React & Next.js', 'Python for AI', 'AWS Cloud', 'UI/UX Design'].map((course, i) => (
                  <div key={course} className="flex items-center gap-3">
                    <div
                      className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(109,40,217,0.4)' }}
                    >
                      <span className="text-[10px] text-purple-300 font-bold">{i + 1}</span>
                    </div>
                    <span className="text-gray-300 text-xs">{course}</span>
                    <div className="ml-auto flex gap-px">
                      {[...Array(5)].map((_, s) => (
                        <div key={s} className="w-1.5 h-1.5 rounded-full"
                          style={{ background: s < 4 ? '#6D28D9' : 'rgba(255,255,255,0.1)' }} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                <div className="flex -space-x-2">
                  {[
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&q=80',
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&q=80',
                    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&q=80',
                  ].map((src, i) => (
                    <img key={i} src={src} alt="" className="w-7 h-7 rounded-full object-cover border-2"
                      style={{ borderColor: '#0f0d1a' }} />
                  ))}
                </div>
                <p className="text-gray-400 text-xs">+1,200 enrolled this week</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
