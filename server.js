// Import npm packages
var koa       = require('koa'),
    Sequelize = require('sequelize');

// Set up environment variables
require('dotenv').load();
const PORT       = process.env.PORT || 3000,
      DB_NAME    = process.env.DB_NAME,
      DB_USER    = process.env.DB_USER,
      DB_PASS    = process.env.DB_PASS,
      DB_PORT    = process.env.DB_PORT,
      DB_DIALECT = "postgres";

// Initialize koa
var app = koa();

// Instantiate sequelize
var sequelize = null;
startSequelize()
  .then(setRoutes)
  .catch(logSequelizeError)
  .done(startApp);

/**
 * startSequelize
 * Uses env variables to begin the authentication process with postgres.
 * @return Promise
 */
function startSequelize(err) {
  var sequelizeOptions = {
    dialect: DB_DIALECT,
    port:    DB_PORT
  };

  sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, sequelizeOptions);

  return sequelize.authenticate();
}

/**
 * setRoutes
 * Takes the global app and adds routes and middleware.
 */
function setRoutes(err) {
  app.use(function *(){
    this.body = 'Hello World';
  });
  console.log('Database connection has been established successfully.');
}

/**
 * logSequelizeError
 * Fires if sequelize instance can't connect to database.
 */
function logSequelizeError(err){
  console.log('Unable to connect to the database:', err);
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

