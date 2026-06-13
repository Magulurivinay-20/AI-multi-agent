const activities = [
  { color: '#22CC88', agent: 'ResearchAgent', action: 'Completed web research task',    time: '2 min ago'  },
  { color: '#1E6FFF', agent: 'WriterAgent',   action: 'Generated blog post draft',       time: '15 min ago' },
  { color: '#F5C518', agent: 'PlannerAgent',  action: 'Broke down new workflow',         time: '1 hr ago'   },
  { color: '#FF4D6A', agent: 'CoderAgent',    action: 'Encountered an error in task',    time: '2 hr ago'   },
  { color: '#22CC88', agent: 'ReviewerAgent', action: 'Approved final output',           time: '3 hr ago'   },
]

export default function ActivityFeed() {
  return (
    <div className="bg-white rounded-2xl p-6 h-full" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[15px] font-bold text-[#0B1E3F]">Recent Activity</h2>
        <button className="text-xs font-semibold text-[#1E6FFF] hover:underline transition-all">
          View All
        </button>
      </div>

      <div className="flex flex-col gap-1">
        {activities.map((a, i) => (
          <div
            key={i}
            className="flex items-start gap-3 py-3 border-b border-[#F0F4FF] last:border-0 hover:bg-[#F8FAFF] rounded-xl px-2 transition-all duration-150"
          >
            {/* Status dot */}
            <div className="mt-1.5 flex-shrink-0">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: a.color }} />
            </div>
            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#0B1E3F] leading-tight">{a.agent}</p>
              <p className="text-xs text-[#7A90B3] mt-0.5 leading-snug">{a.action}</p>
            </div>
            {/* Time */}
            <span className="text-xs text-[#7A90B3] flex-shrink-0 mt-0.5">{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
