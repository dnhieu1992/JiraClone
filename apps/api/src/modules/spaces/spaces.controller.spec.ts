import { Request } from 'express';
import { SpacesController } from './spaces.controller';
import { SpacesService } from './spaces.service';

type AuthRequest = Request & { user?: { sub?: string } };

function createRequest(options: {
  userSub?: string;
  headerUserId?: string;
}): AuthRequest {
  return {
    user: options.userSub ? { sub: options.userSub } : undefined,
    headers: options.headerUserId ? { 'x-user-id': options.headerUserId } : {},
  } as AuthRequest;
}

describe('SpacesController', () => {
  let controller: SpacesController;
  let service: jest.Mocked<SpacesService>;

  beforeEach(() => {
    service = {
      createSpace: jest.fn(),
      listSpaces: jest.fn(),
      getSpace: jest.fn(),
      listColumns: jest.fn(),
      updateSpace: jest.fn(),
      createColumn: jest.fn(),
      reorderColumns: jest.fn(),
      updateColumn: jest.fn(),
      deleteColumn: jest.fn(),
    } as unknown as jest.Mocked<SpacesService>;

    controller = new SpacesController(service);
  });

  it('uses req.user.sub when calling listSpaces', async () => {
    service.listSpaces.mockResolvedValue([{ id: 'space-1' }] as never);

    await controller.listSpaces(createRequest({ userSub: 'user-sub' }));

    expect(service.listSpaces.mock.calls[0]).toEqual(['user-sub']);
  });

  it('falls back to x-user-id header for getSpace', async () => {
    service.getSpace.mockResolvedValue({ id: 'space-1' } as never);

    await controller.getSpace(
      createRequest({ headerUserId: 'header-user' }),
      'space-1',
    );

    expect(service.getSpace.mock.calls[0]).toEqual(['header-user', 'space-1']);
  });

  it('falls back to anonymous when identity is missing', async () => {
    service.listColumns.mockResolvedValue([] as never);

    await controller.listColumns(createRequest({}), 'space-1');

    expect(service.listColumns.mock.calls[0]).toEqual(['anonymous', 'space-1']);
  });
});
