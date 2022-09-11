import { randomInt } from '../utils/random';
import { PoollingRequest } from './pooling-requests';
import { RequestMode } from './request-mode';

const ATTEMPTS = 10;
const MAX_WAITING_TIME = 30;
const MIN_WAITING_TIME = 15;
const ZION_URL = `http://localhost:3000`;
const VERBOSE = true;

const startTest = async () => {
  for (let i = 0; i < ATTEMPTS; i++) {
    const poollingRequest = new PoollingRequest(ZION_URL);
    const inactivityTime = randomInt(MIN_WAITING_TIME, MAX_WAITING_TIME + 1);
    console.log(`Starting attempt #${i + 1} of ${ATTEMPTS}`);
    await poollingRequest.startInactivityMode(RequestMode.RANDOM, inactivityTime, VERBOSE);
  }
};

startTest().then(console.log).catch(console.log);
