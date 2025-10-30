import React, { useEffect, useState } from 'react'
import axios from '../api/axios'
import { motion, AnimatePresence } from 'framer-motion'

export default function Play() {
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/quiz/get?n=5')
      .then(res => setQuestions(res.data.questions))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const setAnswer = (id, ans) => setAnswers(prev => ({ ...prev, [id]: ans }))

  const submit = async () => {
    const payload = { answers: Object.keys(answers).map(id => ({ id, answer: answers[id] })) }
    const res = await axios.post('/quiz/submit', payload)
    setResult(res.data)
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center text-lg text-gray-600 animate-pulse">
      Loading Quiz...
    </div>
  )

  if (result) return (
    <motion.div
      className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg text-center mt-10"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <h2 className="text-3xl font-bold text-green-700 mb-4">🎉 Quiz Completed!</h2>
      <p className="text-lg mb-4">
        <strong>Score:</strong> {result.score} / {result.total}
      </p>
      <p className="text-gray-600 mb-6">
        {result.score / result.total >= 0.8
          ? "🌟 Excellent work! Keep it up!"
          : result.score / result.total >= 0.5
          ? "👏 Good job! You can improve further!"
          : "💪 Don’t worry — try again and you’ll do better next time!"}
      </p>
      <button
        className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        onClick={() => window.location.reload()}
      >
        🔁 Take Quiz Again
      </button>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-8 px-6">
      <motion.h2
        className="text-4xl font-bold text-center text-blue-700 mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🧠 Play Quiz
      </motion.h2>

      {/* Progress Bar */}
      <div className="max-w-2xl mx-auto mb-6">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}
          ></div>
        </div>
        <p className="text-center text-sm text-gray-600 mt-1">
          {Object.keys(answers).length} / {questions.length} answered
        </p>
      </div>

      {/* Questions Section */}
      <motion.div
        className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg space-y-6"
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
        {questions.map((q) => (
          <QuestionCard key={q.id} q={q} onAnswer={(a) => setAnswer(q.id, a)} />
        ))}
      </motion.div>

      {/* Submit Button */}
      <div className="text-center mt-6">
        <button
          onClick={submit}
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 hover:scale-105 transition-transform"
        >
          ✅ Submit Answers
        </button>
      </div>
    </div>
  )
}

function QuestionCard({ q, onAnswer }) {
  const [sel, setSel] = React.useState(null)
  const handle = (val) => { setSel(val); onAnswer(val) }

  return (
    <motion.div
      className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition bg-white"
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
    >
      <p className="font-semibold mb-3 text-gray-800">{q.text}</p>
      {q.type === 'mcq' ? (
        <div className="space-y-2">
          {q.options.map((opt, idx) => (
            <div
              key={idx}
              className={`p-2 border rounded-lg cursor-pointer transition 
                ${sel === idx ? 'bg-blue-100 border-blue-400' : 'hover:bg-gray-50'}`}
              onClick={() => handle(idx)}
            >
              {opt}
            </div>
          ))}
        </div>
      ) : (
        <div className="space-x-4 mt-2">
          <button
            className={`px-3 py-1 border rounded-lg ${sel === true ? 'bg-blue-100 border-blue-400' : 'hover:bg-gray-50'}`}
            onClick={() => handle(true)}
          >
            True
          </button>
          <button
            className={`px-3 py-1 border rounded-lg ${sel === false ? 'bg-blue-100 border-blue-400' : 'hover:bg-gray-50'}`}
            onClick={() => handle(false)}
          >
            False
          </button>
        </div>
      )}
    </motion.div>
  )
}
