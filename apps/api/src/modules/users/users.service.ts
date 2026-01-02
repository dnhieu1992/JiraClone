import { Injectable } from '@nestjs/common';
import { KeycloakAdminService } from '../auth/keycloak-admin.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly keycloakAdmin: KeycloakAdminService) {}

  async listUsers(search?: string) {
    const client = await this.keycloakAdmin.getClient();
    return client.users.find(search ? { search } : {});
  }

  async createUser(dto: CreateUserDto) {
    const client = await this.keycloakAdmin.getClient();
    const { password, temporary, ...user } = dto;
    const created = await client.users.create({
      ...user,
      enabled: dto.enabled ?? true,
    });

    if (password) {
      await client.users.resetPassword({
        id: created.id,
        credential: {
          type: 'password',
          value: password,
          temporary: temporary ?? false,
        },
      });
    }

    return { id: created.id };
  }
}
