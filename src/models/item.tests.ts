import ItemModel from '../../src/models/item';

describe('Item Model', () => {
  it('should create a model with name and description', async () => {
    const item = new ItemModel({ name: 'test', description: 'data' });
    await item.validate();
    expect(item.name).toBe('test');
    expect(item.description).toBe('data');
  });
});
