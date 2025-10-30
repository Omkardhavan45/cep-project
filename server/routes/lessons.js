import express from 'express';
import Lesson from '../models/Lesson.js';
const router = express.Router();
router.get('/', async (req,res) => {
  try { const lessons = await Lesson.find(); res.json(lessons); } catch (err) { res.status(500).json({ message: err.message }); }
});
router.post('/', async (req,res) => {
  try { const l = new Lesson(req.body); await l.save(); res.status(201).json(l); } catch (err) { res.status(400).json({ message: err.message }); }
});
export default router;
