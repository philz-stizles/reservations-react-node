import mongoose from 'mongoose';
import Order from '@src/models/order.model';

describe('Order Model', () => {
  it('has all the required attributes', () => {
    const expectedKeys = ['products', 'paymentIntent', 'status', 'createdBy'];
    const modelAttributes = Object.keys(Order.schema.paths);
    expect(expectedKeys.every(key => modelAttributes.includes(key))).toEqual(
      true
    );
  });

  it('should create a new order', async () => {
    try {
      // Create new mock Order
      const newMockOrder = {
        products: [],
        paymentIntent: {},
        status: 'Not Processed',
        createdBy: new mongoose.Types.ObjectId(),
      };

      // Save new mock Order
      const createdMockOrder = await new Order(newMockOrder).save();

      expect(createdMockOrder._id).toBeDefined();
      expect(createdMockOrder.createdBy.toHexString()).toEqual(
        newMockOrder.createdBy.toHexString()
      );
      expect(createdMockOrder.createdAt).toBeDefined();
      expect(createdMockOrder.updatedAt).toBeDefined();
    } catch (err: any | unknown) {
      throw new Error(err);
    }
  });

  it('should throw an error if the createdBy field is empty', async () => {
    try {
      await new Order({
        products: [],
        paymentIntent: {},
        status: 'Not Processed',
      }).save();
    } catch (err: any | unknown) {
      expect(err.errors.createdBy.kind).toEqual('required');
    }
  });
});
