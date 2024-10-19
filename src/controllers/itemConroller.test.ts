import ItemService from '../services/itemService';
import ItemModel from '../models/item';

jest.mock('../models/item');

describe('ItemService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createItem', () => {
    it('should create an item successfully', async () => {
      const mockItem = { save: jest.fn().mockResolvedValue({ name: 'Nick', description: 'test' }) };
      jest.spyOn(ItemModel.prototype, 'save').mockImplementation(mockItem.save);

      const result = await ItemService.createItem('Nick', 'test');
      expect(mockItem.save).toHaveBeenCalled();
      expect(result).toEqual({ name: 'Nick', description: 'test' });
    });

    it('should throw an error if saving fails', async () => {
      jest.spyOn(ItemModel.prototype, 'save').mockRejectedValue(new Error('Database error'));

      await expect(ItemService.createItem('Nick', 'test')).rejects.toThrow('Database error');
    });
  });

  describe('getItems', () => {
    it('should return a list of items', async () => {
      const mockItems = [{ id: '1', name: 'Item 1', description: 'Description 1' }];
      (ItemModel.find as jest.Mock).mockResolvedValue(mockItems);

      const result = await ItemService.getItems();
      expect(ItemModel.find).toHaveBeenCalled();
      expect(result).toEqual(mockItems);
    });

    it('should handle errors when retrieving items', async () => {
      (ItemModel.find as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(ItemService.getItems()).rejects.toThrow('Database error');
    });
  });

  describe('getItemById', () => {
    it('should return a specific item by ID', async () => {
      const mockItem = { id: '1', name: 'Item 2', description: 'Description 2' };
      (ItemModel.findById as jest.Mock).mockResolvedValue(mockItem);

      const result = await ItemService.getItemById('1');
      expect(ItemModel.findById).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockItem);
    });

    it('should return null if item not found', async () => {
      (ItemModel.findById as jest.Mock).mockResolvedValue(null);

      const result = await ItemService.getItemById('1');
      expect(ItemModel.findById).toHaveBeenCalledWith('1');
      expect(result).toBeNull();
    });

    it('should handle errors when retrieving item by ID', async () => {
      (ItemModel.findById as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(ItemService.getItemById('1')).rejects.toThrow('Database error');
    });
  });

  describe('updateItem', () => {
    it('should update an existing item and return the updated item', async () => {
      const mockUpdatedItem = { id: '1', name: 'Updated Item', description: 'Updated Description' };
      (ItemModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedItem);

      const result = await ItemService.updateItem('1', 'Updated Item', 'Updated Description');
      expect(ItemModel.findByIdAndUpdate).toHaveBeenCalledWith(
        '1',
        { name: 'Updated Item', description: 'Updated Description' },
        { new: true }
      );
      expect(result).toEqual(mockUpdatedItem);
    });

    it('should return null if item to update is not found', async () => {
      (ItemModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      const result = await ItemService.updateItem('1', 'Updated Item', 'Updated Description');
      expect(ItemModel.findByIdAndUpdate).toHaveBeenCalledWith(
        '1',
        { name: 'Updated Item', description: 'Updated Description' },
        { new: true }
      );
      expect(result).toBeNull();
    });

    it('should handle errors when updating item', async () => {
      const errorMessage = 'Database error';
      (ItemModel.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await expect(ItemService.updateItem('1', 'Updated Item', 'Updated Description')).rejects.toThrow(errorMessage);
    });
  });

  describe('deleteItem', () => {
    it('should delete an item and return the deleted item', async () => {
      const mockDeletedItem = { id: '1', name: 'Item 1', description: 'Description 1' };
      (ItemModel.findByIdAndDelete as jest.Mock).mockResolvedValue(mockDeletedItem);

      const result = await ItemService.deleteItem('1');
      expect(ItemModel.findByIdAndDelete).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockDeletedItem);
    });

    it('should return null if item to delete is not found', async () => {
      (ItemModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      const result = await ItemService.deleteItem('1');
      expect(ItemModel.findByIdAndDelete).toHaveBeenCalledWith('1');
      expect(result).toBeNull();
    });

    it('should handle errors when deleting item', async () => {
      const errorMessage = 'Database error';
      (ItemModel.findByIdAndDelete as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await expect(ItemService.deleteItem('1')).rejects.toThrow(errorMessage);
    });
  });
});
