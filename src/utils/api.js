// Central API base URL
// In production: set VITE_API_URL to your deployed backend URL (e.g., https://your-api.onrender.com)
// In development: falls back to localhost:9090
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:9090'

export default API_BASE
