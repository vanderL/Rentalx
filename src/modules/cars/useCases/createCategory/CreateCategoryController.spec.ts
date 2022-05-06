import { app } from '@shared/infra/http/app';
import request from 'supertest';


describe("Create Category Controller", () => {
  it("Should be able test ok", async () => {
    await request(app).get("/cars/available").expect(200)
  })
})
