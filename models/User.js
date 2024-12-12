import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const UserSchema = new Schema({
  user_id: { type: String, unique: true, default: uuidv4 },
  email: { type: String, required: [true, 'Bad Request, Reason:email'], unique: true },
  password: { type: String, required: [true, 'Bad Request, Reason:password'] },
  role: { type: String, enum: ['Admin', 'Editor', 'Viewer'], default: 'Viewer' },
}, { timestamps: true });

const User = model('User', UserSchema);

export default User;