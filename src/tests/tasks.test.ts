import { describe, it, beforeAll, afterAll, expect } from "vitest";
import request from "supertest";
import { server } from "../server";
import { prisma } from "../database/prisma";
import { number } from "zod";

describe("Teams", () => {
  let accessToken: string;
  let teamId: number;
  let taskId: number;
  let userId: number;

  const user = {
    name: "TesteTasks",
    email: "tasks@gmail.com",
    password: "Aa1234567.!",
  };

  beforeAll(async () => {
    const { name, ...login } = user;

    await request(server)
      .post("/session/signup")
      .send({ ...user });

    const { id } = await prisma.users.update({
      data: { role: "admin" },
      where: { email: user.email },
    });

    userId = id;

    const sessionResponse = await request(server)
      .post("/session/signin")
      .send({ ...login });

    const cookie = sessionResponse.header["set-cookie"][0];
    accessToken = cookie.split(";")[0].split("=")[1];

    const teamResponse = await request(server)
      .post("/teams/")
      .set("Cookie", [`auth=${accessToken}`])
      .send({
        name: "Tasks Name",
        description: "Test Description",
      });

    teamId = teamResponse.body.id;

    await request(server)
      .post(`/teams/${teamId}/members`)
      .set("Cookie", [`auth=${accessToken}`])
      .send({ userId });
  });

  afterAll(async () => {
    await prisma.team_Members.deleteMany({
      where: { userId },
    });

    await prisma.users.deleteMany({
      where: { email: user.email },
    });

    await prisma.tasks.deleteMany({
      where: { id: taskId },
    });

    await prisma.teams.deleteMany({
      where: { id: teamId },
    });
  });

  it("should create task", async () => {
    const taskResponse = await request(server)
      .post("/tasks/")
      .set("Cookie", [`auth=${accessToken}`])
      .send({
        title: "teste",
        description: "teste descricption",
        status: "pending",
        priority: "high",
        assigned_to: userId,
        team_id: teamId,
      });

    taskId = taskResponse.body.id;

    expect(taskResponse.status).toBe(201);
    expect(taskResponse.body).toHaveProperty("id");
  });
});
