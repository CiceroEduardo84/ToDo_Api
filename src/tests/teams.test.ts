import { describe, it, beforeAll, afterAll, expect } from "vitest";
import request from "supertest";
import { server } from "../server";
import { prisma } from "../database/prisma";

describe("Teams", () => {
  let accessToken: string;
  let teamId: number;

  const user = {
    name: "TesteTeams",
    email: "teams@gmail.com",
    password: "Aa1234567.!",
  };

  beforeAll(async () => {
    const { name, ...login } = user;

    await request(server)
      .post("/session/signup")
      .send({ ...user });

    await prisma.users.update({
      data: { role: "admin" },
      where: { email: user.email },
    });

    const sessionResponse = await request(server)
      .post("/session/signin")
      .send({ ...login });

    const cookie = sessionResponse.header["set-cookie"][0];
    accessToken = cookie.split(";")[0].split("=")[1];
  });

  afterAll(async () => {
    await prisma.users.deleteMany({
      where: { email: user.email },
    });

    await prisma.teams.deleteMany({
      where: { id: teamId },
    });
  });

  it("should create a team", async () => {
    const teamResponse = await request(server)
      .post("/teams/")
      .set("Cookie", [`auth=${accessToken}`])
      .send({
        name: "Test Name",
        description: "Test Description",
      });

    teamId = teamResponse.body.id;

    expect(teamResponse.status).toBe(201);
    expect(teamResponse.body).toHaveProperty("id");
  });
});
