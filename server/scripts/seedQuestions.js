import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Question from '../models/Question.js';
dotenv.config();
await mongoose.connect(process.env.MONGO_URI);
const sample = [
  { type: 'mcq', text: 'What is 7 + 5?', options: ['10','11','12','13'], correct: 2, marks: 10 },
  { type: 'tf', text: 'A triangle has four sides.', correct: false, marks: 10 },
  { type: 'mcq', text: 'Which number is prime?', options: ['4','6','9','7'], correct: 3, marks: 10 },
  { type: 'tf', text: '0 is an even number.', correct: true, marks: 10 },
  { type: 'mcq', text: 'What is 8 x 3?', options: ['24','21','18','26'], correct: 0, marks: 10 }
];
await Question.deleteMany({}); await Question.insertMany(sample); console.log('Seeded questions'); process.exit(0);
