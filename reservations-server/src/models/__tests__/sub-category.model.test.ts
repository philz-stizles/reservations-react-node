import mongoose from 'mongoose';
import SubCategory from '@src/models/sub-category.model';

describe('SubCategory Model', () => {
  it('has all the required attributes', () => {
    const expectedKeys = ['name', 'slug', 'category', 'createdBy'];
    const modelAttributes = Object.keys(SubCategory.schema.paths);
    expect(expectedKeys.every(key => modelAttributes.includes(key))).toEqual(
      true
    );
  });

  it('should create a new category', async () => {
    try {
      // Create new mock SubCategory
      const newMockSubCategory = {
        name: 'Shoes',
        slug: 'shoes',
        category: new mongoose.Types.ObjectId(),
        createdBy: new mongoose.Types.ObjectId(),
      };

      // Save new mock SubCategory
      const createdMockSubCategory = await new SubCategory(
        newMockSubCategory
      ).save();

      expect(createdMockSubCategory._id).toBeDefined();
      expect(createdMockSubCategory.name).toEqual(newMockSubCategory.name);
      expect(createdMockSubCategory.slug).toEqual(newMockSubCategory.slug);
      expect(createdMockSubCategory.createdBy.toHexString()).toEqual(
        newMockSubCategory.createdBy.toHexString()
      );
    } catch (err: any | unknown) {
      throw new Error(err);
    }
  });

  it('should throw an error if the name field is empty', async () => {
    try {
      await new SubCategory({
        name: '',
        slug: 'shoes',
        category: new mongoose.Types.ObjectId(),
        createdBy: new mongoose.Types.ObjectId(),
      }).save();
    } catch (err: any | unknown) {
      expect(err.errors.name.kind).toEqual('required');
    }
  });

  it('should throw an error if the name field is duplicated', async () => {
    try {
      // Create new mock SubCategory
      const newMockSubCategory = {
        name: 'Shoes',
        slug: 'shoes',
        category: new mongoose.Types.ObjectId(),
        createdBy: new mongoose.Types.ObjectId(),
      };

      // Save new mock SubCategory
      await new SubCategory(newMockSubCategory).save();

      // Save duplicate mock SubCategory
      await new SubCategory(newMockSubCategory).save();
    } catch (err: any | unknown) {
      expect(err.code).toEqual(11000);
    }
  });

  it('should throw an error if the slug field is empty', async () => {
    try {
      await new SubCategory({
        name: 'Shoes',
        slug: '',
        category: new mongoose.Types.ObjectId(),
        createdBy: new mongoose.Types.ObjectId(),
      }).save();
    } catch (err: any | unknown) {
      expect(err.errors.slug.kind).toEqual('required');
    }
  });

  it('should throw an error if the category field is empty', async () => {
    try {
      await new SubCategory({
        name: 'Shoes',
        slug: 'shoes',
        createdBy: new mongoose.Types.ObjectId(),
      }).save();
    } catch (err: any | unknown) {
      expect(err.errors.category.kind).toEqual('required');
    }
  });
});
