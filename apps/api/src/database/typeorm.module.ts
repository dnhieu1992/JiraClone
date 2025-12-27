import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({})
export class DatabaseModule {
  static forRootAsync(): DynamicModule {
    const dbEnabled = process.env.DB_ENABLED !== 'false';

    if (!dbEnabled) {
      console.log(
        '⚠️  Database is disabled (DB_ENABLED=false). App will run without database.',
      );
      // Trả về module rỗng - không load TypeORM
      return {
        module: DatabaseModule,
        imports: [],
      };
    }

    return {
      module: DatabaseModule,
      imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          useFactory: (config: ConfigService): TypeOrmModuleOptions => {
            return {
              type: 'mysql',
              host: config.get<string>('DB_HOST') || 'localhost',
              port: Number(config.get<string>('DB_PORT') || 3306),
              username: config.get<string>('DB_USER') || 'root',
              password: config.get<string>('DB_PASS') || '',
              database: config.get<string>('DB_NAME') || 'jira',

              autoLoadEntities: true,

              synchronize: config.get<string>('DB_SYNC') === 'true',
              logging: config.get<string>('DB_LOGGING') === 'true',

              retryAttempts: 1,
              retryDelay: 1000,
            };
          },
        }),
      ],
    };
  }
}
