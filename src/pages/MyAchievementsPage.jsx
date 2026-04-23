import { motion } from 'framer-motion'
import {
  BookOpen, Award, Flame, Video,
  Star, Trophy, Lock, Route,
} from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'
import { useCourse } from '../context/CourseContext'
import { useLiveClass } from '../context/LiveClassContext'

export default function MyAchievementsPage() {
  const { enrolledCourses, streak, certificates } = useCourse()
  const { registeredClasses } = useLiveClass()

  const totalHours = enrolledCourses.reduce((s, c) => s + (parseInt(c.duration) || 0), 0)
  const completedCourses = enrolledCourses.filter((c) => c.progress >= 100)

  /* ── Stats ── */
  const stats = [
    { label: 'Courses Enrolled', value: enrolledCourses.length, icon: BookOpen, color: '#4F46E5', bg: '#EEF2FF' },
    { label: 'Certificates Earned', value: certificates, icon: Award, color: '#F59E0B', bg: '#FFFBEB' },
    { label: 'Day Streak', value: streak, icon: Flame, color: '#EF4444', bg: '#FEF2F2' },
    { label: 'Live Classes Registered', value: registeredClasses.length, icon: Video, color: '#7C3AED', bg: '#F5F3FF' },
  ]

  /* ── Badges ── */
  const badges = [
    {
      id: 'first_enroll',
      label: 'First Steps',
      desc: 'Enrolled in your first course',
      icon: BookOpen,
      color: '#4F46E5',
      earned: enrolledCourses.length >= 1,
    },
    {
      id: 'triple',
      label: 'Triple Threat',
      desc: 'Enrolled in 3 courses',
      icon: Star,
      color: '#F59E0B',
      earned: enrolledCourses.length >= 3,
    },
    {
      id: 'scholar',
      label: 'Scholar',
      desc: 'Completed your first course',
      icon: Award,
      color: '#D97706',
      earned: certificates >= 1,
    },
    {
      id: 'live_learner',
      label: 'Live Learner',
      desc: 'Registered for a live class',
      icon: Video,
      color: '#7C3AED',
      earned: registeredClasses.length >= 1,
    },
    {
      id: 'consistent',
      label: 'Consistent',
      desc: 'Achieved a 3-day streak',
      icon: Flame,
      color: '#EF4444',
      earned: streak >= 3,
    },
    {
      id: 'on_fire',
      label: 'On Fire',
      desc: 'Achieved a 7-day streak',
      icon: Flame,
      color: '#EF4444',
      earned: streak >= 7,
    },
    {
      id: 'dedicated',
      label: 'Dedicated',
      desc: 'Achieved a 30-day streak',
      icon: Trophy,
      color: '#F59E0B',
      earned: streak >= 30,
    },
    {
      id: 'path_starter',
      label: 'Path Starter',
      desc: 'Started a learning path',
      icon: Route,
      color: '#10B981',
      earned: false,
    },
  ]

  const earnedCount = badges.filter((b) => b.earned).length

  /* ── Activity grid — last 7 days ── */
  const activityDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    const active = i >= 7 - Math.min(streak, 7)
    return { label: d.toLocaleDateString('en-US', { weekday: 'short' }), active }
  })

  return (
    <DashboardLayout
      title="Achievements"
      subtitle={`${earnedCount} badge${earnedCount !== 1 ? 's' : ''} earned · ${certificates} certificate${certificates !== 1 ? 's' : ''}`}
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
            </div>
            <p className="text-2xl font-black text-gray-900">{value}</p>
            <p className="text-xs text-gray-400 mt-0.5 font-medium">{label}</p>
          </motion.div>
        ))}
      </div>

      {/* ── Certificates ── */}
      <section className="mb-10">
        <h2 className="text-base font-black text-gray-900 mb-4 flex items-center gap-2">
          <Award size={18} style={{ color: '#F59E0B' }} />
          Certificates
          {certificates > 0 && (
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full" style={{ background: '#FFFBEB', color: '#D97706' }}>
              {certificates} earned
            </span>
          )}
        </h2>

        {certificates === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-2xl"
            style={{ borderColor: '#FDE68A' }}
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3" style={{ background: '#FFFBEB' }}>
              <Award size={26} style={{ color: '#F59E0B' }} />
            </div>
            <h3 className="text-sm font-black text-gray-800 mb-1">No certificates yet</h3>
            <p className="text-xs text-gray-400">Complete a course to earn your first certificate</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {completedCourses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.07 }}
                className="relative rounded-2xl overflow-hidden border"
                style={{
                  borderColor: '#FDE68A',
                  background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
                }}
              >
                {/* Gold accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: 'linear-gradient(90deg, #F59E0B, #D97706)' }} />
                <div className="p-6 pt-7">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)' }}>
                      <Award size={22} className="text-white" />
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: '#FEF9C3', color: '#D97706' }}>
                      CERTIFICATE
                    </span>
                  </div>
                  <h3 className="text-sm font-black text-gray-900 mb-1 leading-snug">{course.title}</h3>
                  <p className="text-xs text-gray-500 mb-3">{course.instructor}</p>
                  <p className="text-[10px] text-gray-400">
                    Completed {course.enrolledAt ? new Date(course.enrolledAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'recently'}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* ── Badges ── */}
      <section className="mb-10">
        <h2 className="text-base font-black text-gray-900 mb-4 flex items-center gap-2">
          <Star size={18} style={{ color: '#F59E0B' }} />
          Badges
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full" style={{ background: '#F3F4F6', color: '#6B7280' }}>
            {earnedCount}/{badges.length}
          </span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {badges.map((badge, i) => {
            const Icon = badge.icon
            return (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.07 }}
                className="relative rounded-2xl p-4 flex flex-col items-center gap-2 border text-center"
                style={{
                  borderColor: badge.earned ? '#E8E6FF' : '#F3F4F6',
                  background: badge.earned ? '#fff' : '#FAFAFA',
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center relative"
                  style={{ background: badge.earned ? `${badge.color}18` : '#F3F4F6' }}
                >
                  <Icon size={22} style={{ color: badge.earned ? badge.color : '#D1D5DB' }} />
                  {!badge.earned && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white border flex items-center justify-center" style={{ borderColor: '#E5E7EB' }}>
                      <Lock size={10} className="text-gray-400" />
                    </div>
                  )}
                </div>
                <p className={`text-xs font-black ${badge.earned ? 'text-gray-900' : 'text-gray-400'}`}>{badge.label}</p>
                <p className="text-[10px] text-gray-400 leading-tight">{badge.desc}</p>
                {badge.earned && (
                  <span
                    className="text-[9px] font-black px-2 py-0.5 rounded-full"
                    style={{ background: `${badge.color}18`, color: badge.color }}
                  >
                    EARNED
                  </span>
                )}
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ── Learning Stats ── */}
      <section>
        <h2 className="text-base font-black text-gray-900 mb-4 flex items-center gap-2">
          <Flame size={18} style={{ color: '#EF4444' }} />
          Learning Stats
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Total hours */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl p-5 bg-white border"
            style={{ borderColor: '#E8E6FF' }}
          >
            <p className="text-xs font-bold text-gray-400 mb-2">Total Hours of Content</p>
            <p className="text-3xl font-black text-gray-900">{totalHours}<span className="text-base font-bold text-gray-400 ml-1">h</span></p>
            <p className="text-xs text-gray-400 mt-1">across {enrolledCourses.length} courses</p>
          </motion.div>

          {/* Longest streak */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.07 }}
            className="rounded-2xl p-5 bg-white border"
            style={{ borderColor: '#E8E6FF' }}
          >
            <p className="text-xs font-bold text-gray-400 mb-2">Longest Streak</p>
            <p className="text-3xl font-black text-gray-900">{streak}<span className="text-base font-bold text-gray-400 ml-1">days</span></p>
            <p className="text-xs text-gray-400 mt-1">Keep visiting daily!</p>
          </motion.div>

          {/* Activity grid */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.14 }}
            className="rounded-2xl p-5 bg-white border"
            style={{ borderColor: '#E8E6FF' }}
          >
            <p className="text-xs font-bold text-gray-400 mb-3">Last 7 Days Activity</p>
            <div className="flex items-end gap-1.5">
              {activityDays.map(({ label, active }) => (
                <div key={label} className="flex flex-col items-center gap-1 flex-1">
                  <div
                    className="w-full rounded-md"
                    style={{
                      height: 28,
                      background: active ? '#4F46E5' : '#EEF2FF',
                      opacity: active ? 1 : 0.5,
                    }}
                  />
                  <span className="text-[9px] text-gray-400 font-medium">{label[0]}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </DashboardLayout>
  )
}
