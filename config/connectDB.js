import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './config/.env' });

const uri = process.env.MONGODB_URI.replace('${MONGODB_USERNAME}', process.env.MONGODB_USERNAME).replace('${MONGODB_PASSWORD}', process.env.MONGODB_PASSWORD);
const connect = async () => {
  try {
    await mongoose.connect(uri, {dbName: 'music-library'})
    return { success: true, error: null };
  } catch (e) {
    console.error(e);
    return { success: false, error: e };
  }
}

export default { connect };