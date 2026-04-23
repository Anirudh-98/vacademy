import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    text: '"Viscano Learn helped me land my first dev job in 4 months. The quality of content is unmatched."',
    name: 'Rohan Verma',
    role: 'Frontend Developer · Pune',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&q=80',
  },
  {
    text: '"I log in every day. The learning paths are so well structured — I went from zero to employed in 5 months."',
    name: 'Sneha Kapoor',
    role: 'Data Analyst · Bengaluru',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&q=80',
  },
  {
    text: '"The UI/UX course completely changed how I think about design. Worth every rupee and more."',
    name: 'Aryan Mehta',
    role: 'Product Designer · Mumbai',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&q=80',
  },
  {
    text: '"Got my AWS certification on the first try. The structured breakdown and mock tests are excellent."',
    name: 'Divya Nair',
    role: 'Cloud Engineer · Hyderabad',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&q=80',
  },
]

const variants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }),
}

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0)
  const [dir, setDir]     = useState(1)

  const go = (d) => {
    setDir(d)
    setIndex((i) => (i + d + testimonials.length) % testimonials.length)
  }

  const t = testimonials[index]

  return (
    <div className="relative z-10 flex flex-col items-center gap-5">
      {/* Card */}
      <div className="relative w-full overflow-hidden" style={{ minHeight: '148px' }}>
        <AnimatePresence custom={dir} mode="wait">
          <motion.div
            key={index}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="rounded-2xl p-5 w-full"
            style={{
              background: 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <p className="text-white/90 text-sm leading-relaxed mb-4">{t.text}</p>
            <div className="flex items-center gap-3">
              <img
                src={t.avatar}
                alt=""
                className="w-9 h-9 rounded-full object-cover border-2"
                style={{ borderColor: 'rgba(255,255,255,0.4)' }}
              />
              <div>
                <p className="text-white text-sm font-semibold">{t.name}</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>{t.role}</p>
              </div>
              <div className="ml-auto flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xs">★</span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <motion.button
          onClick={() => go(-1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer border-none"
          style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', color: 'white' }}
        >
          <ChevronLeft size={16} />
        </motion.button>

        {/* Dots */}
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDir(i > index ? 1 : -1); setIndex(i) }}
              className="rounded-full border-none cursor-pointer p-0 transition-all duration-200"
              style={{
                width: i === index ? '20px' : '7px',
                height: '7px',
                background: i === index ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)',
              }}
            />
          ))}
        </div>

        <motion.button
          onClick={() => go(1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer border-none"
          style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', color: 'white' }}
        >
          <ChevronRight size={16} />
        </motion.button>
      </div>
    </div>
  )
}
