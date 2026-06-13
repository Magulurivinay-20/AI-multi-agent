import { useState, useEffect } from 'react'
import { Cpu, CheckCircle, GitBranch, Zap } from 'lucide-react'
import Sidebar          from './Sidebar'
import Navbar           from './Navbar'
import StatsCard        from './StatsCard'
import ActivityFeed     from './ActivityFeed'
import QuickActions     from './QuickActions'
import AgentPreviewCard from './AgentPreviewCard'
import TokenUsageChart  from './TokenUsageChart'
import AgentsPage       from './pages/AgentsPage'
import WorkflowsPage    from './pages/WorkflowsPage'
import ChatPage         from './pages/ChatPage'
import AnalyticsPage    from './pages/AnalyticsPage'
import ToolsPage        from './pages/ToolsPage'
import SettingsPage     from './pages/SettingsPage'

import { Plus, Play, MessageSquare, FolderOpen } from 'lucide-react'




const PAGE_TITLES = {
  dashboard: 'Dashboard',
  agents:    'My Agents',
  workflows: 'Workflows',
  chat:      'Chat',
  tools:     'Tools',
  analytics: 'Analytics',
  settings:  'Settings',
}

export default function Dashboard({ user, onSignOut }) {
  const [activePage, setActivePage] = useState('dashboard')
const [agentCount, setAgentCount] = useState(0)
const [workflowCount, setWorkflowCount] = useState(0)

  useEffect(() => {
  fetch("http://localhost:9090/api/agents/count")
    .then(r => r.text())
    .then(setAgentCount)

  fetch("http://localhost:9090/api/workflows/count")
    .then(r => r.text())
    .then(setWorkflowCount)
}, [])
  return (
    <div className="min-h-screen" style={{ background: '#F0F4FF', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar user={user} active={activePage} onNav={setActivePage} onSignOut={onSignOut} />
      <Navbar  user={user} title={PAGE_TITLES[activePage]} onSignOut={onSignOut} />

      <main className="min-h-screen" style={{ paddingTop: 64, paddingBottom: 80 }}>
        {/* Desktop: offset for sidebar */}
        <div className="hidden md:block" style={{ marginLeft: 240 }}>
         <PageRouter
  page={activePage}
  user={user}
  onNav={setActivePage}
  agents={JSON.parse(localStorage.getItem('agents') || '[]')}
/>
        </div>
        {/* Mobile: full width */}
        <div className="md:hidden">
          <PageRouter
  page={activePage}
  user={user}
  onNav={setActivePage}
  agents={JSON.parse(localStorage.getItem('agents') || '[]')}
/>
        </div>
      </main>
    </div>
  )
}

function PageRouter({ page, user, onNav, agents }) {
  switch (page) {
    case 'agents':
      return <AgentsPage />

    case 'workflows':
      return <WorkflowsPage />

    case 'chat':
      return <ChatPage user={user} />

    case 'analytics':
      return <AnalyticsPage />

    case 'tools':
      return <ToolsPage />

    case 'settings':
      return <SettingsPage user={user} />

    default:
      return <DashboardHome user={user} onNav={onNav} agents={agents} />
  }
}

function DashboardHome({ user, onNav, agents = [] }) {
  const firstName = (user?.fullName || user?.username || 'User').split(' ')[0]

  // Greet based on hour
  const hour = new Date().getHours()
  const greet = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
const activeAgents = agents.filter(a => a.status === 'Active').length

const totalTasks = agents.reduce(
  (sum, a) => sum + (a.tasks || 0),
  0
)

const dashboardStats = [
  {
    label: 'Active Agents',
    rawValue: activeAgents,
    change: `${activeAgents} running`,
    positive: true,
    icon: Cpu,
    accent: '#1E6FFF',
    bg: 'rgba(30,111,255,0.1)'
  },
  {
    label: 'Tasks Completed',
    rawValue: totalTasks,
    change: '+12% this week',
    positive: true,
    icon: CheckCircle,
    accent: '#22CC88',
    bg: 'rgba(34,204,136,0.1)'
  },
  {
    label: 'Workflows Running',
    rawValue: 2,
    change: '+1 today',
    positive: true,
    icon: GitBranch,
    accent: '#8B5CF6',
    bg: 'rgba(139,92,246,0.1)'
  },
  {
    label: 'Tokens Used',
    rawValue: 84320,
    change: '+8% this week',
    positive: false,
    icon: Zap,
    accent: '#FF944D',
    bg: 'rgba(255,148,77,0.1)'
  }
]
  return (
    <div style={{ padding: 28 }}>
      {/* Welcome */}
      <div className="mb-7">
        <h2 className="text-2xl font-extrabold text-[#0B1E3F]">{greet}, {firstName} 👋</h2>
        <p className="text-sm text-[#7A90B3] mt-1">Here's what's happening with your agents today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {dashboardStats.map(s => (
  <StatsCard key={s.label} {...s} />
))}
      </div>

      {/* Activity + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
        <div className="lg:col-span-3"><ActivityFeed /></div>
        <div className="lg:col-span-2">
          {/* Override quick actions to use real nav */}
          <QuickActionsWired onNav={onNav} />
        </div>
      </div>

      {/* Agents preview + Token usage */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3"><AgentPreviewCard /></div>
        <div className="lg:col-span-2"><TokenUsageChart /></div>
      </div>
    </div>
  )
}



function QuickActionsWired({ onNav }) {
  const actions = [
    { label: 'Create New Agent',  icon: Plus,          bg: '#1E6FFF', color: '#fff', outline: false, nav: 'agents'    },
    { label: 'Run Workflow',      icon: Play,          bg: '#8B5CF6', color: '#fff', outline: false, nav: 'workflows' },
    { label: 'Start Chat',        icon: MessageSquare, bg: '#22CC88', color: '#fff', outline: false, nav: 'chat'      },
    { label: 'View Reports',      icon: FolderOpen,    bg: 'transparent', color: '#7A90B3', outline: true, nav: 'analytics' },
  ]
  return (
    <div className="bg-white rounded-2xl p-6 h-full" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
      <h2 className="text-[15px] font-bold text-[#0B1E3F] mb-5">Quick Actions</h2>
      <div className="flex flex-col gap-3">
        {actions.map(({ label, icon: Icon, bg, color, outline, nav }) => (
          <button key={label} onClick={() => onNav(nav)}
            className="flex items-center gap-3 w-full rounded-[10px] font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            style={{
              height: 44, padding: '0 16px',
              background: outline ? 'transparent' : bg,
              color,
              border: outline ? '1.5px solid #D8E4F5' : 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={e => { if (outline) { e.currentTarget.style.borderColor='#7A90B3'; e.currentTarget.style.color='#0B1E3F' } }}
            onMouseLeave={e => { if (outline) { e.currentTarget.style.borderColor='#D8E4F5'; e.currentTarget.style.color='#7A90B3' } }}
          >
            <Icon size={17} strokeWidth={2.5} />{label}
          </button>
        ))}
      </div>
    </div>
  )
}
