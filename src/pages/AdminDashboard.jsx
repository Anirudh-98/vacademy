import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users, BookOpen, DollarSign, TrendingUp, ArrowUpRight, Star,
  Eye, Award, Video, AlertCircle, CheckCircle, Clock, Search,
  Download, RefreshCw, Activity, ShoppingCart, UserPlus, Flag,
  Trash2, Edit3, Ban, UserCheck, ChevronDown, X, Plus, Send,
  BarChart2, Tag, Megaphone, Settings, MessageSquare, ThumbsDown,
  AlertTriangle, Shield, Percent, Mail, Palette, CreditCard,
  TrendingDown, MoreVertical
} from 'lucide-react'
import AdminDashboardLayout from '../components/AdminDashboardLayout'
import { courses } from '../data/courses'

/* ─── SECTION TITLES ─────────────────────────────────────── */
const SECTION_TITLES = {
  overview: 'Overview Dashboard',
  users: 'User Management',
  courses: 'Course Management',
  moderation: 'Content Moderation',
  revenue: 'Revenue & Payouts',
  coupons: 'Coupons & Discounts',
  analytics: 'Analytics',
  reviews: 'Reviews & Ratings',
  notifications: 'Notifications',
  settings: 'Settings',
}

/* ─── MOCK DATA ──────────────────────────────────────────── */

const allUsers = [
  { id: 1, name: 'Riya Sharma', email: 'riya.sharma@gmail.com', role: 'Student', status: 'Active', enrolled: 3, revenue: '—', joined: 'Apr 1, 2026', lastActive: '2 min ago', avatar: 'RS', color: '#4F46E5' },
  { id: 2, name: 'Arjun Verma', email: 'arjun.v@outlook.com', role: 'Student', status: 'Active', enrolled: 1, revenue: '—', joined: 'Apr 1, 2026', lastActive: '18 min ago', avatar: 'AV', color: '#059669' },
  { id: 3, name: 'Alex Johnson', email: 'alex.j@viscano.com', role: 'Instructor', status: 'Verified', enrolled: 0, revenue: '₹18.5L', joined: 'Jan 15, 2025', lastActive: '1 hr ago', avatar: 'AJ', color: '#7C3AED' },
  { id: 4, name: 'Meera Patel', email: 'meera.p@yahoo.com', role: 'Student', status: 'Active', enrolled: 5, revenue: '—', joined: 'Mar 20, 2026', lastActive: '3 hr ago', avatar: 'MP', color: '#D97706' },
  { id: 5, name: 'Priya Sharma', email: 'priya.s@viscano.com', role: 'Instructor', status: 'Verified', enrolled: 0, revenue: '₹22.1L', joined: 'Feb 1, 2025', lastActive: '5 hr ago', avatar: 'PS', color: '#DC2626' },
  { id: 6, name: 'Kiran Rao', email: 'kiran.rao@gmail.com', role: 'Student', status: 'Suspended', enrolled: 2, revenue: '—', joined: 'Mar 10, 2026', lastActive: '2 days ago', avatar: 'KR', color: '#6B7280' },
  { id: 7, name: 'Saurabh Joshi', email: 'saurabh.j@proton.me', role: 'Student', status: 'Active', enrolled: 4, revenue: '—', joined: 'Feb 28, 2026', lastActive: '8 hr ago', avatar: 'SJ', color: '#0891B2' },
  { id: 8, name: 'David Kim', email: 'david.k@viscano.com', role: 'Instructor', status: 'Pending', enrolled: 0, revenue: '₹19.8L', joined: 'Mar 5, 2025', lastActive: '1 day ago', avatar: 'DK', color: '#EA580C' },
]

const allCoursesData = courses.map((c, i) => ({
  ...c,
  status: ['Published', 'Published', 'Pending', 'Published', 'Published', 'Draft', 'Published', 'Rejected', 'Published', 'Published', 'Pending', 'Published', 'Draft', 'Published', 'Published'][i],
  enrollments: ['12,400', '18,200', '9,100', '21,000', '15,000', '7,000', '8,500', '6,200', '4,300', '11,000', '19,500', '8,800', '13,200', '14,700', '10,600'][i],
  revenue: ['₹18.5L', '₹22.1L', '₹8.2L', '₹19.8L', '₹14.3L', '₹5.9L', '₹8.7L', '₹3.2L', '₹3.4L', '₹12.1L', '₹11.2L', '₹9.2L', '₹11.6L', '₹13.2L', '₹12.1L'][i],
  qualityScore: [92, 95, 89, 88, 94, 72, 85, 61, 90, 91, 78, 87, 88, 84, 93][i],
  completionRate: [78, 82, 91, 74, 85, 68, 79, 55, 88, 71, 76, 83, 80, 72, 86][i],
}))

const reportedContent = [
  { id: 1, type: 'Course', title: 'Cybersecurity Fundamentals', instructor: 'Rahul Mehta', reason: 'Copyright violation - uses unlicensed video content', reporter: 'User #4821', date: 'Apr 1, 2026', strikes: 1, severity: 'High' },
  { id: 2, type: 'Review', title: 'Fake review on React course', instructor: 'N/A', reason: 'Spam / Fake review with generic text', reporter: 'System Flag', date: 'Mar 31, 2026', strikes: 0, severity: 'Medium' },
  { id: 3, type: 'Course', title: 'Advanced TypeScript Patterns', instructor: 'Lisa Park', reason: 'Outdated content, misleading curriculum', reporter: 'User #1203', date: 'Mar 30, 2026', strikes: 0, severity: 'Low' },
  { id: 4, type: 'Instructor', title: 'Instructor: James Wu', instructor: 'James Wu', reason: 'Multiple student complaints about no responses', reporter: 'System', date: 'Mar 29, 2026', strikes: 2, severity: 'High' },
]

const payoutQueue = [
  { instructor: 'Alex Johnson', amount: '₹1,54,125', period: 'March 2026', courses: 3, status: 'Pending', method: 'Bank Transfer', submitted: 'Apr 1, 2026' },
  { instructor: 'Priya Sharma', amount: '₹1,86,480', period: 'March 2026', courses: 2, status: 'Pending', method: 'UPI', submitted: 'Apr 1, 2026' },
  { instructor: 'David Kim', amount: '₹1,68,300', period: 'March 2026', courses: 1, status: 'Processing', method: 'Bank Transfer', submitted: 'Mar 31, 2026' },
  { instructor: 'Sara Lopez', amount: '₹1,22,050', period: 'March 2026', courses: 1, status: 'Completed', method: 'UPI', submitted: 'Mar 28, 2026' },
  { instructor: 'Carlos Lima', amount: '₹1,02,900', period: 'March 2026', courses: 1, status: 'Completed', method: 'Bank Transfer', submitted: 'Mar 27, 2026' },
]

