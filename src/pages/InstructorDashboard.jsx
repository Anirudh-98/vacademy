import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users, BookOpen, DollarSign, Star, ArrowUpRight, Eye,
  Award, Video, Clock, TrendingUp, MessageSquare, ThumbsUp,
  CheckCircle, Calendar, PlusCircle, Download, Upload, Tag,
  Bell, Settings, HelpCircle, Send, X, Plus, Edit3, Trash2,
  AlertCircle, User, Link2, CreditCard, Shield, ChevronRight,
  Play, FileText, BarChart2, RefreshCw, Check
} from 'lucide-react'
import InstructorDashboardLayout from '../components/InstructorDashboardLayout'
import { courses } from '../data/courses'

/* ─── SECTION TITLES ─────────────────────────────────────── */
const SECTION_TITLES = {
  overview: 'Instructor Dashboard',
  create: 'Create New Course',
  courses: 'My Courses',
  content: 'Content Manager',
  students: 'My Students',
  reviews: 'Reviews & Feedback',
  earnings: 'Earnings Dashboard',
  coupons: 'Coupons & Promotions',
  qa: 'Q&A / Discussions',
  notifications: 'Notifications',
  settings: 'Profile & Settings',
}

/* ─── MOCK DATA ──────────────────────────────────────────── */

const myCourses = [
  { ...courses[0], totalStudents: 12400, monthlyEnrollments: 340, revenue: '₹18.5L', monthlyRevenue: '₹1.53L', completionRate: 78, views: 48200, status: 'Published', lastUpdated: '2 weeks ago' },
  { ...courses[7], totalStudents: 6200, monthlyEnrollments: 142, revenue: '₹3.2L', monthlyRevenue: '₹42K', completionRate: 88, views: 22400, status: 'Published', lastUpdated: '1 month ago' },
  { ...courses[14], totalStudents: 10600, monthlyEnrollments: 280, revenue: '₹12.1L', monthlyRevenue: '₹1.40L', completionRate: 71, views: 36800, status: 'Published', lastUpdated: '3 weeks ago' },
]

const myStudents = [
  { name: 'Riya Sharma', email: 'riya.s@gmail.com', course: 'React & Next.js', progress: 85, lastActive: '2 hr ago', status: 'Active', avatar: 'RS', color: '#4F46E5' },
  { name: 'Arjun Verma', email: 'arjun.v@outlook.com', course: 'System Design', progress: 32, lastActive: '4 days ago', status: 'Inactive', avatar: 'AV', color: '#6B7280' },
  { name: 'Meera Patel', email: 'meera.p@yahoo.com', course: 'Advanced TypeScript', progress: 100, lastActive: '1 day ago', status: 'Completed', avatar: 'MP', color: '#059669' },
  { name: 'Kiran Rao', email: 'kiran.rao@gmail.com', course: 'React & Next.js', progress: 60, lastActive: '3 hr ago', status: 'Active', avatar: 'KR', color: '#7C3AED' },
  { name: 'Preethi Nair', email: 'preethi.n@gmail.com', course: 'System Design', progress: 15, lastActive: '8 days ago', status: 'Inactive', avatar: 'PN', color: '#DC2626' },
  { name: 'Saurabh Joshi', email: 'saurabh.j@proton.me', course: 'React & Next.js', progress: 92, lastActive: '30 min ago', status: 'Active', avatar: 'SJ', color: '#0891B2' },
  { name: 'Tanvi Gupta', email: 'tanvi.g@gmail.com', course: 'Advanced TypeScript', progress: 100, lastActive: '2 days ago', status: 'Completed', avatar: 'TG', color: '#EA580C' },
  { name: 'Dev Malhotra', email: 'dev.m@gmail.com', course: 'React & Next.js', progress: 44, lastActive: '6 hr ago', status: 'Active', avatar: 'DM', color: '#6366F1' },
]

const studentReviews = [
  { name: 'Aarav Singh', avatar: 'AS', color: '#4F46E5', rating: 5, course: 'React & Next.js', time: '1 day ago', text: 'Absolutely phenomenal course! The way concepts are broken down is crystal clear. Best investment I made for my career.', replied: false },
  { name: 'Fatima Khan', avatar: 'FK', color: '#DC2626', rating: 5, course: 'System Design', time: '2 days ago', text: 'The system design course is extremely comprehensive. Got my FAANG interview prep done with this alone!', replied: true, reply: 'Thank you so much Fatima! Best of luck with your interviews.' },
  { name: 'Rohan Das', avatar: 'RD', color: '#059669', rating: 3, course: 'Advanced TypeScript', time: '3 days ago', text: 'Good content but pacing was a bit fast for me. Would love more real-world project examples.', replied: false },
  { name: 'Neha Jain', avatar: 'NJ', color: '#D97706', rating: 5, course: 'React & Next.js', time: '4 days ago', text: 'Went from zero to landing a frontend job in 3 months. This course changed my life!', replied: true, reply: 'This makes everything worthwhile, Neha. Congratulations on your new job!' },
]

const qaItems = [
  { id: 1, student: 'Rohan Das', avatar: 'RD', color: '#059669', course: 'React & Next.js', question: 'In Lesson 34, I am confused about when to use useCallback vs useMemo. Can you clarify with a real-world example?', time: '1 hr ago', answered: false, votes: 8 },
  { id: 2, student: 'Tanvi Gupta', avatar: 'TG', color: '#EA580C', course: 'Advanced TypeScript', question: 'How do conditional types differ from mapped types in TypeScript generics?', time: '3 hr ago', answered: false, votes: 5 },
  { id: 3, student: 'Kiran Rao', avatar: 'KR', color: '#7C3AED', course: 'System Design', question: 'When should I choose a microservices architecture over a monolith for a startup?', time: '1 day ago', answered: true, votes: 14, reply: 'Great question! For startups, start with a monolith. Microservices add operational complexity. Consider splitting only when you hit clear scaling bottlenecks around teams or specific services.' },
  { id: 4, student: 'Meera Patel', avatar: 'MP', color: '#4F46E5', course: 'React & Next.js', question: 'Does Next.js App Router replace the need for Redux or Zustand entirely?', time: '2 days ago', answered: false, votes: 11 },
]

const monthlyEarnings = [
  { month: 'Oct', value: 42, amount: '₹2.80L' },
  { month: 'Nov', value: 50, amount: '₹3.33L' },
  { month: 'Dec', value: 70, amount: '₹4.67L' },
  { month: 'Jan', value: 55, amount: '₹3.67L' },
  { month: 'Feb', value: 60, amount: '₹4.00L' },
  { month: 'Mar', value: 75, amount: '₹5.00L' },
]

