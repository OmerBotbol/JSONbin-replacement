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

    const expectedFailMessage = {"message": "Invalid Record ID"}

    it("can get a bin by id",async ()=>{
        const response = await request(app).get("/b/1614098060748");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(expectedData);
    })

    test("if an illegal id is requested an appropriate response is sent",async ()=>{
        const response = await request(app).get("/b/161409806074");

        expect(response.status).toBe(404);
        expect(response.body).toEqual(expectedFailMessage);
    })
})