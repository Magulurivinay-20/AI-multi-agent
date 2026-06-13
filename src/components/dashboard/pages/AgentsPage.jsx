import { useEffect, useState } from 'react'
import { Plus, Search, MoreVertical, Play, Pause, Trash2, Edit3, Bot } from 'lucide-react'
const INITIAL_AGENTS = [
  { id: 1, initial: 'R', name: 'ResearchAgent',  role: 'Researcher',       status: 'Active', color: '#1E6FFF', tasks: 42, model: 'GPT-4o',       created: 'Jun 1, 2026'  },
  { id: 2, initial: 'W', name: 'WriterAgent',    role: 'Content Writer',   status: 'Active', color: '#22CC88', tasks: 38, model: 'GPT-4o',       created: 'Jun 3, 2026'  },
  { id: 3, initial: 'P', name: 'PlannerAgent',   role: 'Orchestrator',     status: 'Idle',   color: '#8B5CF6', tasks: 17, model: 'GPT-4 Turbo',  created: 'Jun 5, 2026'  },
  { id: 4, initial: 'C', name: 'CoderAgent',     role: 'Software Engineer',status: 'Error',  color: '#FF4D6A', tasks: 9,  model: 'Claude 3.5',   created: 'Jun 8, 2026'  },
  { id: 5, initial: 'D', name: 'DataAgent',      role: 'Data Analyst',     status: 'Idle',   color: '#FF944D', tasks: 22, model: 'GPT-4o Mini',  created: 'Jun 9, 2026'  },
  { id: 6, initial: 'S', name: 'SummaryAgent',   role: 'Summarizer',       status: 'Active', color: '#06B6D4', tasks: 55, model: 'Claude 3 Haiku',created: 'Jun 10, 2026' },
]

const STATUS_STYLE = {
  Active: { bg: 'rgba(34,204,136,0.12)',  color: '#22CC88' },
  Idle:   { bg: 'rgba(122,144,179,0.12)', color: '#7A90B3' },
  Error:  { bg: 'rgba(255,77,106,0.12)',  color: '#FF4D6A' },
}

