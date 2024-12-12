import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { userRouter } from './routes/UserRoute.js';
import { adminRouter } from './routes/AdminRoute.js';
import { artistRouter } from './routes/ArtistRoute.js';
import { albumRouter } from './routes/AlbumRoute.js';
import { trackRouter } from './routes/TrackRoute.js';
import { favoriteRouter } from './routes/FavoriteRoute.js';

import connectDB from './config/connectDB.js';

dotenv.config({ path: './config/.env' });
const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

const baseurl = `/api/${process.env.API_VERSION || 'v1'}`;

app.use(`${baseurl}/`, userRouter);
app.use(`${baseurl}/users`, adminRouter);
app.use(`${baseurl}/artists`, artistRouter);
app.use(`${baseurl}/albums`, albumRouter);
app.use(`${baseurl}/tracks`, trackRouter);
app.use(`${baseurl}/favorites`, favoriteRouter);

const startApp = async () => {
  const connection = await connectDB.connect();
  if ( connection.success ) {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`MongoDB connection success! Server running on port ${process.env.PORT}.`);
    });
  } else {
    console.error("Connection error", connection.error);
  }
}

startApp();