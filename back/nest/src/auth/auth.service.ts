import {
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { async } from 'rxjs';
import { rejects } from 'assert';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    ) {}

  async signup(dto: AuthDto) {
    try {
      const hash = await argon.hash(dto.pass);
      const user = await this.prisma.user.create({
        data: {
          username: dto.username,
          email: dto.email,
          pass: hash,
          nickname: dto.nickname,
        },
      });
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Credentials taken',
          );
        }
      }
      return error;
    }
  }

  @HttpCode(HttpStatus.OK)
  async signin(dto: AuthDto) {
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
    if (!user)
      throw new ForbiddenException(
        'Credentials incorrect',
      );
    const pwmatches = await argon.verify(
      user.pass,
      dto.pass,
    );
    if (!pwmatches)
      throw new ForbiddenException(
        'Credentials incorrect',
      );
    return this.signToken(user.id, user.email);
  }

  async signToken (
    userId: number,
    email: string,
 ): Promise <{access_token: string}> {
    const payload = {
      sub: userId,
      email
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(
      payload,
      {
        expiresIn: '15m',
        secret: secret,
      },
    );

      return {
        access_token: token,
      };
  }
}
