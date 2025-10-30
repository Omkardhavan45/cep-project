import mongoose from 'mongoose';
const AttemptSchema = new mongoose.Schema({
  score: Number,
  total: Number,
  date: { type: Date, default: Date.now }
});
const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  createdAt: { type: Date, default: Date.now },
  scores: [AttemptSchema]
});
export default mongoose.model('User', UserSchema);
