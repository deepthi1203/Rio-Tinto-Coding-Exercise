import mongoose from 'mongoose';
import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000

const MONGO_USERNAME = process.env.MONGO_USERNAME
const MONGO_PASSWORD = process.env.MONGO_PASSWORD
const MONGO_DBNAME = process.env.MONGO_DBNAME

const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_DBNAME}.jyptt.mongodb.net/`
if (!MONGO_USERNAME || !MONGO_PASSWORD || !MONGO_DBNAME) {
  console.error('Missing required environment variables.')
  process.exit(1);
}

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('MongoDB connected');

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });
