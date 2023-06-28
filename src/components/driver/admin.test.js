const request = require("supertest");
const express = require("express");
const app = express();

// Import the route handlers from the "./admin.api" module
const adminRoutes = require("./admin.api");

// Mount the admin routes on the app
app.use("/admin", adminRoutes);

describe('POST /admin', () => {
  let server;

  beforeEach(() => {
    server = app.listen(); // Start the server before each test
  });

  afterEach((done) => {
    server.close(done); // Close the server after each test
  });

  test("should return 200 and a token if the user is created successfully", async () => {
    const response = await request(server)
      .post("/admin")
      .send({
        name: "testuser",
        email: "<EMAIL>",
        password: "<PASSWORD>!",
        phoneNumber: "+973-65487654",
        gender: "male",
        cars: "[]",
        role: "admin"
      });

    expect(response.status).toBe(200);
    // Add more assertions for the response body or other properties as needed
  });
});
