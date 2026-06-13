import { useState, useRef, useEffect } from 'react'
import { Bell, Search, ChevronDown, User, Settings, LogOut } from 'lucide-react'

const NOTIFICATIONS = [
  { id: 1, text: 'ResearchAgent completed a task',   time: '2 min ago',  dot: '#22CC88' },
  { id: 2, text: 'CoderAgent encountered an error',  time: '2 hr ago',   dot: '#FF4D6A' },
  { id: 3, text: 'New workflow template available',  time: '1 day ago',  dot: '#1E6FFF' },
]

export default function Navbar({ user, title, onSignOut }) {
  const firstName = (user?.fullName || user?.username || 'User').split(' ')[0]
  const initial   = firstName.charAt(0).toUpperCase()

  const [showNotif,  setShowNotif]  = useState(false)
  const [showUser,   setShowUser]   = useState(false)
  const [searchVal,  setSearchVal]  = useState('')

  const notifRef = useRef(null)
  const userRef  = useRef(null)

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotif(false)
      if (userRef.current  && !userRef.current.contains(e.target))  setShowUser(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <header
      className="fixed top-0 right-0 z-20 flex items-center px-6 md:px-8"
      style={{
        left: 0,
        paddingLeft: 0,
        height: 64,
        background: '#fff',
        boxShadow: '0 1px 0 #E8F0FB, 0 2px 12px rgba(0,0,0,0.04)',
      }}
    >
      {/* Offset for sidebar on desktop */}
      <div className="hidden md:block flex-shrink-0" style={{ width: 240 }} />

      {/* Page title */}
      <h1 className="text-lg font-extrabold text-[#0B1E3F] flex-shrink-0 px-6 md:px-8">{title}</h1>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right controls */}
      <div className="flex items-center gap-3 pr-6 md:pr-8">

        {/* Search */}
        <div className="relative hidden sm:block">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A90B3]" strokeWidth={2} />
          <input
            value={searchVal}
            onChange={e => setSearchVal(e.target.value)}
            placeholder="Search agents, workflows..."
            className="pl-9 pr-4 py-2 text-sm rounded-full bg-[#F0F4FF] border border-transparent focus:border-[#1E6FFF] focus:bg-white outline-none transition-all duration-200 text-[#0B1E3F] placeholder-[#7A90B3]"
            style={{ width: 220 }}
          />
        </div>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => { setShowNotif(v => !v); setShowUser(false) }}
            className="relative w-9 h-9 rounded-full flex items-center justify-center transition-all hover:bg-[#F0F4FF]"
          >
            <Bell size={19} strokeWidth={2} className="text-[#7A90B3]" />
            <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full text-white text-[9px] font-bold flex items-center justify-center"
              style={{ background: '#FF4D6A', lineHeight: 1 }}>3</span>
          </button>

          {showNotif && (
            <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl overflow-hidden z-50"
              style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.14)', border: '1px solid #E8F0FB' }}>
              <div className="px-4 py-3 border-b border-[#F0F4FF] flex items-center justify-between">
                <span className="text-sm font-bold text-[#0B1E3F]">Notifications</span>
                <span className="text-xs text-[#1E6FFF] font-semibold cursor-pointer hover:underline">Mark all read</span>
              </div>
              {NOTIFICATIONS.map(n => (
                <div key={n.id} className="flex items-start gap-3 px-4 py-3 hover:bg-[#F8FAFF] transition-colors cursor-pointer border-b border-[#F0F4FF] last:border-0">
                  <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: n.dot }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#0B1E3F] font-medium leading-snug">{n.text}</p>
                    <p className="text-xs text-[#7A90B3] mt-0.5">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User avatar */}
        <div className="relative" ref={userRef}>
          <button
            onClick={() => { setShowUser(v => !v); setShowNotif(false) }}
            className="flex items-center gap-2 rounded-full pl-1 pr-2 py-1 transition-all hover:bg-[#F0F4FF]"
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
              style={{ background: 'linear-gradient(135deg,#1E6FFF,#0B50CC)' }}>
              {initial}
            </div>
            <ChevronDown size={13} className="text-[#7A90B3]" strokeWidth={2.5} />
          </button>

          {showUser && (
            <div className="absolute right-0 top-12 w-52 bg-white rounded-2xl overflow-hidden z-50"
              style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.14)', border: '1px solid #E8F0FB' }}>
              <div className="px-4 py-3 border-b border-[#F0F4FF]">
                <p className="text-sm font-bold text-[#0B1E3F]">{firstName}</p>
                <p className="text-xs text-[#7A90B3] truncate">{user?.email}</p>
              </div>
              {[
                { label: 'Profile',   icon: User,     action: () => alert('Profile coming soon') },
                { label: 'Settings',  icon: Settings, action: () => alert('Settings coming soon') },
              ].map(({ label, icon: Icon, action }) => (
                <button key={label} onClick={action}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#0B1E3F] hover:bg-[#F0F4FF] transition-colors">
                  <Icon size={15} strokeWidth={2} className="text-[#7A90B3]" />
                  {label}
                </button>
              ))}
              <div className="border-t border-[#F0F4FF]">
                <button onClick={onSignOut}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-[#FF4D6A] hover:bg-[#FFF0F3] transition-colors">
                  <LogOut size={15} strokeWidth={2} />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
