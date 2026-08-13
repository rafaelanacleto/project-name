import type { Transaction } from '../../transaction/entities/transaction.entity';

export class Account {
  id: string;
  name: string;
  description: string;
  balance: number | string;
  currency: string;
  userId: string;
  createdAt: Date;
  updatedAt?: Date | null;
  transactions?: Transaction[];
}
