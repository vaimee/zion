import dockerCompose from 'docker-compose';
import isCI from 'is-ci';

export default async function () {
  if (isCI) {
    dockerCompose.down();
  }
}
