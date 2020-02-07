

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


When(/^I remove the username (.*) and sign up again$/, async function (username) {
  await req.deleteUser(this.signedUpUserData.data);
  let data = req.createSignUpSample();
  data.username = username;
  this.result = await req.signUp(data.name, data.email, data.superpower, data.dateOfBirth, data.isAdmin, data.password, data.username);
  // store data to be removed later if user was succesfully created.
  this.result.data !== undefined ? req.addUserToBeDeletedAfterTest(this.result.data) : null;
});



When(/^I sign up missing the parameter (.*)$/, async function (missingParameter) {
  let data = req.createSignUpSample();
  delete data[missingParameter];
  this.result = await req.signUp(data.name, data.email, data.superpower, data.dateOfBirth, data.isAdmin, data.password, data.username);

});

When(/^I sign up using valid information and username as (.*)$/, async function (username) {
  let data = req.createSignUpSample();
  data['username'] = username;
  this.result = await req.signUp(data.name, data.email, data.superpower, data.dateOfBirth, data.isAdmin, data.password, data.username);
  // store data to be removed later if user was succesfully created.
  this.result.data !== undefined ? req.addUserToBeDeletedAfterTest(this.result.data) : null;
});

Then(/^the contract of the response should be as documented$/, function() {
  const responseSchema = Joi.object({
    'dateOfBirth': Joi.string(),
    'email': Joi.string(),
    'id': Joi.number(),
    'isAdmin': Joi.boolean(),
    'name': Joi.string(),
    'superpower': Joi.string(),
    'username': Joi.string()
  })
  Joi.assert(this.result.data, responseSchema);
  
})




