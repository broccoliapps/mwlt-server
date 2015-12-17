// npm packages
var Sequelize = require('sequelize');

// Database schemas
var User = require('./schema/User');

var db = {

  sequelize: null,

  /**
   * Connects to the database and drops all tables, 
   * then redefines them from the database schemas.
   * @return {Promise}
   */
  initialize: function(connection, options){

    this.sequelize = new Sequelize(
      connection.DB_NAME, 
      connection.DB_USER,
      connection.DB_PASS, 
      options);

    // Allow bound functions to be gc'ed by assigning them to variables.
    var logConnectionSuccess = _logConnectionSuccess.bind(this, options.port),
        defineSchemas        = _defineSchemas.bind(this);

    return this.sequelize
      .authenticate()
      .then(logConnectionSuccess, _logSequelizeError)
      .then(defineSchemas, _logSequelizeError)
  }

};
module.exports = db;

/**
 * _defineSchemas
 * Sets the schemas on the sequelize singleton.
 * @return {Promise}
 */
function _defineSchemas(){

  this.sequelize.define('User', User);

  return this.sequelize
    .sync({ force: true });
}

/**
 * _logConnectionSuccess
 * Fires if sequelize instance connects to database successfully.
 */
function _logConnectionSuccess(port){
  console.log('Database listening on port:', port);
}

/**
 * _logSequelizeError
 * Fires if sequelize instance can't connect to database.
 */
function _logSequelizeError(err){
  console.log(err);
}

