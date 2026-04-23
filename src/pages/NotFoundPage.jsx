import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl font-black text-white"
          style={{ background: 'linear-gradient(135deg, #4F46E5, #6366f1)' }}
        >
          404
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-3">Page not found</h1>
        <p className="text-gray-400 text-sm mb-8 max-w-xs mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white no-underline"
            style={{ background: 'linear-gradient(135deg, #4F46E5, #6366f1)' }}
          >
            <Home size={15} /> Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold border cursor-pointer bg-white"
            style={{ borderColor: '#E8E6FF', color: '#4F46E5' }}
          >
            <ArrowLeft size={15} /> Go Back
          </button>
        </div>
      </motion.div>
    </div>
  )
}