const couponsData = [
  { code: 'LAUNCH50', discount: '50%', type: 'Percentage', uses: 142, limit: 200, expiry: 'Apr 30, 2026', scope: 'Global', status: 'Active' },
  { code: 'REACT200', discount: '₹200', type: 'Fixed', uses: 89, limit: 100, expiry: 'Apr 15, 2026', scope: 'React Course', status: 'Active' },
  { code: 'NEWUSER30', discount: '30%', type: 'Percentage', uses: 312, limit: 500, expiry: 'May 31, 2026', scope: 'Global', status: 'Active' },
  { code: 'SUMMER25', discount: '25%', type: 'Percentage', uses: 200, limit: 200, expiry: 'Mar 31, 2026', scope: 'Global', status: 'Expired' },
]

const allReviews = [
  { id: 1, student: 'Aarav Singh', course: 'React & Next.js: Zero to Hero', rating: 5, text: 'Absolutely phenomenal course! Best investment for my career.', date: 'Apr 1, 2026', status: 'Published', flagged: false },
  { id: 2, student: 'Bot Account', course: 'Python for Data Science', rating: 5, text: 'Great course great course great course great course great', date: 'Apr 1, 2026', status: 'Flagged', flagged: true },
  { id: 3, student: 'Fatima Khan', course: 'System Design', rating: 5, text: 'Got my FAANG interview prep done with this alone!', date: 'Mar 31, 2026', status: 'Published', flagged: false },
  { id: 4, student: 'Unknown User', course: 'AWS Cloud Practitioner', rating: 1, text: 'Course is completely useless. Total scam.', date: 'Mar 30, 2026', status: 'Flagged', flagged: true },
  { id: 5, student: 'Rohan Das', course: 'Advanced TypeScript', rating: 4, text: 'Great advanced content. Would love more real-world examples.', date: 'Mar 29, 2026', status: 'Published', flagged: false },
]

const notifHistory = [
  { title: 'April Sale - 50% Off All Courses', target: 'All Users', sent: '8,420 users', date: 'Mar 30, 2026', type: 'Promotion' },
  { title: 'New Course: Generative AI Now Live', target: 'Development Students', sent: '3,200 users', date: 'Mar 25, 2026', type: 'Announcement' },
  { title: 'Payout Processed for March', target: 'All Instructors', sent: '12 instructors', date: 'Apr 1, 2026', type: 'Finance' },
]

const revenueMonths = [
  { month: 'Oct', gross: 38, commission: 7.6, instructor: 30.4 },
  { month: 'Nov', gross: 42, commission: 8.4, instructor: 33.6 },
  { month: 'Dec', gross: 55, commission: 11, instructor: 44 },
  { month: 'Jan', gross: 44, commission: 8.8, instructor: 35.2 },
  { month: 'Feb', gross: 48, commission: 9.6, instructor: 38.4 },
  { month: 'Mar', gross: 62, commission: 12.4, instructor: 49.6 },
]

const instructorLeaderboard = [
  { name: 'Priya Sharma', revenue: '₹22.1L', students: '18,200', rating: 4.8, courses: 2, growth: '+18%' },
  { name: 'David Kim', revenue: '₹19.8L', students: '21,000', rating: 4.7, courses: 1, growth: '+12%' },
  { name: 'Alex Johnson', revenue: '₹18.5L', students: '12,400', rating: 4.9, courses: 1, growth: '+22%' },
  { name: 'Sara Lopez', revenue: '₹14.3L', students: '15,000', rating: 4.9, courses: 1, growth: '+9%' },
  { name: 'Ananya Roy', revenue: '₹11.2L', students: '19,500', rating: 4.6, courses: 1, growth: '+31%' },
]

const dropOffData = [
  { lesson: 'Intro (L1)', completion: 98 },
  { lesson: 'Setup (L5)', completion: 84 },
  { lesson: 'Core (L15)', completion: 71 },
  { lesson: 'Advanced (L30)', completion: 58 },
  { lesson: 'Project (L45)', completion: 44 },
  { lesson: 'Final (L60)', completion: 36 },
]

/* ─── SECTION PANELS ─────────────────────────────────────── */

function FadeIn({ children, delay = 0 }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.3 }}>
      {children}
    </motion.div>
  )
}

function Card({ children, className = '', style = {} }) {
  return (
    <div className={`bg-white rounded-2xl border ${className}`} style={{ borderColor: '#FCE8E8', ...style }}>
      {children}
    </div>
  )
}

function StatusBadge({ status }) {
  const map = {
    Active: { bg: '#F0FDF4', color: '#16A34A' },
    Verified: { bg: '#EEF2FF', color: '#4F46E5' },
    Suspended: { bg: '#FEF2F2', color: '#DC2626' },
    Pending: { bg: '#FFFBEB', color: '#D97706' },
    Published: { bg: '#F0FDF4', color: '#16A34A' },
    Draft: { bg: '#F3F4F6', color: '#6B7280' },
    Rejected: { bg: '#FEF2F2', color: '#DC2626' },
    Flagged: { bg: '#FEF2F2', color: '#DC2626' },
    Completed: { bg: '#F0FDF4', color: '#16A34A' },
    Processing: { bg: '#EEF2FF', color: '#4F46E5' },
    Expired: { bg: '#F3F4F6', color: '#9CA3AF' },
  }
  const s = map[status] || { bg: '#F3F4F6', color: '#6B7280' }
  return <span className="text-[10px] font-black px-2 py-0.5 rounded-full" style={s}>{status}</span>
}

