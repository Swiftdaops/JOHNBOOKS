import axios from "axios"

function ensureCid() {
  try {
    let cid = localStorage.getItem('cid')
    if (!cid) {
      // prefer modern crypto API when available
      if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        cid = crypto.randomUUID()
      } else {
        cid = 'cid-' + Math.random().toString(36).slice(2, 10)
      }
      localStorage.setItem('cid', cid)
    }
    return cid
  } catch (e) {
    return null
  }
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://johnbooksbackend.onrender.com",
  withCredentials: true,
})

// attach cid header automatically for visitor-based actions (likes)
api.interceptors.request.use((config) => {
  const cid = ensureCid()
  if (cid) {
    config.headers = config.headers || {}
    if (!config.headers['x-cid']) config.headers['x-cid'] = cid
  }
  return config
})
