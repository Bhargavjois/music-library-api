import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import Artist from './Artist.js';

const AlbumSchema = new Schema({
  album_id: { type: String, unique: true, default: uuidv4 },
  name: { type: String, required: [true, 'Bad Request, Reason:name'] },
  year: { type: Number, required: [true, 'Bad Request, Reason:year'] },
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
  artist_name: { type: String },
  hidden: { type: Boolean, default: false },
}, { timestamps: true });

const Album = model('Album', AlbumSchema);

export default Album;