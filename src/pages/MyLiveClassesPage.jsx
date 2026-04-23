import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Video, Calendar, Users, CheckCircle } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'
import { useLiveClass } from '../context/LiveClassContext'
import { liveClasses, categoryColors } from '../data/liveClasses'

/* ── Countdown hook ── */
function useCountdown(targetDate) {
  const calc = () => {
    const diff = new Date(targetDate) - new Date()
    if (diff <= 0) return { h: 0, m: 0, s: 0 }
    return {
      h: Math.floor(diff / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    }
  }
  const [time, setTime] = useState(calc)
  useEffect(() => {
    const t = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(t)
  }, [targetDate])
  return time
}

function CountdownDisplay({ date }) {
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

function formatDateTime(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function ClassCard({ cls, registered, showRegisterButton, onSwitchTab }) {
  const catStyle = categoryColors[cls.category] || { bg: '#EEF2FF', color: '#4F46E5' }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl bg-white border overflow-hidden"
      style={{ borderColor: '#E8E6FF' }}
    >
      {/* Thumbnail */}
      <div className="relative h-36 overflow-hidden">
        <img src={cls.thumbnail} alt={cls.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 60%)' }} />
        {/* Category badge */}
        <span
          className="absolute top-2 left-2 text-[10px] font-bold px-2.5 py-1 rounded-full"
          style={{ background: catStyle.bg, color: catStyle.color }}
        >
          {cls.category}
        </span>
        {/* FREE badge */}
        <span
          className="absolute top-2 right-2 text-[10px] font-bold px-2.5 py-1 rounded-full"
          style={{ background: '#DCFCE7', color: '#16A34A' }}
        >
          FREE
        </span>
        {/* Countdown bottom-right */}
        <div className="absolute bottom-2 right-2">
          <CountdownDisplay date={cls.date} />
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="text-sm font-black text-gray-900 mb-1 leading-snug line-clamp-2">{cls.title}</h3>

        {/* Date/time */}
        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
          <Calendar size={12} />
          {formatDateTime(cls.date)}
        </div>

        {/* Instructor + enrolled */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <img src={cls.avatar} alt={cls.instructor} className="w-6 h-6 rounded-full object-cover" />
            <span className="text-xs font-semibold text-gray-700">{cls.instructor}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Users size={12} />
            {cls.enrolled.toLocaleString()}
          </div>
        </div>

        {/* Status / Action */}
        {registered ? (
          <div className="flex items-center justify-between">
            <span
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl"
              style={{ background: '#DCFCE7', color: '#16A34A' }}
            >
              <CheckCircle size={13} /> Registered
            </span>
            <Link
              to="/live"
              className="text-xs font-bold no-underline"
              style={{ color: '#4F46E5' }}
            >
              View on Live Page →
            </Link>
          </div>
        ) : showRegisterButton ? (
          <Link
            to="/live"
            className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl text-xs font-bold text-white no-underline"
            style={{ background: '#4F46E5' }}
          >
            Register Free →
          </Link>
        ) : null}
      </div>
    </motion.div>
  )
}

export default function MyLiveClassesPage() {
  const { registeredClasses, isRegistered } = useLiveClass()
  const [activeTab, setActiveTab] = useState('registered')

  const tabs = [
    { id: 'registered', label: 'Registered' },
    { id: 'all', label: 'All Classes' },
  ]

  return (
    <DashboardLayout
      title="Live Classes"
      subtitle={registeredClasses.length > 0
        ? `${registeredClasses.length} registered class${registeredClasses.length > 1 ? 'es' : ''}`
        : 'Browse upcoming live sessions'}
    >
      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b" style={{ borderColor: '#E8E6FF' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="px-4 pb-3 text-sm font-bold border-b-2 -mb-px cursor-pointer bg-transparent border-x-0 border-t-0 transition-colors"
            style={activeTab === tab.id
              ? { borderBottomColor: '#4F46E5', color: '#4F46E5' }
              : { borderBottomColor: 'transparent', color: '#9CA3AF' }}
          >
            {tab.label}
            {tab.id === 'registered' && registeredClasses.length > 0 && (
              <span
                className="ml-2 text-[10px] font-black px-2 py-0.5 rounded-full"
                style={{ background: '#F3E8FF', color: '#7C3AED' }}
              >
                {registeredClasses.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Registered tab */}
      {activeTab === 'registered' && (
        <>
          {registeredClasses.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-2xl"
              style={{ borderColor: '#E8E6FF' }}
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: '#F3E8FF' }}>
                <Video size={28} style={{ color: '#7C3AED' }} />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-1">No registered classes</h3>
              <p className="text-sm text-gray-400 mb-5">You haven't registered for any live class yet</p>
              <button
                onClick={() => setActiveTab('all')}
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-white border-none cursor-pointer"
                style={{ background: '#7C3AED' }}
              >
                Browse All Classes
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {registeredClasses.map((cls) => (
                <ClassCard key={cls.id} cls={cls} registered={true} showRegisterButton={false} />
              ))}
            </div>
          )}
        </>
      )}

      {/* All Classes tab */}
      {activeTab === 'all' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {liveClasses.map((cls) => (
            <ClassCard
              key={cls.id}
              cls={cls}
              registered={isRegistered(cls.id)}
              showRegisterButton={!isRegistered(cls.id)}
            />
          ))}
        </div>
      )}
    </DashboardLayout>
  )
}
