const mongoose = require('mongoose');

const confessionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      text: String,
      createdAt: {
        type: Date,
        default: Date.now,
      }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Confession', confessionSchema);
