import { Router } from 'express';
import ItemController from '../controllers/itemController';

const router = Router();

router.post('/items', (req, res, next) => {
  console.log('POST /items');
  ItemController.createItem(req, res).then(next).catch(next);
});
router.get('/items', (req, res, next) => {
  console.log('GET /items');
  ItemController.getItems(req, res).then(next).catch(next);
});
router.get('/items/:id', (req, res, next) => {
  console.log('GET /items/:id');
  ItemController.getItemById(req, res).then(next).catch(next);
});
router.put('/items/:id', (req, res, next) => {
  console.log('PUT /items/:id');
  ItemController.updateItem(req, res).then(next).catch(next);
});
router.delete('/items/:id', (req, res, next) => {
  console.log('DELETE /items/:id');
  ItemController.deleteItem(req, res).then(next).catch(next);
});

export default router;
