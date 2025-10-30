import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../api/axios'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    await axios.post('/auth/logout')
    navigate('/login')
  }

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg px-6 py-3 sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* Logo / Brand */}
        <div className="text-2xl font-extrabold tracking-wide cursor-pointer" onClick={() => navigate('/home')}>
          CEP
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center font-medium">
          <Link to="/home" className="hover:text-yellow-300 transition">Home</Link>
          <Link to="/lessons" className="hover:text-yellow-300 transition">Lessons</Link>
          <Link to="/quiz" className="hover:text-yellow-300 transition">Quiz</Link>
          <Link to="/scholarships" className="hover:text-yellow-300 transition">Scholarships</Link>
          <Link to="/games" className="hover:text-yellow-300 transition">Games</Link>
          <button 
            onClick={handleLogout} 
            className="ml-4 bg-white text-red-600 px-4 py-1 rounded-full hover:bg-red-600 hover:text-white transition"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center bg-white text-gray-800 mt-3 rounded-lg shadow-md py-3 space-y-3 animate-slideDown">
          <Link to="/home" className="hover:text-blue-600" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/lessons" className="hover:text-blue-600" onClick={() => setMenuOpen(false)}>Lessons</Link>
          <Link to="/quiz" className="hover:text-blue-600" onClick={() => setMenuOpen(false)}>Quiz</Link>
          <Link to="/scholarships" className="hover:text-blue-600" onClick={() => setMenuOpen(false)}>Scholarships</Link>
          <Link to="/games" className="hover:text-blue-600" onClick={() => setMenuOpen(false)}>Games</Link>
          <button 
            onClick={() => { handleLogout(); setMenuOpen(false); }} 
            className="text-red-600 border border-red-600 px-4 py-1 rounded-full hover:bg-red-600 hover:text-white transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  )
}
