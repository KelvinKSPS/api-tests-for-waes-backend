const {AfterAll, BeforeAll} = require('cucumber');

AfterAll(function () {
  // perform some shared teardown
  return Promise.resolve()
});