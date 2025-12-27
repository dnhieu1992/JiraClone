import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './modules/health/health.module';
import { DatabaseModule } from './database/typeorm.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // Database module - sẽ tự động skip nếu DB_ENABLED=false
    DatabaseModule.forRootAsync(),

    HealthModule,
  ],
})
export class AppModule {}
