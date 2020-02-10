const { BackendRequests } = require('./features/support/backend-requests');
const req = new BackendRequests();

Promise.resolve(req.healthCheck());
