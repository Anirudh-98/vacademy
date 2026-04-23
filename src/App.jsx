import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AuthProvider } from './context/AuthContext'
import { LiveClassProvider } from './context/LiveClassContext'
import { CourseProvider } from './context/CourseContext'

import ScrollProgress from './components/ScrollProgress'
import CursorFollower from './components/CursorFollower'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import HeroSection from './components/HeroSection'
import SocialProof from './components/SocialProof'
import StatsBanner from './components/StatsBanner'
import CategoryGrid from './components/CategoryGrid'
import FeaturedCourses from './components/FeaturedCourses'
import TopInstructors from './components/TopInstructors'
import HowItWorks from './components/HowItWorks'
import Testimonials from './components/Testimonials'
import CTABanner from './components/CTABanner'
import InternshipBanner from './components/InternshipBanner'
import FAQ from './components/FAQ'

import CoursesPage from './pages/CoursesPage'
import RegisterPage from './pages/RegisterPage'
import SignInPage from './pages/SignInPage'
import LearningPathsPage from './pages/LearningPathsPage'
import BlogsPage from './pages/BlogsPage'
import StudentWorksPage from './pages/StudentWorksPage'
import AboutPage from './pages/AboutPage'
import PricingPage from './pages/PricingPage'
import LiveClassPage from './pages/LiveClassPage'
import StudentDashboard from './pages/StudentDashboard'
import ContactPage from './pages/ContactPage'
import MyCoursesPage from './pages/MyCoursesPage'
import MyLiveClassesPage from './pages/MyLiveClassesPage'
import MyLearningPathsPage from './pages/MyLearningPathsPage'
import MyAchievementsPage from './pages/MyAchievementsPage'
import ProfilePage from './pages/ProfilePage'
import NotFoundPage from './pages/NotFoundPage'
import StudentRegisterPage from './pages/StudentRegisterPage'
import LeadsPage from './pages/LeadsPage'
import AdminDashboard from './pages/AdminDashboard'
import InstructorDashboard from './pages/InstructorDashboard'
import InternshipProgramPage from './pages/InternshipProgramPage'

function HomePage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white min-h-screen"
    >
      <HeroSection />
      <SocialProof />
      <StatsBanner />
      <CategoryGrid />
      <FeaturedCourses />
      <TopInstructors />
      <HowItWorks />
      <Testimonials />
      <InternshipBanner />
      <CTABanner />
      <FAQ />
      <Footer />
    </motion.main>
  )
}

function CoursesLayout() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen"
    >
      <CoursesPage />
      <Footer />
    </motion.div>
  )
}

function NavbarWrapper() {
  const location = useLocation()
  const hiddenPrefixes = ['/register', '/signin', '/dashboard', '/my-courses', '/my-live-classes', '/my-learning-paths', '/my-achievements', '/profile', '/studentregister', '/leads', '/admin', '/instructor']
  if (hiddenPrefixes.some((p) => location.pathname === p || location.pathname.startsWith(p + '/'))) return null
  return <Navbar />
}

export default function App() {
  return (
    <AuthProvider>
      <LiveClassProvider>
      <CourseProvider>
      <BrowserRouter>
        <ScrollProgress />
        <CursorFollower />
        <NavbarWrapper />

        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesLayout />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/learning-paths" element={<LearningPathsPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/student-works" element={<StudentWorksPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/live" element={<LiveClassPage />} />
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/my-courses" element={<MyCoursesPage />} />
            <Route path="/my-live-classes" element={<MyLiveClassesPage />} />
            <Route path="/my-learning-paths" element={<MyLearningPathsPage />} />
            <Route path="/my-achievements" element={<MyAchievementsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/studentregister" element={<StudentRegisterPage />} />
            <Route path="/leads" element={<LeadsPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/instructor" element={<InstructorDashboard />} />
            <Route path="/internship" element={<InternshipProgramPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
      </CourseProvider>
      </LiveClassProvider>
    </AuthProvider>
  )
}
