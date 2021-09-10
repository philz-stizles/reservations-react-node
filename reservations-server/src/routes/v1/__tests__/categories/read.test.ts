import request from 'supertest';
import app from '@src/app';
import { createCategory } from './list.test';

describe('Get single category route', () => {
  it('can be accessed without authentication', async () => {
    const slug = 'test-slug';
    const response = await request(app)
      .get(`/api/v1/categories/${slug}`)
      .send({});

    expect(response.status).not.toEqual(401);
  });

  it('fetches a category', async () => {
    // Create a category
    const category = await createCategory('Category One');

    // Make request to fetch the category
    const { body } = await request(app)
      .get(`/api/v1/categories/${category.slug}`)
      .expect(200);

    expect(body).toBeDefined();
  });
});
