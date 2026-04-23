import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  User, Mail, Phone, MapPin, Calendar, Edit2, Save, X,
  BookOpen, Award, Flame, Video, Camera, CheckCircle, Loader2,
  Globe, Link2, GitBranch, MessageCircle,
} from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'
import { useAuth } from '../context/AuthContext'
import { useCourse } from '../context/CourseContext'
import { useLiveClass } from '../context/LiveClassContext'
import { db } from '../lib/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

const defaultProfile = {
  displayName: '',
  bio: '',
  phone: '',
  location: '',
  website: '',
  linkedin: '',
  github: '',
  twitter: '',
  joinedAt: new Date().toISOString(),
}

function Avatar({ initials, size = 'lg' }) {
  const dim = size === 'lg' ? 'w-24 h-24 text-3xl' : 'w-10 h-10 text-sm'
  return (
    <div
      className={`${dim} rounded-full flex items-center justify-center font-black text-white shrink-0`}
      style={{ background: 'linear-gradient(135deg, #4F46E5, #6366f1)' }}
    >
      {initials}
    </div>
  )
}

function StatCard({ icon: Icon, label, value, color, bg, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="rounded-2xl p-5 bg-white border flex items-center gap-4"
      style={{ borderColor: '#E8E6FF' }}
    >
      <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: bg }}>
        <Icon size={20} style={{ color }} />
      </div>
      <div>
        <p className="text-2xl font-black text-gray-900">{value}</p>
        <p className="text-xs text-gray-400 font-medium">{label}</p>
      </div>
    </motion.div>
  )
}

function Field({ label, value, icon: Icon, editing, name, onChange, placeholder, type = 'text' }) {
  return (
    <div>
      <label className="text-xs font-bold text-gray-500 mb-1.5 flex items-center gap-1.5">
        <Icon size={12} />
        {label}
      </label>
      {editing ? (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-3 py-2 rounded-xl border text-sm text-gray-800 outline-none transition-colors focus:border-indigo-400"
          style={{ borderColor: '#E8E6FF', background: '#FAFAFE' }}
        />
      ) : (
        <p className="text-sm text-gray-800 px-3 py-2 rounded-xl bg-gray-50 min-h-[38px]">
          {value || <span className="text-gray-300">Not set</span>}
        </p>
      )}
    </div>
  )
}

