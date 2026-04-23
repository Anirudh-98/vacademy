import { motion } from 'framer-motion'
import { Star, Users, BookOpen, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const instructors = [
  {
    name: 'Anirudh',
    specialty: 'React & Full-Stack',
    courses: 8,
    students: '42,000',
    rating: 4.9,
    image: '/ani.png',
    badge: 'Top Rated',
    badgeColor: '#f59e0b',
  },
  {
    name: 'Harish',
    specialty: 'Data Science & AI',
    courses: 6,
    students: '38,500',
    rating: 4.8,
    image: '/harish.jpeg',
    badge: 'Bestseller',
    badgeColor: '#10b981',
  },
  {
    name: 'Prakash',
    specialty: 'Visual Designer',
    courses: 5,
    students: '29,000',
    rating: 4.9,
    image: '/prakash.png',
    badge: 'Expert',
    badgeColor: '#6366f1',
  },
  {
    name: 'Chaitanya',
    specialty: 'UI/UX Design',
    courses: 4,
    students: '21,300',
    rating: 4.9,
    image: '/chaitanya.png',
    badge: 'Top Rated',
    badgeColor: '#f59e0b',
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const card = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}

export default function TopInstructors() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="text-xs font-bold text-[#6D28D9] uppercase tracking-widest">Instructors</span>
            <h2 className="text-4xl font-extrabold text-[#111827] mt-2 tracking-tight">
              Learn from the best
            </h2>
            <p className="text-gray-500 mt-2 max-w-md">
              Our instructors are industry professionals with years of real-world experience.
            </p>
          </div>
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#6D28D9] no-underline hover:gap-3 transition-all"
          >
            View all instructors <ArrowRight size={15} />
          </Link>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {instructors.map((inst) => (
            <motion.div
              key={inst.name}
              variants={card}
              whileHover={{ y: -6 }}
              className="relative rounded-3xl overflow-hidden border border-gray-100 bg-white flex flex-col items-center text-center p-6 gap-3 cursor-pointer"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
            >
              {/* Badge */}
              <span
                className="absolute top-4 right-4 text-white text-[10px] font-bold px-2.5 py-1 rounded-full"
                style={{ background: inst.badgeColor }}
              >
                {inst.badge}
              </span>

              {/* Avatar */}
              <div className="relative">
                <img
                  src={inst.image}
                  alt={inst.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white"
                  style={{ boxShadow: '0 4px 16px rgba(109,40,217,0.2)' }}
                />
                <div
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white"
                  style={{ background: 'linear-gradient(135deg, #6D28D9, #9333EA)' }}
                >
                  <Star size={10} fill="white" className="text-white" />
                </div>
              </div>

              {/* Info */}
              <div>
                <p className="font-extrabold text-[#111827] text-base">{inst.name}</p>
                <p className="text-xs text-[#6D28D9] font-semibold mt-0.5">{inst.specialty}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1">
                <Star size={13} fill="#f59e0b" className="text-yellow-400" />
                <span className="text-sm font-bold text-gray-800">{inst.rating}</span>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-gray-100" />

              {/* Stats */}
              <div className="flex justify-center gap-6 w-full">
                <div className="flex flex-col items-center gap-0.5">
                  <div className="flex items-center gap-1 text-gray-400">
                    <BookOpen size={12} />
                    <span className="text-xs font-semibold text-gray-700">{inst.courses}</span>
                  </div>
                  <span className="text-[10px] text-gray-400">Courses</span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <div className="flex items-center gap-1 text-gray-400">
                    <Users size={12} />
                    <span className="text-xs font-semibold text-gray-700">{inst.students}</span>
                  </div>
                  <span className="text-[10px] text-gray-400">Students</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
