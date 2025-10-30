import express from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
const router = express.Router();

router.post('/register', async (req,res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });
    const hash = await bcrypt.hash(password, 10);
    const u = await User.create({ name, email, password: hash });
    req.login(u, (err) => {
      if (err) return res.status(500).json({ message: 'Login after register failed' });
      res.json({ id: u.id, name: u.name, email: u.email });
    });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/login', (req,res,next) => {
  passport.authenticate('local', (err,user,info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info?.message || 'Login failed' });
    req.logIn(user, (err) => {
      if (err) return next(err);
      res.json({ id: user.id, name: user.name, email: user.email });
    });
  })(req,res,next);
});

router.post('/logout', (req,res) => {
  req.logout(() => {
    res.json({ message: 'Logged out' });
  });
});

export default router;
