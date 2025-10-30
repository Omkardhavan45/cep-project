import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import axios from '../api/axios'
export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true)
  const [authed, setAuthed] = useState(false)
  useEffect(() => {
    let mounted = true
    axios.get('/api/user/profile').then(res => {
      if (!mounted) return
      setAuthed(true)
    }).catch(err => {
      if (!mounted) return
      setAuthed(false)
    }).finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [])
  if (loading) return <div>Loading...</div>
  if (!authed) return <Navigate to="/login" replace />
  return children
}
