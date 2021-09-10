import Product from '@src/models/product.model';

describe('Product Model', () => {
  it('has all the required attributes', () => {
    const expectedKeys = [
      'title',
      'slug',
      'description',
      'price',
      'category',
      'subs',
      'quantity',
      'sold',
      'images',
      'shipping',
      'color',
      'brand',
      'ratings',
    ];
    const modelAttributes = Object.keys(Product.schema.paths);
    expect(expectedKeys.every(key => modelAttributes.includes(key))).toEqual(
      true
    );
  });

  it('should create a new product', async () => {
    try {
      // Create new mock Product
      const newMockProduct = {
        title: 'Samsung Smart Phone',
        description: 'Some product description',
        price: 23,
      };

      // Save new mock Product
      const createdMockProduct = await new Product(newMockProduct).save();

      expect(createdMockProduct._id).toBeDefined();
      expect(createdMockProduct.title).toEqual(newMockProduct.title);
      expect(createdMockProduct.description).toEqual(
        newMockProduct.description
      );
      expect(createdMockProduct.sold).toBeDefined();
      expect(createdMockProduct.slug).toBeDefined();
      expect(createdMockProduct.createdAt).toBeDefined();
      expect(createdMockProduct.updatedAt).toBeDefined();
    } catch (err: any | unknown) {
      throw new Error(err);
    }
  });

  it('should throw an error if the title field is empty', async () => {
    try {
      await new Product({
        title: '',
        slug: 'samsung_smart_phone',
        description: 'Some product description',
        price: 23,
      }).save();
    } catch (err: any | unknown) {
      expect(err.errors.title.kind).toEqual('required');
    }
  });
});
