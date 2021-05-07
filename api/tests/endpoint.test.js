const supertest = require('supertest');
const assert = require('assert');
const app = require('../app');
const request = supertest(app);

const MOCK_USER = {
    USERNAME: "foo",
    PASSWORD: "bar"
}

describe("API EndPoints", () => {

    it("should have status 200 (OK) on GET /images", async (done) => {
        request.get('/images/').then(res => {
            expect(res.statusCode).toBe(200);
            done();
        });
    });

    it("should have status 401 (Unauthorized) on GET /images/private with no token", async (done) => {
        request.get('/images/private').then(res => {
            expect(res.statusCode).toBe(401);
            done();
        });
    });

    it("should have status 401 (Unauthorized) on GET /auth/user with no token", async (done) => {
        request.get("/auth/user").then(res => {
            expect(res.statusCode).toBe(401);
            done();
        });
    });

    it("should have status 200 (OK) on GET /auth/logout", async (done) => {
        request.get("/auth/logout").then(res => {
            expect(res.statusCode).toBe(200);
            done();
        });
    });

    it("should have status 201 (Authorized) on POST /auth/register", async (done) => {
        request.post("/auth/register")
            .send({
                username: MOCK_USER.USERNAME,
                password: MOCK_USER.PASSWORD,
                passwordConfirm: MOCK_USER.PASSWORD
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    });

});

describe("API EndPoints With valid Token", () => {

    let cookie;

    // Makes a login request in echange of a cookie containig the token
    beforeAll(async() => {
        const response = await request.post("/auth/login").send({username: MOCK_USER.USERNAME, password: MOCK_USER.PASSWORD});
        cookie = response.headers['set-cookie'];  
    });

    it("should have status 200 (OK) on POST /auth/login", async (done) => {
        request.post("/auth/login")
            .send({ username: MOCK_USER.USERNAME, password: MOCK_USER.PASSWORD })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    });

    it("should have status 200 (OK) on POST /auth/user", async (done) => {
        request.get("/auth/user")
            .set('cookie', cookie)
            .then(res => {
                expect(res.statusCode).toBe(200);
                done();
            });
    });

    it("should have status 200 (OK) on GET /images/private", async (done) => {
        request.get('/images/private')
        .set('cookie', cookie)
        .then(res => {
            expect(res.statusCode).toBe(200);
            done();
        });
    });

    it("should have status 200 (OK) on POST /images/upload", async (done) => {
        const token = cookie[0].split(';')[0].split('=')[1];
        const buffer = Buffer.from('');
        request.post("/images/upload")
            .field('privacy', false)
            .field('token', token)
            .attach("files[]", buffer, "/emptyfile.jpg")
            .expect(200)
            .end((err, res) => {
                if(err) return done(err);
                done();
            });
    });
});