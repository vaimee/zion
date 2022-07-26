<img src="./doc/logo.png" width="50%"/>

![](https://shields.io/github/workflow/status/vaimee/zion/Main.svg?style=flat-square&logo=github&label=CI) 
![](https://img.shields.io/github/issues/vaimee/zion.svg?style=flat-square) 
![](https://img.shields.io/github/license/vaimee/zion.svg?style=flat-square)
![](https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&color=blue)
![](https://img.shields.io/badge/eslint-3A33D1?style=flat-square&logo=eslint&logoColor=white)
![](https://img.shields.io/badge/prettier-1A2C34?style=flat-square&logo=prettier&logoColor=F7BA3E)
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
Zion employes the best open source technologies to provide a scalable TDD service. Currently, Zion supports the following features:
- [Introduction methods](https://w3c.github.io/wot-discovery/#introduction-mech) :
  - DNS-SD
  - Well-known URL
- Standard API:
  - CRUD operations on the collection of TDs
  - JSONPath queries compliant with IETF JSONPath standard [draft 5](https://datatracker.ietf.org/doc/html/draft-ietf-jsonpath-base#section-3.5.8)
  - Pagination support
- Basic support for authentication and authorization
## Getting started
## Roadmap

- [ ] Standard API
  * [ ] XPath queries
  * [ ] SPARQL queries supported with an external SPARQL endpoint
  * [ ] CoRE introduction method
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
Tank you for considering to contribute to Zion. Please follow the guidelines in the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## Contact
Lorenzo Gigli - [@hyperloris](https://twitter.com/hyperloris) - [lorenzo.gigli@vaimee.com](mailto://lorenzo.gigli@vaimee.com)

[Cristiano Aguzzi](team.vaimee.com/cristiano) - [@relucri](https://twitter.com/relucri) - [cristiano.aguzzi@vaimee.com](mailto://cristiano.aguzzi@vaimee.com)

[VAIMEE](vaimee.com) - [@MaVaimee](https://twitter.com/MaVaimee) - [info@vaimee.com](mailto://info@vaimee.com)
## Acknowledgments
![DESMO-LD](https://github.com/vaimee/desmo/blob/c763cec12f6c9060a9f1a3335ff4cff60ece3df2/imgs/desmo-logo.png)

Zion is founded by the [DESMO-LD project](https://ontochain.ngi.eu/content/desmo-ld) inside the [ONTOCHAIN](https://ontochain.ngi.eu/) european organization part of the [Next Generation Internet](https://www.ngi.eu/) fund.

