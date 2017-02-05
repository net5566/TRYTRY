import mongoose from 'mongoose';

const inObjSchema = mongoose.Schema({
<<<<<<< HEAD
=======
  user: String,
>>>>>>> c354a6210b05b97bcd4a18c953ca5588218abb22
  nm: String,
  url: String,
});

export const InObj = mongoose.model('InObj', inObjSchema);
