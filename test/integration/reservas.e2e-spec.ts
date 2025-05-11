import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/App.module';

describe('ReservasController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/reservas (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/reservas');
    expect(response.status).toBe(200);
  });

  it('/reservas (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/reservas')
      .send({
      "usuario": 1,
      "sala": 101,
      "diaHoraInicio": "2025-05-12T08:00:00.000Z",
      "diaHoraFim": "2025-05-12T10:00:00.000Z",
      "status": "ativo",
      "motivoCancelamento": ""
});
    expect([200, 201]).toContain(response.status);
  });
});
