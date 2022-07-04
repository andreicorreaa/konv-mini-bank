import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AtmService } from './atm.service';
import { AccountDto } from './dto/account.dto';
import { CpfAccountDto } from './dto/cpf-account.dto';

@Controller('api/v1/atm')
export class AtmController {
  constructor(private readonly atmService: AtmService) {}

  /* para simplificar, decidi fazer 3 endpoints, o método POST foi 
  adotado por fugir um pouco dos CRUDS convencionais. */

  // Esse endpoint é o de consulta, inclusão e retorno de saldo + extrato do cpf
  @Post('account')
  async Statement(@Body() body: CpfAccountDto) {
    return await this.atmService.getStatement(body);
  }

  // Esse endpoint deposita na conta do cpf informado
  @Post('deposit/:id')
  @HttpCode(HttpStatus.OK)
  async Deposit(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: AccountDto,
  ) {
    await this.atmService.deposit(id, body);
  }

  // Esse endpoint deposita na conta do cpf informado
  @Post('withdraw/:id')
  @HttpCode(HttpStatus.OK)
  async Withdraw(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: AccountDto,
  ) {
    await this.atmService.withdraw(id, body);
  }
}
