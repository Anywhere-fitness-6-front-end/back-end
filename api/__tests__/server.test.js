const request = require("supertest");
const server = require("../server");
const db = require("../../data/db-config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secure");
const randomUser = { email: "user@user.user", password: "pass1234", name: "joe user", instructor: false };

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db.seed.run('cleanup')
});
afterAll(async () => {
  await db.destroy();
});

it("sanity check", () => {
  expect(true).not.toBe(false);
});

describe("server.js", () => {
  it("is the correct testing environment", async () => {
    expect(process.env.NODE_ENV).toBe("testing");
  });
});

describe("Verify Endpoints are working", () => {
  describe("[POST] /users/register", () => {
    it("creates new User", async () => {
      const newUser = await request(server)
        .post("/users/register")
        .send(randomUser)
        .expect(201)
        .then((res) => res.body);
      // console.log(newUser);
      const user = await db("users")
        .where({ user_id: newUser.user_id })
        .first();
      expect(user);
    });
    it("updates database", async () => {
      const newUser = await request(server)
        .post("/users/register")
        .send(randomUser)
        .expect(201)
        .then((res) => res.body);
      const user = await db("users")
        .where({ user_id: newUser.user_id })
        .first();
      expect(bcrypt.compareSync(randomUser.password, user.password)).toBe(true);
      expect(user.username).toBe(randomUser.username);
    });
  });
  describe("[POST] /users/login", () => {
    it("returns valid token", async () => {
      await request(server)
        .post("/users/register")
        .send(randomUser)
        .expect(201);

      const token = await request(server)
        .post("/users/login")
        .send(randomUser)
        .expect(200)
        .then((res) => res.body.token);
      expect(jwt.verify(token, JWT_SECRET)).toBeDefined();
    });
    it("fails without password", async () => {
      const response = await request(server)
        .post("/users/login")
        .send({ username: "test" })
        .expect(400);
      expect(response.body.message).toBe(
        "email and password are required"
      );
    });
  });
});
