const request = require('supertest');
const app = 'http://localhost:3000';
// const app = require('../../../app');

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2RlbE5hbWUiOiJkcml2ZXIiLCJ1c2VySWQiOiI2NDliOGRmMzRhYTg0MmU5NjA3ZTQ0OGUiLCJpYXQiOjE2ODgwMTQ4Mzd9.R_lfJRdAnfyR4PuBPFA8yxege3PHYya4dB7Ly2X3I1s';
describe('GET /driver/getNearest', () => {
  describe("given a driver's latitude and longitude", () => {
    test('should respond with a 200 and list service providers by nearest distance', async () => {
      const response = await request(app).get('/driver/getNearest').set('Authorization', `Bearer ${token}`).send({
        latitude: 30.083748,
        longitude: 31.0488521,
      });
      expect(response.statusCode).toBe(200);

      for (let i = 1; i < response.body.data.length; i++) {
        expect(response.body.data[i].distance).toBeDefined();
        expect(response.body.data[i].distance).toBeGreaterThan(response.body.data[i - 1].distance);
      }
    });
  });
  describe('given latitude, and missing longitude', () => {
    test('should respond with a 400 and send message error "longitude" is required', async () => {
      const response = await request(app)
        .get('/driver/getNearest')
        .set('Authorization', token)
        .send({ latitude: 29.9193334 });
      expect(response.statusCode).toBe(400);
      expect(response.body.err.error).toBe('"longitude" is required');
    });
  });
  describe('missing latitude, and given longitude', () => {
    test('should respond with a 400 and send message error "latitude" is required', async () => {
      const response = await request(app)
        .get('/driver/getNearest')
        .set('Authorization', token)
        .send({ longitude: 30.8864163 });
      expect(response.statusCode).toBe(400);
      expect(response.body.err.error).toBe('"latitude" is required');
    });
  });
});

describe('POST /driver/signup', () => {
  describe('if any required attribute is missing', () => {
    test('should respond with a 400 and send message error "attribute name" is required', async () => {
      const response = await request(app).post('/driver/signup').send({
        name: 'kamal',
        password: '123456',
        gender: 'female',
        driverLisenceRenewalDate: '2023-06-26',
      });
      expect(response.statusCode).toBe(400);
      expect(response.body.err.error.includes('is required')).toBeTruthy();
    });
  });
});

describe('POST /driver/search?keyword=ahmed', () => {
  describe('if any required attribute is missing', () => {
    test('should respond with a 400 and send message error "attribute name" is required', async () => {
      const response = await request(app)
        .get('/driver/search')
        .set('Authorization', `Bearer ${token}`)
        .query({ keyword: 'ahmed' })
        .send({
          latitude: 30.083748,
          longitude: 31.0488521,
        });
      expect(response.statusCode).toBe(200);

      response.body.data.forEach((element) => {
        let keyWordFound = false;
        if(element.name.ar.toLowerCase().includes("ahmed") || element.name.en.toLowerCase().includes("ahmed")){
            keyWordFound = true;
        }
        expect(keyWordFound).toBe(true)
      });
    });
  });
});
