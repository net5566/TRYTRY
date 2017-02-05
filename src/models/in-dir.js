import mongoose from 'mongoose';

const inDirSchema = mongoose.Schema({
  user: String,
  nm: String,
  elementArr: [{
    nm: String,
    url: String,
  }],
});

export const InDir = mongoose.model('InDir', inDirSchema);
