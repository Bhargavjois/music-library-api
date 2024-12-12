import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export const createNewUser = async (email, password, role = 'Viewer') => {
  try {
    if (role === 'Admin') {
      return { status: 400, message: 'Bad Request, Reason:role.' };
    }
    if (!password) {
      return { status: 400, message: 'Bad Request, Reason:password.' }
    }
    const userCount = await User.countDocuments();
    if (userCount === 0) role = 'Admin';
    const hashedPassword = bcrypt.hashSync(password, 10);
    await User.create({ email, password: hashedPassword, role });
    return { status: 200, message: 'User created successfully.' };
  } catch (e) {
    console.error(e);
    if (e.name === 'ValidationError') {
      const errors = Object.values(e.errors).map(err => err.message);
      return { status: 400, message: `${errors.join(', ')}` };
    } else if (e.code === 11000) {
      return { status: 409, message: 'Email already exists.' };
    }
    return { status: 500, message: 'Internal server error.' };
  }
};