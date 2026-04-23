import { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  BookOpen, Clock, Award, TrendingUp, Play, Radio,
  Bell, Search, Calendar, CheckCircle2,
  Flame, ArrowUpRight, Users, Video, MonitorPlay,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useLiveClass } from '../context/LiveClassContext'
import { useCourse } from '../context/CourseContext'
import { liveClasses, liveNow } from '../data/liveClasses'
import DashboardLayout from '../components/DashboardLayout'

/* ── countdown hook ── */
function useCountdown(targetDate) {
  const [time, setTime] = useState(() => {
    const diff = new Date(targetDate) - new Date()
    if (diff <= 0) return { h: 0, m: 0, s: 0 }
    return { h: Math.floor(diff / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) }
  })
  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate) - new Date()
      if (diff <= 0) return { h: 0, m: 0, s: 0 }
      return { h: Math.floor(diff / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) }
    }
    const t = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(t)
  }, [targetDate])
  return time
}

/* ── time formatting ── */
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

/* ── activity icon map ── */
const activityMeta = {
  enroll: { icon: BookOpen, color: '#4F46E5' },
  live: { icon: Video, color: '#7C3AED' },
  login: { icon: CheckCircle2, color: '#10B981' },
}

// sidebar links are built dynamically inside the component using live context data

/* ── countdown display ── */
function CountdownBadge({ date }) {
  const { h, m, s } = useCountdown(date)
  const soon = h === 0 && m < 60
  return (
    <span
      className="text-[10px] font-bold px-2 py-0.5 rounded-full tabular-nums"
      style={{ background: soon ? '#FEF2F2' : '#EEF2FF', color: soon ? '#EF4444' : '#4F46E5' }}
    >
      {h > 0 ? `${h}h ${m}m` : `${m}m ${s}s`}
    </span>
  )
}

