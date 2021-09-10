import User from '@src/models/user.model.old';

describe('User Model', () => {
  it('has all the required attributes', () => {
    const expectedKeys = [
      'fullname',
      'username',
      'name',
      'email',
      'avatar',
      'password',
      'passwordChangedAt',
      'passwordResetExpiresIn',
      'passwordResetToken',
    ];
    const modelAttributes = Object.keys(User.schema.paths);
    expect(expectedKeys.every(key => modelAttributes.includes(key))).toEqual(
      true
    );
  });

  it('should create a new user', async () => {
    try {
      // Create new mock User
      const newMockUser = {
        fullname: 'Test User',
        email: 'testuser@mail.com',
        password: 'password',
      };

      // Save new mock User
      const createdMockUser = await new User(newMockUser).save();

      expect(createdMockUser._id).toBeDefined();
      expect(createdMockUser.fullname).toEqual(newMockUser.fullname);
      expect(createdMockUser.email).toEqual(newMockUser.email);
      expect(createdMockUser.password).toBeDefined();
      expect(createdMockUser.createdAt).toBeDefined();
      expect(createdMockUser.updatedAt).toBeDefined();
    } catch (err: any | unknown) {
      throw new Error(err);
    }
  });

  it('should throw an error if the fullname field is empty', async () => {
    try {
      await new User({
        fullname: '',
        email: 'testuser@mail.com',
        password: 'password',
      }).save();
    } catch (err: any | unknown) {
      expect(err.errors.fullname.kind).toEqual('required');
    }
  });

  it('should throw an error if the email field is empty', async () => {
    try {
      await new User({
        fullname: 'Test User',
        email: '',
        password: 'password',
      }).save();
    } catch (err: any | unknown) {
      expect(err.errors.email.kind).toEqual('required');
    }
  });

  it('should throw an error if the name email is duplicated', async () => {
    try {
      // Create new mock User
      const newMockUser = {
        fullname: 'Test User',
        email: 'testuser@mail.com',
        password: 'password',
      };

      // Save new mock User
      await new User(newMockUser).save();

      // Save duplicate mock User
      await new User(newMockUser).save();
    } catch (err: any | unknown) {
      expect(err.code).toEqual(11000);
    }
  });

  it('should throw an error if the password field is empty', async () => {
    try {
      await new User({
        fullname: 'Test User',
        email: 'testuser@mail.com',
        password: '',
      }).save();
    } catch (err: any | unknown) {
      expect(err.errors.password.kind).toEqual('required');
    }
  });
});
