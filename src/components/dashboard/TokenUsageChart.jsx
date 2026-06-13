import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const data = [
  { day: 'Mon', tokens: 9200  },
  { day: 'Tue', tokens: 14500 },
  { day: 'Wed', tokens: 11800 },
  { day: 'Thu', tokens: 16200 },
  { day: 'Fri', tokens: 13400 },
  { day: 'Sat', tokens: 7600  },
  { day: 'Sun', tokens: 11620 },
]

const TOTAL   = 84320
const LIMIT   = 500000
const PCT     = (TOTAL / LIMIT) * 100

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white rounded-xl px-3 py-2 shadow-lg border border-[#E8F0FB]">
      <p className="text-xs font-bold text-[#0B1E3F]">{label}</p>
      <p className="text-xs text-[#1E6FFF] font-semibold">{payload[0].value.toLocaleString()} tokens</p>
    </div>
  )
}

export default function TokenUsageChart() {
  return (
    <div className="bg-white rounded-2xl p-6 h-full" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
      <h2 className="text-[15px] font-bold text-[#0B1E3F] mb-5">Token Usage This Month</h2>

      {/* Bar chart */}
      <div style={{ height: 250 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={24} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#7A90B3', fontWeight: 600 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#7A90B3' }} axisLine={false} tickLine={false}
              tickFormatter={v => v >= 1000 ? `${v/1000}k` : v} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(30,111,255,0.06)', radius: 8 }} />
            <Bar dataKey="tokens" radius={[6, 6, 0, 0]}>
              {data.map((_, i) => (
                <Cell key={i} fill={i === data.length - 1 ? '#1E6FFF' : 'rgba(30,111,255,0.25)'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Usage summary */}
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold text-[#0B1E3F]">
            {TOTAL.toLocaleString()} <span className="text-[#7A90B3] font-normal">/ {LIMIT.toLocaleString()} tokens used</span>
          </span>
          <span className="text-xs font-bold text-[#1E6FFF]">{PCT.toFixed(1)}%</span>
        </div>
        {/* Progress bar */}
        <div className="w-full h-2 rounded-full bg-[#E8F0FB] overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${PCT}%`,
              background: 'linear-gradient(90deg, #1E6FFF 0%, #4D94FF 100%)',
            }}
          />
        </div>
      </div>
    </div>
  )
}
