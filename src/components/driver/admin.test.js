const request = require('supertest');
const app = 'http://localhost:3000'; // Replace with the path to your app
const uuid = require("uuid");
const driverModel = require('./driver.model');
const mechanicWorkshopModel = require('../MechanicWorkshop/mechanicWorkshop.model');
const winchModel = require('../winch/winch.model');

describe('POST /admin', () => {
    let authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2RlbE5hbWUiOiJkcml2ZXIiLCJ1c2VySWQiOiI2NDkxNzViNTI1Y2M4MTM5ZjNhZmZkNGYiLCJpYXQiOjE2ODc5MTM2Mjd9.aOWz2Gw23S-wtKY9MduRMhy7o69Irt3w7QRe8iQKIvk"

    test('should return 200 if the user is created successfully', async () => {
        const uniqueEmail = `testuser-${uuid.v4()}@example.com`;
        const response = await request(app)
            .post('/admin')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                name: 'testuser',
                email: uniqueEmail,
                password: '<PASSWORD>!',
                phoneNumber: '+973-65487654',
                gender: 'male',
                cars: '[]'
            });

        expect(response.status).toBe(200);
        expect(response.body.role).toBe("admin")
        expect(response.body.emailConfirm).toBe(false)
    });
});
describe('GET /admin/seasonsAnalytics', () => {
    let authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2RlbE5hbWUiOiJkcml2ZXIiLCJ1c2VySWQiOiI2NDkxNzViNTI1Y2M4MTM5ZjNhZmZkNGYiLCJpYXQiOjE2ODc5MTM2Mjd9.aOWz2Gw23S-wtKY9MduRMhy7o69Irt3w7QRe8iQKIvk"
    test('should return status 200 and autumn,spring,summer and winter is defined', async () => {
        const response = await request(app)
            .get('/admin/seasonsAnalytics')
            .set('Authorization', `Bearer ${authToken}`)
        expect(response.status).toBe(200);
        expect(response.body.data.summer).toBeDefined()
        expect(response.body.data.winter).toBeDefined()
        expect(response.body.data.autumn).toBeDefined()
        expect(response.body.data.spring).toBeDefined()
    });
})
describe('GET /admin/genderAnalytics', () => {
    let authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2RlbE5hbWUiOiJkcml2ZXIiLCJ1c2VySWQiOiI2NDkxNzViNTI1Y2M4MTM5ZjNhZmZkNGYiLCJpYXQiOjE2ODc5MTM2Mjd9.aOWz2Gw23S-wtKY9MduRMhy7o69Irt3w7QRe8iQKIvk"
    test('should return status 200 and male,female percentages', async () => {
        const response = await request(app)
            .get('/admin/genderAnalytics')
            .set('Authorization', `Bearer ${authToken}`)
        expect(response.status).toBe(200);
        //   expect(response.body.data.maleRatio).toBeDefined()
        //   expect(response.body.data.femaleRatio).toBeDefined()
    });
})
// describe('POST /allusers/login', () => {
//     test('should return 200 and token if the user is veried email successfully', async () => {
//       const uniqueEmail = `testuser-${uuid.v4()}@example.com`;
//       const response = await request(app)
//         .post('/allusers/login')
//         .send({
//           email: uniqueEmail,
//           password: '<PASSWORD>!',
//         });
  
//       const user = response.body;
  
//       let model = await driverModel.findOne({ email: user.email });
//       if (!model) {
//         model = await mechanicWorkshopModel.findOne({ email: user.email });
//         if (!model) {
//           model = await winchModel.findOne({ email: user.email });
//         }
//       }
  
//       expect(response.status).toBe(200);
//       expect(["admin", "user", "mechanic", "winch"]).toContain(user.role);
//       expect(model.emailConfirm).toBe(true);
//     });
//   });
  