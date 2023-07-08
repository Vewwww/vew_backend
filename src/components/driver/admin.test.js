const request = require('supertest');
const app = 'http://localhost:3000'; // Replace with the path to your app
// const app = require('../../../app');
const uuid = require('uuid');
describe('POST /admin', () => {
  let authToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2RlbE5hbWUiOiJkcml2ZXIiLCJ1c2VySWQiOiI2NGE4OThjOGJhZjQ4N2RkMzA5NTY1NDIiLCJpYXQiOjE2ODg4NTI0Mjh9.BzdQIChI2Inw91VtyqReKsrRqIHDsTeIog2fLnBO_dM';

  test('should return 200 if the user is created successfully', async () => {
    const uniqueEmail = `testuser-${uuid.v4()}@gmail.com`;
    const response = await request(app).post('/admin').set('Authorization', `Bearer ${authToken}`).send({
      name: 'testuser',
      email: uniqueEmail,
      password: '<PASSWORD>!',
      phoneNumber: '+973-65487654',
      gender: 'male',
      car: {}
    });

    expect(response.status).toBe(200);
    expect(response.body.role).toBe('admin');
    expect(response.body.emailConfirm).toBe(false);
  });
  authToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2RlbE5hbWUiOiJkcml2ZXIiLCJ1c2VySWQiOiI2NGE4OThjOGJhZjQ4N2RkMzA5NTY1NDIiLCJpYXQiOjE2ODg4NTI0Mjh9.BzdQIChI2Inw91VtyqReKsrRqIHDsTeIog2fLnBO_dM';
  test('should return 200 if the user is created successfully', async () => {
    const uniqueEmail = `test${uuid.v4()}@gmail.com`;
    const response = await request(app).post('/admin').set('Authorization', `Bearer ${authToken}`).send({
      name: 'testuser',
      email: uniqueEmail,
      password: '<PASSWORD>!',
      phoneNumber: '+973-65487654',
      gender: 'male',
      cars: '[]',
    });

    expect(response.status).toBe(200);
    expect(response.body.role).toBe('admin');
    expect(response.body.emailConfirm).toBe(false);
  });
  test('should return 409 if the  email is not unique ', async () => {
    const response = await request(app).post('/admin').set('Authorization', `Bearer ${authToken}`).send({
      name: 'testuser',
      email: 'nourin.osama55@gmail.com',
      password: '<PASSWORD>!',
      phoneNumber: '+973-65487654',
      gender: 'male',
      cars: '[]',
    });

    expect(response.status).toBe(409);
    expect(response.body.err.error).toBe('Email already exists');
  });
});
describe('GET /admin/seasonsAnalytics', () => {
  let authToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2RlbE5hbWUiOiJkcml2ZXIiLCJ1c2VySWQiOiI2NGE4OThjOGJhZjQ4N2RkMzA5NTY1NDIiLCJpYXQiOjE2ODg4NTI0Mjh9.BzdQIChI2Inw91VtyqReKsrRqIHDsTeIog2fLnBO_dM';
  test('should return status 200 and autumn,spring,summer and winter is defined', async () => {
    const response = await request(app).get('/admin/seasonsAnalytics').set('Authorization', `Bearer ${authToken}`);
    expect(response.status).toBe(200);
    expect(response.body.data.summer).toBeDefined();
    expect(response.body.data.winter).toBeDefined();
    expect(response.body.data.autumn).toBeDefined();
    expect(response.body.data.spring).toBeDefined();
  });
});
describe('GET /admin/genderAnalytics', () => {
  authToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2RlbE5hbWUiOiJkcml2ZXIiLCJ1c2VySWQiOiI2NGE4OThjOGJhZjQ4N2RkMzA5NTY1NDIiLCJpYXQiOjE2ODg4NTI0Mjh9.BzdQIChI2Inw91VtyqReKsrRqIHDsTeIog2fLnBO_dM';
  test('should return status 200 and male,female percentages', async () => {
    const response = await request(app).get('/admin/genderAnalytics').set('Authorization', `Bearer ${authToken}`);
    expect(response.status).toBe(200);
    expect(response.body.maleRatio).toBeDefined();
    expect(response.body.femaleRatio).toBeDefined();
  });
});
describe('GET /admin/driver', () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2RlbE5hbWUiOiJkcml2ZXIiLCJ1c2VySWQiOiI2NGE4OThjOGJhZjQ4N2RkMzA5NTY1NDIiLCJpYXQiOjE2ODg4NTI0Mjh9.BzdQIChI2Inw91VtyqReKsrRqIHDsTeIog2fLnBO_dM';
  test('should respond with a 200 and send send list of drivers', async () => {
    const response = await request(app).get('/admin/driver');
    expect(response.statusCode).toBe(200);
    response.body.data.forEach((element) => {
      expect(element.role).toBe('user');
    });
  });
});

describe('POST /allusers/login', () => {
  test('should return 200 and token if the user is verified email successfully', async () => {
    const response = await request(app).post('/allusers/login').send({
      email: 'vewww.vew@gmail.com',
      password: '123456',
    });
    expect(response.status).toBe(200);
    expect(response.body.user.emailConfirm).toBe(true);
    expect(response.body.token).toBeDefined();
  }, 70000);
  test('should return 401 if email is incorrect', async () => {
    const response = await request(app).post('/allusers/login').send({
      email: 'vewww.vew@gmail',
      password: '123456',
    });
    expect(response.status).toBe(401);
  }, 70000);
  test('should return 401 if password is incorrect ', async () => {
    const response = await request(app).post('/allusers/login').send({
      email: 'vewww.vew@gmail.com',
      password: '12',
    });
    expect(response.status).toBe(401);
  }, 70000);
  test('should return 401 if email and password are incorrect ', async () => {
    const response = await request(app).post('/allusers/login').send({
      email: 'vewww@gmail.com',
      password: '12',
    });
    expect(response.status).toBe(401);
  }, 70000);
  test('should return 401 if email and password are correct but did not verify email', async () => {
    const response = await request(app).post('/allusers/login').send({
      email: 'test06799bec-df38-49ee-b320-abfc178b298d@gmail.com',
      password: '<PASSWORD>!',
    });
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Please confirm your email');
  }, 70000);
});

describe('POST /allusers/forgetPassword', () => {
  test('should return 200 and check you email if user is found in database in any role', async () => {
    const response = await request(app).post('/allusers/forgetPassword').send({
      email: 'vewww.vew@gmail.com',
    });
    expect(response.status).toBe(200);
    expect(response.body).toBe('check your email');
  }, 70000);

  test('should return 401 and incorrect email if user is not found in database in any role', async () => {
    const response = await request(app).post('/allusers/forgetPassword').send({
      email: 'vewww@gmail.com',
    });
    expect(response.status).toBe(401);
    expect(response.body.err.error).toBe('incorrect email ');
  }, 70000);
});
