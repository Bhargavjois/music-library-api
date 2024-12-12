import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { handleError } from '../utils/ErrorHandler.js';
import { handleResponse } from '../utils/ResponseHandler.js';

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return handleResponse(res, 401, null, 'Unauthorized Access.', null);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    handleResponse(res, 401, null, 'Unauthorized Access.', null)
  }
};

export const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return handleResponse(res, 403, null, 'Forbidden Access/Operation not allowed.', null)
  }
  next();
};

export const validateCredentials = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    return handleResponse(
      res,
      400,
      null,
      `Bad Request, Reason: Missing ${!email ? 'email' : 'password'}.`,
      null
    );
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return handleResponse(
        res,
        404,
        null,
        'User not found.',
        null
      );
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return handleResponse(
        res,
        400,
        null,
        'Bad Request, Invalid credentials.',
        null
      );
    }

    // Proceed to next middleware
    req.user = user;
    next();
  } catch (error) {
    handleError(e, res);
  }
};