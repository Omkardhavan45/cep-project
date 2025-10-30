import express from 'express';
import Scholarship from '../models/Scholarship.js';
const router = express.Router();
router.get('/', async (req,res) => { try { const s = await Scholarship.find(); res.json(s); } catch (err) { res.status(500).json({ message: err.message }); } });
router.post('/', async (req,res) => { try { const sc = new Scholarship(req.body); await sc.save(); res.status(201).json(sc); } catch (err) { res.status(400).json({ message: err.message }); } });
export default router;
