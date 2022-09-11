# Testbed for transient error

As stated [here](https://github.com/vaimee/zion/issues/11), Zion current has a transient error when a request is made after 15~30 minutes of inactivity - it seems to be a [knex issue](https://github.com/knex/knex/issues/3523). However, it is challenging to replicate this error, as it occurs only in a specific time window. The scripts here  replicate the transient error in a reliable way to assure that it is solved (or not).

## How does the script work?

The test script will create a random user to register a valid Thing Description via POST. Then, after a random amount of minutes of inactivity, the program will make a POST, PUT or GET at Zion. This behavior repeats until the number of `ATTEMPTS` is reached.

Eventual errors will be printed in the STDERR and recorded in the file `error.log`. Each line has the following structure: `timestamp;HTTP-status;full-error-stringified`.

### Executing the script

Make sure that a Zion instance is running before starting the script.

```console
$ npm run test:transient
```

### Configurable variables

The file [test-pooling.ts](test-pooling.ts) holds the configuration variables. The variables are: 
* `ATTEMPTS`: number of attempts of calls that will be performed.
* `MAX_WAITING_TIME`: maximum possible inactivity time in minutes
* `MIN_WAITING_TIME`: minimum possible inactivity time in minutes
* `ZION_URL`: Zion URL (e.g., `http://localhost:3000`)
* `VERBOSE`: if set to `true` will print the time passed every minute and how long it is needed to wait. 
