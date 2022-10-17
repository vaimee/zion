export namespace Default {
  export namespace App {
    export const API_BASE = 'http://localhost:3000';
    export const HOST = '0.0.0.0';
    export const PORT = 3000;
  }

  export namespace DB {
    export const TYPE = 'postgres';
    export const HOST = 'localhost';
    export const PORT = 5432;
    export const USER = 'postgres';
    export const PASSWORD = 'postgres';
  }

  export namespace Jwt {
    export const SECRET = 'something';
    export const EXPIRES_IN = '15m';
  }

  export namespace MDNS {
    export const TO_PATH = '/well-known/wot-thing-description';
    export const NAME = 'zion';
  }

  export namespace TDLifecycleEvent {
    export const MAX_EVENTS = 100;
  }
}
