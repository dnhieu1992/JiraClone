// Ensure crypto is available globally (required for @nestjs/typeorm)
import { webcrypto } from 'crypto';
if (typeof globalThis.crypto === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  (globalThis as any).crypto = webcrypto;
}

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      // Cho phép app chạy ngay cả khi có lỗi trong quá trình khởi tạo module
      abortOnError: false,
    });

    app.enableCors({
      origin: ['http://localhost:3000'],
      credentials: true,
    });

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );

    await app.listen(process.env.PORT || 3001, '0.0.0.0');
    console.log(
      `✅ Application is running on: http://localhost:${process.env.PORT || 3001}`,
    );
    console.log(
      `⚠️  Note: Database connection may fail, but app will still run`,
    );
  } catch (error: unknown) {
    // Log error nhưng không crash app
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(
      '⚠️  Warning: Error during app initialization:',
      errorMessage,
    );
    if (
      errorMessage.includes('ECONNREFUSED') ||
      errorMessage.includes('database')
    ) {
      console.log(
        '💡 Tip: App is running without database. Start MySQL or set DB_ENABLED=false in .env',
      );
    }
    // Vẫn khởi động app nếu có thể
  }
}
void bootstrap();
