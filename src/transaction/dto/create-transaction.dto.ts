import { IsNotEmpty, IsNumber, IsString, IsUUID, IsEnum, IsDateString, IsOptional } from 'class-validator';


export enum TransactionType {
  Income = 'Income',
  Expense = 'Expense',
}

export class CreateTransactionDto {
 @IsString()
  @IsNotEmpty()
  description: string | undefined;

  @IsNumber()
  @IsNotEmpty()
  amount: number | undefined;

  @IsEnum(TransactionType, { message: 'O tipo deve ser Income ou Expense' })
  @IsNotEmpty()
  type: TransactionType | undefined;

  @IsString()
  @IsOptional()
  category?: string;

  @IsDateString()
  @IsOptional()
  transactionDate?: string; // Aceita string ISO 8601 (ex: "2026-08-13T10:00:00Z")

  @IsUUID()
  @IsNotEmpty()
  accountId: string | undefined; // ID da conta vinculada
}
