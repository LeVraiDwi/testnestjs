import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MsgDto } from './dto';

@Injectable()
export class MsgService {
  constructor(private prisma: PrismaService) {}

  async addMsg(dto: MsgDto) {
    const msg = await this.prisma.msg.create({
      data: {
        src: dto.src,
        content: dto.content,
      },
    });
    return msg;
  }
}
