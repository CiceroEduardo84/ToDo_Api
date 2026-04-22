import { server } from "../server";
import { describe, it, expect, afterAll } from "vitest";
import { prisma } from "../database/prisma";
import request from "supertest";

describe("Sessions", () => {
  const user = {
    name: "TestSession",
    email: "session@gmail.com",
    password: "Aa1234567.!",
  };

  afterAll(async () => {
    await prisma.users.deleteMany({
      where: { email: user.email },
    });
  });

  it("should authenticate and get access token", async () => {
    const response = await request(server)
      .post("/session/signup")
      .send({ ...user });

    expect(response.status).toBe(201);
    expect(response.body.message).toEqual("User created!");

    const { name, ...login } = user;
    const sessionResponse = await request(server)
      .post("/session/signin")
      .send({ ...login });

    const cookie = sessionResponse.header["set-cookie"][0];
    const token = cookie.split(";")[0].split("=")[1];

    expect(sessionResponse.status).toBe(200);
    expect(sessionResponse.body.message).toEqual(
      "Login completed successfully!",
    );
    expect(sessionResponse.body).toHaveProperty("id");
    expect(token).toEqual(expect.any(String));
  });
});
