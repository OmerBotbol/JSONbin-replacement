const fs= require('fs');
const request = require("supertest");
const app = require("./index");

describe("GET entry point:", ()=>{
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

describe("POST entry point:", ()=>{

    const expectedPost ={
        success: true,
        "message": "Bin added successfully"
    };
    const taskToPost = {
            text: "hello",
            date: 1613499160858,
            priority: 3,
            success: "x"
    };

    it("can add a new bin", async()=>{
        const response = await request(app).post("/b").send(taskToPost);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(expectedPost.success);
        expect(response.body.message).toEqual(expectedPost.message);
    })
})

describe("PUT entry point:", ()=>{

    const taskToPut = {
        text: "clean the room",
        date: 1613499160858,
        priority: 5,
        success: "v"
    };

    const expectedPut ={
        success: true,
        data: taskToPut
    };
    
    const expectedPutFailToFind = {
        "message": "Bin not found",
        "success": false
}

    it("can update a bin by id",async() =>{
        const response = await request(app).put("/b/1614098060748").send(taskToPut);
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(expectedPut.success);
        expect(response.body.data).toEqual(expectedPut.data);


    });

    test("if a bin is not found an appropriate response is sent", async()=>{
        const response = await request(app).put("/b/1614098060749").send(taskToPut);
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(expectedPutFailToFind.success);
        expect(response.body.message).toBe(expectedPutFailToFind.message);

    })
})

describe("DELETE entry point:", ()=>{
    const expectedDeleteMessage ={
        success: true,
        message: "Bin deleted successfully"
    };

    const expectedDeleteFailMessage={
        "message": "Bin not found or it doesn't belong to your account",
        "success": false
    };
    
    it("can delete a bin by id", async()=>{
        const response = await request(app).delete("/b/1614098060748");
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(expectedDeleteMessage.success);
        expect(response.body.message).toBe(expectedDeleteMessage.message);
    })

    test("if a bin is not found an appropriate response is sent", async()=>{
        const response = await request(app).delete("/b/1614098060749");
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(expectedDeleteFailMessage.success);
        expect(response.body.message).toBe(expectedDeleteFailMessage.message);
    })
})