import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { UserPlus, BookOpen, Award } from 'lucide-react'

const steps = [
  { icon: UserPlus, num: '01', title: 'Sign Up Free', desc: 'Create your account in seconds. No credit card required. Start exploring immediately.' },
  { icon: BookOpen, num: '02', title: 'Pick a Course', desc: 'Browse 200+ expert-led courses. Filter by skill level, duration, or career goal.' },
  { icon: Award, num: '03', title: 'Get Certified', desc: 'Complete the course, pass the assessment, and earn a verified certificate employers love.' },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end center'] })
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section ref={ref} className="py-24 px-6 bg-white relative overflow-hidden">
      {/* BG decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-bold text-[#6D28D9] uppercase tracking-widest">Process</span>
          <h2 className="text-4xl font-extrabold text-[#111827] mt-3 tracking-tight">
            How Viscano Learn works
          </h2>
          <p className="text-gray-500 mt-3 max-w-sm mx-auto">Three simple steps to transform your career.</p>
        </motion.div>

        <div className="relative">
          {/* SVG connecting path */}
          <svg
            className="absolute top-12 left-0 right-0 mx-auto hidden md:block"
            width="80%" height="40"
            viewBox="0 0 800 40"
            style={{ left: '10%' }}
          >
            <path
              d="M 0 20 Q 200 0 400 20 Q 600 40 800 20"
              stroke="#E9D5FF"
              strokeWidth="2"
              fill="none"
              strokeDasharray="6 4"
            />
            <motion.path
              d="M 0 20 Q 200 0 400 20 Q 600 40 800 20"
              stroke="#6D28D9"
              strokeWidth="2.5"
              fill="none"
              style={{ pathLength }}
              strokeLinecap="round"
            />
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
            {steps.map(({ icon: Icon, num, title, desc }, i) => (
              <motion.div
                key={num}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <motion.div
                  className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-[#6D28D9] to-[#9333EA] flex items-center justify-center shadow-xl shadow-purple-200 mb-6"
                  whileHover={{ scale: 1.1, rotate: -3 }}
                >
                  <Icon size={32} className="text-white" />
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white border-2 border-purple-200 text-[#6D28D9] text-xs font-black flex items-center justify-center shadow-sm">
                    {i + 1}
                  </span>
                </motion.div>
                <h3 className="text-xl font-extrabold text-[#111827] mb-3">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
