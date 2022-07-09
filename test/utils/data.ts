/**
 * Returns a numerical value that is 99.99% unique in a multi-process test runner
 * where the state/DB is clean-up at least once a day
 */
export function getShortUnique(): string {
  const now = new Date();
  // We add this weak random to cover the case where two tests started at the very same millisecond
  const aBitOfMoreSalt = Math.ceil(Math.random() * 99);
  return `${process.pid}${aBitOfMoreSalt}${now.getMilliseconds()}`;
}

export function getUniqueEmail(): string {
  return `email-${getShortUnique()}@test.com`;
}

export function getThingDescriptionIdFromHeaderLocation(location: string): string {
  return location.split('/').pop() || '';
}
