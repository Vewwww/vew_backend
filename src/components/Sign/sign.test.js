const request = require("supertest");
const baseURL = "http://localhost:3000"
//const app=require("../../../app")
describe("get signs", () => {
    test("get driver pending request", async () => {
        const res = await request(baseURL).get("/sign/");

        // const res = await request(app).get("/sign/");
        res.body.data.forEach(element => {


            expect(element.name).toBeDefined()
            expect(element.description).toBeDefined()
            expect(element.solution).toBeDefined()
            expect(element.image).toBeDefined()

        });
    })
})