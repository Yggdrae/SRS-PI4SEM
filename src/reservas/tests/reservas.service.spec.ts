import { Test, TestingModule } from '@nestjs/testing';
import { ReservasService } from '../reservas.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Reservas } from '../reservas.entity';
import { Usuario } from 'src/usuarios/usuarios.entity';
import { Salas } from 'src/salas/salas.entity';
import { Repository } from 'typeorm';

describe('ReservasService', () => {
  let service: ReservasService;
  let reservasRepository: Repository<Reservas>;
  let usuariosRepository: Repository<Usuario>;
  let salasRepository: Repository<Salas>;

  const mockReservas = [];
  const mockUsuario = { id: 1 };
  const mockSala = { id: 1 };

  const mockReservasRepo = {
    find: jest.fn().mockResolvedValue(mockReservas),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  const mockUsuariosRepo = {
    findOne: jest.fn().mockResolvedValue(mockUsuario),
  };

  const mockSalasRepo = {
    findOne: jest.fn().mockResolvedValue(mockSala),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservasService,
        { provide: 'RESERVAS_REPOSITORY', useValue: mockReservasRepo },
        { provide: 'USUARIOS_REPOSITORY', useValue: mockUsuariosRepo },
        { provide: 'SALAS_REPOSITORY', useValue: mockSalasRepo },
      ],
    }).compile();

    service = module.get<ReservasService>(ReservasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all reservas', async () => {
    expect(await service.getReservas()).toEqual(mockReservas);
  });

  it('should create a reserva', async () => {
    const dto = {
      usuario: 1,
      sala: 1,
      diaHoraInicio: new Date(),
      diaHoraFim: new Date(),
      status: 'ativo',
      motivoCancelamento: null,
    };

    mockReservasRepo.create.mockReturnValue(dto);
    mockReservasRepo.save.mockResolvedValue({ id: 1, ...dto });

    const result = await service.createReserva(dto);
    expect(result).toHaveProperty('id');
  });

  it('should delete a reserva', async () => {
    mockReservasRepo.delete.mockResolvedValue({ affected: 1 });

    await expect(service.deleteReserva(1)).resolves.toBeUndefined();
  });
});
