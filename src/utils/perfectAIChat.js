// PERFECT AI Chat System - Professional & Intelligent
export class PerfectAIChat {
  constructor() {
    this.conversationHistory = {}
  }

  // Add message to history
  addToHistory(agentId, role, message) {
    if (!this.conversationHistory[agentId]) {
      this.conversationHistory[agentId] = []
    }
    this.conversationHistory[agentId].push({ role, message, timestamp: Date.now() })
  }

  // Get context from conversation
  getContext(agentId) {
    const messages = this.conversationHistory[agentId] || []
    return messages.slice(-3) // Last 3 messages for context
  }

  // RESEARCH AGENT - Professional & Detailed
  researchResponse(userMessage, agentId) {
    this.addToHistory(agentId, 'user', userMessage)
    const msg = userMessage.toLowerCase()
    const context = this.getContext(agentId)

    let response = ''

    // Detect intent and provide professional research
    if (msg.includes('ai') && msg.includes('trend')) {
      response = `🔍 **AI Trends Analysis (2026)**

**Emerging Technologies:**
• Large Language Models (LLMs) - Getting smaller, faster, and more efficient
• Multimodal AI - Processing text, images, audio, and video simultaneously
• Edge AI - Running models locally on devices for privacy
• Autonomous Agents - Self-managing AI systems making decisions independently

**Market Insights:**
• Industry growth: 28-35% YoY
• Investment surge in enterprise AI solutions
• Focus shifting from raw performance to efficiency and cost
• Regulatory frameworks becoming stricter

**What specific trend interests you?**`
    } 
    else if (msg.includes('market') || msg.includes('business')) {
      response = `📊 **Market Analysis Report**

**Current State:**
• Total addressable market: $500B+ and growing
• Key sectors: Enterprise software, healthcare, autonomous vehicles
• Early adopters gaining competitive advantage of 20-40%

**Investment Landscape:**
• Venture funding still strong despite economic headwinds
• Focus on profitable, practical AI solutions
• Government backing for AI research increasing

**Which sector would you like to explore?**`
    }
    else if (msg.includes('technology') || msg.includes('technique')) {
      response = `⚙️ **Technology Stack Analysis**

**Current Dominance:**
• Transformer architecture powers most modern systems
• GPU computing still essential for training
• Cloud infrastructure (AWS, Azure, GCP) leads deployment

**Emerging Approaches:**
• Mixture of Experts (MoE) - Better efficiency
• Retrieval-Augmented Generation (RAG) - More accurate responses
• Fine-tuning - Customizing models for specific tasks

**Interested in a specific technology?**`
    }
    else if (msg.includes('future') || msg.includes('predict')) {
      response = `🚀 **Future Predictions (2026-2030)**

**Near-term (6-12 months):**
• More affordable AI solutions
• Better integration with existing systems
• Improved safety and reliability

**Medium-term (1-2 years):**
• AI becomes mainstream in most industries
• New job categories emerge
• Ethical guidelines become standard

**Long-term (2-5 years):**
• AGI discussions become more serious
• Regulatory frameworks mature
• AI working alongside humans becomes normal

**Want to discuss any timeframe?**`
    }
    else {
      response = `📚 **Research Summary**

I analyzed your query and here are the key findings:

**Main Points:**
1. Growing adoption across industries
2. Multiple technological approaches available
3. Strong investment and interest from stakeholders
4. Regulatory landscape evolving

**Data Indicators:**
• Market trend: ↑ Positive (25-30% growth)
• Innovation rate: ↑ High (new solutions weekly)
• Competition: ↑ Increasing (more players entering)

**What specific area would you like to research deeper?**`
    }

    return response
  }

