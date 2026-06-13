import { Plus, Play, MessageSquare, FolderOpen } from 'lucide-react'

const actions = [
  { label: 'Create New Agent',  icon: Plus,          bg: '#1E6FFF', color: '#fff',    outline: false },
  { label: 'Run Workflow',      icon: Play,          bg: '#8B5CF6', color: '#fff',    outline: false },
  { label: 'Start Chat',        icon: MessageSquare, bg: '#22CC88', color: '#fff',    outline: false },
  { label: 'View Reports',      icon: FolderOpen,    bg: 'transparent', color: '#7A90B3', outline: true },
]

export default function QuickActions() {
  return (
    <div className="bg-white rounded-2xl p-6 h-full" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
      <h2 className="text-[15px] font-bold text-[#0B1E3F] mb-5">Quick Actions</h2>

      <div className="flex flex-col gap-3">
        {actions.map(({ label, icon: Icon, bg, color, outline }) => (
          <button
            key={label}
            onClick={() => alert(label)}
            className="flex items-center gap-3 w-full rounded-[10px] font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
            style={{
              height: 44,
              padding: '0 16px',
              background: outline ? 'transparent' : bg,
              color,
              border: outline ? `1.5px solid #D8E4F5` : 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={e => { if (outline) { e.currentTarget.style.borderColor = '#7A90B3'; e.currentTarget.style.color = '#0B1E3F' } }}
            onMouseLeave={e => { if (outline) { e.currentTarget.style.borderColor = '#D8E4F5'; e.currentTarget.style.color = '#7A90B3' } }}
          >
            <Icon size={17} strokeWidth={2.5} />
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
