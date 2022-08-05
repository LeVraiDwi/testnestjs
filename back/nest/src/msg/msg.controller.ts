import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MsgDto } from './dto';
import { MsgService } from './msg.service';

@ApiTags('msg')
@Controller('msg')
export class MsgController {
  constructor(private msgService: MsgService) {}

  @Post('msg')
  addMsg(@Body() dto: MsgDto) {
    console.log('msg', {
      dto,
    });
    return this.msgService.addMsg(dto);
  }
}
