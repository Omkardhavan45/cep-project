import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';   // ✅ fixed import
import cors from 'cors';
import dotenv from 'dotenv';
import passport from './passportConfig.js';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import quizRoutes from './routes/quiz.js';
import lessonsRoutes from './routes/lessons.js';
import scholarshipsRoutes from './routes/scholarships.js';

dotenv.config();
const app = express();

// ✅ Ensure database is connected first
connectDB();

// ✅ Express middlewares
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  })
);

// ✅ Correct session setup for connect-mongo v5
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,   // ✅ new syntax
      collectionName: 'sessions',
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// ✅ Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// ✅ Routes
app.use('/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/quiz', quizRoutes);
app.use('/lessons', lessonsRoutes);
app.use('/scholarships', scholarshipsRoutes);

// ✅ Default route
app.get('/', (req, res) => res.send('CEP server running'));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
