import { useState } from 'react'
import { Search, Globe, FileText, Code2, Database, Mail, Calendar, Rss, Cpu, ToggleLeft, ToggleRight, ExternalLink } from 'lucide-react'

const TOOLS = [
  { id: 1,  name: 'Web Search',       desc: 'Search the internet in real time',         icon: Globe,    color: '#1E6FFF', category: 'Research',  enabled: true  },
  { id: 2,  name: 'Document Reader',  desc: 'Read and extract data from PDFs & Docs',   icon: FileText, color: '#22CC88', category: 'Research',  enabled: true  },
  { id: 3,  name: 'Code Interpreter', desc: 'Execute Python & JS code safely',           icon: Code2,    color: '#8B5CF6', category: 'Dev',       enabled: true  },
  { id: 4,  name: 'SQL Database',     desc: 'Query structured databases directly',       icon: Database, color: '#FF944D', category: 'Data',      enabled: false },
  { id: 5,  name: 'Email Sender',     desc: 'Send emails on behalf of agents',          icon: Mail,     color: '#06B6D4', category: 'Comm',      enabled: false },
  { id: 6,  name: 'Calendar',         desc: 'Read and write calendar events',           icon: Calendar, color: '#FF4D6A', category: 'Comm',      enabled: true  },
  { id: 7,  name: 'RSS Feed Reader',  desc: 'Parse and monitor RSS/Atom feeds',         icon: Rss,      color: '#F59E0B', category: 'Research',  enabled: false },
  { id: 8,  name: 'Model Switcher',   desc: 'Dynamically switch LLMs per task',         icon: Cpu,      color: '#EC4899', category: 'AI',        enabled: true  },
]

const CATEGORIES = ['All', 'Research', 'Dev', 'Data', 'Comm', 'AI']

function ToolCard({ tool, onToggle }) {
  const Icon = tool.icon
  return (
    <div className="bg-white rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
      style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${tool.color}18` }}>
          <Icon size={20} style={{ color: tool.color }} strokeWidth={1.8} />
        </div>
        {/* Toggle */}
        <button onClick={() => onToggle(tool.id)} className="transition-all hover:scale-110">
          {tool.enabled
            ? <ToggleRight size={28} style={{ color: '#1E6FFF' }} />
            : <ToggleLeft  size={28} style={{ color: '#D8E4F5' }} />
          }
        </button>
      </div>

      <p className="font-bold text-[#0B1E3F] text-sm mb-1">{tool.name}</p>
      <p className="text-xs text-[#7A90B3] mb-4 leading-relaxed">{tool.desc}</p>

      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#F0F4FF] text-[#7A90B3]">
          {tool.category}
        </span>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full"
            style={{ background: tool.enabled ? '#22CC88' : '#D8E4F5' }} />
          <span className="text-[11px] font-semibold"
            style={{ color: tool.enabled ? '#22CC88' : '#D8E4F5' }}>
            {tool.enabled ? 'Enabled' : 'Disabled'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function ToolsPage() {
  const [tools, setTools] = useState(TOOLS)
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('All')

  const toggle = (id) => setTools(t => t.map(tool => tool.id === id ? { ...tool, enabled: !tool.enabled } : tool))

  const filtered = tools.filter(t =>
    (cat === 'All' || t.category === cat) &&
    t.name.toLowerCase().includes(search.toLowerCase())
  )

  const enabledCount = tools.filter(t => t.enabled).length

  return (
    <div style={{ padding: 28 }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
        <div>
          <h2 className="text-2xl font-extrabold text-[#0B1E3F]">Tools</h2>
          <p className="text-sm text-[#7A90B3] mt-1">
            {enabledCount} of {tools.length} tools enabled
          </p>
        </div>
        <button onClick={() => alert('Tool marketplace coming soon')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold transition-all hover:-translate-y-0.5 hover:shadow-lg"
          style={{ background: 'linear-gradient(135deg,#8B5CF6,#6D28D9)' }}>
          <ExternalLink size={15} /> Browse Marketplace
        </button>
      </div>

      {/* Search + categories */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A90B3]" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search tools..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-[#E8F0FB] text-sm text-[#0B1E3F] placeholder-[#7A90B3] outline-none focus:border-[#1E6FFF] transition-all" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className="px-3 py-2 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: cat === c ? '#1E6FFF' : '#fff',
                color:      cat === c ? '#fff'    : '#7A90B3',
                border:     cat === c ? 'none'    : '1px solid #E8F0FB',
              }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Enable all / disable all */}
      <div className="flex gap-3 mb-6">
        <button onClick={() => setTools(t => t.map(tool => ({ ...tool, enabled: true })))}
          className="text-xs font-semibold text-[#1E6FFF] hover:underline">Enable All</button>
        <span className="text-[#D8E4F5]">|</span>
        <button onClick={() => setTools(t => t.map(tool => ({ ...tool, enabled: false })))}
          className="text-xs font-semibold text-[#7A90B3] hover:underline">Disable All</button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {filtered.map(tool => <ToolCard key={tool.id} tool={tool} onToggle={toggle} />)}
      </div>
    </div>
  )
}
