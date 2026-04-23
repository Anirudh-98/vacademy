import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Briefcase, Zap, Users, Code2 } from 'lucide-react'

const highlights = [
  { icon: Code2,         text: 'Work on real client projects' },
  { icon: Zap,           text: 'Live coding sessions — not recordings' },
  { icon: Users,         text: 'Collaborate with actual dev teams' },
  { icon: CheckCircle2,  text: 'Build a portfolio of shipped work' },
]

const fadeLeft  = { hidden: { opacity: 0, x: -36 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }
const fadeRight = { hidden: { opacity: 0, x:  36 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }
const fadeUp    = (i = 0) => ({ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' } } })

export default function InternshipBanner() {
  return (
    <section className="py-24 px-6 overflow-hidden" style={{ background: '#F9FAFB' }}>
      <div className="max-w-6xl mx-auto">

        <div
          className="relative rounded-3xl overflow-hidden flex flex-col lg:flex-row"
          style={{ background: 'linear-gradient(135deg, #312e81 0%, #4F46E5 50%, #7C3AED 100%)' }}
        >
          {/* grid overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)`,
            backgroundSize: '44px 44px',
          }} />
          {/* blobs */}
          <div className="absolute pointer-events-none rounded-full"
            style={{ width: 440, height: 440, background: 'rgba(255,255,255,0.05)', top: '-120px', right: '-80px' }} />
          <div className="absolute pointer-events-none rounded-full"
            style={{ width: 260, height: 260, background: 'rgba(255,255,255,0.04)', bottom: '-80px', left: '-40px' }} />

          {/* ── Left: copy ── */}
          <motion.div
            className="relative z-10 flex flex-col gap-6 p-10 lg:p-14 lg:w-1/2"
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <span
              className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full text-xs font-bold"
              style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.28)', color: '#fff' }}
            >
              <Briefcase size={11} /> Viscano Internship Program
            </span>

            <div className="flex flex-col gap-3">
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-tight">
                Work on Real Projects.{' '}
                <span style={{
                  background: 'linear-gradient(90deg, #fde68a, #fbbf24)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  Not Practice Ones.
                </span>
              </h2>
              <p className="text-white/70 text-base leading-relaxed max-w-md">
                Join the Viscano Internship Program — gain hands-on experience working on live client projects
                alongside real developers, in a real working environment.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/internship"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm no-underline"
                  style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', color: '#1c1917' }}
                >
                  Explore the Program <ArrowRight size={15} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm no-underline text-white"
                  style={{ border: '1.5px solid rgba(255,255,255,0.35)', background: 'rgba(255,255,255,0.1)' }}
                >
                  Talk to Us
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* ── Right: highlight cards ── */}
          <motion.div
            className="relative z-10 flex flex-col justify-center gap-4 p-10 lg:p-14 lg:w-1/2"
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-1">
              What you'll actually do
            </p>
            {highlights.map(({ icon: Icon, text }, i) => (
              <motion.div
                key={text}
                variants={fadeUp(i)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex items-center gap-4 rounded-2xl px-5 py-4"
                style={{
                  background: 'rgba(255,255,255,0.10)',
                  border: '1px solid rgba(255,255,255,0.16)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(255,255,255,0.18)' }}
                >
                  <Icon size={18} className="text-white" />
                </div>
                <p className="text-white font-semibold text-sm">{text}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
