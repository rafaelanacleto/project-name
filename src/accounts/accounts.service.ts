import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAccountDto: CreateAccountDto) {
    return this.prisma.account.create({
      data: {
        name: createAccountDto.name,
        description: createAccountDto.description ?? '',
        balance: createAccountDto.balance ?? 0,
        currency: createAccountDto.currency ?? 'BRL',
        userId: createAccountDto.userId,
      },
    });
  }

  async findAll() {
    return this.prisma.account.findMany({
      include: {
        transactions: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const account = await this.prisma.account.findUnique({
      where: { id },
      include: {
        transactions: true,
      },
    });

    if (!account) {
      throw new NotFoundException(`Conta com ID ${id} não encontrada.`);
    }

    return account;
  }

  async update(id: string, updateAccountDto: UpdateAccountDto) {
    await this.findOne(id);

    return this.prisma.account.update({
      where: { id },
      data: {
        ...updateAccountDto,
        balance: updateAccountDto.balance ?? undefined,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.account.delete({
      where: { id },
    });
  }
}