/* 4.1 Overview */
function OverviewSection() {
  const kpis = [
    { label: 'Gross Revenue (Mar)', value: '₹62.5L', change: '+29.7% MoM', up: true, icon: DollarSign, color: '#D97706', bg: '#FFFBEB' },
    { label: 'Active Users (DAU)', value: '1,247', change: '+8.2% vs last week', up: true, icon: Activity, color: '#4F46E5', bg: '#EEF2FF' },
    { label: 'Monthly Active (MAU)', value: '18,420', change: '64.7% retention', up: true, icon: Users, color: '#059669', bg: '#F0FDF4' },
    { label: 'Total Courses', value: '15', change: '2 pending review', up: null, icon: BookOpen, color: '#7C3AED', bg: '#F5F3FF' },
    { label: 'Conversion Rate', value: '4.2%', change: '+0.4% this month', up: true, icon: TrendingUp, color: '#0891B2', bg: '#F0F9FF' },
    { label: 'Refund Requests', value: '14', change: '2 open · 12 resolved', up: false, icon: AlertCircle, color: '#DC2626', bg: '#FEF2F2' },
  ]

  const recentTx = [
    { student: 'Riya Sharma', course: 'React & Next.js', amount: '₹4,499', time: '2 min ago', status: 'Completed' },
    { student: 'Arjun Verma', course: 'System Design', amount: '₹4,999', time: '14 min ago', status: 'Completed' },
    { student: 'Meera Patel', course: 'Python for Data Science', amount: '₹4,799', time: '31 min ago', status: 'Refund Req.' },
    { student: 'Kiran Rao', course: 'AWS Cloud Practitioner', amount: '₹4,999', time: '1 hr ago', status: 'Completed' },
    { student: 'Preethi Nair', course: 'Machine Learning A-Z', amount: '₹4,899', time: '2 hr ago', status: 'Completed' },
  ]

  const topSelling = courses.slice(0, 5).map((c, i) => ({
    ...c,
    revenue: ['₹22.1L', '₹19.8L', '₹18.5L', '₹14.3L', '₹13.2L'][i],
    enrollments: ['18,200', '21,000', '12,400', '15,000', '13,200'][i],
  }))

  const max = Math.max(...revenueMonths.map((d) => d.gross))

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpis.map((k, i) => {
          const Icon = k.icon
          return (
            <FadeIn key={k.label} delay={i * 0.06}>
              <Card className="p-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-2" style={{ background: k.bg }}>
                  <Icon size={16} style={{ color: k.color }} />
                </div>
                <p className="text-xl font-black text-gray-900">{k.value}</p>
                <p className="text-[11px] font-bold text-gray-500 mt-0.5">{k.label}</p>
                {k.up !== null && (
                  <p className="text-[10px] mt-1 font-semibold" style={{ color: k.up ? '#16A34A' : '#DC2626' }}>
                    {k.up ? '↑' : '↓'} {k.change}
                  </p>
                )}
                {k.up === null && <p className="text-[10px] mt-1 text-gray-400">{k.change}</p>}
              </Card>
            </FadeIn>
          )
        })}
      </div>

      {/* Revenue Chart + Top Selling */}
      <div className="grid lg:grid-cols-3 gap-4">
        <FadeIn delay={0.2} className="lg:col-span-2">
          <Card className="p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-black text-gray-900">Revenue Overview (6M)</h3>
                <p className="text-xs text-gray-400 mt-0.5">Gross · Commission (20%) · Instructor (80%)</p>
              </div>
              <button className="p-2 rounded-lg border text-gray-400 cursor-pointer" style={{ borderColor: '#E5E7EB' }}><Download size={14} /></button>
            </div>
            <div className="flex items-end gap-2 h-36">
              {revenueMonths.map((d, i) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
                  <div className="w-full flex flex-col justify-end gap-0.5 rounded-t-lg overflow-hidden relative group" style={{ height: `${(d.gross / max) * 144}px`, minHeight: 8 }}>
                    <div className="w-full rounded-t-lg" style={{ height: `${(d.commission / d.gross) * 100}%`, background: '#FCA5A5' }} />
                    <div className="w-full" style={{ height: `${(d.instructor / d.gross) * 100}%`, background: i === revenueMonths.length - 1 ? '#DC2626' : '#FECACA' }} />
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none">
                      ₹{d.gross}L total
                    </div>
                  </div>
                  <span className="text-[11px] text-gray-500">{d.month}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-3 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded-sm inline-block" style={{ background: '#DC2626' }} /> Instructor (80%)</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded-sm inline-block" style={{ background: '#FCA5A5' }} /> Platform (20%)</span>
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={0.25}>
          <Card className="p-5">
            <h3 className="font-black text-gray-900 mb-4">Top Selling Courses</h3>
            <div className="space-y-3">
              {topSelling.map((c, i) => (
                <div key={c.id} className="flex items-center gap-3">
                  <span className="text-xs font-black text-gray-300 w-4">#{i + 1}</span>
                  <img src={c.image} className="w-8 h-8 rounded-lg object-cover" alt="" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-800 truncate">{c.title}</p>
                    <p className="text-[10px] text-gray-400">{c.enrollments} enrolled</p>
                  </div>
                  <p className="text-xs font-black" style={{ color: '#16A34A' }}>{c.revenue}</p>
                </div>
              ))}
            </div>
          </Card>
        </FadeIn>
      </div>

      {/* Recent Transactions + Refund Requests */}
      <div className="grid lg:grid-cols-2 gap-4">
        <FadeIn delay={0.3}>
          <Card className="overflow-hidden">
            <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: '#FCE8E8' }}>
              <h3 className="font-black text-gray-900">Recent Transactions</h3>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full" style={{ background: '#F0FDF4', color: '#16A34A' }}>Live</span>
            </div>
            <div className="divide-y" style={{ borderColor: '#FFF5F5' }}>
              {recentTx.map((tx, i) => (
                <div key={i} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-xs shrink-0" style={{ background: '#4F46E5' }}>
                    {tx.student.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-800">{tx.student}</p>
                    <p className="text-[11px] text-gray-400 truncate">{tx.course}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-gray-900">{tx.amount}</p>
                    <StatusBadge status={tx.status === 'Refund Req.' ? 'Flagged' : 'Completed'} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={0.35}>
          <Card className="p-5">
            <h3 className="font-black text-gray-900 mb-4">Refund Requests Snapshot</h3>
            <div className="space-y-3">
              {[
                { student: 'Meera Patel', course: 'Python for Data Science', amount: '₹4,799', reason: 'Course content not as described', status: 'Open' },
                { student: 'Dev Malhotra', course: 'Flutter Course', amount: '₹3,799', reason: 'Technical issues with videos', status: 'Open' },
                { student: 'Tanvi Gupta', course: 'React & Next.js', amount: '₹4,499', reason: 'Purchased by mistake', status: 'Resolved' },
              ].map((r, i) => (
                <div key={i} className="p-3 rounded-xl border" style={{ borderColor: r.status === 'Open' ? '#FCA5A5' : '#D1FAE5', background: r.status === 'Open' ? '#FFF5F5' : '#F0FDF4' }}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-bold text-gray-900">{r.student} · {r.amount}</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">{r.course}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5 italic">"{r.reason}"</p>
                    </div>
                    <StatusBadge status={r.status === 'Open' ? 'Pending' : 'Completed'} />
                  </div>
                  {r.status === 'Open' && (
                    <div className="flex gap-2 mt-2">
                      <button className="text-[11px] font-bold px-2.5 py-1 rounded-lg border-none cursor-pointer" style={{ background: '#DC2626', color: '#fff' }}>Approve Refund</button>
                      <button className="text-[11px] font-bold px-2.5 py-1 rounded-lg border cursor-pointer bg-white" style={{ borderColor: '#E5E7EB', color: '#6B7280' }}>Deny</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </FadeIn>
      </div>
    </div>
  )
}

/* 4.2 User Management */
function UsersSection() {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const filtered = allUsers.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    const matchRole = roleFilter === 'All' || u.role === roleFilter
    const matchStatus = statusFilter === 'All' || u.status === statusFilter
    return matchSearch && matchRole && matchStatus
  })

  return (
    <div className="space-y-5">
      <FadeIn>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Users', value: '2,847', icon: Users, color: '#4F46E5', bg: '#EEF2FF' },
            { label: 'Students', value: '2,835', icon: Users, color: '#059669', bg: '#F0FDF4' },
            { label: 'Instructors', value: '12', icon: UserCheck, color: '#D97706', bg: '#FFFBEB' },
            { label: 'Suspended', value: '3', icon: Ban, color: '#DC2626', bg: '#FEF2F2' },
          ].map((s) => {
            const Icon = s.icon
            return (
              <Card key={s.label} className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: s.bg }}><Icon size={16} style={{ color: s.color }} /></div>
                  <div><p className="text-lg font-black text-gray-900">{s.value}</p><p className="text-xs text-gray-400">{s.label}</p></div>
                </div>
              </Card>
            )
          })}
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <Card className="overflow-hidden">
          <div className="px-5 py-4 border-b flex flex-wrap gap-3 items-center" style={{ borderColor: '#FCE8E8' }}>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl border flex-1 min-w-48" style={{ borderColor: '#E5E7EB' }}>
              <Search size={14} className="text-gray-400" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name or email…" className="outline-none text-sm text-gray-700 flex-1 bg-transparent" />
            </div>
            <div className="flex gap-2">
              {['All', 'Student', 'Instructor'].map((r) => (
                <button key={r} onClick={() => setRoleFilter(r)} className="px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer border-none" style={roleFilter === r ? { background: '#DC2626', color: '#fff' } : { background: '#F3F4F6', color: '#6B7280' }}>{r}</button>
              ))}
            </div>
            <div className="flex gap-2">
              {['All', 'Active', 'Verified', 'Pending', 'Suspended'].map((s) => (
                <button key={s} onClick={() => setStatusFilter(s)} className="px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer border-none" style={statusFilter === s ? { background: '#4F46E5', color: '#fff' } : { background: '#F3F4F6', color: '#6B7280' }}>{s}</button>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: '#FFF5F5' }}>
                  <th className="text-left px-5 py-3 text-[11px] font-black text-gray-400 uppercase tracking-wider">User</th>
                  <th className="text-left px-4 py-3 text-[11px] font-black text-gray-400 uppercase tracking-wider">Role</th>
                  <th className="text-left px-4 py-3 text-[11px] font-black text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="text-right px-4 py-3 text-[11px] font-black text-gray-400 uppercase tracking-wider">Courses</th>
                  <th className="text-right px-4 py-3 text-[11px] font-black text-gray-400 uppercase tracking-wider">Revenue</th>
                  <th className="text-right px-4 py-3 text-[11px] font-black text-gray-400 uppercase tracking-wider">Last Active</th>
                  <th className="text-right px-4 py-3 text-[11px] font-black text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id} className="border-t hover:bg-gray-50" style={{ borderColor: '#FFF5F5' }}>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-xs shrink-0" style={{ background: u.color }}>{u.avatar}</div>
                        <div><p className="text-xs font-bold text-gray-900">{u.name}</p><p className="text-[11px] text-gray-400">{u.email}</p></div>
                      </div>
                    </td>
                    <td className="px-4 py-3"><span className="text-xs font-semibold text-gray-600">{u.role}</span></td>
                    <td className="px-4 py-3"><StatusBadge status={u.status} /></td>
                    <td className="px-4 py-3 text-right text-xs font-bold text-gray-700">{u.enrolled}</td>
                    <td className="px-4 py-3 text-right text-xs font-black" style={{ color: u.revenue !== '—' ? '#16A34A' : '#9CA3AF' }}>{u.revenue}</td>
                    <td className="px-4 py-3 text-right text-xs text-gray-400">{u.lastActive}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-blue-50 cursor-pointer border-none bg-transparent" title="View Profile"><Eye size={13} style={{ color: '#4F46E5' }} /></button>
                        {u.status !== 'Suspended' && <button className="p-1.5 rounded-lg hover:bg-red-50 cursor-pointer border-none bg-transparent" title="Suspend"><Ban size={13} style={{ color: '#DC2626' }} /></button>}
                        {u.role === 'Student' && <button className="p-1.5 rounded-lg hover:bg-green-50 cursor-pointer border-none bg-transparent" title="Make Instructor"><UserCheck size={13} style={{ color: '#059669' }} /></button>}
                        {u.role === 'Instructor' && u.status === 'Pending' && <button className="p-1.5 rounded-lg hover:bg-green-50 cursor-pointer border-none bg-transparent" title="Verify Instructor"><CheckCircle size={13} style={{ color: '#059669' }} /></button>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t text-xs text-gray-400" style={{ borderColor: '#FCE8E8' }}>Showing {filtered.length} of {allUsers.length} users</div>
        </Card>
      </FadeIn>
    </div>
  )
}

/* 4.3 Course Management */
function CoursesSection() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const filtered = allCoursesData.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.instructor.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All' || c.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div className="space-y-5">
      <FadeIn>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Courses', value: '15', color: '#4F46E5', bg: '#EEF2FF' },
            { label: 'Published', value: '10', color: '#16A34A', bg: '#F0FDF4' },
            { label: 'Pending Review', value: '3', color: '#D97706', bg: '#FFFBEB' },
            { label: 'Rejected/Draft', value: '2', color: '#DC2626', bg: '#FEF2F2' },
          ].map((s) => (
            <Card key={s.label} className="p-4">
              <p className="text-2xl font-black" style={{ color: s.color }}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </Card>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <Card className="overflow-hidden">
          <div className="px-5 py-4 border-b flex flex-wrap gap-3 items-center" style={{ borderColor: '#FCE8E8' }}>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl border flex-1 min-w-48" style={{ borderColor: '#E5E7EB' }}>
              <Search size={14} className="text-gray-400" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search course or instructor…" className="outline-none text-sm text-gray-700 flex-1 bg-transparent" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {['All', 'Published', 'Pending', 'Draft', 'Rejected'].map((s) => (
                <button key={s} onClick={() => setStatusFilter(s)} className="px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer border-none" style={statusFilter === s ? { background: '#DC2626', color: '#fff' } : { background: '#F3F4F6', color: '#6B7280' }}>{s}</button>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: '#FFF5F5' }}>
                  <th className="text-left px-5 py-3 text-[11px] font-black text-gray-400 uppercase tracking-wider">Course</th>
                  <th className="text-left px-4 py-3 text-[11px] font-black text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="text-right px-4 py-3 text-[11px] font-black text-gray-400 uppercase tracking-wider">Price</th>
                  <th className="text-right px-4 py-3 text-[11px] font-black text-gray-400 uppercase tracking-wider">Rating</th>
                  <th className="text-right px-4 py-3 text-[11px] font-black text-gray-400 uppercase tracking-wider">Enrollments</th>
                  <th className="text-right px-4 py-3 text-[11px] font-black text-gray-400 uppercase tracking-wider">Quality</th>
                  <th className="text-right px-4 py-3 text-[11px] font-black text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} className="border-t hover:bg-gray-50" style={{ borderColor: '#FFF5F5' }}>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <img src={c.image} className="w-10 h-8 rounded-lg object-cover" alt="" />
                        <div>
                          <p className="text-xs font-bold text-gray-900 max-w-48 truncate">{c.title}</p>
                          <p className="text-[11px] text-gray-400">{c.instructor}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                    <td className="px-4 py-3 text-right text-xs font-bold text-gray-700">{c.price}</td>
                    <td className="px-4 py-3 text-right">
                      <span className="flex items-center justify-end gap-1 text-xs font-bold text-gray-700">
                        <Star size={10} style={{ color: '#F59E0B', fill: '#F59E0B' }} />{c.rating}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-xs font-bold text-gray-700">{c.enrollments}</td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-xs font-black" style={{ color: c.qualityScore >= 85 ? '#16A34A' : c.qualityScore >= 70 ? '#D97706' : '#DC2626' }}>
                        {c.qualityScore}/100
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {c.status === 'Pending' && <>
                          <button className="p-1.5 rounded-lg hover:bg-green-50 cursor-pointer border-none bg-transparent" title="Approve"><CheckCircle size={13} style={{ color: '#059669' }} /></button>
                          <button className="p-1.5 rounded-lg hover:bg-red-50 cursor-pointer border-none bg-transparent" title="Reject"><X size={13} style={{ color: '#DC2626' }} /></button>
                        </>}
                        <button className="p-1.5 rounded-lg hover:bg-blue-50 cursor-pointer border-none bg-transparent" title="Edit"><Edit3 size={13} style={{ color: '#4F46E5' }} /></button>
                        <button className="p-1.5 rounded-lg hover:bg-yellow-50 cursor-pointer border-none bg-transparent" title="Flag"><Flag size={13} style={{ color: '#D97706' }} /></button>
                        <button className="p-1.5 rounded-lg hover:bg-red-50 cursor-pointer border-none bg-transparent" title="Delete"><Trash2 size={13} style={{ color: '#DC2626' }} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </FadeIn>
    </div>
  )
}

