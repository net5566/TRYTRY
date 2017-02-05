import mongoose from 'mongoose';

const messageBlockSchema = mongoose.Schema({
  user: String,
  visitorIn: String,
  textIn: String,
  emotionIn: String,
  timeIn: String,
});

export const MessageBlock = mongoose.model('MessageBlock', messageBlockSchema);
