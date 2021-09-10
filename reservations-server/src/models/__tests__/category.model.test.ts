import mongoose from 'mongoose';
import Category from '@src/models/category.model';

describe('Category Model', () => {
  it('has all the required attributes', () => {
    const expectedKeys = ['name', 'slug', 'createdBy'];
    const modelAttributes = Object.keys(Category.schema.paths);
    expect(expectedKeys.every(key => modelAttributes.includes(key))).toEqual(
      true
    );
  });

  it('should create a new category', async () => {
    try {
      // Create new mock Category
      const newMockCategory = {
        name: 'Women',
        slug: 'women',
        createdBy: new mongoose.Types.ObjectId(),
      };

      // Save new mock Category
      const createdMockCategory = await new Category(newMockCategory).save();

      expect(createdMockCategory._id).toBeDefined();
      expect(createdMockCategory.name).toEqual(newMockCategory.name);
      expect(createdMockCategory.slug).toEqual(newMockCategory.slug);
      expect(createdMockCategory.createdBy.toHexString()).toEqual(
        newMockCategory.createdBy.toHexString()
      );
    } catch (err: any | unknown) {
      throw new Error(err);
    }
  });

  it('should throw an error if the name field is empty', async () => {
    try {
      await new Category({
        name: '',
        slug: 'women',
        createdBy: new mongoose.Types.ObjectId(),
      }).save();
    } catch (err: any | unknown) {
      expect(err.errors.name.kind).toEqual('required');
    }
  });

  it('should throw an error if the name field is duplicated', async () => {
    try {
      // Create new mock Category
      const newMockCategory = {
        name: 'Women',
        slug: 'women',
        createdBy: new mongoose.Types.ObjectId(),
      };

      // Save new mock Category
      await new Category(newMockCategory).save();

      // Save duplicate mock Category
      await new Category(newMockCategory).save();
    } catch (err: any | unknown) {
      expect(err.code).toEqual(11000);
    }
  });

  it('should throw an error if the slug field is empty', async () => {
    try {
      await new Category({
        name: 'Women',
        slug: '',
        createdBy: new mongoose.Types.ObjectId(),
      }).save();
    } catch (err: any | unknown) {
      expect(err.errors.slug.kind).toEqual('required');
    }
  });

  it('should throw an error if the createdBy field is empty', async () => {
    try {
      await new Category({
        name: 'Women',
        slug: 'women',
      }).save();
    } catch (err: any | unknown) {
      expect(err.errors.createdBy.kind).toEqual('required');
    }
  });
});
