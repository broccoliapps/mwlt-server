var dotenv    = require('dotenv').load(),
    Sequelize = require('sequelize'),
    schemas   = require('./schemas');

const ENV = process.env;

module.exports = {

  sequelize: null,

  /**
   * Connects to the database and drops all tables,
   * then redefines them from the database schemas.
   * @return {Promise}
   */
  initialize: function(){

    this.sequelize = _initSequelize();

    var defineSchemas = _defineSchemas.bind(this);

    return this.sequelize
      .authenticate()
      .then(_logConnectionSuccess, _logSequelizeError)
      .then(defineSchemas, _logSequelizeError);
  }

};

function _initSequelize(){
  const options = {
    dialect: 'postgres',
    port: ENV.DB_PORT
  };
  return new Sequelize(ENV.DB_NAME, ENV.DB_USER, ENV.DB_PASS, options);
}

function _defineSchemas(){

  Object.keys(schemas).forEach((name) => (
    this.sequelize.define(name, schemas[name])
  ));

  return this.sequelize.sync({ force: true });
}

function _logConnectionSuccess(){
  console.log('Database listening on port:', ENV.DB_PORT);
}

function _logSequelizeError(err){
  console.log(err);
}

