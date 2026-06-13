import React from 'react'

/**
 * Evaluates password strength and returns a score 0–4
 */
function getStrength(password) {
  if (!password) return 0
  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  return score
}

const levels = [
  { label: 'Too short', color: '#D8E4F5', bg: '#D8E4F5' },
  { label: 'Weak',      color: '#FF4D6A', bg: '#FF4D6A' },
  { label: 'Fair',      color: '#FF8C42', bg: '#FF8C42' },
  { label: 'Good',      color: '#F5C518', bg: '#F5C518' },
  { label: 'Strong',    color: '#22C55E', bg: '#22C55E' },
]

export default function PasswordStrengthBar({ password }) {
  const score = getStrength(password)
  const level = levels[score]
  const widthPct = password ? (score / 4) * 100 : 0

  return (
    <div className="mt-2">
      {/* Bar track */}
      <div className="w-full h-1.5 rounded-full bg-[#D8E4F5] overflow-hidden">
        <div
          className="h-full rounded-full strength-bar"
          style={{
            width: `${widthPct}%`,
            backgroundColor: level.color,
          }}
        />
      </div>
      {/* Label */}
      {password && (
        <p
          className="text-xs mt-1 font-medium"
          style={{ color: level.color }}
        >
          {level.label}
        </p>
      )}
    </div>
  )
}
