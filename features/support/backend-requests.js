const axios = require('axios');
const btoa = require('btoa');
const initialDatabase = require('./initial-database.json')

exports.BackendRequests = class BackendRequests {

  constructor() {
    // static to be controlled by cucumber hooks
    BackendRequests.createdUsers = [];
    this.baseUrl = 'http://' + process.env.npm_package_config_ip;
    this.port = process.env.npm_package_config_port;
    this.basePath = 'waesheroes/api/v1';
    this.userDetails = 'users/details';
    this.usersPath = 'users';
    this.loginPath = 'access';
    this.allUsers = 'all';

  }

  /**
   * healthCheck with the indication to change ip or port, 
   * if this is the case.
   */
  async healthCheck() {
    let healthPage = `${this.baseUrl}:${this.port}/swagger-ui.html`;
    try {
      let httpResponse = await axios.get(healthPage, { header: { 'Content-type': 'application/json' } });
      console.log('System is running in the following address: ' + `${this.baseUrl}:${this.port}`);
      process.exit(0);

    } catch (error) {
      console.log('\nSystem is not working in the address ' + `${this.baseUrl}:${this.port}`);
      console.log('\n You can change the ip using the following command:');
      console.log('npm config set api-tests-for-waes-backend:ip <IP>');

      console.log('\n You can change the ip using the following command:');
      console.log('npm config set api-tests-for-waes-backend:port <PORT>\n');

      process.exit(1);
    }
  }

  addUserToBeDeletedAfterTest(data) {
    BackendRequests.createdUsers.push(data);
  }

  createSignUpSample(removeParameter, isAdmin) {

    let data = {
      'dateOfBirth': '1992-06-14',
      'email': new Date().getTime() + '@waes.com',
      'isAdmin': isAdmin !== undefined && isAdmin === 'true',
      'name': 'string',
      'password': 'string',
      'superpower': 'string',
      'username': 'a' + new Date().getTime()
    };
    removeParameter !== undefined && delete data[removeParameter];
    return data;
  }

  createType(type) {
    switch (type) {
      case 'number': return 1234;
      case 'null': return null;
      case 'invalid date': return '2014-14-14';
      case 'empty string': return '';
      default: return 'default';
    }
  }
  async deleteCreatedUsers() {
    let size = BackendRequests.createdUsers.length;
    for (let x = 0; x < size; x++) {
      await this.deleteUser(BackendRequests.createdUsers[x]);
    }
    BackendRequests.createdUsers = [];
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

  async updateUser(userDetails, username, password) {
    let updateUrl = `${this.baseUrl}:${this.port}/${this.basePath}/${this.usersPath}`;
    try {
      let httpResponse = await axios.put(updateUrl, {}, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json',
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
      if (!preDefinedUsers.includes(user['username'])) {
        this.addUserToBeDeletedAfterTest(user);
      }
    }
    await this.deleteCreatedUsers();

  }

}