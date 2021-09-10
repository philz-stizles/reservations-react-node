import User from '@src/models/user.model.old';

describe('User Model', () => {
  it('should have fullname, email, password and roles attributes', () => {
    let expectedKeys = ['fullname', 'email', 'password', 'roles'];
    let keys = Object.keys(User.schema.paths);
    let userAttributes = [keys[0], keys[1], keys[2], keys[3]];
    expect(userAttributes).toStrictEqual(expectedKeys);
  });

  it('should be able to create a new user', async () => {
    try {
      const newUser = new User({
        fullname: 'Test User',
        email: 'test@email.io',
        password: 'test password',
        roles: ['admin'],
      });
      const createdUser = await newUser.save();
      expect(createdUser.fullname).toEqual(newUser.fullname);
      expect(createdUser.email).toEqual(newUser.email);
      expect(createdUser.roles).toEqual(newUser.roles);
    } catch (error) {
      throw new Error(error);
    }
  });

  it('should throw an error on save if the fullname field is empty', async () => {
    try {
      await new User({
        fullname: '',
        email: 'test@email.io',
        password: 'test password',
        roles: ['admin'],
      }).save();
    } catch (error) {
      expect(error.errors.fullname.kind).toEqual('required');
    }
  });

  it('should throw an error on save if the email field is empty', async () => {
    try {
      await new User({
        fullname: 'Test User',
        email: '',
        password: 'test password',
        roles: ['admin'],
      }).save();
    } catch (error) {
      expect(error.errors.email.kind).toEqual('required');
    }
  });

  it('should throw an error on save if email is already in use', async () => {
    try {
      await new User({
        fullname: 'Test User',
        email: 'test@email.io',
        password: 'test password',
        roles: ['admin'],
      }).save();

      await new User({
        fullname: 'Test User',
        email: 'test@email.io',
        password: 'test password',
        roles: ['admin'],
      }).save();
    } catch (error) {
      expect(error.code).toEqual(11000);
    }
  });

  it('should throw an error on save if the email is invalid', async () => {
    try {
      await new User({
        fullname: 'Test User',
        email: 'test.invalid',
        password: 'test password',
        roles: ['admin'],
      }).save();
    } catch (error) {
      expect(error.errors.email.message).toEqual(
        'A valid email address is required'
      );
    }
  });
});
