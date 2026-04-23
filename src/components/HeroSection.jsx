import { motion } from 'framer-motion'
import { Search, GraduationCap, ArrowRight } from 'lucide-react'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col"
      style={{ background: 'linear-gradient(135deg, #5b6ef5 0%, #7b8ff7 25%, #a0b4ff 55%, #c5d4ff 80%, #dce6ff 100%)' }}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Large diagonal white geometric shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute"
          style={{
            width: '520px',
            height: '520px',
            background: 'rgba(255,255,255,0.13)',
            borderRadius: '60px',
            transform: 'rotate(35deg)',
            top: '10%',
            right: '22%',
          }}
        />
        <div
          className="absolute"
          style={{
            width: '380px',
            height: '380px',
            background: 'rgba(255,255,255,0.09)',
            borderRadius: '50px',
            transform: 'rotate(35deg)',
            top: '30%',
            right: '14%',
          }}
        />
        <div
          className="absolute"
          style={{
            width: '260px',
            height: '260px',
            background: 'rgba(255,255,255,0.07)',
            borderRadius: '36px',
            transform: 'rotate(35deg)',
            top: '-5%',
            left: '30%',
          }}
        />
      </div>

      {/* Student image — absolutely positioned on the right, full height */}
      <motion.div
        className="hidden md:block absolute right-0 bottom-0 z-10 pointer-events-none"
        style={{ width: '44%', top: '8%' }}
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src="/herobg.png"
          alt="Student"
          className="w-full h-full object-contain object-bottom select-none"
          style={{ filter: 'drop-shadow(0 0 60px rgba(60,60,200,0.2))' }}
          draggable={false}
        />
      </motion.div>

      {/* Text content — left side, vertically centered */}
      <div className="relative z-10 flex-1 flex items-center w-full px-8 md:pl-16 pt-20 pb-16">
        <motion.div
          className="flex flex-col gap-6 w-full md:w-[58%] items-start"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white"
              style={{ background: 'rgba(255,255,255,0.22)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)' }}
            >
              <GraduationCap size={14} />
              Transforming Skills Into Success
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-none tracking-tight text-white"
            style={{ textShadow: '0 2px 20px rgba(60,60,180,0.15)' }}
          >
            Shaping Minds,<br />
            Building Futures<br />
            Through Smarter<br />
            Learning
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="text-sm md:text-base leading-relaxed max-w-md"
            style={{ color: 'rgba(255,255,255,0.8)' }}
          >
            Join a new era of education where innovation meets knowledge.
            Discover expert-led courses, practical skills, and limitless
            opportunities to achieve your goals.
          </motion.p>

          {/* Email + Search */}
          <motion.div variants={fadeUp} className="w-full max-w-lg">
            <div
              className="flex flex-col sm:flex-row p-1.5 sm:p-0 items-stretch sm:items-center rounded-3xl sm:rounded-full overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 8px 32px rgba(80,80,200,0.15)',
              }}
            >
              <input
                type="email"
                placeholder="Type your email here...."
                className="flex-1 pl-6 py-4 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
                style={{ cursor: 'auto' }}
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl sm:rounded-full text-sm font-bold text-white border-none cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #4F46E5, #6366f1)', boxShadow: '0 4px 14px rgba(79,70,229,0.3)' }}
              >
                Search <ArrowRight size={15} />
              </motion.button>
            </div>
          </motion.div>

          {/* Social proof */}
          <motion.div variants={fadeUp} className="flex flex-col gap-2">
            <div className="flex">
              {[
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&q=80',
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&q=80',
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&q=80',
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="w-9 h-9 rounded-full object-cover border-2"
                  style={{ borderColor: 'rgba(255,255,255,0.7)', marginLeft: i === 0 ? 0 : '-10px', zIndex: 3 - i }}
                />
              ))}
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white border-2"
                style={{ borderColor: 'rgba(255,255,255,0.7)', background: 'linear-gradient(135deg, #4F46E5, #818cf8)', marginLeft: '-10px' }}
              >
                +12
              </div>
            </div>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.75)' }}>
              12,000+ people already joined the Viscano Learn plan.<br />
              Get started today!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>

  )
}
