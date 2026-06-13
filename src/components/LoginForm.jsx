import React, { useState } from 'react'

export default function LoginForm({ onLogin, onSwitchTab, userStore }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [shakeKey, setShakeKey] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!username.trim() || !password.trim()) {
      triggerError('Please fill in all fields.')
      return
    }

    // Look up user in the in-memory store
    
fetch("http://localhost:9090/api/users/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    email: username,
    password: password
  })
})
.then(async res => {
  const text = await res.text()

  if (!text) {
    setLoading(false)
    triggerError("Incorrect username or password.")
    return null
  }

  return JSON.parse(text)
})
.then(data => {
  if (!data) return

  setLoading(false)
  onLogin(data)
})
.catch(err => {
  console.error(err)
  setLoading(false)
  triggerError("Server error.")
})

  }

  const triggerError = (msg) => {
    setError(msg)
    setShakeKey((k) => k + 1)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      {/* Username */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-[#0B1E3F]">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          className="input-field w-full px-4 py-3 rounded-[10px] bg-[#F4F8FF] border border-[#D8E4F5] text-[#0B1E3F] placeholder-[#7A90B3] text-sm focus:border-[#1E6FFF]"
          autoComplete="username"
        />
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-[#0B1E3F]">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="input-field w-full px-4 py-3 rounded-[10px] bg-[#F4F8FF] border border-[#D8E4F5] text-[#0B1E3F] placeholder-[#7A90B3] text-sm focus:border-[#1E6FFF]"
          autoComplete="current-password"
        />
      </div>

      {/* Error */}
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
            Signing in…
          </span>
        ) : 'Sign In'}
      </button>

      {/* Switch to Sign Up */}
      <p className="text-center text-sm text-[#7A90B3]">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={() => onSwitchTab('signup')}
          className="text-[#1E6FFF] font-semibold hover:underline"
        >
          Create one
        </button>
      </p>
    </form>
  )
}
