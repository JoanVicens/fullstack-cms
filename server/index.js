const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
// const redis = require('redis')
//
// let RedisStore = require('connect-redis')(session)
// let redisClient = redis.createClient()


const app = express();

// Variables d'entorn
require('dotenv').config()

app.use(cors({
  origin: process.env.CORS_URL
}));
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(session({
  secret: 'cms api',
  cookie: {
    maxAge: 60000,
  },
  resave: false,
  saveUninitialized: false
}))

app.get('/', (req, res, next) => {
  console.log(req.session);
  next();
})


require("./api/config/database").connectar();


if(process.env.NODE_ENV === 'production') {
  // PRODUCCIÓ
  app.use(express.static(__dirname + '/public/'));

  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))
} else {
  // DEV
  app.use(morgan('dev'));
}

const middlewares = require('./api/middlewares.js');
// app.use(middlewares.musicAutoritzat)

const auth = require('./api/auth/');

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: '🦄 Hola món!!'
  });
});

app.use('/auth', auth);

function notFound(req, res, next) {
  res.status(404);
  const error = new Error("No s'ha trobat - " + req.originalUrl);
  next(error);
}

function errorHandler(err, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack
  });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Listenin on port', port);
});
