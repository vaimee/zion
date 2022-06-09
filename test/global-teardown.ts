import dockerCompose from 'docker-compose';
import isCI from 'is-ci';

export default async function () {
  console.time('global-teardown');
  console.log('\n');

  if (isCI) {
    dockerCompose.down();
  }

  console.timeEnd('global-teardown');
}
