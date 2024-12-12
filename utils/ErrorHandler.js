import { handleResponse } from "./ResponseHandler.js";

export class CustomError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.type = 'custom';
  }
}

export const handleError = (e, res, object) => {
  console.error(e);
  let { status, message } = { status: 500, message: 'Internal server error.' }
  if (e.name === 'ValidationError') {
    const msg = Object.values(e.errors).map(err => err.message).join(', ');
    if (msg === 'NotFound') {
      status = 404;
      message = 'Resource Doesn\'t exist.';
    } else {
      const errors = Object.values(e.errors).map(err => err.message);
      status = 400;
      message = `${errors.join(', ')}`;
    }
  } else if (e.code === 11000) {
    status = 409;
    message = `${object} already exists.`;
  } else if (e.type === 'custom') {
    status = e.status;
    message = e.message;
  }
  return handleResponse(res, status, null, message, null);
}