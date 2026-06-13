import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { useEffect, useState } from 'react'

const taskData = [
  { day: 'Mon', completed: 18, failed: 2 },
  { day: 'Tue', completed: 24, failed: 1 },
  { day: 'Wed', completed: 21, failed: 3 },
  { day: 'Thu', completed: 30, failed: 0 },
  { day: 'Fri', completed: 27, failed: 2 },
  { day: 'Sat', completed: 14, failed: 1 },
  { day: 'Sun', completed: 19, failed: 0 },
]

const tokenTrend = [
  { week: 'W1', tokens: 62000 },
  { week: 'W2', tokens: 74000 },
  { week: 'W3', tokens: 69000 },
  { week: 'W4', tokens: 84320 },
]

const agentDist = [
  { name: 'ResearchAgent', value: 42, color: '#1E6FFF' },
  { name: 'WriterAgent',   value: 38, color: '#22CC88' },
  { name: 'SummaryAgent',  value: 55, color: '#06B6D4' },
  { name: 'PlannerAgent',  value: 17, color: '#8B5CF6' },
  { name: 'CoderAgent',    value: 9,  color: '#FF944D' },
  { name: 'DataAgent',     value: 22, color: '#FF4D6A' },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white rounded-xl px-3 py-2.5 shadow-lg border border-[#E8F0FB]">
      <p className="text-xs font-bold text-[#0B1E3F] mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-xs font-semibold" style={{ color: p.color || p.fill }}>
          {p.name}: {typeof p.value === 'number' && p.value > 999 ? p.value.toLocaleString() : p.value}
        </p>
      ))}
    </div>
  )
}

const KPI = ({ label, value, change, positive }) => (
  <div className="bg-white rounded-2xl p-5" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
    <p className="text-xs font-medium text-[#7A90B3] mb-1">{label}</p>
    <p className="text-3xl font-extrabold text-[#0B1E3F] mb-2">{value}</p>
    <span className="flex items-center gap-1 text-xs font-semibold"
      style={{ color: positive ? '#22CC88' : '#FF4D6A' }}>
      {positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
      {change}
    </span>
  </div>
)

export default function AnalyticsPage() {

const [userCount, setUserCount] = useState(0)
const [agentCount, setAgentCount] = useState(0)
const [workflowCount, setWorkflowCount] = useState(0)
const [chatCount, setChatCount] = useState(0)

useEffect(() => {

  fetch("http://localhost:9090/api/users/count")
    .then(r => r.text())
    .then(setUserCount)

  fetch("http://localhost:9090/api/agents/count")
    .then(r => r.text())
    .then(setAgentCount)

  fetch("http://localhost:9090/api/workflows/count")
    .then(r => r.text())
    .then(setWorkflowCount)

  fetch("http://localhost:9090/api/chat/count")
    .then(r => r.text())
    .then(setChatCount)

}, [])



  return (
    <div style={{ padding: 28 }}>
      {/* Header */}
      <div className="mb-7">
        <h2 className="text-2xl font-extrabold text-[#0B1E3F]">Analytics</h2>
        <p className="text-sm text-[#7A90B3] mt-1">Performance overview across all agents & workflows</p>
      </div>

<button
  onClick={() => {
    fetch("http://localhost:9090/api/chat/clear", {
      method: "DELETE"
    })
    .then(() => window.location.reload())
  }}
  className="bg-red-500 text-white px-4 py-2 rounded-lg"
>
  Clear History
</button>
      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        <KPI
  label="Total Users"
  value={userCount}
  change="Registered users"
  positive={true}
/>

<KPI
  label="Total Agents"
  value={agentCount}
  change="Created agents"
  positive={true}
/>

<KPI
  label="Total Workflows"
  value={workflowCount}
  change="Saved workflows"
  positive={true}
/>

<KPI
  label="Total Chats"
  value={chatCount}
  change="Messages stored"
  positive={true}
/>
        </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Task completion area */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
          <h3 className="text-[14px] font-bold text-[#0B1E3F] mb-4">Tasks Completed vs Failed (7 days)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={taskData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gCompleted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22CC88" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#22CC88" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="gFailed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF4D6A" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#FF4D6A" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#7A90B3' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#7A90B3' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="completed" name="Completed" stroke="#22CC88" strokeWidth={2} fill="url(#gCompleted)" dot={{ fill: '#22CC88', r: 3 }} />
              <Area type="monotone" dataKey="failed"    name="Failed"    stroke="#FF4D6A" strokeWidth={2} fill="url(#gFailed)"    dot={{ fill: '#FF4D6A', r: 3 }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: '#7A90B3' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Agent distribution pie */}
        <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
          <h3 className="text-[14px] font-bold text-[#0B1E3F] mb-4">Task Share by Agent</h3>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={agentDist} cx="50%" cy="50%" innerRadius={38} outerRadius={60}
                dataKey="value" paddingAngle={3}>
                {agentDist.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v, n) => [`${v} tasks`, n]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-2">
            {agentDist.map(a => (
              <div key={a.name} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: a.color }} />
                <span className="text-[10px] text-[#7A90B3] truncate">{a.name.replace('Agent','')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>



      {/* Token trend bar chart */}
      <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
        <h3 className="text-[14px] font-bold text-[#0B1E3F] mb-4">Token Usage Trend (4 weeks)</h3>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={tokenTrend} barSize={40} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
            <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#7A90B3', fontWeight: 600 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#7A90B3' }} axisLine={false} tickLine={false}
              tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} formatter={v => [v.toLocaleString(), 'Tokens']} />
            <Bar dataKey="tokens" name="Tokens" radius={[8,8,0,0]}>
              {tokenTrend.map((_, i) => (
                <Cell key={i} fill={i === tokenTrend.length - 1 ? '#1E6FFF' : 'rgba(30,111,255,0.3)'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
