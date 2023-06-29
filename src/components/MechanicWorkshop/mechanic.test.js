const request = require('supertest');
// const app = require('../../../app');
const app = 'http://localhost:3000';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2RlbE5hbWUiOiJkcml2ZXIiLCJ1c2VySWQiOiI2NDliOGRmMzRhYTg0MmU5NjA3ZTQ0OGUiLCJpYXQiOjE2ODgwMTc1ODl9.wW2t-6bDelRv7fGwgAkitpad8qd9PSj4fjb5RqtOdXE';
describe('GET /driver/mechanic/getNearestMechanicWorkshop', () => {
  describe("given a driver's latitude and longitude", () => {
    test("should respond with a 200 and number of mechanics it's role is mechanic", async () => {
      const response = await request(app)
        .get('/driver/mechanic/getNearestMechanicWorkshop')
        .set('Authorization', `Bearer ${token}`)
        .send({ latitude: 29.9193334, longitude: 30.8864163 });
      expect(response.statusCode).toBe(200);
      response.body.data.forEach((element) => {
        expect(element.role).toBe('mechanic');
      });
    });
  });
  describe('given latitude, and missing longitude', () => {
    test('should respond with a 400 and send message error "longitude" is required', async () => {
      const response = await request(app)
        .get('/driver/mechanic/getNearestMechanicWorkshop')
        .set('Authorization', `Bearer ${token}`)
        .send({ latitude: 29.9193334 });
      expect(response.statusCode).toBe(400);
      expect(response.body.err.error).toBe('"longitude" is required');
    });
  });
  describe('missing latitude, and given longitude', () => {
    test('should respond with a 400 and send message error "latitude" is required', async () => {
      const response = await request(app)
        .get('/driver/mechanic/getNearestMechanicWorkshop')
        .set('Authorization', `Bearer ${token}`)
        .send({ longitude: 30.8864163 });
      expect(response.statusCode).toBe(400);
      expect(response.body.err.error).toBe('"latitude" is required');
    });
  });
});

describe('GET /driver/mechanic/getNearestMechanicWorkshop?service=64837b87d4a3c95f4207e9df', () => {
  describe("given service id query, driver's latitude and longitude", () => {
    test('should respond with a 200 and number of mechanic workshops provide this service', async () => {
      const response = await request(app)
        .get('/driver/mechanic/getNearestMechanicWorkshop')
        .set('Authorization', `Bearer ${token}`)
        .query({
          service: '64837b87d4a3c95f4207e9df',
        })
        .send({ latitude: 29.9193334, longitude: 30.8864163 });
      expect(response.statusCode).toBe(200);

      response.body.data.forEach((element) => {
        let services = [];
        for (let i = 0; i < element.service.length; i++) {
          services.push(element.service[i]._id);
        }
        expect(services).toContain('64837b87d4a3c95f4207e9df');
      });
    });
  });
});

describe('POST /mechanic/signup', () => {
  describe('if any required attribute is missing', () => {
    test('should respond with a 400 and send message error "attribute name" is required', async () => {
      const response = await request(app).post('/mechanic/signup').send({
        name: 'kamal',
        password: '123456',
        gender: 'male',
      });
      expect(response.statusCode).toBe(400);
      expect(response.body.err.error.includes("is required")).toBeTruthy();
    });
  });
});