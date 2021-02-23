const supertest = require("supertest");

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

// describe("POST entry point:", ()=>{

//     const expectedPost ={
//         success: true,
//         "message": "Bin added successfully"
//     };
//     const taskToPost = {
//             text: "hello",
//             date: 1613499160858,
//             priority: 3,
//             success: "x"
//     };

//     it("can add a new bin", async()=>{
//         const response = await request(app).post("/b").send(taskToPost);

//         expect(response.status).toBe(200);
//         expect(response.body.success).toBe(expectedPost.success);
//         expect(response.body.message).toEqual(expectedPost.message);
//     })
// })

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

    it("can update a bin by id",async() =>{
        const response = await request(app).put("/b/1614098060748").send(taskToPut);
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(expectedPut.success);
        expect(response.body.data).toEqual(expectedPut.data);


    })
})