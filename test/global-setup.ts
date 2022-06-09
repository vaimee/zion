import { execSync } from 'child_process';

import { path as rootPath } from 'app-root-path';
import * as detectPort from 'detect-port';
import dockerCompose from 'docker-compose';

const dbPort = 54310;
const envs = `DB_HOST=localhost DB_PORT=${dbPort} DB_USER=postgres DB_PASSWORD=postgres DB_DATABASE=postgres`;

export default async function () {
  console.time('global-setup');
  console.log('\n');

  // Speed up during development, if already live then do nothing
  const reachablePort = await detectPort(dbPort);
  if (reachablePort !== dbPort) {
    console.warn(`There is already a service listening on port ${dbPort}`);
    console.warn('Skipping the db configuration phase');
    return;
  }

  await dockerCompose.upAll({
    cwd: `${rootPath}/test`,
    log: true,
  });

  await dockerCompose.exec('database', ['sh', '-c', 'until pg_isready ; do sleep 1; done'], {
    cwd: `${rootPath}/test`,
  });

  execSync(`${envs} npm run db:migrate:latest`);

  console.timeEnd('global-setup');
}
