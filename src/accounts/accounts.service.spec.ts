import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from './accounts.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AccountsService', () => {
  let service: AccountsService;
  let prisma: {
    account: {
      create: jest.Mock;
      findMany: jest.Mock;
      findUnique: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
    };
  };

  beforeEach(async () => {
    prisma = {
      account: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
        {
          provide: PrismaService,
          useValue: prisma,
        },
      ],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an account', async () => {
    const dto = {
      name: 'Conta principal',
      description: 'Conta para despesas',
      balance: 150.5,
      currency: 'BRL',
      userId: 'user-1',
    };

    const createdAccount = {
      id: 'acc-1',
      ...dto,
      createdAt: new Date(),
      updatedAt: null,
    };

    prisma.account.create.mockResolvedValue(createdAccount);

    await expect(service.create(dto)).resolves.toEqual(createdAccount);
    expect(prisma.account.create).toHaveBeenCalledWith({
      data: {
        name: dto.name,
        description: dto.description,
        balance: dto.balance,
        currency: dto.currency,
        userId: dto.userId,
      },
    });
  });
});
