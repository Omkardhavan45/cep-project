import React, { useEffect, useState } from 'react'
import axios from '../api/axios'
import LessonCard from '../components/LessonCard'
import { motion } from 'framer-motion'

export default function Learn() {
  const [lessons, setLessons] = useState([])
  const [filtered, setFiltered] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/lessons')
      .then(res => {
        setLessons(res.data)
        setFiltered(res.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase()
    setSearch(term)
    const filteredLessons = lessons.filter(l =>
      l.title.toLowerCase().includes(term) ||
      l.description.toLowerCase().includes(term)
    )
    setFiltered(filteredLessons)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-10 px-6">
      <motion.h2
        className="text-4xl font-extrabold text-center text-blue-700 mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        📚 Explore Lessons
      </motion.h2>

      {/* Search Bar */}
      <motion.div
        className="max-w-md mx-auto mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="🔍 Search lessons by topic..."
          className="w-full px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </motion.div>

      {/* Loading Animation */}
      {loading ? (
        <div className="flex justify-center items-center h-40 text-lg text-gray-600 animate-pulse">
          Loading lessons...
        </div>
      ) : filtered.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          {filtered.map((lesson, index) => (
            <motion.div
              key={lesson._id || index}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <LessonCard lesson={lesson} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-center text-gray-500 mt-12 text-lg">No lessons found.</p>
      )}
    </div>
  )
}
