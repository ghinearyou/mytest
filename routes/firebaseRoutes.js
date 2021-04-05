const controllers = require('../controllers/firebaseControllers')

module.exports = function (app) {
  app.get('/register', controllers.register)
}