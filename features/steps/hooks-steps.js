
const { BeforeAll, After, AfterAll } = require('cucumber');
const { BackendRequests } = require('../support/backend-requests');
const req = new BackendRequests();
const { setDefaultTimeout } = require('cucumber');

// This will avoid the promise timeout error if there are several users in database
setDefaultTimeout(10 * 1000);


/**
 * Preparing environment for removing any user that is not
 * 'admin', 'dev' and 'tester'
 */
BeforeAll(function () {
    return Promise.resolve(req.prepareEnvironment());
})

/**
 * Removing new users created
 * this tag is used to map the scenarios where users will be created
 */
After({ tags: '@putingDataInDatabase' }, function () {
    return Promise.resolve(req.prepareEnvironment());
});