  // WRITER AGENT - Creative & Professional
  writerResponse(userMessage, agentId) {
    this.addToHistory(agentId, 'user', userMessage)
    const msg = userMessage.toLowerCase()

    let response = ''

    if (msg.includes('blog')) {
      response = `✍️ **Professional Blog Structure**

**Article Framework:**
\`\`\`
Title: [Compelling Hook]
Intro: [Problem statement + solution preview]

H2: Understanding the Challenge
- Explain the core issue
- Provide context and statistics
- Show relevance to readers

H2: Solution Overview
- Present 2-3 key solutions
- Compare approaches
- Highlight benefits

H2: Implementation Guide
- Step-by-step practical advice
- Real-world examples
- Common pitfalls to avoid

Conclusion: [Key takeaways + CTA]
\`\`\`

**Pro Tips:**
• Keep paragraphs to 2-3 sentences max
• Use active voice
• Include statistics and data
• End with clear call-to-action

**What topic would you like to write about?**`
    }
    else if (msg.includes('email')) {
      response = `📧 **Professional Email Template**

**Effective Structure:**

**Subject Line:**
[Action-oriented, specific, benefit-focused]

**Body:**
"Hi [Name],

I'm reaching out because [specific reason + their benefit].

**Key Benefits:**
• [Concrete benefit #1]
• [Concrete benefit #2]
• [Concrete benefit #3]

I'd love to discuss how we can [specific outcome].

Best regards,
[Your Name]"

**Dos & Don'ts:**
✓ Keep it under 100 words
✓ One clear ask
✓ Professional but friendly
✗ Avoid jargon
✗ Don't make it too salesy

**Ready to draft your email?**`
    }
    else if (msg.includes('copy') || msg.includes('marketing')) {
      response = `🎯 **Compelling Marketing Copy**

**Formula that Works:**

1. **Attention Grab** - Problem statement
2. **Agitate** - Show pain/cost
3. **Solution** - Your offering
4. **Proof** - Social proof/data
5. **CTA** - Clear next step

**Example:**
"Tired of slow development cycles?
Most teams lose 40% productivity to bottlenecks.
Our solution cuts deployment time by 70%.
Join 1000+ companies using our platform.
Start free today →"

**Writing Best Practices:**
• Use power words: Transform, Unlock, Accelerate
• Numbers outperform general claims
• Specific beats vague
• Benefits over features

**What are you promoting?**`
    }
    else if (msg.includes('story') || msg.includes('creative')) {
      response = `🎭 **Story Writing Framework**

**Classic Structure (Hero's Journey):**
1. **Setup** - Introduce character & world (20%)
2. **Inciting Incident** - Problem emerges (10%)
3. **Rising Action** - Attempts & obstacles (40%)
4. **Climax** - Make-or-break moment (15%)
5. **Resolution** - New normal (15%)

**Engagement Techniques:**
• Start in medias res (middle of action)
• Show, don't tell
• Build tension through obstacles
• Make readers care about outcome

**Example Hook:**
"She had 24 hours to fix the system before everything crashed..."

**What kind of story interests you?**`
    }
    else {
      response = `✨ **Content Creation Services**

**I specialize in:**
• **Blog Posts** - SEO-optimized, engaging articles
• **Sales Copy** - Persuasive marketing content
• **Emails** - High-converting campaigns
• **Stories** - Engaging narratives
• **Technical Docs** - Clear, professional documentation
• **Social Media** - Platform-specific content

**My Writing Process:**
1. Understand your audience
2. Research topic thoroughly
3. Create compelling structure
4. Write with clarity and precision
5. Optimize for engagement

**What content do you need created?**`
    }

    return response
  }

