<img src="./doc/logo.png" width="50%"/>

<a href="https://github.com/vaimee/zion/actions" target="_blank"><img src="https://shields.io/github/workflow/status/vaimee/zion/Main.svg?style=flat-square&logo=github&label=CI" alt="CI status" /></a>
<a href="https://github.com/vaimee/zion/issues" target="_blank"><img src="https://img.shields.io/github/issues/vaimee/zion.svg?style=flat-square" alt="Issues" /></a>
<a href="https://github.com/vaimee/zion/blob/main/LICENSE" target="_blank"><img src="https://img.shields.io/github/license/vaimee/zion.svg?style=flat-square" alt="License" /></a>
<a href="https://discord.gg/6UTJ6HgZ" target="_blank"><img src="https://img.shields.io/badge/Discord-7289DA?style=flat-square&logo=discord&logoColor=white&label=zion" alt="Discord chat" /></a>
<a href="https://www.linkedin.com/company/vaimee/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&color=blue" alt="LinkedIn" /></a>
<a href="https://github.com/vaimee/zion/blob/main/.eslintrc.js" target="_blank"><img src="https://img.shields.io/badge/eslint-3A33D1?style=flat-square&logo=eslint&logoColor=white" alt="eslint support" /></a>
<a href="https://github.com/vaimee/zion/blob/main/.prettierrc.json" target="_blank"><img src="https://img.shields.io/badge/prettier-1A2C34?style=flat-square&logo=prettier&logoColor=F7BA3E" alt="prettier" /></a>
# Zion - A scalable Thing Description Directory
**Overview** 

> In the context of the [W3C Web of Things](https://www.w3.org/WoT/), Thing Description Directories (TDDs) are services that store a set of Thing Descriptions. A TDD offers a set of APIs with CRUD operations on the collection of TDs that it stores. Zion implements the [standard](https://w3c.github.io/wot-discovery/) TDD APIs with a set of extentions to cover the use cases of [VAIMEE](https://vaimee.com/). 

<!-- TABLE OF CONTENTS -->

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#features">Features</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## Features
Zion employes the best open source technologies to provide a scalable TDD service. Zion wants to be [fast](https://github.com/vaimee/tdd-workload-generator), ease to use
and flexible. Currently, Zion supports the following features:
- [Introduction methods](https://w3c.github.io/wot-discovery/#introduction-mech) :
  - DNS-SD
  - Well-known URL
  - CoRE Link Format and `/.well-known/core`
- Standard API:
  - CRUD operations on the collection of TDs
  - JSONPath queries compliant with IETF JSONPath standard [draft 5](https://datatracker.ietf.org/doc/html/draft-ietf-jsonpath-base#section-3.5.8)
  - Pagination support
- Basic support for authentication and authorization
## Getting started

Thank you for considering using Zion in your Web of Things project! 🥳. Zion is still in his early stages and is still in the process of being tested and developed.
However, if you already want to deploy on your own you have three options:

### Clone and docker compose
You can clone the repository and start zion using the following command:
```bash
docker compose up
```
If you want to manually set up your database, you can edit the example [.env](.env) file:
```bash
NODE_ENV=development
SERVER_PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_DATABASE=postgres
JWT_SECRET=abc123
JWT_EXPIRES_IN=15m
```
### Clone and npm 
If you want to start Zion in a development mode, you can clone the repository and run the following command:
```bash
npm ci
npm start
```
**Note**: you have to manually set up your database and configure Zion using the [.env](.env) file.


### Docker compose
You can start zion right away using this simple docker compose file together with your local [.env](./evn) file :
```docker-compose.yml
version: '3.6'
services:
  database:
    image: postgres:14.3-alpine
    environment:
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
      - POSTGRES_DB=${DB_DATABASE}
    container_name: 'zion-postgres-testing'
    ports:
      - '54310:5432'
  zion:
    image: vaimee/zion:latest
    depends_on:
      - database
    entrypoint: ['sh', '-c','npm run db:migrate:latest && node dist/src/main.js']
    ports: 
      - ${SERVER_PORT}:${SERVER_PORT}
    container_name: zion
    environment:
      - NODE_ENV
      - SERVER_PORT
      - DB_HOST=database
      - DB_PORT
      - DB_USER
      - DB_PASSWORD
      - DB_DATABASE
      - JWT_SECRET
      - JWT_EXPIRES_IN
```


## Roadmap

- [ ] Standard API
  * [ ] XPath queries
  * [ ] SPARQL queries supported with an external SPARQL endpoint
  * [x] CoRE introduction method
- [ ] Experimental API
  * [ ] GEO spatial queries
  * [ ] User private TD collection CRUD 
- [ ] Caching layer
- [ ] Cluster mode support
- [ ] Advance authentication
  * [ ] OpenID Connect
  * [ ] OAuth2 Bearer Token

Other minor features are listed in the Issue tracker with the label `feature`.
## Contributing
Thank you for considering to contribute to Zion. Please follow the guidelines in the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## Contact
Lorenzo Gigli - [@hyperloris](https://twitter.com/hyperloris) - [lorenzo.gigli@vaimee.com](mailto://lorenzo.gigli@vaimee.com)

[Cristiano Aguzzi](team.vaimee.com/cristiano) - [@relucri](https://twitter.com/relucri) - [cristiano.aguzzi@vaimee.com](mailto://cristiano.aguzzi@vaimee.com)

[VAIMEE](vaimee.com) - [@MaVaimee](https://twitter.com/MaVaimee) - [info@vaimee.com](mailto://info@vaimee.com)
## Acknowledgments
![DESMO-LD](https://github.com/vaimee/desmo/blob/c763cec12f6c9060a9f1a3335ff4cff60ece3df2/imgs/desmo-logo.png)

Zion is founded by the [DESMO-LD project](https://ontochain.ngi.eu/content/desmo-ld) inside the [ONTOCHAIN](https://ontochain.ngi.eu/) european organization part of the [Next Generation Internet](https://www.ngi.eu/) fund.

