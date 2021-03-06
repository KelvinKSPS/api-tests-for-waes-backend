﻿# API Tests for WAES Backend

This is the api tests project for WAES Backend.

This project has the following features:

  + Health Check feature; 
  + Possibility of changing the full address of the server, including the port; 
  + BDD-Styled report; 
  + Coverage of 94 scenarios, 439 steps; 

# Table of Contents

1. [Setup](#setup)
2. [Run Tests and Open Report](#run-tests-and-open-report)
3. [Changing host address and IP](#changing-host-address-and-ip)
4. [Health Check](#health-check)
5. [Assumptions](#assumptions)
6. [Bug Report](#bug-report)
7. [Enhancements](#enhancements)
6. [Unit Tests](#unit-tests)

  

# Setup

In order to run the tests, you need to have NodeJS installed.

[Node.js] - Node.js is an open-source, cross-platform, JavaScript runtime environment. It executes JavaScript code outside of a browser.

  1. Download NodeJS installer.
  2. In installation, check the option to setup NodeJS in your PATH (an option will appear in installation). 
  3. Download this project.
  4. Make sure you have connection to the internet and run the following command:

``` sh
$ npm install
```

Once you have this project and NodeJS installed, there are some features you can use.

# Run Tests and Open Report

First, make sure the server is running. You can run the server to port 8081 (default) by using the following command, at the server folder:

```
mvn clean spring-boot:run 
```
> As seen at bitbucket page from the server, maven and jdk are mandatory for running the command above.

You can run the tests and, as soon as the tests are finished, it will open the report on your default browser.

``` sh
$ npm run test-and-report
```

The report will be generated at `test/report` folder, inside the project. The name will be `cucumber_report.html`.

If you just want to run the test without generating report, run the following command:

``` sh
$ npm test
```

After that, if you want to generate report regarding to your `most recent running` , run the following command:

``` sh
$ npm run report
```

### Report Example
![DemoReport](./report-example.png)

# Changing host address and Port

You have the option to point this test to other environment, by changing the ip address and/or port.

> After running the command to change IP or PORT, you can run the tests by the command described above.

If you want to change the port, run the following command, changing `<IP>` to the desired address:

``` sh
$ npm config set api-tests-for-waes-backend:ip <IP>
```

If you want to change the port, run the following command, changing `<PORT>` to the desired port:

``` sh
$ npm config set api-tests-for-waes-backend:port <PORT>
```

# Health Check

If you want to use this code in a Continuous Integration/Delivery pipeline, you can use the `health check` feature. It will indicate if the system is ready for testing or not.

You can use this feature by the following method:

``` sh
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

# Assumptions

There are some assumptions for the test automation and bug reporting:

1. Non-Admin users cannot update information regarding to other users. Only Admin can.
2. Non-Admin users cannot delete information regarding to other users. Only Admin can.
3. Since there is no indication regarding to required and optional parameters, all parameters are considered mandatory.
4. Parameters types displayed in Swagger are used for contract tests. The types should be persisted in the operations.

# Bug Report

Table of priorities

| Priority P    |  Definition|
| :-------------: |:-------------:| 
| P0            | critical      | 
| P1            | major         | 
| P2            | medium        | 
| P3            | minor        | 

Quantity

| Priority P      |  Quantity     |
| :-------------: |:-------------:| 
| P0              | 1             | 
| P1              | 6             | 
| P2              | 6             | 
| P3              | 10            | 
| Total           | 23            |

Bugs

| ID | Priority | Title | Steps | Currently | Expected |
| :--: |:--:| :-------------: |:-------------| :-------------: |:-------------:|    
| 01 | P1 | Non-Admin users can remove any user | 1. As a non-admin, try to remove a user that is admin.<br>2. As a non-admin, try to remove a user that is non-admin.| The users were removed | Non-Admin users should not be able to remove users.|
| 02 | P0 | Signed Up admin cannot get all users | 1. Sign up as an admin.<br> 2. Make the request to get all users.| The status of request is 403.|The status of the request should be 200 and all users should be retrieved.<br> This is a blocker issue because it is not possible to do the test where all the database is wiped.|
| 03 | P2 | It is possible to sign up with the parameter isAdmin as a number | 1. Sign up using parameter isAdmin as a number.| Sign up is successfully done - 200 ok | It should return 400 - bad request |
| 04 | P2 | It is possible to sign up with the parameter isAdmin as null | 1. Sign up using parameter isAdmin as null.| Sign up is successfully done - 200 ok | It should return 400 - bad request |
| 05 | P3 | It is possible to sign up with the parameter dateOfBirth as a number | 1. Sign up using parameter dateOfBirth as a number.| Sign up is successfully done - 200 ok | It should return 400 - bad request, because this parameter should be a string |
| 06 | P3 | It is possible to sign up with the parameter dateOfBirth as null | 1. Sign up using parameter dateOfBirth as null.| Sign up is successfully done - 200 ok | It should return 400 - bad request, because this parameter should be a string |
| 07 | P2 | It is possible to sign up without the parameter name | 1. Sign up without the parameter name.| Sign up is successfully done - 201 ok | It should return 400 - bad request |
| 08 | P2 | It is possible to sign up without the parameter name | 1. Sign up without the parameter name.| Sign up is successfully done - 201 ok | It should return 400 - bad request |
| 09 | P2 | It is possible to sign up without the parameter superpower | 1. Sign up without the parameter superpower.| Sign up is successfully done - 201 ok | It should return 400 - bad request |
| 10 | P2 | It is possible to sign up without the parameter dateOfBirth | 1. Sign up without the parameter dateOfBirth.| Sign up is successfully done - 201 ok | It should return 400 - bad request |
| 11 | P1 | It is possible to sign up without the parameter isAdmin | 1. Sign up without the parameter isAdmin.| Sign up is successfully done - 201 ok | It should return 400 - bad request |
| 12 | P1 | It is possible to update parameter isAdmin to the type of number | 1. Sign up.<br>2. Make the Update request changing the parameter isAdmin to a number | Update is successfully done - 200 ok | It should return 400 - bad request |
| 13 | P1 | It is possible to update parameter isAdmin to the type of null | 1. Sign up.<br>2. Make the Update request changing the parameter isAdmin to null | Update is successfully done - 200 ok | It should return 400 - bad request |
| 14 | P3 | It is possible to update parameter dateOfBirth to null | 1. Sign up.<br>2. Make the Update request changing the parameter dateOfBirth to null | Update is successfully done - 200 ok | It should return 400 - bad request |
| 15 | P3 | It is possible to update parameter email to empty string | 1. Sign up.<br>2. Make the Update request changing the parameter email to empty string | Update is successfully done - 200 ok | It should return 400 - bad request |
| 16 | P3 | It is possible to update parameter name to null | 1. Sign up.<br>2. Make the Update request changing the parameter name to null | Update is successfully done - 200 ok | It should return 400 - bad request |
| 17 | P3 | It is possible to update parameter superpower to null | 1. Sign up.<br>2. Make the Update request changing the parameter superpower to null | Update is successfully done - 200 ok | It should return 400 - bad request |
| 18 | P3 | It is possible to update without parameter name | 1. Sign up.<br>2. Make the Update request without parameter name | Update is successfully done - 200 ok | It should return 400 - bad request |
| 19 | P3 | It is possible to update without parameter superpower | 1. Sign up.<br>2. Make the Update request without parameter superpower | Update is successfully done - 200 ok | It should return 400 - bad request |
| 20 | P3 | It is possible to update without parameter dateOfBirth | 1. Sign up.<br>2. Make the Update request without parameter dateOfBirth | Update is successfully done - 200 ok | It should return 400 - bad request |
| 21 | P1 | It is possible to update without parameter isAdmin | 1. Sign up.<br>2. Make the Update request without parameter isAdmin | Update is successfully done - 200 ok | It should return 400 - bad request |
| 22 | P1 | Non-Admin can update information from other users | 1. As a Non-Admin, try to update information from Non-Admin users.<br>2. As a Non-Admin, try to update information from Admin users.| Update is successfully done for both cases - 200 ok | Non-Admin should not update information from other users - it should return 403 |
| 23 | P3 | It is possible to update parameter dateOfBirth to a number | 1. Sign up.<br>2. Make the Update request changing the parameter dateOfBirth to a number | Update is successfully done - 200 ok | It should return 400 - bad request |

The error `02` is `P0-Blocker` because it is not possible to remove all user data in database during the test. If we do that, we cannot make the database to work as before the tests - only if restarting the database.

When we finish the tests - or during them - we should let the database as it was before initiating the tests. Therefore those scenarios covering full database wiping will not be run in this test suite - these scenarios are stored inside backlog folder.

# Enhancements

1 - Indication regarding to which variables are mandatory/required for updating and signing up.

2 - Indication if/that non-admin cannot remove/update information from other users.

3 - Swagger documentation is not clear about deletion. It indicates that we need to have `id` , but this parameter is not necessary for deletion. The mandatory parameters should be indicated for deletion as well.

4 - When a user is removed, the following message is returned:
```
User 'test' removed from database
``` 
  When a user is not found, the following message is returned:

`Username test does not exist.` 


  We could have only `User` or `Username` , and we could have ` (apostrophe) for both cases or not.


<br>

5 - When we try to sign up missing email, we receive the following message:<br><br>
``` 
Validation failed for classes [com.waes.backend.model.User] during persist time for groups [javax.validation.groups.Default, ]\nList of constraint violations:[\n\tConstraintViolationImpl{interpolatedMessage='não pode ser nulo', propertyPath=email, rootBeanClass=class com.waes.backend.model.User, messageTemplate='{javax.validation.constraints.NotNull.message}'}
```
<br> These messages are more focused on database and constraints. Maybe these messages could be more user-friendly.

6 - `id` is described as necessary for sign up in Swagger. However, it is not. This information could be removed.


# Unit Tests
<br>
The unit tests developed in this project are focused on "happy path" scenarios. For a higher code coverage and more eficient prevention of side-effect issues, it would be better covering negative and destructive scenarios to validate errors, exceptions, and corner cases, for example.
<br><br>
There are scenarios validating the positive flow from deletion, login, user details, all users, and update, but there are no scenarios covering sign-up features.

# 

   [node.js]: <http://nodejs.org>