  // CODER AGENT - Expert & Comprehensive
  coderResponse(userMessage, agentId) {
    this.addToHistory(agentId, 'user', userMessage)
    const msg = userMessage.toLowerCase()

    let response = ''

    if (msg.includes('javascript') || msg.includes('js')) {
      response = `💻 **JavaScript Mastery Guide**

**Modern ES6+ Essentials:**
\`\`\`javascript
// Arrow functions - Concise & clean
const greet = (name) => \`Hello, \${name}!\`;

// Destructuring - Extract values elegantly
const { id, name } = user;
const [first, ...rest] = array;

// Spread operator - Merge & clone easily
const newArray = [...array, newItem];
const merged = { ...obj1, ...obj2 };

// Template literals - Dynamic strings
const msg = \`User \${id} is \${status}\`;

// Async/await - Handle promises cleanly
const data = await fetch(url).then(r => r.json());
\`\`\`

**Best Practices:**
✓ Use const by default, let when needed
✓ Arrow functions for most cases
✓ Destructure for cleaner code
✓ Async/await over .then()

**Common Mistakes to Avoid:**
✗ Using var instead of const/let
✗ Nested callbacks (callback hell)
✗ Not handling errors in async code
✗ Mutating data directly

**Need help with a specific concept?**`
    }
    else if (msg.includes('react')) {
      response = `⚛️ **React Functional Components**

**Complete Counter Example:**
\`\`\`jsx
import { useState, useEffect, useCallback } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Effects run after render
  useEffect(() => {
    console.log('Component mounted');
    return () => console.log('Component unmounting');
  }, []); // Run once

  useEffect(() => {
    console.log('Count changed:', count);
  }, [count]); // Run when count changes

  // Memoized callback - doesn't recreate
  const handleIncrement = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Count: {count}</h1>
      <button onClick={handleIncrement}>+</button>
    </div>
  );
}
\`\`\`

**Key Concepts:**
• **useState** - Manage component state
• **useEffect** - Side effects (API calls, timers)
• **useCallback** - Optimize performance
• **Key prop** - Essential for lists
• **Dependency array** - Controls when code runs

**React Patterns:**
✓ Lift state up when needed
✓ Use composition over inheritance
✓ Memoize expensive components
✓ Extract custom hooks for reusability

**What React issue are you facing?**`
    }
    else if (msg.includes('api') || msg.includes('fetch')) {
      response = `🔌 **Professional API Integration**

**Complete Fetch with Error Handling:**
\`\`\`javascript
async function fetchUserData(userId) {
  try {
    // Validate input
    if (!userId) throw new Error('User ID required');

    // Make request with timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(\`/api/users/\${userId}\`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${token}\`
      },
      signal: controller.signal
    });

    clearTimeout(timeout);

    // Check status
    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Request timed out');
    } else {
      console.error('Fetch failed:', error.message);
    }
    throw error;
  }
}
\`\`\`

**Professional Practices:**
✓ Always include error handling
✓ Set request timeouts
✓ Validate inputs
✓ Use proper HTTP methods
✓ Include auth headers when needed
✓ Handle different status codes

**Security Tips:**
✓ Never expose API keys in frontend
✓ Use environment variables
✓ Implement rate limiting
✓ Validate all data on server

**Need help with a specific API?**`
    }
    else if (msg.includes('database') || msg.includes('sql')) {
      response = `🗄️ **Database Query Guide**

**SQL Best Practices:**
\`\`\`sql
-- GOOD: Use parameters (prevent SQL injection)
SELECT * FROM users WHERE id = ? AND status = ?

-- BAD: String concatenation (vulnerable)
SELECT * FROM users WHERE id = '" + id + "'

-- Efficient: Use indexes
SELECT * FROM users WHERE email = ? -- email should be indexed

-- Filter early: Reduce data in joins
SELECT u.name, o.total
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE u.status = 'active' AND o.date > NOW() - INTERVAL 30 DAY

-- Use aggregates properly
SELECT user_id, COUNT(*) as order_count, SUM(total) as revenue
FROM orders
GROUP BY user_id
HAVING COUNT(*) > 5
ORDER BY revenue DESC
\`\`\`

**Performance Tips:**
✓ Index frequently queried columns
✓ Use EXPLAIN to analyze queries
✓ Avoid SELECT * (specify needed columns)
✓ Cache results when appropriate
✓ Normalize database schema

**Common Problems & Solutions:**
✗ N+1 queries → Use joins or batch queries
✗ Missing indexes → Analyze slow queries
✗ Large result sets → Implement pagination
✗ Locking issues → Use transactions properly

**What database challenge do you have?**`
    }
    else if (msg.includes('error') || msg.includes('debug')) {
      response = `🐛 **Professional Debugging Strategy**

**5-Step Debug Process:**

**1. Understand the Error**
- Read the full error message
- Note the line number and function
- Check if it's consistent or intermittent

**2. Reproduce the Issue**
- Create minimal test case
- Document exact steps
- Check if it's environment-specific

**3. Investigate Systematically**
\`\`\`javascript
// Add strategic logging
console.log('Before operation:', variable);
console.log('Type check:', typeof variable);
console.error('Stack trace:', new Error().stack);

// Use debugger
debugger; // Execution pauses here in devtools
\`\`\`

**4. Isolate the Problem**
- Comment out code sections
- Test individual functions
- Use binary search approach

**5. Verify the Fix**
- Test with edge cases
- Check for side effects
- Add unit test to prevent regression

**DevTools Tips:**
✓ Use breakpoints with conditions
✓ Watch expressions for variable tracking
✓ Check Network tab for API issues
✓ Profile performance bottlenecks
✓ Use console API effectively

**Share your error and I'll help fix it!**`
    }
    else {
      response = `💡 **Expert Coding Assistance**

**I help with:**
• **Architecture** - System design, patterns, best practices
• **JavaScript/ES6+** - Modern syntax and techniques
• **React** - Components, hooks, state management
• **APIs** - REST, GraphQL, authentication
• **Databases** - SQL, queries, optimization
• **Debugging** - Finding and fixing issues
• **Performance** - Optimization techniques
• **Testing** - Unit, integration, E2E tests

**How I Work:**
1. Understand your problem deeply
2. Show complete, working examples
3. Explain reasoning and best practices
4. Suggest optimizations
5. Guide you through implementation

**What coding challenge can I solve?**`
    }

    return response
  }

