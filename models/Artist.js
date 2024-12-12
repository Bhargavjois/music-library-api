import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const ArtistSchema = new Schema({
  artist_id: { type: String, unique: true, default: uuidv4 },
  name: { type: String, required: [true, 'Bad Request, Reason:name'], uniqu: true },
  grammy: { type: Number, default: 0 },
  hidden: { type: Boolean, default: false },
}, { timestamps: true });

const Artist = model('Artist', ArtistSchema);

export default Artist;