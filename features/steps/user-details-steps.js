

const { Given, When, Then, And } = require("cucumber");
const { expect } = require("chai");
const { BackendRequests } = require("../support/backend-requests");
const req = new BackendRequests();

Given(/^I want to see the details from a user$/, function () {
  this.result = null;
});

When(/^I access the data by using (.*)$/, async function (user) {
  this.result = await req.getUserDetails(user);
});

Then(/^the status should be (-?\d+)$/, function (status) {
  // handling 200 OK and 404 cases
  let statusCode = this.result.status;
  if (statusCode === undefined) {
    statusCode = this.result.response.status;
  } else {
    this.result = this.result.data;
  }

  expect(statusCode).to.eql(status);

});


Then(/^the username should be (.*)$/, function (username) {
  expect(this.result.username).to.eql(username);
});

Then(/^the name should be (.*)$/, function (name) {
  expect(this.result.name).to.eql(name);
});

Then(/^the email should be (.*)$/, function (email) {
  expect(this.result.email).to.eql(email);
});

Then(/^the superpower should be (.*)$/, function (superpower) {
  expect(this.result.superpower).to.eql(superpower);
});

Then(/^the birth date should be (.*)-(.*)-(.*)$/, function (year, month, day) {
  expect(this.result.dateOfBirth).to.eql(`${year}-${month}-${day}`);
});


Then(/^the admin status should be (.*)$/, function (isAdmin) {
  expect(this.result.isAdmin).to.eql(isAdmin === 'true');
});
