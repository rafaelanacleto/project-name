import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionService {
 constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTransactionDto) {
    // 1. Valida se a conta existe
    const accountExists = await this.prisma.account.findUnique({
      where: { id: dto.accountId },
    });

    if (!accountExists) {
      throw new NotFoundException(`Conta com ID ${dto.accountId} não encontrada.`);
    }

    // 2. Cria a transação vinculada à conta
    return this.prisma.transaction.create({
      data: {
        description: dto.description,
        amount: dto.amount,
        type: dto.type,
        category: dto.category ?? '',
        transactionDate: dto.transactionDate ? new Date(dto.transactionDate) : new Date(),
        accountId: dto.accountId,
      },
      include: {
        account: {
          select: { id: true, name: true, currency: true }, // Retorna dados resumidos da conta
        },
      },
    });
  }

  async findAll() {
    return this.prisma.transaction.findMany({
      include: {
        account: {
          select: { id: true, name: true },
        },
      },
      orderBy: { transactionDate: 'desc' },
    });
  }

  async findOne(id: string) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
      include: {
        account: true, // Traz a conta completa relacionada
      },
    });

    if (!transaction) {
      throw new NotFoundException(`Transação com ID ${id} não encontrada.`);
    }

    return transaction;
  }

  async findByAccount(accountId: string) {
    return this.prisma.transaction.findMany({
      where: { accountId },
      orderBy: { transactionDate: 'desc' },
    });
  }

  async update(id: string, dto: UpdateTransactionDto) {
    // Garante que a transação existe antes de atualizar
    await this.findOne(id);

    return this.prisma.transaction.update({
      where: { id },
      data: {
        ...dto,
        transactionDate: dto.transactionDate ? new Date(dto.transactionDate) : undefined,
      },
    });
  }

  async remove(id: string) {
    // Garante que a transação existe antes de deletar
    await this.findOne(id);

    return this.prisma.transaction.delete({
      where: { id },
    });
  }
}
