import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Lesson from '../models/Lesson.js';
dotenv.config();
await mongoose.connect(process.env.MONGO_URI);
const lessons = [
  { title: 'Fractions Basics', description: 'Learn fractions', youtubeUrl: 'https://www.youtube.com/watch?v=sample1', pdfUrl: 'https://example.com/fractions.pdf', thumbnail: 'https://via.placeholder.com/300x200?text=Fractions' },
  { title: 'Geometry Shapes', description: 'Basic shapes', youtubeUrl: 'https://www.youtube.com/watch?v=sample2', pdfUrl: 'https://example.com/geometry.pdf', thumbnail: 'https://via.placeholder.com/300x200?text=Geometry' },
  { title: 'Decimals Intro', description: 'Intro to decimals', youtubeUrl: 'https://www.youtube.com/watch?v=sample3', pdfUrl: 'https://example.com/decimals.pdf', thumbnail: 'https://via.placeholder.com/300x200?text=Decimals' }
];
await Lesson.deleteMany({}); await Lesson.insertMany(lessons); console.log('Seeded lessons'); process.exit(0);
