import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  KeycloakConnectModule,
  KeycloakConnectOptions,
  TokenValidation,
} from 'nest-keycloak-connect';
import { KeycloakAdminService } from './keycloak-admin.service';

@Module({
  imports: [
    ConfigModule,
    KeycloakConnectModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService): KeycloakConnectOptions => {
        const secret = config.get<string>('keycloak.apiClientSecret');

        return {
          authServerUrl: config.get<string>('keycloak.authServerUrl') ?? '',
          realm: config.get<string>('keycloak.realm') ?? '',
          clientId: config.get<string>('keycloak.apiClientId') ?? '',
          bearerOnly: true,
          // Use JWKS (offline) validation for public clients.
          tokenValidation: TokenValidation.OFFLINE,
          ...(secret ? { secret } : {}),
        } as KeycloakConnectOptions;
      },
    }),
  ],
  providers: [KeycloakAdminService],
  exports: [KeycloakConnectModule, KeycloakAdminService],
})
export class AuthModule {}
