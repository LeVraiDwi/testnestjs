import {
	Body,
	Controller,
	Post,
  } from '@nestjs/common';
  import { ApiTags } from '@nestjs/swagger';
  import { AuthService } from './auth.service';
  import { AuthDto } from './dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private authService : AuthService) {}

	@Post('signup')
  	signup(@Body() dto: AuthDto) {
    console.log({
      dto,
    });
    return this.authService.signup(dto);
  }

  @Post('signin')
  	signin(@Body() dto: AuthDto) {
    console.log({
      dto,
    });
    return this.authService.signin(dto);
  }
}

