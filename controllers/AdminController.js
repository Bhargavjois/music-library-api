import User from '../models/User.js';
import { createNewUser } from '../utils/UserUtils.js';
import { CustomError, handleError } from '../utils/ErrorHandler.js';
import { handleResponse } from '../utils/ResponseHandler.js';

const getAllUsers = async (req, res) => {
  try {
    const { limit = 5, offset = 0, role } = req.query;
    if (!role || ['Editor', 'Viewer'].includes(role)) {
      const filter = role ? { role } : { role: { $ne: 'Admin' } };
      const users = await User.find(filter).skip(offset).limit(limit);
      handleResponse(res, 200, users, 'Users retrieved successfully.', null);
    } else {
      throw new CustomError(400, 'Bad Request.');
    }
  } catch(e) {
    handleError(e, res, 'User');
  }
}

const addUser = async (req, res) => {
  try {
    const { email, password, role='Viewer' } = req.body;
    const { status, message } = await createNewUser(email, password, role);
    handleResponse(res, status, null, message, null);
  } catch (e) {
    handleError(e, res, 'User');
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    let { status, message } = { status: 400, message: 'Bad Request.' };
    if (id) {
      const result = await User.deleteOne({ user_id: id });
      if (result.deletedCount > 0) {
        status = 200;
        message = 'User deleted successfully.';
      } else {
        status = 404;
        message = 'User not found.';
      }
    }
    handleResponse(res, status, null, message, null);
  } catch (e) {
    handleError(e, res, 'User');
  }
}

export default { getAllUsers, addUser, deleteUser };