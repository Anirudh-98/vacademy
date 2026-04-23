import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Clock, BookOpen, BarChart2,
  Code2, Brain, Cloud, Palette, Shield, TrendingUp, Smartphone,
} from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'
import { useAuth } from '../context/AuthContext'
import { db } from '../lib/firebase'
import { doc, collection, onSnapshot, setDoc } from 'firebase/firestore'

/* ── Paths data (copied from LearningPathsPage) ── */
const paths = [
  {
    id: 1,
    title: 'Frontend Developer',
    subtitle: 'Build modern, responsive web apps',
    icon: Code2,
    color: '#4F46E5',
    bg: 'rgba(79,70,229,0.08)',
    duration: '6 months',
    courses: 8,
    level: 'Beginner → Advanced',
    enrolled: '32,400',
    tag: 'Most Popular',
    tagColor: '#f59e0b',
    steps: ['HTML & CSS Fundamentals', 'JavaScript Mastery', 'React & Next.js', 'TypeScript Patterns', 'Testing & Deployment'],
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Git', 'REST APIs'],
    description: 'Go from zero to a job-ready frontend developer. Cover everything from HTML basics to advanced React patterns used at top tech companies.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80',
  },
  {
    id: 2,
    title: 'Data Scientist',
    subtitle: 'Turn data into powerful insights',
    icon: Brain,
    color: '#7C3AED',
    bg: 'rgba(124,58,237,0.08)',
    duration: '8 months',
    courses: 10,
    level: 'Beginner → Advanced',
    enrolled: '28,100',
    tag: 'Trending',
    tagColor: '#ef4444',
    steps: ['Python Essentials', 'Data Analysis with Pandas', 'Machine Learning A-Z', 'Deep Learning', 'MLOps & Deployment'],
    skills: ['Python', 'Pandas', 'Scikit-learn', 'TensorFlow', 'SQL', 'Tableau'],
    description: 'Master data science from the ground up. Learn Python, statistics, machine learning, and how to deploy models that drive real business value.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80',
  },
  {
    id: 3,
    title: 'Cloud & DevOps Engineer',
    subtitle: 'Architect scalable cloud infrastructure',
    icon: Cloud,
    color: '#0891b2',
    bg: 'rgba(8,145,178,0.08)',
    duration: '7 months',
    courses: 9,
    level: 'Intermediate → Advanced',
    enrolled: '19,600',
    tag: 'In Demand',
    tagColor: '#10b981',
    steps: ['Linux & Networking', 'AWS Cloud Practitioner', 'Docker & Kubernetes', 'CI/CD Pipelines', 'Infrastructure as Code'],
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'ArgoCD'],
    description: 'Learn to build, automate, and scale cloud infrastructure. From AWS fundamentals to advanced Kubernetes orchestration and GitOps.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80',
  },
  {
    id: 4,
    title: 'UI/UX Designer',
    subtitle: 'Design products people love to use',
    icon: Palette,
    color: '#db2777',
    bg: 'rgba(219,39,119,0.08)',
    duration: '5 months',
    courses: 6,
    level: 'Beginner → Intermediate',
    enrolled: '15,800',
    tag: 'New',
    tagColor: '#6366f1',
    steps: ['Design Fundamentals', 'Figma Mastery', 'User Research', 'Prototyping', 'Motion Design'],
    skills: ['Figma', 'After Effects', 'User Research', 'Design Systems', 'Prototyping', 'Usability'],
    description: 'Learn user-centred design from scratch. Build stunning interfaces, conduct user research, and create polished design systems.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
  },
  {
    id: 5,
    title: 'Cybersecurity Specialist',
    subtitle: 'Defend systems and ethical hacking',
    icon: Shield,
    color: '#16a34a',
    bg: 'rgba(22,163,74,0.08)',
    duration: '6 months',
    courses: 7,
    level: 'Beginner → Advanced',
    enrolled: '12,300',
    tag: 'Hot',
    tagColor: '#ef4444',
    steps: ['Networking Basics', 'Linux for Security', 'Ethical Hacking', 'OWASP Top 10', 'SOC & Threat Intelligence'],
    skills: ['Kali Linux', 'Wireshark', 'Metasploit', 'Burp Suite', 'SIEM', 'Cryptography'],
    description: 'Build a career in cybersecurity. Learn ethical hacking, network defence, and the tools used by real security professionals.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80',
  },
  {
    id: 6,
    title: 'Product Manager',
    subtitle: 'Build and ship products that matter',
    icon: TrendingUp,
    color: '#d97706',
    bg: 'rgba(217,119,6,0.08)',
    duration: '4 months',
    courses: 5,
    level: 'Beginner → Intermediate',
    enrolled: '22,700',
    tag: 'Bestseller',
    tagColor: '#f59e0b',
    steps: ['PM Fundamentals', 'User Stories & PRDs', 'Roadmapping', 'Agile & Scrum', 'Product Analytics'],
    skills: ['Jira', 'Figma', 'OKRs', 'Agile', 'A/B Testing', 'SQL'],
    description: 'Learn how to define, build, and launch great products. From user discovery to roadmapping and stakeholder alignment.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&q=80',
  },
  {
    id: 7,
    title: 'Mobile Developer',
    subtitle: 'Ship apps to iOS and Android',
    icon: Smartphone,
    color: '#0284c7',
    bg: 'rgba(2,132,199,0.08)',
    duration: '6 months',
    courses: 7,
    level: 'Intermediate',
    enrolled: '10,400',
    tag: 'New',
    tagColor: '#6366f1',
    steps: ['Dart & Flutter Basics', 'UI Components', 'State Management', 'Firebase & Backend', 'App Store Publishing'],
    skills: ['Flutter', 'Dart', 'Firebase', 'Riverpod', 'Swift', 'App Store Connect'],
    description: 'Build cross-platform mobile apps with Flutter or go native with Swift. Ship to both the App Store and Play Store.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80',
  },
]

