const request = require("supertest");
const baseURL = "http://localhost:3000"
//const app=require("../../../app")
describe("validity of password & email", () => {
    test("Verify validity of password in the register to be success", async () => {
        const res = await request(baseURL).post("/driver/signup").send({
            name: "Rana",
            email: "ranahaha@gmail.com",
            password: "1234567",
            phoneNumber: "01145785437",
            gender: "female",
        })
            .set('Accept', 'application/json');
        expect(res.statusCode).toBe(200)

        // const res = await request(app).get("/sign/");

    })

    test("Verify validity of password in the register to be fail", async () => {
        const res = await request(baseURL).post("/driver/signup").send({
            name: "Rana",
            email: "ranabadr@gmail.com",
            password: "12345",
            phoneNumber: "01145785437",
            gender: "female",
        })
            .set('Accept', 'application/json');
        expect(res.statusCode).toBe(400)

        // const res = await request(app).get("/sign/");

    })
    test("Verify validity of email in the register to be fail", async () => {
        const res = await request(baseURL).post("/driver/signup").send({
            name: "Rana",
            email: "ranabadrgmail.com",
            password: "12345",
            phoneNumber: "01145785437",
            gender: "female",
        })
            .set('Accept', 'application/json');
        expect(res.statusCode).toBe(400)

        // const res = await request(app).get("/sign/");

    })
})