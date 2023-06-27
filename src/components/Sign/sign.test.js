const request = require("supertest");
const baseURL = "http://localhost:3000"

describe("get signs", () => {
    test("get driver pending request", async () => {
        const res = await request(baseURL).get("/sign/");
        res.body.data.forEach(element => {
            // if (element.name && element.image && element.description && element.solution) {

            //     ex
            // }

            expect(element.name).toBeDefined()
            expect(element.description).toBeDefined()
            // expect(element.solution).toBeDefined()
            expect(element.image).toBeDefined()

        });
    })
})