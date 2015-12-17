// Import npm packages
var Sequelize = require('sequelize');

// Define User schema
var User = {
  username: Sequelize.STRING,
  password: Sequelize.STRING
};

// Export User schema
module.exports = User;

