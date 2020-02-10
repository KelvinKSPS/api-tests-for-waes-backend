const { Given, When, Then, And } = require('cucumber');
const { expect } = require('chai');
const { BackendRequests } = require('../support/backend-requests');
const req = new BackendRequests();

Given(/^I am a user wanting to be removed$/, async function () {
    let data = req.createSignUpSample();
    await req.signUp(data.name, data.email, data.superpower, data.dateOfBirth, data.isAdmin, data.password, data.username);
    this.createdData = data;
    this.username = data.username;
    this.password = data.password;
});


Given(/^I am an admin willing to remove a user that does not exist$/, async function () {
    this.username = this.password = undefined;
});


Given('I am a user with invalid credentials', function () {
    this.username = this.password = 'invalid';
});


Given(/^I am a user and my role is (.*)$/, async function (role) {
    let data = req.createSignUpSample(null, role === 'admin');
    this.result = req.signUp(data.name, data.email, data.superpower, data.dateOfBirth, data.isAdmin, data.password, data.username);
    this.username = data.username;
    this.password = data.password;
});


When(/^I try to remove a user which is (.*)$/, async function (role) {
    let data = req.createSignUpSample(null, role === 'admin');
    this.createdData = data;
    await req.signUp(data.name, data.email, data.superpower, data.dateOfBirth, data.isAdmin, data.password, data.username);
    this.result = await req.deleteUser(data, this.username, this.password);
});


When(/^I try to remove a user without passing parameter (.*)$/, async function (missingParameter) {
    let data = req.createSignUpSample(missingParameter);
    this.createdData = data;
    await req.signUp(data.name, data.email, data.superpower, data.dateOfBirth, data.isAdmin, data.password, data.username);
    this.result = await req.deleteUser(data);
});


/**
 * 'Second time' has a special treatment because, in this case, the user does not exist.
 * So, we use another account to try removing again.
 */
When(/^I make the request to delete my information (.*)$/, async function (tail) {
    if (tail === 'second time') {
        this.username = this.password = undefined;
    }
    this.result = await req.deleteUser(this.createdData, this.username, this.password);
});


When(/^I make the request to delete any information$/, async function () {
    this.createdData = req.createSignUpSample();
    this.result = await req.deleteUser(this.createdData, this.username, this.password);
});

/**
 * Since there are two different patterns when the user is removed and
 * when it is not found, this code is handling those two case
 */
Then(/^response should indicate the user (.*)$/, function (situation) {
    let prefix, message, response = '';

    if (situation === 'was removed') {
        prefix = 'User \'';
        message = '\' removed from database.';
        response = this.result.data;
    }
    else if (situation === 'was not found') {
        prefix = 'Username ';
        message = ' does not exist.'
        response = this.result.response.data.message;
    }

    let expectedResponse = '';

    if (situation === 'not removed due to unauthorization') {
        response = 'Unauthorized';
    }
    else {
        expectedResponse = prefix + this.createdData.username + message;
    }

    expect(response).to.eql(expectedResponse);

});