const axios = require("axios");

exports.BackendRequests = class BackendRequests {

  constructor() {
    this.createdUsers = []
    this.baseUrl = "http://localhost";
    this.port = "8081";
    this.basePath = "waesheroes/api/v1";
    this.userDetails = "users/details";
    this.signUpPath = "users"

  }

  addUserToBeDeletedAfterTest (data) {
    this.createdUsers.put(data);
  }

  createSignUpSample() {
    return {
      "dateOfBirth": "1992-06-14",
      "email": new Date().getTime() + "@waes.com",
      "isAdmin": true,
      "name": "string",
      "password": "string",
      "superpower": "string",
      "username": "" + new Date().getTime()
    }
  }

  async signUp(name, email, superpower, dateOfBirth, isAdmin, password, username) {
    let signUpBase = `${this.baseUrl}:${this.port}/${this.basePath}/${this.signUpPath}`;
    let data = {};

    name ? data['name'] = name : null;
    email ? data['email'] = email : null;
    superpower ? data['superpower'] = superpower : null;
    dateOfBirth ? data['dateOfBirth'] = dateOfBirth : null;
    isAdmin ? data['isAdmin'] = isAdmin : null;
    password ? data['password'] = password : null;
    username ? data['username'] = username : null;

    try {
      return await axios.post(signUpBase, data);
    } catch (error) {
      return error;
    }
  }

  async getUserDetails(user) {
    let userDetailsPath = `${this.baseUrl}:${this.port}/${this.basePath}/${this.userDetails}?username=${user}`;
    try {
      return await axios.get(userDetailsPath);
    } catch (error) {
      return error;
    }
  }

}

// invalid http method
// 415 / without data 