export default function MyLearningPathsPage() {
  const { user } = useAuth()

  /* enrolledPaths shape: { [pathId]: { enrolledAt: isoString, currentStep: number } } */
  const [enrolledPaths, setEnrolledPaths] = useState({})

  /* Real-time listener from Firestore */
  useEffect(() => {
    if (!user?.uid) { setEnrolledPaths({}); return }
    const pathsRef = collection(db, 'users', user.uid, 'learningPaths')
    const unsub = onSnapshot(pathsRef, (snap) => {
      const data = {}
      snap.docs.forEach((d) => { data[d.id] = d.data() })
      setEnrolledPaths(data)
    })
    return unsub
  }, [user?.uid])

  const enrollPath = async (id) => {
    if (!user?.uid) return
    await setDoc(doc(db, 'users', user.uid, 'learningPaths', String(id)), {
      enrolledAt: new Date().toISOString(),
      currentStep: 0,
    })
  }

  const advanceStep = async (id) => {
    if (!user?.uid) return
    const path = paths.find((p) => p.id === id)
    if (!path) return
    const current = enrolledPaths[id]?.currentStep ?? 0
    const next = Math.min(current + 1, path.steps.length - 1)
    await setDoc(doc(db, 'users', user.uid, 'learningPaths', String(id)), {
      ...enrolledPaths[id],
      currentStep: next,
    })
  }

  const enrolledList = paths.filter((p) => enrolledPaths[p.id])
  const isEnrolled = (id) => Boolean(enrolledPaths[id])

  return (
    <DashboardLayout
      title="Learning Paths"
      subtitle={enrolledList.length > 0
        ? `${enrolledList.length} path${enrolledList.length > 1 ? 's' : ''} in progress`
        : 'Choose a structured learning path'}
    >

      {/* In Progress section */}
      {enrolledList.length > 0 && (
        <section className="mb-10">
          <h2 className="text-base font-black text-gray-900 mb-4 flex items-center gap-2">
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ background: '#EEF2FF', color: '#4F46E5' }}
            >
              In Progress
            </span>
            {enrolledList.length} path{enrolledList.length > 1 ? 's' : ''}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {enrolledList.map((path, i) => {
              const Icon = path.icon
              const data = enrolledPaths[path.id]
              const currentStep = data?.currentStep ?? 0
              const totalSteps = path.steps.length
              const pct = Math.round((currentStep / (totalSteps - 1)) * 100)

              return (
                <motion.div
                  key={path.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.07 }}
                  className="rounded-2xl bg-white border overflow-hidden"
                  style={{ borderColor: '#E8E6FF' }}
                >
                  <div className="relative h-28 overflow-hidden">
                    <img src={path.image} alt={path.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)' }} />
                    <span
                      className="absolute top-2 left-2 text-[10px] font-bold px-2.5 py-1 rounded-full text-white"
                      style={{ background: path.tagColor }}
                    >
                      {path.tag}
                    </span>
                    <div
                      className="absolute bottom-2 left-2 w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: path.color }}
                    >
                      <Icon size={16} className="text-white" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-black text-gray-900 mb-0.5">{path.title}</h3>
                    <p className="text-xs text-gray-400 mb-3">
                      Step {currentStep + 1} of {totalSteps}: {path.steps[currentStep]}
                    </p>

                    {/* Step progress bar */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${pct}%`, background: path.color }}
                        />
                      </div>
                      <span className="text-[11px] font-black shrink-0" style={{ color: path.color }}>
                        {currentStep}/{totalSteps - 1}
                      </span>
                    </div>

                    <button
                      onClick={() => advanceStep(path.id)}
                      className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl text-xs font-bold text-white border-none cursor-pointer"
                      style={{ background: path.color }}
                    >
                      Continue →
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </section>
      )}

      {/* Browse All Paths */}
      <section>
        <h2 className="text-base font-black text-gray-900 mb-4">Browse All Paths</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {paths.map((path, i) => {
            const Icon = path.icon
            const enrolled = isEnrolled(path.id)

            return (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.07 }}
                className="rounded-2xl bg-white border overflow-hidden"
                style={{ borderColor: '#E8E6FF' }}
              >
                <div className="relative h-36 overflow-hidden">
                  <img src={path.image} alt={path.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 60%)' }} />
                  <span
                    className="absolute top-2 left-2 text-[10px] font-bold px-2.5 py-1 rounded-full text-white"
                    style={{ background: path.tagColor }}
                  >
                    {path.tag}
                  </span>
                  {enrolled && (
                    <span
                      className="absolute top-2 right-2 text-[10px] font-bold px-2.5 py-1 rounded-full"
                      style={{ background: '#EEF2FF', color: '#4F46E5' }}
                    >
                      In Progress
                    </span>
                  )}
                  <div
                    className="absolute bottom-2 left-2 w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: path.color }}
                  >
                    <Icon size={16} className="text-white" />
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-sm font-black text-gray-900 mb-0.5">{path.title}</h3>
                  <p className="text-xs text-gray-400 mb-3 line-clamp-2">{path.description}</p>

                  <div className="flex flex-wrap gap-3 mb-4">
                    {[
                      { Icon: Clock, val: path.duration },
                      { Icon: BookOpen, val: `${path.courses} courses` },
                      { Icon: BarChart2, val: path.level },
                    ].map(({ Icon: M, val }) => (
                      <div key={val} className="flex items-center gap-1.5 text-xs text-gray-500">
                        <M size={12} style={{ color: path.color }} />
                        {val}
                      </div>
                    ))}
                  </div>

                  {enrolled ? (
                    <div
                      className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl text-xs font-bold"
                      style={{ background: '#ECFDF5', color: '#16A34A' }}
                    >
                      ✓ Enrolled
                    </div>
                  ) : (
                    <button
                      onClick={() => enrollPath(path.id)}
                      className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl text-xs font-bold text-white border-none cursor-pointer"
                      style={{ background: path.color }}
                    >
                      Start Path →
                    </button>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>
    </DashboardLayout>
  )
}