const earningsBreakdown = [
  { course: 'React & Next.js: Zero to Hero', gross: '₹18.5L', refunds: '-₹18K', net: '₹18.32L', payout: 'Processed', month: 'March' },
  { course: 'Advanced TypeScript Patterns', gross: '₹3.2L', refunds: '-₹3.2K', net: '₹3.17L', payout: 'Processed', month: 'March' },
  { course: 'System Design for Senior Engineers', gross: '₹12.1L', refunds: '-₹12K', net: '₹12.0L', payout: 'Pending', month: 'March' },
]

const myVideos = [
  { title: 'React Hooks Deep Dive (Part 1)', course: 'React & Next.js', size: '248 MB', duration: '38:42', status: 'Published', views: 12400 },
  { title: 'Advanced TypeScript Generics', course: 'Advanced TypeScript', size: '182 MB', duration: '29:15', status: 'Published', views: 6200 },
  { title: 'System Design: CAP Theorem', course: 'System Design', size: '310 MB', duration: '45:10', status: 'Published', views: 9800 },
  { title: 'React Performance Optimization', course: 'React & Next.js', size: '0 MB', duration: '—', status: 'Uploading', views: 0, progress: 68 },
  { title: 'TypeScript Decorators Explained', course: 'Advanced TypeScript', size: '0 MB', duration: '—', status: 'Encoding', views: 0, progress: 100 },
]

const myCoupons = [
  { code: 'REACT100', discount: '₹100', course: 'React & Next.js', uses: 34, limit: 50, expiry: 'Apr 30, 2026', revenue: '₹1,520', status: 'Active' },
  { code: 'TS50OFF', discount: '50%', course: 'Advanced TypeScript', uses: 12, limit: 30, expiry: 'May 15, 2026', revenue: '₹18,000', status: 'Active' },
  { code: 'SYSDESIGN', discount: '₹500', course: 'System Design', uses: 50, limit: 50, expiry: 'Mar 31, 2026', revenue: '₹2,24,500', status: 'Expired' },
]

const notifications = [
  { type: 'sale', text: 'Riya Sharma enrolled in React & Next.js', time: '2 min ago', icon: DollarSign, color: '#059669' },
  { type: 'review', text: 'New 5★ review on System Design course', time: '15 min ago', icon: Star, color: '#D97706' },
  { type: 'qa', text: 'Rohan Das asked a question in React course', time: '1 hr ago', icon: HelpCircle, color: '#4F46E5' },
  { type: 'approval', text: 'Course "Advanced TypeScript" approved by admin', time: '2 days ago', icon: CheckCircle, color: '#059669' },
  { type: 'payout', text: 'Payout of ₹3.35L for March processed', time: '3 days ago', icon: CreditCard, color: '#7C3AED' },
  { type: 'qa', text: 'Tanvi Gupta asked a question about generics', time: '3 hr ago', icon: HelpCircle, color: '#4F46E5' },
  { type: 'sale', text: 'Dev Malhotra enrolled in React & Next.js', time: '6 hr ago', icon: DollarSign, color: '#059669' },
]

/* ─── HELPERS ────────────────────────────────────────────── */

function FadeIn({ children, delay = 0 }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.3 }}>
      {children}
    </motion.div>
  )
}

function Card({ children, className = '', style = {} }) {
  return (
    <div className={`bg-white rounded-2xl border ${className}`} style={{ borderColor: '#D1FAE5', ...style }}>
      {children}
    </div>
  )
}

function StatusBadge({ status }) {
  const map = {
    Active: { bg: '#F0FDF4', color: '#16A34A' },
    Inactive: { bg: '#FEF2F2', color: '#DC2626' },
    Completed: { bg: '#EEF2FF', color: '#4F46E5' },
    Published: { bg: '#F0FDF4', color: '#16A34A' },
    Draft: { bg: '#F3F4F6', color: '#6B7280' },
    Pending: { bg: '#FFFBEB', color: '#D97706' },
    Uploading: { bg: '#EEF2FF', color: '#4F46E5' },
    Encoding: { bg: '#FFF7ED', color: '#EA580C' },
    Processed: { bg: '#F0FDF4', color: '#16A34A' },
    Expired: { bg: '#F3F4F6', color: '#9CA3AF' },
  }
  const s = map[status] || { bg: '#F3F4F6', color: '#6B7280' }
  return <span className="text-[10px] font-black px-2 py-0.5 rounded-full" style={s}>{status}</span>
}

