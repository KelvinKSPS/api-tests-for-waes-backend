

const { Given, When, Then, And } = require('cucumber');
const { expect } = require('chai');
const { BackendRequests } = require('../support/backend-requests');
const req = new BackendRequests();
const Joi = require('joi');

Given(/^I am a user wanting to sign up$/, function () {
  this.result = null;
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
});

Then(/^the contract of the response should be as documented$/, () => {
  const responseSchema = Joi.object({
    'dateOfBirth': Joi.string(),
    'email': Joi.string(),
    'id': Joi.number(),
    'isAdmin': Joi.boolean(),
    'name': Joi.string(),
    'superpower': Joi.string(),
    'username': Joi.string()
  })
  responseSchema.validate(this.result.result.data);
})




