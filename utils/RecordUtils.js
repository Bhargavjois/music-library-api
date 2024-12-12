import { handleError, CustomError } from './ErrorHandler.js';
import { handleResponse } from './ResponseHandler.js';

const fetchRecords = async ({ model, query, filterParams, res, successMessage }) => {
  try {
    const { limit = 5, offset = 0, ...filters } = query;
    const filter = {};

    // Build the filter dynamically
    for (const param of filterParams) {
      if (filters[param]) {
        if (param === 'hidden')
          filter[param] = filters[param] === 'true';
        else if (param === 'grammy')
          filter[param] = parseInt(filters[param], 10);
        else
          filter[param] = filters[param];
      }
    }

    // Fetch records
    const records = await model.find(filter).skip(parseInt(offset, 10)).limit(parseInt(limit, 10));
    handleResponse(res, 200, records, successMessage, null);
  } catch (e) {
    handleError(e, res, model.modelName);
  }
};

const fetchRecordById = async ({ model, idField, id, res, successMessage, notFoundMessage }) => {
  try {
    // Find the record by ID
    const record = await model.findOne({ [idField]: id });
    if (record) {
      handleResponse(res, 200, record, successMessage, null);
    } else {
      throw new CustomError(404, notFoundMessage);
    }
  } catch (e) {
    handleError(e, res, model.modelName);
  }
};

const addNewRecord = async ({ model, data, res, successMessage }) => {
  try {
    // Validate fields against the schema
    const allowedFields = Object.keys(model.schema.paths);
    const invalidFields = Object.keys(data).filter(
      (field) => !allowedFields.includes(field)
    );

    if (invalidFields.length > 0) {
      throw new CustomError(400, 'Bad Request, Reason: Invalid fields.');
    }

    // Create a new record
    await model.create(data);
    handleResponse(res, 200, null, successMessage, null);
  } catch (e) {
    handleError(e, res, model.modelName);
  }
};

const updateRecord = async ({ model, idField, id, updates, res, notFoundMessage }) => {
  try {
    // Validate fields against the schema
    const allowedFields = Object.keys(model.schema.paths);
    const invalidFields = Object.keys(updates).filter(
      (field) => !allowedFields.includes(field)
    );

    if (invalidFields.length > 0) {
      throw new CustomError(400, 'Bad Request, Reason: Invalid fields.');
    }

    // Update the record
    const result = await model.updateOne({ [idField]: id }, { $set: updates }, { runValidators: true });

    if (result.matchedCount > 0) {
      return res.status(204).send();
    } else {
      throw new CustomError(404, notFoundMessage);
    }
  } catch (e) {
    handleError(e, res, model.modelName);
  }
};

const deleteRecord = async ({ model, idField, id, res, notFoundMessage }) => {
  try {
    // Find the record before deletion (to use its name in the response)
    const record = await model.findOne({ [idField]: id });

    if (!record) {
      throw new CustomError(404, notFoundMessage);
    }

    // Delete the record
    const result = await model.deleteOne({ [idField]: id });

    if (result.deletedCount > 0) {
      handleResponse(
        res,
        200,
        { [idField]: id }, `${model.modelName} ${record.name} deleted successfully.`,
        null
      );
    } else {
      throw new CustomError(404, `${model.modelName} not found.`);
    }
  } catch (e) {
    handleError(e, res, model.modelName);
  }
};

export default { fetchRecords, fetchRecordById, addNewRecord, updateRecord, deleteRecord };