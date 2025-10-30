import mongoose from 'mongoose';
const QuestionSchema = new mongoose.Schema({
  type: { type: String, enum: ['mcq','tf'], required: true },
  text: { type: String, required: true },
  options: [{ type: String }],
  correct: { type: mongoose.Schema.Types.Mixed, required: true },
  marks: { type: Number, default: 10 }
});
export default mongoose.model('Question', QuestionSchema);
