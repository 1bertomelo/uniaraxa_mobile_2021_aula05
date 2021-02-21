const app = require("../index");
const request = require("supertest");
const { validate: isUuid } = require("uuid");

describe("Test POST NEW Student", () => {
    it("should be able to create a new student", async () => {
        const response = await request(app)
            .post("/")
            .send({
                name: "humberto melo",
                email: "h1@gmail.com"
            })
            .expect(200);
        expect(isUuid(response.body.newStudent.id)).toBe(true);
        expect(response.body).toMatchObject({
            "newStudent": {
                name: "humberto melo",
                email: "h1@gmail.com"
            }
        });
    });
});


describe("Test UPDATE EXISTS Student", () => {
    it("should be able to create a new student", async () => {
        const response = await request(app)
            .post("/")
            .send({
                name: "humberto melo 2",
                email: "h_@gmail.com"
            })
            .expect(200);
        expect(isUuid(response.body.newStudent.id)).toBe(true);
        expect(response.body).toMatchObject({
            "newStudent": {
                name: "humberto melo 2",
                email: "h_@gmail.com"
            }
        });

        const responseUpd = await request(app)
            .put(`/${response.body.newStudent.id}`)
            .send({
                name: "humberto melo update",
                email: "h2@gmail.com"
            })
            .expect(200);
        expect(responseUpd.body).toMatchObject({
            name: "humberto melo update",
            email: "h2@gmail.com"

        });
    });

});


describe("Test UPDATE Student not exists", () => {
    it("should not be able to update a repository that does not exist", async () => {
        await request(app).put(`/123`).expect(404);
    });
});

describe("Test DELETE Student not exists", () => {
    it("should not be able to delete a repository that does not exist", async () => {
        await request(app).put(`/123`).expect(404);
    });
});

describe("Test DELETE Student exists", () => {
    it("should be able to create a new student", async () => {
        const response = await request(app)
            .post("/")
            .send({
                name: "humberto melo 2",
                email: "h_@gmail.com"
            })
            .expect(200);
        expect(isUuid(response.body.newStudent.id)).toBe(true);
        expect(response.body).toMatchObject({
            "newStudent": {
                name: "humberto melo 2",
                email: "h_@gmail.com"
            }
        });

        const responseDel = await request(app)
            .delete(`/${response.body.newStudent.id}`)
            .expect(200);
        expect(responseDel.body).toMatchObject({
            "Message":
                `Student ${response.body.newStudent.id} removed`
        });
    });
});


afterAll(done => {
    app.close();
    done();
});