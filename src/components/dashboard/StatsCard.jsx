import { useEffect, useState } from 'react'

export default function StatsCard({ label, value, rawValue, change, positive, icon: Icon, accent, bg }) {
  const [displayed, setDisplayed] = useState(0)

  // Count-up animation
  useEffect(() => {
    const target = rawValue
    const duration = 900
    const steps = 40
    const increment = target / steps
    let current = 0
    let step = 0
    const timer = setInterval(() => {
      step++
      current = step >= steps ? target : Math.floor(increment * step)
      setDisplayed(current)
      if (step >= steps) clearInterval(timer)
    }, duration / steps)
    return () => clearInterval(timer)
  }, [rawValue])

  // Format display: if original value has K suffix keep it
  const fmt = (n) => {
    if (rawValue >= 1000) return (n / 1000).toFixed(n >= rawValue ? 1 : 0) + 'K'
    return n.toString()
  }

  return (
    <div
      className="bg-white rounded-2xl p-5 flex items-center justify-between transition-all duration-200 hover:-translate-y-1"
      style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)', cursor: 'default' }}
    >
      <div>
        <p className="text-[13px] font-medium text-[#7A90B3] mb-1">{label}</p>
        <p className="text-3xl font-extrabold text-[#0B1E3F] leading-none mb-2">
          {fmt(displayed)}
        </p>
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{
            background: positive ? 'rgba(34,204,136,0.12)' : 'rgba(255,77,106,0.12)',
            color: positive ? '#22CC88' : '#FF4D6A',
          }}
        >
          {change}
        </span>
      </div>
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
        style={{ background: bg }}
      >
        <Icon size={22} style={{ color: accent }} strokeWidth={2} />
      </div>
    </div>
  )
}
