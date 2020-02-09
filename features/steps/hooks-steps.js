
const { BeforeAll, After, AfterAll } = require('cucumber');
const { BackendRequests } = require('../support/backend-requests');
const req = new BackendRequests();
const { setDefaultTimeout } = require('cucumber');

// This will avoid the promise timeout error if there are several users in database
setDefaultTimeout(10 * 1000);

BeforeAll(function () {
    return Promise.resolve(req.prepareEnvironment());
})


After({ tags: '@putingDataInDatabase' }, function () {
    return Promise.resolve(req.prepareEnvironment());
});