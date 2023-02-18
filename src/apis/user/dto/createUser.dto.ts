import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateUserInput {
  @ApiProperty({
    example: 'leo kim',
    description: 'name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'leo@gmail.com',
    description: 'email',
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: 18,
    description: 'age',
  })
  @IsNumber({
    maxDecimalPlaces: 0,
  })
  age: number;

  @ApiProperty({
    example: 'user',
    description: 'role',
  })
  @IsString()
  role: string;

  @ApiProperty({
    example: 'pwd1234',
    description: 'password',
  })
  @IsString()
  password: string;
}

export class CreateUserOutput {
  @ApiProperty({
    example: 'leo kim',
    description: 'name',
  })
  name: string;

  @ApiProperty({
    example: 18,
    description: 'age',
  })
  age: number;

  @ApiProperty({
    example: 'user',
    description: 'role',
  })
  role: string;

  @ApiProperty({
    example: 'pwd1234',
    description: 'password',
  })
  password: string;
}
