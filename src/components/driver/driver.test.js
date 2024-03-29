const request = require('supertest');
const app = 'http://localhost:3000';
const baseURL = 'http://localhost:3000';
// const app = require('../../../app');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2RlbE5hbWUiOiJkcml2ZXIiLCJ1c2VySWQiOiI2NGE5OTk1YjA5MTZhMDlmNTA0Yjk1NWMiLCJpYXQiOjE2ODg4NTQyNzN9.IYXIppw09dAcJ79OGp5Y-nK19dD9j1sUyusQ8KRhD-U'
describe('GET /driver/getNearest', () => {
  describe("given a driver's latitude and longitude", () => {
    test('should respond with a 200 and list service providers by nearest distance', async () => {
      const response = await request(app).get('/driver/getNearest').set('Authorization', `Bearer ${token}`).send({ "latitude":30.0496509, "longitude":31.27362904 } );
      console.log(response.body)
      expect(response.statusCode).toBe(200);


      for (let i = 1; i < response.body.data.length; i++) {
        expect(response.body.data[i].distance).toBeDefined();
        expect(response.body.data[i].distance).toBeGreaterThanOrEqual(response.body.data[i - 1].distance);
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
  describe('driver search for service provider has a specific neme ', () => {
    test('should respond with a 200 and send list of service providers has key word in their name', async () => {
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
        if (element.name.ar.toLowerCase().includes('ahmed') || element.name.en.toLowerCase().includes('ahmed')) {
          keyWordFound = true;
        }
        expect(keyWordFound).toBe(true);
      });
    });
  });
});

describe('validity of password & email', () => {
  test('Verify validity of email in the register to be success', async () => {
    const res = await request(baseURL)
      .post('/driver/signup')
      .send({
        name: 'maged',
        email: 'maged@gmail.com',
        password: '1234567',
        phoneNumber: '01145785437',
        gender: 'male',
      })
      .set('Accept', 'application/json');
    expect(res.statusCode).toBe(200);
  });

  test('Verify validity of password in the register to be success', async () => {
    const res = await request(baseURL)
      .post('/driver/signup')
      .send({
        name: 'Rana',
        email: 'ranahaha@gmail.com',
        password: '1234567',
        phoneNumber: '01145785437',
        gender: 'female',
      })
      .set('Accept', 'application/json');
    expect(res.statusCode).toBe(200);

    // const res = await request(app).get("/sign/");
  });

  test('Verify validity of password in the register to be fail', async () => {
    const res = await request(baseURL)
      .post('/driver/signup')
      .send({
        name: 'Rana',
        email: 'ranabadr@gmail.com',
        password: '12345',
        phoneNumber: '01145785437',
        gender: 'female',
      })
      .set('Accept', 'application/json');
    expect(res.statusCode).toBe(400);

    // const res = await request(app).get("/sign/");
  });
  test('Verify validity of email in the register to be fail', async () => {
    const res = await request(baseURL)
      .post('/driver/signup')
      .send({
        name: 'Rana',
        email: 'ranabadrgmail.com',
        password: '12345',
        phoneNumber: '01145785437',
        gender: 'female',
      })
      .set('Accept', 'application/json');
    expect(res.statusCode).toBe(400);

    // const res = await request(app).get("/sign/");
  });
});
