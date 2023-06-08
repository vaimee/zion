import { Default } from './interfaces';
const ZionDefault: Default = {
  auth: {
    jwt: {
      expiresIn: '15m',
      secret: 'something',
    },
  },
  app: {
    apiBase: 'http://localhost:3000',
    host: '0.0.0.0',
    port: 3000,
    version: '',
  },
  introduction: {
    mdns: {
      toPath: '/well-known/wot-thing-description',
      name: 'Zion',
    },
  },
  db: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'zion',
  },
  thingDescriptionEvents: {
    maxEvents: 100,
  },
};

export default Object.freeze(ZionDefault);
