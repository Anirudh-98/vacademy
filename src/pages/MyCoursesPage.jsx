import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Clock, CheckCircle, TrendingUp, Search } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'
import { useCourse } from '../context/CourseContext'

function timeAgo(isoString) {
  const diff = Date.now() - new Date(isoString).getTime()
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  if (mins < 2) return 'Just now'
  if (mins < 60) return `${mins} minutes ago`
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  if (days === 1) return 'Yesterday'
  return `${days} days ago`
}

export default function MyCoursesPage() {
  const { enrolledCourses } = useCourse()
  const [searchQuery, setSearchQuery] = useState('')

  const totalHours = enrolledCourses.reduce((s, c) => s + (parseInt(c.duration) || 0), 0)
  const completed = enrolledCourses.filter((c) => c.progress >= 100).length
  const inProgress = enrolledCourses.filter((c) => c.progress > 0 && c.progress < 100).length

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return enrolledCourses
    const q = searchQuery.toLowerCase()
    return enrolledCourses.filter(
      (c) => c.title.toLowerCase().includes(q) || c.instructor.toLowerCase().includes(q),
    )
  }, [enrolledCourses, searchQuery])

  const stats = [
    { label: 'Enrolled', value: enrolledCourses.length, icon: BookOpen, color: '#4F46E5', bg: '#EEF2FF' },
    { label: 'Total Hours', value: `${totalHours}h`, icon: Clock, color: '#10B981', bg: '#ECFDF5' },
    { label: 'Completed', value: completed, icon: CheckCircle, color: '#F59E0B', bg: '#FFFBEB' },
    { label: 'In Progress', value: inProgress, icon: TrendingUp, color: '#7C3AED', bg: '#F5F3FF' },
  ]

  return (
    <DashboardLayout
      title="My Courses"
      subtitle={enrolledCourses.length > 0
        ? `${enrolledCourses.length} course${enrolledCourses.length > 1 ? 's' : ''} enrolled`
        : 'Start learning today'}
    >
      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color, bg }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.07 }}
            className="rounded-2xl p-5 bg-white border"
            style={{ borderColor: '#E8E6FF' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: bg }}>
                <Icon size={20} style={{ color }} />
              </div>
              <TrendingUp size={14} className="text-green-500" />
            </div>
            <p className="text-2xl font-black text-gray-900">{value}</p>
            <p className="text-xs text-gray-400 mt-0.5 font-medium">{label}</p>
          </motion.div>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-full border mb-6 bg-white w-full max-w-sm" style={{ borderColor: '#E8E6FF' }}>
        <Search size={15} className="text-gray-400 shrink-0" />
        <input
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="text-sm bg-transparent border-none outline-none text-gray-700 flex-1"
        />
      </div>

      {/* Empty state */}
      {enrolledCourses.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-2xl"
          style={{ borderColor: '#E8E6FF' }}
        >
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: '#EEF2FF' }}>
            <BookOpen size={28} style={{ color: '#4F46E5' }} />
          </div>
          <h3 className="text-lg font-black text-gray-900 mb-1">No courses yet</h3>
          <p className="text-sm text-gray-400 mb-5">You haven't enrolled in any course yet</p>
          <Link
            to="/courses"
            className="px-6 py-2.5 rounded-xl text-sm font-bold text-white no-underline"
            style={{ background: '#4F46E5' }}
          >
            Browse Courses
          </Link>
        </motion.div>
      ) : (
        <>
          {/* Course grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            {filtered.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.07 }}
                className="rounded-2xl bg-white border overflow-hidden"
                style={{ borderColor: '#E8E6FF' }}
              >
                {/* Thumbnail */}
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={course.thumbnail || course.image || `https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80`}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 60%)' }} />
                  {/* Category & Level badges */}
                  <span
                    className="absolute top-2 left-2 text-[10px] font-bold px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(0,0,0,0.55)', color: '#fff' }}
                  >
                    {course.category || 'Course'}
                  </span>
                  <span
                    className="absolute top-2 right-2 text-[10px] font-bold px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', backdropFilter: 'blur(4px)' }}
                  >
                    {course.level || 'All Levels'}
                  </span>
                </div>

                {/* Body */}
                <div className="p-4">
                  <h3 className="text-sm font-black text-gray-900 mb-0.5 leading-snug line-clamp-2">{course.title}</h3>
                  <p className="text-xs text-gray-400 mb-3">{course.instructor}</p>

                  {/* Progress bar */}
                  <div className="flex items-center gap-3 mb-1">
                    <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${course.progress || 0}%`, background: '#4F46E5' }}
                      />
                    </div>
                    <span className="text-[11px] font-black shrink-0" style={{ color: '#4F46E5' }}>
                      {course.progress || 0}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] text-gray-400">
                      {course.completedLessons || 0} / {course.lessons || course.totalLessons || '—'} lessons
                    </span>
                    <span className="text-[10px] text-gray-400">
                      Enrolled {timeAgo(course.enrolledAt)}
                    </span>
                  </div>

                  <Link
                    to="/courses"
                    className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl text-xs font-bold text-white no-underline"
                    style={{ background: '#4F46E5' }}
                  >
                    Continue Learning →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="rounded-2xl border p-6 flex items-center justify-between bg-white"
            style={{ borderColor: '#E8E6FF' }}
          >
            <div>
              <p className="text-sm font-black text-gray-900">Want to learn more?</p>
              <p className="text-xs text-gray-400 mt-0.5">Discover hundreds of expert-led courses</p>
            </div>
            <Link
              to="/courses"
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-white no-underline shrink-0"
              style={{ background: '#4F46E5' }}
            >
              Discover more courses
            </Link>
          </motion.div>
        </>
      )}
    </DashboardLayout>
  )
}
