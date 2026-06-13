import { useState } from 'react'
import { Plus, Play, Pause, GitBranch, Clock, CheckCircle, AlertCircle, MoreVertical, ArrowRight } from 'lucide-react'

const WORKFLOWS = [
  {
    id: 1, name: 'Content Pipeline',     status: 'Running',
    description: 'Research → Write → Review → Publish',
    steps: ['ResearchAgent', 'WriterAgent', 'ReviewerAgent'],
    activeStep: 1, runs: 14, lastRun: '2 min ago', color: '#22CC88',
  },
  {
    id: 2, name: 'Data Analysis Flow',   status: 'Running',
    description: 'Ingest → Analyze → Summarize → Report',
    steps: ['DataAgent', 'SummaryAgent', 'WriterAgent'],
    activeStep: 0, runs: 7,  lastRun: '25 min ago', color: '#1E6FFF',
  },
  {
    id: 3, name: 'Code Review Pipeline', status: 'Paused',
    description: 'CoderAgent → ReviewerAgent → Deploy',
    steps: ['CoderAgent', 'ReviewerAgent'],
    activeStep: 0, runs: 22, lastRun: '1 hr ago', color: '#8B5CF6',
  },
  {
    id: 4, name: 'Research Digest',      status: 'Completed',
    description: 'Research → Summarize → Email Draft',
    steps: ['ResearchAgent', 'SummaryAgent', 'WriterAgent'],
    activeStep: 3, runs: 31, lastRun: '3 hr ago', color: '#FF944D',
  },
  {
    id: 5, name: 'Bug Triage Flow',      status: 'Error',
    description: 'Monitor → CoderAgent → Notify',
    steps: ['CoderAgent'],
    activeStep: 0, runs: 5,  lastRun: '2 hr ago', color: '#FF4D6A',
  },
]

const STATUS_META = {
  Running:   { bg: 'rgba(34,204,136,0.12)',  color: '#22CC88', icon: Play         },
  Paused:    { bg: 'rgba(122,144,179,0.12)', color: '#7A90B3', icon: Pause        },
  Completed: { bg: 'rgba(30,111,255,0.12)',  color: '#1E6FFF', icon: CheckCircle  },
  Error:     { bg: 'rgba(255,77,106,0.12)',  color: '#FF4D6A', icon: AlertCircle  },
}

function WorkflowCard({ wf }) {
  const [menu, setMenu] = useState(false)
  const meta = STATUS_META[wf.status]
  const StatusIcon = meta.icon

  return (
    <div className="bg-white rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg relative"
      style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>

      {/* Top row */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${wf.color}22` }}>
            <GitBranch size={18} style={{ color: wf.color }} />
          </div>
          <div>
            <p className="font-bold text-[#0B1E3F] text-sm">{wf.name}</p>
            <p className="text-xs text-[#7A90B3] mt-0.5">{wf.description}</p>
          </div>
        </div>
        <div className="relative flex-shrink-0">
          <button onClick={() => setMenu(v => !v)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#7A90B3] hover:bg-[#F0F4FF] transition-all">
            <MoreVertical size={15} />
          </button>
          {menu && (
            <div className="absolute right-0 top-9 w-36 bg-white rounded-xl z-10 overflow-hidden"
              style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.12)', border: '1px solid #E8F0FB' }}>
              {['Edit', 'Duplicate', 'Delete'].map(a => (
                <button key={a} onClick={() => { setMenu(false); alert(`${a} coming soon`) }}
                  className={`w-full flex items-center px-3 py-2.5 text-sm transition-colors ${a === 'Delete' ? 'text-[#FF4D6A] hover:bg-[#FFF0F3]' : 'text-[#0B1E3F] hover:bg-[#F0F4FF]'}`}>
                  {a}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Steps pipeline */}
      <div className="flex items-center gap-1 mb-4 flex-wrap">
        {wf.steps.map((step, i) => (
          <div key={i} className="flex items-center gap-1">
            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full transition-all ${
              i < wf.activeStep
                ? 'bg-[#22CC88] text-white'
                : i === wf.activeStep && wf.status === 'Running'
                ? 'text-white'
                : 'bg-[#F0F4FF] text-[#7A90B3]'
            }`}
              style={i === wf.activeStep && wf.status === 'Running' ? { background: wf.color } : {}}>
              {step}
            </span>
            {i < wf.steps.length - 1 && (
              <ArrowRight size={12} className="text-[#D8E4F5]" />
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full"
          style={{ background: meta.bg, color: meta.color }}>
          <StatusIcon size={11} />
          {wf.status}
        </span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[11px] text-[#7A90B3]">
            <Play size={10} /> {wf.runs} runs
          </span>
          <span className="flex items-center gap-1 text-[11px] text-[#7A90B3]">
            <Clock size={10} /> {wf.lastRun}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function WorkflowsPage() {
  const [workflows] = useState(WORKFLOWS)

  const running   = workflows.filter(w => w.status === 'Running').length
  const completed = workflows.filter(w => w.status === 'Completed').length
  const errors    = workflows.filter(w => w.status === 'Error').length

  return (
    <div style={{ padding: 28 }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
        <div>
          <h2 className="text-2xl font-extrabold text-[#0B1E3F]">Workflows</h2>
          <p className="text-sm text-[#7A90B3] mt-1">Automate multi-agent pipelines</p>
        </div>
        <button onClick={() => alert('Workflow builder coming soon')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold transition-all hover:-translate-y-0.5 hover:shadow-lg"
          style={{ background: 'linear-gradient(135deg,#8B5CF6,#6D28D9)' }}>
          <Plus size={16} strokeWidth={2.5} /> New Workflow
        </button>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
        {[
          { label: 'Total',     val: workflows.length, color: '#1E6FFF', bg: 'rgba(30,111,255,0.08)'  },
          { label: 'Running',   val: running,           color: '#22CC88', bg: 'rgba(34,204,136,0.08)'  },
          { label: 'Completed', val: completed,         color: '#8B5CF6', bg: 'rgba(139,92,246,0.08)'  },
          { label: 'Errors',    val: errors,            color: '#FF4D6A', bg: 'rgba(255,77,106,0.08)'  },
        ].map(({ label, val, color, bg }) => (
          <div key={label} className="bg-white rounded-2xl p-4 text-center" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <p className="text-2xl font-extrabold" style={{ color }}>{val}</p>
            <p className="text-xs text-[#7A90B3] font-medium mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Workflow cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {workflows.map(wf => <WorkflowCard key={wf.id} wf={wf} />)}
      </div>
    </div>
  )
}
