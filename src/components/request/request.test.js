const app = require("../../../app");
const request = require("supertest");

const baseURL = "http://localhost:3000"

const Token =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2RlbE5hbWUiOiJkcml2ZXIiLCJ1c2VySWQiOiI2NDliOGRmMzRhYTg0MmU5NjA3ZTQ0OGUiLCJpYXQiOjE2ODc5ODIxMDl9.AT79g9KzFYUUs9vV-TiP3pOIEtbE4MxN6NB9DHOTzf0';

describe("request tests", () => {
    test("get driver pending request", async () => {
        const res = await request(app).set('Authorization', `bearer ${Token}`).get("/request/getDriverPendingRequests");

        res.body.data.forEach(element => {


            expect(element.isActive).toBe(false);
            expect(element.accepted).toBe(false);


        });

    })

    test("get driver current request", async () => {
        const res = await request(baseURL).set('Authorization', `bearer ${Token}`).get("/request/getDriverCurrentRequests");
        res.body.data.forEach(element => {


            expect(element.isActive).toBe(true);
            expect(element.accepted).toBe(true);


        });
    })

    test("get driver previous request", async () => {
        const res = await request(baseURL).set('Authorization', `bearer ${Token}`).get("/request/previousRequests");

        res.body.data.forEach(element => {


            expect(element.isActive).toBe(false);
            expect(element.accepted).toBe(true);


        });
    })
})
