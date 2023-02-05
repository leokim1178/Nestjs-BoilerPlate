import { ApiProperty } from '@nestjs/swagger';

export class CreateUserInput {
  @ApiProperty({
    example: 'leo kim',
    description: 'name',
  })
  name: string;
  @ApiProperty({
    example: 'leo@gmail.com',
    description: 'email',
  })
  email: string;
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
