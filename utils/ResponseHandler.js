export const handleResponse = (res, status, data, message, error) => {
  return res.status(status).json({
    status,
    data,
    message,
    error
  });
}