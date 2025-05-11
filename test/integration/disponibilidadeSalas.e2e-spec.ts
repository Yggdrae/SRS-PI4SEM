import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/App.module';

describe('DisponibilidadesalasController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/disponibilidade_salas (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/disponibilidade_salas');
    expect(response.status).toBe(200);
  });

  it('/disponibilidade_salas (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/disponibilidade_salas')
      .send({
      "salaId": 1,
      "diaDaSemana": 1,
      "horarioInicio": "08:00",
      "horarioFim": "17:00"
});
    expect([200, 201]).toContain(response.status);
  });
});
