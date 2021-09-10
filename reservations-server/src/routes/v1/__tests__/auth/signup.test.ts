import request from 'supertest';
import app from '@src/app';

const ENDPOINT = '/api/v1/auth';

describe('Signup route', () => {
  it('returns a 201 status code on successful signup', async () => {
    return request(app)
      .post(`${ENDPOINT}/signup`)
      .send({
        fullname: 'Test Name',
        email: 'test@test.com',
        password: 'password',
        confirmPassword: 'password',
      })
      .expect(201);
  });

  it('returns a 400 status code with missing email or password', async () => {
    await request(app)
      .post(`${ENDPOINT}/signup`)
      .send({
        fullname: 'Test Name',
        password: 'password',
        confirmPassword: 'password',
      })
      .expect(400);

    await request(app)
      .post(`${ENDPOINT}/signup`)
      .send({
        fullname: 'Test Name',
        email: 'test@test.com',
        confirmPassword: 'password',
      })
      .expect(400);
  });

  it('disallows duplicate emails', async () => {
    await request(app)
      .post(`${ENDPOINT}/signup`)
      .send({
        fullname: 'Test Name',
        email: 'test@test.com',
        password: 'password',
        confirmPassword: 'password',
      })
      .expect(201);

    await request(app)
      .post(`${ENDPOINT}/signup`)
      .send({
        fullname: 'Test Name',
        email: 'test@test.com',
        password: 'password',
        confirmPassword: 'password',
      })
      .expect(400);
  });

  // it('sets a cookie after successful signup', async () => {
  //   const response = await request(app)
  //     .post(`${ENDPOINT}/signup`)
  //     .send({
  //       email: 'test@test.com',
  //       password: 'password',
  //     })
  //     .expect(201);

  //   expect(response.get('Set-Cookie')).toBeDefined();
  // });
});
