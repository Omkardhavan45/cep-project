import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Learn from './pages/Learn'
import Play from './pages/Play'
import Scholarships from './pages/Scholarships'
import Games from './pages/Games'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/*" element={<ProtectedArea />} />
      </Routes>
    </div>
  )
}

function ProtectedArea() {
  return (
    <div>
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/lessons" element={<ProtectedRoute><Learn /></ProtectedRoute>} />
          <Route path="/quiz" element={<ProtectedRoute><Play /></ProtectedRoute>} />
          <Route path="/scholarships" element={<ProtectedRoute><Scholarships /></ProtectedRoute>} />
          <Route path="/games" element={<ProtectedRoute><Games /></ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  )
}
