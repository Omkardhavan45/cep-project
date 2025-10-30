import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Scholarship from '../models/Scholarship.js';
dotenv.config();
await mongoose.connect(process.env.MONGO_URI);
await Scholarship.deleteMany({});
await Scholarship.insertMany([
  { title: 'NTSE - National Talent Search Exam', link: 'https://example.com/ntse' },
  { title: 'Inspire Scholarship', link: 'https://example.com/inspire' },
  { title: 'Junior Science Talent Search', link: 'https://example.com/jsts' }
]);
console.log('Seeded scholarships'); process.exit(0);