/* 4.4 Content Moderation */
function ModerationSection() {
  return (
    <div className="space-y-5">
      <FadeIn>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Open Reports', value: '4', color: '#DC2626', bg: '#FEF2F2', icon: Flag },
            { label: 'Copyright Claims', value: '1', color: '#D97706', bg: '#FFFBEB', icon: AlertTriangle },
            { label: 'Fake Reviews', value: '2', color: '#7C3AED', bg: '#F5F3FF', icon: MessageSquare },
            { label: 'Instructors on Strike', value: '1', color: '#DC2626', bg: '#FEF2F2', icon: Shield },
          ].map((s) => {
            const Icon = s.icon
            return (
              <Card key={s.label} className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: s.bg }}><Icon size={16} style={{ color: s.color }} /></div>
                  <div><p className="text-xl font-black" style={{ color: s.color }}>{s.value}</p><p className="text-xs text-gray-500">{s.label}</p></div>
                </div>
              </Card>
            )
          })}
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <Card className="overflow-hidden">
          <div className="px-5 py-4 border-b" style={{ borderColor: '#FCE8E8' }}>
            <h3 className="font-black text-gray-900">Reported Content</h3>
          </div>
          <div className="divide-y" style={{ borderColor: '#FFF5F5' }}>
            {reportedContent.map((r) => (
              <div key={r.id} className="p-5 hover:bg-gray-50">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full" style={{ background: '#FEF2F2', color: '#DC2626' }}>{r.type}</span>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full" style={r.severity === 'High' ? { background: '#FEF2F2', color: '#DC2626' } : r.severity === 'Medium' ? { background: '#FFFBEB', color: '#D97706' } : { background: '#F3F4F6', color: '#6B7280' }}>{r.severity}</span>
                      {'⚡'.repeat(r.strikes)} <span className="text-xs text-gray-400">{r.strikes}/3 strikes</span>
                    </div>
                    <p className="font-bold text-gray-900 text-sm">{r.title}</p>
                    <p className="text-xs text-gray-500 mt-1">Reason: {r.reason}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">Reported by {r.reporter} · {r.date}</p>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    <button className="text-[11px] font-bold px-3 py-1.5 rounded-xl border-none cursor-pointer text-white" style={{ background: '#DC2626' }}>Remove Content</button>
                    <button className="text-[11px] font-bold px-3 py-1.5 rounded-xl border-none cursor-pointer text-white" style={{ background: '#D97706' }}>Warn Instructor</button>
                    <button className="text-[11px] font-bold px-3 py-1.5 rounded-xl border cursor-pointer bg-white" style={{ borderColor: '#E5E7EB', color: '#6B7280' }}>Dismiss</button>
                  </div>
                </div>
                {/* Strike visualization */}
                <div className="flex items-center gap-1.5 mt-3">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="w-6 h-1.5 rounded-full" style={{ background: i < r.strikes ? '#DC2626' : '#E5E7EB' }} />
                  ))}
                  <span className="text-[10px] text-gray-400 ml-1">{3 - r.strikes} strikes until ban</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </FadeIn>
    </div>
  )
}

