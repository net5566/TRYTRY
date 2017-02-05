import mongoose from 'mongoose';

const inObjSchema = mongoose.Schema({
  user: String,
  nm: String,
  url: String,
});

export const InObj = mongoose.model('InObj', inObjSchema);
