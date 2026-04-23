import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, Play, CheckCircle, ChevronDown, ChevronUp,
  Video, Download, Smartphone, Award, ShieldCheck,
  Star, Users, Clock, BookOpen, Zap, Globe,
} from 'lucide-react'
import { useCourse } from '../context/CourseContext'

// ── Mock data factory ──────────────────────────────────────
const DATA = {
  React: {
    description: 'Go from complete beginner to confident React developer. You will build real-world projects including a full-stack e-commerce app, a real-time chat application, and a production-ready SaaS dashboard — all using the latest React 19 and Next.js 14 patterns.',
    outcomes: [
      'Build full-stack apps with Next.js App Router',
      'Manage complex state with Zustand & React Query',
      'Deploy to Vercel with CI/CD pipelines',
      'Write type-safe code with TypeScript',
      'Implement authentication with NextAuth.js',
      'Optimise Core Web Vitals to a 90+ score',
    ],
    curriculum: [
      { title: 'React Fundamentals', lessons: [
        { name: 'JSX & the Virtual DOM', dur: '12min', free: true },
        { name: 'Components & Props', dur: '18min', free: true },
        { name: 'useState & useEffect in depth', dur: '24min', free: false },
        { name: 'Event handling & controlled forms', dur: '20min', free: false },
      ]},
      { title: 'Advanced Patterns', lessons: [
        { name: 'Context API & useReducer', dur: '22min', free: false },
        { name: 'Custom hooks deep dive', dur: '28min', free: false },
        { name: 'Performance: memo, useMemo, useCallback', dur: '26min', free: false },
        { name: 'Suspense & Error Boundaries', dur: '18min', free: false },
      ]},
      { title: 'Next.js & Full-Stack', lessons: [
        { name: 'App Router & Server Components', dur: '30min', free: false },
        { name: 'Data fetching strategies', dur: '25min', free: false },
        { name: 'API routes & server actions', dur: '22min', free: false },
        { name: 'Authentication with NextAuth', dur: '35min', free: false },
      ]},
      { title: 'Production & Deployment', lessons: [
        { name: 'CI/CD with GitHub Actions', dur: '20min', free: false },
        { name: 'Monitoring with Sentry', dur: '15min', free: false },
        { name: 'Deploying on Vercel', dur: '12min', free: false },
      ]},
    ],
    instructor: { bio: 'Alex is a Senior Software Engineer at Google with 10+ years of experience building large-scale web applications. He has contributed to open-source React ecosystem projects and has helped over 50,000 developers level up their frontend skills.', students: '12,400', courses: 4, rating: 4.9, avatar: 'AJ' },
  },
  Python: {
    description: 'A comprehensive journey from Python basics to advanced machine learning and AI applications. You will build end-to-end ML pipelines, train neural networks, and deploy models as REST APIs — skills that top companies pay premium salaries for.',
    outcomes: [
      'Master Python for data manipulation with Pandas & NumPy',
      'Build and train machine learning models with Scikit-learn',
      'Create neural networks using TensorFlow & Keras',
      'Visualise data with Matplotlib, Seaborn & Plotly',
      'Deploy models as REST APIs with FastAPI',
      'Work with real-world datasets from Kaggle',
    ],
    curriculum: [
      { title: 'Python Foundations', lessons: [
        { name: 'Python syntax & data structures', dur: '20min', free: true },
        { name: 'Functions, classes & OOP', dur: '25min', free: true },
        { name: 'File I/O & error handling', dur: '18min', free: false },
        { name: 'Virtual environments & pip', dur: '10min', free: false },
      ]},
      { title: 'Data Science Core', lessons: [
        { name: 'NumPy arrays & operations', dur: '22min', free: false },
        { name: 'Pandas DataFrames in depth', dur: '30min', free: false },
        { name: 'Data cleaning & wrangling', dur: '28min', free: false },
        { name: 'Exploratory data analysis', dur: '24min', free: false },
      ]},
      { title: 'Machine Learning', lessons: [
        { name: 'Supervised vs unsupervised learning', dur: '18min', free: false },
        { name: 'Regression & classification models', dur: '32min', free: false },
        { name: 'Model evaluation & cross-validation', dur: '26min', free: false },
        { name: 'Hyperparameter tuning', dur: '22min', free: false },
      ]},
      { title: 'Deep Learning & Deployment', lessons: [
        { name: 'Neural networks from scratch', dur: '35min', free: false },
        { name: 'Convolutional neural networks', dur: '30min', free: false },
        { name: 'Deploying models with FastAPI', dur: '25min', free: false },
      ]},
    ],
    instructor: { bio: 'Priya leads the Machine Learning platform at Microsoft and holds a PhD in Computer Science from IIT Bombay. She is a regular speaker at PyCon India and has published research on efficient transformer architectures.', students: '18,200', courses: 6, rating: 4.8, avatar: 'PS' },
  },
  Design: {
    description: 'Go from zero design experience to landing your first product design role. This course covers the complete UX process — research, wireframing, prototyping, and handoff — using the same tools and workflows used at Airbnb, Figma, and Google.',
    outcomes: [
      'Master Figma from beginner to advanced',
      'Conduct effective user research & interviews',
      'Build complete design systems from scratch',
      'Create interactive prototypes with animations',
      'Write clear design documentation & specs',
      'Build a portfolio that gets you hired',
    ],
    curriculum: [
      { title: 'Design Fundamentals', lessons: [
        { name: 'Principles of visual design', dur: '18min', free: true },
        { name: 'Typography & colour theory', dur: '22min', free: true },
        { name: 'Layout, grids & spacing', dur: '20min', free: false },
        { name: 'Gestalt principles in UX', dur: '16min', free: false },
      ]},
      { title: 'Figma Mastery', lessons: [
        { name: 'Figma interface & shortcuts', dur: '25min', free: false },
        { name: 'Auto layout & components', dur: '30min', free: false },
        { name: 'Variables & design tokens', dur: '28min', free: false },
        { name: 'Prototyping & interactions', dur: '32min', free: false },
      ]},
      { title: 'UX Research & Process', lessons: [
        { name: 'User interviews & surveys', dur: '22min', free: false },
        { name: 'Journey mapping & personas', dur: '20min', free: false },
        { name: 'Wireframing & lo-fi prototypes', dur: '25min', free: false },
        { name: 'Usability testing', dur: '18min', free: false },
      ]},
      { title: 'Portfolio & Career', lessons: [
        { name: 'Case study writing', dur: '22min', free: false },
        { name: 'Portfolio site with Framer', dur: '28min', free: false },
        { name: 'Cracking design interviews', dur: '20min', free: false },
      ]},
    ],
    instructor: { bio: 'Maria is a Principal Product Designer at Airbnb, where she leads the design system team. With 12 years of experience across consumer and enterprise products, she has mentored over 200 designers who now work at top tech companies worldwide.', students: '9,100', courses: 3, rating: 4.9, avatar: 'MC' },
  },
  AWS: {
    description: 'The most comprehensive AWS course on the platform. You will earn your AWS Certified Cloud Practitioner certification while building real cloud infrastructure — VPCs, Lambda functions, RDS databases, and fully automated CI/CD pipelines.',
    outcomes: [
      'Pass the AWS Certified Cloud Practitioner exam',
      'Deploy scalable apps on EC2, ECS & Lambda',
      'Set up secure VPCs, IAM roles & policies',
      'Build serverless architectures with API Gateway',
      'Use RDS, DynamoDB & S3 for data storage',
      'Automate infrastructure with CloudFormation',
    ],
    curriculum: [
      { title: 'Cloud Fundamentals', lessons: [
        { name: 'What is cloud computing?', dur: '15min', free: true },
        { name: 'AWS global infrastructure', dur: '18min', free: true },
        { name: 'IAM — users, roles & policies', dur: '25min', free: false },
        { name: 'Billing, cost explorer & budgets', dur: '14min', free: false },
      ]},
      { title: 'Compute & Networking', lessons: [
        { name: 'EC2 instance types & launch', dur: '28min', free: false },
        { name: 'VPCs, subnets & security groups', dur: '32min', free: false },
        { name: 'Load balancers & auto scaling', dur: '26min', free: false },
        { name: 'Lambda & serverless computing', dur: '30min', free: false },
      ]},
      { title: 'Storage & Databases', lessons: [
        { name: 'S3 buckets, policies & lifecycle', dur: '24min', free: false },
        { name: 'RDS — MySQL & PostgreSQL on AWS', dur: '28min', free: false },
        { name: 'DynamoDB deep dive', dur: '25min', free: false },
        { name: 'ElastiCache & CloudFront CDN', dur: '20min', free: false },
      ]},
      { title: 'DevOps & Certification Prep', lessons: [
        { name: 'CodePipeline CI/CD setup', dur: '30min', free: false },
        { name: 'CloudFormation & Terraform intro', dur: '28min', free: false },
        { name: 'Practice exam walkthrough', dur: '45min', free: false },
      ]},
    ],
    instructor: { bio: 'David is a Cloud Solutions Architect at Amazon Web Services with 8 years of experience designing enterprise cloud infrastructure. He has helped thousands of engineers pass their AWS certifications and currently holds 9 AWS professional certifications himself.', students: '21,000', courses: 5, rating: 4.7, avatar: 'DK' },
  },
  Machine: {
    description: 'The most in-depth machine learning course available. Covering everything from linear regression to generative AI, this course gives you both the mathematical intuition and the practical coding skills to work as an ML engineer.',
    outcomes: [
      'Implement ML algorithms from scratch in Python',
      'Build and fine-tune transformer models',
      'Work with computer vision & NLP pipelines',
      'Use PyTorch for custom neural network training',
      'Design and run A/B experiments',
      'Deploy models with Docker & Kubernetes',
    ],
    curriculum: [
      { title: 'ML Foundations', lessons: [
        { name: 'Maths for ML: linear algebra & calculus', dur: '35min', free: true },
        { name: 'Gradient descent & backpropagation', dur: '28min', free: true },
        { name: 'Bias-variance tradeoff', dur: '22min', free: false },
        { name: 'Feature engineering & selection', dur: '25min', free: false },
      ]},
      { title: 'Classical ML', lessons: [
        { name: 'Linear & logistic regression', dur: '30min', free: false },
        { name: 'Decision trees & random forests', dur: '28min', free: false },
        { name: 'SVMs & kernel methods', dur: '24min', free: false },
        { name: 'Clustering & dimensionality reduction', dur: '26min', free: false },
      ]},
      { title: 'Deep Learning', lessons: [
        { name: 'CNNs for image recognition', dur: '35min', free: false },
        { name: 'RNNs, LSTMs & transformers', dur: '40min', free: false },
        { name: 'Transfer learning & fine-tuning', dur: '30min', free: false },
        { name: 'Generative models & diffusion', dur: '35min', free: false },
      ]},
      { title: 'MLOps & Production', lessons: [
        { name: 'ML pipelines with MLflow', dur: '28min', free: false },
        { name: 'Model monitoring & drift detection', dur: '22min', free: false },
        { name: 'Deploying with Docker & FastAPI', dur: '30min', free: false },
      ]},
    ],
    instructor: { bio: 'Sara is a Research Scientist at DeepMind and adjunct professor at Stanford. Her work on efficient neural architecture search has been cited over 1,200 times. She is passionate about making cutting-edge ML research accessible to every developer.', students: '15,000', courses: 3, rating: 4.9, avatar: 'SL' },
  },
  Flutter: {
    description: 'Build beautiful, high-performance iOS and Android apps with a single Flutter codebase. From Dart basics to publishing on the App Store and Play Store, this course covers everything a modern mobile developer needs.',
    outcomes: [
      'Build iOS & Android apps from one codebase',
      'Master Dart programming language',
      'Implement complex UI with Flutter widgets',
      'Manage state with Riverpod & BLoC',
      'Integrate REST APIs & Firebase',
      'Publish apps to App Store & Play Store',
    ],
    curriculum: [
      { title: 'Dart & Flutter Basics', lessons: [
        { name: 'Dart language fundamentals', dur: '22min', free: true },
        { name: 'Flutter widgets tree explained', dur: '18min', free: true },
        { name: 'Stateless vs Stateful widgets', dur: '20min', free: false },
        { name: 'Layouts: Row, Column & Stack', dur: '24min', free: false },
      ]},
      { title: 'UI & Animations', lessons: [
        { name: 'Custom paint & canvas', dur: '28min', free: false },
        { name: 'Implicit & explicit animations', dur: '30min', free: false },
        { name: 'Navigation & routing with GoRouter', dur: '22min', free: false },
        { name: 'Responsive & adaptive layouts', dur: '25min', free: false },
      ]},
      { title: 'State & Backend', lessons: [
        { name: 'State management with Riverpod', dur: '32min', free: false },
        { name: 'REST API integration with Dio', dur: '28min', free: false },
        { name: 'Firebase Auth & Firestore', dur: '35min', free: false },
        { name: 'Push notifications', dur: '20min', free: false },
      ]},
      { title: 'Publishing', lessons: [
        { name: 'Testing: unit, widget & integration', dur: '28min', free: false },
        { name: 'Performance profiling', dur: '20min', free: false },
        { name: 'App Store & Play Store submission', dur: '25min', free: false },
      ]},
    ],
    instructor: { bio: 'James is a Google Developer Expert for Flutter and has shipped 15+ production apps across healthcare, fintech, and consumer markets. He regularly contributes to the Flutter framework and runs the Flutter London community meetup.', students: '7,000', courses: 2, rating: 4.8, avatar: 'JW' },
  },
}

