jest.mock('@keycloak/keycloak-admin-client', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({})),
}));

import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { KeycloakAdminService } from '../auth/keycloak-admin.service';

type KeycloakUsers = {
  find: (options?: { search?: string }) => Promise<unknown[]>;
  findOne: (params: { id: string }) => Promise<unknown>;
  create: (payload: Record<string, unknown>) => Promise<{ id: string }>;
  update: (params: { id: string }, payload: Record<string, unknown>) => Promise<void>;
  del: (params: { id: string }) => Promise<void>;
  resetPassword: (params: {
    id: string;
    credential: { type: string; value: string; temporary: boolean };
  }) => Promise<void>;
};

type KeycloakClient = {
  users: KeycloakUsers;
};

describe('UsersService', () => {
  let service: UsersService;
  let keycloakAdmin: { getClient: jest.Mock<Promise<KeycloakClient>> };
  let usersApi: KeycloakUsers;

  beforeEach(async () => {
    usersApi = {
      find: jest.fn().mockResolvedValue([]),
      findOne: jest.fn().mockResolvedValue({ id: 'user-1' }),
      create: jest.fn().mockResolvedValue({ id: 'user-1' }),
      update: jest.fn().mockResolvedValue(undefined),
      del: jest.fn().mockResolvedValue(undefined),
      resetPassword: jest.fn().mockResolvedValue(undefined),
    };

    keycloakAdmin = {
      getClient: jest.fn().mockResolvedValue({ users: usersApi }),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: KeycloakAdminService, useValue: keycloakAdmin },
      ],
    }).compile();

    service = moduleRef.get(UsersService);
  });

  it('lists users with search filter', async () => {
    await service.listUsers('john');

    expect(keycloakAdmin.getClient).toHaveBeenCalledTimes(1);
    expect(usersApi.find).toHaveBeenCalledWith({ search: 'john' });
  });

  it('lists users without search filter', async () => {
    await service.listUsers();

    expect(usersApi.find).toHaveBeenCalledWith({});
  });

  it('gets a single user', async () => {
    await service.getUser('user-1');

    expect(usersApi.findOne).toHaveBeenCalledWith({ id: 'user-1' });
  });

  it('creates a user and sets password when provided', async () => {
    await service.createUser({
      username: 'john',
      email: 'john@example.com',
      password: 'secret',
      temporary: true,
    });

    expect(usersApi.create).toHaveBeenCalledWith({
      username: 'john',
      email: 'john@example.com',
      enabled: true,
    });
    expect(usersApi.resetPassword).toHaveBeenCalledWith({
      id: 'user-1',
      credential: {
        type: 'password',
        value: 'secret',
        temporary: true,
      },
    });
  });

  it('creates a user without resetting password when not provided', async () => {
    await service.createUser({
      username: 'john',
      email: 'john@example.com',
    });

    expect(usersApi.resetPassword).not.toHaveBeenCalled();
  });

  it('updates a user and resets password when provided', async () => {
    await service.updateUser('user-1', {
      firstName: 'John',
      password: 'new-secret',
      temporary: false,
    });

    expect(usersApi.update).toHaveBeenCalledWith(
      { id: 'user-1' },
      { firstName: 'John' },
    );
    expect(usersApi.resetPassword).toHaveBeenCalledWith({
      id: 'user-1',
      credential: {
        type: 'password',
        value: 'new-secret',
        temporary: false,
      },
    });
  });

  it('deletes a user', async () => {
    await service.deleteUser('user-1');

    expect(usersApi.del).toHaveBeenCalledWith({ id: 'user-1' });
  });
});
