import { IsNotEmpty, IsNumber, isUUID, Length, Min } from 'class-validator';

export class AccountDto {
  @IsNotEmpty()
  @Length(11)
  cpf: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  amount: number;
}
