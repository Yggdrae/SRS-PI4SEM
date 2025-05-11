import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/App.module';

describe('RecursosController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/recursos (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/recursos');
    expect(response.status).toBe(200);
  });

  it('/recursos (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/recursos')
      .send({
      "nome": "Projetor"
});
    expect([200, 201]).toContain(response.status);
  });
});
