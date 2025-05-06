import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosService } from '../usuarios.service';
import { Usuario } from '../usuarios.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

describe('UsuariosService', () => {
    let service: UsuariosService;
    let repo: Repository<Usuario>;

    const mockRepository = {
        find: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
        findOne: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsuariosService,
                {
                    provide: 'USUARIOS_REPOSITORY',
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<UsuariosService>(UsuariosService);
        repo = module.get<Repository<Usuario>>('USUARIOS_REPOSITORY');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('deve retornar todos os usuários', async () => {
        const usuarios: Usuario[] = [
            {
                id: 1,
                nome: 'Exemplo',
                email: 'teste@exemplo.com',
                senha: 'hash',
                criadoEm: new Date(),
                tipo: 'admin',
            },
        ];
        mockRepository.find.mockResolvedValue(usuarios);

        const result = await service.getUsuarios();
        expect(result).toEqual(usuarios);
        expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });

    it('deve criar um novo usuário', async () => {
        const dto = {
            nome: 'Novo',
            email: 'novo@teste.com',
            senha: '123456',
            tipo: 'user',
        };
        const senhaHasheada = await bcrypt.hash(dto.senha, 10);
        const usuarioCriado = {
            id: 1,
            ...dto,
            senha: senhaHasheada,
            criadoEm: new Date(),
        };

        mockRepository.create.mockReturnValue(usuarioCriado);
        mockRepository.save.mockResolvedValue(usuarioCriado);

        const result = await service.createUsuarios(dto);
        expect(result.email).toBe(dto.email);
        expect(mockRepository.create).toHaveBeenCalledWith(expect.objectContaining({ email: dto.email }));
        expect(mockRepository.save).toHaveBeenCalled();
    });

    it('deve atualizar um usuário existente', async () => {
        const usuarioExistente = {
            id: 1,
            nome: 'Atual',
            email: 'atual@teste.com',
            senha: 'oldHash',
            criadoEm: new Date(),
            tipo: 'user',
        };

        const update = {
            nome: 'Atualizado',
            senha: 'novaSenha',
        };

        mockRepository.findOne.mockResolvedValue(usuarioExistente);
        mockRepository.save.mockResolvedValue({
            ...usuarioExistente,
            nome: update.nome,
            senha: await bcrypt.hash(update.senha, 10),
        });

        const result = await service.updateUsuarios(1, update);
        expect(result.nome).toBe('Atualizado');
        expect(mockRepository.save).toHaveBeenCalled();
    });
});