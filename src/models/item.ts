import { Schema, model, Document } from 'mongoose';

interface Item extends Document {
  name: string;
  description: string;
}

const itemSchema = new Schema<Item>({
  name: { type: String, required: true },
  description: { type: String, required: true },
}, { versionKey: false }); // disable versioning which is Mongoose’s internal use 

const ItemModel = model<Item>('Item', itemSchema);

export default ItemModel;
