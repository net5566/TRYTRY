import mongoose from 'mongoose';

const inDirSchema = mongoose.Schema({
  nm: String,
  elementArr: [{
    nm: String,
    url: String,
  }],
});

export const InDir = mongoose.model('InDir', inDirSchema);
