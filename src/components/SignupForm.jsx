import React, { useState } from 'react'
import PasswordStrengthBar from './PasswordStrengthBar'
import API_BASE from '../utils/api'

export default function SignupForm({ onSignup, onSwitchTab, userStore }) {
  const [form, setForm] = useState({
    fullName: '',
    dob: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const [shakeKey, setShakeKey] = useState(0)

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    const { fullName, dob, email, mobile, password, confirmPassword } = form

    if (!fullName.trim() || !dob || !email.trim() || !mobile.trim() || !password || !confirmPassword) {
      triggerError('All fields are required.')
      return
    }

    if (password.length < 8) {
      triggerError('Password must be at least 8 characters.')
      return
    }

    if (password !== confirmPassword) {
      triggerError('Passwords do not match.')
      return
    }

    // Check for duplicate email
    const emailExists = userStore.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    )
    if (emailExists) {
      triggerError('An account with this email already exists.')
      return
    }

    setLoading(true)

fetch(`${API_BASE}/api/users/signup`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    fullName: fullName.trim(),
    dob,
    email: email.trim(),
    mobile: mobile.trim(),
    password
  })
})
.then(res => {
  if (!res.ok) {
    throw new Error("Signup failed")
  }
  return res.json()
})
.then(data => {
  setLoading(false)
  onSignup({
    username: data.email,
    fullName: data.fullName,
    email: data.email,
    mobile: data.mobile,
    dob: data.dob
  })
})
.catch(err => {
  setLoading(false)
  triggerError(err.message)
})
  }

  const triggerError = (msg) => {
    setError(msg)
    setShakeKey((k) => k + 1)
  }

  const inputClass =
    'input-field w-full px-4 py-3 rounded-[10px] bg-[#F4F8FF] border border-[#D8E4F5] text-[#0B1E3F] placeholder-[#7A90B3] text-sm focus:border-[#1E6FFF]'
  const labelClass = 'text-sm font-medium text-[#0B1E3F]'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      {/* Row: Full Name + DOB */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Full Name</label>
          <input
            type="text"
            value={form.fullName}
            onChange={update('fullName')}
            placeholder="Chota Bheem"
            className={inputClass}
            autoComplete="name"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Date of Birth</label>
          <input
            type="date"
            value={form.dob}
            onChange={update('dob')}
            className={`${inputClass} text-[#0B1E3F]`}
            max={new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1">
        <label className={labelClass}>Email Address</label>
        <input
          type="email"
          value={form.email}
          onChange={update('email')}
          placeholder="you@example.com"
          className={inputClass}
          autoComplete="email"
        />
      </div>

      {/* Mobile */}
      <div className="flex flex-col gap-1">
        <label className={labelClass}>Mobile Number</label>
        <input
          type="tel"
          value={form.mobile}
          onChange={update('mobile')}
          placeholder="+91 "
          className={inputClass}
          autoComplete="tel"
        />
      </div>

      {/* Password + Strength */}
      <div className="flex flex-col gap-1">
        <label className={labelClass}>Create Password</label>
        <input
          type="password"
          value={form.password}
          onChange={update('password')}
          placeholder="Min. 8 characters"
          className={inputClass}
          autoComplete="new-password"
        />
        <PasswordStrengthBar password={form.password} />
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col gap-1">
        <label className={labelClass}>Re-enter Password</label>
        <input
          type="password"
          value={form.confirmPassword}
          onChange={update('confirmPassword')}
          placeholder="Repeat your password"
          className={`${inputClass} ${
            form.confirmPassword && form.confirmPassword !== form.password
              ? 'border-[#FF4D6A] bg-[#FF4D6A]/5'
              : form.confirmPassword && form.confirmPassword === form.password
              ? 'border-[#22C55E] bg-[#22C55E]/5'
              : ''
          }`}
          autoComplete="new-password"
        />
        {form.confirmPassword && form.confirmPassword !== form.password && (
          <p className="error-animate text-xs text-[#FF4D6A] mt-0.5">Passwords don't match</p>
        )}
      </div>

      {/* Error banner */}
      {error && (
        <div
          key={shakeKey}
          className="error-animate shake flex items-center gap-2 bg-[#FF4D6A]/10 border border-[#FF4D6A]/30 text-[#FF4D6A] text-sm px-4 py-2.5 rounded-[10px]"
        >
          <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full py-3 rounded-[12px] text-white font-semibold text-sm mt-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
            </svg>
            Creating account…
          </span>
        ) : 'Create Account'}
      </button>

      {/* Switch to Sign In */}
      <p className="text-center text-sm text-[#7A90B3]">
        Already have an account?{' '}
        <button
          type="button"
          onClick={() => onSwitchTab('login')}
          className="text-[#1E6FFF] font-semibold hover:underline"
        >
          Sign in
        </button>
      </p>
    </form>
  )
}
