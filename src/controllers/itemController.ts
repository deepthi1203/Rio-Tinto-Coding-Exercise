import { Request, Response } from 'express';
import ItemService from '../services/itemService';
import mongoose from 'mongoose';

class ItemController {
  createItem = async (req: Request, res: Response) => {
    try {
      const { name, description } = req.body;
      this.validateItemFields(name, description);
      const newItem = await ItemService.createItem(name, description);
      return res.status(201).json(newItem);
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  updateItem = async (req: Request, res: Response) => {
    try {
      this.validateObjectId(req.params.id);
      const { name, description } = req.body;
      this.validateItemFields(name, description);
      const updatedItem = await ItemService.updateItem(req.params.id, name, description);
      if (!updatedItem) return res.status(404).json({ error: 'Item not found' });
      return res.status(200).json(updatedItem);
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  patchItem = async (req: Request, res: Response) => {
    try {
      this.validateObjectId(req.params.id);
      const { name, description } = req.body;
      const updates: Partial<{ name: string; description: string }> = {};
      if (name) updates.name = name;
      if (description) updates.description = description;
      const updatedItem = await ItemService.patchItem(req.params.id, updates);
      if (!updatedItem) return res.status(404).json({ error: 'Item not found' });
      return res.status(200).json(updatedItem);
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  getItems = async (req: Request, res: Response) => {
    try {
      const items = await ItemService.getItems();
      return res.status(200).json(items);
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  getItemById = async (req: Request, res: Response) => {
    try {
      this.validateObjectId(req.params.id);
      const item = await ItemService.getItemById(req.params.id);
      if (!item) return res.status(404).json({ error: 'Item not found' });
      return res.status(200).json(item);
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  deleteItem = async (req: Request, res: Response) => {
    try {
      this.validateObjectId(req.params.id);
      const deletedItem = await ItemService.deleteItem(req.params.id);
      if (!deletedItem) return res.status(404).json({ error: 'Item not found' });
      return res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  private validateItemFields(name: string, description: string) {
    if (!name || !description) {
      throw new Error('Please provide both name and description.');
    }
  }

  private validateObjectId(id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new Error('Invalid ID format');
    }
  }

  private handleError(res: Response, error: Error) {
    const statusCode = error.message.includes('Invalid ID format') ? 400 :
                       error.message.includes('Please provide') ? 400 : 500;
    return res.status(statusCode).json({ error: error.message });
  }
}

export default new ItemController();
