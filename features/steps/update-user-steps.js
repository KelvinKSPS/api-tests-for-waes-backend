const { Given, When, Then, And } = require('cucumber');
const { expect } = require('chai');
const { BackendRequests } = require('../support/backend-requests');
const req = new BackendRequests();
const Joi = require('joi');


When(/^I request to update the parameter (.*) to (.*)$/, async function (parameter, value) {
    this.signedUpUserData.data[parameter] = value;
    this.result = await req.updateUser(this.signedUpUserData.data, this.username, this.password);
})

When(/^I login with password as (.*)$/, async function (password) {
    this.result = await req.login(this.signedUpUserData.data['username'], password);
})

When(/^I request to change type of the parameter (.*) to the type of (.*)$/, async function (parameter, type) {
    this.createdData.data[parameter] = req.createType(type);
    this.createdData.data['password'] = this.password;
    this.result = await req.updateUser(this.createdData.data, this.username, this.password);
})


When(/^I update missing the parameter (.*)$/, async function (missingParameter) {
    this.createdData.data['password'] = this.password;
    delete this.createdData.data[missingParameter];
    this.result = await req.updateUser(this.createdData.data, this.username, this.password);
});

When(/^I try to update a user which is (.*)$/, async function (role) {
    let data = req.createSignUpSample(null, role === 'admin');
    this.createdData = await req.signUp(data.name, data.email, data.superpower, data.dateOfBirth, data.isAdmin, data.password, data.username);
    this.createdData.data['password'] = data['password'];
    this.result = await req.updateUser(this.createdData.data, this.username, this.password);
});

When(/^I try to update a deleted user$/, async function () {
    let data = req.createSignUpSample(null, false);
    this.createdData = await req.signUp(data.name, data.email, data.superpower, data.dateOfBirth, data.isAdmin, data.password, data.username);
    await req.deleteUser(this.createdData.data, this.username, this.password);
    this.createdData.data['password'] = data['password'];
    this.result = await req.updateUser(this.createdData.data, this.username, this.password);
});


Then(/^the parameter (.*) should be (.*)$/, function (parameter, value) {
    expect(this.signedUpUserData.data[parameter]).to.eql(value);
})