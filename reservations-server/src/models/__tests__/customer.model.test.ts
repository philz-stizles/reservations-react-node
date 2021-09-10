import mongoose from 'mongoose';
import Customer from '@src/models/customer.model';

describe('Customer Model', () => {
  it('has all the required attributes', () => {
    const expectedKeys = ['cart', 'wishlist', 'addresses', 'account', 'phone'];
    const modelAttributes = Object.keys(Customer.schema.paths);
    expect(expectedKeys.every(key => modelAttributes.includes(key))).toEqual(
      true
    );
  });

  it('should create a new customer', async () => {
    try {
      // Create new mock Customer
      const newMockCustomer = {
        account: new mongoose.Types.ObjectId(),
        phone: '234111111111',
      };

      // Save new mock Customer
      const createdMockCustomer = await new Customer(newMockCustomer).save();

      expect(createdMockCustomer._id).toBeDefined();
      expect(createdMockCustomer.account.toHexString()).toEqual(
        newMockCustomer.account.toHexString()
      );
      expect(createdMockCustomer.phone).toEqual(newMockCustomer.phone);
      expect(createdMockCustomer.cart).toBeDefined();
      expect(createdMockCustomer.wishlist).toBeDefined();
      expect(createdMockCustomer.createdAt).toBeDefined();
      expect(createdMockCustomer.updatedAt).toBeDefined();
    } catch (err: any | unknown) {
      throw new Error(err);
    }
  });

  it('should throw an error if the account field is empty', async () => {
    try {
      await new Customer({
        phone: '234111111111',
      }).save();
    } catch (err: any | unknown) {
      expect(err.errors.account.kind).toEqual('required');
    }
  });
});
