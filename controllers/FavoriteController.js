import Favorite from '../models/Favorite.js';
import { CustomError, handleError } from '../utils/ErrorHandler.js';
import RecordRetriever from '../utils/RecordUtils.js';
import { handleResponse } from '../utils/ResponseHandler.js';

function validCategory(category) {
  return ['artist', 'album', 'track'].includes(category.toLowerCase());
}

const getFavorites = async (req, res) => {
  try {
    const { category } = req.params;
    const { limit = 5, offset = 0 } = req.query;

    if (validCategory(category)) {
      const favorites = await Favorite.find({ category }).skip(offset).limit(limit);
      handleResponse(res, 200, favorites, 'Favorites retrieved successfully.', null);
    } else {
      throw new CustomError(400, 'Bad Request, Reason:category.');
    }
  } catch (e) {
    handleError(e, res, 'Favorite');
  }
}

const addFavorite = async (req, res) => {
  try {
    const { category, item_id } = req.body;
    const user = req.user;

    if (validCategory(category)) {
      await Favorite.create({ user_id: user.id, category, item_id });
      handleResponse(res, 200, null, 'Favorite added successfully.', null);
    } else {
      throw new CustomError(400, 'Bad Request, Reason:category jbg.');
    }
  } catch (e) {
    handleError(e, res, 'Favorite');
  }
}

const deleteFavorite = async (req, res) => {
  await RecordRetriever.deleteRecord({
    model: Favorite,
    idField: 'favorite_id',
    id: req.params.id,
    res,
    notFoundMessage: 'Resource Doesn\'t Exist.'
  });
};

export default { getFavorites, addFavorite, deleteFavorite };