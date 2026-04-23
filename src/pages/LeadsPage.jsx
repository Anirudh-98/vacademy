import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../lib/firebase'
import {
  Users, Mail, Phone, Building2, GraduationCap, BookOpen,
  Sparkles, RefreshCw, ChevronDown, ChevronUp, Search, X,
} from 'lucide-react'

const MASTERCLASS_LABEL = { true: 'Yes', false: 'No' }

function Badge({ children, color = 'indigo' }) {
  const styles = {
    indigo: { background: 'rgba(79,70,229,0.1)', color: '#4F46E5' },
    green:  { background: 'rgba(34,197,94,0.1)',  color: '#16a34a' },
    amber:  { background: 'rgba(245,158,11,0.1)', color: '#d97706' },
    gray:   { background: '#f3f4f6',              color: '#6b7280' },
  }
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold"
      style={styles[color]}
    >
      {children}
    </span>
  )
}

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-5 flex items-center gap-4"
      style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #f0f0f0' }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: color }}
      >
        <Icon size={18} className="text-white" />
      </div>
      <div>
        <p className="text-2xl font-black text-gray-900">{value}</p>
        <p className="text-xs text-gray-400 font-medium mt-0.5">{label}</p>
      </div>
    </motion.div>
  )
}

function LeadRow({ lead, index }) {
  const [expanded, setExpanded] = useState(false)

  const ts = lead.submittedAt?.toDate?.()
  const dateStr = ts
    ? ts.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    : '—'
  const timeStr = ts
    ? ts.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    : ''

  return (
    <>
      <motion.tr
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.04 }}
        className="border-b border-gray-50 cursor-pointer"
        style={{ background: expanded ? 'rgba(79,70,229,0.02)' : 'white' }}
        onClick={() => setExpanded((e) => !e)}
        onMouseEnter={(e) => { if (!expanded) e.currentTarget.style.background = '#fafafa' }}
        onMouseLeave={(e) => { e.currentTarget.style.background = expanded ? 'rgba(79,70,229,0.02)' : 'white' }}
      >
        <td className="px-5 py-4 text-xs text-gray-400 font-mono">{index + 1}</td>
        <td className="px-5 py-4">
          <div className="font-semibold text-sm text-gray-900">{lead.name}</div>
          <div className="text-xs text-gray-400 mt-0.5">{lead.email}</div>
        </td>
        <td className="px-5 py-4 text-sm text-gray-600">{lead.whatsapp}</td>
        <td className="px-5 py-4 text-sm text-gray-600 max-w-[180px] truncate">{lead.college}</td>
        <td className="px-5 py-4">
          <Badge color="amber">{lead.year}</Badge>
        </td>
        <td className="px-5 py-4">
          <Badge color={lead.masterclassInterest ? 'green' : 'gray'}>
            {MASTERCLASS_LABEL[String(lead.masterclassInterest)] ?? '—'}
          </Badge>
        </td>
        <td className="px-5 py-4">
          <div className="text-xs text-gray-600">{dateStr}</div>
          <div className="text-xs text-gray-400">{timeStr}</div>
        </td>
        <td className="px-5 py-4 text-gray-400">
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </td>
      </motion.tr>

      <AnimatePresence>
        {expanded && (
          <motion.tr
            key="expanded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <td colSpan={8} className="px-5 pb-4 pt-0" style={{ background: 'rgba(79,70,229,0.02)' }}>
              <div className="pl-4 border-l-2 border-indigo-200 ml-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Interested Courses
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {lead.interestedCourses?.length > 0
                    ? lead.interestedCourses.map((c) => (
                        <Badge key={c} color="indigo">{c}</Badge>
                      ))
                    : <span className="text-xs text-gray-400">None selected</span>
                  }
                </div>
              </div>
            </td>
          </motion.tr>
        )}
      </AnimatePresence>
    </>
  )
}

