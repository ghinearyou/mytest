const controllers = require('../controllers/mongoControllers')

module.exports = function (app) {
  app.get('/users', controllers.AllUsers)
  app.post('/login', controllers.Login)
  app.post('/register', controllers.CreateUser)
  app.get('/user/:email', controllers.SearchUser)
  app.put('/user/:id', controllers.UpdateUser)
  app.delete('/user/:id', controllers.RemoveUser)
}