import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import Artist from './Artist.js';
import Album from './Album.js';

const TrackSchema = new Schema({
  track_id: { type: String, unique: true, default: uuidv4 },
  name: { type: String, required: [true, 'Bad Request, Reason:name'] },
  duration: { type: Number, required: [true, 'Bad Request, Reason:duration'] },
  artist_id: {
    type: String,
    ref: 'Artist',
    required: [true, 'Bad Request, Reason:artist_id'],
    validate: {
      validator: async function (value) {

        // Check artist_id and set name of the artist.
        const artist = await Artist.findOne({ artist_id: value });
        if (artist) {
          this.artist_name = artist.name;
          return true
        } else {
          return false;
        }
      },
      message: 'NotFound',
    }
  },
  album_id: {
    type: String,
    ref: 'Album',
    required: [true, 'Bad Request, Reason:album_id'],
    validate: {
      validator: async function (value) {

        // Check album_id and set name of the album.
        const album = await Album.findOne({ album_id: value });
        if (album) {
          this.album_name = album.name;
          return true;
        } else {
          return false;
        }
      },
      message: 'NotFound',
    }
  },
  artist_name: { type: String },
  album_name: { type: String },
  hidden: { type: Boolean, default: false },
}, { timestamps: true });

TrackSchema.index({ name: 1, artist_id: 1, album_id: 1 }, { unique: true });

const Track = model('Track', TrackSchema);

export default Track;