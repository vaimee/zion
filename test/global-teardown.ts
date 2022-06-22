import dockerCompose from 'docker-compose';
import isCI from 'is-ci';

import { closeDatabase, emptyDatabase } from './utils/database';

export default async function () {
  if (isCI) {
    dockerCompose.down();
  } else {
    if (Math.ceil(Math.random() * 10) === 10) {
      await emptyDatabase();
    }
  }
  await closeDatabase();
}
