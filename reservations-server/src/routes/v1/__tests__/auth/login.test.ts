import request from 'supertest';
import app from '@src/app';

const ENDPOINT = '/api/v1/auth';

describe('Login route', () => {
  it('returns a 200 status code on successful login', async () => {
    await request(app)
      .post(`${ENDPOINT}/signup`)
      .send({
        fullname: 'Test Name',
        email: 'test@test.com',
        password: 'password',
        confirmPassword: 'password',
      })
      .expect(201);

    const response = await request(app)
      .post(`${ENDPOINT}/login`)
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
  });

  it('returns a 400 status code with missing email or password', async () => {
    await request(app)
      .post(`${ENDPOINT}/login`)
      .send({
        password: 'password',
      })
      .expect(400);

    await request(app)
      .post(`${ENDPOINT}/login`)
      .send({
        email: 'test@test.com',
      })
      .expect(400);
  });

  it('fails with an email that does not exist', async () => {
    await request(app)
      .post(`${ENDPOINT}/login`)
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(401);
  });

  it('fails when an incorrect password is supplied', async () => {
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
      .post(`${ENDPOINT}/login`)
      .send({
        email: 'test@test.com',
        password: 'WrongPassword',
        confirmPassword: 'WrongPassword',
      })
      .expect(401);
  });

  // it('sets a cookie after successful login', async () => {
  //   await request(app)
  //     .post(`${ENDPOINT}/signup`)
  //     .send({
  //       email: 'test@test.com',
  //       password: 'password',
  //     })
  //     .expect(201);

  //   const response = await request(app)
  //     .post(`${ENDPOINT}/login`)
  //     .send({
  //       email: 'test@test.com',
  //       password: 'password',
  //     })
  //     .expect(200);

  // });
});
