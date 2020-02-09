const { Given, When, Then, And } = require('cucumber');
const { expect } = require('chai');
const { BackendRequests } = require('../support/backend-requests');
const req = new BackendRequests();

Given(/^I am a user$/, function () {

})

When(/^I login using (.*) and (.*)$/, async function (username, password) {
    this.result = await req.login(username, password);
})