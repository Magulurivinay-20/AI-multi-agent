import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Paperclip, Mic, RefreshCw, Sparkles } from 'lucide-react'
import { perfectChat } from '../../../utils/perfectAIChat'
import API_BASE from '../../../utils/api'


const AGENTS = [
  { id: 'research', name: 'ResearchAgent', color: '#1E6FFF', initial: 'R' },
  { id: 'writer',   name: 'WriterAgent',   color: '#22CC88', initial: 'W' },
  { id: 'planner',  name: 'PlannerAgent',  color: '#8B5CF6', initial: 'P' },
  { id: 'coder',    name: 'CoderAgent',    color: '#FF944D', initial: 'C' },
]

const CANNED = {
  research: [
    "Sure! I can research that topic. What specific aspects are you most interested in?",
    "I found several relevant sources. Here's a summary of the key findings...",
    "Based on my research, the main insights are: 1) Market growth is at 23% YoY, 2) Key players include...",
  ],
  writer: [
    "Great idea! I can draft that for you. What tone and length do you prefer?",
    'Here\'s a draft introduction: "In today\'s rapidly evolving landscape..."',
    "I've refined the content for clarity and impact. Would you like me to adjust the style?",
  ],
  planner: [
    "Let me break that down into actionable steps...",
    "Here's a proposed plan: Phase 1 (Research), Phase 2 (Draft), Phase 3 (Review).",
    "I've mapped the dependencies. The critical path runs through tasks 2 and 4.",
  ],
  coder: [
    "I can help with that code. What language and framework are you using?",
    "```js\nconst result = data.filter(item => item.active).map(item => item.value);\n```",
    "Found the issue — there was an off-by-one error in the loop condition. Fixed.",
  ],
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0,1,2].map(i => (
        <div key={i} className="w-2 h-2 rounded-full bg-[#D8E4F5]"
          style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
      ))}
      <style>{`@keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }`}</style>
    </div>
  )
}

