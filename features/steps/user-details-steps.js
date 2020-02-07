

const { Given, When, Then, And } = require("cucumber");
const { expect } = require("chai");
const { BackendRequests } = require("../support/backend-requests");
const req = new BackendRequests();

Given(/^I want to see the details from a user$/, function () {
});

When(/^I access the data by using (.*)$/, async function (user) {
  this.result = await req.getUserDetails(user);
});

Then(/^the status should be (-?\d+)$/, function (status) {
  // handling 200 OK and 404 cases
  let statusCode = this.result.status;
  if (statusCode === undefined) {
    statusCode = this.result.response.status;
    this.result.data = this.result;
  } 

  expect(statusCode).to.eql(status);

});


Then(/^the username should be (.*)$/, function (username) {
  expect(this.result.data.username).to.eql(username);
});

Then(/^the name should be (.*)$/, function (name) {
  expect(this.result.data.name).to.eql(name);
});

Then(/^the email should be (.*)$/, function (email) {
  expect(this.result.data.email).to.eql(email);
});

Then(/^the superpower should be (.*)$/, function (superpower) {
  expect(this.result.data.superpower).to.eql(superpower);
});

Then(/^the birth date should be (.*)-(.*)-(.*)$/, function (year, month, day) {
  expect(this.result.data.dateOfBirth).to.eql(`${year}-${month}-${day}`);
});


Then(/^the admin status should be (.*)$/, function (isAdmin) {
  expect(this.result.data.isAdmin).to.eql(isAdmin === 'true');
});
