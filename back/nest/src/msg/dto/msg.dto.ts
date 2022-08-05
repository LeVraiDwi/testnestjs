import {
  ApiBody,
  ApiProperty,
} from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

export class MsgDto {
  @ApiProperty({
    description: 'source du message',
    type: String,
  })
  @IsNotEmpty()
  src: string;
  @ApiProperty({
    description: 'contenu du message',
    type: String,
  })
  content: string;
}
