import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: 'Is Viscano Learn free to get started?',
    a: 'Yes! You can sign up for free and access a selection of introductory lessons across all categories. Premium courses and certificates require a one-time purchase or a Viscano Learn Pro subscription.',
  },
  {
    q: 'Are the certificates recognized by employers?',
    a: 'Absolutely. Our certificates are co-designed with industry partners including Google, Microsoft, and IBM. They are shareable directly to LinkedIn and are recognised by thousands of hiring managers globally.',
  },
  {
    q: 'Can I learn at my own pace?',
    a: 'Yes — every course is fully self-paced. Once you enroll you have lifetime access to all course materials, including future updates made by the instructor.',
  },
  {
    q: 'Who are the instructors?',
    a: 'Our instructors are senior engineers, designers, and entrepreneurs actively working in top companies. Every instructor goes through a rigorous quality review before their course goes live.',
  },
  {
    q: 'What if I am not satisfied with a course?',
    a: 'We offer a 30-day no-questions-asked money-back guarantee on all course purchases. Simply contact support and we will process your refund within 2 business days.',
  },
  {
    q: 'Do you offer team or enterprise plans?',
    a: 'Yes. Viscano Learn for Business gives your whole team access to all courses with advanced analytics, custom learning paths, and a dedicated account manager. Contact us for a demo.',
  },
  {
    q: 'Is there a mobile app?',
    a: 'Our iOS and Android apps let you download lessons for offline viewing, track your progress, and join live mentor sessions — all from your phone.',
  },
]

function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        open
          ? 'border-[#6D28D9] bg-[#F5F3FF]'
          : 'border-purple-100 bg-white hover:border-purple-200'
      }`}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 p-6 text-left cursor-pointer bg-transparent border-none"
      >
        <span className={`text-sm md:text-base font-semibold leading-snug transition-colors ${open ? 'text-[#6D28D9]' : 'text-[#111827]'}`}>
          {q}
        </span>
        <motion.div
          animate={{ rotate: open ? 0 : 0 }}
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            open ? 'bg-[#6D28D9] text-white' : 'bg-purple-50 text-[#6D28D9]'
          }`}
        >
          {open ? <Minus size={15} /> : <Plus size={15} />}
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <p className="px-6 pb-6 text-sm text-gray-500 leading-relaxed border-t border-purple-100 pt-4">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  return (
    <section className="py-24 px-6 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.06] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #6D28D9, transparent)' }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.05] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #9333EA, transparent)' }} />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-bold text-[#6D28D9] uppercase tracking-widest">FAQ</span>
          <h2 className="text-4xl font-extrabold text-[#111827] mt-3 tracking-tight">
            Frequently asked questions
          </h2>
          <p className="text-gray-500 mt-3 text-sm leading-relaxed max-w-sm mx-auto">
            Everything you need to know about Viscano Learn. Can't find an answer?{' '}
            <a href="#" className="text-[#6D28D9] font-semibold hover:underline no-underline">
              Chat with us.
            </a>
          </p>
        </motion.div>

        {/* FAQ list */}
        <div className="flex flex-col gap-3">
          {faqs.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-14 text-center p-8 rounded-3xl border border-purple-100"
          style={{ background: 'linear-gradient(135deg, #F5F3FF, #EDE9FE)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-xl font-extrabold text-[#111827] mb-2">Still have questions?</h3>
          <p className="text-gray-500 text-sm mb-6">
            Our support team is available 24/7 and typically responds within a few minutes.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-xl text-sm font-bold text-white no-underline"
              style={{ background: 'linear-gradient(135deg, #6D28D9, #9333EA)', boxShadow: '0 4px 15px rgba(109,40,217,0.3)' }}
            >
              Contact Support
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-xl text-sm font-bold text-[#6D28D9] border-2 border-purple-200 hover:bg-white transition-colors no-underline"
            >
              Browse Help Center
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
