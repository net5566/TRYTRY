import mongoose from 'mongoose';

const options = {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
};

const articleSchema = mongoose.Schema({
  id: String,
  content: String,
  title: String,
  tags: String, // { type: [String], default: [] },
}, options);

export const Article = mongoose.model('Article', articleSchema);
