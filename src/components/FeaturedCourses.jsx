import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Clock, Users, Play } from 'lucide-react'
import CoursePreviewModal from './CoursePreviewModal'

const courses = [
  {
    title: 'React & Next.js: Zero to Hero',
    instructor: 'Alex Johnson',
    rating: 4.9,
    students: '12k',
    duration: '32h',
    price: '₹6,499',
    originalPrice: '₹12,999',
    tag: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80',
  },
  {
    title: 'Python for Data Science & AI',
    instructor: 'Priya Sharma',
    rating: 4.8,
    students: '18k',
    duration: '28h',
    price: '₹7,499',
    originalPrice: '₹14,999',
    tag: 'Hot',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80',
  },
  {
    title: 'UI/UX Design Mastery',
    instructor: 'Maria Chen',
    rating: 4.9,
    students: '9k',
    duration: '24h',
    price: '₹5,999',
    originalPrice: '₹11,999',
    tag: 'New',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
  },
  {
    title: 'AWS Cloud Practitioner',
    instructor: 'David Kim',
    rating: 4.7,
    students: '21k',
    duration: '40h',
    price: '₹8,499',
    originalPrice: '₹16,999',
    tag: 'Trending',
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&q=80',
  },
  {
    title: 'Machine Learning A-Z',
    instructor: 'Sara Lopez',
    rating: 4.9,
    students: '15k',
    duration: '36h',
    price: '₹7,999',
    originalPrice: '₹15,999',
    tag: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80',
  },
  {
    title: 'Full-Stack Mobile with Flutter',
    instructor: 'James Wu',
    rating: 4.8,
    students: '7k',
    duration: '22h',
    price: '₹5,499',
    originalPrice: '₹10,999',
    tag: 'New',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80',
  },
]

const tagColors = {
  Bestseller: 'bg-yellow-400/90 text-yellow-900',
  Hot: 'bg-red-500/90 text-white',
  New: 'bg-green-500/90 text-white',
  Trending: 'bg-violet-600/90 text-white',
}

export default function FeaturedCourses() {
  const [selectedCourse, setSelectedCourse] = useState(null)

  return (
    <section className="py-24 px-6 bg-[#F9FAFB]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="flex items-end justify-between mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="text-xs font-bold text-[#6D28D9] uppercase tracking-widest">Featured</span>
            <h2 className="text-4xl font-extrabold text-[#111827] mt-2 tracking-tight">Top courses right now</h2>
          </div>
          <a href="#" className="hidden md:block text-sm font-semibold text-[#6D28D9] hover:underline no-underline">
            View all →
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(({ title, instructor, rating, students, duration, price, originalPrice, tag, image }, i) => (
            <motion.div
              key={title}
              className="bg-white rounded-2xl overflow-hidden border border-purple-50 shadow-sm hover:shadow-xl hover:shadow-purple-100 transition-shadow group"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              {/* Thumbnail */}
              <div className="relative h-44 overflow-hidden bg-gray-100">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => setSelectedCourse({ title, instructor, rating, students, duration, price, originalPrice, tag, image })}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#6D28D9] text-sm font-bold shadow-lg border-none cursor-pointer"
                  >
                    <Play size={15} fill="currentColor" /> Quick Preview
                  </motion.button>
                </div>
                <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm ${tagColors[tag]}`}>
                  {tag}
                </span>
              </div>

              {/* Card body */}
              <div className="p-5">
                <h3 className="font-bold text-[#111827] text-sm leading-snug mb-1">{title}</h3>
                <p className="text-xs text-gray-400 mb-3">{instructor}</p>

                <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1 text-yellow-500 font-bold">
                    <Star size={12} fill="currentColor" /> {rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={12} /> {students}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {duration}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-extrabold text-[#6D28D9]">{price}</span>
                    <span className="text-xs text-gray-400 line-through ml-2">{originalPrice}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.07 }}
                    whileTap={{ scale: 0.93 }}
                    onClick={() => setSelectedCourse({ title, instructor, rating, students, duration, price, originalPrice, tag, image })}
                    className="px-4 py-2 rounded-xl bg-purple-50 text-[#6D28D9] text-xs font-bold border-none cursor-pointer hover:bg-[#6D28D9] hover:text-white transition-colors"
                  >
                    Enroll Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedCourse && (
          <CoursePreviewModal
            course={selectedCourse}
            onClose={() => setSelectedCourse(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
