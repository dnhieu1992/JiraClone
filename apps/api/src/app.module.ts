import configuration from './config/configuration';
import { Logger, Module, OnApplicationBootstrap } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'nest-keycloak-connect';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HealthModule } from './modules/health/health.module';
import { DatabaseModule } from './database/database.module';
import { validateEnv } from './config/env.validation';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DataSource } from 'typeorm';
import { SpacesModule } from './modules/spaces/spaces.module';
import { IssuesModule } from './modules/issues/issues.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', 'apps/api/.env'],
      load: [configuration],
      validate: validateEnv,
    }),

    // Database module - will automatically skip if DB_ENABLED=false
    DatabaseModule,
    HealthModule,
    AuthModule,
    UsersModule,
    SpacesModule,
    IssuesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule implements OnApplicationBootstrap {
  private readonly logger = new Logger(AppModule.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly dataSource: DataSource,
  ) {}

  onApplicationBootstrap() {
    const host = this.configService.get<string>('DB_HOST');
    const port = this.configService.get<string>('DB_PORT');
    const databaseName = this.configService.get<string>('DB_NAME');
    if (this.dataSource.isInitialized) {
      this.logger.log(
        `✅ DB connected: mysql://${host}:${port}/${databaseName}`,
      );
    } else {
      this.logger.error(
        `❌ DB not initialized: mysql://${host}:${port}/${databaseName}`,
      );
    }
  }
}
