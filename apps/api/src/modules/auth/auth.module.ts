import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KeycloakConnectModule } from 'nest-keycloak-connect';
import { KeycloakAdminService } from './keycloak-admin.service';

@Module({
  imports: [
    ConfigModule,
    KeycloakConnectModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        authServerUrl: config.get<string>('keycloak.authServerUrl') ?? '',
        realm: config.get<string>('keycloak.realm') ?? '',
        clientId: config.get<string>('keycloak.apiClientId') ?? '',
        secret: config.get<string>('keycloak.apiClientSecret') ?? '',
        bearerOnly: true,
      }),
    }),
  ],
  providers: [KeycloakAdminService],
  exports: [KeycloakConnectModule, KeycloakAdminService],
})
export class AuthModule {}
