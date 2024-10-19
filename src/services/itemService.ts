import ItemModel from '../models/item';

class ItemService {
  async createItem(name: string, description: string) {
    const newItem = new ItemModel({ name, description });
    return newItem.save();
  }

  async getItems() {
    return ItemModel.find();
  }

  async getItemById(id: string) {
    return ItemModel.findById(id);
  }

  async updateItem(id: string, name: string, description: string) {
    return ItemModel.findByIdAndUpdate(id, { name, description }, { new: true });
  }

  async deleteItem(id: string) {
    return ItemModel.findByIdAndDelete(id);
  }
}

export default new ItemService();
