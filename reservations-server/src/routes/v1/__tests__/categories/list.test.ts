/* eslint-disable import/prefer-default-export */
import mongoose from 'mongoose';
/* eslint-disable import/prefer-default-export */
import slugify from 'slugify';
import request from 'supertest';
import app from '@src/app';
import Category, { ICategoryDocument } from '@src/models/category.model';

export const createCategory = async (
  name: string
): Promise<ICategoryDocument> => {
  const newCategory = await new Category({
    name,
    slug: slugify(name),
    createdBy: new mongoose.Types.ObjectId(),
  }).save();

  return newCategory;
};

describe('List categories route', () => {
  it('has a route handler listening to /api/categories for get requests', async () => {
    const response = await request(app).get('/api/v1/categories').send({});
    expect(response.status).not.toEqual(404);
  });

  it('can be accessed without authenticated', async () => {
    const response = await request(app).get('/api/v1/categories').send({});
    expect(response.status).not.toEqual(401);
  });

  it('fetches a list of categories', async () => {
    // Create 2 categories
    const categoryOne = await createCategory('Category One');
    const categoryTwo = await createCategory('Category Two');

    // Request list of categories
    const { body } = await request(app).get('/api/v1/categories').expect(200);

    expect(body).toBeDefined();
    expect(body.status).toBeDefined();
    expect(body.status).toEqual(true);
    expect(body.data).toBeDefined();
    expect(body.data.length).toEqual(2);
    expect(body.data[0].slug).toEqual(categoryTwo.slug);
    expect(body.data[0].name).toEqual(categoryTwo.name);
    expect(body.data[1].slug).toEqual(categoryOne.slug);
    expect(body.data[1].name).toEqual(categoryOne.name);
    expect(body.message).toBeDefined();
  });
});
