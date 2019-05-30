import mongoose, {Schema} from 'mongoose';
import uuid from 'uuid/v4';
import uniqueValidator from "mongoose-unique-validator";

mongoose.plugin(uniqueValidator);

const ContactSchema = new Schema({
  phone: {
    type: String,
    required: 'Phone is required',
  },
  email: {
    type: String,
    required: 'Email is required',
  },
  company: {
    type: String,
  },
  hash: {
    type: String,
    unique: 'Hash mast be unique',
  },
  firstName: {
    type: String,
    lowercase: true,
    required: 'First name is required',
    trim: true,
  },
  lastName: {
    type: String,
    lowercase: true,
    required: 'Last name is required',
    trim: true,
  },
  pathToPicture: {
    type: String,
    lowercase: true,
    trim: true,
    default: "https://whatsism.com/uploads/posts/2018-07/thumbs/1530545974_e3fl9pgnios.jpg"
  },
  userHash: {
    type: String,
    ref: "user",
    required: 'User hash is required',
  }
}, {
  timestamps: true,
});

ContactSchema.pre('save', function (next) {
  if (!this.hash) {
    this.hash = uuid();
  }

  next();
});


export default mongoose.model('contact', ContactSchema);