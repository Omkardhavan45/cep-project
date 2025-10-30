import React from 'react'
import { motion } from 'framer-motion'
import { Gamepad2, Brain, Shapes } from 'lucide-react'

const games = [
  {
    title: 'Math Quiz',
    desc: 'Test your math skills with exciting questions!',
    icon: <Gamepad2 className="text-blue-600" size={36} />,
    color: 'from-blue-100 via-blue-200 to-blue-300'
  },
  {
    title: 'Geometry Puzzle',
    desc: 'Identify shapes and solve geometry challenges!',
    icon: <Shapes className="text-green-600" size={36} />,
    color: 'from-green-100 via-green-200 to-green-300'
  },
  {
    title: 'Memory Challenge',
    desc: 'Sharpen your brain by matching numbers and patterns!',
    icon: <Brain className="text-pink-600" size={36} />,
    color: 'from-pink-100 via-pink-200 to-pink-300'
  }
]

export default function Games() {
  return (
    <div className="min-h-screen py-10 px-6 bg-gradient-to-br from-yellow-50 via-blue-50 to-green-50">
      <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-10">🎮 Fun Learning Games</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {games.map((g, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className={`rounded-2xl shadow-lg bg-gradient-to-br ${g.color} p-6 flex flex-col items-center text-center transform transition`}
          >
            <div className="mb-4">{g.icon}</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{g.title}</h2>
            <p className="text-gray-600 mb-4 text-sm">{g.desc}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => alert('🎯 Game coming soon!')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Play Now
            </motion.button>
          </motion.div>
        ))}
      </div>

      <p className="text-center mt-12 text-gray-600">
        🚧 More interactive games are coming soon — stay tuned!
      </p>
    </div>
  )
}
