![DESMO-LD](https://github.com/vaimee/desmo/blob/c763cec12f6c9060a9f1a3335ff4cff60ece3df2/imgs/desmo-logo.png)
# DESMO-LD Thing Description Directory 
**Overview** 

In the context of the W3C Web of Things, Thing Description Directories (TDDs) are services that store a set of Thing Descriptions. A TDD offers a set of APIs with CRUD operation on the collection of TDs that it stores. In DESMO-LD TDDs play a crucial role as they are the main search engine for IoT devices outside the chain. Open search engine and repository for Thing Descriptions. Device owners or third parties may deploy their own TDDs with their own access policies and join the distributed network of Desmo-LD. The DESMO-LD HUB is a registry of TDDs that can be queried using the Desmo-LD iExecDOracle (./demo-contracts/README.md).  

The requirements for joining the network are:
- Having a W3C compliant API
- Registering in the Desmo-LD HUB
- Optionally, support Desmo-LD advanced discovery APIs for geolocation based queries.

Note that the DESMO-LD TDD will not use the DESMO-LD HUB directly, but its role in the system is bound to DESMO-LD with the registration phase that can be handled automatically or by human interaction.