export default function ChatPage({ user }) {
  const [activeAgent, setActiveAgent] = useState(AGENTS[0])
  const [messages, setMessages] = useState({
    research: [{ id: 1, role: 'agent', text: "Hi! I'm ResearchAgent. Ask me to research any topic and I'll find insights for you.", time: 'now' }],
    writer:   [{ id: 1, role: 'agent', text: "Hello! I'm WriterAgent. I can write articles, blogs, emails, and more.", time: 'now' }],
    planner:  [{ id: 1, role: 'agent', text: "Hey! I'm PlannerAgent. I can help you plan projects and break down complex tasks.", time: 'now' }],
    coder:    [{ id: 1, role: 'agent', text: "Hi! I'm CoderAgent. Share code or describe what you need and I'll help debug or build.", time: 'now' }],
  })
  const [input, setInput]   = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)
  const inputRef  = useRef(null)

  useEffect(() => {
  loadMessages()
}, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const now = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  const loadMessages = () => {
  fetch(`${API_BASE}/api/chat/${activeAgent.id}`)
    .then(res => res.json())
    .then(data => {

      const dbMessages = data.map(msg => ({
        id: msg.id,
        role: msg.sender === "user" ? "user" : "agent",
        text: msg.message,
        time: "saved"
      }))

      setMessages(prev => ({
        ...prev,
        [activeAgent.id]: dbMessages || []
      }))
    })
};
useEffect(() => {
  loadMessages()
}, [activeAgent])


  const sendMessage = () => {
    if (!input.trim()) return
    const userMsg = { id: Date.now(), role: 'user', text: input.trim(), time: now() }

    // Save user message to database
    fetch(`${API_BASE}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sender: "user",
        message: userMsg.text,
        agent: activeAgent.id
      })
    }).catch(err => console.error("Failed to save user message:", err))

    // Update local UI
    setMessages(prev => ({ ...prev, [activeAgent.id]: [...(prev[activeAgent.id] || []), userMsg] }))
    setInput('')
    setTyping(true)

    // Try to get response from Gemini API
    fetch(`${API_BASE}/api/ai/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        agent: activeAgent.id,
        message: userMsg.text
      })
    })
      .then(res => res.json())
      .then(data => {
        // Check if API returned a valid Gemini response
        let reply = null
        
        if (data?.error) {
          // API key not configured - use perfect AI response generator
          console.log("Using Perfect AI response (Gemini API not configured)")
          reply = perfectChat.generateResponse(userMsg.text, activeAgent.id)
        } else if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
          // Valid Gemini response
          reply = data.candidates[0].content.parts[0].text
        } else {
          // Unexpected response format - use perfect AI response generator
          console.log("Unexpected API response format, using Perfect AI")
          reply = perfectChat.generateResponse(userMsg.text, activeAgent.id)
        }

        // Save agent response to database
        fetch(`${API_BASE}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sender: "agent",
            message: reply,
            agent: activeAgent.id
          })
        }).catch(err => console.error("Failed to save agent message:", err))

        setTyping(false)
        setMessages(prev => ({
          ...prev,
          [activeAgent.id]: [
            ...(prev[activeAgent.id] || []),
            {
              id: Date.now() + 1,
              role: "agent",
              text: reply,
              time: now()
            }
          ]
        }))
      })
      .catch(err => {
        console.error("Chat error:", err)
        setTyping(false)

        const fallbackReply = perfectChat.generateResponse(userMsg.text, activeAgent.id)

        // Save error response to database
        fetch(`${API_BASE}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sender: "agent",
            message: fallbackReply,
            agent: activeAgent.id
          })
        }).catch(err => console.error("Failed to save fallback message:", err))

        setMessages(prev => ({
          ...prev,
          [activeAgent.id]: [
            ...(prev[activeAgent.id] || []),
            {
              id: Date.now() + 1,
              role: "agent",
              text: fallbackReply,
              time: now()
            }
          ]
        }))
      })
  }

  const msgs = messages[activeAgent.id] || []
  const firstName = (user?.fullName || user?.username || 'User').split(' ')[0]

  
  return (
    <div style={{ height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>
      {/* Agent selector tabs */}
      <div className="flex items-center gap-2 px-6 py-3 bg-white border-b border-[#E8F0FB] overflow-x-auto flex-shrink-0">
        {AGENTS.map(agent => (
          <button key={agent.id} onClick={() => setActiveAgent(agent)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all flex-shrink-0"
            style={{
              background: activeAgent.id === agent.id ? agent.color : '#F0F4FF',
              color:      activeAgent.id === agent.id ? '#fff'       : '#7A90B3',
            }}>
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
              style={{ background: activeAgent.id === agent.id ? 'rgba(255,255,255,0.3)' : agent.color, color: '#fff' }}>
              {agent.initial}
            </div>
            {agent.name}
          </button>
        ))}
        <button onClick={() => setMessages(prev => ({ ...prev, [activeAgent.id]: [{ id: 1, role: 'agent', text: `Fresh start with ${activeAgent.name}!`, time: now() }] }))}
          className="ml-auto flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#7A90B3] hover:bg-[#F0F4FF] transition-all flex-shrink-0">
          <RefreshCw size={13} /> Clear
        </button>
      </div>

<div className="flex gap-2 p-4 bg-white border-b">
  {AGENTS.map(agent => (
    <button
      key={agent.id}
      onClick={() => setActiveAgent(agent)}
      style={{
        padding: "8px 12px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        background:
          activeAgent.id === agent.id
            ? agent.color
            : "#E5E7EB",
        color:
          activeAgent.id === agent.id
            ? "#fff"
            : "#111"
      }}
    >
      {agent.name}
    </button>
  ))}
</div>


      {/* Chat body */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4" style={{ background: '#F8FAFF' }}>
        {msgs.map(msg => (
          <div key={msg.id} className={`flex items-end gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mb-1"
              style={{
                background: msg.role === 'agent'
                  ? activeAgent.color
                  : 'linear-gradient(135deg,#1E6FFF,#0B50CC)',
              }}>
              {msg.role === 'agent' ? activeAgent.initial : firstName.charAt(0).toUpperCase()}
            </div>

            {/* Bubble */}
            <div className={`max-w-[70%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
              <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'text-white rounded-br-md'
                  : 'text-[#0B1E3F] rounded-bl-md'
              }`}
                style={{
                  background: msg.role === 'user'
                    ? 'linear-gradient(135deg,#1E6FFF,#0B50CC)'
                    : '#fff',
                  boxShadow: msg.role === 'agent' ? '0 2px 12px rgba(0,0,0,0.06)' : undefined,
                  whiteSpace: 'pre-wrap',
                  fontFamily: msg.text.includes('```') ? 'monospace' : 'inherit',
                }}>
                {msg.text.replace(/```[a-z]*\n?/, '').replace(/```/, '')}
              </div>
              <span className="text-[10px] text-[#7A90B3] px-1">{msg.time}</span>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {typing && (
          <div className="flex items-end gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ background: activeAgent.color }}>{activeAgent.initial}</div>
            <div className="bg-white rounded-2xl rounded-bl-md shadow-sm">
              <TypingDots />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="px-6 py-4 bg-white border-t border-[#E8F0FB] flex-shrink-0">
        <div className="flex items-center gap-3 bg-[#F0F4FF] rounded-2xl px-4 py-3"
          style={{ border: '1.5px solid #E8F0FB' }}>
          <Sparkles size={16} className="text-[#7A90B3] flex-shrink-0" />
          <input ref={inputRef} value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }}
            placeholder={`Message ${activeAgent.name}...`}
            className="flex-1 bg-transparent outline-none text-sm text-[#0B1E3F] placeholder-[#7A90B3]"
          />
          <div className="flex items-center gap-2">
            <button className="text-[#7A90B3] hover:text-[#1E6FFF] transition-colors">
              <Paperclip size={16} />
            </button>
            <button className="text-[#7A90B3] hover:text-[#1E6FFF] transition-colors">
              <Mic size={16} />
            </button>
            <button onClick={sendMessage} disabled={!input.trim()}
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-all disabled:opacity-40"
              style={{ background: input.trim() ? '#1E6FFF' : '#D8E4F5' }}>
              <Send size={14} className="text-white" strokeWidth={2.5} />
            </button>
          </div>
        </div>
        <p className="text-[10px] text-[#7A90B3] text-center mt-2">
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  )
}
