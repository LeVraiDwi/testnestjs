import {
  ApiBody,
  ApiProperty,
} from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

export class UserDto {
  @ApiProperty({
    description: 'the username of the user',
    type: String,
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'the nikname of the user',
    type: String,
  })
  @IsNotEmpty()
  nickname: string;

  @ApiProperty({
    pattern:
      '^([a-zA-Z0-9]{2,5})@([a-zA-Z0-9]{2,5})\\.([a-zA-Z]{2,5})$',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'the pass of the user',
    type: String,
  })
  @IsNotEmpty()
  pass: string;
}
