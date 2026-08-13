import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { AccountsModule } from './accounts/accounts.module';
import { PrismaModule } from './prisma/prisma.module';
import { TransactionModule } from './transaction/transaction.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [AccountsModule, PrismaModule, TransactionModule, NotificationModule],
  controllers: [AppController, CatsController],
  providers: [AppService],
})
export class AppModule {}