export default function StudentDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const { registeredClasses, isRegistered, registrations } = useLiveClass()
  const { enrolledCourses, isEnrolled, activityLog, streak, hoursLearned, certificates } = useCourse()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Student'
  const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  // Merge course activity log + live class registrations, sorted newest first
  const recentActivity = useMemo(() => {
    const liveActivities = Object.values(registrations).map((r) => ({
      id: `live_${r.classId}`,
      action: 'Registered for live class',
      detail: liveClasses.find((c) => c.id === r.classId)?.title || 'Live Class',
      type: 'live',
      time: r.registeredAt,
    }))
    return [...activityLog, ...liveActivities]
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      .slice(0, 6)
  }, [activityLog, registrations])

  // Filter enrolled courses by search query
  const visibleCourses = useMemo(() => {
    if (!searchQuery.trim()) return enrolledCourses
    const q = searchQuery.toLowerCase()
    return enrolledCourses.filter(
      (c) => c.title.toLowerCase().includes(q) || c.instructor.toLowerCase().includes(q),
    )
  }, [enrolledCourses, searchQuery])

  return (
    <DashboardLayout
      title={`Welcome back, ${displayName.split(' ')[0]}!`}
      subtitle={enrolledCourses.length > 0
        ? `You're enrolled in ${enrolledCourses.length} course${enrolledCourses.length > 1 ? 's' : ''}`
        : 'Start your learning journey today'}
      headerExtra={
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border" style={{ borderColor: '#E8E6FF', background: '#F8F7FF' }}>
          <Search size={15} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search my courses..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="text-sm bg-transparent border-none outline-none text-gray-700 w-40"
          />
        </div>
      }
    >

          {/* Stats — derived from real context data */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Courses Enrolled', value: enrolledCourses.length, icon: BookOpen, color: '#4F46E5', bg: '#EEF2FF' },
              { label: 'Hours of Content', value: `${enrolledCourses.reduce((s, c) => s + (parseInt(c.duration) || 0), 0)}h`, icon: Clock, color: '#10B981', bg: '#ECFDF5' },
              { label: 'Certificates', value: certificates, icon: Award, color: '#F59E0B', bg: '#FFFBEB' },
              { label: 'Day Streak', value: streak, icon: Flame, color: '#EF4444', bg: '#FEF2F2' },
            ].map(({ label, value, icon: Icon, color, bg }) => (
              <motion.div key={label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="rounded-2xl p-5 bg-white border" style={{ borderColor: '#E8E6FF' }}>
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

          {/* ── LIVE NOW banner ── */}
          {liveNow.map((session) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-6 rounded-2xl overflow-hidden relative"
              style={{ minHeight: 180 }}
            >
              <img src={session.thumbnail} alt={session.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.4) 100%)' }} />
              <div className="relative z-10 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 h-full">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center gap-1.5 text-xs font-black px-3 py-1 rounded-full bg-red-500 text-white">
                      <Radio size={11} className="animate-pulse" /> LIVE NOW
                    </span>
                    <span className="text-xs text-white/60">{session.started}</span>
                  </div>
                  <h3 className="text-white font-black text-base sm:text-lg leading-tight mb-1 max-w-lg">{session.title}</h3>
                  <div className="flex items-center gap-3 mt-2">
                    <img src={session.avatar} alt={session.instructor} className="w-6 h-6 rounded-full object-cover" />
                    <span className="text-white/80 text-xs font-semibold">{session.instructor}</span>
                    <span className="flex items-center gap-1 text-white/60 text-xs">
                      <Users size={11} /> {session.viewers.toLocaleString()} watching
                    </span>
                  </div>
                </div>
                <Link
                  to="/live"
                  className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold no-underline"
                  style={{ background: '#EF4444', color: 'white' }}
                >
                  <Play size={15} fill="white" /> Join Now
                </Link>
              </div>
            </motion.div>
          ))}

          {/* ── My Registered Live Classes ── */}
          {registeredClasses.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }} className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-black text-gray-900">My Registered Live Classes</h2>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-green-100 text-green-600">
                    {registeredClasses.length} registered
                  </span>
                </div>
                <Link to="/live" className="text-xs font-bold no-underline flex items-center gap-1" style={{ color: '#4F46E5' }}>
                  Register more <ArrowUpRight size={13} />
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {registeredClasses.map((session, i) => {
                  const dateObj = new Date(session.date)
                  return (
                    <motion.div
                      key={session.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.07 }}
                      className="rounded-2xl bg-white border overflow-hidden hover:shadow-md transition-shadow"
                      style={{ borderColor: '#E8E6FF' }}
                    >
                      <div className="relative">
                        <img src={session.thumbnail} alt={session.title} className="w-full h-28 object-cover" />
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.6) 100%)' }} />
                        <div className="absolute top-2 left-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${session.color}dd`, color: 'white' }}>
                            {session.category}
                          </span>
                        </div>
                        <div className="absolute top-2 right-2">
                          <CountdownBadge date={session.date} />
                        </div>
                        <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
                          <img src={session.avatar} alt={session.instructor} className="w-5 h-5 rounded-full object-cover border border-white/40" />
                          <span className="text-white text-[10px] font-semibold">{session.instructor}</span>
                        </div>
                      </div>
                      <div className="p-3">
                        <h4 className="text-xs font-bold text-gray-900 leading-tight mb-2 line-clamp-2">{session.title}</h4>
                        <p className="text-[10px] text-gray-400 mb-2 flex items-center gap-1">
                          <Calendar size={10} />
                          {dateObj.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
                          {' · '}
                          {dateObj.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <div className="flex items-center gap-1.5 mb-2">
                          <CheckCircle2 size={11} className="text-green-500" />
                          <span className="text-[10px] font-bold text-green-600">Registered</span>
                        </div>
                        <Link
                          to="/live"
                          className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold no-underline transition-colors"
                          style={{ background: `${session.color}12`, color: session.color }}
                        >
                          <Video size={11} /> View Class Details
                        </Link>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* ── Continue Learning + Right panel ── */}
          <div className="grid lg:grid-cols-3 gap-6 mb-6">

            {/* Continue Learning */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-black text-gray-900">Continue Learning</h2>
                <Link to="/courses" className="text-xs font-bold no-underline flex items-center gap-1" style={{ color: '#4F46E5' }}>
                  Browse more <ArrowUpRight size={13} />
                </Link>
              </div>

              {visibleCourses.length === 0 && searchQuery ? (
                <div className="rounded-2xl bg-white border p-8 text-center" style={{ borderColor: '#E8E6FF' }}>
                  <p className="text-sm text-gray-500">No enrolled courses match "<strong>{searchQuery}</strong>"</p>
                  <button onClick={() => setSearchQuery('')} className="mt-2 text-xs text-indigo-600 font-semibold bg-transparent border-none cursor-pointer">Clear search</button>
                </div>
              ) : enrolledCourses.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl bg-white border flex flex-col items-center justify-center text-center py-14 px-6"
                  style={{ borderColor: '#E8E6FF', borderStyle: 'dashed' }}
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: '#EEF2FF' }}>
                    <BookOpen size={24} style={{ color: '#4F46E5' }} />
                  </div>
                  <p className="text-sm font-bold text-gray-800 mb-1">You haven't enrolled in any course yet</p>
                  <p className="text-xs text-gray-400 mb-5 max-w-xs">Start your learning journey today — pick a course that matches your goals.</p>
                  <Link
                    to="/courses"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold no-underline"
                    style={{ background: '#4F46E5', color: 'white' }}
                  >
                    <BookOpen size={14} /> Pick a Course
                  </Link>
                </motion.div>
              ) : (
                visibleCourses.map((course, i) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.08 }}
                    className="rounded-2xl bg-white border p-4 flex gap-4 hover:shadow-md transition-shadow cursor-pointer"
                    style={{ borderColor: '#E8E6FF' }}
                  >
                    <img src={course.image} alt={course.title} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: '#EEF2FF', color: '#4F46E5' }}>{course.category}</span>
                          <h3 className="text-sm font-bold text-gray-900 mt-1 leading-tight">{course.title}</h3>
                          <p className="text-xs text-gray-400 mt-0.5">{course.instructor}</p>
                        </div>
                        <button className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white border-none cursor-pointer" style={{ background: '#4F46E5' }}>
                          <Play size={13} fill="white" />
                        </button>
                      </div>
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-[10px] text-gray-400 font-medium">{course.completedLessons}/{course.lessons} lessons</p>
                          <p className="text-[10px] font-bold" style={{ color: '#4F46E5' }}>{course.progress}%</p>
                        </div>
                        <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${course.progress}%` }}
                            transition={{ duration: 0.8, delay: i * 0.1 + 0.3 }}
                            className="h-full rounded-full"
                            style={{ background: '#4F46E5' }}
                          />
                        </div>
                        <p className="text-[10px] text-gray-400 mt-1">
                          Enrolled <span className="font-semibold text-gray-600">{timeAgo(course.enrolledAt)}</span>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Right column */}
            <div className="space-y-5">

              {/* Weekly goal */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }} className="rounded-2xl bg-white border p-5" style={{ borderColor: '#E8E6FF' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-black text-gray-900">Day Streak</h3>
                  <Flame size={16} style={{ color: '#EF4444' }} />
                </div>
                <div className="text-center mb-3">
                  <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center border-4 mb-2" style={{ borderColor: '#EF4444', background: '#FEF2F2' }}>
                    <div>
                      <p className="text-lg font-black" style={{ color: '#EF4444' }}>{streak}</p>
                      <p className="text-[9px] text-gray-400 font-medium leading-none">days</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 font-medium">
                    {streak === 1 ? 'First day — keep it going!' : `${streak}-day streak!`}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 bg-orange-50 text-orange-700 text-xs font-semibold px-3 py-2 rounded-xl justify-center">
                  <Flame size={12} />
                  {streak >= 7 ? 'On fire! 🔥' : 'Visit daily to build your streak'}
                </div>
              </motion.div>

              {/* Recent activity — real events */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }} className="rounded-2xl bg-white border p-5" style={{ borderColor: '#E8E6FF' }}>
                <h3 className="text-sm font-black text-gray-900 mb-4">Recent Activity</h3>
                {recentActivity.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-4">No activity yet. Enroll in a course or register for a live class to get started.</p>
                ) : (
                  <div className="space-y-3">
                    {recentActivity.map(({ id, action, detail, type, time }) => {
                      const meta = activityMeta[type] || activityMeta.login
                      const Icon = meta.icon
                      return (
                        <div key={id} className="flex items-start gap-3">
                          <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${meta.color}15` }}>
                            <Icon size={13} style={{ color: meta.color }} />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-700 leading-tight">{action}</p>
                            <p className="text-[10px] text-gray-400 truncate max-w-[160px]">{detail}</p>
                            <p className="text-[10px] text-gray-300 mt-0.5">{timeAgo(time)}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </motion.div>

            </div>
          </div>

          {/* ── UPCOMING LIVE SESSIONS ── */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }} className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black text-gray-900">Upcoming Live Sessions</h2>
                <span className="flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-600">
                  <Calendar size={10} /> {liveClasses.length} scheduled
                </span>
              </div>
              <Link to="/live" className="text-xs font-bold no-underline flex items-center gap-1" style={{ color: '#4F46E5' }}>
                View all <ArrowUpRight size={13} />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {liveClasses.slice(0, 3).map((session, i) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.07 }}
                  className="rounded-2xl bg-white border overflow-hidden hover:shadow-md transition-shadow"
                  style={{ borderColor: '#E8E6FF' }}
                >
                  <div className="relative">
                    <img src={session.thumbnail} alt={session.title} className="w-full h-28 object-cover" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.6) 100%)' }} />
                    <div className="absolute top-2 left-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${session.color}dd`, color: 'white' }}>
                        {session.category}
                      </span>
                    </div>
                    <div className="absolute top-2 right-2">
                      <CountdownBadge date={session.date} />
                    </div>
                    <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
                      <img src={session.avatar} alt={session.instructor} className="w-5 h-5 rounded-full object-cover border border-white/40" />
                      <span className="text-white text-[10px] font-semibold">{session.instructor}</span>
                    </div>
                  </div>
                  <div className="p-3">
                    <h4 className="text-xs font-bold text-gray-900 leading-tight mb-2 line-clamp-2">{session.title}</h4>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1 text-[10px] text-gray-400">
                        <Users size={10} /> {session.enrolled.toLocaleString()} enrolled
                      </div>
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md" style={{ background: '#F8F7FF', color: '#6B7280' }}>
                        {session.level}
                      </span>
                    </div>
                    {isRegistered(session.id) ? (
                      <div className="flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold bg-green-50 text-green-600 border border-green-200">
                        <CheckCircle2 size={11} /> Registered
                      </div>
                    ) : (
                      <Link
                        to="/live"
                        className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold no-underline transition-colors"
                        style={{ background: `${session.color}12`, color: session.color }}
                      >
                        <Bell size={11} /> Register Free
                      </Link>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── RECORDINGS — only when user has registered for live classes ── */}
          {registeredClasses.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 }} className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-black text-gray-900">Past Recordings</h2>
                  <MonitorPlay size={15} className="text-gray-400" />
                </div>
                <Link to="/live" className="text-xs font-bold no-underline flex items-center gap-1" style={{ color: '#4F46E5' }}>
                  All recordings <ArrowUpRight size={13} />
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { id: 'r1', title: 'TypeScript Generics — From Zero to Expert', instructor: 'Lisa Park', thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80', duration: '1h 48m', views: '14.2K', date: 'Mar 20, 2026', color: '#4F46E5' },
                  { id: 'r2', title: 'SQL for Data Analysts — Live Practice', instructor: 'Priya Sharma', thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', duration: '2h 12m', views: '9.8K', date: 'Mar 15, 2026', color: '#7C3AED' },
                  { id: 'r3', title: 'Next.js App Router Deep Dive', instructor: 'Alex Johnson', thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80', duration: '1h 22m', views: '11.5K', date: 'Mar 10, 2026', color: '#0891b2' },
                ].map((rec, i) => (
                  <motion.div
                    key={rec.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.07 }}
                    className="rounded-2xl bg-white border overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
                    style={{ borderColor: '#E8E6FF' }}
                  >
                    <div className="relative">
                      <img src={rec.thumbnail} alt={rec.title} className="w-full h-24 object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'rgba(0,0,0,0.4)' }}>
                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: rec.color }}>
                          <Play size={16} fill="white" className="text-white" />
                        </div>
                      </div>
                      <span className="absolute bottom-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded-md" style={{ background: 'rgba(0,0,0,0.7)', color: 'white' }}>
                        {rec.duration}
                      </span>
                    </div>
                    <div className="p-3">
                      <h4 className="text-xs font-bold text-gray-900 leading-tight mb-1 line-clamp-2">{rec.title}</h4>
                      <p className="text-[10px] text-gray-400 mb-2">{rec.instructor}</p>
                      <div className="flex items-center justify-between text-[10px] text-gray-400">
                        <span>{rec.views} views</span>
                        <span>{rec.date}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ background: 'linear-gradient(135deg, #4F46E5, #6366f1)' }}
          >
            <div>
              <h3 className="text-white font-black text-base mb-1">
                {enrolledCourses.length === 0 ? 'Start Learning Today' : 'Explore More Courses'}
              </h3>
              <p className="text-indigo-200 text-sm">Expand your skills with 500+ expert-led courses.</p>
            </div>
            <Link to="/courses" className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold no-underline" style={{ background: 'rgba(255,255,255,0.95)', color: '#4F46E5' }}>
              Browse Courses <ArrowUpRight size={15} />
            </Link>
          </motion.div>

    </DashboardLayout>
  )
}
