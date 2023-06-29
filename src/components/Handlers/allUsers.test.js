const request = require('supertest');
// const app = require('../../../app');
const app = 'http://localhost:3000';

describe('POST /allusers/login', () => {
  describe('given email, and missing password', () => {
    test('should respond with a 400 and send message error "password" is required', async () => {
      const response = await request(app)
        .post('/allusers/login')
        .send({ email: "example@gmail.com" });
      expect(response.statusCode).toBe(400);
      expect(response.body.err.error).toBe('"password" is required');
    });
  });
  describe('missing email, and given password', () => {
    test('should respond with a 400 and send message error "email" is required', async () => {
      const response = await request(app)
        .post('/allusers/login')
        .send({ password: "1235678" });
      expect(response.statusCode).toBe(400);
      expect(response.body.err.error).toBe('"email" is required');
    });
  });
});
