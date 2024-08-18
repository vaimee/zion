<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./doc/logo-dark.png">
  <source media="(prefers-color-scheme: light)" srcset="./doc/logo.png">
  <img width="50%" alt="Shows a abstract star with on the right Zion name" src="./doc/logo.png">
</picture>

<a href="https://github.com/vaimee/zion/actions" target="_blank"><img src="https://img.shields.io/github/actions/workflow/status/vaimee/zion/main.yml?branch=main&style=flat-square&logo=github&label=CI" alt="CI status" /></a>
<a href="https://github.com/vaimee/zion/issues" target="_blank"><img src="https://img.shields.io/github/issues/vaimee/zion.svg?style=flat-square" alt="Issues" /></a>
<a href="https://github.com/vaimee/zion/blob/main/LICENSE" target="_blank"><img src="https://img.shields.io/github/license/vaimee/zion.svg?style=flat-square" alt="License" /></a>
<a href="https://discord.gg/6UTJ6HgZ" target="_blank"><img src="https://img.shields.io/badge/Discord-7289DA?style=flat-square&logo=discord&logoColor=white&label=zion" alt="Discord chat" /></a>
<a href="https://www.linkedin.com/company/vaimee/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&color=blue" alt="LinkedIn" /></a>
<a href="https://github.com/vaimee/zion/blob/main/.eslintrc.js" target="_blank"><img src="https://img.shields.io/badge/eslint-3A33D1?style=flat-square&logo=eslint&logoColor=white" alt="eslint support" /></a>
<a href="https://github.com/vaimee/zion/blob/main/.prettierrc.json" target="_blank"><img src="https://img.shields.io/badge/prettier-1A2C34?style=flat-square&logo=prettier&logoColor=F7BA3E" alt="prettier" /></a>
# Zion - A scalable Thing Description Directory
**Overview** 

> In the context of the [W3C Web of Things](https://www.w3.org/WoT/), Thing Description Directories (TDDs) are services that store a set of Thing Descriptions. A TDD offers a set of APIs with CRUD operations on the collection of TDs that it stores. Zion implements the [standard](https://w3c.github.io/wot-discovery/) TDD APIs with a set of extensions to cover the use cases of [VAIMEE](https://vaimee.com/). 

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
    <li><a href="#publication">Publication</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## Features
Zion employs the best open-source technologies to provide a scalable TDD service. Zion wants to be [fast](https://github.com/vaimee/tdd-workload-generator), ease to use
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

Thank you for considering using Zion in your Web of Things project! 🥳. Zion is still in its early stages and it is still in the process of being tested and developed.
However, if you already want to deploy on your own you have three options:
- [Use docker-compose locally](#clone-and-docker-compose)
- [Clone and npm](#clone-and-npm)
- [Use it in your deployment](#docker-compose)

### Clone and docker compose
You can clone the repository and start Zion using the following command:
```bash
docker compose up
```
If you want to manually set up your database, you can edit the example [.env](.env) file:
```bash
ZION_NODE_ENV=development
# ZION_SERVER_PORT specifies the port number on which the Zion server will listen for incoming requests.
ZION_SERVER_PORT=3000
# ZION_DB_HOST specifies the host address where the Zion target database is located.
ZION_DB_HOST=localhost
# ZION_DB_PORT specifies the port number on which the Zion target database server is listening.
ZION_DB_PORT=5432
# ZION_DB_USER specifies the username to connect to the Zion target database.
ZION_DB_USER=zion
# ZION_DB_PASSWORD specifies the password for the Zion target database user.
ZION_DB_PASSWORD=zion
# ZION_DB_DATABASE specifies the name of the Zion target database.
ZION_DB_DATABASE=zion
# ZION_JWT_SECRET specifies the secret key used for JSON Web Token (JWT) encryption and decryption.
ZION_JWT_SECRET=abc123
# ZION_JWT_EXPIRES_IN specifies the duration for which a JWT token remains valid.
# Examples: "15m" (15 minutes), "1h" (1 hour), "7d" (7 days), etc.
ZION_JWT_EXPIRES_IN=15m
#ZION_API_BASE specifies the base URL of the Zion API.
ZION_API_BASE=http://localhost:3000
```
### Clone and npm 
> **Requirements** Node.js v16+

If you want to start Zion in development mode, you can clone the repository and run the following command:
```bash
npm ci
npm start
```
**Note**: you have to manually set up your database and configure Zion using the [.env](.env) file.


### Docker compose
You can start Zion right away using this simple docker compose file together with your local [.env](./evn) file :
```docker-compose.yml
version: '3.6'
services:
  database:
    image: postgres:14.3-alpine
    environment:
      - POSTGRES_USER=zion
      - POSTGRES_PASSWORD=zion
      - POSTGRES_DB=zion
    container_name: 'zion-postgres'
  zion:
    image: vaimee/zion:latest
    depends_on:
      - database
    entrypoint: ['sh', '-c','npm run db:migrate:latest && npm run start:prod']
    ports: 
      - 3000:3000
    environment:
      - ZION_NODE_ENV=production
      - ZION_SERVER_PORT=3000
      # Using task name as explained in https://github.com/vaimee/zion/issues/11#issuecomment-1434457337
      - ZION_DB_HOST=tasks.database
      - ZION_DB_PORT=5432
      - ZION_DB_USER=zion
      - ZION_DB_PASSWORD=zion
      - ZION_DB_DATABASE=zion
      - ZION_JWT_SECRET=change-me
      - ZION_JWT_EXPIRES_IN=7d
    container_name: zion
```
## Publication

The full paper, available [here](https://ieeexplore.ieee.org/document/10454685), should be cited if this repository is utilized for research, thesis, or industrial activities involving publications.

```
C. Aguzzi, L. Gigli, I. Zyrianoff and L. Roffia, "ZION: A Scalable W3C Web of Things Directory," 2024 IEEE 21st Consumer Communications & Networking Conference (CCNC), Las Vegas, NV, USA, 2024, pp. 1-6, doi: 10.1109/CCNC51664.2024.10454685.
```

```
@INPROCEEDINGS{10454685,
  author={Aguzzi, Cristiano and Gigli, Lorenzo and Zyrianoff, Ivan and Roffia, Luca},
  booktitle={2024 IEEE 21st Consumer Communications & Networking Conference (CCNC)}, 
  title={ZION: A Scalable W3C Web of Things Directory}, 
  year={2024},
  volume={},
  number={},
  pages={1-6},
  doi={10.1109/CCNC51664.2024.10454685}
}
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
Thank you for considering contributing to Zion. Please follow the guidelines in the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## Contact
Lorenzo Gigli - [@hyperloris](https://twitter.com/hyperloris) - [lorenzo.gigli@vaimee.com](mailto://lorenzo.gigli@vaimee.com)

[Cristiano Aguzzi](https://team.vaimee.com/cristiano) - [@relucri](https://twitter.com/relucri) - [cristiano.aguzzi@vaimee.com](mailto://cristiano.aguzzi@vaimee.com)

[VAIMEE](https://vaimee.com) - [@MaVaimee](https://twitter.com/MaVaimee) - [info@vaimee.com](mailto://info@vaimee.com)
## Acknowledgments
![DESMO-LD](https://github.com/vaimee/desmo/blob/c763cec12f6c9060a9f1a3335ff4cff60ece3df2/imgs/desmo-logo.png)

Zion is founded by the [DESMO-LD project](https://ontochain.ngi.eu/content/desmo-ld) inside the [ONTOCHAIN](https://ontochain.ngi.eu/) European organization part of the [Next Generation Internet](https://www.ngi.eu/) fund.

