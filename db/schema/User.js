// Import npm packages
var Sequelize = require('sequelize');

// Define User model
var User = {
  username: Sequelize.STRING,
  password: Sequelize.STRING
};

// Export User model
module.exports = User;

