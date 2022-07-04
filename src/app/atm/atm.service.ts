import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountDto } from './dto/account.dto';
import { CpfAccountDto } from './dto/cpf-account.dto';
import { ResponseDto } from './dto/responseDto';
import { AccountEntity } from './entity/account.entity';
import { TransactionEntity } from './entity/transaction.entity';

@Injectable()
export class AtmService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
  ) {}

  async getStatement(cpfAccountDto: CpfAccountDto) {
    // busca CPF na tabela account
    var account = await this.findByCpf(cpfAccountDto.cpf);

    // se não encontrado, já insere o registro na tabela
    if (!account) {
      account = await this.createAccount(cpfAccountDto);
    }

    // monta o objeto de extrato (tabela transactions) e o saldo (contido na tabela account)
    var response = new ResponseDto();
    response.account = account;
    response.transactions = await this.getTransactionsByCpf(cpfAccountDto.cpf);

    return response;
  }

  async getTransactionsByCpf(cpf: string) {
    try {
      return await this.transactionRepository.find({ where: { cpf: cpf } });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findByCpf(_cpf: string) {
    try {
      return await this.accountRepository.findOne({ where: { cpf: _cpf } });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createAccount(cpfAccountDto: CpfAccountDto) {
    return await this.accountRepository.save(
      this.accountRepository.create(cpfAccountDto),
    );
  }

  async deposit(id: string, accountDto: AccountDto) {
    var account = await this.findByCpf(accountDto.cpf);

    if (account) {
      // faz uma soma simples de dois numeros decimais (saldo + montade depositado)
      account.balance = +account.balance + +accountDto.amount;
      await this.accountRepository.save(account);

      return await this.transactionRepository.save(
        this.transactionRepository.create({
          cpf: account.cpf,
          amount: accountDto.amount,
          type: 1,
        }),
      );
    } else {
      throw new NotFoundException();
    }
  }

  async withdraw(id: string, accountDto: AccountDto) {
    var account = await this.findByCpf(accountDto.cpf);

    if (account) {
      // faz uma subtração simples de dois numeros decimais (saldo - montade sacado)
      account.balance = +account.balance - +accountDto.amount;

      // caso o valor seja menor que 0, significa que o montade sacado é superior ao saldo.
      if (account.balance < 0) {
        throw new BadRequestException('No account balance');
      }
      await this.accountRepository.save(account);

      // salva a transação para extrato
      await this.transactionRepository.save(
        this.transactionRepository.create({
          cpf: account.cpf,
          amount: accountDto.amount,
          type: 2,
        }),
      );
    } else {
      throw new NotFoundException();
    }

    return account;
  }
}
