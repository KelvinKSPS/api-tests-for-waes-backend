const axios = require("axios");

exports.BackendRequests = class BackendRequests {

  constructor() {
    this.baseUrl = "http://localhost";
    this.port = "8081";
    this.basePath = "waesheroes/api/v1";
    this.userDetails = "users/details";

  }

  async getUserDetails(user) {
    try {
      return await axios.get(`${this.baseUrl}:${this.port}/${this.basePath}/${this.userDetails}?username=${user}`);
    } catch (error) {
      return error;
    }
  }

}

