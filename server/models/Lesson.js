import mongoose from 'mongoose';
const LessonSchema = new mongoose.Schema({
  title: String,
  description: String,
  youtubeUrl: String,
  pdfUrl: String,
  thumbnail: String
});
export default mongoose.model('Lesson', LessonSchema);
