import { Router, Request, Response, NextFunction } from 'express';
import ItemController from '../controllers/itemController';

const router = Router();

// Async handler to catch errors in async route handlers
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => 
  (req: Request, res: Response, next: NextFunction) => 
    Promise.resolve(fn(req, res, next)).catch(next);

// Log the request method and URL
router.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// Define routes with async error handling
router.post('/items', asyncHandler(ItemController.createItem));
router.get('/items', asyncHandler(ItemController.getItems));
router.get('/items/:id', asyncHandler(ItemController.getItemById));
router.put('/items/:id', asyncHandler(ItemController.updateItem));
router.patch('/items/:id', asyncHandler(ItemController.patchItem)); // For partial updates
router.delete('/items/:id', asyncHandler(ItemController.deleteItem));

// Handle non-existent routes
router.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

export default router;
