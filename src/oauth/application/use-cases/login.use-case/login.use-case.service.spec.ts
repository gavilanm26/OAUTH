import { Test, TestingModule } from '@nestjs/testing';
import { LoginUseCase } from './login.use-case.service';

describe('LoginUseCaseService', () => {
  let service: LoginUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoginUseCase],
    }).compile();

    service = module.get<LoginUseCase>(LoginUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
