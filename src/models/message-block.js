import mongoose from 'mongoose';

const messageBlockSchema = mongoose.Schema({
  visitorIn: String,
  textIn: String,
  emotionIn: String,
  timeIn: String,
});

export const MessageBlock = mongoose.model('MessageBlock', messageBlockSchema);
