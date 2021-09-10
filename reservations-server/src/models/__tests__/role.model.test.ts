import mongoose from 'mongoose';
import Role from '@src/models/role.model';

describe('Role Model', () => {
  it('has all the required attributes', () => {
    const expectedKeys = [
      'name',
      'description',
      'permissions',
      'isActive',
      // 'createdBy',
    ];
    const modelAttributes = Object.keys(Role.schema.paths);
    expect(expectedKeys.every(key => modelAttributes.includes(key))).toEqual(
      true
    );
  });

  it('should create a new role', async () => {
    try {
      // Create new mock Role
      const newMockRole = {
        name: 'Admin',
        description: 'User can do everything',
        isActive: true,
        createdBy: new mongoose.Types.ObjectId(),
      };

      // Save new mock Role
      const createdMockRole = await new Role(newMockRole).save();

      expect(createdMockRole._id).toBeDefined();
      expect(createdMockRole.name).toEqual(newMockRole.name);
      expect(createdMockRole.description).toEqual(newMockRole.description);
      expect(createdMockRole.isActive).toEqual(newMockRole.isActive);
      expect(createdMockRole.createdAt).toBeDefined();
      expect(createdMockRole.updatedAt).toBeDefined();
    } catch (err: any | unknown) {
      throw new Error(err);
    }
  });

  it('should throw an error if the name field is empty', async () => {
    try {
      await new Role({
        name: '',
        description: 'User can do everything',
        permissions: [],
        isActive: true,
        createdBy: new mongoose.Types.ObjectId(),
      }).save();
    } catch (err: any | unknown) {
      expect(err.errors.name.kind).toEqual('required');
    }
  });

  it('should throw an error if the name field is duplicated', async () => {
    try {
      // Create new mock Role
      const newMockRole = {
        name: 'Admin',
        description: 'User can do everything',
        permissions: [],
        isActive: true,
        createdBy: new mongoose.Types.ObjectId(),
      };

      // Save new mock Role
      await new Role(newMockRole).save();

      // Save duplicate mock Role
      await new Role(newMockRole).save();
    } catch (err: any | unknown) {
      expect(err.code).toEqual(11000);
    }
  });

  it('should throw an error if the description field is empty', async () => {
    try {
      await new Role({
        name: 'Vendor',
        description: '',
        permissions: [],
        isActive: true,
        createdBy: new mongoose.Types.ObjectId(),
      }).save();
    } catch (err: any | unknown) {
      expect(err.errors.description.kind).toEqual('required');
    }
  });

  it('should throw an error if the isActive field is empty', async () => {
    try {
      await new Role({
        name: 'Vendor',
        description: 'User can do all vendor related things',
        permissions: [],
        createdBy: new mongoose.Types.ObjectId(),
      }).save();
    } catch (err: any | unknown) {
      expect(err.errors.isActive.kind).toEqual('required');
    }
  });
});
