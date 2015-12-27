var dotenv = require('dotenv').load(),
    koa    = require('koa'),
    db     = require('./db'),
    routes = require('./routes');

const PORT = process.env.PORT || 3000;

module.exports = {

  app: null,

  /**
   * Launch the server for Music Worth Listening To.
   * @return {Promise}
   */
  initialize: function(){

    this.app = koa();

    var setRoutes = _setRoutes.bind(this),
        startApp  = _startApp.bind(this);

    return db.initialize()
      .then(setRoutes)
      .then(startApp);
  },

};

function _setRoutes(err) {
  Object.keys(routes).forEach((key) => (
    this.app.use(routes[key])
  ));
}

function _startApp(){
  this.app.listen(PORT, () => {
    console.log(`Listening on localhost:${PORT}`);
  });
}

