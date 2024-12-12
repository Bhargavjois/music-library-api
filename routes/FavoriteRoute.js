import express from 'express';
import FavoriteController from '../controllers/FavoriteController.js';
import { authenticate } from '../middlewares/AuthMiddleware.js';

const favoriteRouter = express.Router();

favoriteRouter.get('/:category', authenticate, FavoriteController.getFavorites);
favoriteRouter.post('/add-favorite', authenticate, FavoriteController.addFavorite);
favoriteRouter.delete('/remove-favorite/:id', authenticate, FavoriteController.deleteFavorite);

export { favoriteRouter };