import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/App.module';

describe('SalasimagensController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/salas_imagens (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/salas_imagens');
    expect(response.status).toBe(200);
  });

  it('/salas_imagens (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/salas_imagens')
      .send({
      "sala": 101,
      "imagem": "base64stringdaimagem==",
      "nomeArquivo": "foto-sala101.png",
      "tipoMime": "image/png"
});
    expect([200, 201]).toContain(response.status);
  });
});
