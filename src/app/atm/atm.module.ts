import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AtmController } from './atm.controller';
import { AtmService } from './atm.service';
import { AccountEntity } from './entity/account.entity';
import { TransactionEntity } from './entity/transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountEntity]),
    TypeOrmModule.forFeature([TransactionEntity]),
  ],
  controllers: [AtmController],
  providers: [AtmService],
  exports: [AtmService],
})
export class AtmModule {}
