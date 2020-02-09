

const { Given, When, Then, And } = require('cucumber');
const { expect } = require('chai');
const { BackendRequests } = require('../support/backend-requests');
const req = new BackendRequests();
const Joi = require('joi');

Given(/^I am a user wanting to sign up$/, function () {
});

Given(/^I am a user already signed up as (.*)$/, async function (username) {
  let data = req.createSignUpSample();
  data.username = username;
  this.signedUpUserData = await req.signUp(data.name, data.email, data.superpower, data.dateOfBirth, data.isAdmin, data.password, data.username);
});

When(/^I sign up using (.*) as a (.*)$/, async function (parameter, type) {
  let data = req.createSignUpSample();
  switch (type) {
    case 'number': data[parameter] = 1234; break;
    case 'null': data[parameter] = null; break;
    case 'invalid date': data[parameter] = '2014-14-14'; break;
    case 'empty string': data[parameter] = ''; break;
    default: data[parameter] = 'default';
  }
  this.result = await req.signUp(data.name, data.email, data.superpower, data.dateOfBirth, data.isAdmin, data.password, data.username);
})

When(/^I remove the username (.*) and sign up again$/, async function (username) {
  await req.deleteUser(this.signedUpUserData.data);
  let data = req.createSignUpSample();
  data.username = username;
  this.result = await req.signUp(data.name, data.email, data.superpower, data.dateOfBirth, data.isAdmin, data.password, data.username);
});



When(/^I sign up missing the parameter (.*)$/, async function (missingParameter) {
  let data = req.createSignUpSample();
  delete data[missingParameter];
  this.result = await req.signUp(data.name, data.email, data.superpower, data.dateOfBirth, data.isAdmin, data.password, data.username);

});

When(/^I sign up using the following parameters: (.*) (.*) (.*) (.*) (.*) (.*) (.*)$/,
  async function (user, password, name, email, superpower, isAdmin, dateOfBirth) {
    isAdmin = isAdmin === 'true';
    this.result = await req.signUp(name, email, superpower, dateOfBirth,
      isAdmin, password, user);
  })


When(/^I sign up using valid information and email as (.*)$/, async function (email) {
  let data = req.createSignUpSample();
  data['email'] = email;
  this.result = await req.signUp(data.name, data.email, data.superpower, data.dateOfBirth, data.isAdmin, data.password, data.username);
});


When(/^I sign up using valid information and username as (.*)$/, async function (username) {
  let data = req.createSignUpSample();
  data['username'] = username;
  this.result = await req.signUp(data.name, data.email, data.superpower, data.dateOfBirth, data.isAdmin, data.password, data.username);
});

Then(/^the message received should be (.*)$/, function (message) {
  expect(this.result.response.data.message).to.eql(message);
})