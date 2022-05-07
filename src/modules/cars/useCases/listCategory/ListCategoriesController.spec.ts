import request from 'supertest';
import { Connection } from 'typeorm';
import { hash } from 'bcryptjs';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';

import createConnection from '@shared/infra/typeorm'

let connection: Connection

describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash('admin', 8);

    await connection.query(
      `
        INSERT INTO USERS(id, name, email, password, admin, created_at, driver_license)
         values('${id}', '${'admin'}', '${'admin@rentalx.com'}', '${password}', '${true}', 'now()', 'XXXXXXXXXX' )
      `,
    );
  })

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close()
  })

  it("Should be able to list all categories", async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: "admin@rentalx.com",
      password: "admin"
    })

    const { token } = responseToken.body;

    await request(app).post("/categories").send({
      name: "Categories Supertest",
      description: "Categories supertest description"
    }).set({
      Authorization: `Bearer ${token}`
    })

    await request(app).post("/categories").send({
      name: "Categories Supertest novo",
      description: "Categories supertest description do novo"
    }).set({
      Authorization: `Bearer ${token}`
    })

    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toEqual("Categories Supertest")
  })
})
