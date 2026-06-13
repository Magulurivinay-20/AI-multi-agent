import { useState } from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

export default function AuthCard({ onLogin, onSignup, userStore }) {
  const [tab, setTab] = useState('login')

  return (
    <div
      className="card-animate w-full max-w-[440px] bg-white mx-4"
      style={{
        borderRadius: '28px',
        boxShadow: '0 20px 60px rgba(11,30,63,0.35), 0 4px 20px rgba(30,111,255,0.12)',
        padding: '40px 36px 36px',
      }}
    >
      {/* Logo */}
      <div className="flex flex-col items-center mb-6">
        <div className="mb-3 flex items-center justify-center" style={{ width: 120, height: 120 }}>
          <img
            src="/assets/logo.png"
            alt="AgentFlow AI Logo"
            style={{
              width: 120, height: 120, objectFit: 'contain', display: 'block',
              filter: 'drop-shadow(0 6px 16px rgba(30,111,255,0.35))',
            }}
          />
        </div>
        <h1
          className="text-2xl font-extrabold tracking-tight"
          style={{
            background: 'linear-gradient(135deg, #1E6FFF 0%, #0B50CC 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}
        >AgentFlow AI</h1>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#7A90B3] mt-1">
          Multi-Agent Platform
        </p>
      </div>

      {/* Tabs */}
      <div className="flex bg-[#F4F8FF] rounded-full p-1 mb-6" role="tablist">
        {['login', 'signup'].map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}
            className={`flex-1 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
              tab === t ? 'bg-white text-[#1E6FFF] tab-active' : 'text-[#7A90B3] hover:text-[#0B1E3F]'
            }`}>
            {t === 'login' ? 'Sign In' : 'Sign Up'}
          </button>
        ))}
      </div>

      {/* Forms */}
      {tab === 'login'
        ? <LoginForm onLogin={onLogin} onSwitchTab={setTab} userStore={userStore} />
        : <SignupForm onSignup={onSignup} onSwitchTab={setTab} userStore={userStore} />
      }
    </div>
  )
}
