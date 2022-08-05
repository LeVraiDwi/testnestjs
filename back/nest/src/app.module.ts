import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm' 
import { ChannelModule } from './channel/channel.module';
import {config} from './orm.config'
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { MsgModule } from './msg/msg.module';
import { AuthModule } from './auth/auth.module';
import * as argon from 'argon2'
import { ConfigModule } from '@nestjs/config';
import { toUnicode } from 'punycode';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
      PrismaModule,
      ChannelModule,
      UserModule,
      MsgModule,
      AuthModule,
      ConfigModule.forRoot({
        isGlobal: true
      }),
  ],
})
export class AppModule {}