export default function ProfilePage() {
  const { user } = useAuth()
  const { enrolledCourses, streak, certificates, hoursLearned } = useCourse()
  const { registeredClasses } = useLiveClass()

  const [profile, setProfile] = useState({
    ...defaultProfile,
    displayName: user?.displayName || '',
    joinedAt: user?.metadata?.creationTime || new Date().toISOString(),
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(profile)
  const [saved, setSaved] = useState(false)

  // Load profile from Firestore on mount
  useEffect(() => {
    if (!user?.uid) { setLoading(false); return }
    const userRef = doc(db, 'users', user.uid)
    getDoc(userRef).then((snap) => {
      if (snap.exists()) {
        const data = snap.data()
        const loaded = { ...defaultProfile, ...data }
        setProfile(loaded)
        setDraft(loaded)
      }
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [user?.uid])

  const displayName = profile.displayName || user?.displayName || user?.email?.split('@')[0] || 'Student'
  const initials = displayName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)

  const handleEdit = () => {
    setDraft(profile)
    setEditing(true)
    setSaved(false)
  }

  const handleCancel = () => {
    setDraft(profile)
    setEditing(false)
  }

  const handleSave = async () => {
    if (!user?.uid) return
    setSaving(true)
    try {
      await setDoc(doc(db, 'users', user.uid), {
        ...draft,
        email: user.email,
        uid: user.uid,
      }, { merge: true })
      setProfile(draft)
      setEditing(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setDraft((prev) => ({ ...prev, [name]: value }))
  }

  const joinDate = profile.joinedAt
    ? new Date(profile.joinedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    : 'Recently'

  const stats = [
    { icon: BookOpen, label: 'Courses Enrolled', value: enrolledCourses.length, color: '#4F46E5', bg: '#EEF2FF', delay: 0 },
    { icon: Award, label: 'Certificates', value: certificates, color: '#F59E0B', bg: '#FFFBEB', delay: 0.07 },
    { icon: Flame, label: 'Day Streak', value: streak, color: '#EF4444', bg: '#FEF2F2', delay: 0.14 },
    { icon: Video, label: 'Live Classes', value: registeredClasses.length, color: '#7C3AED', bg: '#F5F3FF', delay: 0.21 },
  ]

  return (
    <DashboardLayout
      title="My Profile"
      subtitle="Manage your personal information and preferences"
    >
      {/* Saved toast */}
      {saved && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white shadow-lg"
          style={{ background: '#10B981' }}
        >
          <CheckCircle size={15} />
          Profile saved!
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── Left column: avatar + quick info ── */}
        <div className="lg:col-span-1 flex flex-col gap-5">

          {/* Avatar card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl bg-white border p-6 flex flex-col items-center text-center"
            style={{ borderColor: '#E8E6FF' }}
          >
            <div className="relative mb-4">
              <Avatar initials={initials} size="lg" />
              {editing && (
                <button
                  className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center text-white border-2 border-white cursor-pointer"
                  style={{ background: '#4F46E5' }}
                  title="Change avatar (coming soon)"
                >
                  <Camera size={12} />
                </button>
              )}
            </div>

            <h2 className="text-base font-black text-gray-900 mb-0.5">{displayName}</h2>
            <p className="text-xs text-gray-400 mb-1">{user?.email}</p>
            <p className="text-[11px] text-gray-400 mb-4">Member since {joinDate}</p>

            {profile.bio && !editing && (
              <p className="text-xs text-gray-600 leading-relaxed mb-4 text-center">{profile.bio}</p>
            )}

            {/* Social links */}
            {!editing && (profile.linkedin || profile.github || profile.twitter || profile.website) && (
              <div className="flex gap-2 mb-4">
                {profile.website && (
                  <a href={profile.website} target="_blank" rel="noreferrer"
                    className="w-8 h-8 rounded-lg flex items-center justify-center border transition-colors hover:border-indigo-300"
                    style={{ borderColor: '#E8E6FF', color: '#6B7280' }}>
                    <Globe size={14} />
                  </a>
                )}
                {profile.linkedin && (
                  <a href={profile.linkedin} target="_blank" rel="noreferrer"
                    className="w-8 h-8 rounded-lg flex items-center justify-center border transition-colors hover:border-indigo-300"
                    style={{ borderColor: '#E8E6FF', color: '#0A66C2' }}>
                    <Link2 size={14} />
                  </a>
                )}
                {profile.github && (
                  <a href={profile.github} target="_blank" rel="noreferrer"
                    className="w-8 h-8 rounded-lg flex items-center justify-center border transition-colors hover:border-indigo-300"
                    style={{ borderColor: '#E8E6FF', color: '#333' }}>
                    <GitBranch size={14} />
                  </a>
                )}
                {profile.twitter && (
                  <a href={profile.twitter} target="_blank" rel="noreferrer"
                    className="w-8 h-8 rounded-lg flex items-center justify-center border transition-colors hover:border-indigo-300"
                    style={{ borderColor: '#E8E6FF', color: '#1DA1F2' }}>
                    <MessageCircle size={14} />
                  </a>
                )}
              </div>
            )}

            {!editing ? (
              <button
                onClick={handleEdit}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-white border-none cursor-pointer w-full justify-center"
                style={{ background: '#4F46E5' }}
              >
                <Edit2 size={13} />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2 w-full">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border cursor-pointer flex-1 justify-center bg-white"
                  style={{ borderColor: '#E8E6FF', color: '#6B7280' }}
                >
                  <X size={13} />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white border-none cursor-pointer flex-1 justify-center disabled:opacity-60"
                  style={{ background: '#4F46E5' }}
                >
                  {saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
                  {saving ? 'Saving…' : 'Save'}
                </button>
              </div>
            )}
          </motion.div>

          {/* Learning progress summary */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="rounded-2xl bg-white border p-5"
            style={{ borderColor: '#E8E6FF' }}
          >
            <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">Learning Summary</h3>
            <div className="space-y-3">
              {[
                { label: 'Hours of content', value: `${Math.round(hoursLearned)}h`, color: '#4F46E5' },
                { label: 'Courses completed', value: `${certificates} / ${enrolledCourses.length}`, color: '#10B981' },
                { label: 'Current streak', value: `${streak} day${streak !== 1 ? 's' : ''}`, color: '#EF4444' },
                { label: 'Live classes attended', value: registeredClasses.length, color: '#7C3AED' },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{label}</span>
                  <span className="text-xs font-black" style={{ color }}>{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Right column: edit fields + stats ── */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>

          {/* Personal info card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="rounded-2xl bg-white border p-6"
            style={{ borderColor: '#E8E6FF' }}
          >
            <h3 className="text-sm font-black text-gray-900 mb-5 flex items-center gap-2">
              <User size={16} style={{ color: '#4F46E5' }} />
              Personal Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-gray-500 mb-1.5 flex items-center gap-1.5">
                  <User size={12} />
                  Display Name
                </label>
                {editing ? (
                  <input
                    type="text"
                    name="displayName"
                    value={draft.displayName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full px-3 py-2 rounded-xl border text-sm text-gray-800 outline-none transition-colors focus:border-indigo-400"
                    style={{ borderColor: '#E8E6FF', background: '#FAFAFE' }}
                  />
                ) : (
                  <p className="text-sm text-gray-800 px-3 py-2 rounded-xl bg-gray-50 min-h-[38px]">
                    {displayName}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-gray-500 mb-1.5 flex items-center gap-1.5">
                  <Mail size={12} />
                  Email Address
                </label>
                <p className="text-sm text-gray-400 px-3 py-2 rounded-xl bg-gray-50 min-h-[38px]">
                  {user?.email}
                  <span className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: '#ECFDF5', color: '#16A34A' }}>Verified</span>
                </p>
              </div>

              <Field
                label="Phone Number"
                icon={Phone}
                name="phone"
                value={editing ? draft.phone : profile.phone}
                onChange={handleChange}
                editing={editing}
                placeholder="+1 234 567 8900"
                type="tel"
              />

              <Field
                label="Location"
                icon={MapPin}
                name="location"
                value={editing ? draft.location : profile.location}
                onChange={handleChange}
                editing={editing}
                placeholder="City, Country"
              />
            </div>

            {/* Bio */}
            <div className="mt-4">
              <label className="text-xs font-bold text-gray-500 mb-1.5 flex items-center gap-1.5">
                <Edit2 size={12} />
                Bio
              </label>
              {editing ? (
                <textarea
                  name="bio"
                  value={draft.bio}
                  onChange={handleChange}
                  placeholder="Tell us a bit about yourself..."
                  rows={3}
                  className="w-full px-3 py-2 rounded-xl border text-sm text-gray-800 outline-none resize-none transition-colors focus:border-indigo-400"
                  style={{ borderColor: '#E8E6FF', background: '#FAFAFE' }}
                />
              ) : (
                <p className="text-sm text-gray-800 px-3 py-2 rounded-xl bg-gray-50 min-h-[72px] leading-relaxed">
                  {profile.bio || <span className="text-gray-300">No bio added yet</span>}
                </p>
              )}
            </div>
          </motion.div>

          {/* Social links card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="rounded-2xl bg-white border p-6"
            style={{ borderColor: '#E8E6FF' }}
          >
            <h3 className="text-sm font-black text-gray-900 mb-5 flex items-center gap-2">
              <Globe size={16} style={{ color: '#4F46E5' }} />
              Social &amp; Links
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Website', name: 'website', icon: Globe, placeholder: 'https://yoursite.com' },
                { label: 'LinkedIn', name: 'linkedin', icon: Link2, placeholder: 'https://linkedin.com/in/...' },
                { label: 'GitHub', name: 'github', icon: GitBranch, placeholder: 'https://github.com/...' },
                { label: 'MessageCircle / X', name: 'twitter', icon: MessageCircle, placeholder: 'https://twitter.com/...' },
              ].map(({ label, name, icon: Icon, placeholder }) => (
                <Field
                  key={name}
                  label={label}
                  icon={Icon}
                  name={name}
                  value={editing ? draft[name] : profile[name]}
                  onChange={handleChange}
                  editing={editing}
                  placeholder={placeholder}
                />
              ))}
            </div>
          </motion.div>

          {/* Account info card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.25 }}
            className="rounded-2xl bg-white border p-6"
            style={{ borderColor: '#E8E6FF' }}
          >
            <h3 className="text-sm font-black text-gray-900 mb-5 flex items-center gap-2">
              <Calendar size={16} style={{ color: '#4F46E5' }} />
              Account Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Account Email', value: user?.email },
                { label: 'Member Since', value: joinDate },
                { label: 'Account Type', value: 'Student' },
                { label: 'Auth Provider', value: user?.providerData?.[0]?.providerId === 'google.com' ? 'Google' : 'Email / Password' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs font-bold text-gray-400 mb-1">{label}</p>
                  <p className="text-sm font-semibold text-gray-800">{value || '—'}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </DashboardLayout>
  )
}
