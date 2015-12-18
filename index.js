var dotenv = require('dotenv');

var Routes = require('./routes'),
    db     = require('./db');

// Set up environment variables
dotenv.load();
const PORT = process.env.PORT || 3000;

var app = require('koa')();

db.initialize()
  .then(setRoutes)
  .then(startApp);

/**
 * Takes the global app and adds routes.
 */
function setRoutes(err) {
  Object.keys(Routes).forEach((key) => (
    app.use(Routes[key])
  ));
}

/**
 * Begin listening on the specified port.
 */
function startApp(){
  app.listen(PORT, () => {
    console.log(`Listening on localhost:${PORT}`);
  });
}

