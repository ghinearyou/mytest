const mongo = require('./mongoSwagger.json')

let abcd = Object.assign(
  mongo.paths
)

module.exports = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'API V3 - Docs',
    description: 'User management API',
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000/',
      description: 'localhost'
    }
  ],
  paths: abcd
}