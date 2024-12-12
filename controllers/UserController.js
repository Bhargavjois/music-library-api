import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { createNewUser } from '../utils/UserUtils.js';
import { CustomError, handleError } from '../utils/ErrorHandler.js';
import { handleResponse } from '../utils/ResponseHandler.js';

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { status, message } = await createNewUser(email, password);
    handleResponse(res, status, null, message, null);
  } catch (e) {
    handleError(e, res, 'User');
  }
}

const login = (req, res) => {
  try {
    const user = req.user;
    const token = jwt.sign({ id: user.user_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    handleResponse(res, 200, { token }, 'Login successful.', null);
  } catch (e) {
    handleError(e, res, 'User');
  }
};

const logout = (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      handleResponse(res, 200, null, 'User logged out successfully.', null);
    } else {
      throw new CustomError(400, 'Bad Request.');
    }
  } catch (e) {
    handleError(e, res, 'User');
  }
};

const updatePassword = async (req, res) => {
  try {
    const { old_password, new_password } = req.body;
    console.log(req.user);
    const user = await User.findOne({ user_id: req.user.id });
    if (!user) {
      throw new CustomError(404, 'User not found.');
    }
    const isPasswordValid = await bcrypt.compare(old_password, user.password);
    if (!isPasswordValid) {
      throw new CustomError(400, 'Bad Request, Reason:Invalid credentials.');
    }
    const hashedPassword = bcrypt.hashSync(new_password, 10);
    const result = await User.updateOne({ user_id: user.user_id }, { $set: { password: hashedPassword } });
    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      throw new CustomError(404, 'User not found.');
    }
  } catch(e) {
    handleError(e, res, 'User');
  }
}

export default { signup, login, logout, updatePassword };