import { server } from "../server";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import supertest from "supertest";
import TestAgent from "supertest/lib/agent";
import Test from "supertest/lib/test";
import { prisma } from "../database/prisma";

describe("Sessions", () => {
  const user = {
    name: "TesteTeste",
    email: "teste@gmail.com",
    password: "Aa1234567.!",
  };

  let app: TestAgent<Test>;

  beforeAll(() => {
    app = supertest.agent(server);
  });

  afterAll(async () => {
    await prisma.users.delete({
      where: { email: user.email },
    });
  });

  it("Registry a new user in sign up", async () => {
    const response = await app.post("/session/signup").send({ ...user });

    expect(response.status).toBe(201);
    expect(response.body.message).toEqual("User created!");
  });

  it("Register another user with the same email.", async () => {
    const response = await app.post("/session/signup").send({ ...user });

    expect(response.status).toBe(409);
    expect(response.body.message).toEqual("Email already exists!");
  });

  it("Login with the user created in sign up", async () => {
    const { name, ...login } = user;
    const response = await app.post("/session/signin").send({ ...login });

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual("Login completed sucessfully!");
    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toEqual(expect.any(Number));
  });

  it("Logout with the user created in sign up", async () => {
    const response = await app.post("/session/signout");

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual("Logout completed successfully!");

    const resp = await app.post("/session/signout");
    expect(resp.status).toBe(401);
    expect(resp.body.message).toEqual("Invalid JWT token");
  });
});
