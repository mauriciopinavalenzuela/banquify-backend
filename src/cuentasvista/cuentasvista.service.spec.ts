import { Test, TestingModule } from '@nestjs/testing';
import { CuentasvistaService } from './cuentasvista.service';

describe('CuentasvistaService', () => {
  let service: CuentasvistaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CuentasvistaService],
    }).compile();

    service = module.get<CuentasvistaService>(CuentasvistaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
