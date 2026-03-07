import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './../src/app.controller';
import { AppService } from './../src/app.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let appController: AppController;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    appController = app.get(AppController);
  });

  afterEach(async () => {
    await app.close();
  });

  it('resolves root greeting via Nest app container', () => {
    expect(appController.getHello()).toBe('Hello World!');
  });
});
