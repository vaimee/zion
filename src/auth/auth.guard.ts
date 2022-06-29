import { Injectable } from '@nestjs/common';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';

import { InvalidTokenException } from './../common/exceptions';

@Injectable()
export class AuthGuard extends NestAuthGuard('jwt') {
  public handleRequest<TUser = any>(err: any, user: any, info: any, context: any, status?: any): TUser {
    if (err || !user) {
      throw new InvalidTokenException();
    }
    return user;
  }
}
