var dotenv    = require('dotenv'),
    Sequelize = require('sequelize');

var schemas   = require('./schemas');

// Set up environment variables
dotenv.load();
const DB_NAME    = process.env.DB_NAME,
      DB_USER    = process.env.DB_USER,
      DB_PASS    = process.env.DB_PASS,
      DB_PORT    = process.env.DB_PORT,
      DB_DIALECT = "postgres";

var db = {

  sequelize: null,

  /**
   * Connects to the database and drops all tables,
   * then redefines them from the database schemas.
   * @return {Promise}
   */
  initialize: function(){

    var options = {
      dialect: DB_DIALECT,
      port:    DB_PORT
    };
    this.sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, options);

    // Allow bound functions to be gc'ed by assigning them to variables.
    var defineSchemas = _defineSchemas.bind(this);

    return this.sequelize
      .authenticate()
      .then(_logConnectionSuccess, _logSequelizeError)
      .then(defineSchemas, _logSequelizeError);
  }

};
module.exports = db;

/**
 * Sets the schemas on the sequelize instance.
 * @return {Promise}
 */
function _defineSchemas(){

  Object.keys(schemas).forEach((name) => (
    this.sequelize.define(name, schemas[name])
  ));

  return this.sequelize
    .sync({ force: true });
}

function _logConnectionSuccess(){
  console.log('Database listening on port:', DB_PORT);
}

function _logSequelizeError(err){
  console.log(err);
}

