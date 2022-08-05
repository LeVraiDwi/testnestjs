import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChannelService } from './channel.service';
import { ChannelDto } from './dto';

@ApiTags('channel')
@Controller('channel')
export class ChannelController {
  constructor(
    private channelService: ChannelService,
  ) {}

  @Post('addChannel')
  addChannel(@Body() dto: ChannelDto) {
    console.log({
      dto,
    });
    return this.channelService.addChannel(dto);
  }
}
