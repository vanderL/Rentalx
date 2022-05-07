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

  it("Should be able to create a new category", async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: "admin@rentalx.com",
      password: "admin"
    })

    const { token } = responseToken.body;

    const response = await request(app).post("/categories").send({
      name: "Categories Supertest",
      description: "Categories supertest description"
    }).set({
      Authorization: `Bearer ${token}`
    })

    expect(response.status).toBe(201)
  })
})
