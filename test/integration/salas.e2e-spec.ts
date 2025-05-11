import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/App.module';

describe('SalasController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/salas (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/salas');
    expect(response.status).toBe(200);
  });

  it('/salas (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/salas')
      .send({
      "numero": 101,
      "andar": 1,
      "valorHora": 50,
      "isDestaque": false
});
    expect([200, 201]).toContain(response.status);
  });
});
