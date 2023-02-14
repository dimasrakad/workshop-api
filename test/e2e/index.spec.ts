import request from "supertest";
import { createApp } from "@src/app.js";

let userId: string;
describe("end to end testing", () => {
  // Positive case invite user
  it("invite", async () => {
    const app = await createApp();
    const response = await (
      await request(app).post("/v1/users")
    ).headers({
      Authorization: "<token>",
    });
    expect(response.statusCode).toEqual(201);
    expect(response._id).not.toBeUndefined();
  });
  // Negative case invite user
  it("invite user failed because request is not authorized", async () => {
    const app = await createApp();
    const response = await request(app).post("/v1/users").set({
      name: "Aini",
      email: "aini@gmail.com",
    });
    userId = response.body._id;
    expect(response.statusCode).toEqual(201);
    expect(response.body._id).not.toBeUndefined();
  });
  it("read all", async () => {
    const app = await createApp();
    const response = await request(app).get("/v1/users");
    expect(response.statusCode).toEqual(200);
    expect(response.body).not.toEqual([]);
  });
  it("read one", async () => {
    const app = await createApp();
    const response = await request(app).get("/v1/users/" + userId);
    expect(response.statusCode).toEqual(200);
    expect(response.body._id).not.toBeNull();
  });
  it("update", async () => {
    const app = await createApp();
    const response = await request(app).patch("/v1/users/" + userId);
    expect(response.statusCode).toEqual(204);
    expect(response.body._id).not.toBeNull();
  });
  it("destroy", async () => {
    const app = await createApp();
    const response = await request(app).delete("/v1/users/" + userId);
    const deletedUser = await request(app).get("/v1/user/" + userId);
    expect(response.statusCode).toEqual(204);
    expect(response.body).toEqual({});
    expect(deletedUser.body).toBeNull();
  });
});
