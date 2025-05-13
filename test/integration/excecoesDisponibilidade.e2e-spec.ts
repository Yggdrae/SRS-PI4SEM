import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/App.module';

describe('ExcecoesdisponibilidadeController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/excecoes_disponibilidade (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/excecoes_disponibilidade');
    expect(response.status).toBe(200);
  });

  it('/excecoes_disponibilidade (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/excecoes_disponibilidade')
      .send({
      "salaId": 1,
      "data": "2025-05-12",
      "indisponivel": true,
      "horarioInicio": "08:00",
      "horarioFim": "09:00",
      "motivo": "Manuten\u00e7\u00e3o programada"
});
    expect([200, 201]).toContain(response.status);
  });
});
