# API Tests for WAES Backend

This is the api tests project for WAES Backend.

This project has the following features:

  - Health Check feature;
  - Possibility of changing the full address of the server, including the port;
  - BDD-Styled report;
  - Coverage of 94 scenarios, 439 steps;

# Table of Contents
1. [Setup](#setup)
2. [Run Tests and Open Report](#run-tests-and-open-report)
3. [Changing host address and IP](#changing-host-address-and-ip)
4. [Health Check](#health-check)
  

# Setup

In order to run the tests, you need to have NodeJS installed.

[Node.js] - Node.js is an open-source, cross-platform, JavaScript runtime environment. It executes JavaScript code outside of a browser.

  1. Download NodeJS installer.
  2. In installation, check the option to setup NodeJS in your PATH (an option will appear in installation). 
  3. Download this project.
  4. Make sure you have connection to the internet and run the following command:
```sh
$ npm install
```

Once you have this project and NodeJS installed, there are some features you can use.

# Run Tests and Open Report

You can run the tests and, as soon as the tests are finished, it will open the report on your default browser.
```sh
$ npm run test-and-report
```
The report will be generated at `test/report` folder, inside the project.

If you just want to run the test without generating report, run the following command:
```sh
$ npm test
```

After that, if you want to generate report regarding to your `most recent running`, run the following command:

```sh
$ npm run report
```

# Changing host address and IP
You have the option to point this test to other environment, by changing the ip address and/or port.
> After running the command to change IP or PORT, you can run the tests by the command described above.

If you want to change the port, run the following command, changing `<IP>` to the desired address:
```sh
$ npm config set api-tests-for-waes-backend:ip <IP>
```

If you want to change the port, run the following command, changing `<PORT>` to the desired port:
```sh
$ npm config set api-tests-for-waes-backend:port <PORT>
```

# Health Check
If you want to use this code in a Continuous Integration/Delivery pipeline, you can use the `health check` feature. It will indicate if the system is ready for testing or not.

You can use this feature by the following method:
```sh
$ npm run health
```

Example of a good behavior:
```
$ npm run health

> api-tests-for-waes-backend@1.0.0 health 
> node health_check.js

System is running in the following address: http://localhost:8081
```

Example of a behavior where health check fails:

```
$ npm run health                                             

> api-tests-for-waes-backend@1.0.0 health
> node health_check.js


System is not working in the address http://localhost:8080

 You can change the ip using the following command:      
npm config set api-tests-for-waes-backend:ip <IP>        

 You can change the ip using the following command:      
npm config set api-tests-for-waes-backend:port <PORT>    

```


   [node.js]: <http://nodejs.org>
