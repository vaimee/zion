import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { DuplicateEmailException, InvalidCredentialsException } from './../common/exceptions';
import { UserRepository } from './../persistence/user.repository';
import { CredentialsDto } from './dto/credentials.dto';
import { RegistrationDto } from './dto/registration.dto';
import { PasswordService } from './password.service';
import { AuthResponse } from './types/auth-response.type';

@Injectable()
export class AuthService {
  public constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(credentials: CredentialsDto): Promise<AuthResponse> {
    const { email, password } = credentials;
    const user = await this.userRepository.findFirst({ where: { email } });
    if (!user) {
      throw new InvalidCredentialsException();
    }

    const isPasswordValid = await this.passwordService.validatePassword(password, user.password);
    if (!isPasswordValid) {
      throw new InvalidCredentialsException();
    }

    const accessToken = this.jwtService.sign({ sub: user.id });
    return { accessToken };
  }

  public async register(registration: RegistrationDto): Promise<AuthResponse> {
    const { email, password } = registration;
    const hashedPassword = await this.passwordService.hashPassword(password);

    const userExist = await this.userRepository.exist({ where: { email } });
    if (userExist) {
      throw new DuplicateEmailException();
    }

    const user = await this.userRepository.create({ email, password: hashedPassword });
    const accessToken = this.jwtService.sign({ sub: user.id });
    return { accessToken };
  }
}