/* 4.5 Revenue & Payouts */
function RevenueSection() {
  const grossTotal = revenueMonths.reduce((a, b) => a + b.gross, 0)
  const commissionTotal = revenueMonths.reduce((a, b) => a + b.commission, 0)
  const instructorTotal = revenueMonths.reduce((a, b) => a + b.instructor, 0)

  return (
    <div className="space-y-5">
      <FadeIn>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Gross Revenue (6M)', value: `₹${grossTotal}L`, color: '#D97706', bg: '#FFFBEB', icon: DollarSign },
            { label: 'Platform Commission', value: `₹${commissionTotal}L`, color: '#4F46E5', bg: '#EEF2FF', icon: Percent },
            { label: 'Instructor Earnings', value: `₹${instructorTotal}L`, color: '#059669', bg: '#F0FDF4', icon: UserCheck },
            { label: 'Pending Payouts', value: '₹5.08L', color: '#DC2626', bg: '#FEF2F2', icon: Clock },
          ].map((s) => {
            const Icon = s.icon
            return (
              <Card key={s.label} className="p-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-2" style={{ background: s.bg }}><Icon size={16} style={{ color: s.color }} /></div>
                <p className="text-xl font-black text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
              </Card>
            )
          })}
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <Card className="overflow-hidden">
          <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: '#FCE8E8' }}>
            <h3 className="font-black text-gray-900">Payout Queue</h3>
            <div className="flex items-center gap-2">
              <button className="text-xs font-bold px-3 py-1.5 rounded-lg border-none cursor-pointer text-white" style={{ background: '#059669' }}>Approve All Pending</button>
              <button className="text-xs font-bold px-3 py-1.5 rounded-lg border cursor-pointer bg-white" style={{ borderColor: '#E5E7EB', color: '#6B7280' }}>Export CSV</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: '#FFF5F5' }}>
                  {['Instructor', 'Amount', 'Period', 'Method', 'Submitted', 'Status', 'Action'].map((h) => (
                    <th key={h} className="px-5 py-3 text-[11px] font-black text-gray-400 uppercase tracking-wider text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {payoutQueue.map((p, i) => (
                  <tr key={i} className="border-t hover:bg-gray-50" style={{ borderColor: '#FFF5F5' }}>
                    <td className="px-5 py-3 text-xs font-bold text-gray-900">{p.instructor}</td>
                    <td className="px-5 py-3 text-xs font-black" style={{ color: '#16A34A' }}>{p.amount}</td>
                    <td className="px-5 py-3 text-xs text-gray-500">{p.period}</td>
                    <td className="px-5 py-3 text-xs text-gray-500">{p.method}</td>
                    <td className="px-5 py-3 text-xs text-gray-400">{p.submitted}</td>
                    <td className="px-5 py-3"><StatusBadge status={p.status} /></td>
                    <td className="px-5 py-3">
                      {p.status === 'Pending' && (
                        <div className="flex gap-1">
                          <button className="text-[11px] font-bold px-2.5 py-1 rounded-lg border-none cursor-pointer text-white" style={{ background: '#059669' }}>Approve</button>
                          <button className="text-[11px] font-bold px-2.5 py-1 rounded-lg border cursor-pointer bg-white" style={{ borderColor: '#E5E7EB', color: '#6B7280' }}>Hold</button>
                        </div>
                      )}
                      {p.status !== 'Pending' && <span className="text-xs text-gray-400">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </FadeIn>

      <FadeIn delay={0.2}>
        <Card className="p-5">
          <h3 className="font-black text-gray-900 mb-4">Commission Settings</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: 'Platform Commission', value: '20%', desc: 'Default platform fee on all sales' },
              { label: 'Instructor Share', value: '80%', desc: 'Instructor earnings after commission' },
              { label: 'Payout Cycle', value: 'Monthly', desc: 'Processed on 1st of each month' },
            ].map((s) => (
              <div key={s.label} className="p-4 rounded-xl border" style={{ borderColor: '#FCE8E8', background: '#FFF5F5' }}>
                <p className="text-2xl font-black text-gray-900">{s.value}</p>
                <p className="text-xs font-bold text-gray-600 mt-0.5">{s.label}</p>
                <p className="text-[11px] text-gray-400 mt-1">{s.desc}</p>
                <button className="mt-2 text-[11px] font-bold" style={{ color: '#DC2626', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Edit</button>
              </div>
            ))}
          </div>
        </Card>
      </FadeIn>
    </div>
  )
}

/* 4.6 Coupons */
function CouponsSection() {
  const [showCreate, setShowCreate] = useState(false)
  const [code, setCode] = useState('')
  const [discount, setDiscount] = useState('')
  const [expiry, setExpiry] = useState('')
  const [limit, setLimit] = useState('')

  return (
    <div className="space-y-5">
      <FadeIn>
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-gray-900">Coupon Codes</h3>
            <button onClick={() => setShowCreate(!showCreate)} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white border-none cursor-pointer" style={{ background: '#DC2626' }}>
              <Plus size={14} /> Create Coupon
            </button>
          </div>

          {showCreate && (
            <div className="mb-5 p-4 rounded-2xl border" style={{ borderColor: '#FCE8E8', background: '#FFF5F5' }}>
              <h4 className="font-bold text-gray-800 mb-3">New Coupon</h4>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { label: 'Code', value: code, setter: setCode, placeholder: 'e.g. SAVE30' },
                  { label: 'Discount', value: discount, setter: setDiscount, placeholder: 'e.g. 30% or ₹500' },
                  { label: 'Expiry Date', value: expiry, setter: setExpiry, placeholder: 'YYYY-MM-DD' },
                  { label: 'Usage Limit', value: limit, setter: setLimit, placeholder: 'e.g. 100' },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="text-xs font-bold text-gray-500 mb-1 block">{f.label}</label>
                    <input value={f.value} onChange={(e) => f.setter(e.target.value)} placeholder={f.placeholder} className="w-full px-3 py-2 rounded-xl border text-sm outline-none" style={{ borderColor: '#E5E7EB' }} />
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-3">
                <button className="px-4 py-2 rounded-xl text-sm font-bold text-white border-none cursor-pointer" style={{ background: '#DC2626' }}>Create</button>
                <button onClick={() => setShowCreate(false)} className="px-4 py-2 rounded-xl text-sm font-bold border cursor-pointer bg-white" style={{ borderColor: '#E5E7EB', color: '#6B7280' }}>Cancel</button>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: '#FFF5F5' }}>
                  {['Code', 'Discount', 'Scope', 'Uses', 'Limit', 'Expiry', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-3 text-[11px] font-black text-gray-400 uppercase tracking-wider text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {couponsData.map((c, i) => (
                  <tr key={i} className="border-t hover:bg-gray-50" style={{ borderColor: '#FFF5F5' }}>
                    <td className="px-4 py-3"><code className="text-xs font-black px-2 py-1 rounded-lg" style={{ background: '#FFF5F5', color: '#DC2626' }}>{c.code}</code></td>
                    <td className="px-4 py-3 text-xs font-black" style={{ color: '#059669' }}>{c.discount}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{c.scope}</td>
                    <td className="px-4 py-3 text-xs font-bold text-gray-700">{c.uses}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{c.limit}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{c.expiry}</td>
                    <td className="px-4 py-3"><StatusBadge status={c.status === 'Active' ? 'Active' : 'Expired'} /></td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-blue-50 cursor-pointer border-none bg-transparent"><Edit3 size={13} style={{ color: '#4F46E5' }} /></button>
                        <button className="p-1.5 rounded-lg hover:bg-red-50 cursor-pointer border-none bg-transparent"><Trash2 size={13} style={{ color: '#DC2626' }} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </FadeIn>
    </div>
  )
}

/* 4.7 Analytics */
function AnalyticsSection() {
  const max = Math.max(...dropOffData.map((d) => d.completion))
  return (
    <div className="space-y-5">
      <div className="grid lg:grid-cols-2 gap-4">
        <FadeIn>
          <Card className="p-5">
            <h3 className="font-black text-gray-900 mb-4">Revenue Trends</h3>
            <div className="flex items-end gap-2 h-32">
              {revenueMonths.map((d, i) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
                  <div className="w-full rounded-t-lg group relative cursor-pointer" style={{ height: `${(d.gross / 62) * 128}px`, background: i === revenueMonths.length - 1 ? '#DC2626' : '#FECACA', minHeight: 6 }}>
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none">₹{d.gross}L</div>
                  </div>
                  <span className="text-[10px] text-gray-500">{d.month}</span>
                </div>
              ))}
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Card className="p-5">
            <h3 className="font-black text-gray-900 mb-1">Drop-off Analysis</h3>
            <p className="text-xs text-gray-400 mb-4">Where students stop watching (avg across all courses)</p>
            <div className="space-y-2.5">
              {dropOffData.map((d, i) => (
                <div key={d.lesson}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-gray-600">{d.lesson}</span>
                    <span className="text-xs font-black" style={{ color: d.completion > 60 ? '#16A34A' : d.completion > 40 ? '#D97706' : '#DC2626' }}>{d.completion}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }} animate={{ width: `${d.completion}%` }} transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                      className="h-full rounded-full"
                      style={{ background: d.completion > 60 ? '#16A34A' : d.completion > 40 ? '#D97706' : '#DC2626' }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3">💡 Major drop-off after Lesson 30 — consider adding a project milestone</p>
          </Card>
        </FadeIn>
      </div>

      <FadeIn delay={0.2}>
        <Card className="overflow-hidden">
          <div className="px-5 py-4 border-b" style={{ borderColor: '#FCE8E8' }}>
            <h3 className="font-black text-gray-900">Instructor Leaderboard</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: '#FFF5F5' }}>
                  {['Rank', 'Instructor', 'Revenue', 'Students', 'Rating', 'Courses', 'Growth'].map((h) => (
                    <th key={h} className="px-5 py-3 text-[11px] font-black text-gray-400 uppercase tracking-wider text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {instructorLeaderboard.map((ins, i) => (
                  <tr key={ins.name} className="border-t hover:bg-gray-50" style={{ borderColor: '#FFF5F5' }}>
                    <td className="px-5 py-3">
                      <span className="text-sm font-black" style={{ color: i === 0 ? '#D97706' : i === 1 ? '#9CA3AF' : i === 2 ? '#D97706' : '#6B7280' }}>
                        {['🥇', '🥈', '🥉', '#4', '#5'][i]}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-xs font-bold text-gray-900">{ins.name}</td>
                    <td className="px-5 py-3 text-xs font-black" style={{ color: '#16A34A' }}>{ins.revenue}</td>
                    <td className="px-5 py-3 text-xs text-gray-600">{ins.students}</td>
                    <td className="px-5 py-3">
                      <span className="flex items-center gap-1 text-xs font-bold text-gray-700">
                        <Star size={10} style={{ color: '#F59E0B', fill: '#F59E0B' }} />{ins.rating}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-600">{ins.courses}</td>
                    <td className="px-5 py-3 text-xs font-black" style={{ color: '#16A34A' }}>{ins.growth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </FadeIn>
    </div>
  )
}

/* 4.8 Reviews */
function ReviewsSection() {
  return (
    <div className="space-y-5">
      <FadeIn>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Reviews', value: '9,080', color: '#4F46E5', bg: '#EEF2FF' },
            { label: 'Avg Platform Rating', value: '4.8★', color: '#D97706', bg: '#FFFBEB' },
            { label: 'Flagged / Spam', value: '14', color: '#DC2626', bg: '#FEF2F2' },
            { label: 'Top Highlighted', value: '28', color: '#059669', bg: '#F0FDF4' },
          ].map((s) => (
            <Card key={s.label} className="p-4">
              <p className="text-2xl font-black" style={{ color: s.color }}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </Card>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <Card className="overflow-hidden">
          <div className="px-5 py-4 border-b" style={{ borderColor: '#FCE8E8' }}>
            <h3 className="font-black text-gray-900">All Reviews</h3>
          </div>
          <div className="divide-y" style={{ borderColor: '#FFF5F5' }}>
            {allReviews.map((r) => (
              <div key={r.id} className="p-5 hover:bg-gray-50" style={r.flagged ? { background: '#FFF5F5' } : {}}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-gray-900">{r.student}</span>
                      <div className="flex gap-0.5">{[...Array(r.rating)].map((_, i) => <Star key={i} size={11} style={{ color: '#F59E0B', fill: '#F59E0B' }} />)}</div>
                      <StatusBadge status={r.status} />
                    </div>
                    <p className="text-xs text-gray-500 mb-1">{r.course} · {r.date}</p>
                    <p className="text-sm text-gray-700">"{r.text}"</p>
                  </div>
                  <div className="flex flex-col gap-1 shrink-0">
                    {r.flagged && <button className="text-[11px] font-bold px-3 py-1.5 rounded-lg border-none cursor-pointer text-white" style={{ background: '#DC2626' }}>Remove</button>}
                    {!r.flagged && <button className="text-[11px] font-bold px-3 py-1.5 rounded-lg border-none cursor-pointer text-white" style={{ background: '#D97706' }}>Highlight</button>}
                    <button className="text-[11px] font-bold px-3 py-1.5 rounded-lg border cursor-pointer bg-white" style={{ borderColor: '#E5E7EB', color: '#6B7280' }}>Flag Spam</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </FadeIn>
    </div>
  )
}

/* 4.9 Notifications */
function NotificationsSection() {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [target, setTarget] = useState('All Users')

  return (
    <div className="space-y-5">
      <FadeIn>
        <Card className="p-6">
          <h3 className="font-black text-gray-900 mb-4">Send Announcement</h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold text-gray-500 mb-1 block">Title</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Announcement title…" className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ borderColor: '#E5E7EB' }} />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 mb-1 block">Message</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write your message…" rows={3} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none resize-none" style={{ borderColor: '#E5E7EB' }} />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 mb-1 block">Target Audience</label>
              <div className="flex gap-2 flex-wrap">
                {['All Users', 'All Students', 'All Instructors', 'Specific Course Students'].map((t) => (
                  <button key={t} onClick={() => setTarget(t)} className="px-3 py-1.5 rounded-xl text-xs font-bold border-none cursor-pointer" style={target === t ? { background: '#DC2626', color: '#fff' } : { background: '#F3F4F6', color: '#6B7280' }}>{t}</button>
                ))}
              </div>
            </div>
            <div className="flex gap-2 pt-1">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white border-none cursor-pointer" style={{ background: 'linear-gradient(135deg, #DC2626, #EF4444)' }}>
                <Send size={14} /> Send Now
              </button>
              <button className="px-5 py-2.5 rounded-xl text-sm font-bold border cursor-pointer bg-white" style={{ borderColor: '#E5E7EB', color: '#6B7280' }}>Schedule</button>
            </div>
          </div>
        </Card>
      </FadeIn>

      <FadeIn delay={0.1}>
        <Card className="overflow-hidden">
          <div className="px-5 py-4 border-b" style={{ borderColor: '#FCE8E8' }}>
            <h3 className="font-black text-gray-900">Sent History</h3>
          </div>
          <div className="divide-y" style={{ borderColor: '#FFF5F5' }}>
            {notifHistory.map((n, i) => (
              <div key={i} className="px-5 py-4 hover:bg-gray-50 flex items-center gap-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#FEF2F2' }}><Megaphone size={16} style={{ color: '#DC2626' }} /></div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900">{n.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{n.target} · {n.sent} · {n.date}</p>
                </div>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full" style={{ background: '#F0FDF4', color: '#16A34A' }}>Sent</span>
              </div>
            ))}
          </div>
        </Card>
      </FadeIn>
    </div>
  )
}

/* 4.10 Settings */
function SettingsSection() {
  const [commission, setCommission] = useState('20')
  const [gateway, setGateway] = useState('Razorpay')

  return (
    <div className="space-y-5">
      <div className="grid lg:grid-cols-2 gap-4">
        <FadeIn>
          <Card className="p-6">
            <h3 className="font-black text-gray-900 mb-4 flex items-center gap-2"><Percent size={18} style={{ color: '#DC2626' }} /> Commission & Payments</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 mb-1.5 block">Platform Commission (%)</label>
                <div className="flex items-center gap-3">
                  <input type="number" value={commission} onChange={(e) => setCommission(e.target.value)} className="w-24 px-3 py-2 rounded-xl border text-sm font-bold outline-none" style={{ borderColor: '#E5E7EB' }} />
                  <span className="text-sm text-gray-400">Instructor earns {100 - parseInt(commission || 0)}%</span>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 mb-1.5 block">Payment Gateway</label>
                <div className="flex gap-2">
                  {['Razorpay', 'Stripe', 'PayU'].map((g) => (
                    <button key={g} onClick={() => setGateway(g)} className="px-3 py-1.5 rounded-xl text-xs font-bold border-none cursor-pointer" style={gateway === g ? { background: '#DC2626', color: '#fff' } : { background: '#F3F4F6', color: '#6B7280' }}>{g}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 mb-1.5 block">Payout Schedule</label>
                <select className="px-3 py-2 rounded-xl border text-sm outline-none" style={{ borderColor: '#E5E7EB' }}>
                  <option>Monthly (1st of month)</option>
                  <option>Bi-weekly</option>
                  <option>Weekly</option>
                </select>
              </div>
              <button className="px-5 py-2.5 rounded-xl text-sm font-bold text-white border-none cursor-pointer" style={{ background: '#DC2626' }}>Save Changes</button>
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Card className="p-6">
            <h3 className="font-black text-gray-900 mb-4 flex items-center gap-2"><Mail size={18} style={{ color: '#DC2626' }} /> Email Templates</h3>
            <div className="space-y-3">
              {['Welcome Email', 'Purchase Confirmation', 'Course Approval', 'Payout Processed', 'Password Reset'].map((tmpl) => (
                <div key={tmpl} className="flex items-center justify-between p-3 rounded-xl border" style={{ borderColor: '#FCE8E8' }}>
                  <span className="text-sm font-semibold text-gray-700">{tmpl}</span>
                  <button className="text-xs font-bold px-3 py-1.5 rounded-lg border cursor-pointer bg-white" style={{ borderColor: '#E5E7EB', color: '#4F46E5' }}>Edit</button>
                </div>
              ))}
            </div>
          </Card>
        </FadeIn>
      </div>

      <FadeIn delay={0.2}>
        <Card className="p-6">
          <h3 className="font-black text-gray-900 mb-4 flex items-center gap-2"><Palette size={18} style={{ color: '#DC2626' }} /> Branding</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-500 mb-1.5 block">Platform Name</label>
              <input defaultValue="ViscanoLearn" className="w-full px-3 py-2 rounded-xl border text-sm outline-none" style={{ borderColor: '#E5E7EB' }} />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 mb-1.5 block">Primary Color</label>
              <div className="flex items-center gap-2">
                <input type="color" defaultValue="#4F46E5" className="w-10 h-10 rounded-xl border cursor-pointer" style={{ borderColor: '#E5E7EB' }} />
                <input defaultValue="#4F46E5" className="flex-1 px-3 py-2 rounded-xl border text-sm outline-none font-mono" style={{ borderColor: '#E5E7EB' }} />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 mb-1.5 block">Support Email</label>
              <input defaultValue="support@viscanolearn.com" className="w-full px-3 py-2 rounded-xl border text-sm outline-none" style={{ borderColor: '#E5E7EB' }} />
            </div>
          </div>
          <button className="mt-4 px-5 py-2.5 rounded-xl text-sm font-bold text-white border-none cursor-pointer" style={{ background: '#DC2626' }}>Save Branding</button>
        </Card>
      </FadeIn>
    </div>
  )
}

/* ─── MAIN PAGE ──────────────────────────────────────────── */
export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('overview')
  const title = SECTION_TITLES[activeSection] || 'Admin Dashboard'

  const sections = {
    overview: <OverviewSection />,
    users: <UsersSection />,
    courses: <CoursesSection />,
    moderation: <ModerationSection />,
    revenue: <RevenueSection />,
    coupons: <CouponsSection />,
    analytics: <AnalyticsSection />,
    reviews: <ReviewsSection />,
    notifications: <NotificationsSection />,
    settings: <SettingsSection />,
  }

  return (
    <AdminDashboardLayout title={title} activeSection={activeSection} onNavigate={setActiveSection}>
      {sections[activeSection]}
    </AdminDashboardLayout>
  )
}
