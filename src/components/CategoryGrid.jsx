import { motion } from 'framer-motion'
import { Code2, Palette, TrendingUp, Brain, Camera, Music, Globe, Shield } from 'lucide-react'

const categories = [
  { icon: Code2, name: 'Development', count: '48 Courses', color: 'from-violet-500 to-purple-600', span: 'md:col-span-2' },
  { icon: Brain, name: 'AI & Machine Learning', count: '32 Courses', color: 'from-purple-500 to-indigo-600', span: '' },
  { icon: Palette, name: 'Design', count: '25 Courses', color: 'from-pink-500 to-rose-500', span: '' },
  { icon: TrendingUp, name: 'Business & Marketing', count: '40 Courses', color: 'from-orange-400 to-pink-500', span: 'md:col-span-2' },
  { icon: Camera, name: 'Photography', count: '18 Courses', color: 'from-cyan-500 to-blue-500', span: '' },
  { icon: Globe, name: 'Languages', count: '22 Courses', color: 'from-green-500 to-teal-500', span: '' },
  { icon: Music, name: 'Music', count: '14 Courses', color: 'from-yellow-400 to-orange-500', span: '' },
  { icon: Shield, name: 'Cybersecurity', count: '20 Courses', color: 'from-slate-600 to-gray-800', span: '' },
]

export default function CategoryGrid() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-bold text-[#6D28D9] uppercase tracking-widest">Categories</span>
          <h2 className="text-4xl font-extrabold text-[#111827] mt-3 tracking-tight">
            Explore what excites you
          </h2>
          <p className="text-gray-500 mt-3 max-w-md mx-auto">
            From cutting-edge tech to creative arts — find your perfect learning path.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[140px]">
          {categories.map(({ icon: Icon, name, count, color, span }, i) => (
            <motion.div
              key={name}
              className={`relative rounded-2xl overflow-hidden cursor-pointer bg-gradient-to-br ${color} ${span}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ scale: 1.05, rotate: 1 }}
            >
              <div className="absolute inset-0 bg-black/10" />
              <div className="relative h-full flex flex-col justify-between p-5">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Icon size={22} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-base leading-tight">{name}</p>
                  <p className="text-white/70 text-xs mt-1">{count}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
