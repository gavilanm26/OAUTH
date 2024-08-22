import { Test, TestingModule } from '@nestjs/testing';
import { FindAllUsersUseCase } from './find-all-users.use-case.service';

describe('FindAllUsersUseCaseService', () => {
  let service: FindAllUsersUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindAllUsersUseCase],
    }).compile();

    service = module.get<FindAllUsersUseCase>(FindAllUsersUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
