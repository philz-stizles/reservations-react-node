// import request from 'supertest';
// import app from '@src/app';

// const ENDPOINT = '/api/v1/auth';

// describe('Signout route', () => {
//   it('Clears the cookie after signing out', async () => {
//     await request(app)
//       .post(`${ENDPOINT}/signup`)
//       .send({
//         email: 'test@test.com',
//         password: 'password',
//       })
//       .expect(201);

//     const response = await request(app)
//       .post(`${ENDPOINT}/signout`)
//       .send({})
//       .expect(200);
//     // console.log(response.get('Set-Cookie'));
//     expect(response.get('Set-Cookie')[0]).toEqual(
//       'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
//     );
//   });
// });