  // PLANNER AGENT - Strategic & Organized
  plannerResponse(userMessage, agentId) {
    this.addToHistory(agentId, 'user', userMessage)
    const msg = userMessage.toLowerCase()

    let response = ''

    if (msg.includes('project')) {
      response = `📋 **Professional Project Planning**

**Structured Project Timeline:**

**Phase 1: Discovery (Week 1)**
- Define goals and deliverables
- Identify stakeholders
- Set success metrics
- Create initial budget estimate

**Phase 2: Planning (Week 2)**
- Create detailed task breakdown
- Assign resources
- Identify dependencies
- Establish milestones

**Phase 3: Execution (Weeks 3-6)**
- Daily standups (15 min)
- Track progress
- Manage risks
- Communicate status

**Phase 4: Testing (Week 7)**
- Quality assurance
- Bug fixes
- Performance optimization
- Security review

**Phase 5: Launch (Week 8)**
- Final deployment
- User training
- Monitoring setup
- Documentation

**Risk Management:**
• Identify risks early
• Create mitigation plans
• Build in 20% time buffer
• Regular check-ins with team

**What type of project are you planning?**`
    }
    else if (msg.includes('workflow')) {
      response = `⚙️ **Workflow Optimization Strategy**

**Current State Analysis:**
1. Map every step in current process
2. Measure cycle time per step
3. Identify bottlenecks (what slows you down)
4. Calculate costs of delays
5. Find automation opportunities

**Optimization Process:**

**Step 1: Eliminate**
- Remove unnecessary steps
- Cut redundant approvals
- Streamline handoffs

**Step 2: Automate**
- Email notifications
- Data transfers
- Repetitive calculations
- Report generation

**Step 3: Simplify**
- Reduce complexity
- Standardize formats
- Create templates

**Step 4: Measure**
- Track new metrics
- Compare before/after
- Calculate ROI
- Plan continuous improvement

**Expected Improvements:**
✓ 30-50% time reduction
✓ Fewer errors (automation advantage)
✓ Better consistency
✓ Higher team satisfaction

**Which workflow needs optimization?**`
    }
    else if (msg.includes('schedule') || msg.includes('timeline')) {
      response = `📅 **Smart Scheduling Framework**

**Gantt Chart Structure:**

\`\`\`
Task 1: Design (5 days)     ████░░░░░░░░░░░░░
Task 2: Development (10)    ░░░░░███████░░░░░
Task 3: Testing (5 days)    ░░░░░░░░░░████░░░
Task 4: Deploy (2 days)     ░░░░░░░░░░░░░░██

Critical Path = Design → Dev → Testing → Deploy (22 days)
\`\`\`

**Scheduling Best Practices:**
• Identify critical path (longest sequence)
• Use parallel tasks when possible
• Add 20% buffer for unknowns
• Set weekly milestones
• Plan reviews every Friday

**Risk Mitigation:**
✓ Identify dependencies early
✓ Plan for dependencies
✓ Have backup resources
✓ Monitor progress daily
✓ Adjust quickly when needed

**Common Pitfalls:**
✗ Underestimating task duration
✗ No buffer time
✗ Ignoring dependencies
✗ No contingency plan
✗ Poor communication

**How many tasks do you need to schedule?**`
    }
    else if (msg.includes('resource') || msg.includes('team')) {
      response = `👥 **Resource Allocation Strategy**

**Team Structure for Success:**

**Essential Roles:**
• **Project Lead** - Overall coordination
• **Tech Lead** - Technical decisions
• **Developers** - Core implementation
• **QA Engineer** - Quality assurance
• **DevOps** - Infrastructure & deployment

**Capacity Planning:**
\`\`\`
Total Effort = 100 days
Available Team = 5 people
Timeline = 4 weeks
Capacity per person = 20 days/week
Total capacity = 100 days/week ✓ Feasible
\`\`\`

**Skills Matrix:**
- List required skills
- Map to team members
- Identify gaps
- Plan training or hiring

**Resource Tips:**
✓ Don't overload individuals (80% utilization max)
✓ Cross-train for flexibility
✓ Rotate responsibilities
✓ Document tribal knowledge
✓ Plan for absences

**Conflict Resolution:**
• Clear priorities
• Resource sharing agreements
• Escalation process
• Regular sync meetings

**What's your resource situation?**`
    }
    else {
      response = `🎯 **Strategic Planning Services**

**I specialize in:**
• **Project Planning** - Roadmap, timeline, milestones
• **Workflow Design** - Process optimization, automation
• **Resource Management** - Team allocation, capacity planning
• **Risk Management** - Identify, mitigate, monitor
• **Scheduling** - Realistic timelines, critical path
• **Stakeholder Communication** - Status, updates, expectations

**Planning Process:**
1. Understand goals and constraints
2. Break down into phases
3. Identify risks and dependencies
4. Allocate resources smartly
5. Create monitoring system
6. Build flexibility for changes

**Success Metrics:**
✓ On-time delivery
✓ Budget adherence
✓ Team satisfaction
✓ Quality standards
✓ Stakeholder alignment

**What do you need to plan?**`
    }

    return response
  }

  // Main response generator
  generateResponse(userMessage, agentId) {
    const agent = agentId.toLowerCase()

    switch (agent) {
      case 'research':
        return this.researchResponse(userMessage, agentId)
      case 'writer':
        return this.writerResponse(userMessage, agentId)
      case 'coder':
        return this.coderResponse(userMessage, agentId)
      case 'planner':
        return this.plannerResponse(userMessage, agentId)
      default:
        return 'How can I assist you today?'
    }
  }
}

// Export singleton instance
export const perfectChat = new PerfectAIChat()
