import express from 'express';
import Question from '../models/Question.js';
import User from '../models/User.js';
const router = express.Router();
const ensureAuth = (req,res,next) => { if (req.isAuthenticated && req.isAuthenticated()) return next(); return res.status(401).json({ message: 'Unauthorized' }); };

router.get('/get', ensureAuth, async (req,res) => {
  const n = parseInt(req.query.n||'5',10);
  try {
    const qs = await Question.aggregate([{ $sample: { size: n } }]);
    const safe = qs.map(q => ({ id: q._id, type: q.type, text: q.text, options: q.options||[], marks: q.marks }));
    res.json({ questions: safe });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/submit', ensureAuth, async (req,res) => {
  try {
    const answers = req.body.answers || [];
    const ids = answers.map(a => a.id);
    const qs = await Question.find({ _id: { $in: ids } });
    let score = 0, total = 0, results = [];
    for (const q of qs) {
      const sub = answers.find(a => String(a.id) === String(q._id));
      const mark = q.marks || 10; total += mark;
      let correct = false;
      if (q.type === 'mcq') correct = (typeof sub.answer === 'number') && sub.answer === q.correct;
      else if (q.type === 'tf') correct = (typeof sub.answer === 'boolean') && sub.answer === q.correct;
      if (correct) score += mark;
      results.push({ id: q._id, correct, marks: mark });
    }
    const user = await User.findById(req.user.id);
    user.scores = user.scores || []; user.scores.push({ score, total, date: new Date() });
    await user.save();
    res.json({ score, total, results });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

export default router;
