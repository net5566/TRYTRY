import mongoose from 'mongoose';

const inObjSchema = mongoose.Schema({
  nm: String,
  url: String,
});

export const InObj = mongoose.model('InObj', inObjSchema);
