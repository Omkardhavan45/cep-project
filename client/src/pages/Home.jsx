// import React from 'react'
// export default function Home() {
//   return (
//     <div className="max-w-3xl mx-auto text-center mt-8">
//       <h1 className="text-4xl font-bold mb-4">Welcome to CEP</h1>
//       <p className="mb-4">Interactive, gamified learning for Grade 5 — lessons, quizzes, scholarships and games.</p>
//     </div>
//   )
// }
import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 text-center px-4">
      {/* Hero Section */}
      <motion.h1
        className="text-5xl md:text-6xl font-extrabold text-blue-700 mb-4 drop-shadow-lg"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to <span className="text-purple-600">CEP</span>
      </motion.h1>

      <motion.p
        className="text-lg text-gray-700 max-w-2xl mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        🎯 Interactive and gamified learning for <strong>Grade 5 students</strong> —
        explore lessons, take quizzes, and discover scholarship opportunities!
      </motion.p>

      {/* Action Buttons */}
      <motion.div
        className="flex flex-wrap gap-4 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        <button
          onClick={() => navigate('/lessons')}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 hover:scale-105 transition-transform"
        >
          📚 Explore Lessons
        </button>
        <button
          onClick={() => navigate('/quiz')}
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow-md hover:bg-green-700 hover:scale-105 transition-transform"
        >
          🧩 Play Quiz
        </button>
        <button
          onClick={() => navigate('/scholarships')}
          className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl shadow-md hover:bg-purple-700 hover:scale-105 transition-transform"
        >
          🎓 Scholarships
        </button>
      </motion.div>

      {/* Fun Animation or Emoji Section */}
      <motion.div
        className="mt-12 text-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        🌟 Learn • Play • Grow • Achieve 🌟
      </motion.div>
    </div>
  )
}
