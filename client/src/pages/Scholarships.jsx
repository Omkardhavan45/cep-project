import React, { useEffect, useState } from 'react'
import axios from '../api/axios'
import { motion } from 'framer-motion'

export default function Scholarships() {
  const [list, setList] = useState([])

  useEffect(() => {
    axios.get('/scholarships').then(res => setList(res.data)).catch(() => {})
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 py-10 px-6">
      <motion.h2
        className="text-4xl font-extrabold text-center text-purple-700 mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🎓 Scholarships for Young Learners
      </motion.h2>

      <motion.div
        className="max-w-2xl mx-auto space-y-4"
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
        {list.map((s, i) => (
          <motion.a
            key={i}
            href={s.link}
            target="_blank"
            rel="noreferrer"
            className="block bg-white p-4 border rounded-xl shadow hover:shadow-lg hover:bg-blue-50 transition transform hover:scale-[1.02]"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-800">🎯 {s.name}</span>
              <span className="text-sm text-blue-600">Apply Now →</span>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </div>
  )
}
