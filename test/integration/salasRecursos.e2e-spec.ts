import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/App.module';

describe('SalasrecursosController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/salas_recursos (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/salas_recursos');
    expect(response.status).toBe(200);
  });

  it('/salas_recursos (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/salas_recursos')
      .send({
      "sala": 101,
      "recurso": 5,
      "quantidade": 10
});
    expect([200, 201]).toContain(response.status);
  });
});
