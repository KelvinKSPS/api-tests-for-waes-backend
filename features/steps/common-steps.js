const { Given, When, Then } = require('cucumber');
const { expect } = require('chai');
const { BackendRequests } = require('../support/backend-requests');
const req = new BackendRequests();
const Joi = require('joi');


Then(/^the contract of the response should be as documented(.*)$/, function (tail) {
  const responseSchema = Joi.object({
    'dateOfBirth': Joi.string(),
    'email': Joi.string(),
    'id': Joi.number(),
    'isAdmin': Joi.boolean(),
    'name': Joi.string(),
    'superpower': Joi.string(),
    'username': Joi.string()
  })
  this.result.data = Array.isArray(this.result.data) ? this.result.data : [this.result.data];
  for (let data of this.result.data) {
    Joi.assert(data, responseSchema);
  }

})


Then(/^the status should be (-?\d+)$/, function (status) {
  // handling 200 OK and 404 cases
  let statusCode = this.result.status;
  if (statusCode === undefined) {
    statusCode = this.result.response.status;
    this.result.data = this.result;
  }

  expect(statusCode).to.eql(status);

});