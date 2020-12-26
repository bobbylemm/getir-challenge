const request = require("supertest");
const app = require("../server");
const { disconnect } = require("mongoose");

describe("Routes Tests", () => {
  afterAll(async () => {
    await disconnect();
  });
  it("should be able to get index route", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.body.code).toEqual(0);
    expect(res.body.msg).toBe("API Running");
  });
  it("hanlde 404 routes", async () => {
    const res = await request(app).get("/not-valid");
    expect(res.statusCode).toEqual(301);
    expect(res.body.msg).toBe("This route was not found");
  });
  it("should filter records based on payload provided", async () => {
    const res = await request(app).post("/filter-payload").send({
      startDate: "2016-01-26",
      endDate: "2018-02-02",
      minCount: 2700,
      maxCount: 3000,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.code).toEqual(0);
    expect(res.body.msg).toBe("Success");
  });
});
