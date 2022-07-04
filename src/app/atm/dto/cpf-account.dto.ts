import { IsNotEmpty, Length } from 'class-validator';

export class CpfAccountDto {
  @IsNotEmpty()
  @Length(11)
  cpf: string;
}
