// import request from 'supertest';
// import app from '@src/app';

// const ENDPOINT = '/api/v1/auth';

// describe('Current user route', () => {
//   it('responds with details about the current user', async () => {
//     const cookie = await global.signinWithToken();

//     const response = await request(app)
//       .get(`${ENDPOINT}/currentuser`)
//       .set('Cookie', cookie)
//       .send()
//       .expect(200);

//     expect(response.body.currentUser.email).toEqual('test@test.com');
//   });

//   it('responds with null if not authenticated', async () => {
//     const response = await request(app).get(`${ENDPOINT}/currentuser`).send();

//     expect(response.body.currentUser).toEqual(null);
//   });
// });
