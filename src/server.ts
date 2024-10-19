import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import ItemModel from 'models/item';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000

const MONGO_USERNAME = process.env.MONGO_USERNAME
const MONGO_PASSWORD = process.env.MONGO_PASSWORD
const MONGO_DBNAME = process.env.MONGO_DBNAME

if (!MONGO_USERNAME || !MONGO_PASSWORD || !MONGO_DBNAME) {
  console.error('Missing required environment variables.')
  process.exit(1);
}

const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@codetest.jyptt.mongodb.net/`

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('MongoDB connected');

    const newItem = new ItemModel({ name: 'Deepthi', description: 'Rio Tinto sample project' });
    newItem.save()
      .then(item => console.log('item:', item))
      .catch(error => console.error('error:', error));
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });
