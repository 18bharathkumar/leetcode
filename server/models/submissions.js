// models/Submission.js

import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  QId: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['accepted', 'rejected'],
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  code: { // New field for storing submitted code
    type: String,
    required: true,
  },
});

const Submission = mongoose.model('submission', submissionSchema);

export default Submission;
