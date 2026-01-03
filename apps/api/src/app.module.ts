import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'nest-keycloak-connect';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './modules/health/health.module';
import { DatabaseModule } from './database/typeorm.module';
import configuration from './config/configuration';
import { validateEnv } from './config/env.validation';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', 'apps/api/.env'],
      load: [configuration],
      validate: validateEnv,
    }),

    // Database module - will automatically skip if DB_ENABLED=false
    DatabaseModule.forRootAsync(),

    HealthModule,
    AuthModule,
    UsersModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