function getCourseData(title) {
  const key = Object.keys(DATA).find((k) => title.includes(k)) ?? 'React'
  return DATA[key]
}

function parsePrice(str) {
  return parseInt(str.replace(/[₹,]/g, ''), 10)
}

// ── Accordion section ──────────────────────────────────────
function CurriculumSection({ section, index, open, onToggle }) {
  const totalMins = section.lessons.reduce((s, l) => s + parseInt(l.dur), 0)
  return (
    <div className="border border-purple-100 rounded-xl overflow-hidden">
      <button
        onClick={() => onToggle(index)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 bg-[#F9FAFB] hover:bg-purple-50 transition-colors cursor-pointer border-none text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center text-[#6D28D9] font-bold text-xs flex-shrink-0">
            {index + 1}
          </div>
          <div>
            <p className="text-sm font-semibold text-[#111827]">{section.title}</p>
            <p className="text-xs text-gray-400 mt-0.5">{section.lessons.length} lessons · {totalMins} min</p>
          </div>
        </div>
        {open ? <ChevronUp size={16} className="text-gray-400 flex-shrink-0" /> : <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
          >
            <ul className="divide-y divide-purple-50">
              {section.lessons.map((lesson, li) => (
                <li key={li} className="flex items-center justify-between px-5 py-3 gap-3">
                  <div className="flex items-center gap-3">
                    <Play size={13} className="text-[#6D28D9] flex-shrink-0" />
                    <span className="text-sm text-gray-700">{lesson.name}</span>
                    {lesson.free && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700 flex-shrink-0">Free</span>
                    )}
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">{lesson.dur}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Main modal ─────────────────────────────────────────────
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

const panelVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 24 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  exit: { opacity: 0, scale: 0.95, y: 12, transition: { duration: 0.2 } },
}

export default function CoursePreviewModal({ course, onClose }) {
  const [openSection, setOpenSection] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [enrolledNow, setEnrolledNow] = useState(false)
  const [enrolling, setEnrolling] = useState(false)
  const { isEnrolled, enrollCourse } = useCourse()
  const data = getCourseData(course.title)
  const alreadyEnrolled = isEnrolled(course.id)

  const discount = Math.round((1 - parsePrice(course.price) / parsePrice(course.originalPrice)) * 100)
  const totalLessons = data.curriculum.reduce((s, sec) => s + sec.lessons.length, 0)

  // Scroll lock + Escape key
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const toggleSection = (i) => setOpenSection((cur) => (cur === i ? -1 : i))

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6"
      style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)' }}
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
    >
      <motion.div
        className="relative bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        style={{ maxHeight: '92vh' }}
        variants={panelVariants}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-50 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-100 text-[#6D28D9]">{course.tag}</span>
            <span className="text-sm font-semibold text-[#111827] hidden sm:block truncate max-w-xs">{course.title}</span>
          </div>
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1, background: '#F5F3FF' }}
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-[#6D28D9] transition-colors cursor-pointer border-none bg-gray-100"
          >
            <X size={18} />
          </motion.button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1">
          <div className="flex flex-col lg:flex-row">

            {/* ── LEFT COLUMN ── */}
            <div className="flex-1 p-6 md:p-8 min-w-0">

              {/* Video preview */}
              <div
                className="relative rounded-2xl overflow-hidden bg-gray-900 mb-7 cursor-pointer group"
                style={{ aspectRatio: '16/9' }}
                onClick={() => setPlaying(true)}
              >
                <img src={course.image} alt={course.title} className="w-full h-full object-cover opacity-75 transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  {!playing ? (
                    <motion.div
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center shadow-2xl"
                    >
                      <Play size={26} fill="#6D28D9" className="text-[#6D28D9] ml-1" />
                    </motion.div>
                  ) : (
                    <div className="text-white text-sm font-medium bg-black/60 px-4 py-2 rounded-full">
                      Preview playing...
                    </div>
                  )}
                  <span className="text-white/80 text-xs font-medium bg-black/40 px-3 py-1 rounded-full">
                    Course preview available
                  </span>
                </div>
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/50 text-white text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
                  <Video size={11} /> Preview
                </div>
              </div>

              {/* Title (mobile) */}
              <h2 className="text-xl md:text-2xl font-extrabold text-[#111827] mb-2 sm:hidden">{course.title}</h2>

              {/* Rating row */}
              <div className="flex flex-wrap items-center gap-4 mb-5 pb-5 border-b border-purple-50">
                <div className="flex items-center gap-1.5 text-yellow-500 font-bold text-sm">
                  <Star size={15} fill="currentColor" /> {course.rating}
                </div>
                <span className="flex items-center gap-1.5 text-sm text-gray-500"><Users size={14} /> {course.students} students</span>
                <span className="flex items-center gap-1.5 text-sm text-gray-500"><Clock size={14} /> {course.duration} total</span>
                <span className="flex items-center gap-1.5 text-sm text-gray-500"><BookOpen size={14} /> {totalLessons} lessons</span>
                <span className="flex items-center gap-1.5 text-sm text-gray-500"><Globe size={14} /> English</span>
              </div>

              {/* Description */}
              <div className="mb-7">
                <h3 className="text-base font-extrabold text-[#111827] mb-3">About this course</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{data.description}</p>
              </div>

              {/* What you'll learn */}
              <div className="mb-7 p-5 rounded-2xl border border-purple-100 bg-[#F9FAFB]">
                <h3 className="text-base font-extrabold text-[#111827] mb-4 flex items-center gap-2">
                  <Zap size={17} className="text-[#6D28D9]" /> What you will learn
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {data.outcomes.map((o, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle size={15} className="text-[#6D28D9] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700 leading-snug">{o}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curriculum */}
              <div className="mb-7">
                <h3 className="text-base font-extrabold text-[#111827] mb-4">Course curriculum</h3>
                <div className="flex flex-col gap-2.5">
                  {data.curriculum.map((sec, i) => (
                    <CurriculumSection
                      key={i}
                      section={sec}
                      index={i}
                      open={openSection === i}
                      onToggle={toggleSection}
                    />
                  ))}
                </div>
              </div>

              {/* Instructor */}
              <div className="mb-4">
                <h3 className="text-base font-extrabold text-[#111827] mb-4">Your instructor</h3>
                <div className="flex items-start gap-4 p-5 rounded-2xl border border-purple-100 bg-[#F9FAFB]">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-extrabold text-lg flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #6D28D9, #9333EA)' }}
                  >
                    {data.instructor.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-[#111827] text-sm">{course.instructor}</p>
                    <div className="flex flex-wrap gap-3 mt-1 mb-2">
                      <span className="text-xs text-gray-400 flex items-center gap-1"><Star size={11} className="text-yellow-400" fill="currentColor" /> {data.instructor.rating}</span>
                      <span className="text-xs text-gray-400 flex items-center gap-1"><Users size={11} /> {data.instructor.students} students</span>
                      <span className="text-xs text-gray-400 flex items-center gap-1"><BookOpen size={11} /> {data.instructor.courses} courses</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{data.instructor.bio}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div className="lg:w-80 flex-shrink-0 p-6 lg:p-6 border-t lg:border-t-0 lg:border-l border-purple-50">
              <div className="lg:sticky lg:top-0">

                {/* Price card */}
                <div className="p-5 rounded-2xl border border-purple-100 bg-white shadow-lg shadow-purple-50 mb-4">
                  <div className="flex items-end gap-3 mb-1">
                    <span className="text-3xl font-extrabold text-[#6D28D9]">{course.price}</span>
                    <span className="text-sm text-gray-400 line-through mb-1">{course.originalPrice}</span>
                    <span className="text-xs font-bold text-white bg-green-500 px-2 py-0.5 rounded-full mb-1">{discount}% off</span>
                  </div>
                  <p className="text-xs text-red-500 font-semibold mb-4">⏰ Offer ends in 2 days!</p>

                  {alreadyEnrolled || enrolledNow ? (
                    <div className="w-full py-3.5 rounded-xl font-bold text-sm text-center mb-3 flex items-center justify-center gap-2 bg-green-50 text-green-700 border-2 border-green-200">
                      <CheckCircle size={16} className="text-green-600" /> Enrolled
                    </div>
                  ) : (
                    <motion.button
                      whileHover={!enrolling ? { scale: 1.03, boxShadow: '0 8px 25px rgba(109,40,217,0.45)' } : {}}
                      whileTap={!enrolling ? { scale: 0.97 } : {}}
                      disabled={enrolling}
                      onClick={async () => {
                        if (enrolling) return
                        setEnrolling(true)
                        try { await enrollCourse(course); setEnrolledNow(true) }
                        catch { /* error logged in context */ }
                        finally { setEnrolling(false) }
                      }}
                      className="w-full py-3.5 rounded-xl font-bold text-white text-sm cursor-pointer border-none mb-3 disabled:opacity-70"
                      style={{ background: 'linear-gradient(135deg, #6D28D9, #9333EA)', boxShadow: '0 4px 15px rgba(109,40,217,0.3)' }}
                    >
                      {enrolling ? 'Enrolling…' : 'Enroll Now'}
                    </motion.button>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 rounded-xl font-semibold text-[#6D28D9] text-sm cursor-pointer border-2 border-purple-200 bg-transparent hover:bg-purple-50 transition-colors"
                  >
                    Try for Free
                  </motion.button>
                </div>

                {/* Course includes */}
                <div className="p-5 rounded-2xl border border-purple-100 mb-4">
                  <p className="text-sm font-bold text-[#111827] mb-3">This course includes</p>
                  <ul className="flex flex-col gap-2.5">
                    {[
                      { icon: Video, label: `${course.duration} on-demand video` },
                      { icon: Download, label: 'Downloadable resources' },
                      { icon: Smartphone, label: 'Mobile & desktop access' },
                      { icon: Award, label: 'Certificate of completion' },
                      { icon: BookOpen, label: `${totalLessons} lessons` },
                    ].map(({ icon: Icon, label }) => (
                      <li key={label} className="flex items-center gap-2.5 text-sm text-gray-600">
                        <Icon size={15} className="text-[#6D28D9] flex-shrink-0" />
                        {label}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Guarantee */}
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-green-50 border border-green-100">
                  <ShieldCheck size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-green-800">30-Day Money-Back Guarantee</p>
                    <p className="text-xs text-green-600 mt-0.5 leading-relaxed">Not satisfied? Get a full refund, no questions asked.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  )
}
