import express from 'express';
import bodyParser from 'body-parser';
import itemRoutes from './routes/itemRoutes';

const app = express();

app.use(bodyParser.json());
app.use('/api', itemRoutes);

app.get('/', (req, res) => {
  res.send('Items API');
});

app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

export default app;
