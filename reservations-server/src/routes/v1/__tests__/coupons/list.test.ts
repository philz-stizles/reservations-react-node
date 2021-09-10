/* eslint-disable import/prefer-default-export */
import request from 'supertest';
import app from '@src/app';
import Coupon, { ICouponDocument } from '@src/models/coupon.model';

const ENDPOINT = '/api/v1/coupons';

export const createCoupon = async (name: string): Promise<ICouponDocument> => {
  const newCoupon = await new Coupon({
    name,
    expiry: new Date(),
    discount: 10,
  }).save();

  return newCoupon;
};

describe('List coupons route', () => {
  it(`has a route handler listening to ${ENDPOINT} for get requests`, async () => {
    const response = await request(app).get(ENDPOINT).send({});
    expect(response.status).not.toEqual(404);
  });

  it('can be accessed without authenticated', async () => {
    const response = await request(app).get(ENDPOINT).send({});
    expect(response.status).not.toEqual(401);
  });

  it('fetches a list of coupons', async () => {
    // Create 2 coupons
    const couponOne = await createCoupon('Coupon One');
    const couponTwo = await createCoupon('Coupon Two');

    // Request list of coupons
    const { body } = await request(app).get(ENDPOINT).expect(200);

    expect(body).toBeDefined();
    expect(body.status).toBeDefined();
    expect(body.status).toEqual(true);
    expect(body.data).toBeDefined();
    expect(body.data.length).toEqual(2);
    expect(body.data[0].expiry).toEqual(couponTwo.expiry.toISOString());
    expect(body.data[0].discount).toEqual(couponTwo.discount);
    expect(body.data[0].name).toEqual(couponTwo.name);
    expect(body.data[1].expiry).toEqual(couponOne.expiry.toISOString());
    expect(body.data[1].discount).toEqual(couponOne.discount);
    expect(body.data[1].name).toEqual(couponOne.name);
    expect(body.message).toBeDefined();
  });
});
