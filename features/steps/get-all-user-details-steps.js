

const { Given, When, Then } = require('cucumber');
const { expect } = require('chai');
const { BackendRequests } = require('../support/backend-requests');
const req = new BackendRequests();


/**
 * Default users for admin and non-admin scenarios
 */
Given(/^I am a user with the role of (.*)$/, function (role) {
    if (role === 'admin') {
        this.username = 'admin';
        this.password = 'hero'
    }
    else {
        this.username = 'dev';
        this.password = 'wizard'
    }
})

Given(/^I just signed up as a (.*)$/, async function (role) {
    let data = req.createSignUpSample(null, role === 'admin');
    this.username = data.username;
    this.password = data.password;
    this.createdData = await req.signUp(data.name, data.email, data.superpower, data.dateOfBirth, data.isAdmin, data.password, data.username);
})


When(/^I request to get all users$/, async function () {
    this.result = await req.getAllUserDetails(this.username, this.password);
})

When(/^I re-create the users in database$/, async function () {
    await req.returnDatabaseToInitialStatus();
})

When(/^I remove all users$/, async function () {
    this.allUsers = await req.getAllUserDetails(this.username, this.password);
    for (let user of this.allUsers.data.reverse()) {
        await req.deleteUser(user, this.username, this.password);
    }
})



Then(/^the count of users should be (\d+)$/, function (count) {
    expect(this.result.data).to.have.lengthOf(count);
})