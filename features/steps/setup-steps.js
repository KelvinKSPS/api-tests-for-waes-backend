const {After} = require('cucumber');
const { BackendRequests } = require("../support/backend-requests");
const req = new BackendRequests();

After({tags: "@putingDataInDatabase"}, function () {
    return Promise.resolve(req.deleteCreatedUsers());
  });