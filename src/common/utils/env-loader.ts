import { existsSync } from 'fs';
import { resolve } from 'node:path';

export function getEnvFilePath(relativePath: string): string {
  const env: string | undefined = process.env.NODE_ENV;
  const envPath: string = resolve(`${relativePath}/${env}.env`);
  const filePath = existsSync(envPath) ? envPath : resolve(`${relativePath}/.env`);
  return filePath;
}
