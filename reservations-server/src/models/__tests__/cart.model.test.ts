import mongoose from 'mongoose';
import Cart from '@src/models/cart.model';

const createMockProducts = (noOfProducts = 1) => {
  const products = [];
  if (noOfProducts > 0) {
    for (let i = noOfProducts; i > 0; i -= 1) {
      // Create new mock Product
      products.push({
        product: { _id: new mongoose.Types.ObjectId().toHexString() },
        count: 2,
        color: 'green',
        price: 123,
      });
    }
  }

  return {
    products,
    totalAmount: products.reduce(
      (acc, { count, price }) => acc + count * price,
      0
    ),
  };
};

describe('Cart Model', () => {
  it('has all the required attributes', () => {
    const expectedKeys = [
      'products',
      'totalAmount',
      'totalAfterDiscount',
      'createdBy',
    ];
    const modelAttributes = Object.keys(Cart.schema.paths);
    expect(expectedKeys.every(key => modelAttributes.includes(key))).toEqual(
      true
    );
  });

  it('should create a new cart', async () => {
    try {
      // Mock products
      const { products, totalAmount } = createMockProducts();

      // Create new mock Cart
      const newMockCart = {
        products,
        totalAmount,
        createdBy: new mongoose.Types.ObjectId(),
      };

      // Save new mock Cart
      const createdMockCart = await new Cart(newMockCart).save();

      expect(createdMockCart._id).toBeDefined();
      // expect(createdMockCart.toJSON().products).toEqual(newMockCart.products);
      expect(createdMockCart.totalAmount).toEqual(newMockCart.totalAmount);
      expect(createdMockCart.createdBy.toHexString()).toEqual(
        newMockCart.createdBy.toHexString()
      );
      expect(createdMockCart.createdAt).toBeDefined();
      expect(createdMockCart.updatedAt).toBeDefined();
    } catch (err: any | unknown) {
      throw new Error(err);
    }
  });

  // it('should throw an error if the products field is empty', async () => {
  //   try {
  //     await new Cart({
  //       totalAmount: 23,
  //       createdBy: new mongoose.Types.ObjectId().toHexString(),
  //     }).save();
  //   } catch (err: any | unknown) {
  //     expect(err.errors.products.kind).toEqual('required');
  //   }
  // });

  it('should throw an error if the totalAmount field is empty', async () => {
    try {
      // Mock products
      const { products } = createMockProducts(0);

      await new Cart({
        products,
        totalAmount: 0,
        createdBy: new mongoose.Types.ObjectId().toHexString(),
      }).save();
    } catch (err: any | unknown) {
      expect(err.errors.products.kind).toEqual('required');
    }
  });
});
