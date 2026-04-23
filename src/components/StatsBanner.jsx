import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const stats = [
  { value: 120000, suffix: '+', label: 'Active Learners', decimals: 0, display: '1,20,000+' },
  { value: 500,    suffix: '+', label: 'Expert Courses',  decimals: 0, display: '500+'     },
  { value: 4.8,    suffix: '',  label: 'Average Rating',  decimals: 1, display: '4.8'      },
  { value: 95,     suffix: '%', label: 'Placement Rate',  decimals: 0, display: '95%'      },
]

function CountUp({ target, decimals, suffix, inView }) {
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const steps = 60
    const increment = target / steps
    let current = 0
    let step = 0
    const timer = setInterval(() => {
      step++
      current = Math.min(current + increment, target)
      setVal(current)
      if (step >= steps) clearInterval(timer)
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, target])

  const formatted = decimals > 0
    ? val.toFixed(decimals)
    : Math.floor(val).toLocaleString('en-IN')

  return <>{formatted}{suffix}</>
}

export default function StatsBanner() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-16 px-6" style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)' }}>
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map(({ value, suffix, label, decimals }, i) => (
          <motion.div
            key={label}
            className="flex flex-col items-center text-center gap-1"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-4xl md:text-5xl font-black text-white tracking-tight">
              <CountUp target={value} decimals={decimals} suffix={suffix} inView={inView} />
            </span>
            <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
