

# [1.0.0-alpha.3](https://github.com/vaimee/desmo-ld/compare/v1.0.0-alpha.2...v1.0.0-alpha.3) (2023-05-24)


### Bug Fixes

* **Dockerfile:** use npm for starting the application ([9503bdf](https://github.com/vaimee/desmo-ld/commit/9503bdf3a709fd310cfba267b4cca378d2139ffe))

# [1.0.0-alpha.1](https://github.com/vaimee/desmo-ld/compare/v1.0.0-alpha.0...v1.0.0-alpha.1) (2022-10-28)


### Bug Fixes

* add correct path to load .env file for knex ([d147681](https://github.com/vaimee/desmo-ld/commit/d1476818d10c83194665a9090fa85939b538d174))
* change env path from config/envs to root ([624572b](https://github.com/vaimee/desmo-ld/commit/624572b62010857e2246330b8a73ac9630f6e150))
* remove duplicate .env (it is in src/config/env now) ([2e13979](https://github.com/vaimee/desmo-ld/commit/2e13979e5cda6b11396239ab23de832419d5f911))
* remove unintentional assertion done as a simple test ([559c1e3](https://github.com/vaimee/desmo-ld/commit/559c1e379f0e47c278e4a6d4f26151882b944b02))
* set the knex connection pool from 0 to 10 ([8a13a30](https://github.com/vaimee/desmo-ld/commit/8a13a30f8a214c336a4c6257732d928f3284706b)), closes [#11](https://github.com/vaimee/desmo-ld/issues/11)
* use /.well-known/wot instead of /well-known/wot ([4b4b768](https://github.com/vaimee/desmo-ld/commit/4b4b768c08697a432e48eb22daaf13067a3d5bbb)), closes [#6](https://github.com/vaimee/desmo-ld/issues/6)


### Features

* add /.well-known/core route ([66597f0](https://github.com/vaimee/desmo-ld/commit/66597f0095c2d0acdeda6aec22469464eda7e1e7))
* implement security bootstrapping ([7534fbf](https://github.com/vaimee/desmo-ld/commit/7534fbf3e6d6db26f4ab3e7c97fc820a1cd459cb))
* introduce pool connection timeout ([f4d7caf](https://github.com/vaimee/desmo-ld/commit/f4d7caf7cea1f03c679bebf0d4cc97f11bd67099))
* NODE_ENV variable determines which .env file will be loaded ([f3bee24](https://github.com/vaimee/desmo-ld/commit/f3bee2464c908171163c90f8c06b8a1d98c55ae7))