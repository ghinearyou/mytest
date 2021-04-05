const express = require('express')
const app = express()
const Sentry = require('@sentry/node');
const Tracing = require("@sentry/tracing");
const swaggerUi = require("swagger-ui-express");
const mongoose = require('mongoose')
const openApi = require('./swagger/index')
const bodyParser = require('body-parser')
require('dotenv').config()

const { MONGO, PORT } = process.env

var options = {
  customCss : '.swagger-ui .models { display: none }'
};

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.get('/api-docs', swaggerUi.serve, swaggerUi.setup(openApi, options))

// var mongoDB = 'mongodb+srv://root:abcdefghijklmnop>@cluster0.u4fw6.mongodb.net/testing?retryWrites=true&w=majority&ssl=true';
mongoose.connect(MONGO, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);

const serverStatus = () => {
  return { 
    state: 'up', 
    dbState: mongoose.STATES[mongoose.connection.readyState] 
  }
};

const mongo = require('./routes/mongoRoutes')
const firebase = require('./routes/firebaseRoutes')

mongo(app)
firebase(app)

Sentry.init({
  dsn: "https://cca21c0b7b1240b3a0b48f7bee9c59e0@o564512.ingest.sentry.io/5705273",
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],

  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(Sentry.Handlers.errorHandler());

app.use(function onError(err, req, res, next) {
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

app.use('/api/uptime', require('express-healthcheck')({
  healthy: serverStatus
}));

app.listen(PORT || 3000, () => {
  console.log(mongoose.connection.readyState);
  if(mongoose.connection.readyState == 1) {
    console.log('Mongo is connected')
  } else if (mongoose.connection.readyState == 2) {
    console.log('Mongo is connecting')
  } else {
    console.log('Mongo is disconnected')
  }
  console.log(`Success, connected on PORT:${PORT || 3000}`)
})