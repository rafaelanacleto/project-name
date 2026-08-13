import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Ativa a validação automática para todos os DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Remove propriedades que não estão no DTO
    forbidNonWhitelisted: true, // Retorna erro se enviarem propriedades não permitidas
    transform: true, // Converte tipos automaticamente (ex: string para number)
  }));
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
