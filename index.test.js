const supertest = require("supertest");

const request = require("supertest");
const app = require("./index");

describe("GET entry point", ()=>{
    const expectedData = {
        text: "omer",
        date: 1613499160858,
        priority: "3",
        success: "x"
    };

    it("can get a bin by id",async ()=>{
        const response = await request(app).get("/b/1614098060748");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(expectedData);
    })
})