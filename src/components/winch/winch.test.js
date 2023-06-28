const request = require("supertest");
const baseURL = "http://localhost:3000"

describe("get availability", () => {
    test("get nearest winch availability", async () => {
        const res = await request(baseURL).get("/winch/getNearestWinch")
            .send({ latitude: 74798263984, longitude: 738294798 })
            .set('Accept', 'application/json');
        res.body.data.forEach(element => {


            expect(element.available).toBe(true)

        });
        //expect(res.body.data.available).toBe(true);

    })
})