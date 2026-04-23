import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Menu, X, ArrowUpRight, ChevronDown, LogOut, LayoutDashboard,
  BookOpen, GitBranch, Radio, Users, Newspaper, Briefcase,
  Info, DollarSign, Phone, Star, ChevronRight,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

/* ─── nav structure ─────────────────────────────────────── */
const NAV_ITEMS = [
  {
    id: 1,
    label: 'Learn',
    subMenus: [
      {
        title: 'Self-Paced',
        items: [
          { label: 'All Courses',     description: 'Browse 500+ courses across every stack',  icon: BookOpen,  to: '/courses' },
          { label: 'Learning Paths',  description: 'Guided tracks from beginner to pro',       icon: GitBranch, to: '/learning-paths' },
        ],
      },
      {
        title: 'Live',
        items: [
          { label: 'Internship',      description: 'Work on real projects, not dummies',       icon: Briefcase, to: '/internship' },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Community',
    subMenus: [
      {
        title: 'Explore',
        items: [
          { label: 'Student Works',   description: 'See what our learners have built',         icon: Star,      to: '/student-works' },
          { label: 'Blogs',           description: 'Tutorials, insights & industry updates',   icon: Newspaper, to: '/blogs' },
        ],
      },
      {
        title: 'About',
        items: [
          { label: 'About Us',        description: 'Our story, team, and mission',             icon: Info,      to: '/about' },
        ],
      },
    ],
  },
  {
    id: 3,
    label: 'Live Classes',
    to: '/live',
  },
  {
    id: 4,
    label: 'Internship',
    to: '/internship',
  },
  {
    id: 5,
    label: 'Pricing',
    to: '/pricing',
  },
  {
    id: 6,
    label: 'Contact Us',
    to: '/contact',
  },
]

/* ─── desktop dropdown item ─────────────────────────────── */
function DropdownItem({ item }) {
  const Icon = item.icon
  return (
    <Link
      to={item.to}
      className="flex items-start gap-3 group no-underline"
    >
      <div
        className="border rounded-lg flex items-center justify-center shrink-0 transition-colors duration-200"
        style={{
          width: 36, height: 36,
          borderColor: 'rgba(0,0,0,0.09)',
          background: 'transparent',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(79,70,229,0.08)'; e.currentTarget.style.borderColor = 'rgba(79,70,229,0.25)' }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.09)' }}
      >
        <Icon size={16} style={{ color: '#6B7280' }} />
      </div>
      <div className="leading-5">
        <p className="text-sm font-semibold text-gray-800 group-hover:text-[#4F46E5] transition-colors duration-200">{item.label}</p>
        <p className="text-xs text-gray-400 group-hover:text-gray-600 transition-colors duration-200 mt-0.5">{item.description}</p>
      </div>
    </Link>
  )
}

/* ─── main component ─────────────────────────────────────── */
export default function Navbar() {
  const [openMenu, setOpenMenu]   = useState(null)
  const [hoverItem, setHoverItem] = useState(null)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState(null)
  const [scrolled, setScrolled]   = useState(false)
  const location  = useLocation()
  const navigate  = useNavigate()
  const { user, logout } = useAuth()
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // close dropdown on route change
  useEffect(() => { setOpenMenu(null); setMenuOpen(false) }, [location.pathname])

  // close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenMenu(null)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleLogout = async () => { await logout(); navigate('/') }

  const textColor = scrolled ? '#374151' : 'rgba(255,255,255,0.92)'
  const mutedColor = scrolled ? '#6B7280' : 'rgba(255,255,255,0.65)'

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-5 md:px-8"
      style={{
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.07), 0 4px 24px rgba(0,0,0,0.06)' : 'none',
        paddingTop: scrolled ? '12px' : '20px',
        paddingBottom: scrolled ? '12px' : '20px',
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">

        {/* ── Logo ── */}
        <Link
          to="/"
          className="flex items-center gap-1.5 no-underline flex-shrink-0"
          style={{ fontFamily: 'var(--font-logo)', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.02em' }}
        >
          <span style={{ color: scrolled ? '#4F46E5' : '#fff' }}>Viscano</span>
          <span style={{
            color: scrolled ? 'transparent' : 'rgba(255,255,255,0.7)',
            background: scrolled ? 'linear-gradient(135deg,#4F46E5,#7C3AED)' : 'none',
            WebkitBackgroundClip: scrolled ? 'text' : 'unset',
            backgroundClip: scrolled ? 'text' : 'unset',
          }}>Learn</span>
        </Link>

        {/* ── Desktop nav ── */}
        <ul className="hidden lg:flex items-center gap-0 list-none m-0 p-0">
          {NAV_ITEMS.map((item) => (
            <li
              key={item.id}
              className="relative"
              onMouseEnter={() => item.subMenus && setOpenMenu(item.label)}
              onMouseLeave={() => item.subMenus && setOpenMenu(null)}
            >
              {item.to && !item.subMenus ? (
                /* ── simple link ── */
                <Link
                  to={item.to}
                  className="relative flex items-center gap-1 px-4 py-2 text-sm font-semibold no-underline rounded-full transition-colors duration-200"
                  style={{ color: location.pathname === item.to ? '#4F46E5' : textColor }}
                  onMouseEnter={() => setHoverItem(item.id)}
                  onMouseLeave={() => setHoverItem(null)}
                >
                  {(hoverItem === item.id || location.pathname === item.to) && (
                    <motion.div
                      layoutId="nav-hover-bg"
                      className="absolute inset-0 rounded-full"
                      style={{ background: scrolled ? 'rgba(79,70,229,0.08)' : 'rgba(255,255,255,0.14)' }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                  {item.id === 4 && (
                    <span
                      className="relative z-10 ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold"
                      style={{ background: 'linear-gradient(135deg,#fbbf24,#f59e0b)', color: '#1c1917' }}
                    >
                      New
                    </span>
                  )}
                </Link>
              ) : (
                /* ── dropdown trigger ── */
                <button
                  className="relative flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-full cursor-pointer border-none bg-transparent transition-colors duration-200"
                  style={{ color: openMenu === item.label ? (scrolled ? '#4F46E5' : '#fff') : textColor }}
                  onMouseEnter={() => setHoverItem(item.id)}
                  onMouseLeave={() => setHoverItem(null)}
                >
                  {(hoverItem === item.id || openMenu === item.label) && (
                    <motion.div
                      layoutId="nav-hover-bg"
                      className="absolute inset-0 rounded-full"
                      style={{ background: scrolled ? 'rgba(79,70,229,0.08)' : 'rgba(255,255,255,0.14)' }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                  <motion.span
                    className="relative z-10"
                    animate={{ rotate: openMenu === item.label ? 180 : 0 }}
                    transition={{ duration: 0.22 }}
                  >
                    <ChevronDown size={14} />
                  </motion.span>
                </button>
              )}

              {/* ── Dropdown panel ── */}
              <AnimatePresence>
                {openMenu === item.label && item.subMenus && (
                  <div className="absolute left-0 top-full pt-3 z-50">
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                      className="rounded-2xl p-5 flex gap-8"
                      style={{
                        background: 'rgba(255,255,255,0.98)',
                        border: '1px solid rgba(0,0,0,0.08)',
                        boxShadow: '0 16px 48px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.06)',
                        backdropFilter: 'blur(20px)',
                        minWidth: 'max-content',
                      }}
                    >
                      {item.subMenus.map((sub) => (
                        <div key={sub.title} className="flex flex-col gap-4 min-w-[180px]">
                          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">{sub.title}</p>
                          <ul className="flex flex-col gap-4 list-none m-0 p-0">
                            {sub.items.map((subItem) => (
                              <li key={subItem.label} onClick={() => setOpenMenu(null)}>
                                <DropdownItem item={subItem} />
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>

        {/* ── Right actions (desktop) ── */}
        <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-semibold no-underline transition-colors"
                style={{ color: mutedColor }}
                onMouseEnter={(e) => e.currentTarget.style.color = scrolled ? '#111827' : '#fff'}
                onMouseLeave={(e) => e.currentTarget.style.color = mutedColor}
              >
                <LayoutDashboard size={14} /> Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-bold cursor-pointer border-none transition-all"
                style={{
                  background: scrolled ? 'linear-gradient(135deg,#4F46E5,#6D28D9)' : 'rgba(255,255,255,0.95)',
                  color: scrolled ? '#fff' : '#4F46E5',
                  boxShadow: '0 4px 14px rgba(79,70,229,0.25)',
                }}
              >
                <LogOut size={14} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-bold no-underline transition-all"
                style={{
                  background: scrolled ? 'linear-gradient(135deg,#4F46E5,#6D28D9)' : 'rgba(255,255,255,0.95)',
                  color: scrolled ? '#fff' : '#4F46E5',
                  boxShadow: '0 4px 14px rgba(79,70,229,0.25)',
                }}
              >
                Get Started <ArrowUpRight size={14} />
              </Link>
            </>
          )}
        </div>

        {/* ── Hamburger ── */}
        <motion.button
          className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center cursor-pointer border-none transition-all"
          style={{
            background: scrolled ? 'rgba(79,70,229,0.08)' : 'rgba(255,255,255,0.18)',
            backdropFilter: 'blur(10px)',
            color: scrolled ? '#4F46E5' : '#fff',
          }}
          onClick={() => setMenuOpen((o) => !o)}
          whileTap={{ scale: 0.9 }}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </motion.button>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden mt-3 max-w-7xl mx-auto rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.98)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(0,0,0,0.07)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
            }}
          >
            <div className="p-3">
              {NAV_ITEMS.map((item) => (
                <div key={item.id}>
                  {item.to && !item.subMenus ? (
                    <Link
                      to={item.to}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold no-underline transition-colors"
                      style={{
                        color: location.pathname === item.to ? '#4F46E5' : '#374151',
                        background: location.pathname === item.to ? 'rgba(79,70,229,0.08)' : 'transparent',
                      }}
                    >
                      <span>{item.label}</span>
                      {item.id === 4 && (
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold"
                          style={{ background: 'linear-gradient(135deg,#fbbf24,#f59e0b)', color: '#1c1917' }}>
                          New
                        </span>
                      )}
                    </Link>
                  ) : (
                    <>
                      <button
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold cursor-pointer border-none bg-transparent transition-colors text-left"
                        style={{ color: mobileExpanded === item.id ? '#4F46E5' : '#374151' }}
                        onClick={() => setMobileExpanded((p) => p === item.id ? null : item.id)}
                      >
                        <span>{item.label}</span>
                        <motion.span animate={{ rotate: mobileExpanded === item.id ? 180 : 0 }} transition={{ duration: 0.2 }}>
                          <ChevronDown size={15} style={{ color: '#9CA3AF' }} />
                        </motion.span>
                      </button>

                      <AnimatePresence>
                        {mobileExpanded === item.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="px-3 pb-2 flex flex-col gap-4">
                              {item.subMenus.map((sub) => (
                                <div key={sub.title}>
                                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-2 mb-2">{sub.title}</p>
                                  {sub.items.map((subItem) => {
                                    const Icon = subItem.icon
                                    return (
                                      <Link
                                        key={subItem.label}
                                        to={subItem.to}
                                        onClick={() => setMenuOpen(false)}
                                        className="flex items-center gap-3 px-2 py-2.5 rounded-xl no-underline transition-colors group"
                                        style={{ color: '#374151' }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(79,70,229,0.05)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                      >
                                        <div className="w-8 h-8 rounded-lg border border-gray-100 flex items-center justify-center shrink-0"
                                          style={{ background: 'rgba(79,70,229,0.06)' }}>
                                          <Icon size={14} style={{ color: '#4F46E5' }} />
                                        </div>
                                        <div>
                                          <p className="text-sm font-semibold text-gray-800">{subItem.label}</p>
                                          <p className="text-xs text-gray-400">{subItem.description}</p>
                                        </div>
                                        <ChevronRight size={14} className="ml-auto text-gray-300" />
                                      </Link>
                                    )
                                  })}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile CTA row */}
            <div
              className="flex gap-2 p-3 pt-0"
              style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
            >
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-sm font-bold no-underline border border-gray-100"
                    style={{ color: '#374151' }}
                  >
                    <LayoutDashboard size={14} /> Dashboard
                  </Link>
                  <button
                    onClick={() => { setMenuOpen(false); handleLogout() }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-sm font-bold cursor-pointer border-none"
                    style={{ background: 'linear-gradient(135deg,#4F46E5,#6D28D9)', color: '#fff' }}
                  >
                    <LogOut size={14} /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-sm font-bold no-underline"
                    style={{ background: 'linear-gradient(135deg,#4F46E5,#6D28D9)', color: '#fff' }}
                  >
                    Get Started <ArrowUpRight size={14} />
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
