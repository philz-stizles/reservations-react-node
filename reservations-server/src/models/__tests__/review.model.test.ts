import mongoose from 'mongoose';
import Review from '@src/models/review.model';

describe('Review Model', () => {
  it('has all the required attributes', () => {
    const expectedKeys = ['review', 'rating', 'product', 'createdBy'];
    const modelAttributes = Object.keys(Review.schema.paths);
    expect(expectedKeys.every(key => modelAttributes.includes(key))).toEqual(
      true
    );
  });

  it('should create a new review', async () => {
    try {
      // Create new mock Review
      const newMockReview = {
        review: 'Product was amazing',
        rating: 5,
        product: new mongoose.Types.ObjectId(),
        createdBy: new mongoose.Types.ObjectId(),
      };

      // Save new mock Review
      const createdMockReview = await new Review(newMockReview).save();

      expect(createdMockReview._id).toBeDefined();
      expect(createdMockReview.review).toEqual(newMockReview.review);
      expect(createdMockReview.rating).toEqual(newMockReview.rating);
      expect(createdMockReview.product.toHexString()).toEqual(
        newMockReview.product.toHexString()
      );
      expect(createdMockReview.createdBy.toHexString()).toEqual(
        newMockReview.createdBy.toHexString()
      );
      expect(createdMockReview.createdAt).toBeDefined();
      expect(createdMockReview.updatedAt).toBeDefined();
    } catch (err: any | unknown) {
      throw new Error(err);
    }
  });

  it('should throw an error if the review field is empty', async () => {
    try {
      await new Review({
        review: '',
        rating: 5,
        product: new mongoose.Types.ObjectId(),
        createdBy: new mongoose.Types.ObjectId(),
      }).save();
    } catch (err: any | unknown) {
      expect(err.errors.review.kind).toEqual('required');
    }
  });

  it('should throw an error if the rating field is empty', async () => {
    try {
      await new Review({
        review: 'Amazing product',
        product: new mongoose.Types.ObjectId(),
        createdBy: new mongoose.Types.ObjectId(),
      }).save();
    } catch (err: any | unknown) {
      expect(err.errors.rating.kind).toEqual('required');
    }
  });

  it('should throw an error if the product field is empty', async () => {
    try {
      await new Review({
        review: 'Amazing product',
        rating: 4,
        createdBy: new mongoose.Types.ObjectId(),
      }).save();
    } catch (err: any | unknown) {
      expect(err.errors.product.kind).toEqual('required');
    }
  });

  it('should throw an error if the createdBy field is empty', async () => {
    try {
      await new Review({
        review: 'Amazing product',
        rating: 4,
        product: new mongoose.Types.ObjectId(),
      }).save();
    } catch (err: any | unknown) {
      expect(err.errors.createdBy.kind).toEqual('required');
    }
  });
});
