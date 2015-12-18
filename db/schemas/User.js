var Sequelize = require('sequelize');

var User = {
  username: Sequelize.STRING,
  password: Sequelize.STRING
};

module.exports = User;

