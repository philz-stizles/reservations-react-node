import mongoose from 'mongoose';
import Coupon from '@src/models/coupon.model';

describe('Coupon Model', () => {
  it('has all the required attributes', () => {
    const expectedKeys = ['name', 'expiry', 'discount', 'createdBy'];
    const modelAttributes = Object.keys(Coupon.schema.paths);
    expect(expectedKeys.every(key => modelAttributes.includes(key))).toEqual(
      true
    );
  });

  it('should create a new coupon', async () => {
    try {
      // Create new mock Coupon
      const newMockCoupon = {
        name: 'SEW123',
        expiry: new Date(),
        discount: 12,
        createdBy: new mongoose.Types.ObjectId(),
      };

      // Save new mock Coupon
      const createdMockCoupon = await new Coupon(newMockCoupon).save();

      expect(createdMockCoupon._id).toBeDefined();
      expect(createdMockCoupon.name).toEqual(newMockCoupon.name);
      expect(createdMockCoupon.expiry).toEqual(newMockCoupon.expiry);
      expect(createdMockCoupon.discount).toEqual(newMockCoupon.discount);
      expect(createdMockCoupon.createdBy.toHexString()).toEqual(
        newMockCoupon.createdBy.toHexString()
      );
      expect(createdMockCoupon.createdAt).toBeDefined();
      expect(createdMockCoupon.updatedAt).toBeDefined();
    } catch (err: any | unknown) {
      throw new Error(err);
    }
  });

  it('should throw an error if the name field is empty', async () => {
    try {
      await new Coupon({
        name: '',
        expiry: new Date(),
        discount: 12,
        createBy: new mongoose.Types.ObjectId().toHexString(),
      }).save();
    } catch (err: any | unknown) {
      expect(err.errors.name.kind).toEqual('required');
    }
  });

  it('should throw an error if the expiry field is empty', async () => {
    try {
      await new Coupon({
        name: 'SEW123',
        discount: 12,
        createBy: new mongoose.Types.ObjectId().toHexString(),
      }).save();
    } catch (err: any | unknown) {
      expect(err.errors.expiry.kind).toEqual('required');
    }
  });

  it('should throw an error if the name field is duplicated', async () => {
    try {
      // Create new mock Coupon
      const newMockCoupon = {
        name: 'SEW123',
        expiry: new Date(),
        discount: 12,
        createBy: new mongoose.Types.ObjectId().toHexString(),
      };

      // Save new mock Coupon
      await new Coupon(newMockCoupon).save();

      // Save duplicate mock Coupon
      await new Coupon(newMockCoupon).save();
    } catch (err: any | unknown) {
      expect(err.code).toEqual(11000);
    }
  });

  it('should throw an error if the discount field is empty', async () => {
    try {
      await new Coupon({
        name: 'SEW123',
        expiry: new Date(),
        createBy: new mongoose.Types.ObjectId().toHexString(),
      }).save();
    } catch (err: any | unknown) {
      expect(err.errors.discount.kind).toEqual('required');
    }
  });

  it('should throw an error if the createdBy field is empty', async () => {
    try {
      await new Coupon({
        name: 'SEW123',
        expiry: new Date(),
        discount: 12,
      }).save();
    } catch (err: any | unknown) {
      expect(err.errors.createdBy.kind).toEqual('required');
    }
  });
});
