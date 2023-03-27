import { sign } from 'jsonwebtoken';

import { User } from './../../src/common/models/user';

export function getAccessToken(user: User): string {
  return signAccessToken(user, Date.now() + 60 * 60);
}

export function getExpiredAccessToken(user: User): string {
  return signAccessToken(user, 0);
}

function signAccessToken(user: User, expirationInUnixTime: number): string {
  // TODO: there should not be direct access to process.env (use settings service instead)
  const secret = process.env.ZION_JWT_SECRET || '';
  const token = sign(
    {
      sub: user.id,
      exp: expirationInUnixTime,
    },
    secret,
  );
  return token;
}
