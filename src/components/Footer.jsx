import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { X, Globe, Rss, Play, Camera } from 'lucide-react'

const links = {
  Product: [
    { label: 'Courses', to: '/courses' },
    { label: 'Learning Paths', to: '/learning-paths' },
    { label: 'Student Works', to: '/student-works' },
    { label: 'Blogs', to: '/blogs' },
  ],
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Careers', to: '#' },
    { label: 'Press', to: '#' },
    { label: 'Partners', to: '#' },
  ],
  Resources: [
    { label: 'Community', to: '#' },
    { label: 'Support', to: '#' },
    { label: 'Contact Us', to: '/contact' },
    { label: 'Privacy', to: '#' },
  ],
  Legal: [
    { label: 'Terms', to: '#' },
    { label: 'Privacy Policy', to: '#' },
    { label: 'Cookie Policy', to: '#' },
  ],
}

const socials = [
  { Icon: X, href: '#' },
  { Icon: Globe, href: '#' },
  { Icon: Rss, href: '#' },
  { Icon: Play, href: '#' },
  { Icon: Camera, href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-white border-t border-purple-50 pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <a href="#" className="flex items-center gap-2 no-underline mb-4" style={{ fontFamily: 'var(--font-logo)', fontWeight: 800, fontSize: '1.4rem', letterSpacing: '-0.02em', color: '#1a1a2e', lineHeight: 1 }}>
              Viscano<span style={{ background: 'linear-gradient(135deg, #4F46E5, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Learn</span>
            </a>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs mb-6">
              The platform that helps you master the future — one course at a time.
            </p>
            <div className="flex gap-3">
              {socials.map(({ Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  whileHover={{ scale: 1.15, color: '#6D28D9' }}
                  className="w-9 h-9 rounded-lg border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#6D28D9] hover:border-purple-200 transition-colors no-underline"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-4">{group}</h4>
              <ul className="list-none flex flex-col gap-2.5">
                {items.map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to} className="text-sm text-gray-400 hover:text-[#6D28D9] transition-colors no-underline">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">© 2026 Viscano Learn. All rights reserved.</p>
          <p className="text-xs text-dark-300">Built with love by Viscano Team.</p>
        </div>
      </div>
    </footer>
  )
}
