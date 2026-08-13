import type { Account } from '../../accounts/entities/account.entity';

export class Transaction {
  id: string;
  description: string;
  amount: number | string;
  transactionDate: Date;
  type: string;
  category: string;
  createdAt: Date;
  updatedAt?: Date | null;
  accountId: string;
  account?: Account;
}
