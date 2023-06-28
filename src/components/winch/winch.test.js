const request = require("supertest");
const baseURL = "http://localhost:3000"

describe("get signs", () => {
    test("get driver pending request", async () => {
        const res = await request(baseURL).get("/winch/getNearestWinch");
        res.body.data.forEach(element => {


            expect(element.available).toBe(true)

        });
    })
})