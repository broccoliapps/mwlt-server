// Database w/ Sequelize
var db = require('./db');

// Set up environment variables
require('dotenv').load();
const PORT       = process.env.PORT || 3000,
      DB_NAME    = process.env.DB_NAME,
      DB_USER    = process.env.DB_USER,
      DB_PASS    = process.env.DB_PASS,
      DB_PORT    = process.env.DB_PORT,
      DB_DIALECT = "postgres";

// Initialize koa
var app = require('koa')();

// Start App
startDatabase()
  .then(setRoutes)
  .then(startApp);

/**
 * startDatabase
 * Uses env variables to connect to database and load up schemas.
 * @return {Promise}
 */
function startDatabase(){
  var connection = {
    DB_NAME: DB_NAME,
    DB_USER: DB_USER,
    DB_PASS: DB_PASS
  };

  var options = {
    dialect: DB_DIALECT,
    port:    DB_PORT
  };

  return db.initialize(connection, options);
}

/**
 * setRoutes
 * Takes the global app and adds routes and middleware.
 */
function setRoutes(err) {
  app.use(function *(){
    this.body = 'Hello World';
  });
}

/**
 * startAp
 * Begin listening on the specified port.
 */
function startApp(){
  app.listen(PORT, () => {
    console.log(`Listening on localhost:${PORT}`);
  });
}

