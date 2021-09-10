import Vendor from '@src/models/vendor.model';

describe('Vendor Model', () => {
  it('has all the required attributes', () => {
    const expectedKeys = ['name', 'logo', 'locations', 'images', 'users'];
    const modelAttributes = Object.keys(Vendor.schema.paths);
    expect(expectedKeys.every(key => modelAttributes.includes(key))).toEqual(
      true
    );
  });

  it('should create a new vendor', async () => {
    try {
      // Create new mock Vendor
      const newMockVendor = {
        name: 'Collectables co.',
        logo: Buffer.from([0b11110000, 0b10011111]),
        bio: 'A gadget selling company',
      };

      // Save new mock Vendor
      const createdMockVendor = await new Vendor(newMockVendor).save();

      expect(createdMockVendor._id).toBeDefined();
      expect(createdMockVendor.name).toEqual(newMockVendor.name);
      expect(createdMockVendor.bio).toEqual(newMockVendor.bio);
      expect(createdMockVendor.createdAt).toBeDefined();
      expect(createdMockVendor.updatedAt).toBeDefined();
    } catch (err: any | unknown) {
      throw new Error(err);
    }
  });

  it('should throw an error if the name field is empty', async () => {
    try {
      await new Vendor({
        name: '',
        logo: Buffer.from([0b11110000, 0b10011111]),
        bio: 'A gadget selling company',
      }).save();
    } catch (err: any | unknown) {
      expect(err.errors.name.kind).toEqual('required');
    }
  });

  it('should throw an error if the logo field is empty', async () => {
    try {
      await new Vendor({
        name: 'Collectables co.',
        bio: 'A gadget selling company',
      }).save();
    } catch (err: any | unknown) {
      expect(err.errors.logo.kind).toEqual('required');
    }
  });

  it('should throw an error if the bio field is empty', async () => {
    try {
      await new Vendor({
        name: 'Collectables co.',
        logo: Buffer.from([0b11110000, 0b10011111]),
        bio: '',
      }).save();
    } catch (err: any | unknown) {
      expect(err.errors.bio.kind).toEqual('required');
    }
  });
});
