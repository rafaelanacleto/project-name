import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AccountsService {

  constructor(private readonly prisma: PrismaService) {}

  create(createAccountDto: CreateAccountDto) {
    return 'This action adds a new account';
  }

  findAll() {
    return this.prisma.account.findMany();
  }

  findOne(id: number) {
    return this.prisma.account.findUnique({
      where: { id },
    });
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return this.prisma.account.update({
      where: { id },
      data: updateAccountDto,
    });
  }

  remove(id: number) {
    return this.prisma.account.delete({
      where: { id },
    });
  }
}
