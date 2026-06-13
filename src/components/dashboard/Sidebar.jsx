import { useState } from 'react'
import {
  LayoutDashboard, Bot, GitBranch, MessageSquare,
  Wrench, BarChart2, Settings, LogOut,
} from 'lucide-react'

const NAV = [
  { id: 'dashboard',  label: 'Dashboard',  icon: LayoutDashboard },
  { id: 'agents',     label: 'My Agents',  icon: Bot              },
  { id: 'workflows',  label: 'Workflows',  icon: GitBranch        },
  { id: 'chat',       label: 'Chat',       icon: MessageSquare    },
  { id: 'tools',      label: 'Tools',      icon: Wrench           },
  { id: 'analytics',  label: 'Analytics',  icon: BarChart2        },
  { id: 'settings',   label: 'Settings',   icon: Settings         },
]

export default function Sidebar({ user, active, onNav, onSignOut }) {
  const firstName = (user?.fullName || user?.username || 'User').split(' ')[0]
  const initial   = firstName.charAt(0).toUpperCase()

  return (
    <>
      {/* ── Desktop sidebar ──────────────────────────────── */}
      <aside
        className="hidden md:flex flex-col fixed top-0 left-0 h-full z-30"
        style={{ width: 240, background: '#0B1E3F' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
          <img
            src="/assets/logo.png"
            alt="AgentFlow AI"
            className="w-9 h-9 object-contain flex-shrink-0"
            style={{ filter: 'drop-shadow(0 2px 6px rgba(30,111,255,0.5))' }}
          />
          <span className="text-white font-extrabold text-base tracking-tight leading-tight">
            AgentFlow AI
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 px-3 mb-3">
            Navigation
          </p>
          {NAV.map(({ id, label, icon: Icon }) => {
            const isActive = active === id
            return (
              <button
                key={id}
                onClick={() => onNav(id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all duration-150 group"
                style={{
                  background: isActive ? '#1E6FFF' : 'transparent',
                  color: isActive ? '#fff' : '#7A90B3',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(30,111,255,0.15)'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#7A90B3' } }}
              >
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-sm font-semibold">{label}</span>
              </button>
            )
          })}
        </nav>

        {/* User + sign out */}
        <div className="px-3 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl mb-1">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
              style={{ background: 'linear-gradient(135deg,#1E6FFF,#0B50CC)' }}>
              {initial}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-semibold truncate">{firstName}</p>
              <p className="text-[#7A90B3] text-[10px] truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={onSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 text-[#7A90B3]"
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,77,106,0.12)'; e.currentTarget.style.color = '#FF4D6A' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#7A90B3' }}
          >
            <LogOut size={17} strokeWidth={2} />
            <span className="text-sm font-semibold">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ── Mobile bottom tab bar ─────────────────────────── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around px-2 py-2 border-t border-[#E8F0FB]"
        style={{ background: '#0B1E3F', height: 60 }}>
        {NAV.slice(0, 5).map(({ id, label, icon: Icon }) => {
          const isActive = active === id
          return (
            <button key={id}
              onClick={() => onNav(id)}
              className="flex flex-col items-center gap-0.5 px-2 transition-all"
              style={{ color: isActive ? '#1E6FFF' : '#7A90B3' }}>
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
              <span className="text-[10px] font-semibold">{label}</span>
            </button>
          )
        })}
      </nav>
    </>
  )
}
