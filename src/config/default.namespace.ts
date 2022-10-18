//* Discussion: the linter suggest to use MODULES. I believe that namespace are more suitable for this case:
//* 1. The name NAMESPACE better describes the content of the data struture and its use;
//* 2. I do not want to mix the concept of NestJS namespaces and plain ts namespaces;
//* 2. A named JavaScript objects in the global namespace is what we need.
//* Note: I rolled back to use namespaces to maintain consistency with the linter

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
