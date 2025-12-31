import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import KcAdminClient from '@keycloak/keycloak-admin-client';

@Injectable()
export class KeycloakAdminService {
  private readonly client: KcAdminClient;

  constructor(private readonly config: ConfigService) {
    this.client = new KcAdminClient({
      baseUrl: this.config.get<string>('keycloak.authServerUrl'),
      realmName: this.config.get<string>('keycloak.realm'),
    });
  }

  private async authenticate(): Promise<void> {
    await this.client.auth({
      grantType: 'client_credentials',
      clientId: this.config.get<string>('keycloak.adminClientId') ?? '',
      clientSecret: this.config.get<string>('keycloak.adminClientSecret') ?? '',
    });

    this.client.setConfig({
      realmName: this.config.get<string>('keycloak.realm'),
    });
  }

  async getClient(): Promise<KcAdminClient> {
    await this.authenticate();
    return this.client;
  }
}
