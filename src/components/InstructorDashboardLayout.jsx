import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, BookOpen, Users, DollarSign, BarChart2,
  Bell, LogOut, X, Menu, Star, Video, PlusCircle, MessageSquare,
  Settings, GraduationCap, Tag, HelpCircle
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const NAV = [
  {
    group: 'Overview',
    items: [
      { label: 'Dashboard', section: 'overview', icon: LayoutDashboard },
    ],
  },
  {
    group: 'My Content',
    items: [
      { label: 'Create Course', section: 'create', icon: PlusCircle },
      { label: 'My Courses', section: 'courses', icon: BookOpen },
      { label: 'Content Manager', section: 'content', icon: Video },
    ],
  },
  {
    group: 'Students',
    items: [
      { label: 'My Students', section: 'students', icon: Users },
      { label: 'Reviews & Feedback', section: 'reviews', icon: Star },
      { label: 'Q&A / Discussions', section: 'qa', icon: HelpCircle },
    ],
  },
  {
    group: 'Finance',
    items: [
      { label: 'Earnings', section: 'earnings', icon: DollarSign },
      { label: 'Coupons', section: 'coupons', icon: Tag },
    ],
  },
  {
    group: 'Account',
    items: [
      { label: 'Notifications', section: 'notifications', icon: Bell },
      { label: 'Profile & Settings', section: 'settings', icon: Settings },
    ],
  },
]

export default function InstructorDashboardLayout({ children, title, activeSection, onNavigate }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = async () => { await logout(); navigate('/') }

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Instructor'
  const initials = displayName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)

  const SidebarContent = () => (
    <>
      <div className="px-6 py-5 border-b" style={{ borderColor: '#E8E6FF' }}>
        <Link to="/" className="flex items-center gap-2 no-underline">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{ background: 'linear-gradient(135deg, #059669, #10B981)' }}>
            <GraduationCap size={16} />
          </div>
          <div>
            <span style={{ fontFamily: 'var(--font-logo)', fontWeight: 800, fontSize: '1rem', color: '#1a1a2e' }}>
              Instructor<span style={{ background: 'linear-gradient(135deg, #059669, #10B981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Hub</span>
            </span>
            <p className="text-[10px] text-gray-400 font-medium">ViscanoLearn</p>
          </div>
        </Link>
      </div>

      <div className="px-4 py-4 border-b" style={{ borderColor: '#E8E6FF' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm shrink-0" style={{ background: 'linear-gradient(135deg, #059669, #10B981)' }}>
            {initials}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-gray-900 truncate">{displayName}</p>
            <div className="flex items-center gap-1">
              <Star size={10} style={{ color: '#F59E0B', fill: '#F59E0B' }} />
              <span className="text-[10px] font-bold text-gray-500">4.9 · Top Instructor</span>
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {NAV.map(({ group, items }) => (
          <div key={group}>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-2 mt-4 first:mt-0">{group}</p>
            {items.map(({ label, section, icon: Icon }) => {
              const active = activeSection === section
              return (
                <button
                  key={section}
                  onClick={() => { onNavigate(section); setIsMobileMenuOpen(false) }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold mb-1 cursor-pointer border-none text-left transition-colors"
                  style={active ? { background: 'rgba(5,150,105,0.08)', color: '#059669' } : { background: 'transparent', color: '#6B7280' }}
                  onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = '#F9FAFB' }}
                  onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent' }}
                >
                  <Icon size={18} /> {label}
                </button>
              )
            })}
          </div>
        ))}
      </nav>

      <div className="px-3 py-4 border-t" style={{ borderColor: '#E8E6FF' }}>
        <Link to="/dashboard" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold no-underline mb-1 hover:bg-gray-50" style={{ color: '#6B7280' }}>
          <LayoutDashboard size={18} /> Student View
        </Link>
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold cursor-pointer border-none bg-transparent" style={{ color: '#EF4444' }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#FEF2F2')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
          <LogOut size={18} /> Logout
        </button>
      </div>
    </>
  )

  return (
    <div className="min-h-screen flex" style={{ background: '#F0FDF4' }}>
      <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r" style={{ background: '#fff', borderColor: '#D1FAE5', position: 'sticky', top: 0, height: '100vh' }}>
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 bg-black/40 z-[100] lg:hidden" />
            <motion.aside initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed inset-y-0 left-0 w-72 bg-white z-[101] shadow-2xl flex flex-col lg:hidden">
              <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-4 -right-12 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-lg border-none cursor-pointer"><X size={20} /></button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between px-6 py-4 border-b bg-white" style={{ borderColor: '#D1FAE5', position: 'sticky', top: 0, zIndex: 50 }}>
          <div className="flex items-center gap-3">
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center border bg-white cursor-pointer" style={{ borderColor: '#D1FAE5' }}><Menu size={20} /></button>
            <h1 className="text-lg font-black text-gray-900">{title}</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: '#F0FDF4', color: '#059669' }}>
              <Star size={12} style={{ fill: '#F59E0B', color: '#F59E0B' }} /> Top Rated Instructor
            </div>
            <button className="w-9 h-9 rounded-full flex items-center justify-center border bg-white cursor-pointer" style={{ borderColor: '#D1FAE5' }}><Bell size={16} className="text-gray-500" /></button>
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-xs" style={{ background: 'linear-gradient(135deg, #059669, #10B981)' }}>{initials}</div>
          </div>
        </header>
        <main className="flex-1 px-4 sm:px-6 py-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
