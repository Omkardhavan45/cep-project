import express from 'express';
const router = express.Router();
const ensureAuth = (req,res,next) => { if (req.isAuthenticated && req.isAuthenticated()) return next(); return res.status(401).json({ message: 'Unauthorized' }); };
router.get('/profile', ensureAuth, (req,res) => {
  const u = req.user; res.json({ user: { id: u.id, name: u.name, email: u.email, scores: u.scores || [] } });
});
export default router;
