import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen, Award, LayoutDashboard, Route, LogOut,
  Bell, Video, Flame, UserCircle, X, Menu
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCourse } from '../context/CourseContext'
import { useLiveClass } from '../context/LiveClassContext'

export default function DashboardLayout({ children, title, subtitle, headerExtra }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const { enrolledCourses, streak, certificates } = useCourse()
  const { registeredClasses } = useLiveClass()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Student'
  const initials = displayName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)

  const navLinks = [
    {
      group: 'Overview',
      items: [
        { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
      ],
    },
    {
      group: 'My Learning',
      items: [
        {
          label: 'My Courses',
          to: '/my-courses',
          icon: BookOpen,
          badge: enrolledCourses.length > 0
            ? { text: String(enrolledCourses.length), style: { background: '#EEF2FF', color: '#4F46E5' } }
            : { text: '0', style: { background: '#F3F4F6', color: '#9CA3AF' } },
        },
        {
          label: 'Live Classes',
          to: '/my-live-classes',
          icon: Video,
          badge: registeredClasses.length > 0
            ? { text: `${registeredClasses.length} registered`, style: { background: '#F3E8FF', color: '#7C3AED' } }
            : null,
          livePill: registeredClasses.length === 0,
        },
        { label: 'Learning Paths', to: '/my-learning-paths', icon: Route },
      ],
    },
    {
      group: 'Progress',
      items: [
        {
          label: 'Achievements',
          to: '/my-achievements',
          icon: Award,
          badge: certificates > 0
            ? { text: `${certificates} earned`, style: { background: '#FFFBEB', color: '#D97706' } }
            : { text: '0', style: { background: '#F3F4F6', color: '#9CA3AF' } },
        },
      ],
    },
    {
      group: 'Account',
      items: [
        { label: 'My Profile', to: '/profile', icon: UserCircle },
      ],
    },
  ]

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="px-6 py-5 border-b" style={{ borderColor: '#E8E6FF' }}>
        <Link to="/" className="flex items-center gap-2 no-underline" onClick={() => setIsMobileMenuOpen(false)}>
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm"
            style={{ background: 'linear-gradient(135deg, #4F46E5, #6366f1)', fontFamily: 'var(--font-logo)', fontWeight: 800 }}
          >
            V
          </div>
          <span style={{ fontFamily: 'var(--font-logo)', fontWeight: 800, fontSize: '1.15rem', letterSpacing: '-0.02em', color: '#1a1a2e', lineHeight: 1 }}>
            Viscano<span style={{ background: 'linear-gradient(135deg, #4F46E5, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Learn</span>
          </span>
        </Link>
      </div>

      {/* User card */}
      <div className="px-4 py-5 border-b" style={{ borderColor: '#E8E6FF' }}>
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm shrink-0"
            style={{ background: 'linear-gradient(135deg, #4F46E5, #6366f1)' }}
          >
            {initials}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-gray-900 truncate">{displayName}</p>
            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {navLinks.map(({ group, items }) => (
          <div key={group}>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-2 mt-4 first:mt-0">
              {group}
            </p>
            {items.map(({ label, to, icon: Icon, badge, livePill }) => {
              const active = location.pathname === to
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold no-underline mb-1 transition-colors hover:bg-gray-50"
                  style={active
                    ? { background: 'rgba(79,70,229,0.08)', color: '#4F46E5' }
                    : { color: '#6B7280' }}
                >
                  <Icon size={18} />
                  {label}
                  {badge && (
                    <span
                      className="ml-auto text-[10px] font-black px-2 py-0.5 rounded-full"
                      style={badge.style}
                    >
                      {badge.text}
                    </span>
                  )}
                  {livePill && !badge && (
                    <span className="ml-auto flex items-center gap-1 text-[9px] font-black px-1.5 py-0.5 rounded-full bg-red-100 text-red-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      LIVE
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        ))}

        {/* Streak pill */}
        {streak > 0 && (
          <div
            className="mx-3 mt-4 p-3 rounded-xl flex items-center gap-3"
            style={{ background: '#FFF7ED', border: '1px solid #FDE68A' }}
          >
            <Flame size={18} style={{ color: '#EF4444' }} />
            <div>
              <p className="text-xs font-black text-gray-800">{streak}-day streak</p>
              <p className="text-[10px] text-gray-400">Keep it going!</p>
            </div>
          </div>
        )}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t" style={{ borderColor: '#E8E6FF' }}>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold cursor-pointer border-none bg-transparent transition-colors"
          style={{ color: '#EF4444' }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#FEF2F2')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </>
  )

  return (
    <div className="min-h-screen flex" style={{ background: '#F8F7FF' }}>

      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:flex flex-col w-64 shrink-0 border-r"
        style={{ background: '#fff', borderColor: '#E8E6FF', position: 'sticky', top: 0, height: '100vh' }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-white z-[101] shadow-2xl flex flex-col lg:hidden"
            >
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-4 -right-12 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-lg border-none cursor-pointer text-gray-500"
              >
                <X size={20} />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Sticky header */}
        <header
          className="flex items-center justify-between px-6 py-4 border-b bg-white"
          style={{ borderColor: '#E8E6FF', position: 'sticky', top: 0, zIndex: 50 }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center border bg-white cursor-pointer text-gray-500"
              style={{ borderColor: '#E8E6FF' }}
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-sm sm:text-lg font-black text-gray-900 truncate max-w-[150px] sm:max-w-none">{title}</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {headerExtra}
            <button
              className="w-9 h-9 rounded-full flex items-center justify-center border bg-white relative cursor-pointer"
              style={{ borderColor: '#E8E6FF' }}
            >
              <Bell size={16} className="text-gray-500" />
            </button>
            {/* On Desktop: Navigates to Profile. On Mobile: Opens Sidebar */}
            <div className="lg:block">
              <button
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    setIsMobileMenuOpen(true)
                  } else {
                    navigate('/profile')
                  }
                }}
                className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-xs shrink-0 no-underline cursor-pointer border-none"
                style={{ background: 'linear-gradient(135deg, #4F46E5, #6366f1)' }}
                title={window.innerWidth < 1024 ? "Open Menu" : "View Profile"}
              >
                {initials}
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 sm:px-6 py-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
