import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import Artist from './Artist.js';
import Album from './Album.js';
import Track from './Track.js'

const FavoriteSchema = new Schema({
    favorite_id: { type: String, unique: true, default: uuidv4 },
    user_id: { type: String, ref: 'User', required: [true, 'Bad Request, Reason:user'] },
    category: { type: String, enum: ['artist', 'track', 'album'], required: [true, 'Bad Request, Reason:category.'] },
    item_id: {
      type: String,
      required: [true, 'Bad Request, Reason:item_id'],
      validate: {
        validator: async function (value) {

          // Check the category and validate item_id accordingly
          if (this.category === 'artist') {

            // Check artist_id and set name of the artist.
            const artist = await Artist.findOne({ artist_id: value });
            if (artist) {
              this.name = artist.name;
              return true;
            } else {
              return false;
            }
          } else if (this.category === 'album') {

            // Check album_id and set name of the album.
            const album = await Album.findOne({ album_id: value });
            if (album) {
              this.name = album.name;
              return true;
            } else {
              return false;
            }
          } else if (this.category === 'track') {

            // Check track_id and set name of the track.
            const track = await Track.findOne({ track_id: value });
            if (track) {
              this.name = track.name;
              return true;
            } else {
              return false;
            }
          }

          // If category is invalid, return false
          return false;
        },
        message: 'NotFound',
      },
    },
    name: { type: String }
  }, { timestamps: true }
);

FavoriteSchema.index({ user_id: 1, category: 1, item_id: 1 }, { unique: true });

const Favorite = model('Favorite', FavoriteSchema);

export default Favorite;