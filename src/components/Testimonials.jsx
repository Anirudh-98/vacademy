import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    name: 'Aisha Patel',
    role: 'Frontend Dev @ Google',
    text: "Viscano Learn completely changed my career. The React course was the most comprehensive I've ever taken. Got hired within 2 months!",
    avatar: 'AP',
    rating: 5,
  },
  {
    name: 'Marcus Lee',
    role: 'ML Engineer @ Meta',
    text: 'The Python for AI course is incredible. Instructors are world-class, content is up-to-date, and the community is super supportive.',
    avatar: 'ML',
    rating: 5,
  },
  {
    name: 'Sofia Rossi',
    role: 'UX Designer @ Airbnb',
    text: "I went from zero design knowledge to landing my dream job. The UI/UX course is the best investment I've ever made.",
    avatar: 'SR',
    rating: 5,
  },
  {
    name: 'James Kim',
    role: 'DevOps @ Amazon',
    text: 'The AWS course prepared me perfectly for the certification exam. Passed on my first try! The practice labs are fantastic.',
    avatar: 'JK',
    rating: 5,
  },
  {
    name: 'Nina Brown',
    role: 'Data Scientist @ Netflix',
    text: 'World-class content, engaging instructors, and real projects that you can add to your portfolio. Absolutely worth every penny.',
    avatar: 'NB',
    rating: 5,
  },
]

const variants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80, scale: 0.95 }),
  center: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -80 : 80, scale: 0.95, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }),
}

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)

  const go = (d) => {
    setDir(d)
    setIndex((i) => (i + d + testimonials.length) % testimonials.length)
  }

  const t = testimonials[index]

  return (
    <section className="py-24 px-6 bg-[#F9FAFB] overflow-hidden">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-bold text-[#6D28D9] uppercase tracking-widest">Testimonials</span>
          <h2 className="text-4xl font-extrabold text-[#111827] mt-3 tracking-tight">
            Students love Viscano Learn
          </h2>
        </motion.div>

        {/* Card */}
        <div className="relative" style={{ minHeight: '220px' }}>
          <AnimatePresence custom={dir} mode="wait">
            <motion.div
              key={index}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="bg-white rounded-3xl p-8 md:p-10 border border-purple-50 shadow-sm"
              style={{ boxShadow: '0 8px 40px rgba(109,40,217,0.08)' }}
            >
              <Quote size={32} className="text-purple-200 mb-5" fill="#EDE9FE" />
              <p className="text-gray-600 text-base leading-relaxed mb-8">{t.text}</p>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#6D28D9] to-[#9333EA] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#111827]">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
                <div className="ml-auto text-yellow-400 text-sm font-bold tracking-wide">
                  {'★'.repeat(t.rating)}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-5 mt-8">
          <motion.button
            onClick={() => go(-1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-11 h-11 rounded-full flex items-center justify-center cursor-pointer border-2 bg-white"
            style={{ borderColor: '#e9d5ff', color: '#6D28D9' }}
          >
            <ChevronLeft size={18} />
          </motion.button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDir(i > index ? 1 : -1); setIndex(i) }}
                className="rounded-full border-none cursor-pointer p-0 transition-all duration-300"
                style={{
                  width: i === index ? '24px' : '8px',
                  height: '8px',
                  background: i === index ? '#6D28D9' : '#ddd6fe',
                }}
              />
            ))}
          </div>

          <motion.button
            onClick={() => go(1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-11 h-11 rounded-full flex items-center justify-center cursor-pointer border-2 bg-white"
            style={{ borderColor: '#e9d5ff', color: '#6D28D9' }}
          >
            <ChevronRight size={18} />
          </motion.button>
        </div>

        {/* Counter */}
        <p className="text-center text-xs text-gray-400 mt-4 font-medium">
          {index + 1} / {testimonials.length}
        </p>

      </div>
    </section>
  )
}
