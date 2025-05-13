import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/App.module';

describe('PagamentosController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/pagamentos (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/pagamentos');
    expect(response.status).toBe(200);
  });

  it('/pagamentos (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/pagamentos')
      .send({
      "valor": 100,
      "metodo": "cartao",
      "usuarioId": 1,
      "cartaoId": 123
});
    expect([200, 201]).toContain(response.status);
  });
});
