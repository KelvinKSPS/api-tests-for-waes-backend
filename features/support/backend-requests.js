const axios = require('axios');
const btoa = require('btoa');
const initialDatabase = require('./initial-database.json')

exports.BackendRequests = class BackendRequests {

  constructor() {
    // static to be controlled by cucumber hooks
    BackendRequests.createdUsers = []
    this.baseUrl = 'http://localhost';
    this.port = '8081';
    this.basePath = 'waesheroes/api/v1';
    this.userDetails = 'users/details';
    this.usersPath = 'users'
    this.loginPath = 'access';
    this.allUsers = 'all';

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

  createSignUpSample(removeParameter, isAdmin) {

    let data = {
      'dateOfBirth': '1992-06-14',
      'email': new Date().getTime() + '@waes.com',
      'isAdmin': isAdmin !== undefined ? isAdmin : true,
      'name': 'string',
      'password': 'string',
      'superpower': 'string',
      'username': '' + new Date().getTime()
    };
    removeParameter !== undefined && delete data[removeParameter];
    return data;
  }

  async signUp(name, email, superpower, dateOfBirth, isAdmin, password, username, id) {

    let signUpBase = `${this.baseUrl}:${this.port}/${this.basePath}/${this.usersPath}`;
    let data = {};
    id !== undefined && Object.assign(data, { id: id });
    name ? data['name'] = name : null;
    username ? data['username'] = username : null;
    email ? data['email'] = email : null;
    superpower ? data['superpower'] = superpower : null;
    dateOfBirth ? data['dateOfBirth'] = dateOfBirth : null;

    if (isAdmin !== undefined) {
      data['isAdmin'] = isAdmin;
    }
    password ? data['password'] = password : null;

    try {
      return await axios.post(signUpBase, data);
    } catch (error) {
      return error;
    }
  }

  async login(username, password) {
    let loginUrl = `${this.baseUrl}:${this.port}/${this.basePath}/${this.usersPath}/${this.loginPath}`;
    try {
      let httpResponse = await axios.get(loginUrl, {
        headers: {
          Authorization: 'Basic ' + btoa(username + ':' + password)
        },
        data: {}
      });
      return httpResponse;

    } catch (error) {
      return error;
    }

  }

  async getAllUserDetails(username, password) {
    let allUsersDetailsPath = `${this.baseUrl}:${this.port}/${this.basePath}/${this.usersPath}/${this.allUsers}`;
    try {
      let httpResponse = await axios.get(allUsersDetailsPath, {
        headers: {
          Authorization: 'Basic ' + btoa(username + ':' + password)
        },
        data: {}
      });
      return httpResponse;
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
      let httpResponse = await axios.delete(deleteUserPath, {
        headers: {
          Authorization: 'Basic ' + btoa(username + ':' + password)
        },
        data: userDetails
      });
      return httpResponse;

    } catch (error) {
      return error;
    }
  }

  async returnDatabaseToInitialStatus() {
    for (let user of initialDatabase) {
      let { name, email, superpower, dateOfBirth, isAdmin, password, username, id } = user;
      await this.signUp(name, email, superpower, dateOfBirth, isAdmin, password, username, id);
    }
  }

  async prepareEnvironment() {
    
    let preDefinedUsers = ['admin', 'dev', 'tester'];
    let usersInDatabase = await this.getAllUserDetails('admin', 'hero');
    usersInDatabase = Array.isArray(usersInDatabase.data) ? usersInDatabase.data : [usersInDatabase.data];
    for (let user of usersInDatabase) {
      if (user === undefined) {
        break;
      }
      if (!preDefinedUsers.includes(user["username"])) {
        this.addUserToBeDeletedAfterTest(user);
      }
    }
    await this.deleteCreatedUsers();

  }

}

// invalid http method
// 415 / without data 