export default function LeadsPage() {
  const [leads, setLeads]     = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')
  const [search, setSearch]   = useState('')
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    setLoading(true)
    setError('')
    const q = query(collection(db, 'student_leads'), orderBy('submittedAt', 'desc'))
    getDocs(q)
      .then((snap) => {
        setLeads(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
      })
      .catch(() => setError('Failed to load leads. Check Firestore permissions.'))
      .finally(() => setLoading(false))
  }, [refreshKey])

  const filtered = leads.filter((l) => {
    const q = search.toLowerCase()
    return (
      l.name?.toLowerCase().includes(q) ||
      l.email?.toLowerCase().includes(q) ||
      l.college?.toLowerCase().includes(q) ||
      l.whatsapp?.includes(q) ||
      l.interestedCourses?.some((c) => c.toLowerCase().includes(q))
    )
  })

  const masterclassYes = leads.filter((l) => l.masterclassInterest === true).length

  return (
    <div
      className="min-h-screen py-10 px-4"
      style={{ background: 'linear-gradient(160deg, #f0f1ff 0%, #ffffff 50%, #f5f7ff 100%)' }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-3"
              style={{ background: 'rgba(79,70,229,0.08)', color: '#4F46E5' }}
            >
              <Sparkles size={11} /> Admin Dashboard
            </div>
            <h1 className="text-3xl font-black text-gray-900">Student Leads</h1>
            <p className="text-sm text-gray-400 mt-1">All course enrollment submissions</p>
          </div>
          <button
            onClick={() => setRefreshKey((k) => k + 1)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-indigo-600 border-2 border-indigo-100 bg-white cursor-pointer hover:bg-indigo-50 transition-colors"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={Users} label="Total Leads" value={leads.length}
            color="linear-gradient(135deg, #4F46E5, #6366f1)"
          />
          <StatCard
            icon={Sparkles} label="Masterclass Interest" value={masterclassYes}
            color="linear-gradient(135deg, #16a34a, #22c55e)"
          />
          <StatCard
            icon={Building2} label="Colleges" value={new Set(leads.map((l) => l.college)).size}
            color="linear-gradient(135deg, #d97706, #f59e0b)"
          />
          <StatCard
            icon={BookOpen} label="Course Selections"
            value={leads.reduce((acc, l) => acc + (l.interestedCourses?.length || 0), 0)}
            color="linear-gradient(135deg, #0891b2, #06b6d4)"
          />
        </div>

        {/* Table card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-3xl overflow-hidden"
          style={{ boxShadow: '0 8px 40px rgba(79,70,229,0.08)', border: '1px solid rgba(79,70,229,0.08)' }}
        >
          {/* Search bar */}
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
            <Search size={15} className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search by name, email, college, course..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 text-sm outline-none text-gray-700 placeholder-gray-400 bg-transparent"
            />
            {search && (
              <button onClick={() => setSearch('')} className="text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer p-0">
                <X size={14} />
              </button>
            )}
            <span className="text-xs text-gray-400 font-medium flex-shrink-0">
              {filtered.length} of {leads.length}
            </span>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-20 gap-3 text-gray-400">
              <span className="w-5 h-5 border-2 border-indigo-200 border-t-indigo-500 rounded-full animate-spin" />
              <span className="text-sm">Loading leads…</span>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="text-center py-16">
              <p className="text-red-500 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && leads.length === 0 && (
            <div className="text-center py-20">
              <Users size={36} className="text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">No leads yet. Share the registration form to get started.</p>
            </div>
          )}

          {/* Table */}
          {!loading && !error && leads.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr style={{ background: '#fafafa' }}>
                    {['#', 'Student', 'WhatsApp', 'College', 'Year', 'Masterclass', 'Submitted', ''].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center py-12 text-sm text-gray-400">
                        No leads match your search.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((lead, i) => (
                      <LeadRow key={lead.id} lead={lead} index={i} />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        <p className="text-center text-xs text-gray-300 mt-6">
          Data sourced from Firestore · student_leads collection
        </p>
      </div>
    </div>
  )
}
