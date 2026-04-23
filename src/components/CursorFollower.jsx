import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CursorFollower() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', move)

    const onEnter = () => setHovered(true)
    const onLeave = () => setHovered(false)
    const els = document.querySelectorAll('a, button, [data-cursor]')
    els.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', move)
      els.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[999] rounded-full border-2 border-[#6D28D9]"
        animate={{
          x: pos.x - (hovered ? 24 : 16),
          y: pos.y - (hovered ? 24 : 16),
          width: hovered ? 48 : 32,
          height: hovered ? 48 : 32,
          opacity: hovered ? 0.6 : 0.4,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[999] rounded-full bg-[#6D28D9]"
        animate={{ x: pos.x - 4, y: pos.y - 4, width: 8, height: 8 }}
        transition={{ type: 'spring', stiffness: 600, damping: 40 }}
      />
    </>
  )
}