function AgentCard({
  agent,
  onToggle,
  onDelete,
  onView,
  onEdit
}) {
  const [menu, setMenu] = useState(false)
  const s = STATUS_STYLE[agent.status]

  return (
    <div
  onClick={() => onView(agent)}
  className="bg-white rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg relative cursor-pointer"
      style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
            style={{ background: agent.color }}>
            {agent.initial}
          </div>
          <div>
            <p className="font-bold text-[#0B1E3F] text-sm leading-tight">{agent.name}</p>
            <p className="text-xs text-[#7A90B3] mt-0.5">{agent.role}</p>
          </div>
        </div>

        {/* Menu */}
        <div className="relative">
          <button
  onClick={(e) => {
    e.stopPropagation()
    setMenu(v => !v)
  }}
  className="w-8 h-8 rounded-lg flex items-center justify-center text-[#7A90B3]"
>
  <MoreVertical size={16} />
</button>
          {menu && (
            <div className="absolute right-0 top-9 w-40 bg-white rounded-xl z-10 overflow-hidden"
              style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.12)', border: '1px solid #E8F0FB' }}>
<button
  onClick={() => {
    setMenu(false)
    onEdit(agent)
  }}
                className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-[#0B1E3F] hover:bg-[#F0F4FF] transition-colors">
                <Edit3 size={14} /> Edit Agent
              </button>
              <button onClick={() => { setMenu(false); onToggle(agent.id) }}
                className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-[#0B1E3F] hover:bg-[#F0F4FF] transition-colors">
                {agent.status === 'Active' ? <><Pause size={14} /> Pause</> : <><Play size={14} /> Activate</>}
              </button>
              <div className="border-t border-[#F0F4FF]">
                <button onClick={() => { setMenu(false); onDelete(agent.id) }}
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-[#FF4D6A] hover:bg-[#FFF0F3] transition-colors">
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-[#F8FAFF] rounded-xl p-2.5 text-center">
          <p className="text-lg font-extrabold text-[#0B1E3F]">{agent.tasks}</p>
          <p className="text-[10px] text-[#7A90B3] font-medium">Tasks</p>
        </div>
        <div className="bg-[#F8FAFF] rounded-xl p-2.5 text-center">
          <p className="text-xs font-bold text-[#0B1E3F] mt-1 leading-tight">{agent.model}</p>
          <p className="text-[10px] text-[#7A90B3] font-medium">Model</p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
          style={{ background: s.bg, color: s.color }}>
          ● {agent.status}
        </span>
        <span className="text-[10px] text-[#7A90B3]">Created {agent.created}</span>
      </div>
    </div>
  )
}

export default function AgentsPage() {
  const [agents, setAgents] = useState(() => {
  const saved = localStorage.getItem("agents")
  return saved ? JSON.parse(saved) : INITIAL_AGENTS
})
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
const [showForm, setShowForm] = useState(false)
const [editingAgent, setEditingAgent] = useState(null)
const [form, setForm] = useState({ name:'', role:'Researcher', model:'claude-sonnet-4', systemPrompt:'', tools:[], color:'#1E6FFF' })
const [errors, setErrors] = useState({})
const [selectedAgent, setSelectedAgent] = useState(null)
useEffect(() => {
  fetch("http://localhost:9090/api/agents")
    .then(res => res.json())
    .then(data => {
      const formatted = data.map(a => ({
        ...a,
        initial: a.name?.charAt(0)?.toUpperCase() || "A",
        created: "Today"
      }))
      setAgents(formatted)
    })
}, [])
useEffect(() => {
  localStorage.setItem("agents", JSON.stringify(agents))
}, [agents])
const MODELS = ['claude-sonnet-4','claude-haiku-4','gpt-4o','gpt-4o-mini','gemini-1.5-pro']
const ROLES  = ['Researcher','Writer','Coder','Planner','Reviewer','Analyst','Summarizer','Custom']
const TOOLS  = [
  { id:'web',    label:'Web Search'      },
  { id:'code',   label:'Code Execution'  },
  { id:'file',   label:'File Read/Write' },
  { id:'memory', label:'Memory Store'    },
  { id:'api',    label:'API Caller'      },
]
const COLORS = ['#1E6FFF','#22CC88','#8B5CF6','#FF944D','#FF4D6A','#06B6D4']
const handleEdit = (agent) => {
  setEditingAgent(agent)

  setForm({
    name: agent.name,
    role: agent.role,
    model: agent.model,
    systemPrompt: '',
    tools: [],
    color: agent.color
  })

  setShowForm(true)
}
const exportAgents = () => {
  const dataStr = JSON.stringify(agents, null, 2)

  const blob = new Blob(
    [dataStr],
    { type: "application/json" }
  )

  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = "agents.json"
  a.click()

  URL.revokeObjectURL(url)
}
const handleSave = () => {
  const e = {}

  if (!form.name.trim())
    e.name = 'Agent name is required'

  if (!editingAgent && !form.systemPrompt.trim())
    e.systemPrompt = 'System prompt is required'

  setErrors(e)

  if (Object.keys(e).length > 0)
    return

  const url = editingAgent
  ? `http://localhost:9090/api/agents/${editingAgent.id}`
  : "http://localhost:9090/api/agents"

const method = editingAgent ? "PUT" : "POST"

fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: form.name,
      role: form.role,
      model: form.model,
      status: "Idle",
      color: form.color,
      tasks: 0
    })
  })
    .then(res => res.json())
    .then(agent => {
      if (editingAgent) {
  setAgents(prev =>
    prev.map(a =>
      a.id === agent.id
        ? {
            ...agent,
            initial: agent.name.charAt(0).toUpperCase(),
            created: a.created
          }
        : a
    )
  )
} else {
  setAgents(prev => [
    ...prev,
    {
      ...agent,
      initial: agent.name.charAt(0).toUpperCase(),
      created: "Today"
    }
  ])
}

      setForm({
        name: '',
        role: 'Researcher',
        model: 'claude-sonnet-4',
        systemPrompt: '',
        tools: [],
        color: '#1E6FFF'
      })

      setErrors({})
      setEditingAgent(null)
      setShowForm(false)
    })
}


  const toggle = (id) => setAgents(a => a.map(ag =>
    ag.id === id ? { ...ag, status: ag.status === 'Active' ? 'Idle' : 'Active' } : ag
  ))
  const [deleteAgentId, setDeleteAgentId] = useState(null)

const del = (id) => {
  setDeleteAgentId(id)
}
  const filtered = agents.filter(a => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.role.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'All' || a.status === filter
    return matchSearch && matchFilter
  })

  return (
    <div style={{ padding: 28 }}>
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
        <div>
          <h2 className="text-2xl font-extrabold text-[#0B1E3F]">My Agents</h2>
          <p className="text-sm text-[#7A90B3] mt-1">{agents.length} agents configured</p>
        </div>
       <div className="flex gap-3">
  <button
    onClick={exportAgents}
    className="px-5 py-2.5 rounded-xl text-white text-sm font-bold"
    style={{ background: '#22CC88' }}
  >
    Export Agents
  </button>

  <button
    onClick={() => setShowForm(true)}
    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold transition-all hover:-translate-y-0.5 hover:shadow-lg"
    style={{ background: 'linear-gradient(135deg,#1E6FFF,#0B50CC)' }}
  >
    <Plus size={16} strokeWidth={2.5} /> New Agent
  </button>
</div>
      </div>

      {/* Search + filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A90B3]" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search agents..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-[#E8F0FB] text-sm text-[#0B1E3F] placeholder-[#7A90B3] outline-none focus:border-[#1E6FFF] transition-all"
          />
        </div>
        <div className="flex gap-2">
          {['All','Active','Idle','Error'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: filter === f ? '#1E6FFF' : '#fff',
                color: filter === f ? '#fff' : '#7A90B3',
                border: filter === f ? 'none' : '1px solid #E8F0FB',
              }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Summary badges */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {['Active','Idle','Error'].map(s => {
          const count = agents.filter(a => a.status === s).length
          const style = STATUS_STYLE[s]
          return (
            <div key={s} className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: style.bg, color: style.color }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: style.color }} />
              {count} {s}
            </div>
          )
        })}
      </div>

      {/* Agent grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <Bot size={48} className="mx-auto text-[#D8E4F5] mb-3" />
          <p className="text-[#7A90B3] font-semibold">No agents found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
{filtered.map(a => (
  <AgentCard
    key={a.id}
    agent={a}
    onToggle={toggle}
    onDelete={del}
    onView={setSelectedAgent}
    onEdit={handleEdit}
  />
))}
        </div>
      )}
      {/* Create Agent Modal */}
{showForm && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
    style={{ background: 'rgba(11,30,63,0.5)', backdropFilter: 'blur(4px)' }}>
    <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
      style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.2)' }}>

      {/* Modal Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#F0F4FF]">
        <h3 className="text-lg font-extrabold text-[#0B1E3F]">{editingAgent ? "Edit Agent" : "Create New Agent"}</h3>
        <button onClick={() => setShowForm(false)}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-[#7A90B3] hover:bg-[#F0F4FF] transition-all">
          ✕
        </button>
      </div>

      {/* Modal Body */}
      <div className="px-6 py-5 flex flex-col gap-4">

        {/* Name */}
        <div>
          <label className="block text-xs font-bold text-[#0B1E3F] mb-1.5">Agent Name *</label>
          <input value={form.name} onChange={e => setForm(f=>({...f,name:e.target.value}))}
            placeholder="e.g. ResearchAgent"
            className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
            style={{ background:'#F4F8FF', border: errors.name ? '1.5px solid #FF4D6A' : '1.5px solid #D8E4F5', color:'#0B1E3F' }}
          />
          {errors.name && <p className="text-xs text-[#FF4D6A] mt-1">{errors.name}</p>}
        </div>

        {/* Role + Model */}
        <div className="grid grid-cols-2 gap-3">
  <div>
            <label className="block text-xs font-bold text-[#0B1E3F] mb-1.5">Role</label>
            <select value={form.role} onChange={e => setForm(f=>({...f,role:e.target.value}))}
              className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
              style={{ background:'#F4F8FF', border:'1.5px solid #D8E4F5', color:'#0B1E3F' }}>
              {ROLES.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-[#0B1E3F] mb-1.5">Model</label>
            <select value={form.model} onChange={e => setForm(f=>({...f,model:e.target.value}))}
              className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
              style={{ background:'#F4F8FF', border:'1.5px solid #D8E4F5', color:'#0B1E3F' }}>
              {MODELS.map(m => <option key={m}>{m}</option>)}
            </select>
          </div>
        </div>

        {/* System Prompt */}
        <div>
          <label className="block text-xs font-bold text-[#0B1E3F] mb-1.5">System Prompt *</label>
          <textarea value={form.systemPrompt} onChange={e => setForm(f=>({...f,systemPrompt:e.target.value}))}
            placeholder="Describe what this agent does and how it should behave..."
            rows={4}
            className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none transition-all"
            style={{ background:'#F4F8FF', border: errors.systemPrompt ? '1.5px solid #FF4D6A' : '1.5px solid #D8E4F5', color:'#0B1E3F' }}
          />
          {errors.systemPrompt && <p className="text-xs text-[#FF4D6A] mt-1">{errors.systemPrompt}</p>}
        </div>

        {/* Tools */}
        <div>
          <label className="block text-xs font-bold text-[#0B1E3F] mb-2">Tools</label>
          <div className="flex flex-wrap gap-2">
            {TOOLS.map(({ id, label }) => {
              const active = form.tools.includes(id)
              return (
                <button key={id} type="button"
                  onClick={() => setForm(f => ({
                    ...f,
                    tools: f.tools.includes(id) ? f.tools.filter(t=>t!==id) : [...f.tools, id]
                  }))}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                  style={{
                    background: active ? '#1E6FFF' : '#F0F4FF',
                    color: active ? '#fff' : '#7A90B3',
                    border: active ? 'none' : '1.5px solid #D8E4F5',
                  }}>
                  {active ? '✓ ' : '+ '}{label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Color */}
        <div>
          <label className="block text-xs font-bold text-[#0B1E3F] mb-2">Agent Color</label>
          <div className="flex gap-2">
            {COLORS.map(c => (
              <button key={c} type="button" onClick={() => setForm(f=>({...f,color:c}))}
                className="w-7 h-7 rounded-full transition-all hover:scale-110"
                style={{ background:c, border: form.color===c ? '3px solid #0B1E3F' : '3px solid transparent' }}>
                {form.color===c && <span className="text-white text-xs flex items-center justify-center h-full">✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Save */}
        <button onClick={handleSave}
          className="w-full py-3 rounded-xl text-sm font-bold text-white mt-1 transition-all hover:-translate-y-0.5"
          style={{ background:'linear-gradient(135deg,#1E6FFF,#0B50CC)', boxShadow:'0 4px 14px rgba(30,111,255,0.4)' }}>
          {editingAgent ? "Update Agent" : "Create Agent"}
        </button>
      </div>
    </div>
  </div>
)}
{selectedAgent && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center"
    style={{
      background: "rgba(0,0,0,0.5)"
    }}
    onClick={() => setSelectedAgent(null)}
  >
    <div
      className="bg-white rounded-2xl p-6 w-[500px]"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-2xl font-bold text-[#0B1E3F] mb-4">
        {selectedAgent.name}
      </h2>

      <p>
        <strong>Role:</strong>{" "}
        {selectedAgent.role}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        {selectedAgent.status}
      </p>

      <p>
        <strong>Model:</strong>{" "}
        {selectedAgent.model}
      </p>

      <p>
        <strong>Tasks:</strong>{" "}
        {selectedAgent.tasks}
      </p>

      <p>
        <strong>Created:</strong>{" "}
        {selectedAgent.created}
      </p>

      <button
        onClick={() =>
          setSelectedAgent(null)
        }
        className="mt-5 px-4 py-2 rounded-lg text-white"
        style={{
          background: "#1E6FFF"
        }}
      >
        Close
      </button>
    </div>
  </div>
)}
{deleteAgentId && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center"
    style={{ background: "rgba(0,0,0,0.5)" }}
  >
    <div className="bg-white rounded-2xl p-6 w-[400px]">
      <h2 className="text-xl font-bold mb-3">
        Delete Agent
      </h2>

      <p className="mb-5">
        Are you sure you want to delete this agent?
      </p>

      <div className="flex gap-3 justify-end">
        <button
          onClick={() => setDeleteAgentId(null)}
          className="px-4 py-2 rounded-lg border"
        >
          Cancel
        </button>

        <button
          onClick={() => {
             fetch(`http://localhost:9090/api/agents/${deleteAgentId}`, {
    method: "DELETE"
  })
  .then(() => {
    setAgents(prev =>
      prev.filter(
        a => a.id !== deleteAgentId
      )
    )
    setDeleteAgentId(null)
  })
          }}
          className="px-4 py-2 rounded-lg text-white"
          style={{
            background: "#FF4D6A"
          }}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  )
}
