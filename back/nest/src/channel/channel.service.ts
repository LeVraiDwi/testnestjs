import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChannelDto } from './dto';

@Injectable()
export class ChannelService {
  constructor(private prisma: PrismaService) {}

  async addChannel(dto: ChannelDto) {
    const channel =
      await this.prisma.channel.create({
        data: {
          name: dto.name,
        },
      });
    return channel;
  }
}
