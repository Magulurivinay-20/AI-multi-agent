const agents = [
  { initial: 'R', name: 'ResearchAgent', role: 'Researcher',     status: 'Active', color: '#1E6FFF' },
  { initial: 'W', name: 'WriterAgent',   role: 'Content Writer', status: 'Active', color: '#22CC88' },
  { initial: 'P', name: 'PlannerAgent',  role: 'Orchestrator',   status: 'Idle',   color: '#8B5CF6' },
]

export default function AgentPreviewCard() {
  return (
    <div className="bg-white rounded-2xl p-6 h-full" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[15px] font-bold text-[#0B1E3F]">My Agents</h2>
        <button
          onClick={() => alert('Coming soon')}
          className="text-xs font-semibold text-[#1E6FFF] hover:underline transition-all"
        >
          Manage All →
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {agents.map((a) => (
          <div
            key={a.name}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-[#F0F4FF] hover:border-[#D0DFFF] hover:shadow-sm transition-all duration-200 hover:-translate-y-1 cursor-default"
          >
            {/* Avatar */}
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0"
              style={{ background: a.color }}
            >
              {a.initial}
            </div>
            {/* Info */}
            <div className="text-center">
              <p className="text-xs font-bold text-[#0B1E3F] leading-tight truncate w-full">{a.name}</p>
              <p className="text-[11px] text-[#7A90B3] mt-0.5">{a.role}</p>
            </div>
            {/* Status badge */}
            <span
              className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
              style={{
                background: a.status === 'Active' ? 'rgba(34,204,136,0.12)' : 'rgba(122,144,179,0.12)',
                color:      a.status === 'Active' ? '#22CC88'               : '#7A90B3',
              }}
            >
              {a.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
