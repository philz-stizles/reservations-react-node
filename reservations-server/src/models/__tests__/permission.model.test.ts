import Permission from '@src/models/permission.model';

describe('Permission Model', () => {
  it('has all the required attributes', () => {
    const expectedKeys = ['name', 'description'];
    const modelAttributes = Object.keys(Permission.schema.paths);
    expect(expectedKeys.every(key => modelAttributes.includes(key))).toEqual(
      true
    );
  });

  it('should create a new permission', async () => {
    try {
      // Create new mock Permission
      const newMockPermission = {
        name: 'category:create',
        description: 'User can create categories',
      };

      // Save new mock Permission
      const createdMockPermission = await new Permission(
        newMockPermission
      ).save();

      expect(createdMockPermission._id).toBeDefined();
      expect(createdMockPermission.name).toEqual(newMockPermission.name);
      expect(createdMockPermission.description).toEqual(
        newMockPermission.description
      );
      expect(createdMockPermission.createdAt).toBeDefined();
    } catch (err: any | unknown) {
      throw new Error(err);
    }
  });

  it('should throw an error if the name field is empty', async () => {
    try {
      await new Permission({
        name: '',
        description: 'User can create categories',
      }).save();
    } catch (err: any | unknown) {
      expect(err.errors.name.kind).toEqual('required');
    }
  });

  it('should throw an error if the name field is duplicated', async () => {
    try {
      // Create new mock Permission
      const newMockPermission = {
        name: 'category:create',
        description: 'User can create categories',
      };

      // Save new mock Permission
      await new Permission(newMockPermission).save();

      // Save duplicate mock Permission
      await new Permission(newMockPermission).save();
    } catch (err: any | unknown) {
      expect(err.code).toEqual(11000);
    }
  });

  it('should throw an error if the description field is empty', async () => {
    try {
      await new Permission({
        name: 'category:update',
        description: '',
      }).save();
    } catch (err: any | unknown) {
      expect(err.errors.description.kind).toEqual('required');
    }
  });
});
