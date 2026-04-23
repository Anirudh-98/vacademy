import { useState } from 'react'
import { motion } from 'framer-motion'

/* ─── Smooth Catmull-Rom → Cubic Bezier path ─────────────── */
function buildPath(pts) {
  if (pts.length < 2) return ''
  let d = `M ${pts[0].x},${pts[0].y}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[Math.min(pts.length - 1, i + 2)]
    const cp1x = p1.x + (p2.x - p0.x) / 6
    const cp1y = p1.y + (p2.y - p0.y) / 6
    const cp2x = p2.x - (p3.x - p1.x) / 6
    const cp2y = p2.y - (p3.y - p1.y) / 6
    d += ` C ${cp1x.toFixed(2)},${cp1y.toFixed(2)} ${cp2x.toFixed(2)},${cp2y.toFixed(2)} ${p2.x.toFixed(2)},${p2.y.toFixed(2)}`
  }
  return d
}

/**
 * SensexChart — Sensex-style SVG line/area chart
 *
 * Props:
 *   data      — [{ label, value, tooltip }]  primary series
 *   data2     — [{ label, value, tooltip }]  optional secondary series
 *   color     — primary line + area colour   (default '#059669')
 *   color2    — secondary line colour        (default '#4F46E5')
 *   gradientId — unique SVG gradient ID
 *   height    — chart height px              (default 160)
 *   showGrid  — show horizontal grid lines   (default true)
 */
export default function SensexChart({
  data = [],
  data2 = null,
  color = '#059669',
  color2 = '#4F46E5',
  gradientId = 'sg1',
  height = 160,
  showGrid = true,
}) {
  const [hovered, setHovered] = useState(null)

  const W = 480
  const H = height
  const PAD = { top: 20, right: 20, bottom: 30, left: 44 }
  const cW = W - PAD.left - PAD.right
  const cH = H - PAD.top - PAD.bottom

  if (!data.length) return null

  /* ── scale helpers ── */
  const allValues = [
    ...data.map((d) => d.value),
    ...(data2 ? data2.map((d) => d.value) : []),
  ]
  const rawMin = Math.min(...allValues)
  const rawMax = Math.max(...allValues)
  const pad = (rawMax - rawMin) * 0.15 || rawMax * 0.15
  const vMin = rawMin - pad
  const vMax = rawMax + pad

  const toX = (i, n) => PAD.left + (i / (n - 1)) * cW
  const toY = (v) => PAD.top + (1 - (v - vMin) / (vMax - vMin)) * cH

  /* ── point sets ── */
  const pts1 = data.map((d, i) => ({ x: toX(i, data.length), y: toY(d.value), ...d }))
  const pts2 = data2
    ? data2.map((d, i) => ({ x: toX(i, data2.length), y: toY(d.value), ...d }))
    : []

  const line1 = buildPath(pts1)
  const area1 =
    line1 +
    ` L ${pts1[pts1.length - 1].x},${PAD.top + cH}` +
    ` L ${pts1[0].x},${PAD.top + cH} Z`
  const line2 = data2 ? buildPath(pts2) : ''

  /* ── grid ── */
  const gridCount = 4
  const gridLines = Array.from({ length: gridCount + 1 }, (_, i) => {
    const t = i / gridCount
    const y = PAD.top + t * cH
    const v = vMax - t * (vMax - vMin)
    return { y, v }
  })

  /* ── tooltip box placement ── */
  const tooltipX = (x) => (x + 80 > W ? x - 88 : x + 10)
  const tooltipY = (y) => Math.max(PAD.top, Math.min(y - 30, PAD.top + cH - 50))

  return (
    <div style={{ position: 'relative', userSelect: 'none' }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: '100%', height: 'auto', overflow: 'visible', display: 'block' }}
        onMouseLeave={() => setHovered(null)}
      >
        <defs>
          {/* Primary gradient */}
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.22" />
            <stop offset="75%" stopColor={color} stopOpacity="0.04" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
          {/* Glow filter on dot */}
          <filter id={`${gradientId}-glow`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Horizontal grid lines ── */}
        {showGrid && gridLines.map((g, i) => (
          <g key={i}>
            <line
              x1={PAD.left} y1={g.y}
              x2={PAD.left + cW} y2={g.y}
              stroke="#F3F4F6" strokeWidth="1"
            />
            <text
              x={PAD.left - 6} y={g.y + 3.5}
              textAnchor="end" fontSize="9" fill="#C4C4C4"
              fontFamily="system-ui, sans-serif"
            >
              {g.v >= 1 ? `${g.v.toFixed(0)}L` : ''}
            </text>
          </g>
        ))}

        {/* ── X-axis labels ── */}
        {pts1.map((p, i) => (
          <text
            key={i}
            x={p.x} y={H - 4}
            textAnchor="middle" fontSize="10" fill="#9CA3AF"
            fontFamily="system-ui, sans-serif" fontWeight="600"
          >
            {p.label}
          </text>
        ))}

        {/* ── Area fill (primary) ── */}
        <motion.path
          d={area1}
          fill={`url(#${gradientId})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        />

        {/* ── Secondary line (if any) ── */}
        {line2 && (
          <motion.path
            d={line2}
            fill="none"
            stroke={color2}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="5 3"
            opacity={0.7}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.7 }}
            transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.2 }}
          />
        )}

        {/* ── Primary line ── */}
        <motion.path
          d={line1}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        />

        {/* ── Data point dots + hover zones ── */}
        {pts1.map((p, i) => {
          const isHovered = hovered === i
          const zoneW = cW / data.length
          return (
            <g key={i}>
              {/* Hover zone */}
              <rect
                x={p.x - zoneW / 2} y={PAD.top}
                width={zoneW} height={cH}
                fill="transparent"
                style={{ cursor: 'crosshair' }}
                onMouseEnter={() => setHovered(i)}
              />
              {/* Outer glow ring on hover */}
              {isHovered && (
                <circle
                  cx={p.x} cy={p.y} r={9}
                  fill={color} opacity={0.15}
                />
              )}
              {/* Dot */}
              <motion.circle
                cx={p.x} cy={p.y}
                r={isHovered ? 5.5 : 3.5}
                fill={isHovered ? '#fff' : color}
                stroke={color}
                strokeWidth={isHovered ? 2.5 : 1.5}
                filter={isHovered ? `url(#${gradientId}-glow)` : undefined}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.9 + i * 0.08, type: 'spring', stiffness: 300 }}
              />
            </g>
          )
        })}

        {/* ── Secondary dots ── */}
        {pts2.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x} cy={p.y} r={3}
            fill={color2} stroke="#fff" strokeWidth="1.5"
            opacity={0.8}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            transition={{ delay: 1 + i * 0.08 }}
          />
        ))}

        {/* ── Hover vertical ruler ── */}
        {hovered !== null && (
          <g>
            <motion.line
              x1={pts1[hovered].x} y1={PAD.top}
              x2={pts1[hovered].x} y2={PAD.top + cH}
              stroke={color} strokeWidth="1.2"
              strokeDasharray="4 3"
              opacity={0.45}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
            />

            {/* Tooltip */}
            <motion.g
              transform={`translate(${tooltipX(pts1[hovered].x)},${tooltipY(pts1[hovered].y)})`}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.15 }}
            >
              <rect
                x={0} y={0} width={78} height={data2 ? 52 : 38}
                rx={8} fill="#1F2937"
                style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }}
              />
              <text x={10} y={14} fontSize="10" fill="#D1FAE5" fontFamily="system-ui" fontWeight="700">
                {data[hovered].label}
              </text>
              <text x={10} y={28} fontSize="12" fill="#fff" fontFamily="system-ui" fontWeight="800">
                {data[hovered].tooltip}
              </text>
              {data2 && (
                <text x={10} y={44} fontSize="10" fill={color2} fontFamily="system-ui" fontWeight="700">
                  {data2[hovered]?.tooltip}
                </text>
              )}
            </motion.g>
          </g>
        )}
      </svg>
    </div>
  )
}