/* 5.1 Overview */
function OverviewSection() {
  const kpis = [
    { label: 'Total Students', value: '29,200', change: '+762 this month', up: true, icon: Users, color: '#4F46E5', bg: '#EEF2FF' },
    { label: 'Total Revenue', value: '₹33.8L', change: '+₹3.35L this month', up: true, icon: DollarSign, color: '#059669', bg: '#F0FDF4' },
    { label: 'Avg Rating', value: '4.9', change: '↑ from 4.87', up: true, icon: Star, color: '#D97706', bg: '#FFFBEB' },
    { label: 'Conversion Rate', value: '3.8%', change: '+0.3% this month', up: true, icon: TrendingUp, color: '#7C3AED', bg: '#F5F3FF' },
  ]
  const max = Math.max(...monthlyEarnings.map((d) => d.value))

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-5 flex items-center justify-between"
        style={{ background: 'linear-gradient(135deg, #059669, #10B981, #34D399)' }}
      >
        <div>
          <h2 className="text-xl font-black text-white mb-1">Welcome back, Alex!</h2>
          <p className="text-green-100 text-sm">Your courses had 762 new enrollments this month · Keep it up!</p>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <div className="text-center"><p className="text-2xl font-black text-white">29,200</p><p className="text-green-200 text-xs">Total Students</p></div>
          <div className="w-px h-12 bg-white/30" />
          <div className="text-center"><p className="text-2xl font-black text-white">4.9★</p><p className="text-green-200 text-xs">Avg Rating</p></div>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k, i) => {
          const Icon = k.icon
          return (
            <FadeIn key={k.label} delay={i * 0.07}>
              <Card className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: k.bg }}><Icon size={18} style={{ color: k.color }} /></div>
                  <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ background: '#F0FDF4', color: '#16A34A' }}><ArrowUpRight size={11} /></span>
                </div>
                <p className="text-2xl font-black text-gray-900">{k.value}</p>
                <p className="text-xs font-semibold text-gray-500 mt-0.5">{k.label}</p>
                <p className="text-[11px] text-gray-400 mt-1">{k.change}</p>
              </Card>
            </FadeIn>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <FadeIn delay={0.25} className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-5">
              <div><h3 className="font-black text-gray-900">Monthly Earnings</h3><p className="text-xs text-gray-400 mt-0.5">Last 6 months</p></div>
              <span className="text-sm font-black text-gray-500">Total ₹23.5L</span>
            </div>
            <div className="flex items-end gap-3 h-36">
              {monthlyEarnings.map((d, i) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
                  <div className="w-full rounded-t-lg group relative cursor-pointer" style={{ height: `${(d.value / max) * 144}px`, background: i === monthlyEarnings.length - 1 ? '#059669' : '#BBF7D0', minHeight: 8 }}>
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none">{d.amount}</div>
                  </div>
                  <span className="text-[11px] text-gray-500">{d.month}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t" style={{ borderColor: '#F0FDF4' }}>
              <div className="text-center"><p className="text-base font-black text-gray-900">₹5.00L</p><p className="text-xs text-gray-400">Best Month</p></div>
              <div className="text-center"><p className="text-base font-black" style={{ color: '#059669' }}>+25%</p><p className="text-xs text-gray-400">Growth MoM</p></div>
              <div className="text-center"><p className="text-base font-black text-gray-900">₹3.92L</p><p className="text-xs text-gray-400">Monthly Avg</p></div>
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={0.3}>
          <Card className="p-5">
            <h3 className="font-black text-gray-900 mb-4">Course Performance</h3>
            <div className="space-y-3">
              {myCourses.map((c) => (
                <div key={c.id} className="flex items-center gap-3">
                  <img src={c.image} className="w-10 h-8 rounded-lg object-cover" alt="" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-800 truncate">{c.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${c.completionRate}%`, background: '#059669' }} />
                      </div>
                      <span className="text-[10px] font-bold text-gray-400">{c.completionRate}%</span>
                    </div>
                  </div>
                  <span className="text-xs font-black" style={{ color: '#059669' }}>{c.revenue}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t" style={{ borderColor: '#D1FAE5' }}>
              {[{ v: '1,07,400', l: 'Video Views' }, { v: '79%', l: 'Avg Completion' }, { v: '4,820', l: 'Certificates' }].map((s) => (
                <div key={s.l} className="text-center"><p className="text-sm font-black text-gray-900">{s.v}</p><p className="text-[10px] text-gray-400">{s.l}</p></div>
              ))}
            </div>
          </Card>
        </FadeIn>
      </div>
    </div>
  )
}

/* 5.2 Course Creation Flow */
function CreateCourseSection() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ title: '', desc: '', category: 'Development', level: 'Beginner', price: '', free: false })
  const steps = ['Course Info', 'Curriculum', 'Pricing', 'Preview & Submit']

  return (
    <div className="max-w-3xl">
      <FadeIn>
        {/* Step Indicator */}
        <div className="flex items-center gap-0 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <button
                  onClick={() => setStep(i + 1)}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black border-2 cursor-pointer transition-all"
                  style={step > i + 1 ? { background: '#059669', borderColor: '#059669', color: '#fff' } : step === i + 1 ? { background: '#fff', borderColor: '#059669', color: '#059669' } : { background: '#fff', borderColor: '#D1FAE5', color: '#9CA3AF' }}
                >
                  {step > i + 1 ? <Check size={16} /> : i + 1}
                </button>
                <span className="text-[10px] font-bold mt-1 whitespace-nowrap" style={{ color: step === i + 1 ? '#059669' : '#9CA3AF' }}>{s}</span>
              </div>
              {i < steps.length - 1 && <div className="flex-1 h-0.5 mx-2 mt-[-14px]" style={{ background: step > i + 1 ? '#059669' : '#D1FAE5' }} />}
            </div>
          ))}
        </div>

        <Card className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-black text-gray-900 text-lg">Course Information</h3>
              <div>
                <label className="text-xs font-bold text-gray-500 mb-1.5 block">Course Title *</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Complete React Developer in 2026" className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={{ borderColor: '#D1FAE5' }} />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 mb-1.5 block">Description *</label>
                <textarea value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} placeholder="What will students learn from this course? Be specific…" rows={4} className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none" style={{ borderColor: '#D1FAE5' }} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 mb-1.5 block">Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={{ borderColor: '#D1FAE5' }}>
                    {['Development', 'Data Science', 'Design', 'Cloud', 'Security', 'Business'].map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 mb-1.5 block">Level</label>
                  <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={{ borderColor: '#D1FAE5' }}>
                    {['Beginner', 'Intermediate', 'Advanced'].map((l) => <option key={l}>{l}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 mb-1.5 block">Thumbnail</label>
                <div className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:bg-green-50 transition-colors" style={{ borderColor: '#D1FAE5' }}>
                  <Upload size={24} className="mx-auto mb-2 text-gray-300" />
                  <p className="text-sm text-gray-400">Drag & drop or <span style={{ color: '#059669' }} className="font-bold">browse</span></p>
                  <p className="text-xs text-gray-300 mt-1">PNG, JPG up to 2MB · Recommended 1280×720px</p>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-black text-gray-900 text-lg">Curriculum Builder</h3>
              {[
                { section: 'Section 1: Getting Started', lectures: ['Introduction & Setup', 'Core Concepts Overview'] },
                { section: 'Section 2: Core Features', lectures: ['Deep Dive into Topic A', 'Hands-on Project'] },
              ].map((sec, si) => (
                <div key={si} className="border rounded-xl overflow-hidden" style={{ borderColor: '#D1FAE5' }}>
                  <div className="flex items-center justify-between px-4 py-3" style={{ background: '#F0FDF4' }}>
                    <span className="text-sm font-bold text-gray-800">{sec.section}</span>
                    <div className="flex gap-2">
                      <button className="text-xs font-bold px-2.5 py-1 rounded-lg border-none cursor-pointer" style={{ background: '#059669', color: '#fff' }}>+ Lecture</button>
                      <button className="text-xs font-bold px-2.5 py-1 rounded-lg border cursor-pointer bg-white" style={{ borderColor: '#D1FAE5', color: '#6B7280' }}>+ Quiz</button>
                    </div>
                  </div>
                  {sec.lectures.map((lec, li) => (
                    <div key={li} className="flex items-center gap-3 px-4 py-2.5 border-t hover:bg-gray-50" style={{ borderColor: '#F0FDF4' }}>
                      <Play size={13} style={{ color: '#059669' }} />
                      <span className="text-sm text-gray-700 flex-1">{lec}</span>
                      <Edit3 size={13} className="text-gray-300 cursor-pointer hover:text-gray-500" />
                      <Trash2 size={13} className="text-gray-300 cursor-pointer hover:text-red-400" />
                    </div>
                  ))}
                </div>
              ))}
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed text-sm font-bold cursor-pointer hover:bg-green-50 transition-colors" style={{ borderColor: '#D1FAE5', color: '#059669' }}>
                <Plus size={16} /> Add Section
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-black text-gray-900 text-lg">Pricing</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div onClick={() => setForm({ ...form, free: true })} className="p-4 rounded-xl border-2 cursor-pointer transition-all" style={{ borderColor: form.free ? '#059669' : '#D1FAE5', background: form.free ? '#F0FDF4' : '#fff' }}>
                  <p className="font-bold text-gray-900">Free</p>
                  <p className="text-xs text-gray-400 mt-1">Build audience, no earnings</p>
                </div>
                <div onClick={() => setForm({ ...form, free: false })} className="p-4 rounded-xl border-2 cursor-pointer transition-all" style={{ borderColor: !form.free ? '#059669' : '#D1FAE5', background: !form.free ? '#F0FDF4' : '#fff' }}>
                  <p className="font-bold text-gray-900">Paid</p>
                  <p className="text-xs text-gray-400 mt-1">Earn 80% of every sale</p>
                </div>
              </div>
              {!form.free && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 mb-1.5 block">Price (₹)</label>
                    <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="e.g. 4499" className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={{ borderColor: '#D1FAE5' }} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 mb-1.5 block">Original Price (₹)</label>
                    <input type="number" placeholder="e.g. 8999" className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={{ borderColor: '#D1FAE5' }} />
                  </div>
                </div>
              )}
              {!form.free && form.price && (
                <div className="p-3 rounded-xl" style={{ background: '#F0FDF4' }}>
                  <p className="text-xs text-gray-600">You earn <strong style={{ color: '#059669' }}>₹{Math.round(parseInt(form.price || 0) * 0.8)}</strong> per enrollment (80% after 20% platform fee)</p>
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h3 className="font-black text-gray-900 text-lg">Preview & Submit</h3>
              <div className="p-4 rounded-xl border" style={{ borderColor: '#D1FAE5', background: '#F0FDF4' }}>
                <p className="text-sm font-bold text-gray-800 mb-2">Pre-submission checklist</p>
                {['Course title added', 'Description complete', 'Thumbnail uploaded', 'At least 5 lectures', 'Pricing set'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 py-1">
                    <CheckCircle size={14} style={{ color: '#059669' }} />
                    <span className="text-sm text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-xl border" style={{ borderColor: '#FFFBEB', background: '#FFFBEB' }}>
                <p className="text-xs text-yellow-700">⏱ After submission, admin will review your course within 2-3 business days. You'll be notified via email and notification once approved or if changes are needed.</p>
              </div>
              <button className="w-full px-4 py-3 rounded-xl text-sm font-bold text-white border-none cursor-pointer" style={{ background: 'linear-gradient(135deg, #059669, #10B981)' }}>
                Submit for Review
              </button>
            </div>
          )}

          <div className="flex items-center justify-between mt-6 pt-4 border-t" style={{ borderColor: '#D1FAE5' }}>
            <button onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1} className="px-5 py-2.5 rounded-xl text-sm font-bold border cursor-pointer disabled:opacity-30" style={{ borderColor: '#D1FAE5', color: '#6B7280', background: '#fff' }}>Back</button>
            {step < 4 && <button onClick={() => setStep(step + 1)} className="px-5 py-2.5 rounded-xl text-sm font-bold text-white border-none cursor-pointer" style={{ background: '#059669' }}>Continue →</button>}
          </div>
        </Card>
      </FadeIn>
    </div>
  )
}

/* 5.3 My Courses */
function MyCoursesSection() {
  return (
    <div className="space-y-5">
      <FadeIn>
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: '#D1FAE5' }}>
            <h3 className="font-black text-gray-900">My Courses ({myCourses.length})</h3>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white border-none cursor-pointer" style={{ background: '#059669' }}>
              <PlusCircle size={14} /> New Course
            </button>
          </div>
          <div className="divide-y" style={{ borderColor: '#F0FDF4' }}>
            {myCourses.map((c, i) => (
              <motion.div key={c.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 px-5 py-4 hover:bg-gray-50">
                <img src={c.image} alt={c.title} className="w-20 h-14 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-bold text-gray-900 truncate">{c.title}</p>
                    <StatusBadge status={c.status} />
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-2">
                    <span className="flex items-center gap-1"><Users size={11} />{c.totalStudents.toLocaleString()}</span>
                    <span className="flex items-center gap-1"><Star size={11} style={{ color: '#F59E0B', fill: '#F59E0B' }} />{c.rating} ({c.reviews.toLocaleString()})</span>
                    <span className="flex items-center gap-1"><Eye size={11} />{(c.views / 1000).toFixed(1)}K views</span>
                    <span className="text-gray-300">Updated {c.lastUpdated}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${c.completionRate}%`, background: c.completionRate >= 80 ? '#059669' : '#D97706' }} />
                    </div>
                    <span className="text-[11px] text-gray-400">{c.completionRate}% completion rate</span>
                  </div>
                </div>
                <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-0.5">
                  <p className="text-xl font-black" style={{ color: '#059669' }}>{c.revenue}</p>
                  <p className="text-xs text-gray-400">{c.monthlyRevenue}/mo · +{c.monthlyEnrollments} enrolled</p>
                  <div className="flex gap-1.5 mt-2">
                    <button className="text-xs font-bold px-3 py-1.5 rounded-lg border-none cursor-pointer" style={{ background: '#F0FDF4', color: '#059669' }}>Edit</button>
                    <button className="text-xs font-bold px-3 py-1.5 rounded-lg border-none cursor-pointer" style={{ background: '#F0FDF4', color: '#059669' }}>+ Lecture</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </FadeIn>
    </div>
  )
}

/* 5.4 Content Manager */
function ContentSection() {
  return (
    <div className="space-y-5">
      <FadeIn>
        <Card className="p-5">
          <h3 className="font-black text-gray-900 mb-4">Upload Video</h3>
          <div className="border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer hover:bg-green-50 transition-colors" style={{ borderColor: '#D1FAE5' }}>
            <Upload size={32} className="mx-auto mb-3" style={{ color: '#059669' }} />
            <p className="text-sm font-bold text-gray-700">Drag & drop your video here</p>
            <p className="text-xs text-gray-400 mt-1">MP4, MOV, AVI up to 4GB · HD recommended</p>
            <button className="mt-4 px-6 py-2.5 rounded-xl text-sm font-bold text-white border-none cursor-pointer" style={{ background: '#059669' }}>Browse Files</button>
          </div>
        </Card>
      </FadeIn>

      <FadeIn delay={0.1}>
        <Card className="overflow-hidden">
          <div className="px-5 py-4 border-b" style={{ borderColor: '#D1FAE5' }}>
            <h3 className="font-black text-gray-900">My Videos ({myVideos.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: '#F0FDF4' }}>
                  {['Title', 'Course', 'Duration', 'Size', 'Views', 'Status'].map((h) => (
                    <th key={h} className="px-5 py-3 text-[11px] font-black text-gray-400 uppercase tracking-wider text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {myVideos.map((v, i) => (
                  <tr key={i} className="border-t hover:bg-gray-50" style={{ borderColor: '#F0FDF4' }}>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#F0FDF4' }}><Play size={14} style={{ color: '#059669' }} /></div>
                        <span className="text-xs font-bold text-gray-900 max-w-48 truncate">{v.title}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-500 max-w-32 truncate">{v.course}</td>
                    <td className="px-5 py-3 text-xs text-gray-500">{v.duration}</td>
                    <td className="px-5 py-3 text-xs text-gray-500">{v.size}</td>
                    <td className="px-5 py-3 text-xs font-bold text-gray-700">{v.views > 0 ? v.views.toLocaleString() : '—'}</td>
                    <td className="px-5 py-3">
                      {(v.status === 'Uploading' || v.status === 'Encoding') ? (
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <StatusBadge status={v.status} />
                            <span className="text-[10px] font-bold text-gray-400">{v.progress}%</span>
                          </div>
                          <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${v.progress}%` }} transition={{ duration: 1 }} className="h-full rounded-full" style={{ background: '#059669' }} />
                          </div>
                        </div>
                      ) : <StatusBadge status={v.status} />}
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

/* 5.5 Student Management */
function StudentsSection() {
  const [filter, setFilter] = useState('All')
  const filtered = filter === 'All' ? myStudents : myStudents.filter((s) => s.status === filter)

  return (
    <div className="space-y-5">
      <FadeIn>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Students', value: '29,200', color: '#4F46E5', bg: '#EEF2FF' },
            { label: 'Active (7d)', value: '6,840', color: '#059669', bg: '#F0FDF4' },
            { label: 'Completed', value: '4,820', color: '#7C3AED', bg: '#F5F3FF' },
            { label: 'Inactive (30d+)', value: '3,120', color: '#DC2626', bg: '#FEF2F2' },
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
          <div className="px-5 py-4 border-b flex items-center justify-between flex-wrap gap-3" style={{ borderColor: '#D1FAE5' }}>
            <h3 className="font-black text-gray-900">Student List</h3>
            <div className="flex gap-2">
              {['All', 'Active', 'Inactive', 'Completed'].map((f) => (
                <button key={f} onClick={() => setFilter(f)} className="px-3 py-1.5 rounded-xl text-xs font-bold border-none cursor-pointer" style={filter === f ? { background: '#059669', color: '#fff' } : { background: '#F3F4F6', color: '#6B7280' }}>{f}</button>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: '#F0FDF4' }}>
                  {['Student', 'Course', 'Progress', 'Last Active', 'Status', 'Action'].map((h) => (
                    <th key={h} className="px-5 py-3 text-[11px] font-black text-gray-400 uppercase tracking-wider text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => (
                  <tr key={i} className="border-t hover:bg-gray-50" style={{ borderColor: '#F0FDF4' }}>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-xs shrink-0" style={{ background: s.color }}>{s.avatar}</div>
                        <div><p className="text-xs font-bold text-gray-900">{s.name}</p><p className="text-[11px] text-gray-400">{s.email}</p></div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-600 max-w-40 truncate">{s.course}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${s.progress}%`, background: s.progress === 100 ? '#7C3AED' : s.progress >= 50 ? '#059669' : '#D97706' }} />
                        </div>
                        <span className="text-[11px] font-bold text-gray-500">{s.progress}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-400">{s.lastActive}</td>
                    <td className="px-5 py-3"><StatusBadge status={s.status} /></td>
                    <td className="px-5 py-3">
                      {s.status === 'Inactive' && (
                        <button className="text-[11px] font-bold px-3 py-1.5 rounded-lg border-none cursor-pointer text-white" style={{ background: '#059669' }}>
                          <Send size={11} className="inline mr-1" />Nudge
                        </button>
                      )}
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

/* 5.6 Reviews & Feedback */
function ReviewsSection() {
  const [replyOpen, setReplyOpen] = useState(null)
  const [replyText, setReplyText] = useState('')

  const lowRating = studentReviews.filter((r) => r.rating <= 3)
  const avgRating = (studentReviews.reduce((a, b) => a + b.rating, 0) / studentReviews.length).toFixed(1)

  return (
    <div className="space-y-5">
      <FadeIn>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Avg Rating', value: `${avgRating}★`, color: '#D97706', bg: '#FFFBEB' },
            { label: 'Total Reviews', value: '9,080', color: '#4F46E5', bg: '#EEF2FF' },
            { label: 'Unanswered', value: '2', color: '#DC2626', bg: '#FEF2F2' },
            { label: 'Low Ratings (≤3)', value: lowRating.length.toString(), color: '#D97706', bg: '#FFFBEB' },
          ].map((s) => (
            <Card key={s.label} className="p-4">
              <p className="text-2xl font-black" style={{ color: s.color }}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </Card>
          ))}
        </div>
      </FadeIn>

      {lowRating.length > 0 && (
        <FadeIn delay={0.1}>
          <Card className="p-4 border" style={{ borderColor: '#FCA5A5', background: '#FFF5F5' }}>
            <div className="flex items-center gap-2 mb-2"><AlertCircle size={16} style={{ color: '#DC2626' }} /><span className="text-sm font-bold" style={{ color: '#DC2626' }}>Low Rating Pattern Detected</span></div>
            <p className="text-xs text-gray-600">Common feedback: <em>"pacing too fast"</em>, <em>"needs more examples"</em>. Consider updating Lesson 12-18.</p>
          </Card>
        </FadeIn>
      )}

      <FadeIn delay={0.15}>
        <Card className="overflow-hidden">
          <div className="px-5 py-4 border-b" style={{ borderColor: '#D1FAE5' }}>
            <h3 className="font-black text-gray-900">All Reviews</h3>
          </div>
          <div className="divide-y" style={{ borderColor: '#F0FDF4' }}>
            {studentReviews.map((r, i) => (
              <div key={i} className="p-5 hover:bg-gray-50">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-xs shrink-0" style={{ background: r.color }}>{r.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-bold text-gray-900">{r.name}</p>
                      <div className="flex gap-0.5">{[...Array(r.rating)].map((_, j) => <Star key={j} size={11} style={{ color: '#F59E0B', fill: '#F59E0B' }} />)}</div>
                    </div>
                    <p className="text-[11px] text-gray-400 mb-2">{r.course} · {r.time}</p>
                    <p className="text-sm text-gray-700">"{r.text}"</p>

                    {r.replied && r.reply && (
                      <div className="mt-3 p-3 rounded-xl border-l-4" style={{ borderLeftColor: '#059669', background: '#F0FDF4' }}>
                        <p className="text-[11px] font-bold" style={{ color: '#059669' }}>Your Reply:</p>
                        <p className="text-xs text-gray-600 mt-0.5">{r.reply}</p>
                      </div>
                    )}

                    {!r.replied && (
                      <div className="mt-2">
                        {replyOpen === i ? (
                          <div className="space-y-2">
                            <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Write your reply…" rows={2} className="w-full px-3 py-2 rounded-xl border text-sm outline-none resize-none" style={{ borderColor: '#D1FAE5' }} />
                            <div className="flex gap-2">
                              <button onClick={() => { setReplyOpen(null); setReplyText('') }} className="text-xs font-bold px-3 py-1.5 rounded-lg border-none cursor-pointer text-white" style={{ background: '#059669' }}>Post Reply</button>
                              <button onClick={() => setReplyOpen(null)} className="text-xs font-bold px-3 py-1.5 rounded-lg border cursor-pointer bg-white" style={{ borderColor: '#E5E7EB', color: '#6B7280' }}>Cancel</button>
                            </div>
                          </div>
                        ) : (
                          <button onClick={() => setReplyOpen(i)} className="text-xs font-bold border-none cursor-pointer bg-transparent" style={{ color: '#059669' }}>↩ Reply</button>
                        )}
                      </div>
                    )}
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

/* 5.7 Earnings */
function EarningsSection() {
  return (
    <div className="space-y-5">
      <FadeIn>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Earnings', value: '₹33.8L', color: '#059669', bg: '#F0FDF4', icon: DollarSign },
            { label: 'This Month', value: '₹3.35L', color: '#4F46E5', bg: '#EEF2FF', icon: TrendingUp },
            { label: 'Total Refunds', value: '-₹33.2K', color: '#DC2626', bg: '#FEF2F2', icon: AlertCircle },
            { label: 'Pending Payout', value: '₹12.0L', color: '#D97706', bg: '#FFFBEB', icon: Clock },
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
          <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: '#D1FAE5' }}>
            <h3 className="font-black text-gray-900">Revenue per Course</h3>
            <button className="p-2 rounded-lg border text-gray-400 cursor-pointer" style={{ borderColor: '#E5E7EB' }}><Download size={14} /></button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: '#F0FDF4' }}>
                  {['Course', 'Gross Revenue', 'Refunds', 'Net Earnings', 'Payout Status'].map((h) => (
                    <th key={h} className="px-5 py-3 text-[11px] font-black text-gray-400 uppercase tracking-wider text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {earningsBreakdown.map((e, i) => (
                  <tr key={i} className="border-t hover:bg-gray-50" style={{ borderColor: '#F0FDF4' }}>
                    <td className="px-5 py-3 text-xs font-bold text-gray-900 max-w-48 truncate">{e.course}</td>
                    <td className="px-5 py-3 text-xs font-black text-gray-700">{e.gross}</td>
                    <td className="px-5 py-3 text-xs font-bold" style={{ color: '#DC2626' }}>{e.refunds}</td>
                    <td className="px-5 py-3 text-xs font-black" style={{ color: '#059669' }}>{e.net}</td>
                    <td className="px-5 py-3"><StatusBadge status={e.payout} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </FadeIn>

      <FadeIn delay={0.2}>
        <Card className="p-5">
          <h3 className="font-black text-gray-900 mb-4">Monthly Earnings Chart</h3>
          <div className="flex items-end gap-3 h-32">
            {monthlyEarnings.map((d, i) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full rounded-t-lg group relative cursor-pointer" style={{ height: `${(d.value / 75) * 128}px`, background: i === monthlyEarnings.length - 1 ? '#059669' : '#BBF7D0', minHeight: 6 }}>
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none">{d.amount}</div>
                </div>
                <span className="text-[11px] text-gray-500">{d.month}</span>
              </div>
            ))}
          </div>
        </Card>
      </FadeIn>
    </div>
  )
}

/* 5.8 Coupons */
function CouponsSection() {
  const [showCreate, setShowCreate] = useState(false)
  const [code, setCode] = useState('')

  return (
    <div className="space-y-5">
      <FadeIn>
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-gray-900">My Coupons</h3>
            <button onClick={() => setShowCreate(!showCreate)} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white border-none cursor-pointer" style={{ background: '#059669' }}>
              <Plus size={14} /> Create Coupon
            </button>
          </div>

          {showCreate && (
            <div className="mb-5 p-4 rounded-2xl border" style={{ borderColor: '#D1FAE5', background: '#F0FDF4' }}>
              <h4 className="font-bold text-gray-800 mb-3">New Course Coupon</h4>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { label: 'Coupon Code', placeholder: 'e.g. REACT100', value: code, setter: setCode },
                  { label: 'Discount', placeholder: 'e.g. 20% or ₹100' },
                  { label: 'Usage Limit', placeholder: 'e.g. 50' },
                  { label: 'Expiry Date', placeholder: 'YYYY-MM-DD' },
                ].map((f, i) => (
                  <div key={i}>
                    <label className="text-xs font-bold text-gray-500 mb-1 block">{f.label}</label>
                    <input value={f.value} onChange={f.setter ? (e) => f.setter(e.target.value) : undefined} placeholder={f.placeholder} className="w-full px-3 py-2 rounded-xl border text-sm outline-none" style={{ borderColor: '#D1FAE5' }} />
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <label className="text-xs font-bold text-gray-500 mb-1 block">Apply to Course</label>
                <select className="px-3 py-2 rounded-xl border text-sm outline-none" style={{ borderColor: '#D1FAE5' }}>
                  {myCourses.map((c) => <option key={c.id}>{c.title}</option>)}
                </select>
              </div>
              <div className="flex gap-2 mt-3">
                <button className="px-4 py-2 rounded-xl text-sm font-bold text-white border-none cursor-pointer" style={{ background: '#059669' }}>Create</button>
                <button onClick={() => setShowCreate(false)} className="px-4 py-2 rounded-xl text-sm font-bold border cursor-pointer bg-white" style={{ borderColor: '#E5E7EB', color: '#6B7280' }}>Cancel</button>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: '#F0FDF4' }}>
                  {['Code', 'Course', 'Discount', 'Uses', 'Revenue', 'Expiry', 'Status'].map((h) => (
                    <th key={h} className="px-4 py-3 text-[11px] font-black text-gray-400 uppercase tracking-wider text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {myCoupons.map((c, i) => (
                  <tr key={i} className="border-t hover:bg-gray-50" style={{ borderColor: '#F0FDF4' }}>
                    <td className="px-4 py-3"><code className="text-xs font-black px-2 py-1 rounded-lg" style={{ background: '#F0FDF4', color: '#059669' }}>{c.code}</code></td>
                    <td className="px-4 py-3 text-xs text-gray-500 max-w-36 truncate">{c.course}</td>
                    <td className="px-4 py-3 text-xs font-black" style={{ color: '#059669' }}>{c.discount}</td>
                    <td className="px-4 py-3 text-xs font-bold text-gray-700">{c.uses}/{c.limit}</td>
                    <td className="px-4 py-3 text-xs font-black text-gray-700">{c.revenue}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{c.expiry}</td>
                    <td className="px-4 py-3"><StatusBadge status={c.status === 'Active' ? 'Active' : 'Expired'} /></td>
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

/* 5.9 Q&A */
function QASection() {
  const [replyOpen, setReplyOpen] = useState(null)
  const [replyText, setReplyText] = useState('')
  const unanswered = qaItems.filter((q) => !q.answered).length

  return (
    <div className="space-y-5">
      <FadeIn>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { label: 'Total Questions', value: qaItems.length.toString(), color: '#4F46E5', bg: '#EEF2FF' },
            { label: 'Unanswered', value: unanswered.toString(), color: '#DC2626', bg: '#FEF2F2' },
            { label: 'Response Rate', value: '94%', color: '#059669', bg: '#F0FDF4' },
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
          <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: '#D1FAE5' }}>
            <h3 className="font-black text-gray-900">Student Questions</h3>
            {unanswered > 0 && <span className="text-[10px] font-black px-2 py-0.5 rounded-full" style={{ background: '#FEF2F2', color: '#DC2626' }}>{unanswered} unanswered</span>}
          </div>
          <div className="divide-y" style={{ borderColor: '#F0FDF4' }}>
            {qaItems.map((q) => (
              <div key={q.id} className="p-5 hover:bg-gray-50" style={!q.answered ? { borderLeft: '3px solid #059669' } : {}}>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-xs shrink-0" style={{ background: q.color }}>{q.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-bold text-gray-900">{q.student}</p>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full" style={{ background: '#EEF2FF', color: '#4F46E5' }}>{q.course}</span>
                      <span className="flex items-center gap-1 text-[11px] text-gray-400"><ThumbsUp size={10} />{q.votes}</span>
                    </div>
                    <p className="text-[11px] text-gray-400 mb-2">{q.time}</p>
                    <p className="text-sm text-gray-700 font-medium">{q.question}</p>

                    {q.answered && q.reply && (
                      <div className="mt-3 p-3 rounded-xl border-l-4" style={{ borderLeftColor: '#059669', background: '#F0FDF4' }}>
                        <p className="text-[11px] font-bold" style={{ color: '#059669' }}>Your Answer:</p>
                        <p className="text-xs text-gray-600 mt-0.5">{q.reply}</p>
                      </div>
                    )}

                    {!q.answered && (
                      <div className="mt-3">
                        {replyOpen === q.id ? (
                          <div className="space-y-2">
                            <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Write your answer…" rows={3} className="w-full px-3 py-2 rounded-xl border text-sm outline-none resize-none" style={{ borderColor: '#D1FAE5' }} />
                            <div className="flex gap-2">
                              <button onClick={() => { setReplyOpen(null); setReplyText('') }} className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border-none cursor-pointer text-white" style={{ background: '#059669' }}><Send size={11} />Post Answer</button>
                              <button onClick={() => setReplyOpen(null)} className="text-xs font-bold px-3 py-1.5 rounded-lg border cursor-pointer bg-white" style={{ borderColor: '#E5E7EB', color: '#6B7280' }}>Cancel</button>
                            </div>
                          </div>
                        ) : (
                          <button onClick={() => setReplyOpen(q.id)} className="flex items-center gap-1.5 text-xs font-bold border-none cursor-pointer bg-transparent" style={{ color: '#059669' }}>
                            <MessageSquare size={13} /> Answer this question
                          </button>
                        )}
                      </div>
                    )}
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

/* 5.10 Notifications */
function NotificationsSection() {
  return (
    <div className="space-y-5">
      <FadeIn>
        <Card className="overflow-hidden">
          <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: '#D1FAE5' }}>
            <h3 className="font-black text-gray-900">Notifications</h3>
            <button className="text-xs font-bold border-none cursor-pointer bg-transparent" style={{ color: '#059669' }}>Mark all read</button>
          </div>
          <div className="divide-y" style={{ borderColor: '#F0FDF4' }}>
            {notifications.map((n, i) => {
              const Icon = n.icon
              return (
                <div key={i} className="flex items-start gap-4 px-5 py-4 hover:bg-gray-50">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: n.color + '15' }}><Icon size={16} style={{ color: n.color }} /></div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-700">{n.text}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1"><Clock size={9} />{n.time}</p>
                  </div>
                  {i < 2 && <span className="w-2 h-2 rounded-full bg-green-500 shrink-0 mt-2" />}
                </div>
              )
            })}
          </div>
        </Card>
      </FadeIn>
    </div>
  )
}

/* 5.11 Profile & Settings */
function SettingsSection() {
  const [kyc, setKyc] = useState('Verified')
  return (
    <div className="space-y-5">
      <div className="grid lg:grid-cols-2 gap-4">
        <FadeIn>
          <Card className="p-6">
            <h3 className="font-black text-gray-900 mb-4 flex items-center gap-2"><User size={18} style={{ color: '#059669' }} /> Profile</h3>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 rounded-full flex items-center justify-center font-black text-white text-xl" style={{ background: 'linear-gradient(135deg, #059669, #10B981)' }}>AJ</div>
              <div>
                <p className="font-bold text-gray-900">Alex Johnson</p>
                <p className="text-sm text-gray-400">alex.johnson@viscanolearn.com</p>
                <button className="text-xs font-bold mt-1 border-none cursor-pointer bg-transparent" style={{ color: '#059669' }}>Change Photo</button>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Display Name', value: 'Alex Johnson' },
                { label: 'Bio', value: 'Senior Frontend Engineer · 10 years exp', type: 'textarea' },
                { label: 'Headline', value: 'Expert React & System Design Instructor' },
              ].map((f) => (
                <div key={f.label}>
                  <label className="text-xs font-bold text-gray-500 mb-1 block">{f.label}</label>
                  {f.type === 'textarea'
                    ? <textarea defaultValue={f.value} rows={2} className="w-full px-3 py-2 rounded-xl border text-sm outline-none resize-none" style={{ borderColor: '#D1FAE5' }} />
                    : <input defaultValue={f.value} className="w-full px-3 py-2 rounded-xl border text-sm outline-none" style={{ borderColor: '#D1FAE5' }} />}
                </div>
              ))}
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Card className="p-6">
            <h3 className="font-black text-gray-900 mb-4 flex items-center gap-2"><Link2 size={18} style={{ color: '#059669' }} /> Social Links</h3>
            <div className="space-y-3">
              {[
                { label: 'Website', placeholder: 'https://yourwebsite.com' },
                { label: 'LinkedIn', placeholder: 'linkedin.com/in/yourprofile' },
                { label: 'GitHub', placeholder: 'github.com/yourprofile' },
                { label: 'Twitter / X', placeholder: '@yourhandle' },
                { label: 'YouTube', placeholder: 'youtube.com/@yourchannel' },
              ].map((f) => (
                <div key={f.label}>
                  <label className="text-xs font-bold text-gray-500 mb-1 block">{f.label}</label>
                  <input placeholder={f.placeholder} className="w-full px-3 py-2 rounded-xl border text-sm outline-none" style={{ borderColor: '#D1FAE5' }} />
                </div>
              ))}
            </div>
            <button className="mt-4 px-5 py-2.5 rounded-xl text-sm font-bold text-white border-none cursor-pointer" style={{ background: '#059669' }}>Save Links</button>
          </Card>
        </FadeIn>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <FadeIn delay={0.2}>
          <Card className="p-6">
            <h3 className="font-black text-gray-900 mb-4 flex items-center gap-2"><CreditCard size={18} style={{ color: '#059669' }} /> Payment Details</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-gray-500 mb-1 block">Payout Method</label>
                <div className="flex gap-2">
                  {['Bank Transfer', 'UPI', 'PayPal'].map((m) => (
                    <button key={m} className="px-3 py-1.5 rounded-xl text-xs font-bold border-none cursor-pointer" style={m === 'Bank Transfer' ? { background: '#059669', color: '#fff' } : { background: '#F3F4F6', color: '#6B7280' }}>{m}</button>
                  ))}
                </div>
              </div>
              {[{ label: 'Account Holder', val: 'Alex Johnson' }, { label: 'Bank Name', val: 'HDFC Bank' }, { label: 'Account Number', val: '••••••••4521' }, { label: 'IFSC Code', val: 'HDFC0001234' }].map((f) => (
                <div key={f.label}>
                  <label className="text-xs font-bold text-gray-500 mb-1 block">{f.label}</label>
                  <input defaultValue={f.val} className="w-full px-3 py-2 rounded-xl border text-sm outline-none" style={{ borderColor: '#D1FAE5' }} />
                </div>
              ))}
              <button className="px-5 py-2.5 rounded-xl text-sm font-bold text-white border-none cursor-pointer" style={{ background: '#059669' }}>Save Payment Info</button>
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={0.25}>
          <Card className="p-6">
            <h3 className="font-black text-gray-900 mb-4 flex items-center gap-2"><Shield size={18} style={{ color: '#059669' }} /> KYC Verification</h3>
            <div className="p-4 rounded-xl mb-4" style={{ background: kyc === 'Verified' ? '#F0FDF4' : '#FFFBEB', border: `1px solid ${kyc === 'Verified' ? '#D1FAE5' : '#FDE68A'}` }}>
              <div className="flex items-center gap-2">
                {kyc === 'Verified' ? <CheckCircle size={18} style={{ color: '#059669' }} /> : <AlertCircle size={18} style={{ color: '#D97706' }} />}
                <p className="font-bold text-gray-900">KYC Status: {kyc}</p>
              </div>
              {kyc === 'Verified' && <p className="text-xs text-gray-500 mt-1 ml-7">Identity verified · Payouts enabled · Last checked Apr 1, 2026</p>}
            </div>
            {kyc !== 'Verified' && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-gray-500 mb-1 block">Government ID (Aadhaar / PAN)</label>
                  <div className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:bg-green-50" style={{ borderColor: '#D1FAE5' }}>
                    <Upload size={20} className="mx-auto mb-1 text-gray-300" />
                    <p className="text-xs text-gray-400">Upload ID document</p>
                  </div>
                </div>
                <button className="w-full px-5 py-2.5 rounded-xl text-sm font-bold text-white border-none cursor-pointer" style={{ background: '#059669' }}>Submit for Verification</button>
              </div>
            )}
          </Card>
        </FadeIn>
      </div>
    </div>
  )
}

/* ─── MAIN PAGE ──────────────────────────────────────────── */
export default function InstructorDashboard() {
  const [activeSection, setActiveSection] = useState('overview')
  const title = SECTION_TITLES[activeSection] || 'Instructor Dashboard'

  const sections = {
    overview: <OverviewSection />,
    create: <CreateCourseSection />,
    courses: <MyCoursesSection />,
    content: <ContentSection />,
    students: <StudentsSection />,
    reviews: <ReviewsSection />,
    earnings: <EarningsSection />,
    coupons: <CouponsSection />,
    qa: <QASection />,
    notifications: <NotificationsSection />,
    settings: <SettingsSection />,
  }

  return (
    <InstructorDashboardLayout title={title} activeSection={activeSection} onNavigate={setActiveSection}>
      {sections[activeSection]}
    </InstructorDashboardLayout>
  )
}
