// Smart response generator - Simple and concise
export const generateSmartResponse = (userMessage, agent) => {
  const message = userMessage.toLowerCase()
  
  // Research Agent - Simple responses
  if (agent === 'research') {
    if (message.includes('trend')) {
      return `Current trends: AI growth at 25-30% YoY, multimodal systems, edge AI, and automation increasing. What specific area?`
    }
    if (message.includes('market')) {
      return `AI market: $500B+, growing fast. Main players: OpenAI, Google, Anthropic. Huge opportunities in enterprise automation.`
    }
    if (message.includes('technology')) {
      return `Top tech: Transformers, LLMs, RAG systems. GPUs power everything. PyTorch and TensorFlow dominate. Need details on any?`
    }
    return `Found relevant information on your topic. The key insights show positive growth. What specifically interests you?`
  }

  // Writer Agent - Simple responses
  if (agent === 'writer') {
    if (message.includes('blog') || message.includes('article')) {
      return `I can write engaging blog posts, articles, and content for you. What topic and tone would you prefer?`
    }
    if (message.includes('email')) {
      return `Need a professional email? I can write sales pitches, follow-ups, or formal letters. What's the purpose?`
    }
    if (message.includes('story')) {
      return `I can write short stories, narratives, or creative content. What genre or theme do you have in mind?`
    }
    return `I write blogs, articles, emails, stories, and more. What content do you need?`
  }

  // Coder Agent - Simple, SHORT code
  if (agent === 'coder') {
    if (message.includes('javascript') || message.includes('js')) {
      return `// Simple JS\nconst nums = [1, 2, 3, 4];\nconst doubled = nums.map(x => x * 2);\nconsole.log(doubled); // [2, 4, 6, 8]`
    }
    if (message.includes('react')) {
      return `// React Hook\nconst [count, setCount] = useState(0);\n\nreturn <button onClick={() => setCount(count + 1)}>{count}</button>;`
    }
    if (message.includes('api') || message.includes('fetch')) {
      return `// Fetch data\nconst data = await fetch('/api/data').then(r => r.json());\nconsole.log(data);`
    }
    if (message.includes('error') || message.includes('debug')) {
      return `Check console for errors. Use console.log() to trace values. Break down your code into smaller parts to isolate the issue.`
    }
    if (message.includes('html') || message.includes('css')) {
      return `<button style={{padding: '10px', background: '#1E6FFF', color: 'white'}}>Click me</button>`
    }
    return `Need code help? Ask about JavaScript, React, APIs, or debugging. Keep it simple!`
  }

  // Planner Agent - Simple responses
  if (agent === 'planner') {
    if (message.includes('project')) {
      return `Break your project into phases: Planning → Development → Testing → Launch. Each phase takes 1-3 weeks typically.`
    }
    if (message.includes('workflow')) {
      return `Step 1: Map your process. Step 2: Find bottlenecks. Step 3: Automate. Step 4: Measure results. Simple!`
    }
    if (message.includes('schedule')) {
      return `Set milestones weekly. Identify critical tasks. Add 20% buffer time. Track progress daily.`
    }
    return `Need to plan a project, workflow, or timeline? Tell me what you're working on!`
  }

  // Default
  return `Got it! I'm here to help. Can you give me more details about what you need?`
}

