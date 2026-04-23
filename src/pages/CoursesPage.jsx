import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, SlidersHorizontal, Star, Clock, Users,
  Play, ChevronDown, X, BookOpen, LayoutGrid, List, CheckCircle,
} from 'lucide-react'
import { courses, categories, levels, sortOptions } from '../data/courses'
import CoursePreviewModal from '../components/CoursePreviewModal'
import { useCourse } from '../context/CourseContext'

const tagColors = {
  Bestseller: 'bg-yellow-400/90 text-yellow-900',
  Hot: 'bg-red-500/90 text-white',
  New: 'bg-green-500/90 text-white',
  Trending: 'bg-violet-600/90 text-white',
}

const levelColors = {
  Beginner: 'bg-green-100 text-green-700',
  Intermediate: 'bg-blue-100 text-blue-700',
  Advanced: 'bg-purple-100 text-purple-700',
}

// ── Course card (grid view) ────────────────────────────────
function CourseCard({ course, onPreview, index, enrolled }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="bg-white rounded-2xl overflow-hidden border border-purple-50 shadow-sm hover:shadow-xl hover:shadow-purple-100 transition-shadow group flex flex-col"
    >
      <div className="relative h-44 overflow-hidden bg-gray-100 flex-shrink-0">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => onPreview(course)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#6D28D9] text-sm font-bold shadow-lg border-none cursor-pointer"
          >
            <Play size={14} fill="currentColor" /> Quick Preview
          </motion.button>
        </div>
        <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${tagColors[course.tag]}`}>
          {course.tag}
        </span>
        <span className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full ${levelColors[course.level]}`}>
          {course.level}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex flex-wrap gap-1.5 mb-2">
          {course.topics.slice(0, 3).map((t) => (
            <span key={t} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-[#6D28D9]">{t}</span>
          ))}
        </div>
        <h3 className="font-bold text-[#111827] text-sm leading-snug mb-1 line-clamp-2">{course.title}</h3>
        <p className="text-xs text-gray-400 mb-3">{course.instructor}</p>

        <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
          <span className="flex items-center gap-1 text-yellow-500 font-bold">
            <Star size={11} fill="currentColor" /> {course.rating}
            <span className="text-gray-400 font-normal ml-0.5">({course.reviews.toLocaleString()})</span>
          </span>
          <span className="flex items-center gap-1"><Clock size={11} /> {course.duration}</span>
          <span className="flex items-center gap-1"><BookOpen size={11} /> {course.lessons}</span>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-base font-extrabold text-[#6D28D9]">{course.price}</span>
            <span className="text-xs text-gray-400 line-through ml-2">{course.originalPrice}</span>
          </div>
          {enrolled ? (
            <span className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-green-50 text-green-700 text-xs font-bold border border-green-200">
              <CheckCircle size={12} className="text-green-600" /> Enrolled
            </span>
          ) : (
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => onPreview(course)}
              className="px-4 py-2 rounded-xl bg-purple-50 text-[#6D28D9] text-xs font-bold border-none cursor-pointer hover:bg-[#6D28D9] hover:text-white transition-colors"
            >
              Enroll
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ── Course row (list view) ─────────────────────────────────
function CourseRow({ course, onPreview, index, enrolled }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="bg-white rounded-2xl overflow-hidden border border-purple-50 shadow-sm hover:shadow-lg hover:shadow-purple-100 transition-shadow flex gap-0 group"
    >
      <div className="relative w-40 sm:w-52 flex-shrink-0 overflow-hidden">
        <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onPreview(course)}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#6D28D9] border-none cursor-pointer shadow-lg"
          >
            <Play size={16} fill="currentColor" className="ml-0.5" />
          </motion.button>
        </div>
      </div>

      <div className="flex-1 p-5 flex flex-col sm:flex-row sm:items-center gap-4 min-w-0">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tagColors[course.tag]}`}>{course.tag}</span>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${levelColors[course.level]}`}>{course.level}</span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{course.category}</span>
          </div>
          <h3 className="font-bold text-[#111827] text-sm leading-snug mb-1 truncate">{course.title}</h3>
          <p className="text-xs text-gray-400 mb-2">{course.instructor}</p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1 text-yellow-500 font-bold">
              <Star size={11} fill="currentColor" /> {course.rating}
              <span className="text-gray-400 font-normal">({course.reviews.toLocaleString()})</span>
            </span>
            <span className="flex items-center gap-1"><Users size={11} /> {course.students}</span>
            <span className="flex items-center gap-1"><Clock size={11} /> {course.duration}</span>
            <span className="flex items-center gap-1"><BookOpen size={11} /> {course.lessons} lessons</span>
          </div>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end gap-3 flex-shrink-0">
          <div className="text-right">
            <p className="text-lg font-extrabold text-[#6D28D9]">{course.price}</p>
            <p className="text-xs text-gray-400 line-through">{course.originalPrice}</p>
          </div>
          {enrolled ? (
            <span className="flex items-center gap-1 px-4 py-2 rounded-xl bg-green-50 text-green-700 text-xs font-bold border border-green-200 whitespace-nowrap">
              <CheckCircle size={13} className="text-green-600" /> Enrolled
            </span>
          ) : (
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => onPreview(course)}
              className="px-5 py-2 rounded-xl bg-[#6D28D9] text-white text-xs font-bold border-none cursor-pointer whitespace-nowrap"
              style={{ boxShadow: '0 4px 12px rgba(109,40,217,0.3)' }}
            >
              Enroll Now
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ── Filter sidebar ─────────────────────────────────────────
function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-purple-50 pb-4 mb-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between text-sm font-bold text-[#111827] mb-3 bg-transparent border-none cursor-pointer p-0"
      >
        {title}
        <ChevronDown size={15} className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Main page ──────────────────────────────────────────────
export default function CoursesPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [level, setLevel] = useState('All Levels')
  const [sort, setSort] = useState('Most Popular')
  const [view, setView] = useState('grid')
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [mobileFilters, setMobileFilters] = useState(false)
  const { isEnrolled } = useCourse()

  const filtered = useMemo(() => {
    let list = [...courses]

    if (search) list = list.filter((c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor.toLowerCase().includes(search.toLowerCase()) ||
      c.topics.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    )
    if (category !== 'All') list = list.filter((c) => c.category === category)
    if (level !== 'All Levels') list = list.filter((c) => c.level === level)

    switch (sort) {
      case 'Highest Rated': list.sort((a, b) => b.rating - a.rating); break
      case 'Price: Low to High': list.sort((a, b) => parseInt(a.price.replace(/[₹,]/g, '')) - parseInt(b.price.replace(/[₹,]/g, ''))); break
      case 'Price: High to Low': list.sort((a, b) => parseInt(b.price.replace(/[₹,]/g, '')) - parseInt(a.price.replace(/[₹,]/g, ''))); break
      case 'Newest': list.sort((a, b) => (b.tag === 'New' ? 1 : 0) - (a.tag === 'New' ? 1 : 0)); break
      default: list.sort((a, b) => parseInt(b.students.replace(/,/g, '')) - parseInt(a.students.replace(/,/g, '')))
    }
    return list
  }, [search, category, level, sort])

  const activeFilters = [
    category !== 'All' && category,
    level !== 'All Levels' && level,
  ].filter(Boolean)

  const FilterPanel = () => (
    <div>
      {/* Search (in sidebar on desktop) */}
      <div className="relative mb-5">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search courses..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-purple-100 bg-[#F9FAFB] text-sm text-[#111827] outline-none focus:border-[#6D28D9] transition-colors"
          style={{ cursor: 'auto' }}
        />
      </div>

      <FilterSection title="Category">
        <div className="flex flex-col gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`text-left text-sm px-3 py-2 rounded-lg transition-colors cursor-pointer border-none ${
                category === cat
                  ? 'bg-purple-100 text-[#6D28D9] font-semibold'
                  : 'text-gray-600 hover:bg-purple-50 hover:text-[#6D28D9] bg-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Level">
        <div className="flex flex-col gap-1.5">
          {levels.map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={`text-left text-sm px-3 py-2 rounded-lg transition-colors cursor-pointer border-none ${
                level === l
                  ? 'bg-purple-100 text-[#6D28D9] font-semibold'
                  : 'text-gray-600 hover:bg-purple-50 hover:text-[#6D28D9] bg-transparent'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Rating" defaultOpen={false}>
        {[4.5, 4.0, 3.5].map((r) => (
          <label key={r} className="flex items-center gap-2.5 py-1.5 cursor-pointer">
            <input type="checkbox" className="accent-[#6D28D9] w-4 h-4" style={{ cursor: 'auto' }} />
            <span className="flex items-center gap-1 text-sm text-gray-600">
              <Star size={12} fill="#FBBF24" className="text-yellow-400" />
              {r}+ & above
            </span>
          </label>
        ))}
      </FilterSection>

      {activeFilters.length > 0 && (
        <button
          onClick={() => { setCategory('All'); setLevel('All Levels') }}
          className="w-full mt-2 py-2 rounded-xl text-xs font-bold text-red-500 border border-red-100 hover:bg-red-50 transition-colors cursor-pointer bg-transparent"
        >
          Clear all filters
        </button>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Hero banner */}
      <div
        className="relative pt-24 pb-14 px-6 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a0015 0%, #1a0035 60%, #0d0020 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '36px 36px' }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, #6D28D9, transparent)' }} />

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: '#C4B5FD' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Explore Our Library
          </motion.p>
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Find your next{' '}
            <span style={{
              background: 'linear-gradient(135deg, #C4B5FD, #9333EA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              skill
            </span>
          </motion.h1>
          <motion.p
            className="text-base max-w-lg mx-auto mb-8"
            style={{ color: 'rgba(196,181,253,0.65)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {courses.length} expert-led courses across development, design, data science, and more.
          </motion.p>

          {/* Hero search bar */}
          <motion.div
            className="max-w-xl mx-auto flex items-center gap-3 rounded-2xl px-5 py-3.5 border"
            style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(196,181,253,0.25)', backdropFilter: 'blur(20px)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Search size={18} style={{ color: 'rgba(196,181,253,0.6)' }} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses, topics, instructors..."
              className="flex-1 bg-transparent outline-none text-sm text-white placeholder-purple-300/40"
              style={{ cursor: 'auto' }}
            />
            {search && (
              <button onClick={() => setSearch('')} className="text-white/40 hover:text-white transition-colors cursor-pointer border-none bg-transparent">
                <X size={16} />
              </button>
            )}
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <p className="text-sm text-gray-500 flex-1">
            Showing <strong className="text-[#111827]">{filtered.length}</strong> courses
            {activeFilters.length > 0 && (
              <span className="ml-2 text-[#6D28D9]">— filtered</span>
            )}
          </p>

          {/* Active filter chips */}
          {activeFilters.map((f) => (
            <span key={f} className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-purple-100 text-[#6D28D9]">
              {f}
              <button
                onClick={() => { if (categories.includes(f)) setCategory('All'); else setLevel('All Levels') }}
                className="cursor-pointer border-none bg-transparent text-[#6D28D9] hover:text-purple-900 p-0 leading-none"
              >
                <X size={12} />
              </button>
            </span>
          ))}

          {/* Sort */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 text-sm rounded-xl border border-purple-100 bg-white text-[#111827] outline-none focus:border-[#6D28D9] transition-colors cursor-pointer font-medium"
            >
              {sortOptions.map((o) => <option key={o}>{o}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-1 p-1 bg-white rounded-xl border border-purple-100">
            <button
              onClick={() => setView('grid')}
              className={`p-1.5 rounded-lg cursor-pointer border-none transition-colors ${view === 'grid' ? 'bg-[#6D28D9] text-white' : 'bg-transparent text-gray-400 hover:text-[#6D28D9]'}`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-1.5 rounded-lg cursor-pointer border-none transition-colors ${view === 'list' ? 'bg-[#6D28D9] text-white' : 'bg-transparent text-gray-400 hover:text-[#6D28D9]'}`}
            >
              <List size={16} />
            </button>
          </div>

          {/* Mobile filter toggle */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileFilters(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-purple-100 text-sm font-semibold text-[#6D28D9] cursor-pointer"
          >
            <SlidersHorizontal size={15} /> Filters
            {activeFilters.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#6D28D9] text-white text-xs font-bold flex items-center justify-center">
                {activeFilters.length}
              </span>
            )}
          </motion.button>
        </div>

        <div className="flex gap-8 items-start">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-60 flex-shrink-0 bg-white rounded-2xl border border-purple-100 p-5 sticky top-24">
            <div className="flex items-center gap-2 mb-5">
              <SlidersHorizontal size={16} className="text-[#6D28D9]" />
              <span className="text-sm font-bold text-[#111827]">Filters</span>
            </div>
            <FilterPanel />
          </aside>

          {/* Course grid / list */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-24 text-center"
                >
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold text-[#111827] mb-2">No courses found</h3>
                  <p className="text-gray-500 text-sm mb-6">Try adjusting your filters or search term.</p>
                  <button
                    onClick={() => { setSearch(''); setCategory('All'); setLevel('All Levels') }}
                    className="px-6 py-2.5 rounded-xl bg-[#6D28D9] text-white text-sm font-bold cursor-pointer border-none"
                    style={{ boxShadow: '0 4px 12px rgba(109,40,217,0.3)' }}
                  >
                    Clear all filters
                  </button>
                </motion.div>
              ) : view === 'grid' ? (
                <motion.div
                  key="grid"
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                >
                  {filtered.map((c, i) => (
                    <CourseCard key={c.id} course={c} onPreview={setSelectedCourse} index={i} enrolled={isEnrolled(c.id)} />
                  ))}
                </motion.div>
              ) : (
                <motion.div key="list" className="flex flex-col gap-4">
                  {filtered.map((c, i) => (
                    <CourseRow key={c.id} course={c} onPreview={setSelectedCourse} index={i} enrolled={isEnrolled(c.id)} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {mobileFilters && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-[150] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilters(false)}
            />
            <motion.div
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-[160] p-6 max-h-[80vh] overflow-y-auto lg:hidden"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-bold text-[#111827]">Filters</h3>
                <button onClick={() => setMobileFilters(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer border-none text-gray-500">
                  <X size={16} />
                </button>
              </div>
              <FilterPanel />
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setMobileFilters(false)}
                className="w-full mt-4 py-3.5 rounded-xl bg-[#6D28D9] text-white font-bold text-sm cursor-pointer border-none"
                style={{ boxShadow: '0 4px 15px rgba(109,40,217,0.3)' }}
              >
                Show {filtered.length} courses
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Course preview modal */}
      <AnimatePresence>
        {selectedCourse && (
          <CoursePreviewModal
            course={selectedCourse}
            onClose={() => setSelectedCourse(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
