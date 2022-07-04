import { AccountEntity } from '../entity/account.entity';
import { TransactionEntity } from '../entity/transaction.entity';

export class ResponseDto {
  account: AccountEntity;
  transactions: TransactionEntity[];
}
