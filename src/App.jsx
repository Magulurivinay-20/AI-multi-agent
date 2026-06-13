import { useState, useEffect } from 'react'
import AuthCard from './components/AuthCard'
import MainDashboard from './components/dashboard/Dashboard'

// Default demo user
const initialUsers = [
  {
    username: 'demo@agentflow.ai',
    fullName: 'Demo User',
    dob: '1990-01-01',
    email: 'demo@agentflow.ai',
    mobile: '+1 (555) 000-0000',
    password: 'Demo1234!',
  },
]

export default function App() {
  // Load logged-in user from localStorage
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser')
    return savedUser ? JSON.parse(savedUser) : null
  })

  // Load registered users from localStorage
  const [userStore, setUserStore] = useState(() => {
    const savedUsers = localStorage.getItem('users')
    return savedUsers ? JSON.parse(savedUsers) : initialUsers
  })

  // Save users whenever changed
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(userStore))
  }, [userStore])

  // Login
  const handleLogin = (user) => {
    setCurrentUser(user)
    localStorage.setItem('currentUser', JSON.stringify(user))
  }

  // Signup
  const handleSignup = (newUser) => {
    const updatedUsers = [...userStore, newUser]

    setUserStore(updatedUsers)
    setCurrentUser(newUser)

    localStorage.setItem('users', JSON.stringify(updatedUsers))
    localStorage.setItem('currentUser', JSON.stringify(newUser))
  }

  // Logout
  const handleSignOut = () => {
    setCurrentUser(null)
    localStorage.removeItem('currentUser')
  }

  // Dashboard
  if (currentUser) {
    return (
      <MainDashboard
        user={currentUser}
        onSignOut={handleSignOut}
      />
    )
  }

  // Login / Signup Screen
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-4 py-8"
      style={{
        background:
          'linear-gradient(145deg, #0B1E3F 0%, #112060 55%, #0D2875 100%)',
      }}
    >
      {/* Background Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: '#1E6FFF' }}
        />

        <div
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl"
          style={{ background: '#0B50CC' }}
        />
      </div>

      <AuthCard
        onLogin={handleLogin}
        onSignup={handleSignup}
        userStore={userStore}
      />
    </div>
  )
}