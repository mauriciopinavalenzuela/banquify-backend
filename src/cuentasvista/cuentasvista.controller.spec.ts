import { Test, TestingModule } from '@nestjs/testing';
import { CuentasvistaController } from './cuentasvista.controller';
import { CuentasvistaService } from './cuentasvista.service';

describe('CuentasvistaController', () => {
  let controller: CuentasvistaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CuentasvistaController],
      providers: [CuentasvistaService],
    }).compile();

    controller = module.get<CuentasvistaController>(CuentasvistaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
