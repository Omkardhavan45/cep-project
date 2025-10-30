import mongoose from 'mongoose';
const ScholarshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String, required: true }
});
export default mongoose.model('Scholarship', ScholarshipSchema);
