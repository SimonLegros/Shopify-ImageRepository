const supertest = require('supertest');
const assert = require('assert');
const app = require('../app');
const request = supertest(app);

describe("The API", () => {

    it("should has status 200 on GET /images", async(done) => { 
        request.get('/images/').then( res => {
            expect(res.statusCode).toBe(200);
            done();
        });
    });

    it("should has status 401 on GET /images/private when no token", async(done) => {
        request.get('/images/private').then( res => {
            expect(res.statusCode).toBe(401);
            done();
        });
    });

    it("should has status 401 on GET /images/ when no token", async(done) => {
        request.get("/auth/user").then( res => {
            expect(res.statusCode).toBe(401);
            done();
        });
    });

    it("should has status 200 on GET /auth/logout", async(done) => {
        request.get("/auth/logout").then( res => {
            expect(res.statusCode).toBe(200);
            done();
        });
    });

    
});