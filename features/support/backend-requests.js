const axios = require('axios');
const btoa = require('btoa');

exports.BackendRequests = class BackendRequests {

  constructor() {
    // static to be controlled by cucumber hooks
    BackendRequests.createdUsers = []
    this.baseUrl = 'http://localhost';
    this.port = '8081';
    this.basePath = 'waesheroes/api/v1';
    this.userDetails = 'users/details';
    this.usersPath = 'users'

  }

  addUserToBeDeletedAfterTest(data) {
    BackendRequests.createdUsers.push(data);
  }


  async deleteCreatedUsers() {
    let size = BackendRequests.createdUsers.length;
    for (let x = 0; x < size; x++) {
      await this.deleteUser(BackendRequests.createdUsers[x]);
    }
    BackendRequests.createdUsers = [];
  }

  createSignUpSample() {
    return {
      'dateOfBirth': '1992-06-14',
      'email': new Date().getTime() + '@waes.com',
      'isAdmin': true,
      'name': 'string',
      'password': 'string',
      'superpower': 'string',
      'username': '' + new Date().getTime()
    }
  }

  async signUp(name, email, superpower, dateOfBirth, isAdmin, password, username) {
    let signUpBase = `${this.baseUrl}:${this.port}/${this.basePath}/${this.usersPath}`;
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

  async deleteUser(userDetails, customUserName, customPassword) {
    let deleteUserPath = `${this.baseUrl}:${this.port}/${this.basePath}/${this.usersPath}`;
    let username = !!customUserName ? customUserName : 'admin';
    let password = !!customPassword ? customPassword : 'hero';

    try {
      return await axios.delete(deleteUserPath, {
        headers: {
          Authorization: 'Basic ' + btoa(username + ':' + password)
        },
        data: userDetails
      });

    } catch (error) {
      return error;
    }
  }

}

// invalid http method
// 415 / without data 