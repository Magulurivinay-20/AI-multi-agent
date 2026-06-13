import { useState } from 'react'
import { User, Lock, Bell, Cpu, Palette, Shield, Save, Eye, EyeOff } from 'lucide-react'

const TABS = [
  { id: 'profile',       label: 'Profile',       icon: User     },
  { id: 'security',      label: 'Security',      icon: Lock     },
  { id: 'notifications', label: 'Notifications', icon: Bell     },
  { id: 'ai',            label: 'AI & Models',   icon: Cpu      },
  { id: 'appearance',    label: 'Appearance',    icon: Palette  },
  { id: 'privacy',       label: 'Privacy',       icon: Shield   },
]

function Section({ title, children }) {
  return (
    <div className="mb-8">
      <h3 className="text-sm font-bold text-[#0B1E3F] mb-4 pb-2 border-b border-[#F0F4FF]">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function Field({ label, hint, children }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-8">
      <div className="sm:w-48 flex-shrink-0">
        <p className="text-sm font-semibold text-[#0B1E3F]">{label}</p>
        {hint && <p className="text-xs text-[#7A90B3] mt-0.5">{hint}</p>}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  )
}

function TextInput({ value, onChange, placeholder, type = 'text' }) {
  const [show, setShow] = useState(false)
  const isPass = type === 'password'
  return (
    <div className="relative">
      <input
        type={isPass && !show ? 'password' : 'text'}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFF] border border-[#E8F0FB] text-sm text-[#0B1E3F] placeholder-[#7A90B3] outline-none focus:border-[#1E6FFF] focus:bg-white transition-all"
      />
      {isPass && (
        <button type="button" onClick={() => setShow(v => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A90B3] hover:text-[#0B1E3F]">
          {show ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      )}
    </div>
  )
}

function Toggle({ checked, onChange, label }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div onClick={() => onChange(!checked)}
        className="w-11 h-6 rounded-full transition-all duration-200 flex items-center px-0.5"
        style={{ background: checked ? '#1E6FFF' : '#D8E4F5' }}>
        <div className="w-5 h-5 bg-white rounded-full shadow transition-all duration-200"
          style={{ transform: checked ? 'translateX(20px)' : 'translateX(0)' }} />
      </div>
      <span className="text-sm text-[#0B1E3F]">{label}</span>
    </label>
  )
}

function Select({ value, onChange, options }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFF] border border-[#E8F0FB] text-sm text-[#0B1E3F] outline-none focus:border-[#1E6FFF] transition-all appearance-none cursor-pointer">
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  )
}

export default function SettingsPage({ user }) {
  const [activeTab, setActiveTab] = useState('profile')
  const [saved, setSaved] = useState(false)

  // Profile state
  const [fullName, setFullName] = useState(user?.fullName || '')
  const [email,    setEmail]    = useState(user?.email    || '')
  const [bio,      setBio]      = useState('AI enthusiast building the future of automation.')
  const [timezone, setTimezone] = useState('utc')

  // Notifications
  const [notifs, setNotifs] = useState({ email: true, push: true, weekly: false, errors: true })

  // AI
  const [model,    setModel]    = useState('gpt4o')
  const [temp,     setTemp]     = useState('0.7')
  const [maxTok,   setMaxTok]   = useState('4096')
  const [memory,   setMemory]   = useState(true)

  // Appearance
  const [theme, setTheme] = useState('light')
  const [density, setDensity] = useState('comfortable')

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const firstName = (user?.fullName || user?.username || 'User').split(' ')[0]
  const initial   = firstName.charAt(0).toUpperCase()

  return (
    <div style={{ padding: 28 }}>
      <div className="mb-7">
        <h2 className="text-2xl font-extrabold text-[#0B1E3F]">Settings</h2>
        <p className="text-sm text-[#7A90B3] mt-1">Manage your account and platform preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tab list */}
        <div className="lg:w-52 flex-shrink-0">
          <div className="bg-white rounded-2xl p-2" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            {TABS.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setActiveTab(id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 transition-all text-sm font-semibold"
                style={{
                  background: activeTab === id ? '#1E6FFF' : 'transparent',
                  color:      activeTab === id ? '#fff'    : '#7A90B3',
                }}>
                <Icon size={15} strokeWidth={2} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content panel */}
        <div className="flex-1 bg-white rounded-2xl p-6" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>

          {/* ── Profile ── */}
          {activeTab === 'profile' && (
            <>
              <Section title="Public Profile">
                <Field label="Avatar">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-extrabold"
                      style={{ background: 'linear-gradient(135deg,#1E6FFF,#0B50CC)' }}>
                      {initial}
                    </div>
                    <button className="px-4 py-2 rounded-xl text-sm font-semibold text-[#1E6FFF] border border-[#D8E4F5] hover:bg-[#F0F4FF] transition-all">
                      Change Photo
                    </button>
                  </div>
                </Field>
                <Field label="Full Name">
                  <TextInput value={fullName} onChange={setFullName} placeholder="Your full name" />
                </Field>
                <Field label="Email Address">
                  <TextInput value={email} onChange={setEmail} placeholder="you@example.com" />
                </Field>
                <Field label="Bio" hint="Shown on your profile">
                  <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFF] border border-[#E8F0FB] text-sm text-[#0B1E3F] placeholder-[#7A90B3] outline-none focus:border-[#1E6FFF] focus:bg-white transition-all resize-none" />
                </Field>
                <Field label="Timezone">
                  <Select value={timezone} onChange={setTimezone} options={[
                    { value: 'utc',   label: 'UTC+0 — London' },
                    { value: 'et',    label: 'UTC-5 — New York' },
                    { value: 'pt',    label: 'UTC-8 — Los Angeles' },
                    { value: 'ist',   label: 'UTC+5:30 — Mumbai' },
                    { value: 'jst',   label: 'UTC+9 — Tokyo' },
                  ]} />
                </Field>
              </Section>
            </>
          )}

          {/* ── Security ── */}
          {activeTab === 'security' && (
            <Section title="Password & Security">
              <Field label="Current Password">
                <TextInput value="" onChange={() => {}} type="password" placeholder="Enter current password" />
              </Field>
              <Field label="New Password">
                <TextInput value="" onChange={() => {}} type="password" placeholder="Min. 8 characters" />
              </Field>
              <Field label="Confirm Password">
                <TextInput value="" onChange={() => {}} type="password" placeholder="Repeat new password" />
              </Field>
              <Field label="Two-Factor Auth" hint="Adds extra security to your account">
                <button className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg,#22CC88,#16A34A)' }}
                  onClick={() => alert('2FA setup coming soon')}>
                  Enable 2FA
                </button>
              </Field>
              <Field label="Active Sessions" hint="Devices currently logged in">
                <div className="space-y-2">
                  {['Windows · Chrome · This device', 'iPhone · Safari · 2 days ago'].map((s, i) => (
                    <div key={i} className="flex items-center justify-between px-4 py-3 bg-[#F8FAFF] rounded-xl">
                      <span className="text-sm text-[#0B1E3F]">{s}</span>
                      {i !== 0 && <button className="text-xs font-semibold text-[#FF4D6A] hover:underline">Revoke</button>}
                    </div>
                  ))}
                </div>
              </Field>
            </Section>
          )}

          {/* ── Notifications ── */}
          {activeTab === 'notifications' && (
            <Section title="Notification Preferences">
              {[
                { key: 'email',  label: 'Email notifications',           hint: 'Receive updates via email'         },
                { key: 'push',   label: 'Push notifications',            hint: 'Browser push alerts'               },
                { key: 'weekly', label: 'Weekly digest',                 hint: 'Summary email every Monday'        },
                { key: 'errors', label: 'Agent error alerts',            hint: 'Immediately notify on agent errors' },
              ].map(({ key, label, hint }) => (
                <Field key={key} label={label} hint={hint}>
                  <Toggle checked={notifs[key]} onChange={v => setNotifs(p => ({ ...p, [key]: v }))} label={notifs[key] ? 'On' : 'Off'} />
                </Field>
              ))}
            </Section>
          )}

          {/* ── AI & Models ── */}
          {activeTab === 'ai' && (
            <Section title="AI Model Configuration">
              <Field label="Default Model" hint="Used when no model is specified">
                <Select value={model} onChange={setModel} options={[
                  { value: 'gpt4o',       label: 'GPT-4o (Recommended)' },
                  { value: 'gpt4t',       label: 'GPT-4 Turbo' },
                  { value: 'gpt4omini',   label: 'GPT-4o Mini (Fast)' },
                  { value: 'claude35',    label: 'Claude 3.5 Sonnet' },
                  { value: 'claude3h',    label: 'Claude 3 Haiku' },
                ]} />
              </Field>
              <Field label="Temperature" hint="Higher = more creative (0 – 1)">
                <div className="flex items-center gap-4">
                  <input type="range" min="0" max="1" step="0.1"
                    value={temp} onChange={e => setTemp(e.target.value)}
                    className="flex-1 accent-[#1E6FFF]" />
                  <span className="text-sm font-bold text-[#0B1E3F] w-8 text-right">{temp}</span>
                </div>
              </Field>
              <Field label="Max Tokens" hint="Per request limit">
                <Select value={maxTok} onChange={setMaxTok} options={[
                  { value: '1024', label: '1,024 tokens' },
                  { value: '2048', label: '2,048 tokens' },
                  { value: '4096', label: '4,096 tokens' },
                  { value: '8192', label: '8,192 tokens' },
                ]} />
              </Field>
              <Field label="Agent Memory" hint="Persist context between sessions">
                <Toggle checked={memory} onChange={setMemory} label={memory ? 'Enabled' : 'Disabled'} />
              </Field>
            </Section>
          )}

          {/* ── Appearance ── */}
          {activeTab === 'appearance' && (
            <Section title="Theme & Display">
              <Field label="Theme">
                <div className="flex gap-3">
                  {['light', 'dark', 'system'].map(t => (
                    <button key={t} onClick={() => setTheme(t)}
                      className="flex-1 py-3 rounded-xl text-sm font-semibold capitalize transition-all"
                      style={{
                        background: theme === t ? '#1E6FFF' : '#F0F4FF',
                        color:      theme === t ? '#fff'    : '#7A90B3',
                        border:     theme === t ? 'none'    : '1px solid #E8F0FB',
                      }}>
                      {t}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="Density">
                <div className="flex gap-3">
                  {['compact', 'comfortable', 'spacious'].map(d => (
                    <button key={d} onClick={() => setDensity(d)}
                      className="flex-1 py-3 rounded-xl text-sm font-semibold capitalize transition-all"
                      style={{
                        background: density === d ? '#1E6FFF' : '#F0F4FF',
                        color:      density === d ? '#fff'    : '#7A90B3',
                        border:     density === d ? 'none'    : '1px solid #E8F0FB',
                      }}>
                      {d}
                    </button>
                  ))}
                </div>
              </Field>
            </Section>
          )}

          {/* ── Privacy ── */}
          {activeTab === 'privacy' && (
            <Section title="Privacy & Data">
              {[
                { label: 'Share analytics data',       hint: 'Help improve AgentFlow AI'          },
                { label: 'Allow crash reports',        hint: 'Auto-send error reports'             },
                { label: 'Usage-based suggestions',    hint: 'Personalize tips based on activity'  },
              ].map(({ label, hint }) => (
                <Field key={label} label={label} hint={hint}>
                  <Toggle checked={true} onChange={() => {}} label="On" />
                </Field>
              ))}
              <Field label="Delete Account" hint="This action is permanent and irreversible">
                <button className="px-4 py-2 rounded-xl text-sm font-semibold text-[#FF4D6A] border border-[#FF4D6A]/30 hover:bg-[#FFF0F3] transition-all"
                  onClick={() => alert('Account deletion — contact support')}>
                  Delete My Account
                </button>
              </Field>
            </Section>
          )}

          {/* Save button */}
          <div className="flex items-center gap-3 pt-4 border-t border-[#F0F4FF]">
            <button onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-bold transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg,#1E6FFF,#0B50CC)' }}>
              <Save size={15} /> Save Changes
            </button>
            {saved && (
              <span className="text-sm font-semibold text-[#22CC88] animate-pulse">
                ✓ Saved successfully
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
