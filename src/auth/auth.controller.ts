import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';
import { RegistrationDto } from './dto/registration.dto';
import { AuthResponse } from './types/auth-response.type';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post()
  public login(@Body() credentials: CredentialsDto): Promise<AuthResponse> {
    return this.authService.login(credentials);
  }

  @Post('register')
  public register(@Body() registration: RegistrationDto): Promise<AuthResponse> {
    return this.authService.register(registration);
  }
}
