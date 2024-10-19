import { Request, Response } from 'express';
import ItemService from '../services/itemService';

class ItemController {
  async createItem(req: Request, res: Response) {
    const { name, description } = req.body;
    const newItem = await ItemService.createItem(name, description);
    res.status(201).json(newItem);
  }

  async getItems(req: Request, res: Response) {
    const items = await ItemService.getItems();
    res.status(200).json(items);
  }

  async getItemById(req: Request, res: Response) {
    const item = await ItemService.getItemById(req.params.id);
    res.status(200).json(item);
  }

  async updateItem(req: Request, res: Response) {
    const { name, description } = req.body;
    const updatedItem = await ItemService.updateItem(req.params.id, name, description);
    res.status(200).json(updatedItem);
  }

  async deleteItem(req: Request, res: Response) {
    const deletedItem = await ItemService.deleteItem(req.params.id);
    res.status(200).json({ message: 'Item deleted successfully' });
  }
}

export default new ItemController();
